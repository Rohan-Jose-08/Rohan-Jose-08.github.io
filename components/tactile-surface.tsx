'use client'

import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'

export function TactileSurface({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const reduced = useReducedMotion()
  const x = useMotionValue(50)
  const y = useMotionValue(50)
  const opacity = useMotionValue(0)
  const highlight = useMotionTemplate`radial-gradient(340px circle at ${x}% ${y}%, oklch(0.77 0.19 155 / 0.10), transparent 62%)`

  const trackPointer = (event: MouseEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType === 'touch') return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(((event.clientX - rect.left) / rect.width) * 100)
    y.set(((event.clientY - rect.top) / rect.height) * 100)
  }

  return (
    <motion.div
      className={`tactile-surface relative ${className}`}
      onPointerMove={trackPointer}
      onPointerEnter={() => !reduced && opacity.set(1)}
      onPointerLeave={() => opacity.set(0)}
      whileTap={reduced ? undefined : { scale: 0.992 }}
      transition={{ type: 'spring', stiffness: 420, damping: 30, mass: 0.65 }}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
        style={{ background: highlight, opacity }}
      />
    </motion.div>
  )
}
