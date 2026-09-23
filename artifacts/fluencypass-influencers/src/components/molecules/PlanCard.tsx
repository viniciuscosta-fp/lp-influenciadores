import { Check } from '@/components/atoms/Check'
import { GlassLock } from '@/components/molecules/GlassLock'
import { useLeadGate } from '@/components/organisms/LeadGate'
import { PlanCta } from '@/components/organisms/LeadGate'
import type { Plan } from '@/content/shared'

export function PlanCard({ plan }: { plan: Plan }) {
  const { coupon } = useLeadGate()
  return (
    <article className={plan.featured ? 'plan plan--featured' : 'plan'}>
      {plan.ribbon && <span className="plan__ribbon">{plan.ribbon}</span>}
      <span className="plan__name">{plan.name}</span>
      <h3 className="plan__title">{plan.title}</h3>
      {/* % OFF e preço ficam sob o vidro até o formulário ser enviado. */}
      <GlassLock
        className="plan__offer"
        tone={plan.featured ? 'dark' : 'light'}
        label="Condição exclusiva"
        detail={<>cupom {coupon}</>}
      >
        <span className="plan__off">{plan.off}</span>
        <span className="plan__price">
          {plan.price.replace('/mês', '')}
          <span className="plan__price-period">/mês</span>
        </span>
      </GlassLock>
      <p className="plan__desc">{plan.desc}</p>
      <ul className="plan__features">
        {plan.features.map((f) => (
          <li key={f.text} className={f.dim ? 'dim' : undefined}>
            <Check dim={f.dim} />
            {f.text}
          </li>
        ))}
      </ul>
      <PlanCta plan={plan} />
    </article>
  )
}
