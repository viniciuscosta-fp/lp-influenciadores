import { FaqList } from '@/components/molecules/FaqItem'
import { getBaseFaq } from '@/content/shared'
import type { InfluencerLP } from '@/content/types'

export function Faq({ lp }: { lp: InfluencerLP }) {
  const items = [...lp.faq, ...getBaseFaq(lp.tone)]
  return (
    <section className="section faq" id="faq" data-screen-label="10 FAQ">
      <div className="container">
        <div className="faq__head">
          <h2 className="h-section" style={{ marginTop: '16px' }}>
            Ficou com alguma dúvida?
          </h2>
        </div>
        <FaqList items={items} />
      </div>
    </section>
  )
}
