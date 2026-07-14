'use client'

import { useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'

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

export function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  perspective = 1000,
  scaleOnHover = 1.02,
  glare = true,
  glareOpacity = 0.12,
  as: Tag = 'div',
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  const springConfig = { stiffness: 260, damping: 20, mass: 0.8 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)
  
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareOpacity}), transparent 60%)`

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const percentX = (e.clientX - centerX) / (rect.width / 2)
    const percentY = (e.clientY - centerY) / (rect.height / 2)

    rotateX.set(-percentY * maxTilt)
    rotateY.set(percentX * maxTilt)

    // Glare position follows cursor
    glareX.set(((e.clientX - rect.left) / rect.width) * 100)
    glareY.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  const handleMouseEnter = () => setIsHovered(true)

  const handleMouseLeave = () => {
    setIsHovered(false)
    rotateX.set(0)
    rotateY.set(0)
    glareX.set(50)
    glareY.set(50)
  }

  const MotionTag = Tag === 'article' ? motion.article : Tag === 'li' ? motion.li : motion.div

  return (
    <MotionTag
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective,
        transformStyle: 'preserve-3d',
        rotateX: springRotateX,
        rotateY: springRotateY,
      }}
      animate={{
        scale: isHovered ? scaleOnHover : 1,
      }}
      transition={{ scale: { type: 'spring', stiffness: 300, damping: 20 } }}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
          style={{
            background: glareBackground,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ opacity: { duration: 0.2 } }}
        />
      )}
    </MotionTag>
  )
}
