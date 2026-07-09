'use client'

import { motion } from 'framer-motion'
import { Box, Cpu, Layers3, Network, Server, Sparkles } from 'lucide-react'
import { SectionHeading, staggerContainer, staggerItem } from '@/components/motion-primitives'
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
                className="glass group flex flex-col gap-4 rounded-xl p-6 transition-colors duration-300 hover:border-primary/40"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col">
                    <h3 className="font-semibold tracking-tight">{domain.domain}</h3>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {domain.blurb}
                    </span>
                  </div>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {domain.skills.map((s) => (
                    <li
                      key={s}
                      className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground"
                    >
                      {s}
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
