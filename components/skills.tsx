'use client'

import { motion } from 'framer-motion'
import { Box, Cpu, Layers3, Network, Server, Sparkles } from 'lucide-react'
import { SectionHeading, staggerContainer, staggerItem } from '@/components/motion-primitives'
import { Badge } from '@/components/ui/badge'
import { BorderBeam } from '@/components/border-beam'
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
            return (
              <motion.div
                key={domain.domain}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="glass group relative flex flex-col gap-4 overflow-hidden rounded-xl p-6 transition-colors duration-300"
              >
                <BorderBeam duration={6} size={200} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-px left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
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
                    <li key={s} className="transition-all duration-200 hover:-translate-y-0.5">
                      <Badge variant="secondary" className="font-mono text-xs hover:border-primary/40 hover:text-primary border border-transparent">
                        {s}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
