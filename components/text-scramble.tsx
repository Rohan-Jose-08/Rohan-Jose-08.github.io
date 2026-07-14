'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const CHARS = '!<>-_\\/[]{}—=+*^?#________'

interface TextScrambleProps {
  text: string
  className?: string
  speed?: number
  delay?: number
  trigger?: 'mount' | 'inView'
}

export function TextScramble({
  text,
  className,
  speed = 28,
  delay = 0,
  trigger = 'inView',
}: TextScrambleProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const [out, setOut] = useState(text)

  useEffect(() => {
    if (reduced) {
      setOut(text)
      return
    }
    const el = ref.current
    if (!el) return

    let started = false
    let raf = 0
    let timeout: ReturnType<typeof setTimeout> | null = null

    const start = () => {
      if (started) return
      started = true
      const from = text
      const len = from.length
      let frame = 0
      const queue: Array<{ from: string; to: string; start: number; end: number; char?: string }> = []
      for (let i = 0; i < len; i++) {
        const fromChar = from[i]
        const end = Math.max(8, Math.floor(Math.random() * 24) + 8)
        queue.push({ from: fromChar, to: fromChar, start: Math.floor(Math.random() * 16), end })
      }
      const update = () => {
        let output = ''
        let complete = 0
        for (let i = 0; i < queue.length; i++) {
          const item = queue[i]
          if (frame >= item.end) {
            complete++
            output += item.to
          } else if (frame >= item.start) {
            if (!item.char || Math.random() < 0.28) {
              item.char = CHARS[Math.floor(Math.random() * CHARS.length)]
            }
            output += item.char
          } else {
            output += item.from
          }
        }
        setOut(output)
        if (complete < queue.length) {
          frame++
          raf = requestAnimationFrame(update)
        } else {
          setOut(text)
        }
      }
      update()
    }

    if (trigger === 'mount') {
      timeout = setTimeout(start, delay)
      return () => {
        if (timeout) clearTimeout(timeout)
        cancelAnimationFrame(raf)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeout = setTimeout(start, delay)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      if (timeout) clearTimeout(timeout)
      cancelAnimationFrame(raf)
    }
  }, [text, speed, delay, reduced, trigger])

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  )
}
