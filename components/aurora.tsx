'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function Aurora() {
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEnabled(false)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-[-1]"
    >
      <motion.div
        className="absolute -top-32 left-1/4 h-[420px] w-[560px] rounded-full blur-[120px]"
        style={{ background: 'oklch(0.77 0.19 155 / 0.18)' }}
        animate={enabled ? {
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.3, 0.5],
        } : { opacity: 0.5 }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 h-[380px] w-[480px] rounded-full blur-[130px]"
        style={{ background: 'oklch(0.7 0.18 230 / 0.16)' }}
        animate={enabled ? {
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.2, 0.4],
        } : { opacity: 0.4 }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute -bottom-20 left-1/2 h-[320px] w-[520px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: 'oklch(0.78 0.16 165 / 0.14)' }}
        animate={enabled ? {
          x: [0, 50, -50, 0],
          y: [0, 30, 0],
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.15, 0.4],
        } : { opacity: 0.4 }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  )
}
