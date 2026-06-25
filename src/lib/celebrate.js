import confetti from 'canvas-confetti'

/* A celebratory burst of confetti + floating hearts. Called when a letter opens.
   Falls back gracefully if emoji shapes aren't supported. */
export function celebrate() {
  // Classic confetti from both lower corners.
  const base = { startVelocity: 42, spread: 70, ticks: 220, zIndex: 9999 }
  confetti({ ...base, particleCount: 70, angle: 60, origin: { x: 0, y: 0.7 } })
  confetti({ ...base, particleCount: 70, angle: 120, origin: { x: 1, y: 0.7 } })

  // Heart shapes raining from the top-centre (if supported).
  try {
    const hearts = ['💖', '💕', '🤍'].map((t) => confetti.shapeFromText({ text: t, scalar: 2.2 }))
    confetti({
      shapes: hearts,
      scalar: 2.2,
      particleCount: 26,
      spread: 90,
      startVelocity: 34,
      ticks: 260,
      gravity: 0.8,
      origin: { x: 0.5, y: 0.35 },
      zIndex: 9999,
    })
  } catch {
    /* older browsers: confetti alone is plenty */
  }
}
