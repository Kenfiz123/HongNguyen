'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// ── All images in public/images/ ────────────────────────────────────────────
const ALL_IMAGES = [
  '017acb38f2d87c8625c926.jpg',
  '1396f40dcfed41b318fc2.jpg',
  '140189aeb24e3c10655f4.jpg',
  '189d9630add0238e7ac16.jpg',
  '1d85983ea3de2d8074cf8.jpg',
  '1f6666be5c5ed2008b4f19.jpg',
  '20b91ab42054ae0af74515.jpg',
  '277454936e73e02db96221.jpg',
  '2874592260c2ee9cb7d331.jpg',
  '2898690052e0dcbe85f13.jpg',
  '2c64d99be37b6d25346a23.jpg',
  '3d02c10bfbeb75b52cfa14.jpg',
  '3df711222ac2a49cfdd31.jpg',
  '3f45bbf480140e4a570510.jpg',
  '515e6d1e54fedaa083ef27.jpg',
  '5bf6d9abe04b6e15375a28.jpg',
  '64ff33a40a44841add5530.jpg',
  '7b7f05233cc3b29debd229.jpg',
  '7db68924b3c43d9a64d524.jpg',
  '9295fe35c5d54b8b12c47.jpg',
  '92b78327b9c737996ed625.jpg',
  '94b722f51815964bcf0413.jpg',
  '96476e7a549adac4838b18.jpg',
  'a27aec31d6d1588f01c05.jpg',
  'b28553826962e73cbe7316.jpg',
  'b9b3a20a99ea17b44efb9.jpg',
  'c15e8d88b7683936607920.jpg',
  'd6d0023438d4b68aefc522.jpg',
  'df22756c4f8cc1d2989d12.jpg',
  'f10c732b49cbc7959eda17.jpg',
  'f7b29f03a4e32abd73f211.jpg',
]

const CAPTIONS = [
  'Khoảnh khắc đầu tiên bên nhau 🌸',
  'Hoàng hôn cùng em ✨',
  'Em đẹp như hoa 🌹',
  'Chuyến đi đáng nhớ 💕',
  'Đêm tuyệt vời bên em 🌙',
  'Nụ cười của em là tất cả 😊',
  'Bên em là hạnh phúc 💖',
  'Kỷ niệm ngọt ngào 🍬',
  'Mãi mãi bên nhau 💝',
  'Em là ánh sáng của anh ✨',
  'Tình yêu đẹp như mơ 🌺',
  'Cùng nhau viết tiếp câu chuyện 📖',
  'Nơi có em là nhà 🏡',
  'Mỗi ngày bên em là quà 🎁',
  'Em làm tim anh rộn ràng 💗',
  'Trái tim anh thuộc về em 💘',
  'Ánh mắt em say đắm 👀',
  'Ngày hạnh phúc nhất 🎉',
  'Cùng nhau đi khắp nơi 🗺️',
  'Yêu em không lời nào đủ 💌',
  'Mùa xuân tình yêu 🌷',
  'Em là cả thế giới 🌍',
  'Khoảnh khắc lung linh ✨',
  'Cười thật tươi nào em 😄',
  'Tình yêu vĩnh cửu 💎',
  'Ngọt ngào như kẹo 🍭',
  'Bầu trời riêng của mình 🌌',
  'Phút giây bình yên 🕊️',
  'Hạnh phúc giản đơn 🍀',
  'Ngày tháng đáng nhớ 📅',
  'Mãi yêu em 💕',
]

// Aspect ratios for masonry — cycle through for visual variety
const ASPECT_PATTERNS = [
  'aspect-[3/4]',   // portrait
  'aspect-[4/3]',   // landscape
  'aspect-square',  // square
  'aspect-[3/4]',   // portrait
  'aspect-[4/3]',   // landscape
  'aspect-[3/4]',   // portrait
  'aspect-square',  // square
  'aspect-[4/3]',   // landscape
  'aspect-[3/4]',   // portrait
  'aspect-[4/3]',   // landscape
]

type Photo = { src: string; caption: string; index: number }

// ────────────────────────────────────────────────────────────────────────────

function PhotoCard({
  photo,
  layoutIndex,
  onClick,
}: {
  photo: Photo
  layoutIndex: number
  onClick: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const aspectClass = ASPECT_PATTERNS[layoutIndex % ASPECT_PATTERNS.length]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: (layoutIndex % 4) * 0.1, ease: 'easeOut' }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer group ${aspectClass}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <Image
        src={photo.src}
        alt={photo.caption}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        loading="lazy"
      />

      {/* Hover overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-love-dark/90 via-love-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* Heart pulse on hover */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl z-20 pointer-events-none"
      >
        ❤️
      </motion.div>

      {/* Caption on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
        <p className="font-dancing text-white text-sm sm:text-base drop-shadow-lg line-clamp-2">
          {photo.caption}
        </p>
      </div>

      {/* Image number badge */}
      <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-love-pink/60 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {photo.index + 1}
      </div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-love-pink/0 group-hover:border-love-pink/50 transition-all duration-500 pointer-events-none z-20" />
    </motion.div>
  )
}

function Lightbox({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  photos: Photo[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const touchDelta = useRef(0)
  const photo = photos[currentIndex]

  // Lock body scroll
  useEffect(() => {
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      window.scrollTo(0, scrollY)
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onPrev()
      else if (e.key === 'ArrowRight') onNext()
      else if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onPrev, onNext, onClose])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    touchDelta.current = 0
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current) return
    touchDelta.current = e.touches[0].clientX - touchStart.current.x
  }

  const handleTouchEnd = () => {
    if (Math.abs(touchDelta.current) > 60) {
      if (touchDelta.current > 0) onPrev()
      else onNext()
    }
    touchStart.current = null
    touchDelta.current = 0
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      style={{ background: 'rgba(5,5,16,0.97)' }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', bounce: 0.25 }}
        className="relative max-w-5xl max-h-[90vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main image */}
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-love-pink/20">
          <AnimatePresence mode="wait">
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                width={1200}
                height={900}
                className="w-full h-auto max-h-[60vh] sm:max-h-[75vh] object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Caption + counter */}
        <div className="text-center mt-3 sm:mt-4 px-4 sm:px-12">
          <AnimatePresence mode="wait">
            <motion.p
              key={photo.caption}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-dancing text-love-cream text-base sm:text-xl"
            >
              {photo.caption}
            </motion.p>
          </AnimatePresence>
          <p className="font-cormorant text-love-rose/40 text-sm mt-1">
            {currentIndex + 1} / {photos.length}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48 mx-auto mt-3 h-0.5 bg-love-dark rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-love-pink rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / photos.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Swipe hint on mobile */}
        <p className="sm:hidden text-center font-cormorant text-love-rose/30 text-xs mt-3">
          ← Vuốt để xem thêm →
        </p>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:-top-3 sm:-right-3 w-10 h-10 bg-love-pink rounded-full flex items-center justify-center text-white hover:bg-love-rose transition-colors text-lg font-bold shadow-lg z-10"
        >
          ×
        </button>

        {/* Nav arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="absolute left-1 sm:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 glass rounded-full flex items-center justify-center text-white hover:bg-love-pink/30 transition-colors text-lg sm:text-xl"
        >
          ‹
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className="absolute right-1 sm:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 glass rounded-full flex items-center justify-center text-white hover:bg-love-pink/30 transition-colors text-lg sm:text-xl"
        >
          ›
        </button>

        {/* Thumbnail strip */}
        <div className="hidden sm:flex justify-center gap-2 mt-4 max-w-3xl mx-auto overflow-x-auto no-scrollbar py-2">
          {photos.map((p, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); onNext(); /* will be handled by parent */ }}
              className={`relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${
                i === currentIndex
                  ? 'ring-2 ring-love-pink scale-110'
                  : 'opacity-50 hover:opacity-80'
              }`}
              onClickCapture={(e) => {
                e.stopPropagation()
                // Direct index jump
                const event = new CustomEvent('lightbox-goto', { detail: i })
                window.dispatchEvent(event)
              }}
            >
              <Image src={p.src} alt="" fill className="object-cover" sizes="48px" />
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Horizontal photo ribbon (auto-scroll) ───────────────────────────────────
function PhotoRibbon({ images, reverse = false }: { images: string[]; reverse?: boolean }) {
  return (
    <div className="overflow-hidden py-2">
      <motion.div
        className="flex gap-3"
        animate={{ x: reverse ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {[...images, ...images].map((img, i) => (
          <div key={i} className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0">
            <Image src={`/images/${img}`} alt="" fill className="object-cover" sizes="96px" />
            <div className="absolute inset-0 bg-love-dark/30" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function GallerySection() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true })

  // Build photos list
  const allPhotos: Photo[] = ALL_IMAGES.map((img, i) => ({
    src: `/images/${img}`,
    caption: CAPTIONS[i % CAPTIONS.length],
    index: i,
  }))

  const displayedPhotos = showAll ? allPhotos : allPhotos.slice(0, 12)

  // Lightbox navigation
  const prev = useCallback(() =>
    setLightboxIdx((i) => (i === null ? null : (i - 1 + allPhotos.length) % allPhotos.length)),
    [allPhotos.length]
  )
  const next = useCallback(() =>
    setLightboxIdx((i) => (i === null ? null : (i + 1) % allPhotos.length)),
    [allPhotos.length]
  )

  // Listen for thumbnail direct jump
  useEffect(() => {
    const handler = (e: Event) => {
      const idx = (e as CustomEvent).detail
      setLightboxIdx(idx)
    }
    window.addEventListener('lightbox-goto', handler)
    return () => window.removeEventListener('lightbox-goto', handler)
  }, [])

  return (
    <section id="gallery" className="relative py-12 sm:py-24 px-3 sm:px-6 bg-love-dark overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,77,109,0.06) 0%, transparent 60%)' }}
      />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 80%, rgba(255,133,161,0.04) 0%, transparent 50%)' }}
      />

      {/* Auto-scrolling ribbon at top */}
      <div className="max-w-7xl mx-auto mb-10 sm:mb-14 opacity-40">
        <PhotoRibbon images={ALL_IMAGES.slice(0, 16)} />
      </div>

      {/* Title */}
      <div ref={titleRef} className="text-center mb-8 sm:mb-14">
        <motion.p
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          className="font-cormorant text-love-rose/70 tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-3"
        >
          — Kỷ niệm —
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="font-playfair text-2xl sm:text-4xl md:text-5xl text-love-cream text-glow"
        >
          Ảnh Vợ Yêu
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="font-cormorant text-love-blush/50 mt-2 sm:mt-3 text-base sm:text-lg"
        >
          {ALL_IMAGES.length} bức ảnh · {ALL_IMAGES.length} kỷ niệm
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={titleInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="h-px w-32 sm:w-48 mx-auto mt-4 sm:mt-6 bg-gradient-to-r from-transparent via-love-pink to-transparent"
        />
      </div>

      {/* Masonry grid — all photos */}
      <div className="max-w-6xl mx-auto columns-2 md:columns-3 lg:columns-4 gap-2 sm:gap-4 space-y-2 sm:space-y-4">
        <AnimatePresence>
          {displayedPhotos.map((photo, i) => (
            <div key={photo.index} className="break-inside-avoid">
              <PhotoCard
                photo={photo}
                layoutIndex={i}
                onClick={() => setLightboxIdx(photo.index)}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show more / less button */}
      {!showAll && allPhotos.length > 12 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(true)}
            className="px-6 sm:px-8 py-3 rounded-full font-cormorant text-love-cream text-base sm:text-lg tracking-wider border border-love-pink/40 hover:bg-love-pink/10 transition-all duration-300 w-full sm:w-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(255,77,109,0.08), rgba(255,133,161,0.08))',
            }}
          >
            ✨ Xem tất cả {allPhotos.length} ảnh ✨
          </motion.button>
        </motion.div>
      )}

      {showAll && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(false)}
            className="px-8 py-3 rounded-full font-cormorant text-love-rose/60 text-base tracking-wider border border-love-rose/20 hover:bg-love-pink/10 transition-all duration-300"
          >
            Thu gọn
          </motion.button>
        </motion.div>
      )}

      {/* Auto-scrolling ribbon at bottom (reverse direction) */}
      <div className="max-w-7xl mx-auto mt-10 sm:mt-14 opacity-40">
        <PhotoRibbon images={ALL_IMAGES.slice(15)} reverse />
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center font-cormorant text-love-rose/50 mt-10 italic"
      >
        Mỗi bức ảnh là một kỷ niệm không thể nào quên... 📸
      </motion.p>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            photos={allPhotos}
            currentIndex={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
