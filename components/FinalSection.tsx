'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Customise here ──────────────────────────────────────────────────────────
const FINAL_TITLE = 'Chúc mừng ngày 8/3'
const FINAL_SUBTITLE = 'Happy International Women\'s Day'
const FINAL_MESSAGE = 'Chúc em luôn hạnh phúc, xinh đẹp\nvà rạng rỡ mãi mãi!'
const LOVE_DECLARATION = 'Anh yêu em! ❤️'
// ────────────────────────────────────────────────────────────────────────────

async function launchFireworks() {
  const confetti = (await import('canvas-confetti')).default
  const mobile = window.innerWidth < 768

  const duration = mobile ? 2500 : 4000
  const end = Date.now() + duration
  const colors = ['#ff4d6d', '#ff85a1', '#ffd700', '#ffb3c6', '#ffffff']

  const frame = () => {
    confetti({
      particleCount: mobile ? 3 : 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    })
    confetti({
      particleCount: mobile ? 3 : 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    })

    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()

  // Central burst
  setTimeout(() => {
    confetti({
      particleCount: mobile ? 60 : 120,
      spread: mobile ? 70 : 100,
      origin: { y: 0.5 },
      colors,
      shapes: ['circle' as const, 'square' as const],
      scalar: mobile ? 1 : 1.5,
    })
  }, 500)

  if (!mobile) {
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.4, x: 0.5 },
        colors,
        startVelocity: 45,
        shapes: ['circle' as const],
        scalar: 2,
      })
    }, 1500)
  }
}

function BigHeart() {
  return (
    <svg
      viewBox="0 0 100 90"
      className="w-40 h-40 md:w-56 md:h-56 heart-svg animate-heart-beat"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="heartGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ff85a1" />
          <stop offset="50%" stopColor="#ff4d6d" />
          <stop offset="100%" stopColor="#c9003a" />
        </radialGradient>
      </defs>
      <path
        d="M50 85 C30 70 5 55 5 30 C5 15 18 5 32 5 C39 5 46 9 50 15 C54 9 61 5 68 5 C82 5 95 15 95 30 C95 55 70 70 50 85Z"
        fill="url(#heartGrad)"
      />
    </svg>
  )
}

export default function FinalSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [celebrated, setCelebrated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const celebrate = useCallback(async () => {
    if (loading) return
    setLoading(true)
    setCelebrated(true)
    await launchFireworks()
    setLoading(false)
  }, [loading])

  return (
    <section
      id="final"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24 overflow-hidden bg-final"
    >
      {/* Starfield — fewer on mobile */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: isMobile ? 30 : 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* Floating emojis background — fewer on mobile */}
      {(isMobile ? ['💕', '✨', '💖', '❤️'] : ['💕', '🌸', '✨', '💖', '🌹', '💫', '❤️', '💝']).map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl sm:text-3xl opacity-10 pointer-events-none"
          style={{
            left: `${10 + (i * 11) % 80}%`,
            top: `${10 + (i * 13) % 80}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 3 + i * 0.5,
            delay: i * 0.4,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl w-full mx-auto">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="font-cormorant text-love-rose/70 tracking-widest uppercase text-xs sm:text-sm mb-6 w-full break-words"
        >
          {FINAL_SUBTITLE}
        </motion.p>

        {/* Big heart */}
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.4, type: 'spring', bounce: 0.5 }}
          className="mb-8"
        >
          <BigHeart />
        </motion.div>

        {/* Main title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="font-playfair font-bold mb-4 leading-tight w-full"
          style={{ fontSize: 'clamp(1.6rem, 8vw, 5rem)' }}
        >
          <span className="shimmer-text">{FINAL_TITLE}</span>
        </motion.h2>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="font-dancing text-love-blush/90 mb-8 whitespace-pre-line w-full"
          style={{ fontSize: 'clamp(1rem, 4vw, 2rem)' }}
        >
          {FINAL_MESSAGE}
        </motion.p>

        {/* 1-month anniversary milestone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, type: 'spring' }}
          className="flex items-center gap-3 sm:gap-4 rounded-2xl px-5 sm:px-8 py-3 sm:py-4 mb-6 w-full sm:w-auto"
          style={{
            background: 'linear-gradient(135deg, rgba(255,215,0,0.08) 0%, rgba(255,77,109,0.08) 100%)',
            border: '1px solid rgba(255,215,0,0.25)',
          }}
        >
          <span className="text-2xl sm:text-3xl animate-heart-beat flex-shrink-0">🥂</span>
          <div className="text-center flex-1">
            <p className="font-cormorant text-love-gold/80 text-xs sm:text-sm tracking-widest uppercase mb-0.5">
              Kỷ niệm · 7 tháng 3
            </p>
            <p className="font-dancing text-love-cream" style={{ fontSize: 'clamp(0.95rem, 3vw, 1.3rem)' }}>
              Tròn 1 tháng bên nhau ❤️
            </p>
          </div>
          <span className="text-2xl sm:text-3xl animate-heart-beat flex-shrink-0">🥂</span>
        </motion.div>

        {/* Love declaration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1, type: 'spring' }}
          className="glass-dark rounded-3xl px-6 sm:px-10 py-5 sm:py-6 mb-10 animate-border-glow w-full sm:w-auto"
        >
          <p
            className="font-dancing text-love-gold text-gold-glow"
            style={{ fontSize: 'clamp(1.5rem, 6vw, 3.5rem)' }}
          >
            {LOVE_DECLARATION}
          </p>
        </motion.div>

        {/* Celebrate button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          onClick={celebrate}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-6 sm:px-10 py-4 rounded-full font-playfair text-white font-semibold text-base sm:text-lg overflow-hidden transition-all w-full sm:w-auto"
          style={{
            background: 'linear-gradient(135deg, #ff4d6d, #c9003a)',
            boxShadow: '0 0 30px rgba(255,77,109,0.4), 0 4px 20px rgba(0,0,0,0.3)',
          }}
          disabled={loading}
        >
          {/* Shimmer overlay */}
          <span
            className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity"
            style={{ background: 'linear-gradient(135deg, transparent, white, transparent)', animation: 'shimmerText 2s linear infinite' }}
          />
          <span className="relative">
            {celebrated ? '🎊 Yêu em mãi mãi! 🎊' : '🎉 Bấm để chúc mừng em! 🎉'}
          </span>
        </motion.button>

        {/* Decorative row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8 sm:mt-12 text-xl sm:text-2xl"
        >
          {'💕🌸💕❤️💕🌸💕'.split('').map((c, i) => (
            <span key={i} className="animate-float-slow" style={{ animationDelay: `${i * 0.2}s` }}>
              {c}
            </span>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.8 }}
          className="font-cormorant text-love-rose/30 text-sm mt-12 tracking-widest"
        >
          Made with ❤️ for you · 8/3/2026
        </motion.p>
      </div>
    </section>
  )
}
