'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

// Photos for the side decorative strip
const LETTER_PHOTOS = [
  '/images/b28553826962e73cbe7316.jpg',
  '/images/b9b3a20a99ea17b44efb9.jpg',
  '/images/d6d0023438d4b68aefc522.jpg',
  '/images/df22756c4f8cc1d2989d12.jpg',
  '/images/f10c732b49cbc7959eda17.jpg',
  '/images/f7b29f03a4e32abd73f211.jpg',
]

// ── Customise here ──────────────────────────────────────────────────────────
const LETTER_PARAGRAPHS = [
  'Em yêu,',
  'Hôm nay, ngày 7 tháng 3 — tròn đúng 1 tháng kể từ ngày chúng mình bắt đầu. Anh ngồi đây, nhớ lại từng khoảnh khắc bên em, và tim anh lại rộn lên theo cách mà anh không tài nào giải thích được. 🥂',
  'Một tháng. Chỉ 30 ngày thôi, nhưng với anh, mỗi ngày có em đều dài hơn, ý nghĩa hơn, và đẹp hơn bất kỳ ngày nào trước đó. Em xuất hiện và làm thay đổi mọi thứ — nhẹ nhàng, tự nhiên, như thể em luôn ở đó.',
  'Anh yêu cái cách em cười khi anh nói điều gì đó ngốc nghếch. Anh yêu ánh mắt em khi em đang mải nghĩ về điều gì đó. Anh yêu cả những lúc em giả vờ giận mà vẫn không nhịn được cười. Mỗi chi tiết nhỏ đó — anh nhớ hết, và trân trọng từng cái một.',
  'Cảm ơn em vì đã tin tưởng anh, vì đã cho anh được ở bên em, vì đã là chính em — chân thật, dịu dàng và đặc biệt đến vậy. Được yêu em là điều anh thấy may mắn nhất trong năm nay.',
  'Một tháng rồi — và anh biết chắc rằng anh muốn còn rất nhiều tháng nữa bên em. Anh không cần nói nhiều, chỉ cần em biết: trong trái tim anh, chỗ của em chưa bao giờ lung lay.',
  'Và ngày mai — ngày 8 tháng 3 — là ngày của em. Nhân ngày Quốc tế Phụ nữ, anh muốn chúc em luôn hạnh phúc, luôn rạng rỡ, và luôn biết rằng em xứng đáng được yêu thương hết mực. Chúc mừng 8/3 em nhé! 🌸',
  'Anh yêu em — hôm qua, hôm nay, và tất cả những ngày sau này. 💕',
  'Mãi mãi của em,',
]
const SENDER_NAME = 'KenFi ❤️'   // 💌 Thay tên người gửi tại đây
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
        className="font-dancing text-love-cream/90 leading-relaxed mb-4 sm:mb-6"
        style={{ fontSize: 'clamp(0.9rem, 3.2vw, 1.5rem)', minHeight: '1.8em' }}
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

  // Floating petals — fewer on mobile for performance
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const petalCount = isMobile ? 5 : 12
  const petals = Array.from({ length: petalCount }, (_, i) => ({
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
      className="relative py-12 sm:py-24 px-3 sm:px-6 bg-letter overflow-hidden"
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
        className="text-center mb-8 sm:mb-16"
      >
        <p className="font-cormorant text-love-rose/70 tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-3">
          — Kỷ niệm 1 tháng · Thư tình —
        </p>
        <h2 className="font-playfair text-2xl sm:text-4xl md:text-5xl text-love-cream text-glow">
          Một tháng — một trái tim
        </h2>
        <div className="flex justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 text-lg sm:text-xl">
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
          className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-14 animate-border-glow"
          style={{
            background:
              'linear-gradient(145deg, rgba(255,77,109,0.06) 0%, rgba(13,0,21,0.9) 50%, rgba(255,133,161,0.06) 100%)',
            border: '1px solid rgba(255,77,109,0.2)',
          }}
        >
          {/* Corner ornaments — hidden on small screens to avoid overlapping text */}
          <div className="absolute top-4 left-4 text-love-rose/30 text-xl sm:text-3xl select-none hidden sm:block">❦</div>
          <div className="absolute top-4 right-4 text-love-rose/30 text-xl sm:text-3xl select-none rotate-180 hidden sm:block">❦</div>
          <div className="absolute bottom-4 left-4 text-love-rose/30 text-xl sm:text-3xl select-none rotate-90 hidden sm:block">❦</div>
          <div className="absolute bottom-4 right-4 text-love-rose/30 text-xl sm:text-3xl select-none -rotate-90 hidden sm:block">❦</div>

          {/* Opening decoration */}
          <div className="text-center mb-4 sm:mb-10">
            <div className="text-3xl sm:text-5xl animate-heart-beat">💌</div>
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

        {/* Photo memories strip under the letter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 sm:mt-14"
        >
          <p className="text-center font-cormorant text-love-rose/50 text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4">
            Khoảnh khắc đáng nhớ ✨
          </p>
          <div className="flex gap-1.5 sm:gap-3 justify-center overflow-x-auto no-scrollbar px-2">
            {LETTER_PHOTOS.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, rotate: (i % 2 === 0 ? -5 : 5) }}
                whileInView={{ opacity: 1, y: 0, rotate: (i % 2 === 0 ? -3 : 3) }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
                className="relative w-14 h-18 sm:w-24 sm:h-32 rounded-lg overflow-hidden shadow-lg border border-love-pink/20 flex-shrink-0 cursor-pointer"
              >
                <Image src={src} alt="" fill className="object-cover" sizes="96px" />
                <div className="absolute inset-0 bg-love-dark/20 hover:bg-transparent transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
