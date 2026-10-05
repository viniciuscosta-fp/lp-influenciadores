import { Check } from '@/components/atoms/Check'
import { Icon } from '@/components/atoms/Icon'
import { GlassLock } from '@/components/molecules/GlassLock'
import { BonusCta, PlanCta, useLeadGate } from '@/components/organisms/LeadGate'
import type { Plan } from '@/content/shared'

export function PlanCard({ plan }: { plan: Plan }) {
  const { unlocked, bonusAvailable, bonusUnlocked } = useLeadGate()
  return (
    <article className={plan.featured ? 'plan plan--featured' : 'plan'}>
      {plan.ribbon && <span className="plan__ribbon">{plan.ribbon}</span>}
      <span className="plan__name">{plan.name}</span>
      <h3 className="plan__title">{plan.title}</h3>
      {/* % OFF e preço ficam sob o vidro até o formulário ser enviado. A oferta não depende de cupom. */}
      <GlassLock
        className="plan__offer"
        tone={plan.featured ? 'dark' : 'light'}
        label="Preço para seguidores"
        detail="cadastre-se para ver"
      >
        <span className="plan__off">{plan.off}</span>
        <span className="plan__price">
          {plan.price.replace('/mês', '')}
          <span className="plan__price-period">/mês</span>
        </span>
      </GlassLock>
      {!unlocked && plan.hasBonus && bonusAvailable && (
        <span className="plan__bonus-hint">
          <Icon name="gift" size={14} strokeWidth={2} />
          + bônus exclusivos com cupom
        </span>
      )}
      <p className="plan__desc">{plan.desc}</p>
      <ul className="plan__features">
        {plan.features.map((f) => (
          <li key={f.text} className={f.dim ? 'dim' : undefined}>
            <Check dim={f.dim} />
            {f.text}
          </li>
        ))}
      </ul>
      {bonusUnlocked && plan.hasBonus ? (
        <>
          <BonusCta plan={plan} />
          <PlanCta plan={plan} />
        </>
      ) : (
        <>
          <PlanCta plan={plan} />
          <BonusCta plan={plan} />
        </>
      )}
    </article>
  )
}
