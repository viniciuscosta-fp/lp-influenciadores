import { Cta } from '@/components/atoms/Cta'
import { Icon } from '@/components/atoms/Icon'
import type { InfluencerLP } from '@/content/types'

/** Bloco 3 — os 3 cards do eixo emocional (aspiração ou custo de não agir). */
export function Aspiracional({ lp }: { lp: InfluencerLP }) {
  const { aspira } = lp
  return (
    <section
      className="section section--dark aspira"
      id="aspiracional"
      data-screen-label={aspira.screenLabel}
    >
      <div className="container">
        <div className="aspira__head">
          <h2>{aspira.h2}</h2>
          <p className="lead">{aspira.lead}</p>
        </div>

        <div className="aspira__grid">
          {aspira.cards.map((card, i) => (
            <article className="aspira-card" key={card.title}>
              <span className="aspira-card__num">
                {String(i + 1).padStart(2, '0')} / {String(aspira.cards.length).padStart(2, '0')}
              </span>
              <div className="aspira-card__icon">
                <Icon name={card.icon} size={28} strokeWidth={1.5} />
              </div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>

        <div className="aspira__anchor">
          <p>{aspira.anchor.main}</p>
          <p className="sub">{aspira.anchor.sub}</p>
        </div>

        <div className="aspira__cta">
          <Cta />
        </div>
      </div>
    </section>
  )
}
