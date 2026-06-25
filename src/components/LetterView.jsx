import { useId } from 'react'
import { motion } from 'framer-motion'
import { birthdayGirl, footerTagline } from '../content'
import { useSound } from '../hooks/useSound'

/* ---- little decorative pieces --------------------------------------------- */

function Piece({ delay = 0, className = '', style, children }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 26, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 170, damping: 18 }}
    >
      {children}
    </motion.div>
  )
}

function BowIcon({ color = '#c0566a', size = 64 }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" aria-hidden="true">
      <path d="M40 24 C18 5, 3 12, 13 24 C3 36, 18 43, 40 24 Z" fill="none" stroke={color} strokeWidth="3" />
      <path d="M40 24 C62 5, 77 12, 67 24 C77 36, 62 43, 40 24 Z" fill="none" stroke={color} strokeWidth="3" />
      <path d="M40 26 C35 38, 31 43, 27 46" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M40 26 C45 38, 49 43, 53 46" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <circle cx="40" cy="24" r="5" fill={color} />
    </svg>
  )
}

function WaxSeal({ size = 58 }) {
  const id = useId()
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-hidden="true">
      <defs>
        <radialGradient id={`wax-${id}`} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#caa05c" />
          <stop offset="0.6" stopColor="#a9763c" />
          <stop offset="1" stopColor="#7c5125" />
        </radialGradient>
      </defs>
      {/* slightly irregular wax blob */}
      <path
        d="M30 3 c8 -1 13 5 17 9 c5 5 11 9 9 18 c-2 8 2 14 -4 19 c-5 5 -12 4 -18 5 c-8 1 -15 -1 -20 -7 c-5 -6 -3 -13 -4 -20 c-1 -8 2 -14 8 -19 c3 -3 6 -3 12 -5 z"
        fill={`url(#wax-${id})`}
      />
      <circle cx="30" cy="30" r="18" fill="none" stroke="#6b4420" strokeWidth="1.5" opacity="0.6" />
      {/* tiny laurel + heart imprint */}
      <path d="M21 33 q4 6 9 7" fill="none" stroke="#6b4420" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M39 33 q-4 6 -9 7" fill="none" stroke="#6b4420" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path
        d="M30 22 c-3 -4 -9 -1 -6 4 c1 3 6 6 6 6 c0 0 5 -3 6 -6 c3 -5 -3 -8 -6 -4 z"
        fill="#6b4420"
        opacity="0.7"
      />
    </svg>
  )
}

function Stamp() {
  return (
    <div
      className="bg-white p-[3px] shadow-md"
      style={{ borderRadius: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.35)' }}
    >
      <svg width="76" height="96" viewBox="0 0 90 114" aria-hidden="true">
        <rect x="0" y="0" width="90" height="114" fill="#efe9d8" />
        {/* perforation dots */}
        {Array.from({ length: 9 }).map((_, i) => (
          <g key={i}>
            <circle cx={5 + i * 10} cy="2" r="2.2" fill="#fff" />
            <circle cx={5 + i * 10} cy="112" r="2.2" fill="#fff" />
          </g>
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <g key={`v${i}`}>
            <circle cx="2" cy={5 + i * 10} r="2.2" fill="#fff" />
            <circle cx="88" cy={5 + i * 10} r="2.2" fill="#fff" />
          </g>
        ))}
        <text x="45" y="16" textAnchor="middle" fontSize="7" fill="#6b4a52" fontFamily="Georgia, serif">
          RÉPUBLIQUE
        </text>
        {/* simple aster flower */}
        <g transform="translate(45 58)">
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-16"
              rx="3.5"
              ry="13"
              fill="#9bb2d6"
              transform={`rotate(${i * 30})`}
            />
          ))}
          <circle cx="0" cy="0" r="6" fill="#e0b34e" />
          <path d="M0 16 q-3 14 -10 20" fill="none" stroke="#5e7d52" strokeWidth="2" />
        </g>
        <text x="45" y="104" textAnchor="middle" fontSize="9" fill="#6b4a52" fontFamily="Georgia, serif">
          3.00
        </text>
      </svg>
    </div>
  )
}

function Star({ size = 18, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} aria-hidden="true">
      <path
        d="M12 2 L14.6 9.2 L22 9.6 L16.3 14.3 L18.2 21.4 L12 17.3 L5.8 21.4 L7.7 14.3 L2 9.6 L9.4 9.2 Z"
        fill="#d9a441"
      />
    </svg>
  )
}

/* ---- the letter itself ----------------------------------------------------- */

export default function LetterView({ letter, onBack }) {
  const { playTap } = useSound()
  const { card, ink, accent } = letter.theme

  return (
    <div className="no-scrollbar relative h-full w-full overflow-y-auto">
      {/* back button */}
      <button
        type="button"
        onClick={() => {
          playTap()
          onBack?.()
        }}
        className="fixed left-4 top-4 z-50 rounded-full bg-cream/90 px-4 py-2 font-marker text-sm text-maroon-800 shadow-lg backdrop-blur-sm"
      >
        ← letters
      </button>

      <div className="relative mx-auto w-full max-w-[460px] px-5 pb-20 pt-20">
        {/* scattered stars */}
        <Star size={22} style={{ position: 'absolute', left: 10, top: 150, animation: 'twinkle 2.8s ease-in-out infinite' }} />
        <Star size={14} style={{ position: 'absolute', left: 28, top: 188, animation: 'twinkle 2.4s ease-in-out 0.5s infinite' }} />
        <Star size={16} style={{ position: 'absolute', right: 16, top: 96, animation: 'twinkle 3s ease-in-out 0.8s infinite' }} />
        <Star size={12} style={{ position: 'absolute', right: 40, bottom: 150, animation: 'twinkle 2.6s ease-in-out 0.3s infinite' }} />

        {/* 1. cream envelope with title + wax seal */}
        <Piece delay={0.05} className="relative z-10 mx-auto" style={{ width: '82%' }}>
          <div
            className="relative rounded-md bg-cream px-5 py-6 shadow-lg"
            style={{ transform: 'rotate(-4deg)', boxShadow: '0 14px 26px rgba(0,0,0,0.4)' }}
          >
            {/* faint back-flap crease */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M2 4 L50 58 L98 4" fill="none" stroke="#caa05c" strokeWidth="0.8" opacity="0.4" />
            </svg>
            <h3 className="whitespace-pre-line text-center font-marker text-2xl leading-tight text-maroon-800">
              {letter.envelopeTitle}
            </h3>
            <div className="mt-3 flex justify-center">
              <WaxSeal />
            </div>
          </div>
        </Piece>

        {/* 2. polaroid */}
        <Piece delay={0.18} className="relative z-20 -mt-5 flex justify-end pr-1">
          <div
            className="bg-white p-2 pb-8 shadow-xl"
            style={{ transform: 'rotate(6deg)', width: 174, boxShadow: '0 14px 26px rgba(0,0,0,0.45)' }}
          >
            <img
              src={letter.photos.polaroid}
              alt={`Polaroid from ${letter.from}`}
              className="block h-44 w-full object-cover"
            />
            <p className="mt-2 text-center font-marker text-[13px] leading-tight text-maroon-800">
              {letter.polaroidCaption}
            </p>
          </div>
        </Piece>

        {/* 3. the pink letter card (hero) */}
        <Piece delay={0.3} className="relative z-30 -mt-3">
          <div
            className="relative rounded-2xl px-7 py-9"
            style={{
              background: card,
              color: ink,
              transform: 'rotate(-1deg)',
              boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
            }}
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2">
              <BowIcon color={accent} />
            </div>
            <p className="font-hand text-3xl font-bold">{letter.greeting}</p>
            <p className="mt-3 whitespace-pre-line font-hand text-2xl leading-snug">{letter.body}</p>
            <p className="mt-7 text-right font-hand text-2xl">{letter.signature}</p>
          </div>
        </Piece>

        {/* 4. B&W portrait + vintage stamp */}
        <Piece delay={0.42} className="relative z-20 mt-7 flex items-start justify-center gap-5">
          <div
            className="bg-white p-2 pb-6 shadow-xl"
            style={{ transform: 'rotate(-6deg)', boxShadow: '0 12px 22px rgba(0,0,0,0.45)' }}
          >
            <img
              src={letter.photos.portrait}
              alt={`Portrait from ${letter.from}`}
              className="block h-36 w-28 object-cover grayscale"
            />
          </div>
          <div style={{ transform: 'rotate(5deg)' }} className="mt-2">
            <Stamp />
          </div>
        </Piece>

        {/* 5. footer */}
        <Piece delay={0.54} className="mt-10 text-center">
          <p className="font-marker text-[11px] uppercase tracking-[0.25em] text-cream/75">
            {footerTagline}: {letter.handle}
          </p>
          <p className="mt-1 font-hand text-base text-cream/60">happy birthday, {birthdayGirl} ♡</p>
        </Piece>
      </div>
    </div>
  )
}
