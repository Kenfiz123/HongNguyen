'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Customise here ──────────────────────────────────────────────────────────
const LETTER_PARAGRAPHS = [
  'Em yêu,',
  'Ngày hôm nay, ngày 8 tháng 3, anh muốn nói với em điều mà trái tim anh vẫn luôn giữ mãi...',
  'Em là nguồn cảm hứng, là ánh sáng dịu dàng soi sáng mỗi ngày của anh. Nụ cười em làm tim anh rộn ràng, đôi mắt em là cả một bầu trời anh muốn lạc vào mãi mãi.',
  'Cảm ơn em vì đã xuất hiện trong cuộc đời này, cảm ơn em vì những khoảnh khắc bình yên, cảm ơn em vì đã là chính em — một người tuyệt vời và đặc biệt như vậy.',
  'Dù thời gian có trôi đi, dù cuộc đời có nhiều thăng trầm, anh vẫn luôn biết ơn vì có em bên cạnh. Em là điều kỳ diệu nhất anh từng có.',
  'Chúc em luôn hạnh phúc, luôn rạng rỡ, và biết rằng — anh yêu em rất nhiều. 💕',
  'Mãi mãi của em,',
]
const SENDER_NAME = 'Người yêu em ❤️'   // 💌 Thay tên người gửi tại đây
// ────────────────────────────────────────────────────────────────────────────

function useTypewriterParagraph(text: string, active: boolean, speed = 30) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const idxRef = useRef(0)

  useEffect(() => {
    if (!active) return
    idxRef.current = 0
    setDisplayed('')
    setDone(false)
    const interval = setInterval(() => {
      idxRef.current++
      setDisplayed(text.slice(0, idxRef.current))
      if (idxRef.current >= text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [active, text, speed])

  return { displayed, done }
}

function LetterParagraph({ text, delay, once }: { text: string; delay: number; once: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const active = inView && once
  const { displayed } = useTypewriterParagraph(text, active, 25)

  return (
    <div ref={ref}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: delay * 0.1 }}
        className="font-dancing text-love-cream/90 leading-relaxed mb-6"
        style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', minHeight: '2em' }}
      >
        {active ? displayed : ''}
        {!active && text}
      </motion.p>
    </div>
  )
}

export default function LoveLetterSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  // Floating petals
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 6,
    emoji: i % 3 === 0 ? '🌸' : i % 3 === 1 ? '🌹' : '🌺',
  }))

  return (
    <section
      id="love-letter"
      ref={sectionRef}
      className="relative py-24 px-6 bg-letter overflow-hidden"
    >
      {/* Floating petals background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {petals.map((p) => (
          <motion.div
            key={p.id}
            className="absolute text-2xl opacity-20"
            style={{ left: p.left, top: '-10%' }}
            animate={{ y: ['0vh', '110vh'], rotate: [0, 360], opacity: [0, 0.3, 0] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </div>

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="font-cormorant text-love-rose/70 tracking-widest uppercase text-sm mb-3">
          — Thư tình —
        </p>
        <h2 className="font-playfair text-4xl md:text-5xl text-love-cream text-glow">
          Anh muốn nói với em...
        </h2>
        <div className="flex justify-center gap-2 mt-4 text-xl">
          {'❤️🌸💕🌸❤️'.split('').map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
      </motion.div>

      {/* Letter container */}
      <div className="max-w-3xl mx-auto relative">
        {/* Decorative frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl p-8 md:p-14 animate-border-glow"
          style={{
            background:
              'linear-gradient(145deg, rgba(255,77,109,0.06) 0%, rgba(13,0,21,0.9) 50%, rgba(255,133,161,0.06) 100%)',
            border: '1px solid rgba(255,77,109,0.2)',
          }}
        >
          {/* Corner ornaments */}
          <div className="absolute top-4 left-4 text-love-rose/30 text-3xl select-none">❦</div>
          <div className="absolute top-4 right-4 text-love-rose/30 text-3xl select-none rotate-180">❦</div>
          <div className="absolute bottom-4 left-4 text-love-rose/30 text-3xl select-none rotate-90">❦</div>
          <div className="absolute bottom-4 right-4 text-love-rose/30 text-3xl select-none -rotate-90">❦</div>

          {/* Opening decoration */}
          <div className="text-center mb-10">
            <div className="text-5xl animate-heart-beat">💌</div>
          </div>

          {/* Letter paragraphs */}
          {LETTER_PARAGRAPHS.map((para, i) => (
            <LetterParagraph
              key={i}
              text={para}
              delay={i}
              once={inView}
            />
          ))}

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-right mt-8"
          >
            <div className="inline-block">
              <div className="w-24 h-px bg-love-rose/40 mb-2 ml-auto" />
              <p className="font-dancing text-love-gold text-2xl text-gold-glow">
                {SENDER_NAME}
              </p>
            </div>
          </motion.div>

          {/* Bottom decoration */}
          <div className="flex justify-center mt-8 gap-3 text-lg">
            {'💝💕❤️💕💝'.split('').map((c, i) => (
              <span
                key={i}
                className="animate-float-slow"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
