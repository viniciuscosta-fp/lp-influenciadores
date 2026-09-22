import type { InfluencerLP } from "./types";

/**
 * LP Vinicius Pasquantonio — eixo Greed no enquadramento de testemunha/insider ·
 * bônus Inglês para Tech.
 *
 * ⚠️ DRAFT: tudo entre [COLCHETES] é placeholder aguardando validação dele.
 * A copy e o raciocínio editorial estão em copy/pasquadev.md.
 *
 * Nota de formato: ele nunca teve dificuldade com inglês — aprendeu criança. Por
 * isso o bloco "A Virada" aqui não é história de superação, como nas LPs da Maria
 * e do Matheus. O arco é outro: ele teve uma vantagem que não escolheu, demorou a
 * perceber o tamanho dela, e é daí que vem a autoridade para dizer onde os outros
 * travam. A oferta fecha o arco — construir de propósito o que ele teve por acaso.
 */
export const pasquadev: InfluencerLP = {
  slug: "pasquadev",
  name: "Vinicius Pasquantonio",
  handle: "@pasquadev",
  article: "o",
  possessive: "dele",
  tone: "neutro",
  bonusModule: "Inglês para Tech",
  avatar: "/assets/placeholder-pasquadev-avatar.svg",

  meta: {
    title: "@pasquadev × Fluencypass — Inglês para Tech",
    description:
      "Parceria oficial @pasquadev × Fluencypass. Dá para trabalhar em Nova York sem sair do Brasil — o que falta não é código, é conversação.",
  },

  hero: {
    headline: (
      <>
        Dá para trabalhar em Nova York <em>sem sair do Brasil</em>.
      </>
    ),
    sub: "Parceria oficial com o Vinicius Pasquantonio (@pasquadev). Condições especiais para quem já lê inglês sem esforço e trava na hora de falar.",
    taglineIcon: "clock",
    tagline:
      "Seu inglês de documentação resolve o código. Não resolve a entrevista.",
    seal: "Exclusivo para seguidores do @pasquadev",
    metrics: [
      {
        n: "25min",
        l: "de conversação em grupos do seu nível, várias por dia",
      },
      { n: "12mo", l: "garantia de evolução de nível" },
      { n: "RA1000", l: "reputação no Reclame Aqui" },
    ],
    photo: "/assets/placeholder-pasquadev-hero.svg",
    photoAlt: "Vinicius Pasquantonio",
    photoTag: {
      loc: "[CIDADE] · Hoje",
      text: "Vinicius Pasquantonio — [CARGO], trabalha remoto para uma empresa em Nova York.",
    },
  },

  ribbon: (
    <>
      <strong>Oferta exclusiva</strong> · seguidores do @pasquadev · planos com
      até 47% OFF + bônus de Inglês para Tech
    </>
  ),

  virada: {
    h2: "O inglês chegou cedo para mim. Levei anos para entender o tamanho da vantagem.",
    body: (
      <>
        <p className="dropcap">
          Aprendi inglês ainda criança, muito antes de saber que aquilo teria
          alguma coisa a ver com carreira. Quando entrei no mercado de
          tecnologia, o idioma já estava resolvido — e, por um bom tempo,{" "}
          <strong>eu achei que fosse assim para todo mundo.</strong>
        </p>
        <p>
          Não é. Hoje eu trabalho para uma empresa de Nova York de forma remota,
          leio a documentação no dia em que ela sai e entro em qualquer
          discussão técnica sem precisar ensaiar antes.{" "}
          <strong>
            Nada disso é mérito técnico meu. É o idioma ter chegado antes.
          </strong>
        </p>
        <p>
          É exatamente por isso que eu enxergo onde a maioria trava. Quase nunca
          é no código. É na hora de abrir a boca. Fechei essa parceria com a
          Fluencypass porque ela ataca esse ponto e não outro:{" "}
          <strong>conversação todos os dias, com gente no seu nível.</strong> É
          construir de propósito a vantagem que eu tive por acaso.
        </p>
      </>
    ),
    signatureMeta: "@pasquadev",
    photo: "/assets/placeholder-pasquadev-virada.svg",
    photoAlt: "Vinicius Pasquantonio",
    cornerTag: "Bastidores",
    caption:
      '"A vantagem que eu tive por acaso, dá para construir de propósito."',
  },

  aspira: {
    screenLabel: "03 Aspiracional",
    h2: "O que a conversação destrava para quem já lê inglês",
    lead: "Três coisas que mudam quando o idioma sai do papel e vai para a fala.",
    cards: [
      {
        icon: "globe",
        title: "Trabalhar para fora sem sair do Brasil",
        text: "Time remoto, contrato daqui, entrega lá fora. Não é exceção — é como boa parte do mercado de tecnologia opera hoje. E o filtro de entrada quase nunca é técnico.",
      },
      {
        icon: "chat",
        title: "Passar na entrevista técnica em inglês",
        text: "Resolver o problema é a parte que você já sabe fazer. O difícil é narrar o raciocínio enquanto resolve, responder o follow-up e discordar do entrevistador — tudo em inglês, em tempo real.",
      },
      {
        icon: "book",
        title: "Ler o que ainda não chegou aqui",
        text: "Documentação, RFC, release note, talk de conferência. O conteúdo técnico nasce em inglês e demora para ser traduzido, quando é. Quem lê no original trabalha com meses de vantagem.",
      },
    ],
    anchor: {
      main: "Leitura técnica te faz acompanhar. Conversação te faz ser contratado.",
      sub: "O gargalo entre você e a vaga fora do Brasil não é o seu código.",
    },
  },

  planos: {
    h2: (
      <>
        Escolha o plano para sair da leitura e{" "}
        <em style={{ color: "var(--coral)", fontStyle: "normal" }}>
          ir para a conversa
        </em>
      </>
    ),
  },

  bonus: {
    h2: "Kit completo para seguidores do @pasquadev",
    lead: "Tudo que você precisa para destravar o inglês falado do dia a dia técnico.",
    primary: {
      icon: "code",
      title: "Curso Intensivo de Inglês para Tech",
      text: "Vocabulário, expressões e simulações reais de daily, code review, entrevista técnica em inglês, pair programming e comunicação com times globais.",
      priceFrom: "R$ 997",
    },
  },

  testimonial: {
    enabled: false,
    h2: "Por que o Vinicius escolheu a Fluencypass",
    lead: "Em 1 minuto, o Vinicius conta por que essa parceria faz sentido para quem é dev e quer trabalhar fora.",
    duration: "01:24",
    quote: "[PULL QUOTE — definir depois da gravação]",
  },

  metodo: {
    diferencial: (
      <>
        <strong>Diferencial:</strong> cada aula é uma oportunidade de praticar
        situações reais do dia a dia — daily, code review, entrevista técnica.
      </>
    ),
  },

  compare: { h2: "Por que devs escolhem a Fluencypass?" },

  faq: [
    {
      q: "Como funciona a parceria com o @pasquadev?",
      a: "O Vinicius (@pasquadev) é parceiro oficial da Fluencypass. Quem chega pela indicação dele ganha o curso completo + Curso Intensivo de Inglês para Tech + condição especial — tudo aplicado automaticamente nesta página.",
    },
    {
      q: "Eu já leio documentação em inglês sem esforço. Ainda preciso disso?",
      a: "Provavelmente sim. Ler é recepção, falar é produção — são habilidades diferentes e treinam separado. É comum o dev acompanhar uma discussão técnica inteira em inglês e travar na primeira pergunta direta.",
    },
    {
      q: "O Inglês para Tech cobre entrevista técnica?",
      a: "Cobre. Daily, code review, entrevista técnica, pair programming e comunicação com time global — as situações reais de quem trabalha, ou quer trabalhar, em time internacional.",
    },
    {
      q: "Quanto tempo até eu conseguir aplicar para uma vaga fora do Brasil?",
      a: "Depende do seu nível atual e da sua dedicação. Seguindo a rotina recomendada (60 min/dia), muitos alunos chegam à fluência funcional em torno de 12 meses, e a partir daí ficam aptos a aplicar com confiança.",
    },
  ],

  footer: {
    tagline:
      '"O inglês que devs brasileiros usam para trabalhar fora sem sair daqui."',
  },
};
