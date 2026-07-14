'use client'

import { motion, useReducedMotion } from 'framer-motion'

export function SectionDivider({ label }: { label?: string }) {
  const reduced = useReducedMotion()
  if (reduced) {
    return (
      <div
        aria-hidden="true"
        className="mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-border to-transparent"
      />
    )
  }
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-2"
    >
      {/* Left line draws from center */}
      <motion.div
        className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'right' }}
      />

      {/* Center decoration */}
      <motion.span
        className="relative mx-3 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="absolute inset-0 rounded-full bg-primary/10 blur-md animate-pulse" />
        {label ? (
          <motion.span
            className="relative px-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 1, 0.6, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7, times: [0, 0.3, 0.6, 1] }}
          >
            {label}
          </motion.span>
        ) : (
          <span className="relative font-mono text-[11px] text-primary/50">&lt;/&gt;</span>
        )}
      </motion.span>

      {/* Right line draws from center */}
      <motion.div
        className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left' }}
      />
    </motion.div>
  )
}
