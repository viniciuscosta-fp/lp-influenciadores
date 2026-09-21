import type { InfluencerLP } from './types'
import { homeofficing } from './homeofficing'
import { matheusasg09 } from './matheusasg09'

/**
 * Registry das LPs. Adicionar um influenciador = criar content/<slug>.tsx e
 * registrar aqui; a rota /[influencer] e o build estático seguem sozinhos.
 */
const ALL: InfluencerLP[] = [homeofficing, matheusasg09]

export const LPS: Record<string, InfluencerLP> = Object.fromEntries(
  ALL.map((lp) => [lp.slug, lp]),
)

export const LP_SLUGS = ALL.map((lp) => lp.slug)

export function getLP(slug: string): InfluencerLP | undefined {
  return LPS[slug]
}
