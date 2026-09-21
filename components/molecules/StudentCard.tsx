'use client'

import { useState } from 'react'
import { Icon } from '@/components/atoms/Icon'

/** Converte URL do Vimeo/YouTube na URL de embed com autoplay. */
function embedUrl(url: string): string {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`
  const vm = url.match(/vimeo\.com\/(\d+)/)
  if (vm) return `https://player.vimeo.com/video/${vm[1]}?autoplay=1`
  return url
}

type Student = {
  name: string
  meta: string
  video: string
  thumb: string
  duration: string
  achievement: string
}

export function StudentCard({ student }: { student: Student }) {
  const [playing, setPlaying] = useState(false)
  return (
    <article className="student-card">
      <div className="student-card__player">
        {playing ? (
          <iframe
            src={embedUrl(student.video)}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={`Depoimento de ${student.name}`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
          />
        ) : (
          <>
            <img
              src={student.thumb}
              alt={`Thumbnail ${student.name}`}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <button
              className="play"
              aria-label={`Reproduzir depoimento de ${student.name}`}
              onClick={() => setPlaying(true)}
            >
              <Icon name="play" size={22} />
            </button>
            <span className="dur">{student.duration}</span>
            <span className="achievement">{student.achievement}</span>
          </>
        )}
      </div>
      <div className="student-card__body">
        <div className="student-card__name">{student.name}</div>
        <div className="student-card__meta">{student.meta}</div>
      </div>
    </article>
  )
}
