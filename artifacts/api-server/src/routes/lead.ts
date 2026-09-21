import { Router, type IRouter } from "express";

/**
 * Proxy do formulário de lead das LPs de influenciadores para o n8n.
 *
 * Existe para três coisas:
 *  1. manter a URL do webhook fora do bundle do cliente;
 *  2. evitar CORS no browser;
 *  3. parar de perder lead em silêncio — o HTML antigo fazia
 *     `fetch(...).catch(function(){})`, então falha nenhuma deixava rastro.
 *
 * Pendência B1 (ver .migration-backup/README.md): N8N_LEAD_WEBHOOK_URL ainda
 * aponta para a URL de *teste* do n8n (/webhook-test/), que só recebe dados
 * com o workflow em modo "listen". Trocar pela URL de produção (/webhook/)
 * antes de publicar para tráfego real.
 *
 * LGPD: o corpo carrega dado pessoal (nome, e-mail, telefone). Nada dele é
 * logado aqui — só status e identificadores não sensíveis.
 */

const router: IRouter = Router();

type LeadPayload = {
  influencer?: string;
  plano?: string;
  nome?: string;
  email?: string;
  celular?: string;
  [key: string]: unknown;
};

const REQUIRED = [
  "nome",
  "idade",
  "celular",
  "email",
  "timing",
  "motivacao",
] as const;

router.post("/lead", async (req, res) => {
  const webhook = process.env.N8N_LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.error("[lead] N8N_LEAD_WEBHOOK_URL não configurada");
    res.status(500).json({ error: "webhook não configurado" });
    return;
  }

  const payload = req.body as LeadPayload;
  if (!payload || typeof payload !== "object") {
    res.status(400).json({ error: "corpo inválido" });
    return;
  }

  const missing = REQUIRED.filter((k) => !String(payload[k] ?? "").trim());
  if (missing.length) {
    res.status(400).json({ error: "campos obrigatórios ausentes", missing });
    return;
  }

  try {
    const upstream = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });

    if (!upstream.ok) {
      console.error(
        `[lead] n8n respondeu ${upstream.status} — influencer=${payload.influencer} plano=${payload.plano}`,
      );
      res.status(502).json({ error: "falha no destino" });
      return;
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(
      `[lead] erro ao chamar n8n — influencer=${payload.influencer} plano=${payload.plano}:`,
      err instanceof Error ? err.message : err,
    );
    res.status(502).json({ error: "falha no destino" });
  }
});

export default router;
