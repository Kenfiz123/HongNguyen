'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const CanvasHearts = dynamic(() => import('./CanvasHearts'), { ssr: false })

// Background slideshow images
const HERO_IMAGES = [
  '/images/017acb38f2d87c8625c926.jpg',
  '/images/1f6666be5c5ed2008b4f19.jpg',
  '/images/277454936e73e02db96221.jpg',
  '/images/7b7f05233cc3b29debd229.jpg',
  '/images/92b78327b9c737996ed625.jpg',
  '/images/c15e8d88b7683936607920.jpg',
]

// ── Customise here ──────────────────────────────────────────────────────────
const HER_NAME = 'Ngọc Hồng'          // 💌 Thay tên người yêu tại đây
const MESSAGE = 'Tròn 1 Tháng Yêu Em'
const SUB_MESSAGE = 'Ngày 7/3 — kỷ niệm một tháng · Ngày 8/3 — ngày của em ❤️'
// ────────────────────────────────────────────────────────────────────────────

const TYPEWRITER_TEXTS = [
  '7/3 — Tròn đúng 1 tháng bên nhau 🥂',
  'Happy 8/3 — Chúc em luôn rạng rỡ! 🌸',
  'Mỗi ngày có em là một ngày hạnh phúc ❤️',
  '30 ngày · 720 giờ · Vô số kỷ niệm đẹp 💕',
  'Anh yêu em — hôm qua, hôm nay và mãi mãi ✨',
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
  const [heroImgIdx, setHeroImgIdx] = useState(0)

  useEffect(() => { setMounted(true) }, [])

  // Background image slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImgIdx((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background photo slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={heroImgIdx}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.3, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={HERO_IMAGES[heroImgIdx]}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay on top of images */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(255,77,109,0.15) 0%, transparent 60%), linear-gradient(to bottom, rgba(5,5,16,0.6), rgba(5,5,16,0.85))',
        }}
      />
      {/* Animated background canvas */}
      <div className="z-[2]">{mounted && <CanvasHearts />}</div>

      {/* Radial vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,16,0.7) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-[10] flex flex-col items-center text-center px-4 sm:px-6 max-w-4xl mx-auto w-full">
        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="glass rounded-full px-3 sm:px-6 py-1.5 sm:py-2 mb-2 sm:mb-3 text-love-rose font-cormorant text-sm sm:text-lg tracking-widest uppercase"
        >
          8 tháng 3 · Ngày của em
        </motion.div>

        {/* 1-month anniversary — main visual centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 1, type: 'spring', bounce: 0.35 }}
          className="flex flex-col items-center mb-1 sm:mb-2"
        >
          {/* Giant "01" counter */}
          <div
            className="font-playfair font-bold shimmer-text leading-none select-none"
            style={{ fontSize: 'clamp(5.5rem, 24vw, 15rem)', lineHeight: 0.9 }}
          >
            01
          </div>
          {/* "THÁNG YÊU NHAU" label */}
          <div className="font-cormorant tracking-[0.25em] sm:tracking-[0.45em] uppercase text-love-rose text-xs sm:text-xl mt-1 sm:mt-0">
            tháng yêu nhau
          </div>
          {/* Date range */}
          <div className="flex items-center gap-2 mt-1.5 sm:mt-2">
            <span className="text-love-gold/60 text-[10px] sm:text-sm font-cormorant tracking-widest">7/2/2026</span>
            <span className="animate-heart-beat text-xs sm:text-sm">🥂</span>
            <span className="text-love-gold/60 text-[10px] sm:text-sm font-cormorant tracking-widest">7/3/2026</span>
          </div>
        </motion.div>

        {/* Big heart */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, type: 'spring', bounce: 0.5 }}
          className="text-5xl sm:text-8xl mb-3 sm:mb-4 animate-heart-beat"
        >
          ❤️
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="font-playfair font-bold leading-tight mb-3 sm:mb-4"
          style={{ fontSize: 'clamp(1.8rem, 7vw, 6rem)' }}
        >
          <span className="shimmer-text">{MESSAGE}</span>
        </motion.h1>

        {/* Her name */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="font-dancing text-love-rose mb-4 sm:mb-6 animate-glow"
          style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)' }}
        >
          {HER_NAME}
        </motion.h2>

        {/* Sub message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="font-cormorant text-love-blush/80 mb-6 sm:mb-10 max-w-lg px-2"
          style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)' }}
        >
          {SUB_MESSAGE}
        </motion.p>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="glass rounded-2xl px-3 sm:px-8 py-3 sm:py-4 min-h-[50px] sm:min-h-[60px] flex items-center justify-center mb-6 sm:mb-10 w-full max-w-lg"
        >
          <p className="font-dancing text-love-cream typewriter-cursor text-center" style={{ fontSize: 'clamp(0.85rem, 3.5vw, 1.4rem)' }}>
            {typeText}
          </p>
        </motion.div>

        {/* Decorative hearts row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-10 text-lg sm:text-2xl"
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
          className="flex flex-col items-center gap-1.5 sm:gap-2 text-love-rose/70 hover:text-love-rose transition-colors group"
        >
          <span className="font-cormorant text-xs sm:text-sm tracking-widest uppercase">Khám phá</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="text-xl sm:text-2xl"
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
