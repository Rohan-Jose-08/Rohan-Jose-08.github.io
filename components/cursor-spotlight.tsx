'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'

export function CursorSpotlight() {
  const [enabled, setEnabled] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const mouseX = useMotionValue(-999)
  const mouseY = useMotionValue(-999)

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  const spotlightBg = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, oklch(0.77 0.19 155 / 0.08), transparent 50%)`

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    setEnabled(true)

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      
      const target = e.target as HTMLElement
      const isClickable = target.closest('a, button, .press, .hover-lift, .tooltip-trigger, input')
      setIsHovering(!!isClickable)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  if (!enabled) return null

  return (
    <>
      {/* Background Spotlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
        style={{ background: spotlightBg }}
      />
      {/* Trailing Dot Cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full bg-primary mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          width: 12,
          height: 12,
          marginLeft: -6,
          marginTop: -6,
        }}
        animate={{
          scale: isHovering ? 4 : 1,
          opacity: isHovering ? 0.3 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />
    </>
  )
}
