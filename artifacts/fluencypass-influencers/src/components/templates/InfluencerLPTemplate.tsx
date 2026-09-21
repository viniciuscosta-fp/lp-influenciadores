import { Alunos } from '@/components/organisms/Alunos'
import { Aspiracional } from '@/components/organisms/Aspiracional'
import { BonusKit } from '@/components/organisms/BonusKit'
import { Comparativo } from '@/components/organisms/Comparativo'
import { Faq } from '@/components/organisms/Faq'
import { Footer } from '@/components/organisms/Footer'
import { Hero, Ribbon } from '@/components/organisms/Hero'
import { LeadGateProvider } from '@/components/organisms/LeadGate'
import { Metodo } from '@/components/organisms/Metodo'
import { Planos } from '@/components/organisms/Planos'
import { Testimonial } from '@/components/organisms/Testimonial'
import { Virada } from '@/components/organisms/Virada'
import type { InfluencerLP } from '@/content/types'

/** Os 11 blocos, na ordem definida pelo briefing. */
export function InfluencerLPTemplate({ lp }: { lp: InfluencerLP }) {
  return (
    <LeadGateProvider influencer={lp.slug}>
      <Hero lp={lp} />
      <Ribbon lp={lp} />
      <Virada lp={lp} />
      <Aspiracional lp={lp} />
      <Planos lp={lp} />
      <BonusKit lp={lp} />
      <Testimonial lp={lp} />
      <Metodo lp={lp} />
      <Alunos />
      <Comparativo lp={lp} />
      <Faq lp={lp} />
      <Footer lp={lp} />
    </LeadGateProvider>
  )
}
