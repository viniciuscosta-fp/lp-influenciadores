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
 * Contrato e códigos de resposta do destino estão em
 * docs/Webhook Cadastro Marketing - Documentacao.md.
 *
 * LGPD: o corpo carrega dado pessoal (nome, e-mail, telefone). Nada dele é
 * logado aqui — só status e identificadores não sensíveis.
 */

/**
 * URL de produção do webhook, de docs/Webhook Cadastro Marketing - Documentacao.md.
 *
 * Fica hard-coded de propósito: não é credencial, é endereço de destino. Como a
 * chamada sai daqui (servidor), a URL nunca entra no bundle do cliente — que é o
 * que este proxy protege. O controle de abuso fica no n8n, não no sigilo da URL.
 *
 * Para apontar na URL de teste (`webhook-test`, que só responde após clicar
 * "Listen for test event" e aceita uma chamada por clique), defina
 * N8N_LEAD_WEBHOOK_URL — ela tem precedência sobre este padrão.
 */
const WEBHOOK_PADRAO =
  "https://webhook.fluencypass.com/webhook/integracao-lead-crm";

const router: IRouter = Router();

/**
 * Só `stage` e `missingFields`: nomes de etapa e de campo, nunca valores — o
 * resto do corpo de erro pode ecoar o dado pessoal enviado.
 *
 * `missingFields` é o que a doc manda olhar num 400 stage=validation, e é a
 * única pista de por que o workflow rejeitou.
 */
async function readFalha(
  upstream: Response,
): Promise<{ stage: string; missingFields: string[] }> {
  try {
    const body = (await upstream.json()) as {
      stage?: unknown;
      missingFields?: unknown;
    };
    return {
      stage: typeof body.stage === "string" ? body.stage : "desconhecido",
      missingFields: Array.isArray(body.missingFields)
        ? body.missingFields.filter((f): f is string => typeof f === "string")
        : [],
    };
  } catch {
    return { stage: "sem-corpo", missingFields: [] };
  }
}

type LeadPayload = {
  email?: string;
  firstName?: string;
  celular?: string;
  affiliateCode?: string;
  [key: string]: unknown;
};

/** O webhook devolve 400 se qualquer uma faltar — valor vazio passa, chave ausente não. */
const CONTRACT_KEYS = [
  "email",
  "firstName",
  "celular",
  "idade",
  "channel",
  "plan",
  "acquireUrl",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "site_source_name",
  "affiliateCode",
] as const;

/** Sem estes o lead não é aproveitável no CRM, ainda que o contrato aceite vazio. */
const NON_EMPTY = ["email", "firstName", "celular"] as const;

router.post("/lead", async (req, res) => {
  const webhook = process.env.N8N_LEAD_WEBHOOK_URL ?? WEBHOOK_PADRAO;

  const payload = req.body as LeadPayload;
  if (!payload || typeof payload !== "object") {
    res.status(400).json({ error: "corpo inválido" });
    return;
  }

  const missing = CONTRACT_KEYS.filter((k) => !(k in payload));
  if (missing.length) {
    res.status(400).json({ error: "chaves do contrato ausentes", missing });
    return;
  }

  const blank = NON_EMPTY.filter((k) => !String(payload[k] ?? "").trim());
  if (blank.length) {
    res.status(400).json({ error: "campos obrigatórios vazios", blank });
    return;
  }

  try {
    const upstream = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // Sem `extras` o workflow responde de imediato. Se algum dia passarmos
      // extras, ele faz polling no HubSpot por ~36s e este timeout precisa subir.
      signal: AbortSignal.timeout(10_000),
    });

    if (!upstream.ok) {
      const { stage, missingFields } = await readFalha(upstream);
      const faltando = missingFields.length
        ? ` missingFields=${missingFields.join(",")}`
        : "";
      console.error(
        `[lead] n8n respondeu ${upstream.status} stage=${stage}${faltando} — affiliateCode=${payload.affiliateCode}`,
      );
      res.status(502).json({ error: "falha no destino" });
      return;
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(
      `[lead] erro ao chamar n8n — affiliateCode=${payload.affiliateCode}:`,
      err instanceof Error ? err.message : err,
    );
    res.status(502).json({ error: "falha no destino" });
  }
});

export default router;
