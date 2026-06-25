import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { letters, birthdayGirl } from '../content'
import FloatingEnvelope from './FloatingEnvelope'
import { useSound } from '../hooks/useSound'
import { celebrate } from '../lib/celebrate'

// Darken/lighten a hex colour (amt: -100..100). Used for the flap shade.
function shade(hex, amt) {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const num = parseInt(full, 16)
  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255
  const f = amt / 100
  const adj = (c) => Math.max(0, Math.min(255, Math.round(c + (f < 0 ? c * f : (255 - c) * f))))
  return `rgb(${adj(r)}, ${adj(g)}, ${adj(b)})`
}

const OFFSETS = [-26, 34, -16] // playful horizontal stagger

/* The full-screen envelope-opening flourish shown before the letter appears. */
function EnvelopeOpening({ letter }) {
  const { accent, card, ink } = letter.theme
  return (
    <div className="relative" style={{ width: 288, height: 196, perspective: 1000 }}>
      {/* back wall */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{ background: accent, boxShadow: '0 20px 44px rgba(0,0,0,0.5)' }}
      />
      {/* the letter sliding out */}
      <motion.div
        className="absolute left-5 right-5 rounded-md"
        style={{ top: 14, height: 150, background: card, zIndex: 10, boxShadow: '0 6px 14px rgba(0,0,0,0.25)' }}
        initial={{ y: 26, opacity: 0 }}
        animate={{ y: -118, opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.6, ease: 'easeOut' }}
      >
        <div className="flex h-full flex-col justify-center gap-3 px-5">
          <div className="h-2 rounded-full" style={{ background: ink, opacity: 0.22 }} />
          <div className="h-2 w-4/5 rounded-full" style={{ background: ink, opacity: 0.22 }} />
          <div className="h-2 w-3/5 rounded-full" style={{ background: ink, opacity: 0.22 }} />
          <div className="mt-1 self-end text-2xl">💌</div>
        </div>
      </motion.div>
      {/* front pocket (hides the bottom of the paper) */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 20,
          background: card,
          clipPath: 'polygon(0 100%, 100% 100%, 50% 32%)',
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
      />
      {/* flap opening up and over */}
      <motion.div
        className="absolute left-0 right-0 top-0"
        style={{
          height: 128,
          background: shade(accent, -16),
          clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
          transformOrigin: 'top center',
          transformStyle: 'preserve-3d',
          zIndex: 30,
        }}
        initial={{ rotateX: 0 }}
        animate={{ rotateX: -172 }}
        transition={{ duration: 0.5, ease: 'easeIn' }}
      >
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{ bottom: 6, width: 28, height: 28, background: '#fff', opacity: 0.85 }}
          initial={{ scale: 1 }}
          animate={{ scale: 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </div>
  )
}

export default function LettersScreen({ onSelect }) {
  const { playTap, playWhoosh, playSparkle } = useSound()
  const [opening, setOpening] = useState(null)

  const handleTap = (letter) => {
    if (opening) return
    setOpening(letter)
    playTap()
    playWhoosh()
    celebrate()
    window.setTimeout(() => playSparkle(), 280)
    window.setTimeout(() => onSelect?.(letter), 1300)
  }

  return (
    <div className="no-scrollbar relative flex min-h-full w-full flex-col items-center overflow-y-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-9 text-center"
      >
        <h2 className="font-marker text-3xl text-blush drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)] sm:text-4xl">
          You've got mail, {birthdayGirl}!
        </h2>
        <p className="mt-2 font-hand text-xl text-cream/85">tap a letter to open it 💌</p>
      </motion.div>

      <div className="flex flex-col items-center gap-8">
        {letters.map((letter, i) => (
          <div key={letter.id} style={{ transform: `translateX(${OFFSETS[i % OFFSETS.length]}px)` }}>
            <FloatingEnvelope letter={letter} index={i} onTap={handleTap} disabled={!!opening} />
          </div>
        ))}
      </div>

      {/* opening flourish */}
      <AnimatePresence>
        {opening && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center px-6"
            style={{ background: 'rgba(45,10,16,0.55)', backdropFilter: 'blur(3px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.7, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            >
              <EnvelopeOpening letter={opening} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
