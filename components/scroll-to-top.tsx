'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import Magnet from '@/components/Magnet'

export function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Magnet magnetStrength={4} padding={20} activeTransition="transform 0.12s ease-out" inactiveTransition="transform 0.25s ease-in-out">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="glass group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-border shadow-lg transition-all duration-200 hover:scale-110 hover:border-primary/50 hover:shadow-[0_0_20px_4px_oklch(0.77_0.19_155/0.2)] active:scale-95"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-primary" />
            </button>
          </Magnet>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
