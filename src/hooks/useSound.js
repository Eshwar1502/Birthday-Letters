import { useCallback, useEffect, useState } from 'react'

/* ============================================================================
   Sound: cute UI sound-effects are SYNTHESIZED in the browser (Web Audio API)
   so they need no asset files. Background music is an optional drop-in file at
   public/music/bg.mp3 (see public/music/README.txt).
============================================================================ */

// Change this if you name your music file differently (e.g. '/music/bg.ogg').
const MUSIC_SRC = '/music/bg.mp3'

/* ---- Web Audio engine (lazy, created on first user gesture) ---------------- */
let ctx = null
function getCtx() {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

// A single shaped oscillator "blip".
function tone({ freq = 440, type = 'sine', dur = 0.15, gain = 0.2, slideTo = null, delay = 0 }) {
  const ac = getCtx()
  if (!ac) return
  const t0 = ac.currentTime + delay
  const osc = ac.createOscillator()
  const g = ac.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur)
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(g).connect(ac.destination)
  osc.start(t0)
  osc.stop(t0 + dur + 0.03)
}

// Soft bubbly "pop" for taps.
function playTap() {
  tone({ freq: 520, slideTo: 860, type: 'triangle', dur: 0.12, gain: 0.16 })
}

// Airy "whoosh" (filtered noise sweeping up) for envelopes flying / opening.
function playWhoosh() {
  const ac = getCtx()
  if (!ac) return
  const dur = 0.55
  const buffer = ac.createBuffer(1, Math.floor(ac.sampleRate * dur), ac.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  const src = ac.createBufferSource()
  src.buffer = buffer
  const bp = ac.createBiquadFilter()
  bp.type = 'bandpass'
  bp.Q.value = 0.8
  bp.frequency.setValueAtTime(380, ac.currentTime)
  bp.frequency.exponentialRampToValueAtTime(2600, ac.currentTime + dur)
  const g = ac.createGain()
  g.gain.setValueAtTime(0.0001, ac.currentTime)
  g.gain.exponentialRampToValueAtTime(0.22, ac.currentTime + 0.12)
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur)
  src.connect(bp).connect(g).connect(ac.destination)
  src.start()
  src.stop(ac.currentTime + dur)
}

// Twinkly ascending arpeggio for the celebratory moment.
function playSparkle() {
  const notes = [880, 1175, 1568, 2093]
  notes.forEach((f, i) => tone({ freq: f, type: 'sine', dur: 0.2, gain: 0.1, delay: i * 0.06 }))
}

/* ---- Background music (single shared <audio>) ------------------------------ */
let audioEl = null
function getAudio() {
  if (typeof window === 'undefined') return null
  if (!audioEl) {
    audioEl = new Audio(MUSIC_SRC)
    audioEl.loop = true
    audioEl.volume = 0.45
    audioEl.preload = 'auto'
  }
  return audioEl
}

// Tiny shared store so every <MusicToggle> / App stays in sync.
let musicState = false
const listeners = new Set()
function setShared(v) {
  musicState = v
  listeners.forEach((l) => l(v))
}

export function useSound() {
  const [musicOn, setMusicOn] = useState(musicState)

  useEffect(() => {
    listeners.add(setMusicOn)
    return () => listeners.delete(setMusicOn)
  }, [])

  // Called on the very first tap (postbox) — also unlocks audio on mobile.
  const startMusic = useCallback(() => {
    const a = getAudio()
    if (!a) return
    a.play()
      .then(() => setShared(true))
      .catch(() => {
        /* no file yet, or autoplay blocked — totally fine, SFX still work */
      })
  }, [])

  const toggleMusic = useCallback(() => {
    const a = getAudio()
    if (!a) return
    if (a.paused) {
      a.play()
        .then(() => setShared(true))
        .catch(() => {})
    } else {
      a.pause()
      setShared(false)
    }
  }, [])

  return { playTap, playWhoosh, playSparkle, startMusic, toggleMusic, musicOn }
}
