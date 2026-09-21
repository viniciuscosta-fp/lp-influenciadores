import { Cta } from '@/components/atoms/Cta'
import { CompareMark } from '@/components/atoms/Check'
import { COMPARE_COLUMNS, COMPARE_ROWS } from '@/content/shared'
import type { InfluencerLP } from '@/content/types'

export function Comparativo({ lp }: { lp: InfluencerLP }) {
  return (
    <section className="section section--dark compare" data-screen-label="09 Comparativo">
      <div className="container">
        <div className="compare__head">
          <h2 className="h-section">{lp.compare.h2}</h2>
        </div>

        <div className="compare__table-wrap">
          <table className="compare__table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Benefício</th>
                {COMPARE_COLUMNS.map((c, i) => (
                  <th key={c} className={i === 0 ? 'fp' : undefined}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map(([label, ...marks]) => (
                <tr key={label}>
                  <td>{label}</td>
                  {marks.map((yes, i) => (
                    <td key={i} className={i === 0 ? 'fp' : undefined}>
                      <CompareMark yes={yes} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="compare__cta">
          <Cta />
        </div>
      </div>
    </section>
  )
}
