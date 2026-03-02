import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Dancing_Script, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Happy 8/3 ❤️ — Dành cho em',
  description: 'Một món quà nhỏ từ trái tim anh, dành tặng em nhân ngày 8/3.',
  keywords: ['8/3', 'Ngày Quốc tế Phụ nữ', 'Happy Women Day', 'tình yêu'],
  openGraph: {
    title: 'Happy 8/3 ❤️ — Dành cho em',
    description: 'Một món quà nhỏ từ trái tim anh',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#ff4d6d',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={`${playfair.variable} ${dancing.variable} ${cormorant.variable}`}>
      <body className="bg-love-dark text-love-cream overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
