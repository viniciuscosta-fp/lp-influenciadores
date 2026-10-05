import { createContext, useCallback, useContext, useEffect, useState, type FormEvent } from 'react'
import { Icon } from '@/components/atoms/Icon'
import { VALID_COUPONS } from '@/content'
import { BONUS_OFFER, isBonusAvailable, withCoupon, type Plan } from '@/content/shared'
import type { InfluencerLP } from '@/content/types'

/**
 * Porteira de lead dos planos + ativação de bônus por cupom.
 *
 * São dois passos independentes:
 *  1. o formulário de lead tira todos os vidros (preços e bônus) e troca os
 *     CTAs pelos links de checkout (body.plans-unlocked no CSS). A oferta não
 *     depende de cupom;
 *  2. o cupom, digitado no campo da seção de bônus, ativa os bônus — que até
 *     lá aparecem como "inativos". A ativação pode ser travada por
 *     BONUS_OFFER / lp.bonusActivation (ver content/shared.tsx).
 *
 * Os CTAs de bônus (card, faixa dos planos) só levam até o campo de cupom.
 * Quem chega lá antes do lead passa pelo formulário e volta direto ao campo.
 *
 * Diferenças em relação ao HTML antigo:
 *  - o POST vai para /api/lead (proxy), não direto para o n8n — a URL do webhook
 *    deixa de ficar no bundle do cliente e o envio para de falhar em silêncio;
 *  - o payload segue o contrato do webhook de cadastro (docs/Webhook Cadastro
 *    Marketing - Documentacao.md): as 14 chaves de raiz precisam existir, mesmo
 *    vazias, senão o workflow rejeita com 400.
 *
 * O slug do influenciador viaja em `affiliateCode` — é o campo do contrato que
 * carrega origem de parceria. `timing` e `motivacao` continuam sendo coletados
 * no formulário, mas ainda não têm destino: entrariam em `extras`, que exige
 * propriedade criada no HubSpot com o internal name exato.
 *
 * Cupom: o da LP (?cupom= válido ou o padrão) viaja em `utm_campaign` no lead
 * — o utm_campaign original continua preservado em `acquireUrl`. O campo da
 * seção de bônus só vem preenchido quando a URL traz um ?cupom= válido; fora
 * isso a pessoa digita o cupom que o creator divulgou.
 *
 * Ativação: quem decide se o cupom vale é o n8n (planilha), via /api/bonus —
 * VALID_COUPONS só serve para pré-preencher o campo e para a atribuição. A
 * resposta do n8n dispara a liberação do curso no HubSpot; ver
 * docs/Webhook Ativacao Bonus - Especificacao.md.
 */

type LeadGateValue = {
  /** Oferta (preços) liberada pelo formulário de lead. */
  unlocked: boolean
  /** Bônus liberados pelo cupom. */
  bonusUnlocked: boolean
  /** Ativação de bônus aberta agora (não travada por oferta/período). */
  bonusAvailable: boolean
  /** Cupom efetivo: o ativado, se houver; senão o da LP. */
  coupon: string
  /** ?cupom= da URL, se válido — pré-preenche o campo de cupom. */
  urlCoupon: string
  openFor: () => void
  /** Leva ao campo de cupom (passando pelo lead, se ainda não houver). */
  openBonus: () => void
  /** Valida no n8n e ativa. */
  activateBonus: (code: string) => Promise<BonusActivationResult>
}

/** not_found/inactive: cupom recusado · unavailable: falha técnica, vale tentar de novo. */
export type BonusActivationResult = 'ok' | 'not_found' | 'inactive' | 'unavailable'

/** id do campo de cupom na seção de bônus (BonusKit). */
export const BONUS_COUPON_FIELD = 'bonusCoupon'

const LeadGateContext = createContext<LeadGateValue | null>(null)

export function useLeadGate(): LeadGateValue {
  const ctx = useContext(LeadGateContext)
  if (!ctx) throw new Error('useLeadGate precisa estar dentro de <LeadGateProvider>')
  return ctx
}

export function PlanCta({ plan }: { plan: Plan }) {
  const { unlocked, bonusUnlocked, coupon, openFor } = useLeadGate()

  if (unlocked) {
    const href = bonusUnlocked && plan.hasBonus ? withCoupon(plan.checkout, coupon) : plan.checkout
    return (
      <a href={href} className="btn btn--coral btn--block plan__cta">
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
        openFor()
      }}
    >
      Desbloquear oferta
    </a>
  )
}

/** Segundo botão do card, abaixo do "Comprar agora": leva ao campo de cupom da seção de bônus. */
export function BonusCta({ plan }: { plan: Plan }) {
  const { unlocked, bonusUnlocked, bonusAvailable, openBonus } = useLeadGate()
  if (!unlocked || !plan.hasBonus || !bonusAvailable) return null

  if (bonusUnlocked) {
    return (
      <span className="plan__bonus-cta is-done" role="status">
        <Icon name="check" size={16} strokeWidth={2.4} />
        Bônus ativado
      </span>
    )
  }

  return (
    <button type="button" className="plan__bonus-cta" onClick={openBonus}>
      <Icon name="gift" size={16} strokeWidth={2} />
      {BONUS_OFFER.ctaLabel}
    </button>
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

export function normalizeCoupon(raw: string): string {
  return raw.replace(/\s+/g, '').toUpperCase()
}

export function LeadGateProvider({ lp, children }: { lp: InfluencerLP; children: React.ReactNode }) {
  const { defaultCoupon } = lp
  const [unlocked, setUnlocked] = useState(false)
  const [bonusUnlocked, setBonusUnlocked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  /** De onde o lead foi pedido: pelo bônus, o envio volta ao campo de cupom. */
  const [leadForBonus, setLeadForBonus] = useState(false)
  /** Incrementa para rolar até o campo de cupom depois do próximo render. */
  const [bonusFocusTick, setBonusFocusTick] = useState(0)
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  /** E-mail do lead: identifica o contato no HubSpot na ativação do bônus. */
  const [leadEmail, setLeadEmail] = useState('')

  const [urlCoupon] = useState(() => {
    const fromUrl = normalizeCoupon(new URLSearchParams(window.location.search).get('cupom') ?? '')
    return VALID_COUPONS.has(fromUrl) ? fromUrl : ''
  })
  // Cupom da LP para atribuição (utm_campaign). Não é exibido na página.
  const lpCoupon = urlCoupon || defaultCoupon
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  const [bonusAvailable] = useState(() => isBonusAvailable(lp))

  const openFor = useCallback(() => {
    setLeadForBonus(false)
    setIsOpen(true)
  }, [])

  const openBonus = useCallback(() => {
    if (!unlocked) {
      setLeadForBonus(true)
      setIsOpen(true)
    } else if (bonusAvailable && !bonusUnlocked) {
      setBonusFocusTick((t) => t + 1)
    }
  }, [bonusAvailable, bonusUnlocked, unlocked])

  const activateBonus = useCallback(
    async (code: string): Promise<BonusActivationResult> => {
      const c = normalizeCoupon(code)
      if (!bonusAvailable) return 'inactive'
      if (!c) return 'not_found'
      if (!leadEmail) return 'unavailable'

      try {
        const res = await fetch('/api/bonus', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: leadEmail,
            coupon: c,
            lpSlug: lp.slug,
            acquireUrl: window.location.href,
          }),
        })
        const data = (await res.json().catch(() => ({}))) as {
          ok?: boolean
          coupon?: string
          reason?: BonusActivationResult
        }
        if (!res.ok || !data.ok) {
          return data.reason === 'not_found' || data.reason === 'inactive' ? data.reason : 'unavailable'
        }
        setAppliedCoupon(data.coupon ?? c)
        setBonusUnlocked(true)
        return 'ok'
      } catch (err) {
        console.error('[bonus] erro de rede:', err)
        return 'unavailable'
      }
    },
    [bonusAvailable, leadEmail, lp.slug],
  )

  const close = useCallback(() => setIsOpen(false), [])

  // Roda depois do render: após o lead, o campo de cupom acabou de aparecer.
  useEffect(() => {
    if (!bonusFocusTick) return
    const field = document.getElementById(BONUS_COUPON_FIELD)
    field?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    field?.focus({ preventScroll: true })
  }, [bonusFocusTick])

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
      email: get('email'),
      firstName: get('firstName'),
      celular: get('phone'),
      idade: get('ageRange'),
      channel: 'b2c_subscription',
      plan: '',
      acquireUrl: window.location.href,
      utm_source: params.get('utm_source') ?? '',
      utm_medium: params.get('utm_medium') ?? '',
      utm_campaign: lpCoupon,
      utm_term: params.get('utm_term') ?? '',
      utm_content: params.get('utm_content') ?? '',
      site_source_name: '',
      affiliateCode: lp.slug,
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

    setLeadEmail(payload.email)
    setUnlocked(true)
    setIsOpen(false)
    if (leadForBonus && bonusAvailable) {
      // Continua na seção de bônus: o próximo passo é o cupom.
      setBonusFocusTick((t) => t + 1)
    } else if (leadForBonus) {
      document.getElementById('bonus')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <LeadGateContext.Provider
      value={{
        unlocked,
        bonusUnlocked,
        bonusAvailable,
        coupon: appliedCoupon ?? lpCoupon,
        urlCoupon,
        openFor,
        openBonus,
        activateBonus,
      }}
    >
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
              {leadForBonus ? 'Ativar bônus exclusivos' : 'Desbloquear oferta especial'}
            </h3>
            <p className="modal__subtitle">
              {leadForBonus
                ? 'Cadastre-se para ativar seus bônus'
                : 'Preencha para ver os preços exclusivos'}
            </p>
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
              {submitting ? 'ENVIANDO…' : leadForBonus ? 'CONTINUAR' : 'VER PREÇOS AGORA'}
            </button>
          </form>
        </div>
      </div>
    </LeadGateContext.Provider>
  )
}
