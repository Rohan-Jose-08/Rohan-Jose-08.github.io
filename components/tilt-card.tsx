'use client'

import { useRef, type ReactNode, type PointerEvent } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
  perspective?: number
  scaleOnHover?: number
  glare?: boolean
  glareOpacity?: number
  as?: 'div' | 'article' | 'li'
}

const returnSpring = { stiffness: 260, damping: 24, mass: 0.7 }

export function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  perspective = 1000,
  scaleOnHover = 1.02,
  glare = true,
  glareOpacity = 0.1,
  as: Tag = 'div',
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const rotateX = useSpring(useMotionValue(0), returnSpring)
  const rotateY = useSpring(useMotionValue(0), returnSpring)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)
  const glareLevel = useMotionValue(0)
  const glareBackground = useMotionTemplate`radial-gradient(360px circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareOpacity}), transparent 62%)`

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType === 'touch' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    rotateX.set((0.5 - py) * maxTilt * 2)
    rotateY.set((px - 0.5) * maxTilt * 2)
    glareX.set(px * 100)
    glareY.set(py * 100)
  }

  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
    glareLevel.set(0)
  }

  const MotionTag = Tag === 'article' ? motion.article : Tag === 'li' ? motion.li : motion.div

  return (
    <MotionTag
      ref={ref}
      className={`relative ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={(event) => {
        if (!reduced && event.pointerType !== 'touch') glareLevel.set(1)
      }}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={{ perspective, transformStyle: 'preserve-3d', rotateX, rotateY }}
      whileHover={reduced ? undefined : { scale: scaleOnHover, y: -2 }}
      whileTap={reduced ? undefined : { scale: 0.992, y: 0 }}
      transition={{ type: 'spring', stiffness: 340, damping: 26, mass: 0.7 }}
    >
      {children}
      {glare ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
          style={{ background: glareBackground, opacity: glareLevel }}
        />
      ) : null}
    </MotionTag>
  )
}
