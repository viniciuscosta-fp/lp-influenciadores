import type { InfluencerLP } from './types'

/** LP Maria Clara — eixo Greed (aspiracional) · bônus Inglês para Business. */
export const homeofficing: InfluencerLP = {
  slug: 'homeofficing',
  name: 'Maria Clara',
  handle: '@homeofficing',
  article: 'a',
  possessive: 'dela',
  tone: 'neutro',
  bonusModule: 'Inglês para Business',
  avatar: '/assets/maria-portrait.jpeg',

  meta: {
    title: '@homeofficing × Fluencypass — Inglês para Business',
    description:
      'Parceria oficial @Homeofficing × Fluencypass. O inglês que abre as portas pras vagas que pagam em dólar e euro.',
  },

  hero: {
    headline: (
      <>
        O inglês que abre portas para vagas que pagam em <em>dólar</em>.
      </>
    ),
    sub: 'Parceria oficial com a Maria Clara (@homeofficing). Condições especiais para quem quer trabalhar remoto, ganhar em outra moeda e dar o salto para carreira internacional.',
    taglineIcon: 'check-circle',
    tagline: 'Usado por brasileiros que conseguiram vagas em multinacionais — começando do Brasil.',
    seal: 'Exclusivo para seguidores da @homeofficing',
    metrics: [
      { n: '+40', l: 'cidades de intercâmbio em até 3 anos' },
      { n: '12mo', l: 'garantia de evolução de nível' },
      { n: 'RA1000', l: 'reputação no Reclame Aqui' },
    ],
    photo: '/assets/maria-portrait.jpeg',
    photoAlt: 'Maria Clara',
    photoTag: {
      loc: 'Paris · Hoje',
      text: 'Maria Clara — vendas de exportação, mestrado internacional.',
    },
  },

  ribbon: (
    <>
      <strong>Oferta exclusiva</strong> · seguidores da @homeofficing · planos com até 47% OFF +
      bônus de Inglês para Business
    </>
  ),

  virada: {
    h2: 'Como o inglês me levou do Brasil para França',
    body: (
      <>
        <p className="dropcap">
          Meu segundo trabalho foi numa multinacional sueca. Time LATAM, remoto, eu ainda no Brasil.{' '}
          <strong>Consegui a vaga porque falava inglês — só por isso.</strong>
        </p>
        <p>
          Hoje moro na França, trabalho com vendas de exportação e faço mestrado internacional.{' '}
          <strong>Tudo em inglês.</strong>
        </p>
        <p>
          Quando a Fluencypass me chamou para essa parceria, topei pelo motivo mais simples: é a
          primeira escola que combina{' '}
          <strong>
            aprender + praticar todos os dias + um módulo desenhado para quem quer carreira
            internacional de verdade
          </strong>
          . Exatamente o caminho que eu queria ter encontrado pronto.
        </p>
      </>
    ),
    signatureMeta: '@homeofficing · Paris, França',
    photo: '/assets/foto-maria-na-europa.png',
    photoAlt: 'foto maria',
    cornerTag: 'Bastidores',
    caption: '"Não foi sorte — foi o idioma. O resto a gente já tinha."',
  },

  aspira: {
    screenLabel: '03 Aspiracional',
    h2: 'O que o inglês desbloqueia para quem está pronto',
    lead: 'Três realidades que estão ao alcance de quem domina o idioma de verdade.',
    cards: [
      {
        icon: 'globe',
        title: 'Trabalhar de qualquer lugar para empresas de fora',
        text: 'Times remotos LATAM, vagas em multinacionais europeias e americanas contratando do Brasil. Posição CLT, benefícios e salário em outra moeda.',
      },
      {
        icon: 'briefcase-wide',
        title: 'Entrevistas internacionais com confiança',
        text: 'Quando a entrevista é em inglês e você responde com naturalidade, a decisão deixa de ser "técnica vs idioma" e vira só técnica. Você joga em pé de igualdade com candidatos do mundo todo.',
      },
      {
        icon: 'plane',
        title: 'Carreira sem fronteiras',
        text: 'Mestrado fora, transferência interna para outro país, vagas que pedem viagens internacionais — tudo isso se abre quando o inglês deixa de ser barreira e vira ferramenta.',
      },
    ],
    anchor: {
      main: 'O inglês é o que separa sua carreira atual da carreira que você quer ter.',
      sub: 'Não deixe ele ser o motivo pelo qual você ainda não chegou lá.',
    },
  },

  planos: {
    h2: (
      <>
        Escolha o plano ideal para sua{' '}
        <em style={{ color: 'var(--coral)', fontStyle: 'normal' }}>virada de carreira</em>
      </>
    ),
  },

  bonus: {
    h2: 'Kit completo para seguidores da Maria Clara',
    lead: 'Tudo que você precisa para destravar o inglês e conquistar a vaga internacional.',
    primary: {
      icon: 'briefcase',
      title: 'Curso Intensivo de Inglês para Business',
      text: 'Vocabulário, fluência e estratégias de comunicação para entrevistas internacionais, reuniões com times globais e negociações com empresas no exterior.',
      priceFrom: 'R$ 997',
    },
  },

  testimonial: {
    enabled: false,
    h2: 'Por que a Maria escolheu a Fluencypass',
    lead: 'Em 1 minuto, a Maria conta por que essa parceria faz sentido para realidade dos seguidores dela.',
    duration: '01:24',
    quote:
      'Escolhi a Fluencypass principalmente pelo módulo voltado para negócios e por estar adaptado ao modelo remoto — o mais próximo da realidade dos meus seguidores dela.',
  },

  metodo: {
    diferencial: (
      <>
        <strong>Diferencial:</strong> cada aula é uma oportunidade de praticar situações reais que
        você enfrentará no seu dia a dia profissional.
      </>
    ),
  },

  compare: { h2: 'Por que profissionais escolhem a Fluencypass?' },

  faq: [
    {
      q: 'Como funciona a parceria com @homeofficing?',
      a: 'A Maria (@homeofficing) é parceira oficial da Fluencypass. Quem chega pela indicação dela ganha o curso completo + Curso Intensivo de Inglês para Business + condição especial — tudo aplicado automaticamente nesta página.',
    },
    {
      q: 'O bônus de Inglês para Business serve mesmo para quem quer trabalhar fora?',
      a: 'Sim. O curso é focado em entrevistas internacionais, reuniões com times globais, negociações com empresas no exterior e o vocabulário específico do dia a dia profissional internacional.',
    },
    {
      q: 'Funciona para quem já tem nível intermediário mas trava em entrevistas internacionais?',
      a: 'Sim. A plataforma faz teste de nível e te coloca na trilha certa. As aulas particulares e conversações são adaptadas ao seu nível atual e ao seu objetivo específico.',
    },
    {
      q: 'Quanto tempo leva para conseguir minha primeira vaga internacional?',
      a: 'Depende do seu ponto de partida, mas seguindo a rotina recomendada (60 min/dia) muitos alunos chegam à fluência funcional em torno de 12 meses. A partir daí, candidaturas internacionais ficam ao seu alcance.',
    },
  ],

  footer: {
    tagline: '"O inglês que profissionais brasileiros usam para trabalhar no mundo todo."',
  },
}
