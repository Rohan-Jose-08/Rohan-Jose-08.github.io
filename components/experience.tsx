'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { SectionHeading, staggerContainer, staggerItem } from '@/components/motion-primitives'
import { Badge } from '@/components/ui/badge'
import { BorderBeam } from '@/components/border-beam'
import { experience } from '@/lib/portfolio-data'

export function Experience() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="04 / Experience"
        title="Impact-driven engineering"
        description="Robotics leadership, aerospace exposure, and hands-on hardware — each one compounding into better software."
      />
        <div className="relative mx-auto mt-12 max-w-3xl">
          {/* Animated timeline line */}
          <motion.div
            className="absolute bottom-0 left-[19px] top-0 w-px bg-gradient-to-b from-transparent via-border to-transparent md:left-1/2 md:-ml-[0.5px]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top' }}
          />
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col gap-12 md:gap-16"
          >
            {experience.map((item, i) => {
              const isEven = i % 2 === 0
              const isExpanded = expanded === i
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

                  {/* Timeline node with pulse when expanded */}
                  <motion.div
                    className="absolute left-[11px] flex h-4 w-4 items-center justify-center rounded-full border border-primary bg-background md:left-1/2 md:-ml-2"
                    animate={{
                      boxShadow: isExpanded
                        ? [
                            '0 0 0px 0px oklch(0.77 0.19 155 / 0)',
                            '0 0 12px 4px oklch(0.77 0.19 155 / 0.5)',
                            '0 0 6px 2px oklch(0.77 0.19 155 / 0.3)',
                          ]
                        : '0 0 10px 2px oklch(0.77 0.19 155 / 0.0)',
                      scale: isExpanded ? 1.3 : 1,
                    }}
                    transition={{
                      boxShadow: isExpanded
                        ? { duration: 1.5, repeat: Infinity, repeatType: 'reverse' }
                        : { duration: 0.3 },
                      scale: { type: 'spring', stiffness: 300, damping: 20 },
                    }}
                    whileHover={{ scale: 1.25, boxShadow: '0 0 10px 2px oklch(0.77 0.19 155 / 0.4)' }}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </motion.div>

                  <div
                    className="surface-panel group/card relative flex w-full cursor-pointer flex-col gap-4 overflow-hidden rounded-2xl p-6 transition-colors duration-300 md:w-1/2 md:p-8"
                    onClick={() => setExpanded(isExpanded ? null : i)}
                  >
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

                    {/* Collapsed: show first highlight only */}
                    {!isExpanded && item.highlights.length > 0 && (
                      <p className="flex gap-2 text-sm text-muted-foreground">
                        <span className="text-primary" aria-hidden="true">▸</span>
                        {item.highlights[0]}
                      </p>
                    )}

                    {/* Expanded: show all highlights */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
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
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((t) => (
                        <motion.span
                          key={t}
                          whileHover={{ scale: 1.08 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        >
                          <Badge
                            variant="outline"
                            className="press font-mono text-[10px] uppercase transition-colors duration-200 hover:border-primary/40 hover:text-primary"
                          >
                            {t}
                          </Badge>
                        </motion.span>
                      ))}
                    </div>

                    {/* Expand indicator */}
                    <div className="flex justify-center">
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <ChevronDown className="h-4 w-4 text-muted-foreground/40" />
                      </motion.div>
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
