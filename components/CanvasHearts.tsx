'use client'

import { useEffect, useRef } from 'react'

interface Heart {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  opacity: number
  color: string
  rotation: number
  rotationSpeed: number
}

const COLORS = ['#ff4d6d', '#ff85a1', '#ffb3c6', '#ff0040', '#ff6b8a', '#ffd6e7']

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.beginPath()
  // Parametric heart curve
  for (let t = 0; t <= Math.PI * 2; t += 0.05) {
    const hx = 16 * Math.pow(Math.sin(t), 3)
    const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
    if (t === 0) ctx.moveTo((hx * size) / 16, (hy * size) / 16)
    else ctx.lineTo((hx * size) / 16, (hy * size) / 16)
  }
  ctx.closePath()
  ctx.restore()
}

function createHeart(canvas: HTMLCanvasElement): Heart {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 30,
    size: Math.random() * 18 + 8,
    speedY: Math.random() * 1.2 + 0.4,
    speedX: (Math.random() - 0.5) * 0.6,
    opacity: Math.random() * 0.5 + 0.3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.02,
  }
}

interface Star {
  x: number
  y: number
  size: number
  twinkleSpeed: number
  twinkleOffset: number
}

function createStar(canvas: HTMLCanvasElement): Star {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 1.5 + 0.3,
    twinkleSpeed: Math.random() * 0.03 + 0.01,
    twinkleOffset: Math.random() * Math.PI * 2,
  }
}

export default function CanvasHearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Reduce particle count on mobile for performance
    const isMobile = window.innerWidth < 768
    const heartCount = isMobile ? 8 : 25
    const starCount = isMobile ? 40 : 120
    const stepSize = isMobile ? 0.1 : 0.05

    // Create initial hearts and stars
    const hearts: Heart[] = Array.from({ length: heartCount }, () => {
      const h = createHeart(canvas)
      h.y = Math.random() * canvas.height // start scattered
      return h
    })
    const stars: Star[] = Array.from({ length: starCount }, () => createStar(canvas))

    let tick = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      tick++

      // ── Stars ──────────────────────────────────
      stars.forEach((star) => {
        const opacity = 0.3 + 0.7 * Math.abs(Math.sin(tick * star.twinkleSpeed + star.twinkleOffset))
        ctx.save()
        ctx.globalAlpha = opacity
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // ── Hearts ─────────────────────────────────
      hearts.forEach((h, i) => {
        h.y -= h.speedY
        h.x += h.speedX
        h.rotation += h.rotationSpeed

        // Fade in/out based on vertical position
        const progress = 1 - h.y / canvas.height
        const fade = progress < 0.1 ? progress / 0.1 : progress > 0.8 ? (1 - progress) / 0.2 : 1
        h.opacity = fade * (Math.random() * 0.2 + 0.3)

        if (h.y < -40) {
          hearts[i] = createHeart(canvas)
        }

        ctx.save()
        ctx.globalAlpha = Math.max(0, h.opacity)
        ctx.translate(h.x, h.y)
        ctx.rotate(h.rotation)
        ctx.fillStyle = h.color
        ctx.shadowColor = h.color
        ctx.shadowBlur = isMobile ? 4 : 8
        ctx.beginPath()
        for (let t = 0; t <= Math.PI * 2; t += stepSize) {
          const hx = 16 * Math.pow(Math.sin(t), 3)
          const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
          if (t === 0) ctx.moveTo((hx * h.size) / 16, (hy * h.size) / 16)
          else ctx.lineTo((hx * h.size) / 16, (hy * h.size) / 16)
        }
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      })

      // Occasionally add new hearts
      const maxHearts = isMobile ? 18 : 40
      if (tick % 90 === 0 && hearts.length < maxHearts) {
        hearts.push(createHeart(canvas))
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
