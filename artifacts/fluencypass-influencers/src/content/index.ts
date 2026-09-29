import type { InfluencerLP } from './types'
import { bellainlive } from './bellainlive'
import { bianeuhauser } from './bianeuhauser'
import { homeofficing } from './homeofficing'
import { matheusasg09 } from './matheusasg09'
import { pasquadev } from './pasquadev'

/**
 * Registry das LPs. Adicionar um influenciador = criar content/<slug>.tsx e
 * registrar aqui; a rota /[influencer] e o build estático seguem sozinhos.
 */
const ALL: InfluencerLP[] = [homeofficing, matheusasg09, pasquadev, bianeuhauser, bellainlive]

export const LPS: Record<string, InfluencerLP> = Object.fromEntries(
  ALL.map((lp) => [lp.slug, lp]),
)

export const LP_SLUGS = ALL.map((lp) => lp.slug)

export function getLP(slug: string): InfluencerLP | undefined {
  return LPS[slug]
}

/** Cupons aceitos além dos padrões de cada LP (ex.: campanhas pontuais). */
const EXTRA_COUPONS: string[] = []

/** Cupons que ativam os bônus no modal de cupom. Não alteram a oferta (preços). */
export const VALID_COUPONS = new Set([...ALL.map((lp) => lp.defaultCoupon), ...EXTRA_COUPONS])
