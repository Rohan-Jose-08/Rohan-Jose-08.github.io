'use client'

import { motion } from 'framer-motion'
import { Box, Cpu, Layers3, Network, Server, Sparkles } from 'lucide-react'
import { SectionHeading, staggerContainer, staggerItem } from '@/components/motion-primitives'
import { Badge } from '@/components/ui/badge'
import { BorderBeam } from '@/components/border-beam'
import { TiltCard } from '@/components/tilt-card'
import { skillDomains } from '@/lib/portfolio-data'

const icons = [Cpu, Layers3, Sparkles, Box, Network, Server]

export function Skills() {
  return (
    <section id="skills" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeading
          eyebrow="05 / Capability map"
          title="Skills organised by engineering domain"
          description="Not a wall of logos — six domains, each backed by shipped repositories."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillDomains.map((domain, i) => {
            const Icon = icons[i % icons.length]
            const proficiency = Math.min(domain.skills.length * 15, 100)
            return (
              <motion.div key={domain.domain} variants={staggerItem}>
                <TiltCard
                  maxTilt={6}
                  scaleOnHover={1.02}
                  className="glass group relative flex flex-col gap-4 overflow-hidden rounded-xl p-6 transition-colors duration-300 h-full"
                >
                  <BorderBeam duration={6} size={200} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-px left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="flex items-center gap-3">
                    <motion.span
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                      whileHover={{ scale: 1.15, rotate: 12 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </motion.span>
                    <div className="flex flex-col">
                      <h3 className="font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary">
                        {domain.domain}
                      </h3>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {domain.blurb}
                      </span>
                    </div>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {domain.skills.map((s) => (
                      <li key={s} className="tooltip-trigger">
                        <Badge
                          variant="secondary"
                          className="press font-mono text-xs hover:border-primary/40 hover:text-primary border border-transparent cursor-default"
                        >
                          {s}
                        </Badge>
                        <span className="tooltip-content">{domain.domain}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Proficiency bar */}
                  <div className="mt-auto pt-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-wider">proficiency</span>
                      <span className="font-mono text-[10px] text-primary/60 tabular-nums">{proficiency}%</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
