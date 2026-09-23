import type { InfluencerLP } from './types'

/** LP Matheus — eixo Fear (custo de não agir) · bônus Inglês para Tech. */
export const matheusasg09: InfluencerLP = {
  slug: 'matheusasg09',
  name: 'Matheus',
  handle: '@matheusasg09',
  article: 'o',
  possessive: 'dele',
  tone: 'coloquial',
  bonusModule: 'Inglês para Tech',
  defaultCoupon: 'MATHEUS',
  avatar: '/assets/FOTO MATHEUS.jpeg',

  meta: {
    title: '@matheusasg09 × Fluencypass — Inglês para Tech',
    description:
      'Parceria oficial Matheus × Fluencypass. Cada mês sem inglês é um mês de salário em dólar passando batido.',
  },

  hero: {
    headline: (
      <>
        Cada mês sem inglês é mais um <em>salário em dólar</em> passando batido.
      </>
    ),
    sub: 'Parceria oficial com o Matheus (@matheusasg09). Condições especiais para quem já entendeu que inglês não é mais "diferencial" — é o que separa quem ganha em real de quem ganha em dólar.',
    taglineIcon: 'clock',
    tagline: 'Pra devs que cansaram de ver vaga gringa passar e não estar preparado pra aplicar.',
    seal: 'Exclusivo para seguidores do @matheusasg09',
    metrics: [
      { n: '3-5×', l: 'a remuneração de devs em vagas gringas remotas' },
      { n: '12mo', l: 'garantia de evolução de nível' },
      { n: 'RA1000', l: 'reputação no Reclame Aqui' },
    ],
    photo: '/assets/FOTO MATHEUS.jpeg',
    photoAlt: 'Matheus',
    photoTag: {
      loc: 'Home office · Hoje',
      text: 'Matheus — engenheiro de software, trabalha em inglês todos os dias.',
    },
  },

  ribbon: (
    <>
      <strong>Oferta exclusiva</strong> · seguidores do @matheusasg09 · planos com até 47% OFF +
      bônus de Inglês para Tech
    </>
  ),

  virada: {
    h2: 'O preço que eu paguei por demorar a aprender inglês',
    body: (
      <>
        <p className="dropcap">
          Eu sou engenheiro de software. Trabalho com inglês todos os dias —{' '}
          <strong>porque tudo na nossa área tá em inglês</strong>.
        </p>
        <p>
          Mas eu demorei pra começar a estudar de verdade. E o preço disso foi alto:{' '}
          <strong>perdi grandes oportunidades de carreira que não vão voltar</strong>. Tive que
          correr atrás depois, no susto, com a vaga já indo embora.
        </p>
        <p>
          Se eu pudesse falar com o Matheus de 5 anos atrás, eu diria uma coisa:{' '}
          <strong>comece agora</strong>. Não tem atalho, não tem hack. Mas o que tem é o método certo
          — e foi por isso que fechei essa parceria com a Fluencypass. Pra você não cometer o mesmo
          erro que eu.
        </p>
      </>
    ),
    signatureMeta: '@matheusasg09 · Engenheiro de software',
    photo: '/assets/FOTO VIAGEM MATHEUS.jpeg',
    photoAlt: 'Matheus em viagem',
    cornerTag: 'Bastidores',
    caption: '"Não tem atalho, não tem hack. O que tem é o método certo."',
  },

  aspira: {
    screenLabel: '03 Custo de não agir',
    h2: 'O que tá te custando enquanto você adia',
    lead: 'Três realidades que continuam acontecendo, mês após mês, pra quem ainda não dominou o inglês.',
    cards: [
      {
        icon: 'dollar',
        title: 'Salário em real enquanto o mercado paga em dólar',
        text: 'Empresas gringas estão contratando dev brasileiro pra trabalhar remoto agora, pagando 3 a 5 vezes mais que o mercado nacional. A única coisa entre você e essa folha de pagamento é uma entrevista em inglês.',
      },
      {
        icon: 'chart-down',
        title: 'Vagas que passam sem você nem aplicar',
        text: 'Toda semana você vê posição abrir no LinkedIn, lê "inglês fluente requerido" e fecha a aba. Não é falta de competência técnica que tá te tirando dessas vagas. É o filtro de idioma — e ele tá descartando você antes da sua primeira entrevista.',
      },
      {
        icon: 'hourglass',
        title: 'O custo composto do "vou começar depois"',
        text: 'Cada ano que você adia é mais um ano de salário em real, mais um ano vendo colegas seus passarem à frente, mais um ano longe da vida que você sabe que poderia estar tendo. Não dá pra recuperar tempo perdido — só dá pra parar de perder mais.',
      },
    ],
    anchor: {
      main: 'Inglês não é mais "diferencial". É o que separa quem aplica de quem assiste.',
      sub: 'Quanto mais você adia, mais caro fica.',
    },
  },

  planos: {
    h2: (
      <>
        Escolha o plano pra destravar o inglês e{' '}
        <em style={{ color: 'var(--coral)', fontStyle: 'normal' }}>parar de perder oportunidade</em>
      </>
    ),
  },

  bonus: {
    h2: 'Benefícios exclusivos para seguidores do @matheusasg09',
    lead: 'Tudo que você precisa pra destravar o inglês de tech e parar de ver vaga gringa passar.',
    primary: {
      icon: 'code',
      title: 'Curso Intensivo de Inglês para Tech',
      text: 'Vocabulário, expressões e simulações reais de daily, code review, entrevista técnica em inglês, pair programming e comunicação com times globais.',
      priceFrom: 'R$ 997',
    },
  },

  testimonial: {
    enabled: false,
    h2: 'Por que o Matheus escolheu a Fluencypass',
    lead: 'Em 1 minuto, o Matheus conta por que essa parceria faz sentido pra quem é dev e quer trabalhar lá fora.',
    duration: '01:24',
    quote:
      'Se você é dev e ainda não fala inglês, tu tá deixando dinheiro na mesa todo mês. Eu sei porque deixei por anos.',
  },

  metodo: {
    diferencial: (
      <>
        <strong>Diferencial:</strong> cada aula é uma oportunidade de praticar situações reais do dia
        a dia — daily, code review, entrevista técnica.
      </>
    ),
  },

  compare: { h2: 'Por que devs escolhem a Fluencypass?' },

  faq: [
    {
      q: 'Como funciona a parceria com o Matheus?',
      a: 'O @matheusasg09 é parceiro oficial da Fluencypass. Quem chega pela indicação dele ganha o curso completo + Curso Intensivo de Inglês para Tech + condição especial — tudo aplicado automaticamente nesta página.',
    },
    {
      q: 'O Inglês para Tech serve mesmo pra quem quer trabalhar remoto pra fora?',
      a: 'Sim. O curso é focado em daily, code review, entrevista técnica em inglês, pair programming e comunicação com times globais — exatamente as situações reais de quem trabalha (ou quer trabalhar) em time internacional.',
    },
    {
      q: 'Funciona pra quem já tem nível intermediário mas trava na hora de falar?',
      a: 'Sim. A plataforma faz teste de nível e te coloca na trilha certa. Conversação e aulas particulares são adaptadas ao seu nível e ao seu objetivo (vaga internacional, entrevista, daily).',
    },
    {
      q: 'Quanto tempo leva pra eu conseguir uma vaga internacional?',
      a: 'Depende do seu nível atual e da sua dedicação. Seguindo a rotina recomendada (60 min/dia), muitos alunos chegam à fluência funcional em torno de 12 meses, e a partir daí ficam aptos a aplicar pra vagas internacionais com confiança.',
    },
  ],

  footer: {
    tagline: '"O inglês que devs brasileiros usam pra trabalhar no mundo todo."',
  },
}
