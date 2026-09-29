import { useState, type FormEvent } from 'react'
import { Cta } from '@/components/atoms/Cta'
import { Icon } from '@/components/atoms/Icon'
import { GlassLock } from '@/components/molecules/GlassLock'
import { BONUS_COUPON_FIELD, normalizeCoupon, useLeadGate } from '@/components/organisms/LeadGate'
import { BONUS_OFFER, BONUS_TOTAL, getBonusSecondary, getPlans } from '@/content/shared'
import type { InfluencerLP } from '@/content/types'

/** inactive: cadastrado, sem cupom · active: cupom ativado · unavailable: ativação travada. */
type BonusStatus = 'inactive' | 'active' | 'unavailable'

const STATUS_PILL: Record<BonusStatus, { icon: 'lock-sm' | 'check'; text: string }> = {
  inactive: { icon: 'lock-sm', text: 'Inativo · ative com cupom' },
  active: { icon: 'check', text: 'Ativo · incluso no plano' },
  unavailable: { icon: 'lock-sm', text: 'Indisponível no momento' },
}

function BonusCard({
  index,
  icon,
  title,
  text,
  priceFrom,
  feature,
  status,
}: {
  index: string
  icon: Parameters<typeof Icon>[0]['name']
  title: string
  text: string
  priceFrom: string
  feature?: boolean
  status: BonusStatus
}) {
  const classes = [
    'bonus-card',
    feature && 'bonus-card--feature',
    status !== 'active' && 'bonus-card--inactive',
  ]
    .filter(Boolean)
    .join(' ')
  const pill = STATUS_PILL[status]
  return (
    <article className={classes}>
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
        <div className={`bonus-card__status bonus-card__status--${status}`}>
          <Icon name={pill.icon} size={13} strokeWidth={2.4} />
          {pill.text}
        </div>
      </div>
    </article>
  )
}

/** Campo de cupom inline: vazio, a menos que a URL traga um ?cupom= válido. */
function BonusCouponForm({ lp }: { lp: InfluencerLP }) {
  const { urlCoupon, activateBonus } = useLeadGate()
  const [value, setValue] = useState(urlCoupon)
  const [error, setError] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!activateBonus(value)) setError(true)
  }

  return (
    <form className="bonus-coupon" noValidate onSubmit={handleSubmit}>
      <label htmlFor={BONUS_COUPON_FIELD} className="bonus-coupon__label">
        Cupom
      </label>
      <div className="bonus-coupon__row">
        <input
          type="text"
          id={BONUS_COUPON_FIELD}
          name="coupon"
          placeholder="Digite seu cupom"
          autoComplete="off"
          value={value}
          aria-invalid={error}
          aria-describedby={`${BONUS_COUPON_FIELD}-hint`}
          onChange={(e) => {
            setValue(normalizeCoupon(e.target.value))
            setError(false)
          }}
        />
        <button type="submit" className="btn btn--coral">
          Ativar
        </button>
      </div>
      <span
        id={`${BONUS_COUPON_FIELD}-hint`}
        className={error ? 'bonus-coupon__error' : 'bonus-coupon__hint'}
        role={error ? 'alert' : undefined}
      >
        {error
          ? 'Cupom não encontrado. Confira e tente de novo.'
          : `Use o cupom que ${lp.article} ${lp.handle} divulgou.`}
      </span>
    </form>
  )
}

export function BonusKit({ lp }: { lp: InfluencerLP }) {
  const secondary = getBonusSecondary(lp.tone)
  const { bonusAvailable, bonusUnlocked, coupon, openBonus } = useLeadGate()
  const status: BonusStatus = bonusUnlocked ? 'active' : bonusAvailable ? 'inactive' : 'unavailable'

  const eligible = getPlans(lp.bonusModule, lp.tone)
    .filter((p) => p.hasBonus)
    .map((p) => p.name)
  const eligibility = `Válido nos planos ${eligible.join(' e ')}.`

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

        {/* O cadastro tira o vidro; os bônus seguem "inativos" até o cupom. */}
        <GlassLock
          className="bonus__lock"
          tone="dark"
          onOpen={openBonus}
          label={bonusAvailable ? BONUS_OFFER.headline : 'Cadastre-se para ver os benefícios'}
          action={bonusAvailable ? 'Ativar bônus' : 'Ver benefícios'}
        >
          <div className={`bonus__state bonus__state--${status}`} role="status">
            <Icon name={status === 'active' ? 'check' : 'lock-sm'} size={16} strokeWidth={2.4} />
            {status === 'active'
              ? `Bônus ativos com o cupom ${coupon}`
              : status === 'inactive'
                ? 'Bônus inativos: ative com o cupom abaixo'
                : 'Ativação de bônus indisponível no momento'}
          </div>

          <div className="bonus__grid">
            <BonusCard
              index="Bônus 01"
              feature
              icon={lp.bonus.primary.icon}
              title={lp.bonus.primary.title}
              text={lp.bonus.primary.text}
              priceFrom={lp.bonus.primary.priceFrom}
              status={status}
            />
            <BonusCard
              index="Bônus 02"
              icon={secondary.icon}
              title={secondary.title}
              text={secondary.text}
              priceFrom={secondary.priceFrom}
              status={status}
            />
          </div>

          <div className="bonus__total">
            <div>
              {status === 'active' ? (
                <>
                  <div className="label">Valor total de economia com os bônus</div>
                  <div className="value">
                    <s>{BONUS_TOTAL}</s>
                    <span className="arrow">→</span>R$ 0
                  </div>
                  <div className="sub">
                    Seu investimento: <strong>apenas o valor do plano escolhido.</strong>
                  </div>
                </>
              ) : (
                <>
                  <div className="label">
                    {status === 'inactive' ? 'Ative e economize' : 'Valor dos bônus'}
                  </div>
                  <div className="value">{BONUS_TOTAL}</div>
                </>
              )}
              <div className="bonus__eligibility">{eligibility}</div>
            </div>
            <div className="bonus__action">
              {status === 'inactive' && <BonusCouponForm lp={lp} />}
              {status === 'active' && <Cta label="Escolher meu plano com bônus" />}
              {status === 'unavailable' && <Cta />}
            </div>
          </div>
        </GlassLock>
      </div>
    </section>
  )
}
