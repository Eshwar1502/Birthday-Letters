import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FabricBackground from './components/FabricBackground'
import AmbientParticles from './components/AmbientParticles'
import MusicToggle from './components/MusicToggle'
import Postbox from './components/Postbox'
import LettersScreen from './components/LettersScreen'
import LetterView from './components/LetterView'

export default function App() {
  const [view, setView] = useState('postbox') // 'postbox' | 'letters' | 'letter'
  const [active, setActive] = useState(null) // the selected letter

  return (
    <>
      <FabricBackground />
      <AmbientParticles />
      <MusicToggle />

      <main className="relative z-10 h-full w-full">
        <AnimatePresence mode="wait">
          {view === 'postbox' && (
            <motion.div
              key="postbox"
              className="h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.06 }}
              transition={{ duration: 0.5 }}
            >
              <Postbox onOpen={() => setView('letters')} />
            </motion.div>
          )}

          {view === 'letters' && (
            <motion.div
              key="letters"
              className="h-full w-full"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LettersScreen
                onSelect={(letter) => {
                  setActive(letter)
                  setView('letter')
                }}
              />
            </motion.div>
          )}

          {view === 'letter' && active && (
            <motion.div
              key={`letter-${active.id}`}
              className="h-full w-full"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.45 }}
            >
              <LetterView letter={active} onBack={() => setView('letters')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  )
}
