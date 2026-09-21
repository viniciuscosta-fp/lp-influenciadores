import { NextResponse } from 'next/server'

/**
 * Proxy do formulário de lead para o n8n.
 *
 * Existe para três coisas:
 *  1. manter a URL do webhook fora do bundle do cliente;
 *  2. evitar CORS no browser;
 *  3. parar de perder lead em silêncio — o HTML antigo fazia
 *     `fetch(...).catch(function(){})`, então falha nenhuma deixava rastro.
 *
 * Pendência B1: `N8N_LEAD_WEBHOOK_URL` ainda aponta para a URL de *teste* do
 * n8n (/webhook-test/), que só recebe dados com o workflow em modo "listen".
 * Trocar pela URL de produção (/webhook/) antes de publicar.
 *
 * LGPD: o corpo carrega dado pessoal (nome, e-mail, telefone). Nada dele é
 * logado aqui — só status e identificadores não sensíveis.
 */

export const runtime = 'nodejs'

type LeadPayload = {
  influencer?: string
  plano?: string
  nome?: string
  email?: string
  celular?: string
  [key: string]: unknown
}

const REQUIRED = ['nome', 'idade', 'celular', 'email', 'timing', 'motivacao'] as const

export async function POST(request: Request) {
  const webhook = process.env.N8N_LEAD_WEBHOOK_URL
  if (!webhook) {
    console.error('[lead] N8N_LEAD_WEBHOOK_URL não configurada')
    return NextResponse.json({ error: 'webhook não configurado' }, { status: 500 })
  }

  let payload: LeadPayload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'corpo inválido' }, { status: 400 })
  }

  const missing = REQUIRED.filter((k) => !String(payload[k] ?? '').trim())
  if (missing.length) {
    return NextResponse.json({ error: 'campos obrigatórios ausentes', missing }, { status: 400 })
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    })

    if (!res.ok) {
      console.error(
        `[lead] n8n respondeu ${res.status} — influencer=${payload.influencer} plano=${payload.plano}`,
      )
      return NextResponse.json({ error: 'falha no destino' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(
      `[lead] erro ao chamar n8n — influencer=${payload.influencer} plano=${payload.plano}:`,
      err instanceof Error ? err.message : err,
    )
    return NextResponse.json({ error: 'falha no destino' }, { status: 502 })
  }
}
