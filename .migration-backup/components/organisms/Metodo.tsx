import { Cta } from '@/components/atoms/Cta'
import { Icon } from '@/components/atoms/Icon'
import { METHOD_PILLARS } from '@/content/shared'
import type { InfluencerLP } from '@/content/types'

export function Metodo({ lp }: { lp: InfluencerLP }) {
  const pra = lp.tone === 'coloquial' ? 'pra' : 'para'
  return (
    <section className="section method" id="metodo" data-screen-label="07 Método">
      <div className="container">
        <div className="method__head">
          <h2 className="h-section">
            O único método do mundo com o{' '}
            <em style={{ color: 'var(--coral)', fontStyle: 'normal' }}>ciclo completo</em> para você
            falar inglês
          </h2>
          <p className="lead">
            Desenvolvido {pra} quem precisa destravar o inglês de forma rápida e prática.
          </p>
        </div>

        <div className="method__grid">
          {METHOD_PILLARS.map((p) => (
            <article className="method-pillar" key={p.num}>
              <span className="method-pillar__num">{p.num}</span>
              <div className="method-pillar__icon">
                <Icon name={p.icon} size={28} strokeWidth={1.6} />
              </div>
              <span className="tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>

        <div className="method__diff">
          <Icon name="info" size={32} strokeWidth={1.6} />
          <p>{lp.metodo.diferencial}</p>
        </div>

        <div className="method__cta">
          <Cta />
        </div>
      </div>
    </section>
  )
}
