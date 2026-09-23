import type { InfluencerLP } from "./types";

/**
 * LP Bella (@bellainlive) — eixo Greed · bônus Inglês para Tech.
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
 *
 * Bônus é Tech, não Business: o ICP dela é tech — troca prevista no doc
 * editorial, que afeta os blocos 3 e 5. As duas situações que ela declarou como
 * críticas ("entrevista, apresentação técnica") seguem sendo a âncora da copy.
 */
export const bellainlive: InfluencerLP = {
  slug: "bellainlive",
  name: "Bella",
  handle: "@bellainlive",
  article: "a",
  possessive: "dela",
  tone: "neutro",
  bonusModule: "Inglês para Tech",
  defaultCoupon: "BELLA",
  avatar: "/assets/bellainlive-avatar.webp",

  meta: {
    title: "@bellainlive × Fluencypass — Inglês para Tech",
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
    photo: "/assets/bellainlive-hero.webp",
    photoAlt: "Bella",
    photoTag: {
      loc: "Hoje",
      text: "Bella — Tech Lead.",
    },
  },

  ribbon: (
    <>
      <strong>Oferta exclusiva</strong> · seguidores da @bellainlive · planos
      com até 47% OFF + bônus de Inglês para Tech
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
    photo: "/assets/bellainlive-virada.webp",
    photoAlt: "Bella",
    cornerTag: "Bastidores",
    caption: '"Nunca foi falta de talento. Era falta de sistema."',
  },

  aspira: {
    screenLabel: "03 Aspiracional",
    h2: "O que muda quando o inglês sai do “algum dia”",
    lead: "Três portas que abrem para quem trabalha com tecnologia e finalmente destrava o idioma.",
    cards: [
      {
        icon: "briefcase-wide",
        title: "A entrevista técnica que você deixou de tentar",
        text: "A vaga que pedia inglês fluente deixa de ser a vaga em que você nem se candidatou. Entrevista técnica em inglês é treinável — e costuma ser o único filtro entre muita gente boa e um salto de carreira.",
      },
      {
        icon: "presentation",
        title: "Apresentar a sua solução para um time global",
        text: "Defender uma decisão de arquitetura, conduzir uma demo, explicar o porquê de um trade-off. Não é sobre sotaque: é sobre a ideia chegar inteira, com você sustentando ela em tempo real.",
      },
      {
        icon: "globe",
        title: "Trabalhar com o que não cabia antes",
        text: "Empresas que não estão no seu país, produtos usados por gente que você nunca vai encontrar, times distribuídos em cinco fusos. O idioma amplia o mapa do que dá para fazer da vida.",
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
    h2: "Benefícios exclusivos para seguidores da @bellainlive",
    lead: "Tudo que você precisa para usar o inglês onde ele decide carreira em tech: entrevista técnica e apresentação.",
    primary: {
      icon: "code",
      title: "Curso Intensivo de Inglês para Tech",
      text: "Vocabulário, fluência e estratégias de comunicação para entrevista técnica em inglês, apresentação de solução para times internacionais e o dia a dia de quem trabalha com tecnologia em outro idioma.",
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
        situação real — entrevista técnica, apresentação, daily — em vez de
        acumular teoria que você nunca usa.
      </>
    ),
  },

  compare: { h2: "Por que profissionais de tech escolhem a Fluencypass?" },

  faq: [
    {
      q: "Como funciona a parceria com a @bellainlive?",
      a: "A Bella (@bellainlive) é parceira oficial da Fluencypass. Quem chega pela indicação dela ganha o curso completo + Curso Intensivo de Inglês para Tech + condição especial — tudo aplicado automaticamente nesta página.",
    },
    {
      q: "Eu já tentei aprender inglês várias vezes e sempre parei. Por que agora seria diferente?",
      a: "Porque o que costuma falhar é a estrutura, não a pessoa. A plataforma define a trilha a partir de um teste de nível, a conversação diária cria a frequência que estudar sozinho não sustenta, e o professor corrige antes do erro virar hábito.",
    },
    {
      q: "O bônus de Inglês para Tech serve para quem ainda não trabalha em inglês?",
      a: "Serve — e geralmente é quem mais precisa. O curso cobre entrevista técnica, apresentação de solução e o dia a dia de um time internacional: as situações que aparecem antes de alguém conseguir a vaga, não depois.",
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
