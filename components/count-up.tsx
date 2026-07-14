'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface CountUpProps {
  value: number
  duration?: number
  className?: string
  format?: (n: number) => string
}

export function CountUp({ value, duration = 1400, className, format }: CountUpProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(reduced ? value : 0)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced) {
      setDisplay(value)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - t, 3)
            setDisplay(Math.round(eased * value))
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration, reduced])

  return (
    <span ref={ref} className={className}>
      {format ? format(display) : display.toLocaleString()}
    </span>
  )
}
