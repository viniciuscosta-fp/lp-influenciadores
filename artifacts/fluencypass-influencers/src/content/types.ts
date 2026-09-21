import type { ReactNode } from 'react'
import type { IconName } from '@/components/atoms/Icon'

/**
 * Voz dos blocos compartilhados. A LP da Maria usa "para", a do Matheus usa
 * "pra" — inclusive em blocos idênticos. O campo preserva essa diferença sem
 * duplicar o conteúdo base.
 */
export type Tone = 'neutro' | 'coloquial'

export type Metric = { n: string; l: string }

export type AspiraCard = { icon: IconName; title: string; text: string }

export type FaqItem = { q: string; a: ReactNode }

/**
 * Tudo que muda de uma LP pra outra. O que não está aqui vem de content/shared.tsx
 * e é idêntico em todas as páginas (planos, método, tabela, FAQ base, alunos).
 */
export type InfluencerLP = {
  /** Segmento da rota: /[slug] */
  slug: string
  name: string
  /** Handle com @, como aparece no eyebrow, ribbon e rodapé. */
  handle: string
  /** Artigo usado ao citar em 3ª pessoa: "a Maria", "o Matheus". */
  article: 'a' | 'o'
  /** Pronome possessivo para "os seguidores dela/dele". */
  possessive: 'dela' | 'dele'
  tone: Tone
  /** Módulo bônus exclusivo — hoje só existem estes dois. */
  bonusModule: 'Inglês para Business' | 'Inglês para Tech'
  avatar: string

  meta: { title: string; description: string }

  hero: {
    headline: ReactNode
    sub: ReactNode
    taglineIcon: IconName
    tagline: string
    seal: string
    metrics: [Metric, Metric, Metric]
    photo: string
    photoAlt: string
    photoTag: { loc: string; text: string }
  }

  ribbon: ReactNode

  virada: {
    h2: string
    /** Parágrafos em 1ª pessoa. O primeiro recebe a capitular (.dropcap). */
    body: ReactNode
    signatureMeta: string
    photo: string
    photoAlt: string
    cornerTag: string
    caption: string
  }

  aspira: {
    /** data-screen-label do bloco 3 — "03 Aspiracional" / "03 Custo de não agir". */
    screenLabel: string
    h2: string
    lead: string
    cards: [AspiraCard, AspiraCard, AspiraCard]
    anchor: { main: string; sub: string }
  }

  planos: { h2: ReactNode }

  bonus: {
    h2: string
    lead: string
    primary: { icon: IconName; title: string; text: string; priceFrom: string }
  }

  /**
   * Bloco 6 — depoimento em vídeo do influenciador.
   * Fica oculto (enabled: false) até a gravação existir; ver B10 no plano.
   */
  testimonial: {
    enabled: boolean
    h2: string
    lead: string
    duration: string
    quote: string
  }

  metodo: { diferencial: ReactNode }

  compare: { h2: string }

  /** Perguntas próprias desta LP; as fixas vêm de shared.tsx e entram depois. */
  faq: FaqItem[]

  footer: { tagline: string }
}
