'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// ── Customise here ──────────────────────────────────────────────────────────
// 📷 Thay các URL bằng ảnh thật của bạn và cập nhật captions
// Đặt ảnh vào thư mục public/images/ rồi dùng "/images/ten-anh.jpg"
const PHOTOS = [
  {
    src: 'https://picsum.photos/seed/couple1/600/800',
    caption: 'Khoảnh khắc đầu tiên bên nhau 🌸',
    width: 600,
    height: 800,
  },
  {
    src: 'https://picsum.photos/seed/sunset2/800/600',
    caption: 'Hoàng hôn cùng em ✨',
    width: 800,
    height: 600,
  },
  {
    src: 'https://picsum.photos/seed/flower3/600/600',
    caption: 'Em đẹp như hoa 🌹',
    width: 600,
    height: 600,
  },
  {
    src: 'https://picsum.photos/seed/travel4/800/600',
    caption: 'Chuyến đi đáng nhớ 💕',
    width: 800,
    height: 600,
  },
  {
    src: 'https://picsum.photos/seed/night5/600/800',
    caption: 'Đêm tuyệt vời bên em 🌙',
    width: 600,
    height: 800,
  },
  {
    src: 'https://picsum.photos/seed/happy6/800/800',
    caption: 'Nụ cười của em là tất cả 😊',
    width: 800,
    height: 800,
  },
]
// ────────────────────────────────────────────────────────────────────────────

function PhotoCard({
  photo,
  index,
  onClick,
}: {
  photo: (typeof PHOTOS)[0]
  index: number
  onClick: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.15 }}
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl cursor-pointer group"
      style={{ aspectRatio: `${photo.width}/${photo.height}` }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Image
        src={photo.src}
        alt={photo.caption}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Hover overlay */}
      <div className="photo-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Heart icon */}
      <motion.div
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        ❤️
      </motion.div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <p className="font-dancing text-white text-lg drop-shadow-lg">{photo.caption}</p>
      </div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-love-pink opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  )
}

function Lightbox({
  photo,
  onClose,
  onPrev,
  onNext,
}: {
  photo: (typeof PHOTOS)[0]
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(5,5,16,0.95)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', bounce: 0.3 }}
        className="relative max-w-4xl max-h-[90vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-2xl overflow-hidden">
          <Image
            src={photo.src}
            alt={photo.caption}
            width={photo.width}
            height={photo.height}
            className="w-full h-auto max-h-[80vh] object-contain"
          />
        </div>

        <p className="font-dancing text-love-cream text-xl text-center mt-4">{photo.caption}</p>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 bg-love-pink rounded-full flex items-center justify-center text-white hover:bg-love-rose transition-colors text-lg font-bold"
        >
          ×
        </button>

        {/* Nav arrows */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:bg-love-pink/20 transition-colors"
        >
          ‹
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:bg-love-pink/20 transition-colors"
        >
          ›
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function GallerySection() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true })

  const prev = () => setLightboxIdx((i) => (i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length))
  const next = () => setLightboxIdx((i) => (i === null ? null : (i + 1) % PHOTOS.length))

  return (
    <section id="gallery" className="relative py-24 px-6 bg-love-dark overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,77,109,0.05) 0%, transparent 60%)' }}
      />

      {/* Title */}
      <div ref={titleRef} className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          className="font-cormorant text-love-rose/70 tracking-widest uppercase text-sm mb-3"
        >
          — Kỷ niệm —
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="font-playfair text-4xl md:text-5xl text-love-cream text-glow"
        >
          Những khoảnh khắc của chúng mình
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={titleInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="h-px w-48 mx-auto mt-6 bg-gradient-to-r from-transparent via-love-pink to-transparent"
        />
      </div>

      {/* Masonry grid */}
      <div className="max-w-6xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
        {PHOTOS.map((photo, i) => (
          <div key={i} className="break-inside-avoid">
            <PhotoCard photo={photo} index={i} onClick={() => setLightboxIdx(i)} />
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center font-cormorant text-love-rose/50 mt-12 italic"
      >
        Mỗi bức ảnh là một kỷ niệm không thể nào quên... 📸
      </motion.p>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            photo={PHOTOS[lightboxIdx]}
            onClose={() => setLightboxIdx(null)}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
