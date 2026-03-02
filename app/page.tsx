'use client'

import dynamic from 'next/dynamic'
import HeroSection from '@/components/HeroSection'
import LoveLetterSection from '@/components/LoveLetterSection'
import GallerySection from '@/components/GallerySection'
import ReasonsSection from '@/components/ReasonsSection'
import FinalSection from '@/components/FinalSection'

// Lazy load browser-only components
const CursorTrail = dynamic(() => import('@/components/CursorTrail'), { ssr: false })
const MusicPlayer = dynamic(() => import('@/components/MusicPlayer'), { ssr: false })

export default function Home() {
  return (
    <main className="relative">
      {/* Custom cursor & music – client-only */}
      <CursorTrail />
      <MusicPlayer />

      {/* Sections */}
      <HeroSection />
      <LoveLetterSection />
      <GallerySection />
      <ReasonsSection />
      <FinalSection />
    </main>
  )
}
