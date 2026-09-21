import { createContext, useCallback, useContext, useEffect, useState, type FormEvent } from 'react'
import { Icon } from '@/components/atoms/Icon'
import type { Plan } from '@/content/shared'

/**
 * Porteira de lead dos planos.
 *
 * Reproduz o comportamento das LPs originais: o CTA de cada plano abre um
 * formulário; ao enviar, a página libera preços e troca os CTAs pelos links de
 * checkout (body.plans-unlocked no CSS).
 *
 * Diferenças em relação ao HTML antigo:
 *  - o POST vai para /api/lead (proxy), não direto para o n8n — a URL do webhook
 *    deixa de ficar no bundle do cliente e o envio para de falhar em silêncio;
 *  - o payload passa a identificar o influenciador e o plano clicado (B5).
 */

type LeadGateValue = {
  unlocked: boolean
  openFor: (planId: string) => void
}

const LeadGateContext = createContext<LeadGateValue | null>(null)

function useLeadGate(): LeadGateValue {
  const ctx = useContext(LeadGateContext)
  if (!ctx) throw new Error('useLeadGate precisa estar dentro de <LeadGateProvider>')
  return ctx
}

export function PlanCta({ plan }: { plan: Plan }) {
  const { unlocked, openFor } = useLeadGate()

  if (unlocked) {
    return (
      <a href={plan.checkout} className="btn btn--coral btn--block plan__cta">
        Comprar agora
      </a>
    )
  }

  return (
    <a
      href="#"
      className="btn btn--coral btn--block plan__cta"
      onClick={(e) => {
        e.preventDefault()
        openFor(plan.id)
      }}
    >
      Desbloquear oferta
    </a>
  )
}

/** (11) 91234-5678 */
function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 11)
  if (d.length === 0) return ''
  if (d.length <= 2) return `(${d}`
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export function LeadGateProvider({
  influencer,
  children,
}: {
  influencer: string
  children: React.ReactNode
}) {
  const [unlocked, setUnlocked] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const openFor = useCallback((planId: string) => {
    setSelectedPlan(planId)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => setIsOpen(false), [])

  // A folha de estilo controla preços e CTAs por body.plans-unlocked.
  useEffect(() => {
    document.body.classList.toggle('plans-unlocked', unlocked)
    return () => document.body.classList.remove('plans-unlocked')
  }, [unlocked])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    document.getElementById('firstName')?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const get = (k: string) => String(data.get(k) ?? '').trim()

    const required = ['firstName', 'ageRange', 'phone', 'email', 'timing', 'motivation']
    if (required.some((k) => !get(k))) return

    const params = new URLSearchParams(window.location.search)
    const payload = {
      influencer,
      plano: selectedPlan ?? '',
      nome: get('firstName'),
      idade: get('ageRange'),
      celular: get('phone'),
      email: get('email'),
      timing: get('timing'),
      motivacao: get('motivation'),
      acquireUrl: window.location.href,
      utm_source: params.get('utm_source') ?? '',
      utm_medium: params.get('utm_medium') ?? '',
      utm_campaign: params.get('utm_campaign') ?? '',
      utm_content: params.get('utm_content') ?? '',
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) console.error('[lead] falha no envio:', res.status, await res.text())
    } catch (err) {
      // Não bloqueia o fluxo do usuário, mas deixa rastro no console.
      console.error('[lead] erro de rede:', err)
    } finally {
      setSubmitting(false)
    }

    setUnlocked(true)
    setIsOpen(false)
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <LeadGateContext.Provider value={{ unlocked, openFor }}>
      {children}

      <div
        className={isOpen ? 'modal-overlay is-open' : 'modal-overlay'}
        id="planModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
      >
        <div className="modal modal--greed">
          <button className="modal__close" aria-label="Fechar" onClick={close} type="button">
            ×
          </button>

          <div className="modal__header">
            <h3 className="modal__title" id="modalTitle">
              Desbloquear oferta especial
            </h3>
          </div>

          <form className="modal__form" id="planForm" noValidate onSubmit={handleSubmit}>
            <div className="modal__row">
              <div className="modal__field">
                <label htmlFor="firstName">Primeiro nome</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Primeiro Nome"
                  required
                  autoComplete="given-name"
                />
              </div>
              <div className="modal__field">
                <label htmlFor="ageRange">Idade</label>
                <div className="modal__select-wrap">
                  <select id="ageRange" name="ageRange" required defaultValue="">
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option value="até-14">Até 14 anos</option>
                    <option value="15-17">15 – 17 anos</option>
                    <option value="18-24">18 – 24 anos</option>
                    <option value="25-35">25 – 35 anos</option>
                    <option value="36-45">36 – 45 anos</option>
                    <option value="45-59">45 – 59 anos</option>
                    <option value="60+">60 anos ou mais</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="modal__field">
              <label htmlFor="phone">Celular/WhatsApp</label>
              <div className="modal__phone-wrap">
                <span className="modal__phone-prefix" aria-hidden="true">
                  <span className="modal__flag">
                    <span className="modal__flag-green" />
                    <span className="modal__flag-diamond" />
                    <span className="modal__flag-circle" />
                  </span>
                  <span className="modal__phone-code">+55</span>
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Digite seu Celular"
                  required
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                />
              </div>
            </div>

            <div className="modal__field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu email@aqui.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="modal__row">
              <div className="modal__field">
                <label htmlFor="timing">Quando pretende</label>
                <div className="modal__select-wrap">
                  <select id="timing" name="timing" required defaultValue="">
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option value="imediatamente">Imediatamente</option>
                    <option value="proxima-semana">Na próxima semana</option>
                    <option value="proximo-mes">No próximo mês</option>
                    <option value="nao-tenho-certeza">Não tenho certeza ainda</option>
                  </select>
                </div>
              </div>
              <div className="modal__field">
                <label htmlFor="motivation">Motivação</label>
                <div className="modal__select-wrap">
                  <select id="motivation" name="motivation" required defaultValue="">
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option value="aprendizado-pessoal">Aprendizado pessoal</option>
                    <option value="crescimento-profissional">Crescimento profissional</option>
                    <option value="entretenimento-cultura">Entretenimento e cultura</option>
                    <option value="estudar-morar-exterior">Estudar/morar no exterior</option>
                    <option value="viagens-turismo">Viagens e turismo</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn--greed-cta btn--block" disabled={submitting}>
              <Icon name="lock-sm" size={18} strokeWidth={2.4} />
              {submitting ? 'ENVIANDO…' : 'VER PREÇOS AGORA'}
            </button>
          </form>
        </div>
      </div>
    </LeadGateContext.Provider>
  )
}
