'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Customise here ──────────────────────────────────────────────────────────
// 🎵 Đặt file nhạc vào public/music/background.mp3
// Hoặc dùng URL trực tiếp:
const MUSIC_SRC = '/music/background.mp3'
const SONG_TITLE = 'Nhạc tình yêu 🎵'
const SONG_ARTIST = 'Dành tặng em'
// ────────────────────────────────────────────────────────────────────────────

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [expanded, setExpanded] = useState(true)
  const [volume, setVolume] = useState(0.6)
  const [hasMusic, setHasMusic] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume
    audio.loop = true

    const onError = () => setHasMusic(false)
    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
        setDuration(audio.duration)
      }
    }
    const onLoadedData = () => setHasMusic(true)

    audio.addEventListener('error', onError)
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadeddata', onLoadedData)

    return () => {
      audio.removeEventListener('error', onError)
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadeddata', onLoadedData)
    }
  }, [volume])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio || !hasMusic) return

    if (playing) {
      audio.pause()
    } else {
      audio.play().catch(() => setHasMusic(false))
    }
    setPlaying((p) => !p)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)
    setVolume(val)
    if (audioRef.current) audioRef.current.volume = val
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} preload="auto" />

      <motion.div
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', bounce: 0.3 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <AnimatePresence mode="wait">
          {expanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-dark rounded-2xl p-4 w-72 shadow-2xl"
              style={{ boxShadow: '0 0 30px rgba(255,77,109,0.2), 0 8px 32px rgba(0,0,0,0.5)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Vinyl */}
                  <div
                    className={`relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 vinyl-groove ${playing ? 'animate-vinyl' : ''}`}
                    style={{ background: 'linear-gradient(135deg, #1a0a0a, #3d0a1a)' }}
                  >
                    <div className="absolute inset-0 rounded-full"
                      style={{
                        background: 'repeating-radial-gradient(circle at center, rgba(255,77,109,0.15) 0px, rgba(255,77,109,0.15) 1px, transparent 1px, transparent 4px)'
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-love-pink" />
                    </div>
                  </div>

                  <div className="overflow-hidden">
                    <p className="font-playfair text-love-cream text-sm font-semibold truncate max-w-[140px]">
                      {SONG_TITLE}
                    </p>
                    <p className="font-cormorant text-love-rose/70 text-xs">{SONG_ARTIST}</p>
                  </div>
                </div>

                {/* Collapse button */}
                <button
                  onClick={() => setExpanded(false)}
                  className="text-love-rose/50 hover:text-love-rose transition-colors text-xl ml-2"
                >
                  ×
                </button>
              </div>

              {/* Progress bar */}
              <div className="relative h-1 bg-love-pink/20 rounded-full mb-3 overflow-hidden">
                <div
                  className="absolute left-0 top-0 bottom-0 rounded-full transition-all"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #ff4d6d, #ffd700)',
                  }}
                />
              </div>

              {/* Equalizer bars (visual only) */}
              <div className="flex items-end gap-0.5 h-6 mb-4 justify-center">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 rounded-sm"
                    style={{ background: 'linear-gradient(to top, #ff4d6d, #ffd700)' }}
                    animate={
                      playing
                        ? {
                            height: [
                              `${8 + Math.random() * 16}px`,
                              `${4 + Math.random() * 20}px`,
                              `${10 + Math.random() * 14}px`,
                            ],
                          }
                        : { height: '4px' }
                    }
                    transition={{
                      repeat: Infinity,
                      duration: 0.4 + Math.random() * 0.4,
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                {/* Volume */}
                <div className="flex items-center gap-1.5">
                  <span className="text-love-rose/60 text-xs">🔉</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-16 accent-love-pink cursor-pointer"
                  />
                </div>

                {/* Play/Pause */}
                <motion.button
                  onClick={toggle}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #ff4d6d, #c9003a)',
                    boxShadow: '0 0 20px rgba(255,77,109,0.4)',
                  }}
                  title={!hasMusic ? 'Thêm file nhạc vào public/music/background.mp3' : ''}
                >
                  {playing ? '⏸' : '▶'}
                </motion.button>

                <span className="text-love-rose/40 text-xs font-cormorant">
                  {hasMusic ? '🎵' : '💤'}
                </span>
              </div>

              {!hasMusic && (
                <p className="text-center text-love-rose/50 text-xs mt-3 font-cormorant">
                  Thêm file nhạc vào public/music/background.mp3
                </p>
              )}
            </motion.div>
          ) : (
            /* Mini player */
            <motion.button
              key="mini"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => setExpanded(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-2xl animate-border-glow"
              style={{
                background: 'linear-gradient(135deg, #ff4d6d, #c9003a)',
                boxShadow: '0 0 25px rgba(255,77,109,0.5)',
              }}
            >
              {playing ? '⏸' : '🎵'}
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
