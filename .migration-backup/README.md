# LPs de parceria com influenciadores — Fluencypass

Next.js (App Router) com uma rota por influenciador: `/[influencer]`.

| Rota | Influenciador | Eixo | Bônus | Status |
|---|---|---|---|---|
| `/homeofficing` | Maria Clara | Greed | Business | copy aprovada |
| `/matheusasg09` | Matheus | Fear | Tech | copy aprovada |
| `/pasquadev` | Vinicius Pasquantonio | Greed (insider) | Tech | **draft — placeholders pendentes** |
| `/bianeuhauser` | Bianca | Greed (acesso) | Business | **draft — placeholders pendentes** |
| `/bellainlive` | Bella | Greed (método) | Business | **draft — placeholders pendentes** |

As três em draft têm `[COLCHETES]` visíveis na página, de propósito: são os campos
que faltam validar com o influenciador. A copy e o raciocínio editorial de cada uma
estão em `copy/<slug>.md`.
Todas as páginas compartilham o mesmo template de 11 blocos; o que muda fica em
`content/<slug>.tsx`.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # gera as LPs estaticamente
npm run typecheck
```

`/` é um índice interno de QA (`noindex`) com o link de cada LP.

## Estrutura

| Pasta | O que tem |
|---|---|
| `app/` | rotas, `globals.css` (folha única) e `api/lead` (proxy do formulário) |
| `components/` | Atomic Design: `atoms` → `molecules` → `organisms` → `templates` |
| `content/` | `types.ts` (modelo), `shared.tsx` (o que é igual em todas), `<slug>.tsx` (o que varia) |
| `public/assets/` | imagens |
| `legacy/` | as duas LPs originais em HTML, congeladas como referência visual |

Só três pedaços são client component: accordion do FAQ, player de vídeo e o
modal/formulário. O resto é React Server Component.

As imagens usam `<img>` puro, e não `next/image`: o CSS da LP posiciona cada
foto via `object-fit` dentro de um container próprio, e os wrappers que o
`next/image` injeta quebrariam esse layout.

## Adicionar um influenciador

1. Crie `content/<slug>.tsx` exportando um `InfluencerLP` (copie de
   `content/matheusasg09.tsx` e troque o conteúdo).
2. Registre em `content/index.ts`.
3. Coloque as 3 imagens em `public/assets/`, substituindo os placeholders:
   - **avatar** — quadrado (usado em 28px, 48px e 52px)
   - **hero** — 4:5 vertical, tratamento escuro (vira 1:1 no mobile; o CSS
     ancora em `object-position: center top`, então enquadre deixando folga embaixo)
   - **"A Virada"** — 4:5 vertical, visual de reportagem

   Enquanto não chegam, `public/assets/placeholder-<slug>-{avatar,hero,virada}.svg`
   seguram o layout nas proporções corretas.
4. `npm run build` — a rota estática sai sozinha.

Slug fora do registry dá 404 (`dynamicParams = false`).

### Eixo emocional

Cada LP escolhe **um** eixo e mantém do começo ao fim — Greed (puxa para a vida
desejada) ou Fear (confronta o custo de não agir). Misturar os dois quebra o
fluxo do briefing. Na prática o eixo define Hero, "A Virada", os 3 cards do
bloco 3 e a frase-âncora; o resto da página é igual.

### Padrão editorial

**Escrita.** Português escrito, não transcrito: **"para", nunca "pra"**. Mesma regra
para "pro", "tá", "tô", "numa boa", "dá conta", "gringo". O campo
`tone: 'neutro' | 'coloquial'` controla "para"/"pra" nos blocos compartilhados, e
**o padrão para toda LP nova é `'neutro'`**.

> **A LP do Matheus (`tone: 'coloquial'`) é exceção deliberada, não dívida técnica.**
> O eixo Fear dela foi construído nesse registro direto e **o próprio Matheus
> aprovou o texto**. Não "corrigir" para `'neutro'` — mudar o tom ali exige falar
> com ele antes.

**As histórias dos influenciadores passam por filtro de copywriting.** O que eles
respondem no formulário é matéria-prima, não copy. Não transcrever resposta crua,
não citar marca de terceiro (escola, curso, empregador) sem necessidade, não listar
fatos biográficos sem construir argumento. A regra prática: procure o que a resposta
**revela** e que a pessoa não disse explicitamente — em geral é ali que está a copy.

**Garantia e devolução não entram em bloco narrativo.** Dizer "devolvem o dinheiro
de quem se dedica e não chega na fluência" obriga o leitor a imaginar a cena de
estudar e falhar — justamente o medo dele — num ponto da página em que ainda
estamos construindo desejo. O compromisso da Fluencypass com o resultado pode e
deve aparecer nos blocos 1 a 3, mas **pela confiança, nunca pela cláusula de
fracasso**. A garantia em si fica onde quem já quer comprar vai conferir risco:
features dos planos (bloco 4) e FAQ (bloco 10).

**Citação direta só quando a fala crua for a melhor formulação possível** do
argumento. Nas LPs atuais isso acontece uma vez por página, sempre na frase-âncora
do bloco 3. Todo o resto é reescrito.

Cada `copy/<slug>.md` registra o raciocínio, para a decisão ser auditável depois.

## Paridade com as LPs antigas

`legacy/` guarda os HTMLs originais, autossuficientes (abrem direto no browser).
São a referência de regressão visual: `/homeofficing` e `/matheusasg09` devem
renderizar igual a eles. A diferença medida hoje é ~0,002% dos pixels, toda em
antialiasing de texto.

## Pendências antes de publicar

| # | Pendência | Onde |
|---|---|---|
| B1 | `N8N_LEAD_WEBHOOK_URL` ainda é a URL de **teste** do n8n (`/webhook-test/`), que só recebe dados com o workflow em modo "listen" | `.env.example` |
| B2 | Links de checkout são placeholders (`#checkout-*`) | `content/shared.tsx` |
| B3 | Preços e % OFF hardcoded (R$149/247/497 · 42/47/31%) | `content/shared.tsx` |
| B4 | Valor dos bônus: o código usa R$ 1.497 (997+500); o briefing dizia R$ 2.497 com a masterclass que saiu | `content/shared.tsx` |
| B6 | **LGPD**: formulário sem checkbox de consentimento; "Política de privacidade" e "Termos de uso" apontam para `#` | `LeadGate.tsx`, `content/shared.tsx` |
| B7 | Nenhum pixel ou evento de conversão instalado | — |
| B10 | Bloco 6 (depoimento em vídeo) desligado via `testimonial.enabled: false` até haver gravação | `content/<slug>.tsx` |

O payload do lead já identifica `influencer` e `plano` (B5 resolvido).
