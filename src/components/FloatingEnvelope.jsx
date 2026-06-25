import { motion } from 'framer-motion'
import { birthdayGirl } from '../content'

/* One drifting envelope on the letters screen, labelled with the sender's name.
   Nested motion elements: outer = staggered entrance, inner = endless float. */
export default function FloatingEnvelope({ letter, index, onTap, disabled }) {
  const { ink, accent, card } = letter.theme

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.55, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.15 * index + 0.15, type: 'spring', stiffness: 200, damping: 16 }}
    >
      <motion.button
        type="button"
        onClick={() => !disabled && onTap?.(letter)}
        aria-label={`Open the letter from ${letter.from}`}
        className="relative block w-60 max-w-[78vw] outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
        animate={{ y: [0, -14, 0], rotate: [-2.2, 2.2, -2.2] }}
        transition={{
          duration: 5 + index * 0.9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.4,
        }}
      >
        <svg viewBox="0 0 260 178" className="w-full drop-shadow-[0_12px_20px_rgba(0,0,0,0.4)]">
          {/* body */}
          <rect x="10" y="40" width="240" height="128" rx="14" fill={card} stroke={accent} strokeWidth="3" />
          {/* inner shading */}
          <rect x="10" y="40" width="240" height="128" rx="14" fill="#000" opacity="0.04" />
          {/* flap seam (V) */}
          <path d="M14 46 L130 104 L246 46" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
          {/* wax seal at the V point */}
          <circle cx="130" cy="104" r="17" fill={accent} />
          <circle cx="130" cy="104" r="17" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" />
          <path
            d="M130 98 c-5 -6 -14 -2 -10 5 c2 4 10 8 10 8 c0 0 8 -4 10 -8 c4 -7 -5 -11 -10 -5 z"
            fill="#fff"
            opacity="0.85"
          />
        </svg>

        {/* sender name + "for Aparna" written on the front */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[10%] text-center">
          <div className="font-hand text-3xl font-bold leading-none" style={{ color: ink }}>
            {letter.from}
          </div>
          <div className="font-hand text-base" style={{ color: ink, opacity: 0.7 }}>
            ♡ for {birthdayGirl}
          </div>
        </div>
      </motion.button>
    </motion.div>
  )
}
