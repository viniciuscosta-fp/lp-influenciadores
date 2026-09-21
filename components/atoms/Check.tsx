import { Icon } from './Icon'

/** Checkmark das features dos planos. `dim` = feature não inclusa no plano. */
export function Check({ dim }: { dim?: boolean }) {
  return (
    <span className={dim ? 'plan__check dim' : 'plan__check'}>
      <Icon name="check" size={11} strokeWidth={3} />
    </span>
  )
}

/** Célula sim/não da tabela comparativa. */
export function CompareMark({ yes }: { yes: boolean }) {
  return (
    <span className={yes ? 'ic yes' : 'ic no'}>
      <Icon name={yes ? 'check' : 'x'} size={12} strokeWidth={3} />
    </span>
  )
}
