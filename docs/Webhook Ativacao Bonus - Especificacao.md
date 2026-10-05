# Webhook de Ativação de Bônus por Cupom (n8n)

Especificação do workflow `ativacao-bonus-cupom`, chamado pelas LPs de influenciadores quando a pessoa digita o cupom na seção de bônus. O lado da LP e do proxy já está implementado; este documento é o contrato para montar o workflow.

**Escopo da LP:** cadastrar o contato e enviar o cupom. O que o cupom libera, quais propriedades do HubSpot são gravadas e como o curso chega à plataforma são responsabilidade do workflow no n8n.

## Visão geral

São duas chamadas separadas, porque o cupom é digitado **depois** do cadastro:

```
[Form de lead] ─► /api/lead  ─► n8n integracao-lead-crm   (existente)
                                 └─ API2 → HubSpot cria o contato

[Campo cupom]  ─► /api/bonus ─► n8n ativacao-bonus-cupom  (este documento)
                                 ├─ 1. consulta a planilha → responde na hora
                                 └─ 2. (após a resposta) busca contato → PATCH no HubSpot
                                       └─ workflow do HubSpot lê a propriedade e libera o curso
```

Decisões de produto:
- **A liberação acontece na ativação do cupom, não na compra.** O plano comprado não é considerado.
- **A liberação na plataforma é responsabilidade do workflow do HubSpot**, que reage à propriedade gravada por este workflow.
- **Qualquer falha é mostrada ao usuário**, com a mesma naturalidade de um cupom inválido. A LP nunca mostra "bônus ativo" sem resposta de sucesso do n8n.
- **Falha no cadastro não bloqueia a página:** os preços são liberados mesmo assim. O caso é tratado pela aba `falhas` (ver Limitações conhecidas).

## URLs

| Ambiente | URL |
| :-- | :-- |
| Produção (padrão do proxy) | `https://webhook.fluencypass.com/webhook/ativacao-bonus-cupom` |
| Teste | `https://n8n.fluencypass.com/webhook-test/ativacao-bonus-cupom` |

O proxy (`artifacts/api-server/src/routes/bonus.ts`) usa a URL de produção por padrão. `N8N_BONUS_WEBHOOK_URL` sobrescreve essa URL.

## Requisição (proxy → n8n)

`POST`, `Content-Type: application/json`

```json
{
  "email": "lead@example.com",
  "coupon": "MATHEUS",
  "lpSlug": "matheusasg09",
  "acquireUrl": "https://.../matheusasg09?utm_source=instagram"
}
```

| Campo | Garantia do proxy |
| :-- | :-- |
| email | Formato de e-mail válido. É o mesmo e-mail enviado no lead |
| coupon | Sem espaços, em maiúsculas, `[A-Z0-9_-]{1,40}` |
| lpSlug | Não vazio. Identifica a LP de origem |
| acquireUrl | URL da LP no momento da ativação. Pode vir vazia |

## Fluxo do workflow

1. **Validar** se `email`, `coupon` e `lpSlug` estão presentes. Se faltar algum, responde **400** `validation` com `missingFields`.
2. **Buscar o cupom na planilha** (nó Google Sheets, coluna `cupom`).
   - Não encontrado: responde **404** `coupon_not_found`.
   - `ativo = FALSE`: responde **422** `coupon_inactive`, com `reason: "disabled"`.
   - Hoje fora de `valido_de`/`valido_ate`: responde **422** `coupon_inactive`, com `reason: "expired"` ou `"outside_window"`.
   - Erro ao ler a planilha: responde **502** `sheets_unavailable`.
3. **Responder 200** `accepted` (nó *Respond to Webhook*). A LP marca os bônus como ativos a partir daqui.
4. **Depois da resposta,** buscar o contato no HubSpot por e-mail (`POST /crm/v3/objects/contacts/search`). O contato costuma ter acabado de ser criado pelo lead, então reutilize o polling do workflow de cadastro: esperar 6s e tentar até 5 vezes.
5. **Fazer o PATCH** em `/crm/v3/objects/contacts/{id}` com as propriedades que o workflow de liberação do HubSpot lê. A escolha das propriedades e dos valores é definida no próprio workflow do n8n.
6. **Em falha nos passos 4 ou 5,** gravar uma linha na aba `falhas` (data, e-mail, cupom, lpSlug, etapa, erro) e avisar no Slack para reprocessar. A LP já recebeu sucesso e não é notificada.

**Idempotência:** se o contato já tiver o mesmo cupom gravado, o PATCH pode ser repetido sem efeito colateral.

## Respostas (n8n → proxy)

| Status | stage | Quando | O que a LP mostra |
| :-- | :-- | :-- | :-- |
| 200 | accepted | Cupom válido, PATCH agendado | Bônus ativos |
| 400 | validation | Falta campo (`missingFields`) | "Não conseguimos ativar…" (bug de integração, vai para o log) |
| 404 | coupon_not_found | Cupom fora da planilha | "Cupom não encontrado. Confira e tente de novo." |
| 422 | coupon_inactive | Desativado, vencido ou fora da janela (`reason`) | "Este cupom não está mais ativo." |
| 502 | sheets_unavailable | Erro na planilha | "Não conseguimos ativar seu bônus agora. Tente de novo em instantes." |

O proxy trata como `unavailable` (mesma mensagem do 502) qualquer outro status, uma resposta que demore mais de **8s** e erros de rede. Por isso a resposta do passo 3 precisa sair antes do polling no HubSpot.

Exemplo de sucesso:

```json
{
  "success": true,
  "stage": "accepted",
  "coupon": "MATHEUS",
  "bonuses": ["ingles_tech", "dobro_aulas_particulares"],
  "hubspotSync": "pending"
}
```

O proxy só repassa `coupon` à LP. `bonuses` fica disponível para diagnóstico.

## Planilha

Uma linha por cupom:

| cupom | ativo | lp_slug | bonus_ids | valido_de | valido_ate |
| :-- | :-- | :-- | :-- | :-- | :-- |
| MATHEUS | TRUE | matheusasg09 | ingles_tech;dobro_aulas_particulares | 2026-10-01 | 2026-12-31 |

- `cupom`: em maiúsculas, sem espaços, igual ao que o proxy envia.
- `bonus_ids`: valores que vão para a propriedade do HubSpot, separados por `;`.
- `valido_de` / `valido_ate`: opcionais. Se vazios, o cupom não tem janela de validade.

Cupons de LP que já existem hoje, em `defaultCoupon` de cada `content/<slug>.tsx`: `MARIA`, `MATHEUS`, `PASQUA`, `BIANCA`, `BELLA`.

## Limitações conhecidas

- **Lead que falhou (comportamento decidido):** se o `/api/lead` falhar, a LP libera os preços mesmo assim, e o contato pode não existir no HubSpot. Se a pessoa ativar o cupom, o workflow responde 200 normalmente, o polling não encontra o contato e o caso cai na aba `falhas`, com e-mail e cupom para reprocessar manualmente.
- **Pré-preenchimento do cupom:** `?cupom=` só pré-preenche o campo se o cupom estiver em `VALID_COUPONS` (`content/index.ts`). Um cupom que existe só na planilha funciona quando digitado, mas não aparece pré-preenchido.
