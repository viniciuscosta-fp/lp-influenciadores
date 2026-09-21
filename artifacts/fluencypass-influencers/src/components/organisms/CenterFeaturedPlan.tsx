import { useEffect } from 'react'

/**
 * No mobile os planos viram carrossel horizontal. Centraliza o card destacado
 * (Professional) na primeira renderização, como faziam as LPs originais.
 */
export function CenterFeaturedPlan() {
  useEffect(() => {
    const track = document.querySelector<HTMLElement>('.plans__grid--carousel')
    const featured = track?.querySelector<HTMLElement>('.plan--featured')
    if (!track || !featured) return
    track.scrollLeft = featured.offsetLeft - (track.offsetWidth - featured.offsetWidth) / 2
  }, [])
  return null
}
