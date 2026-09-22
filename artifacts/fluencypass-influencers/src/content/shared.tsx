import type { IconName } from '@/components/atoms/Icon'
import type { FaqItem, Tone } from './types'

/**
 * Conteúdo idêntico em todas as LPs. Mudar aqui muda em todas as páginas —
 * que era exatamente o ponto da migração.
 *
 * Valores comerciais (preços, % OFF, valor dos bônus) e links de checkout são
 * pendências abertas: ver B2, B3 e B4 no plano.
 */

/* ---------- PLANOS (bloco 4) ---------- */

export type PlanFeature = { text: string; dim?: boolean }

export type Plan = {
  id: 'starter' | 'professional' | 'premium'
  name: string
  title: string
  off: string
  ribbon?: string
  featured?: boolean
  desc: string
  price: string
  /** Placeholder — aguardando URLs reais de checkout (B2). */
  checkout: string
  features: PlanFeature[]
}

/** `bonusModule` entra na feature "Bônus completo + …". */
export function getPlans(bonusModule: string, tone: Tone): Plan[] {
  const pra = tone === 'coloquial' ? 'pra' : 'para'
  return [
    {
      id: 'starter',
      name: 'Starter',
      title: 'Comece a destravar',
      off: '42% OFF',
      desc: 'Escola de inglês online que te leva do zero à fluência em tempo recorde. Estude onde quiser.',
      price: 'R$149,00/mês',
      checkout: '#checkout-starter',
      features: [
        { text: 'Escola online 24h do iniciante ao Pós Avançado' },
        { text: '1 teste de nível com IA' },
        { text: '11 níveis CEFR com certificado a cada nível' },
        { text: 'Conversação em grupo' },
        { text: 'Aulas particulares', dim: true },
        { text: 'Intercâmbio no exterior', dim: true },
        { text: 'Acesso à Comunidade Fluencypass' },
        { text: '7 dias de risco zero' },
      ],
    },
    {
      id: 'professional',
      name: 'Professional',
      title: 'Turbine a prática',
      off: '47% OFF · exclusivo',
      ribbon: 'Mais escolhido · 47% OFF',
      featured: true,
      desc: 'Escola online + Aulas particulares + Conversação ilimitada. O combo que destrava sua fluência de negócios.',
      price: 'R$247,00/mês',
      checkout: '#checkout-professional',
      features: [
        { text: 'Tudo do Starter' },
        { text: 'Conversação ilimitada' },
        { text: 'Aulas particulares com professor certificado' },
        { text: '2 a 4 testes de nível com IA' },
        { text: 'Garantia de 12 meses de evolução' },
        { text: 'Intercâmbio no exterior', dim: true },
        { text: `Bônus completo + ${bonusModule}` },
        { text: '7 dias de risco zero' },
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      title: 'Ciclo completo',
      off: '31% OFF · exclusivo',
      desc: 'O ciclo completo da fluência: Escola online + Aula particular + Conversação ilimitada + Intercâmbio.',
      price: 'R$497,00/mês',
      checkout: '#checkout-premium',
      features: [
        { text: 'Tudo do Professional' },
        { text: 'Intercâmbio em +40 cidades pelo mundo' },
        { text: 'Assessoria de intercâmbio' },
        { text: `Até 3 anos ${pra} usar o intercâmbio` },
        { text: 'Garantia de 12 meses de evolução' },
        { text: '4 testes de nível com IA' },
        { text: `Bônus completo + ${bonusModule}` },
        { text: '7 dias de risco zero' },
      ],
    },
  ]
}

/* ---------- BÔNUS 02 (bloco 5) ---------- */

export function getBonusSecondary(tone: Tone) {
  const pra = tone === 'coloquial' ? 'pra' : 'para'
  return {
    icon: 'list' as IconName,
    title: 'Dobro de aulas particulares',
    text: `Você terá acesso ao dobro de aulas particulares, ${pra} um acompanhamento mais exclusivo e personalizado com nossos professores.`,
    priceFrom: 'R$ 500',
  }
}

/** Soma dos dois bônus. Diverge do briefing (R$ 2.497) — ver B4 no plano. */
export const BONUS_TOTAL = 'R$ 1497'

/* ---------- MÉTODO (bloco 7) ---------- */

export const METHOD_PILLARS: { num: string; icon: IconName; tag: string; title: string; text: string }[] = [
  {
    num: '01',
    icon: 'book',
    tag: 'Teoria',
    title: 'Plataforma de inglês online',
    text: 'Baseada no CEFR, com teste de nível, aulas teóricas e dinâmicas, quizzes, flashcards e materiais complementares.',
  },
  {
    num: '02',
    icon: 'chat',
    tag: 'Prática',
    title: 'Conversação + Aulas particulares',
    text: 'Conversação em grupos de até 6 alunos, intermediadas por professor certificado, com temas variados. E aulas particulares com temas personalizados.',
  },
  {
    num: '03',
    icon: 'plane',
    tag: 'Imersão',
    title: 'Intercâmbio no exterior',
    text: 'Experiência de imersão no exterior para praticar o idioma e viver a melhor experiência da sua vida.',
  },
]

/* ---------- ALUNOS (bloco 8) ---------- */

export const STUDENTS = [
  {
    name: 'Hugo Rosa',
    meta: 'Inglês · do zero a fluência',
    video: 'https://vimeo.com/838675620',
    thumb: '/assets/thumb_hugo.png',
    duration: '03:47',
    achievement: 'Entrevista em inglês',
  },
  {
    name: 'Heloisa Pestana',
    meta: 'Inglês · destravou rapidamente',
    video: 'https://vimeo.com/838675582',
    thumb: '/assets/thumb_heloisa.png',
    duration: '04:41',
    achievement: 'Pronta para o mundo',
  },
  {
    name: 'Rafael Rodrigues',
    meta: 'Inglês · intermediário ao intercâmbio',
    video: 'https://vimeo.com/838675704',
    thumb: '/assets/thumb_rafael.png',
    duration: '08:33',
    achievement: 'Ciclo completo da fluência',
  },
]

/* ---------- TABELA COMPARATIVA (bloco 9) ---------- */

/** [benefício, Fluencypass, Escola física, Escola online, Professor particular] */
export const COMPARE_ROWS: [string, boolean, boolean, boolean, boolean][] = [
  ['Ciclo completo de aprendizagem', true, false, false, false],
  ['Aulas online com acesso 24/7', true, false, true, false],
  ['Aulas particulares', true, false, false, true],
  ['Conversação em grupo ilimitada', true, false, false, false],
  ['Intercâmbio no exterior com suporte e assessoria', true, false, false, false],
  ['Material didático grátis', true, false, false, false],
  ['Sem deslocamento até a escola', true, false, true, true],
  ['Módulos extras sem custo adicional', true, false, false, false],
  ['Cancelamento sem multa', true, false, false, true],
]

export const COMPARE_COLUMNS = ['Fluencypass', 'Escola física', 'Escola online', 'Professor particular']

/* ---------- FAQ BASE (bloco 10) ---------- */

/** As 11 perguntas iguais em todas as LPs. As específicas vêm do content/<slug>. */
export function getBaseFaq(tone: Tone): FaqItem[] {
  const pra = tone === 'coloquial' ? 'pra' : 'para'
  return [
    {
      q: `Qual nível de inglês eu preciso ter ${pra} começar?`,
      a: 'Nenhum. Você pode começar do zero — a plataforma faz um teste no início e te coloca na trilha certa.',
    },
    {
      q: 'Como funciona a garantia de 12 meses?',
      a: 'Se você seguir o método recomendado (60 min/dia, 1 lição diária + conversação) e não evoluir de nível em 12 meses, a Fluencypass devolve o valor investido. Detalhes nos termos de uso.',
    },
    { q: 'Consigo estudar pelo celular?', a: 'Sim. Plataforma 24/7 no celular, tablet ou computador.' },
    {
      q: 'Como são as aulas de conversação em grupo?',
      a: 'Grupos de até 6 alunos do mesmo nível, 25 minutos, várias por dia, com professores certificados e temas variados.',
    },
    {
      q: 'Quem são os professores?',
      a: 'Professores certificados, brasileiros e estrangeiros, com formação específica em ensino de inglês.',
    },
    {
      q: 'Quando e para onde posso fazer intercâmbio?',
      a: 'Mais de 40 cidades pelo mundo, em até 3 anos a partir da contratação do Plano Premium.',
    },
    {
      q: 'Como eu vou saber que estou evoluindo?',
      a:
        tone === 'coloquial'
          ? 'Você faz testes de nível periódicos baseados no CEFR e recebe certificado a cada nível atingido.'
          : 'Você faz testes de nível periódicos baseados no CEFR (Quadro Comum Europeu) e recebe certificado a cada nível atingido.',
    },
    {
      q: 'A Fluencypass é segura?',
      a: 'Sim. Empresa registrada (CNPJ 16.668.743/0001-74), com reputação RA1000 no Reclame Aqui.',
    },
    {
      q: 'Eu recebo certificado?',
      a: 'Sim. A cada nível concluído, baseado no Quadro Comum Europeu (CEFR), reconhecido internacionalmente.',
    },
    { q: 'Como funciona o pagamento?', a: 'Cartão de crédito em até 12x ou outros meios disponíveis no checkout.' },
    {
      q: 'Se eu não gostar, posso cancelar?',
      a: 'Sim. Você tem 7 dias para teste sem risco, e cancelamento sem multa conforme termos de uso.',
    },
  ]
}

/* ---------- RODAPÉ (bloco 11) ---------- */

export const COMPANY = {
  cnpj: '16.668.743/0001-74',
  phone: '+55 11 2189-0474',
  logo: '/assets/fluencypass-logo.webp',
  /** Pendência B6 (LGPD): substituir por URLs reais antes de publicar. */
  links: [
    { label: 'Política de privacidade', href: '#' },
    { label: 'Termos de uso', href: '#' },
    { label: 'Atendimento', href: '#' },
  ],
}
