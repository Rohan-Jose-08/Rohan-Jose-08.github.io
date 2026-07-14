'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export function CrtOverlay() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEnabled(false)
    }
  }, [])

  if (reduced || !enabled) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03] mix-blend-overlay"
      style={{
        background: `
          linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
          linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))
        `,
        backgroundSize: '100% 4px, 6px 100%',
        boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.9)',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-10 animate-flicker mix-blend-overlay" />
    </div>
  )
}
