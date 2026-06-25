import { useMemo } from 'react'

/* Gentle petals / hearts / stars drifting up the maroon background the whole
   time. Pure CSS animation (transform/opacity only) so it stays smooth on
   phones. Count is kept modest for battery + performance. */

const GLYPHS = ['🌸', '💕', '✨', '🤍', '⭐', '🎀', '🌷']
const COUNT = 16

function rand(min, max) {
  return Math.random() * (max - min) + min
}

export default function AmbientParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        id: i,
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        left: rand(0, 100), // vw
        size: rand(14, 30), // px
        duration: rand(14, 26), // s
        delay: -rand(0, 26), // negative => already mid-flight on load
        drift: rand(-60, 60), // px horizontal sway
        rot: rand(-260, 260), // deg
        opacity: rand(0.35, 0.8),
        scale: rand(0.8, 1.2),
      })),
    [],
  )

  return (
    <div className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            bottom: 0,
            left: `${p.left}vw`,
            fontSize: `${p.size}px`,
            willChange: 'transform, opacity',
            animation: `ambientFloat ${p.duration}s linear ${p.delay}s infinite`,
            '--p-drift': `${p.drift}px`,
            '--p-rot': `${p.rot}deg`,
            '--p-opacity': p.opacity,
            '--p-scale': p.scale,
          }}
        >
          {p.glyph}
        </span>
      ))}
    </div>
  )
}
