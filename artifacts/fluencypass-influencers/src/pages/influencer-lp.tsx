import { useEffect } from 'react';
import { InfluencerLPTemplate } from '@/components/templates/InfluencerLPTemplate';
import { getLP } from '@/content';
import NotFound from '@/pages/not-found';

/** Slug fora do registry cai no NotFound, em vez de renderizar página vazia. */
export default function InfluencerLp({ slug }: { slug: string }) {
  const lp = getLP(slug);

  useEffect(() => {
    if (!lp) return;
    document.title = lp.meta.title;

    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = lp.meta.description;
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, [lp]);

  if (!lp) return <NotFound />;

  return <InfluencerLPTemplate lp={lp} />;
}
