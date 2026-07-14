'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { SectionHeading, Reveal } from '@/components/motion-primitives'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { principles } from '@/lib/portfolio-data'

const quotes = [
  "Complexity is a cost. We pay it only when it buys us capabilities we can't afford to lose.",
  "Good systems fail predictably. Great systems don't let you reach the failure state.",
  "Write code that is easy to delete, not easy to extend.",
  "The best optimization is to not do the work at all."
]

export function Philosophy() {
  const { scrollYProgress } = useScroll()
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100])
  
  const [quoteIndex, setQuoteIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % quotes.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="philosophy" className="relative mx-auto w-full overflow-hidden border-y border-border bg-card/20 px-6 py-24 md:py-32">
      <motion.div 
        style={{ y: yParallax }} 
        className="absolute inset-0 pointer-events-none opacity-[0.03] text-primary flex items-center justify-center mix-blend-screen"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        >
          <svg width="800" height="800" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L100 50L50 100L0 50L50 0Z" stroke="currentColor" strokeWidth="0.5"/>
            <path d="M50 10L90 50L50 90L10 50L50 10Z" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5"/>
          </svg>
        </motion.div>
      </motion.div>

      <div className="mx-auto max-w-4xl relative z-10">
        <SectionHeading
          eyebrow="06 / Engineering philosophy"
          title="Principles the code is written by"
          description="Six commitments that show up in every commit — from kernel interrupts to React components."
        />
        
        {/* Rotating quote */}
        <div className="mb-12 h-20 flex items-center justify-center italic text-muted-foreground/80 font-serif text-lg md:text-xl text-center px-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.8 }}
            >
              "{quotes[quoteIndex]}"
            </motion.p>
          </AnimatePresence>
        </div>

        <Reveal>
          <Accordion className="w-full flex flex-col gap-4">
            {principles.map((p, i) => (
              <AccordionItem
                key={p.title}
                value={`item-${i}`}
                className="border border-border bg-card/80 backdrop-blur-sm rounded-xl px-6 transition-all duration-300 hover:border-primary/40 data-[state=open]:border-primary/40 hover-lift"
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
      </div>
    </section>
  )
}
