'use client'

import { motion } from 'framer-motion'
import { SectionHeading, staggerContainer, staggerItem } from '@/components/motion-primitives'
import { Badge } from '@/components/ui/badge'
import { BorderBeam } from '@/components/border-beam'
import { experience } from '@/lib/portfolio-data'

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="04 / Experience"
        title="Impact-driven engineering"
        description="Robotics leadership, aerospace exposure, and hands-on hardware — each one compounding into better software."
      />
        <div className="relative mx-auto mt-12 max-w-3xl">
          <div className="absolute bottom-0 left-[19px] top-0 w-px bg-gradient-to-b from-transparent via-border to-transparent md:left-1/2 md:-ml-[0.5px]" />
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col gap-12 md:gap-16"
          >
            {experience.map((item, i) => {
              const isEven = i % 2 === 0
              return (
                <motion.article
                  key={item.role + item.org}
                  variants={staggerItem}
                  className={`group relative flex flex-col md:flex-row ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } items-start md:items-center gap-8 md:gap-16 pl-12 md:pl-0`}
                >
                  <div
                    className={`hidden w-1/2 md:flex ${isEven ? 'justify-end text-right' : 'justify-start text-left'}`}
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                        {item.period}
                      </span>
                      <h3 className="text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary">
                        {item.role}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.org}</p>
                    </div>
                  </div>

                  <div className="absolute left-[11px] flex h-4 w-4 items-center justify-center rounded-full border border-primary bg-background shadow-[0_0_10px_2px_oklch(0.77_0.19_155/0.0)] transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_10px_2px_oklch(0.77_0.19_155/0.4)] md:left-1/2 md:-ml-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </div>

                  <div className="flex w-full flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-colors duration-300 md:w-1/2 md:p-8 relative overflow-hidden group/card">
                    <BorderBeam duration={8} size={250} className="opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
                    <div className="flex flex-col gap-1 md:hidden">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                        {item.period}
                      </span>
                      <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                        {item.role}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.org}</p>
                    </div>
                    
                    <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                      {item.summary}
                    </p>
                    <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex gap-2">
                          <span className="text-primary" aria-hidden="true">
                            ▸
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="font-mono text-[10px] uppercase transition-colors duration-200 hover:border-primary/40 hover:text-primary"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
    </section>
  )
}
