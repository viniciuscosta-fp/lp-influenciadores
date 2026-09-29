import type { ReactNode } from 'react'
import { useLeadGate } from '@/components/organisms/LeadGate'

/**
 * Vidro fosco sobre um conteúdo da oferta (preço, % OFF, bônus) até o lead se
 * cadastrar. O conteúdo real fica no DOM, só desfocado — é visual, não sigilo.
 * O painel inteiro é clicável e abre o formulário (ou `onOpen`).
 */
export function GlassLock({
  onOpen,
  label,
  detail,
  action,
  tone = 'light',
  className,
  children,
}: {
  /** Ação do clique; padrão: abrir o formulário de lead. */
  onOpen?: () => void
  label: ReactNode
  detail?: ReactNode
  /** Texto de um botão dentro do painel (ex.: "Liberar bônus"). */
  action?: string
  tone?: 'light' | 'dark'
  className?: string
  children: ReactNode
}) {
  const { unlocked, openFor } = useLeadGate()
  const classes = ['glass-lock', `glass-lock--${tone}`, unlocked && 'is-open', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      {/* inert: links desfocados (ex.: CTA do bônus) não recebem foco nem clique. */}
      <div className="glass-lock__content" inert={!unlocked}>
        {children}
      </div>
      {/* Continua montado após liberar para o fade-out; is-open tira clique e foco. */}
      <button
        type="button"
        className="glass-lock__pane"
        onClick={onOpen ?? openFor}
        tabIndex={unlocked ? -1 : undefined}
        aria-hidden={unlocked}
      >
        <span className="glass-lock__label">{label}</span>
        {detail && <span className="glass-lock__detail">{detail}</span>}
        {action && <span className="btn btn--coral glass-lock__action">{action}</span>}
      </button>
    </div>
  )
}
