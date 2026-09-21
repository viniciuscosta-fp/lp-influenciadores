import { StudentCard } from '@/components/molecules/StudentCard'
import { STUDENTS } from '@/content/shared'

export function Alunos() {
  return (
    <section className="section students" data-screen-label="08 Alunos">
      <div className="container">
        <div className="students__head">
          <h2 className="h-section" style={{ marginTop: '16px' }}>
            O que dizem profissionais que{' '}
            <em style={{ color: 'var(--coral)', fontStyle: 'normal' }}>confiaram</em> na Fluencypass
          </h2>
        </div>

        <p className="aviso-rolamento">← arraste para explorar →</p>
        <div className="students__grid students__grid--carousel">
          {STUDENTS.map((s) => (
            <StudentCard key={s.name} student={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
