'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400, mass: 0.2 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return
    setEnabled(true)

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 10)
      mouseY.set(e.clientY - 10)
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.tagName === 'INPUT'
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onMouseOver, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onMouseOver)
    }
  }, [mouseX, mouseY])

  if (!enabled) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `* { cursor: none !important; }` }} />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          width: isHovering ? 40 : 20,
          height: isHovering ? 40 : 20,
          x: isHovering ? '-10px' : '0px',
          y: isHovering ? '-10px' : '0px',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <div className="h-full w-full bg-white opacity-80 rounded-sm" />
      </motion.div>
    </>
  )
}
