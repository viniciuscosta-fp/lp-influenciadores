import type { Metadata } from 'next'
import { LPS, LP_SLUGS } from '@/content'

/** Índice interno de QA — não é página pública de campanha. */
export const metadata: Metadata = {
  title: 'LPs de influenciadores — Fluencypass',
  robots: { index: false, follow: false },
}

export default function Index() {
  return (
    <main className="section" style={{ maxWidth: '720px', margin: '0 auto' }}>
      <h1 className="h-section">LPs de parceria</h1>
      <ul style={{ lineHeight: 2, marginTop: '32px' }}>
        {LP_SLUGS.map((slug) => (
          <li key={slug}>
            <a href={`/${slug}`} style={{ color: 'var(--coral)', fontWeight: 600 }}>
              {LPS[slug].handle}
            </a>{' '}
            — {LPS[slug].name} · {LPS[slug].bonusModule}
          </li>
        ))}
      </ul>
    </main>
  )
}
import type { Metadata } from 'next'
import { LPS, LP_SLUGS } from '@/content'

/** Índice interno de QA — não é página pública de campanha. */
export const metadata: Metadata = {
  title: 'LPs de influenciadores — Fluencypass',
  robots: { index: false, follow: false },
}

export default function Index() {
  return (
    <main className="section" style={{ maxWidth: '720px', margin: '0 auto' }}>
      <h1 className="h-section">LPs de parceria</h1>
      <ul style={{ lineHeight: 2, marginTop: '32px' }}>
        {LP_SLUGS.map((slug) => (
          <li key={slug}>
            <a href={`/${slug}`} style={{ color: 'var(--coral)', fontWeight: 600 }}>
              {LPS[slug].handle}
            </a>{' '}
            — {LPS[slug].name} · {LPS[slug].bonusModule}
          </li>
        ))}
      </ul>
    </main>
  )
}
