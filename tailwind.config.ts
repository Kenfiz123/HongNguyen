import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'love-dark': '#050510',
        'love-deep': '#0d0015',
        'love-pink': '#ff4d6d',
        'love-rose': '#ff85a1',
        'love-blush': '#ffd6e7',
        'love-gold': '#ffd700',
        'love-cream': '#fff5f8',
        'love-glass': 'rgba(255, 77, 109, 0.1)',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)'],
        dancing: ['var(--font-dancing)'],
        cormorant: ['var(--font-cormorant)'],
      },
      animation: {
        'float-heart': 'floatHeart 3s ease-in-out infinite',
        'pulse-heart': 'pulseHeart 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'float-up': 'floatUp 1s ease-out forwards',
      },
      keyframes: {
        floatHeart: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-15px) scale(1.05)' },
        },
        pulseHeart: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.1)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.08)' },
          '70%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 20px rgba(255,77,109,0.5)' },
          '50%': { textShadow: '0 0 40px rgba(255,77,109,1), 0 0 80px rgba(255,77,109,0.5)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.3)' },
        },
        floatUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
