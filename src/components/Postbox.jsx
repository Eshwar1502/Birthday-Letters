import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { postbox } from '../content'
import { useSound } from '../hooks/useSound'

/* A small envelope used for the "mail bursts out" moment. */
function MiniEnvelope({ color = '#f3ead7' }) {
  return (
    <svg width="46" height="34" viewBox="0 0 46 34" style={{ filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.3))' }}>
      <rect x="1" y="1" width="44" height="32" rx="4" fill={color} stroke="#7a1f2b" strokeWidth="1.5" />
      <path d="M2 4 L23 19 L44 4" fill="none" stroke="#8d2535" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export default function Postbox({ onOpen }) {
  const { playTap, playWhoosh, startMusic } = useSound()
  const [opened, setOpened] = useState(false)

  // The envelopes that fly out when tapped.
  const burst = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 360,
        y: -120 - Math.random() * 260,
        rot: (Math.random() - 0.5) * 160,
        scale: 0.55 + Math.random() * 0.6,
        color: ['#f3ead7', '#f8d7dd', '#fbe2d4', '#e9dcf3'][i % 4],
        delay: Math.random() * 0.18,
      })),
    [],
  )

  const handleTap = () => {
    if (opened) return
    setOpened(true)
    playTap()
    playWhoosh()
    startMusic() // first gesture → unlock + start music (no-op if no file)
    window.setTimeout(() => onOpen?.(), 1150)
  }

  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center px-6 py-10">
      {/* Hand-lettered sign */}
      <motion.h1
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-7 text-center font-marker text-3xl leading-tight text-blush drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)] sm:text-4xl"
      >
        {postbox.label}
      </motion.h1>

      {/* Postbox + glow + hints (whole thing is tappable) */}
      <motion.button
        type="button"
        onClick={handleTap}
        aria-label={`Open ${postbox.label}`}
        className="relative outline-none"
        whileTap={{ scale: 0.95 }}
        animate={
          opened
            ? { y: [0, -10, 6, 0], rotate: [0, -3, 3, 0] }
            : { y: [0, -9, 0], rotate: [0, -1.5, 1.5, 0] }
        }
        transition={
          opened
            ? { duration: 0.5 }
            : { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        {/* pulsing invite glow */}
        <motion.span
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(248,215,221,0.5) 0%, rgba(248,215,221,0) 65%)' }}
          animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* expanding tap ripple at the slot */}
        {!opened && (
          <motion.span
            className="pointer-events-none absolute left-1/2 top-[34%] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blush/70"
            animate={{ scale: [0.4, 1.8], opacity: [0.8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          />
        )}

        {/* burst of mail */}
        <div className="pointer-events-none absolute left-1/2 top-[32%] h-0 w-0">
          {opened &&
            burst.map((b) => (
              <motion.div
                key={b.id}
                className="absolute left-0 top-0"
                style={{ marginLeft: -23, marginTop: -17 }}
                initial={{ x: 0, y: 0, scale: 0.3, opacity: 0, rotate: 0 }}
                animate={{ x: b.x, y: b.y, scale: b.scale, opacity: [0, 1, 1, 0], rotate: b.rot }}
                transition={{ duration: 1.15, ease: 'easeOut', delay: b.delay, times: [0, 0.15, 0.7, 1] }}
              >
                <MiniEnvelope color={b.color} />
              </motion.div>
            ))}
        </div>

        {/* The postbox itself */}
        <svg width="200" height="312" viewBox="0 0 220 340" className="drop-shadow-[0_12px_22px_rgba(0,0,0,0.45)]">
          {/* ground shadow */}
          <ellipse cx="110" cy="326" rx="76" ry="12" fill="#000" opacity="0.28" />
          {/* legs */}
          <rect x="76" y="300" width="18" height="26" rx="6" fill="#5e1622" />
          <rect x="126" y="300" width="18" height="26" rx="6" fill="#5e1622" />
          {/* base plate */}
          <rect x="46" y="288" width="128" height="18" rx="7" fill="#8d2535" />
          {/* cream body */}
          <rect x="55" y="130" width="110" height="166" rx="10" fill="#f3ead7" />
          {/* soft body shading */}
          <rect x="138" y="130" width="27" height="166" rx="10" fill="#000" opacity="0.06" />
          {/* maroon rounded dome */}
          <path d="M55 132 V120 q0 -72 55 -72 q55 0 55 72 V132 Z" fill="#8d2535" />
          <path d="M138 60 q27 18 27 60 V132 h-27 Z" fill="#000" opacity="0.08" />
          {/* gold trim under dome */}
          <rect x="55" y="129" width="110" height="6" fill="#d9a441" />
          {/* little knob on top */}
          <circle cx="110" cy="44" r="9" fill="#d9a441" />
          {/* slot roof ledge */}
          <rect x="68" y="150" width="84" height="9" rx="4" fill="#8d2535" />
          {/* mail slot */}
          <rect x="76" y="160" width="68" height="13" rx="6" fill="#2a0a10" />
          {/* peeking envelope corner (wiggles when idle) */}
          {!opened && (
            <motion.g
              animate={{ y: [0, -3, 0], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '110px 165px' }}
            >
              <rect x="86" y="150" width="48" height="16" rx="3" fill="#fbe2d4" stroke="#7a1f2b" strokeWidth="1.4" />
              <path d="M88 152 L110 162 L132 152" fill="none" stroke="#8d2535" strokeWidth="1.4" />
            </motion.g>
          )}
          {/* engraved name plate */}
          <rect x="74" y="206" width="72" height="46" rx="10" fill="#fff" opacity="0.45" />
          <rect x="74" y="206" width="72" height="46" rx="10" fill="none" stroke="#d9a441" strokeWidth="2" />
          {/* little heart on the plate */}
          <path d="M110 224 c-7 -9 -20 -3 -14 7 c3 5 14 12 14 12 c0 0 11 -7 14 -12 c6 -10 -7 -16 -14 -7 z" fill="#c0566a" />
          {/* collection slot at bottom */}
          <rect x="84" y="268" width="52" height="8" rx="4" fill="#8d2535" />

          {/* little flag, gently waving */}
          <line x1="168" y1="96" x2="168" y2="150" stroke="#5e1622" strokeWidth="5" strokeLinecap="round" />
          <motion.path
            d="M168 100 h34 l-10 11 l10 11 h-34 Z"
            fill="#c0566a"
            style={{ transformOrigin: '168px 111px' }}
            animate={{ skewY: [0, 6, -4, 0], scaleX: [1, 0.92, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.button>
    </div>
  )
}
