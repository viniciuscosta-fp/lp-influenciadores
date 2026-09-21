import { useEffect } from 'react';
import { LPS, LP_SLUGS } from '@/content';

/** Índice interno de QA — não é página pública de campanha. */
export default function LpIndex() {
  useEffect(() => {
    document.title = 'LPs de influenciadores — Fluencypass';

    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

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
  );
}
