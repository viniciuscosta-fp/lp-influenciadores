import { Icon } from '@/components/atoms/Icon'
import type { InfluencerLP } from '@/content/types'

/**
 * Bloco 6 — depoimento em vídeo do influenciador.
 *
 * Renderiza só quando `testimonial.enabled` é true. Hoje está desligado em
 * todas as LPs porque nenhum vídeo foi gravado ainda (pendência B10) — nas
 * páginas antigas esse bloco estava comentado no HTML.
 */
export function Testimonial({ lp }: { lp: InfluencerLP }) {
  const t = lp.testimonial
  if (!t.enabled) return null

  return (
    <section className="section maria-test" data-screen-label="06 Depoimento">
      <div className="container">
        <div className="maria-test__head">
          <h2 className="h-section">{t.h2}</h2>
          <p className="lead">{t.lead}</p>
        </div>

        <div className="maria-test__player" role="button" aria-label={`Reproduzir depoimento de ${lp.name}`}>
          <button className="play" aria-label="Play">
            <Icon name="play" size={32} />
          </button>
          <div className="cap">
            <span className="pulse" />
            Depoimento · {lp.name}
          </div>
          <div className="dur">{t.duration}</div>
        </div>

        <div className="maria-test__quote">
          <p>{t.quote}</p>
          <div className="who">
            <strong>{lp.name}</strong>
            <span className="sep">·</span>
            <span>{lp.handle}</span>
          </div>
        </div>

        <div className="maria-test__cta">
          <a href="#planos">
            Quero assinar
            <Icon name="arrow-right" size={16} strokeWidth={2.2} />
          </a>
        </div>
      </div>
    </section>
  )
}
