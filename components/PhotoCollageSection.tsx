'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

// Selected photos for the collage showcase
const COLLAGE_IMAGES = [
  { src: '/images/1396f40dcfed41b318fc2.jpg', span: 'col-span-2 row-span-2' },
  { src: '/images/3df711222ac2a49cfdd31.jpg', span: 'col-span-1 row-span-1' },
  { src: '/images/94b722f51815964bcf0413.jpg', span: 'col-span-1 row-span-1' },
  { src: '/images/277454936e73e02db96221.jpg', span: 'col-span-1 row-span-2' },
  { src: '/images/7b7f05233cc3b29debd229.jpg', span: 'col-span-1 row-span-1' },
  { src: '/images/c15e8d88b7683936607920.jpg', span: 'col-span-2 row-span-1' },
  { src: '/images/92b78327b9c737996ed625.jpg', span: 'col-span-1 row-span-1' },
]

export default function PhotoCollageSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050510 0%, #0d0015 50%, #050510 100%)' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(255,77,109,0.06) 0%, transparent 60%)' }}
      />

      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="font-cormorant text-love-rose/70 tracking-widest uppercase text-sm mb-3"
          >
            — Bức tranh tình yêu —
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-playfair text-2xl sm:text-3xl md:text-4xl text-love-cream text-glow"
          >
            Mảnh ghép hạnh phúc 💕
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-px w-32 mx-auto mt-4 bg-gradient-to-r from-transparent via-love-pink to-transparent"
          />
        </div>

        {/* Collage grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 auto-rows-[120px] sm:auto-rows-[160px] gap-2 sm:gap-3">
          {COLLAGE_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
              className={`relative rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer ${img.span}`}
            >
              <Image
                src={img.src}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 33vw, 25vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-love-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Border glow */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-love-pink/0 group-hover:border-love-pink/40 transition-all duration-500 pointer-events-none" />
              {/* Heart on hover */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              >
                <span className="drop-shadow-lg">❤️</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Decorative quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 sm:mt-12"
        >
          <p className="font-dancing text-love-blush/60 text-lg sm:text-xl italic">
            &quot;Mỗi mảnh ghép đều là em và anh...&quot; 💗
          </p>
        </motion.div>
      </div>
    </section>
  )
}

