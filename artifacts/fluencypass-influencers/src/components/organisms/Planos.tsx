import { Icon } from '@/components/atoms/Icon'
import { PlanCard } from '@/components/molecules/PlanCard'
import { useLeadGate } from '@/components/organisms/LeadGate'
import { getPlans } from '@/content/shared'
import type { InfluencerLP } from '@/content/types'
import { CenterFeaturedPlan } from './CenterFeaturedPlan'

export function Planos({ lp }: { lp: InfluencerLP }) {
  const plans = getPlans(lp.bonusModule, lp.tone)
  const { unlocked } = useLeadGate()
  return (
    <section className="section plans" id="planos" data-screen-label="04 Planos">
      <div className="container">
        <div className="plans__head">
          <h2 className="h-section">{lp.planos.h2}</h2>
        </div>
        {unlocked && <PlansBanner />}

        <p className="aviso-rolamento">← arraste para explorar →</p>
        <div className="plans__grid plans__grid--carousel">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
        <CenterFeaturedPlan />

        <div className="plans__guarantee">
          <Icon name="shield" size={20} strokeWidth={2} />
          <span>
            <strong style={{ color: 'var(--gray-950)' }}>Risco zero:</strong> 7 dias para sua
            satisfação ou seu dinheiro de volta.
          </span>
        </div>
      </div>
    </section>
  )
}

/** Faixa acima dos planos depois do lead: convite ao cupom (amarela) ou confirmação (verde). */
function PlansBanner() {
  const { bonusUnlocked, bonusAvailable, coupon, openBonus } = useLeadGate()

  if (bonusUnlocked) {
    return (
      <div className="coupon-banner coupon-banner--applied" role="status">
        <Icon name="check" size={20} strokeWidth={2.4} />
        <span>
          <strong>Cupom {coupon} aplicado:</strong> bônus exclusivos ativados.
        </span>
      </div>
    )
  }

  if (bonusAvailable) {
    return (
      <button type="button" className="coupon-banner coupon-banner--pending" onClick={openBonus}>
        <Icon name="gift" size={20} strokeWidth={2} />
        <span>
          <strong>Utilize o cupom</strong> e desbloqueie bônus exclusivos
        </span>
        <Icon name="arrow-right" size={16} strokeWidth={2} className="arrow" />
      </button>
    )
  }

  return (
    <div className="coupon-banner coupon-banner--applied" role="status">
      <Icon name="check" size={20} strokeWidth={2.4} />
      <span>
        <strong>Oferta liberada:</strong> condição especial para seguidores.
      </span>
    </div>
  )
}
