'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const CanvasHearts = dynamic(() => import('./CanvasHearts'), { ssr: false })

// ── Customise here ──────────────────────────────────────────────────────────
const HER_NAME = 'Em Yêu'          // 💌 Thay tên người yêu tại đây
const MESSAGE = 'Chúc mừng ngày 8 tháng 3'
const SUB_MESSAGE = 'Dành tặng người con gái đặc biệt nhất trong cuộc đời anh'
// ────────────────────────────────────────────────────────────────────────────

const TYPEWRITER_TEXTS = [
  'Em là điều tuyệt vời nhất đã xảy ra với anh ❤️',
  'Anh yêu em rất nhiều 💕',
  'Chúc em luôn hạnh phúc và rạng rỡ 🌸',
  'Em là ánh sáng trong cuộc đời anh ✨',
]

function useTypewriter(texts: string[], speed = 60, pause = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [textIdx, setTextIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx))
        setCharIdx((c) => c + 1)
      }, speed)
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx))
        setCharIdx((c) => c - 1)
      }, speed / 2)
    } else {
      setDeleting(false)
      setTextIdx((i) => (i + 1) % texts.length)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, textIdx, texts, speed, pause])

  return displayed
}

const scrollDown = () => {
  const next = document.getElementById('love-letter')
  next?.scrollIntoView({ behavior: 'smooth' })
}

export default function HeroSection() {
  const typeText = useTypewriter(TYPEWRITER_TEXTS)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-hero"
    >
      {/* Animated background canvas */}
      {mounted && <CanvasHearts />}

      {/* Radial vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,16,0.7) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="glass rounded-full px-6 py-2 mb-8 text-love-rose font-cormorant text-lg tracking-widest uppercase"
        >
          8 tháng 3 · Ngày của em
        </motion.div>

        {/* Big heart */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, type: 'spring', bounce: 0.5 }}
          className="text-8xl mb-4 animate-heart-beat"
        >
          ❤️
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="font-playfair font-bold leading-tight mb-4"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
        >
          <span className="shimmer-text">{MESSAGE}</span>
        </motion.h1>

        {/* Her name */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="font-dancing text-love-rose mb-6 animate-glow"
          style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' }}
        >
          {HER_NAME}
        </motion.h2>

        {/* Sub message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="font-cormorant text-love-blush/80 mb-10 max-w-lg"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)' }}
        >
          {SUB_MESSAGE}
        </motion.p>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="glass rounded-2xl px-8 py-4 min-h-[60px] flex items-center justify-center mb-12"
        >
          <p className="font-dancing text-love-cream typewriter-cursor" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)' }}>
            {typeText}
          </p>
        </motion.div>

        {/* Decorative hearts row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex gap-4 mb-12 text-2xl"
        >
          {['💕', '🌸', '💖', '🌹', '💗', '✨', '💝'].map((e, i) => (
            <span
              key={i}
              className="animate-float-slow"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {e}
            </span>
          ))}
        </motion.div>

        {/* Scroll CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          onClick={scrollDown}
          className="flex flex-col items-center gap-2 text-love-rose/70 hover:text-love-rose transition-colors group"
        >
          <span className="font-cormorant text-sm tracking-widest uppercase">Khám phá</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="text-2xl"
          >
            ↓
          </motion.div>
        </motion.button>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 text-4xl opacity-30 animate-float-slow hidden md:block">🌹</div>
      <div className="absolute top-8 right-8 text-4xl opacity-30 animate-float-slow hidden md:block" style={{ animationDelay: '1s' }}>🌸</div>
      <div className="absolute bottom-24 left-12 text-3xl opacity-20 animate-float-slow hidden md:block" style={{ animationDelay: '2s' }}>💫</div>
      <div className="absolute bottom-24 right-12 text-3xl opacity-20 animate-float-slow hidden md:block" style={{ animationDelay: '0.5s' }}>✨</div>
    </section>
  )
}
