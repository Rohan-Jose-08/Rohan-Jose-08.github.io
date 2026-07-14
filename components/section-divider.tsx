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
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      {label ? (
        <span className="px-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
          {label}
        </span>
      ) : null}
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
    </motion.div>
  )
}
