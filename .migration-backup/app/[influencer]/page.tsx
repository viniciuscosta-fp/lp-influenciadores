import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { InfluencerLPTemplate } from '@/components/templates/InfluencerLPTemplate'
import { LP_SLUGS, getLP } from '@/content'

type Props = { params: Promise<{ influencer: string }> }

/** Gera as LPs estaticamente no build — uma rota por influenciador registrado. */
export function generateStaticParams() {
  return LP_SLUGS.map((influencer) => ({ influencer }))
}

/** Slug fora do registry vira 404, em vez de renderizar página vazia. */
export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { influencer } = await params
  const lp = getLP(influencer)
  if (!lp) return {}
  return {
    title: lp.meta.title,
    description: lp.meta.description,
  }
}

export default async function InfluencerPage({ params }: Props) {
  const { influencer } = await params
  const lp = getLP(influencer)
  if (!lp) notFound()
  return <InfluencerLPTemplate lp={lp} />
}
