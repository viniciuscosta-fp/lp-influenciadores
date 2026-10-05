import { Router, type IRouter } from "express";

/**
 * Proxy da ativação de bônus por cupom para o n8n (workflow ativacao-bonus-cupom).
 *
 * O n8n é a fonte de verdade do cupom: consulta a planilha, responde na hora e
 * só depois faz o PATCH no HubSpot que dispara a liberação do curso. Contrato
 * completo em docs/Webhook Ativacao Bonus - Especificacao.md.
 *
 * Para a LP a resposta é reduzida a { ok } ou { ok: false, reason } — o corpo
 * do n8n não é repassado, e nenhuma falha vira sucesso: sem resposta válida do
 * n8n o usuário vê "não conseguimos ativar" e pode tentar de novo.
 *
 * LGPD: o corpo carrega e-mail. Nada dele é logado — só lpSlug, cupom e status.
 */

/** Endereço, não credencial. N8N_BONUS_WEBHOOK_URL sobrescreve (ex.: webhook-test). */
const WEBHOOK_PADRAO =
  "https://webhook.fluencypass.com/webhook/ativacao-bonus-cupom";

/** O n8n responde logo após ler a planilha; o PATCH no HubSpot roda depois. */
const TIMEOUT_MS = 8_000;

type Reason = "not_found" | "inactive" | "unavailable";

const STATUS_POR_REASON: Record<Reason, number> = {
  not_found: 404,
  inactive: 422,
  unavailable: 502,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CUPOM = /^[A-Z0-9_-]{1,40}$/;

const router: IRouter = Router();

router.post("/bonus", async (req, res) => {
  const webhook = process.env.N8N_BONUS_WEBHOOK_URL ?? WEBHOOK_PADRAO;

  const body = (req.body ?? {}) as Record<string, unknown>;
  const email = String(body.email ?? "").trim();
  const coupon = String(body.coupon ?? "")
    .replace(/\s+/g, "")
    .toUpperCase();
  const lpSlug = String(body.lpSlug ?? "").trim();
  const acquireUrl = String(body.acquireUrl ?? "");

  if (!EMAIL.test(email) || !lpSlug) {
    res.status(400).json({ ok: false, error: "corpo inválido" });
    return;
  }
  // Formato impossível não chega a ir pro n8n: é cupom inexistente.
  if (!CUPOM.test(coupon)) {
    res.status(404).json({ ok: false, reason: "not_found" });
    return;
  }

  const fail = (reason: Reason): void => {
    res.status(STATUS_POR_REASON[reason]).json({ ok: false, reason });
  };

  try {
    const upstream = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, coupon, lpSlug, acquireUrl }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    const data = (await upstream.json().catch(() => ({}))) as {
      stage?: unknown;
      coupon?: unknown;
      missingFields?: unknown;
    };
    const stage = typeof data.stage === "string" ? data.stage : "sem-corpo";

    if (upstream.ok) {
      res.json({
        ok: true,
        coupon: typeof data.coupon === "string" ? data.coupon : coupon,
      });
      return;
    }

    if (upstream.status === 404) {
      fail("not_found");
      return;
    }
    if (upstream.status === 422) {
      fail("inactive");
      return;
    }

    const faltando = Array.isArray(data.missingFields)
      ? ` missingFields=${data.missingFields.join(",")}`
      : "";
    console.error(
      `[bonus] n8n respondeu ${upstream.status} stage=${stage}${faltando} — lpSlug=${lpSlug} coupon=${coupon}`,
    );
    fail("unavailable");
  } catch (err) {
    console.error(
      `[bonus] erro ao chamar n8n — lpSlug=${lpSlug} coupon=${coupon}:`,
      err instanceof Error ? err.message : err,
    );
    fail("unavailable");
  }
});

export default router;
