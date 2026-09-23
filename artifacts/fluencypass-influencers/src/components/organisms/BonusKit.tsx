import { Cta } from '@/components/atoms/Cta'
import { Icon } from '@/components/atoms/Icon'
import { GlassLock } from '@/components/molecules/GlassLock'
import { useLeadGate } from '@/components/organisms/LeadGate'
import { BONUS_TOTAL, getBonusSecondary } from '@/content/shared'
import type { InfluencerLP } from '@/content/types'

function BonusCard({
  index,
  icon,
  title,
  text,
  priceFrom,
  feature,
}: {
  index: string
  icon: Parameters<typeof Icon>[0]['name']
  title: string
  text: string
  priceFrom: string
  feature?: boolean
}) {
  return (
    <article className={feature ? 'bonus-card bonus-card--feature' : 'bonus-card'}>
      <span className="bonus-card__index">{index}</span>
      <span className="bonus-card__badge">
        <span
          style={{
            width: '5px',
            height: '5px',
            background: '#fff',
            borderRadius: '999px',
            display: 'inline-block',
          }}
        />
        Bônus exclusivo
      </span>
      <div className="bonus-card__icon">
        <Icon name={icon} size={24} strokeWidth={1.6} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
      <div className="bonus-card__price">
        <div>
          <div className="lbl">De</div>
          <div className="val">{priceFrom}</div>
        </div>
        <div className="now">Incluso no plano</div>
      </div>
    </article>
  )
}

export function BonusKit({ lp }: { lp: InfluencerLP }) {
  const secondary = getBonusSecondary(lp.tone)
  const { coupon } = useLeadGate()
  return (
    <section className="section section--dark bonus" id="bonus" data-screen-label="05 Bonus Kit">
      <div className="container">
        <div className="bonus__head">
          <span className="eyebrow">
            <span className="dot" />
            Bônus exclusivo
          </span>
          <h2 className="h-section">{lp.bonus.h2}</h2>
          <p className="lead">{lp.bonus.lead}</p>
        </div>

        <GlassLock
          className="bonus__lock"
          tone="dark"
          label="Bônus exclusivos"
          detail={<>liberados com o cupom {coupon}</>}
          action="Liberar bônus"
        >
          <div className="bonus__grid">
            <BonusCard
              index="Bônus 01"
              feature
              icon={lp.bonus.primary.icon}
              title={lp.bonus.primary.title}
              text={lp.bonus.primary.text}
              priceFrom={lp.bonus.primary.priceFrom}
            />
            <BonusCard
              index="Bônus 02"
              icon={secondary.icon}
              title={secondary.title}
              text={secondary.text}
              priceFrom={secondary.priceFrom}
            />
          </div>

          <div className="bonus__total">
            <div>
              <div className="label">Valor total de economia com os bônus</div>
              <div className="value">
                <s>{BONUS_TOTAL}</s>
                <span className="arrow">→</span>R$ 0
              </div>
              <div className="sub">
                Seu investimento: <strong>apenas o valor do plano escolhido.</strong>
              </div>
            </div>
            <div>
              <Cta />
            </div>
          </div>
        </GlassLock>
      </div>
    </section>
  )
}
