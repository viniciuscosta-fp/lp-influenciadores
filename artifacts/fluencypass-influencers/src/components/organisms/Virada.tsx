import type { InfluencerLP } from '@/content/types'

/** Bloco 2 — a história do influenciador, em 1ª pessoa e assinada. */
export function Virada({ lp }: { lp: InfluencerLP }) {
  const { virada } = lp
  return (
    <section className="virada" data-screen-label="02 A Virada">
      <div className="virada__grid">
        <div className="virada__article">
          <h2>{virada.h2}</h2>
          <div className="virada__body">{virada.body}</div>
          <div className="virada__sig">
            <div className="sig-avatar">
              <img src={lp.avatar} alt={lp.name} />
            </div>
            <div>
              <div className="sig-name">{lp.name}</div>
              <div className="sig-meta">{virada.signatureMeta}</div>
            </div>
          </div>
        </div>

        <div>
          <div className="virada__photo">
            <span className="corner-tag">{virada.cornerTag}</span>
            <img src={virada.photo} alt={virada.photoAlt} />
          </div>
          <p className="virada__caption">{virada.caption}</p>
        </div>
      </div>
    </section>
  )
}
