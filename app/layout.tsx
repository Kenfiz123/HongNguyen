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
  title: 'Tròn 1 Tháng Yêu Em ❤️ · Happy 8/3',
  description: 'Kỷ niệm 1 tháng yêu nhau (7/3) và chúc mừng ngày 8/3 — Dành tặng Ngọc Hồng.',
  keywords: ['1 tháng', 'kỷ niệm', '8/3', 'Ngày Quốc tế Phụ nữ', 'tình yêu', 'Ngọc Hồng'],
  openGraph: {
    title: 'Tròn 1 Tháng Yêu Em ❤️ · Happy 8/3',
    description: 'Kỷ niệm 1 tháng yêu nhau · Dành tặng Ngọc Hồng',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#ff4d6d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
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
