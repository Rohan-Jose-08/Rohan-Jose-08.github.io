'use client'

import { motion } from 'framer-motion'
import { SectionHeading, staggerContainer, staggerItem } from '@/components/motion-primitives'
import { principles } from '@/lib/portfolio-data'

export function Philosophy() {
  return (
    <section id="philosophy" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="06 / Engineering philosophy"
        title="Principles the code is written by"
        description="Six commitments that show up in every commit — from kernel interrupts to React components."
      />
      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
      >
        {principles.map((p, i) => (
          <motion.li
            key={p.title}
            variants={staggerItem}
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="group relative flex flex-col gap-3 overflow-hidden bg-card p-6 transition-colors duration-300 hover:bg-secondary/60 md:p-8"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transition-transform duration-500 group-hover:scale-x-100"
            />
            <span className="font-mono text-xs tabular-nums text-primary transition-transform duration-300 group-hover:scale-110">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary">
              {p.title}
            </h3>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  )
}
