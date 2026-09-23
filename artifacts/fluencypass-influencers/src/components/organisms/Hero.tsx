import { Cta } from '@/components/atoms/Cta'
import { Icon } from '@/components/atoms/Icon'
import { COMPANY } from '@/content/shared'
import type { InfluencerLP } from '@/content/types'
import { useLeadGate } from './LeadGate'

export function Hero({ lp }: { lp: InfluencerLP }) {
  const { hero } = lp
  return (
    <section className="section section--dark hero" data-screen-label="01 Hero">
      <div className="hero__grid">
        <div className="hero__copy">
          <div className="hero__eyebrow">
            <span className="avatar-sm">
              <img src={lp.avatar} alt={lp.name} />
            </span>
            {lp.handle}
            <span className="plus">+</span>
            <span className="brand-mini">
              <img src={COMPANY.logo} alt="Fluencypass" />
            </span>
          </div>

          <h1 className="h-display">{hero.headline}</h1>

          <p className="hero__sub">{hero.sub}</p>

          <div className="hero__tagline">
            <Icon name={hero.taglineIcon} size={20} strokeWidth={1.8} />
            <span>{hero.tagline}</span>
          </div>

          <div className="hero__ctaRow">
            <Cta />
            <span className="hero__seal">
              <Icon name="lock" size={16} strokeWidth={2} />
              {hero.seal}
            </span>
          </div>

          <div className="hero__metrics">
            {hero.metrics.map((m) => (
              <div className="hero__metric" key={m.l}>
                <div className="n">{m.n}</div>
                <div className="l">{m.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__photo">
          <img src={hero.photo} alt={hero.photoAlt} />
          <div className="hero__photoTag">
            <span className="loc">{hero.photoTag.loc}</span>
            <span>{hero.photoTag.text}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Ribbon({ lp }: { lp: InfluencerLP }) {
  const { unlocked, coupon } = useLeadGate()
  return (
    <div className="ribbon">
      {lp.ribbon}
      {unlocked ? (
        <> · cupom <strong>{coupon}</strong> aplicado ✓</>
      ) : (
        <> · use o cupom <strong>{coupon}</strong> no cadastro</>
      )}
    </div>
  )
}
