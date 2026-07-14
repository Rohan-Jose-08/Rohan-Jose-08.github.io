'use client'

import { useEffect, useState } from 'react'

export function CursorSpotlight() {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -9999, y: -9999 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    setEnabled(true)

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  if (!enabled) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, oklch(0.77 0.19 155 / 0.06), transparent 50%)`,
      }}
    />
  )
}
