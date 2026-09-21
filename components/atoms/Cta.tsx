import { Icon } from './Icon'

/** Botão coral padrão da página. Aparece 4× (hero, bloco 3, bônus, comparativo). */
export function Cta({
  href = '#planos',
  label = 'Ver planos exclusivos',
}: {
  href?: string
  label?: string
}) {
  return (
    <a href={href} className="btn btn--coral">
      {label}
      <Icon name="arrow-right" size={18} strokeWidth={2} className="arrow" />
    </a>
  )
}
