import { motion } from 'framer-motion'
import { useSound } from '../hooks/useSound'

/* Floating play/pause button for the optional background music. Shows little
   animated equalizer bars while playing. (If no public/music/bg.mp3 exists it
   simply has nothing to play — see public/music/README.txt.) */
export default function MusicToggle() {
  const { musicOn, toggleMusic, playTap } = useSound()

  return (
    <motion.button
      type="button"
      onClick={() => {
        playTap()
        toggleMusic()
      }}
      aria-label={musicOn ? 'Pause music' : 'Play music'}
      title={musicOn ? 'Pause music' : 'Play music'}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, type: 'spring', stiffness: 260, damping: 18 }}
      whileTap={{ scale: 0.88 }}
      className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center gap-[3px] rounded-full border border-white/40 bg-blush/85 shadow-lg backdrop-blur-sm"
      style={{ boxShadow: '0 6px 18px rgba(0,0,0,0.35)' }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full"
          style={{ background: '#5c1622' }}
          animate={musicOn ? { height: [6, 17, 8, 15, 6] } : { height: 6 }}
          transition={
            musicOn
              ? { duration: 0.95, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }
              : { duration: 0.2 }
          }
        />
      ))}
      {!musicOn && (
        <span
          className="absolute h-7 w-[2px] rotate-45 rounded-full"
          style={{ background: '#5c1622' }}
        />
      )}
    </motion.button>
  )
}
