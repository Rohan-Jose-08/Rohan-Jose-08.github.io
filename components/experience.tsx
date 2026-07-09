'use client'

import { motion } from 'framer-motion'
import { SectionHeading, staggerContainer, staggerItem } from '@/components/motion-primitives'
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
        {experience.map((item) => (
          <motion.article
            key={item.role + item.org}
            variants={staggerItem}
            className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/40 md:p-8"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                {item.period}
              </span>
              <h3 className="text-lg font-semibold tracking-tight">{item.role}</h3>
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
                <span
                  key={t}
                  className="rounded-md border border-border bg-secondary px-2 py-0.5 font-mono text-[11px] text-secondary-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
