import type { InfluencerLP } from './types'

/**
 * LP Bianca — eixo Greed no enquadramento de acesso · bônus Inglês para Business.
 *
 * ⚠️ DRAFT: tudo entre [COLCHETES] é placeholder aguardando validação dela.
 * A copy e o raciocínio editorial estão em copy/bianeuhauser.md.
 *
 * Nota de eixo: a dor da audiência dela é insegurança (puxaria Fear), mas a
 * história dela é de acesso conquistado. O briefing manda escolher um eixo só —
 * Greed, ancorado na frase dela, que afirma a competência de quem lê em vez de
 * confrontar.
 */
export const bianeuhauser: InfluencerLP = {
  slug: 'bianeuhauser',
  name: 'Bianca',
  handle: '@bianeuhauser',
  article: 'a',
  possessive: 'dela',
  tone: 'neutro',
  bonusModule: 'Inglês para Business',
  avatar: '/assets/placeholder-bianeuhauser-avatar.svg',

  meta: {
    title: '@bianeuhauser × Fluencypass — Inglês para Business',
    description:
      'Parceria oficial @bianeuhauser × Fluencypass. O inglês que faz a sua competência ser vista nas reuniões que decidem carreira.',
  },

  hero: {
    headline: (
      <>
        O inglês que faz a sua competência <em>ser vista</em>.
      </>
    ),
    sub: 'Parceria oficial com a Bianca (@bianeuhauser). Condições especiais para quem já entrega resultado e não quer mais que o idioma seja o teto da própria carreira.',
    taglineIcon: 'check-circle',
    tagline: 'Para quem entende tudo em inglês — e trava na hora de falar.',
    seal: 'Exclusivo para seguidores da @bianeuhauser',
    metrics: [
      { n: '45min', l: 'de estudo por dia, com constância' },
      { n: '12mo', l: 'garantia de evolução de nível' },
      { n: 'RA1000', l: 'reputação no Reclame Aqui' },
    ],
    photo: '/assets/placeholder-bianeuhauser-hero.svg',
    photoAlt: 'Bianca',
    photoTag: {
      loc: 'Hoje',
      text: '@bianeuhauser · Gerente de CS',
    },
  },

  ribbon: (
    <>
      <strong>Oferta exclusiva</strong> · seguidores da @bianeuhauser · planos com até 47% OFF +
      bônus de Inglês para Business
    </>
  ),

  virada: {
    h2: 'A competência era exatamente a mesma. O que faltava era o idioma.',
    body: (
      <>
        <p className="dropcap">
          Cheguei na entrevista da vaga que tenho hoje com a mesma bagagem técnica que tenho agora.{' '}
          <strong>A única coisa que o cargo exigia além disso era inglês.</strong>
        </p>
        <p>
          Sem o idioma, aquela porta simplesmente não abria — e competência nenhuma resolveria isso.
          Como abriu, veio o resto:{' '}
          <strong>
            a promoção, o time que eu lidero hoje, e as reuniões onde as decisões acontecem antes de
            virarem comunicado.
          </strong>
        </p>
        <p>
          Fechei essa parceria porque o método respeita quem já tem a agenda cheia:{' '}
          <strong>são 45 minutos por dia, não uma segunda jornada.</strong> E porque eles{' '}
          <strong>assumem o resultado junto, não só a aula</strong> — esse nível de compromisso com
          a própria entrega eu não tinha encontrado em escola nenhuma.
        </p>
      </>
    ),
    signatureMeta: '@bianeuhauser · Gerente de CS',
    photo: '/assets/placeholder-bianeuhauser-virada.svg',
    photoAlt: 'Bianca',
    cornerTag: 'Bastidores',
    caption: '"O inglês não me fez competente. Me deixou mostrar que eu já era."',
  },

  aspira: {
    screenLabel: '03 Aspiracional',
    h2: 'O que muda quando o idioma deixa de ser o seu teto',
    lead: 'Três situações em que o inglês para de te limitar e passa a te posicionar.',
    cards: [
      {
        icon: 'users',
        title: 'Daily e reunião de rotina',
        text: 'Daily, one-on-one, alinhamento de time. Quando a reunião troca de idioma, você continua na conversa — colocando ponto de vista, discordando, propondo. Não desaparece até o meeting acabar.',
      },
      {
        icon: 'presentation',
        title: 'Apresentar resultado para a liderança',
        text: 'Defender o próprio trabalho na frente da liderança já é difícil em português. Em inglês, sem preparo, a autoridade evapora na tradução. Com o idioma firme, o conteúdo chega inteiro — e você junto.',
      },
      {
        icon: 'briefcase-wide',
        title: 'A etapa em inglês da entrevista',
        text: 'É onde muita gente boa é cortada. Não por competência técnica: por idioma. Dominar essa conversa é o que separa a vaga na multinacional do "quase".',
      },
    ],
    anchor: {
      main: 'O inglês não foi o que me fez competente. Foi o que me permitiu mostrar minha competência num espaço maior.',
      sub: 'A pergunta não é se você entrega. É em quantas mesas isso ainda não foi visto.',
    },
  },

  planos: {
    h2: (
      <>
        Escolha o plano para o inglês deixar de ser o seu{' '}
        <em style={{ color: 'var(--coral)', fontStyle: 'normal' }}>teto</em>
      </>
    ),
  },

  bonus: {
    h2: 'Kit completo para seguidores da @bianeuhauser',
    lead: 'Tudo que você precisa para destravar o inglês do trabalho — reunião, apresentação e entrevista.',
    primary: {
      icon: 'briefcase',
      title: 'Curso Intensivo de Inglês para Business',
      text: 'Vocabulário, fluência e estratégias de comunicação para reuniões com times globais, apresentação de resultados para liderança e entrevistas em inglês.',
      priceFrom: 'R$ 997',
    },
  },

  testimonial: {
    enabled: false,
    h2: 'Por que a Bianca escolheu a Fluencypass',
    lead: 'Em 1 minuto, a Bianca conta por que essa parceria faz sentido para a realidade dos seguidores dela.',
    duration: '01:24',
    quote: '[PULL QUOTE — definir depois da gravação]',
  },

  metodo: {
    diferencial: (
      <>
        <strong>Diferencial:</strong> cada aula é uma oportunidade de praticar situações reais do
        trabalho — daily, apresentação para liderança, entrevista.
      </>
    ),
  },

  compare: { h2: 'Por que profissionais escolhem a Fluencypass?' },

  faq: [
    {
      q: 'Como funciona a parceria com a @bianeuhauser?',
      a: 'A Bianca (@bianeuhauser) é parceira oficial da Fluencypass. Quem chega pela indicação dela ganha o curso completo + Curso Intensivo de Inglês para Business + condição especial — tudo aplicado automaticamente nesta página.',
    },
    {
      q: 'Funciona para quem entende tudo em inglês mas trava na hora de falar?',
      a: 'Sim — é o caso mais comum. O gargalo aí não é vocabulário, é prática de fala sob pressão: são habilidades diferentes e treinam separado. A conversação diária em grupos do seu nível existe exatamente para isso.',
    },
    {
      q: 'O bônus de Inglês para Business serve para reunião e apresentação, ou só para entrevista?',
      a: 'Para os três. O curso cobre daily, reunião com time global, apresentação de resultados para liderança e entrevista em inglês.',
    },
    {
      q: 'Eu me considero intermediário. Ainda vale a pena?',
      a: 'Vale — e a plataforma começa por um teste de nível justamente para tirar essa dúvida. É muito comum alguém se classificar como intermediário e descobrir que o gap real está na fala, não na compreensão.',
    },
  ],

  footer: {
    tagline: '"O inglês que profissionais brasileiros usam para serem ouvidos no mundo todo."',
  },
}
