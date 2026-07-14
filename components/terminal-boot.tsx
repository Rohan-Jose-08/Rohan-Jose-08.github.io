'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOT_SEQUENCE = [
  '[ OK ] Loaded Kernel',
  '[ OK ] Initialized Memory Manager',
  '[ OK ] Mounted Virtual Filesystem',
  '[ OK ] Started System Logger',
  '[ OK ] Started Networking Service',
  '[ OK ] Established Neural Link',
  '[ OK ] Initializing GUI Subsystem...',
]

export function TerminalBoot() {
  const [lines, setLines] = useState<string[]>([])
  const [complete, setComplete] = useState(false)
  const [unmounted, setUnmounted] = useState(false)

  useEffect(() => {
    const hasBooted = sessionStorage.getItem('has_booted')
    if (hasBooted || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setUnmounted(true)
      return
    }

    let delay = 0
    BOOT_SEQUENCE.forEach((line, i) => {
      delay += Math.random() * 150 + 100 // 100ms - 250ms
      setTimeout(() => {
        setLines((prev) => [...prev, line])
        if (i === BOOT_SEQUENCE.length - 1) {
          setTimeout(() => {
            setComplete(true)
            sessionStorage.setItem('has_booted', 'true')
          }, 600)
        }
      }, delay)
    })
  }, [])

  if (unmounted) return null

  return (
    <AnimatePresence onExitComplete={() => setUnmounted(true)}>
      {!complete && (
        <motion.div
          key="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-end bg-background p-6 font-mono text-xs sm:p-10 sm:text-sm"
        >
          <div className="flex flex-col gap-1.5 text-primary">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <span>{line}</span>
              </motion.div>
            ))}
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="mt-2 h-4 w-2 bg-primary"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
