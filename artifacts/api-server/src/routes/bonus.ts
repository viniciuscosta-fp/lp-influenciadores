import { Router, type IRouter } from "express";

/**
 * Proxy da ativação de bônus por cupom para o n8n (workflow lp-creators/resgatar-cupom).
 *
 * O n8n é a fonte de verdade do cupom: consulta a planilha, grava o PATCH no
 * HubSpot que libera o curso e só então responde. O fluxo exportado está em
 * docs/MKT _ LP Creators _ Resgate de cupom e liberação de bônus.json.
 *
 * Para a LP a resposta é reduzida a { ok } ou { ok: false, reason } — o corpo
 * do n8n não é repassado, e nenhuma falha vira sucesso: sem resposta válida do
 * n8n o usuário vê "não conseguimos ativar" e pode tentar de novo.
 *
 * LGPD: o corpo carrega e-mail. Nada dele é logado — só lpSlug, cupom e status.
 */

/** Endereço, não credencial. N8N_BONUS_WEBHOOK_URL sobrescreve (ex.: webhook-test). */
const WEBHOOK_PADRAO =
  "https://webhook.fluencypass.com/webhook/lp-creators/resgatar-cupom";

/**
 * O workflow é síncrono: lê a planilha, procura o contato no HubSpot (até 3
 * buscas com 5 s de espera, porque o lead acabou de ser criado) e só então
 * grava o PATCH e responde. Um timeout curto aqui abortaria uma ativação que o
 * n8n ainda vai concluir.
 */
const TIMEOUT_MS = 45_000;

/** Cupom recusado pela regra da planilha, e não por falha técnica. */
const REASON_NAO_ENCONTRADO = new Set(["COUPON_NOT_FOUND"]);
const REASON_INATIVO = new Set([
  "COUPON_INACTIVE",
  "COUPON_EXPIRED",
  "COUPON_NOT_STARTED",
]);

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
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    // O webhook exige autenticação por header (credencial Header Auth do n8n).
    const token = process.env.N8N_BONUS_WEBHOOK_TOKEN;
    if (token) {
      headers[process.env.N8N_BONUS_WEBHOOK_AUTH_HEADER ?? "Authorization"] =
        token;
    }

    const upstream = await fetch(webhook, {
      method: "POST",
      headers,
      // O workflow lê `cupom` (pt-BR) e `acquireUrl`; lpSlug segue como contexto.
      body: JSON.stringify({ email, cupom: coupon, lpSlug, acquireUrl }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    const data = (await upstream.json().catch(() => ({}))) as {
      success?: unknown;
      reason?: unknown;
      cupom?: unknown;
    };
    const reason = typeof data.reason === "string" ? data.reason : "sem-corpo";

    if (upstream.ok && data.success === true) {
      res.json({
        ok: true,
        coupon: typeof data.cupom === "string" ? data.cupom : coupon,
      });
      return;
    }

    // A recusa vem em `reason`, não só no status: CONTACT_NOT_FOUND também é 404
    // e não pode virar "cupom não encontrado" para quem digitou o cupom certo.
    if (REASON_NAO_ENCONTRADO.has(reason)) {
      fail("not_found");
      return;
    }
    if (REASON_INATIVO.has(reason)) {
      fail("inactive");
      return;
    }

    console.error(
      `[bonus] n8n respondeu ${upstream.status} reason=${reason} — lpSlug=${lpSlug} coupon=${coupon}`,
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
