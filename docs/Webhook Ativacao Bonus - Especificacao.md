# Webhook de Ativação de Bônus por Cupom (n8n)

Contrato entre a LP e o workflow `MKT | LP Creators | Resgate de cupom e liberação de bônus`, chamado quando a pessoa digita o cupom na seção de bônus. O fluxo exportado está em `docs/MKT _ LP Creators _ Resgate de cupom e liberação de bônus.json`; o que está descrito aqui é o que a LP e o proxy dependem dele.

**Escopo da LP:** cadastrar o contato e enviar o cupom. O que o cupom libera, quais propriedades do HubSpot são gravadas e como o curso chega à plataforma são responsabilidade do workflow no n8n.

## Visão geral

São duas chamadas separadas, porque o cupom é digitado **depois** do cadastro:

```
[Form de lead] ─► /api/lead  ─► n8n integracao-lead-crm   (existente)
                                 └─ cria o contato no HubSpot

[Campo cupom]  ─► /api/bonus ─► n8n lp-creators/resgatar-cupom  (este documento)
                                 ├─ 1. valida o payload
                                 ├─ 2. avalia o cupom na planilha
                                 ├─ 3. busca o contato no HubSpot (polling) e faz o PATCH
                                 └─ 4. responde (200 só depois do PATCH) e registra o resgate
```

Decisões de produto:
- **A liberação acontece na ativação do cupom, não na compra.** O plano comprado não é considerado.
- **A resposta é síncrona:** o n8n só responde depois do PATCH no HubSpot. A LP nunca mostra "bônus ativo" sem `success: true`.
- **Falha no cadastro não bloqueia a página:** os preços são liberados mesmo assim (ver Limitações conhecidas).

## URL e autenticação

| Ambiente | URL |
| :-- | :-- |
| Produção (padrão do proxy) | `https://webhook.fluencypass.com/webhook/lp-creators/resgatar-cupom` |

O proxy (`artifacts/api-server/src/routes/bonus.ts`) usa a URL de produção por padrão. Variáveis de ambiente (Secrets):

| Variável | Para quê |
| :-- | :-- |
| `N8N_BONUS_WEBHOOK_URL` | Sobrescreve a URL (ex.: `webhook-test`) |
| `N8N_BONUS_WEBHOOK_AUTH_HEADER` | Nome do header da credencial Header Auth do webhook. Padrão: `Authorization` |
| `N8N_BONUS_WEBHOOK_TOKEN` | Valor do header. Segredo: nunca no código nem em resposta de API. Sem ele, o proxy não envia o header |

## Requisição (proxy → n8n)

`POST`, `Content-Type: application/json`

```json
{
  "email": "lead@example.com",
  "cupom": "MATHEUS",
  "lpSlug": "matheusasg09",
  "acquireUrl": "https://.../matheusasg09?utm_source=instagram"
}
```

| Campo | Garantia do proxy | Lido pelo workflow |
| :-- | :-- | :-- |
| email | Formato de e-mail válido. É o mesmo e-mail enviado no lead | Sim |
| cupom | Sem espaços, em maiúsculas, `[A-Z0-9_-]{1,40}` | Sim |
| lpSlug | Não vazio. Identifica a LP de origem | **Não** (ver Limitações) |
| acquireUrl | URL da LP no momento da ativação. Pode vir vazia | Sim, gravada em `acquireurl` |

## Respostas (n8n → proxy)

O corpo sempre traz `success` e, nas falhas, `reason`. O proxy decide pelo `reason`, não só pelo status, porque `CONTACT_NOT_FOUND` e `COUPON_NOT_FOUND` voltam ambos como 404.

| Status | reason | Quando | O que a LP mostra |
| :-- | :-- | :-- | :-- |
| 200 | (`success: true`) | Cupom válido e PATCH gravado | Bônus ativos |
| 404 | `COUPON_NOT_FOUND` | Cupom fora da planilha | "Cupom não encontrado. Confira e tente de novo." |
| 422 | `COUPON_INACTIVE` | `ativo` falso | "Este cupom não está mais ativo." |
| 422 | `COUPON_EXPIRED` | Passou de `data_validade` | "Este cupom não está mais ativo." |
| 422 | `COUPON_NOT_STARTED` | Antes de `data_inicio` | "Este cupom não está mais ativo." |
| 422 | `COUPON_MISCONFIGURED` | Linha da planilha incompleta ou cupom duplicado | "Não conseguimos ativar seu bônus agora…" (vai para o log) |
| 404 | `CONTACT_NOT_FOUND` | Contato não achado no HubSpot após o polling | "Não conseguimos ativar seu bônus agora…" (vai para o log) |
| 502 | `HUBSPOT_ERROR` | Erro na busca ou no PATCH | "Não conseguimos ativar seu bônus agora…" (vai para o log) |
| 400 | `INVALID_PAYLOAD` | E-mail inválido ou cupom ausente | "Não conseguimos ativar seu bônus agora…" (bug de integração, vai para o log) |

Qualquer outro status, corpo sem `reason`, erro de rede ou resposta que demore mais de **45 s** também vira "Não conseguimos ativar seu bônus agora…". O timeout é longo porque o fluxo espera o contato aparecer no HubSpot (até 3 buscas, 5 s entre elas) antes de responder.

Exemplo de sucesso (a LP só usa `cupom`):

```json
{
  "success": true,
  "email": "lead@example.com",
  "cupom": "MATHEUS",
  "affiliate_id": "matheus",
  "hubspot_contact_id": "123",
  "beneficios": {
    "curso_extra": { "liberar": true, "codigo": "ingles_tech", "status": "released" },
    "aulas_extras": { "liberar": false, "quantidade": null, "status": "not_applicable" }
  }
}
```

## Planilha (aba `cupons`)

Uma linha por cupom. O workflow lê:

| Coluna | Uso |
| :-- | :-- |
| cupom | Maiúsculas, sem espaços, igual ao que o proxy envia. Duplicado vira `COUPON_MISCONFIGURED` |
| ativo | `TRUE`/`VERDADEIRO`/`SIM`/`1` |
| data_inicio | Opcional |
| data_validade | Obrigatória |
| affiliate_id | Obrigatório. Gravado no contato |
| libera_curso_extra, curso_extra_codigo | Curso que o PATCH grava; o código é obrigatório se liberar |
| libera_aulas_extras, qtd_aulas_extras | Aulas particulares extras (a liberação ainda é um placeholder no fluxo) |

Cupons de LP que já existem hoje, em `defaultCoupon` de cada `content/<slug>.tsx`: `MARIA`, `MATHEUS`, `PASQUA`, `BIANCA`, `BELLA`.

## Limitações conhecidas

- **O workflow ignora `lpSlug`:** um cupom vale em qualquer LP. Travar por LP exige uma mudança no fluxo.
- **Aulas particulares extras não são liberadas:** o nó correspondente é um placeholder e o fluxo responde sucesso mesmo assim, com status `pending`.
- **Lead que falhou (comportamento decidido):** se o `/api/lead` falhar, a LP libera os preços mesmo assim, e o contato pode não existir no HubSpot. Se a pessoa ativar o cupom, o fluxo responde `CONTACT_NOT_FOUND` e a LP mostra "Não conseguimos ativar…".
- **Pré-preenchimento do cupom:** `?cupom=` só pré-preenche o campo se o cupom estiver em `VALID_COUPONS` (`content/index.ts`). Um cupom que existe só na planilha funciona quando digitado, mas não aparece pré-preenchido.
