'use client'

import { motion } from 'framer-motion'
import { SectionHeading, staggerContainer, staggerItem } from '@/components/motion-primitives'
import { Badge } from '@/components/ui/badge'
import { experience } from '@/lib/portfolio-data'

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="04 / Experience"
        title="Impact-driven engineering"
        description="Robotics leadership, aerospace exposure, and hands-on hardware — each one compounding into better software."
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="grid gap-6 md:grid-cols-2"
      >
        {experience.map((item, i) => (
          <motion.article
            key={item.role + item.org}
            variants={staggerItem}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/40 md:p-8"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                <span className="font-mono text-[10px] text-muted-foreground/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.period}
              </span>
              <h3 className="text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary">
                {item.role}
              </h3>
              <p className="text-sm text-muted-foreground">{item.org}</p>
            </div>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              {item.summary}
            </p>
            <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
              {item.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="text-primary" aria-hidden="true">
                    ▸
                  </span>
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              {item.tags.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="font-mono text-[11px] transition-colors duration-200 hover:border-primary/40 hover:text-primary"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
