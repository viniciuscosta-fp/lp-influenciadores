import type { InfluencerLP } from "./types";

/**
 * LP Bella (@bellainlive) — eixo Greed · bônus Inglês para Business.
 *
 * ⚠️ DRAFT: tudo entre [COLCHETES] é placeholder aguardando validação dela.
 * A copy e o raciocínio editorial estão em copy/bellainlive.md.
 *
 * Nota de formato: é a LP mais impessoal das quatro, por decisão — o material
 * dela são respostas de uma linha ("Avançado", "Morei fora do Brasil", "Mudou
 * minha profissão"), sem narrativa nem ICP definido. Inventar biografia aqui
 * seria arriscado e a audiência dela perceberia.
 *
 * Em vez disso, o bloco 2 deixa de ser história de vida e vira argumento
 * editorial — o que é coerente com o diferencial que ela mesma declarou
 * ("a didática do conteúdo, busco sempre ser muito clara"). A tese sai do
 * cruzamento de duas respostas reais dela: a maior dificuldade que teve foi
 * "a técnica do aprendizado", e a dúvida que mais chega na audiência é "como
 * aprender inglês". Ou seja: o problema é método, não talento.
 */
export const bellainlive: InfluencerLP = {
  slug: "bellainlive",
  name: "Bella",
  handle: "@bellainlive",
  article: "a",
  possessive: "dela",
  tone: "neutro",
  bonusModule: "Inglês para Business",
  avatar: "/assets/placeholder-bellainlive-avatar.svg",

  meta: {
    title: "@bellainlive × Fluencypass — Inglês para Business",
    description:
      "Parceria oficial @bellainlive × Fluencypass. O problema quase nunca é o inglês. É o método de estudar inglês.",
  },

  hero: {
    headline: (
      <>
        O inglês que muda a sua profissão, <em>não só o seu currículo</em>.
      </>
    ),
    sub: "Parceria oficial com a Bella (@bellainlive). Condições especiais para quem já tentou aprender inglês mais de uma vez e quer, desta vez, um método que se sustente.",
    taglineIcon: "check-circle",
    tagline: "Para quem já sabe que precisa e nunca sabe por onde começar.",
    seal: "Exclusivo para seguidores da @bellainlive",
    metrics: [
      { n: "11", l: "níveis CEFR, do iniciante ao pós-avançado" },
      { n: "12mo", l: "garantia de evolução de nível" },
      { n: "RA1000", l: "reputação no Reclame Aqui" },
    ],
    photo: "/assets/placeholder-bellainlive-hero.svg",
    photoAlt: "Bella",
    photoTag: {
      loc: "Hoje",
      text: "Bella — Tech Lead.",
    },
  },

  ribbon: (
    <>
      <strong>Oferta exclusiva</strong> · seguidores da @bellainlive · planos
      com até 47% OFF + bônus de Inglês para Business
    </>
  ),

  virada: {
    h2: "O problema quase nunca é o inglês. É o método de estudar inglês.",
    body: (
      <>
        <p className="dropcap">
          A pergunta que mais chega para mim não é qual curso fazer. É{" "}
          <strong>por que eu nunca consigo manter</strong>. E a resposta quase
          sempre é a mesma: o problema não estava na pessoa.
        </p>
        <p>
          Quem estuda gramática solta por meses e continua sem falar não é
          alguém sem talento para idiomas. É alguém sem sistema.{" "}
          <strong>
            Faltam três coisas que raramente vêm juntas: teoria organizada,
            prática de fala com frequência, e alguém corrigindo no caminho.
          </strong>
        </p>
        <p>
          Foi isso que me chamou atenção na Fluencypass — as três no mesmo
          lugar, com horário flexível o suficiente para caber numa rotina real.{" "}
          <strong>
            Por isso fechei essa parceria: é o que eu responderia para quem me
            pergunta por onde começar.
          </strong>
        </p>
      </>
    ),
    signatureMeta: "@bellainlive · Tech Lead",
    photo: "/assets/placeholder-bellainlive-virada.svg",
    photoAlt: "Bella",
    cornerTag: "Bastidores",
    caption: '"Nunca foi falta de talento. Era falta de sistema."',
  },

  aspira: {
    screenLabel: "03 Aspiracional",
    h2: "O que muda quando o inglês sai do “algum dia”",
    lead: "Três portas que abrem para quem finalmente destrava o idioma.",
    cards: [
      {
        icon: "briefcase-wide",
        title: "A entrevista que você deixou de fazer",
        text: "A vaga que pedia inglês fluente deixa de ser a vaga em que você nem se candidatou. Entrevista em inglês é treinável — e costuma ser o único filtro entre muita gente boa e um salto de carreira.",
      },
      {
        icon: "presentation",
        title: "Apresentar o próprio trabalho lá fora",
        text: "Mostrar o que você faz para uma sala que não fala português. Não é sobre sotaque: é sobre a ideia chegar inteira, com você defendendo ela em tempo real.",
      },
      {
        icon: "globe",
        title: "Trabalhar com o que não cabia antes",
        text: "Funções que não existem na sua cidade, empresas que não estão no seu país, formatos de trabalho que não existiam há dez anos. O idioma amplia o mapa do que dá para fazer da vida.",
      },
    ],
    anchor: {
      main: "Aprender inglês não é questão de talento. É questão de método.",
      sub: "E método é a única parte disso que dá para contratar pronta.",
    },
  },

  planos: {
    h2: (
      <>
        Escolha o plano e pare de{" "}
        <em style={{ color: "var(--coral)", fontStyle: "normal" }}>
          começar do zero
        </em>
      </>
    ),
  },

  bonus: {
    h2: "Kit completo para seguidores da @bellainlive",
    lead: "Tudo que você precisa para usar o inglês onde ele decide carreira: entrevista e apresentação.",
    primary: {
      icon: "briefcase",
      title: "Curso Intensivo de Inglês para Business",
      text: "Vocabulário, fluência e estratégias de comunicação para entrevistas em inglês, apresentação de trabalho para times internacionais e o dia a dia profissional em outro idioma.",
      priceFrom: "R$ 997",
    },
  },

  testimonial: {
    enabled: false,
    h2: "Por que a Bella escolheu a Fluencypass",
    lead: "Em 1 minuto, a Bella conta por que essa parceria faz sentido para a realidade dos seguidores dela.",
    duration: "01:24",
    quote: "[PULL QUOTE — definir depois da gravação]",
  },

  metodo: {
    diferencial: (
      <>
        <strong>Diferencial:</strong> cada aula é uma oportunidade de praticar
        situação real — entrevista, apresentação, reunião — em vez de acumular
        teoria que você nunca usa.
      </>
    ),
  },

  compare: { h2: "Por que profissionais escolhem a Fluencypass?" },

  faq: [
    {
      q: "Como funciona a parceria com a @bellainlive?",
      a: "A Bella (@bellainlive) é parceira oficial da Fluencypass. Quem chega pela indicação dela ganha o curso completo + Curso Intensivo de Inglês para Business + condição especial — tudo aplicado automaticamente nesta página.",
    },
    {
      q: "Eu já tentei aprender inglês várias vezes e sempre parei. Por que agora seria diferente?",
      a: "Porque o que costuma falhar é a estrutura, não a pessoa. A plataforma define a trilha a partir de um teste de nível, a conversação diária cria a frequência que estudar sozinho não sustenta, e o professor corrige antes do erro virar hábito.",
    },
    {
      q: "O bônus de Inglês para Business serve para quem ainda não trabalha em inglês?",
      a: "Serve — e geralmente é quem mais precisa. O curso cobre entrevista, apresentação de trabalho e reunião com time internacional: as situações que aparecem antes de alguém conseguir a vaga, não depois.",
    },
    {
      q: "Preciso ter horário fixo para estudar?",
      a: "Não. A plataforma fica disponível 24 horas e as conversações acontecem várias vezes ao dia, em grupos por nível. Você entra no horário que couber na sua rotina.",
    },
  ],

  footer: {
    tagline: '"O inglês que muda a profissão, não só o currículo."',
  },
};
