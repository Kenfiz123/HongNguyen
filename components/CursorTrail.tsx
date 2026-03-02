'use client'

import { useEffect, useRef } from 'react'

interface TrailHeart {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  vy: number
  vx: number
  life: number
  maxLife: number
  color: string
}

const COLORS = ['#ff4d6d', '#ff85a1', '#ffb3c6', '#ffd700']
let idCounter = 0

export default function CursorTrail() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const heartsRef = useRef<TrailHeart[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animRef = useRef<number>(0)
  const lastPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const container = containerRef.current
    if (!dot || !ring || !container) return

    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e
      mouseRef.current = { x, y }

      dot.style.left = `${x}px`
      dot.style.top = `${y}px`

      // Delayed ring follow
      setTimeout(() => {
        ring.style.left = `${x}px`
        ring.style.top = `${y}px`
      }, 80)

      // Spawn hearts when moved enough
      const dx = x - lastPos.current.x
      const dy = y - lastPos.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist > 20 && heartsRef.current.length < 30) {
        lastPos.current = { x, y }
        heartsRef.current.push({
          id: idCounter++,
          x,
          y,
          size: Math.random() * 14 + 8,
          opacity: 0.9,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -(Math.random() * 2 + 1),
          life: 0,
          maxLife: 60,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        })
      }
    }

    const renderLoop = () => {
      heartsRef.current = heartsRef.current.filter((h) => h.life < h.maxLife)

      heartsRef.current.forEach((h) => {
        h.x += h.vx
        h.y += h.vy
        h.vy *= 0.98
        h.life++
        h.opacity = 1 - h.life / h.maxLife
      })

      // Sync DOM hearts
      const existing = new Map(
        Array.from(container.querySelectorAll<HTMLDivElement>('[data-heart]')).map((el) => [
          el.dataset.heart!,
          el,
        ])
      )

      heartsRef.current.forEach((h) => {
        let el = existing.get(String(h.id))
        if (!el) {
          el = document.createElement('div')
          el.dataset.heart = String(h.id)
          el.innerHTML = '❤'
          el.style.position = 'fixed'
          el.style.pointerEvents = 'none'
          el.style.userSelect = 'none'
          el.style.zIndex = '9997'
          el.style.color = h.color
          el.style.fontSize = `${h.size}px`
          el.style.filter = `drop-shadow(0 0 4px ${h.color})`
          container.appendChild(el)
        } else {
          existing.delete(String(h.id))
        }
        el.style.left = `${h.x - h.size / 2}px`
        el.style.top = `${h.y - h.size / 2}px`
        el.style.opacity = String(h.opacity)
      })

      existing.forEach((el) => el.remove())

      animRef.current = requestAnimationFrame(renderLoop)
    }

    window.addEventListener('mousemove', onMove)
    animRef.current = requestAnimationFrame(renderLoop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={containerRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 9997 }} />
    </>
  )
}
