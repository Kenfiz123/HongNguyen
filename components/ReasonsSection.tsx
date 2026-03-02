'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Customise here ──────────────────────────────────────────────────────────
const REASONS = [
  { emoji: '😊', title: 'Nụ cười của em', desc: 'Nụ cười em làm sáng bừng cả ngày của anh, dù ngày hôm đó có u ám đến đâu.' },
  { emoji: '🌸', title: 'Sự dịu dàng', desc: 'Em luôn biết cách khiến mọi thứ trở nên tốt đẹp hơn bằng trái tim nhân hậu.' },
  { emoji: '🌙', title: 'Mọi khoảnh khắc', desc: 'Dù đêm hay ngày, nghĩ đến em là anh lại mỉm cười một mình.' },
  { emoji: '✨', title: 'Sự quan tâm', desc: 'Tình cảm em dành cho anh thật đặc biệt và chân thành từ tận đáy lòng.' },
  { emoji: '💖', title: 'Không thể thiếu', desc: 'Em là phần không thể thiếu trong cuộc đời của anh, một mảnh ghép hoàn hảo.' },
  { emoji: '🦋', title: 'Bên em, anh là mình', desc: 'Bên em, anh được là chính mình, không cần giả vờ hay che giấu.' },
  { emoji: '🌹', title: 'Vẻ đẹp của em', desc: 'Em đẹp cả bên trong lẫn bên ngoài — và đó là điều hiếm có nhất trên đời.' },
  { emoji: '🎵', title: 'Giọng cười em', desc: 'Giọng cười của em là giai điệu anh yêu thích nhất trong muôn vàn giai điệu.' },
]
// ────────────────────────────────────────────────────────────────────────────

function ReasonCard({ reason, index }: { reason: (typeof REASONS)[0]; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotate: -3 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      className="flip-card h-48"
      onClick={() => setFlipped((f) => !f)}
    >
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div className="flip-card-front glass flex flex-col items-center justify-center p-6 cursor-pointer group">
          {/* Number */}
          <div
            className="absolute top-3 right-4 font-playfair text-love-pink/30 font-bold"
            style={{ fontSize: '2.5rem' }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
            className="text-5xl mb-3"
          >
            {reason.emoji}
          </motion.div>

          <h3 className="font-playfair text-love-cream text-center font-semibold text-sm md:text-base leading-tight">
            {reason.title}
          </h3>

          <p className="text-love-rose/50 text-xs mt-2 font-cormorant">Nhấn để xem ❤️</p>
        </div>

        {/* Back */}
        <div
          className="flip-card-back flex items-center justify-center p-6 cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, rgba(255,77,109,0.15) 0%, rgba(13,0,21,0.95) 100%)',
            border: '1px solid rgba(255,77,109,0.3)',
          }}
        >
          <div className="text-center">
            <div className="text-2xl mb-3">{reason.emoji}</div>
            <p className="font-dancing text-love-cream/90 leading-relaxed" style={{ fontSize: '1.05rem' }}>
              "{reason.desc}"
            </p>
            <div className="mt-3 text-love-pink text-lg">❤️</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ReasonsSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true })

  return (
    <section id="reasons" className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050510 0%, #0d0015 50%, #050510 100%)' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,77,109,0.07) 0%, transparent 70%)' }}
      />

      {/* Title */}
      <div ref={titleRef} className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="font-cormorant text-love-rose/70 tracking-widest uppercase text-sm mb-3"
        >
          — Lý do —
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="font-playfair text-4xl md:text-5xl text-love-cream text-glow"
        >
          Tại sao anh yêu em?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="font-cormorant text-love-blush/60 mt-4 text-lg"
        >
          Nhấn vào từng thẻ để khám phá...
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="h-px w-48 mx-auto mt-6 bg-gradient-to-r from-transparent via-love-pink to-transparent"
        />
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {REASONS.map((reason, i) => (
          <ReasonCard key={i} reason={reason} index={i} />
        ))}
      </div>

      {/* Bottom counter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center mt-16 glass-dark rounded-full px-10 py-5 inline-flex items-center gap-4 mx-auto flex justify-center"
        style={{ maxWidth: 'fit-content', margin: '4rem auto 0' }}
      >
        <span className="text-3xl animate-heart-beat">❤️</span>
        <span className="font-dancing text-love-cream text-xl">
          Và còn vô vàn lý do khác mà anh không thể đếm hết...
        </span>
        <span className="text-3xl animate-heart-beat">❤️</span>
      </motion.div>
    </section>
  )
}
