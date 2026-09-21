import { COMPANY } from '@/content/shared'
import type { InfluencerLP } from '@/content/types'

export function Footer({ lp }: { lp: InfluencerLP }) {
  return (
    <footer className="section--dark footer" data-screen-label="11 Footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__cobrand">
            <span className="cobrand__avatar">
              <img src={lp.avatar} alt={lp.name} />
            </span>
            <span className="cobrand__handle">{lp.handle}</span>
            <span className="cobrand__plus">+</span>
            <span className="cobrand__brand">
              <img className="logo-img" src={COMPANY.logo} alt="Fluencypass" />
            </span>
          </div>

          <p className="footer__tagline">{lp.footer.tagline}</p>
        </div>

        <div className="footer__bottom">
          <div>
            Fluencypass · CNPJ {COMPANY.cnpj} · Atendimento {COMPANY.phone}
          </div>
          <div className="footer__links">
            {COMPANY.links.map((l) => (
              <a href={l.href} key={l.label}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
