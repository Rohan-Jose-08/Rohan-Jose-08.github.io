'use client'

import { motion } from 'framer-motion'
import { SectionHeading, Reveal } from '@/components/motion-primitives'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { principles } from '@/lib/portfolio-data'

export function Philosophy() {
  return (
    <section id="philosophy" className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="06 / Engineering philosophy"
        title="Principles the code is written by"
        description="Six commitments that show up in every commit — from kernel interrupts to React components."
      />
      <Reveal>
        <Accordion className="w-full flex flex-col gap-4">
          {principles.map((p, i) => (
            <AccordionItem
              key={p.title}
              value={`item-${i}`}
              className="border border-border bg-card rounded-xl px-6 transition-all duration-300 hover:border-primary/40 data-[state=open]:border-primary/40"
            >
              <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-4 text-left">
                  <span className="font-mono text-xs tabular-nums text-primary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-semibold tracking-tight text-lg group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground pl-[34px]">
                  {p.body}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}
