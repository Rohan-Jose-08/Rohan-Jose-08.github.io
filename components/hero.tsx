'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import { Github } from '@/components/brand-icons'
import { NeuralCanvas } from '@/components/neural-canvas'
import BlurText from '@/components/BlurText'
import { CountUp } from '@/components/count-up'
import { TextScramble } from '@/components/text-scramble'
import { InteractiveTerminal } from '@/components/interactive-terminal'
import type { GitHubData } from '@/lib/github'

const easeOut = [0.16, 1, 0.3, 1] as const

interface HeroStat {
  label: string
  value: number
  suffix?: string
}

export function Hero({ data }: { data: GitHubData }) {
  const reduced = useReducedMotion()
  const topLanguages = data.languages.slice(0, 4).map((language) => language.name).join(' · ')
  const stats: HeroStat[] = [
    { label: 'Contributions', value: data.totalContributions },
    { label: 'Repositories', value: data.profile.publicRepos },
    { label: 'Longest streak', value: data.longestStreak, suffix: 'd' },
    { label: 'Languages', value: data.languages.length },
  ]

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: easeOut },
        }

  return (
    <section id="top" className="relative flex min-h-dvh items-center overflow-hidden pt-24">
      <NeuralCanvas />
      <div className="relative mx-auto w-full max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] lg:gap-14">
          <div className="flex min-w-0 flex-col gap-8">
            <motion.div {...fade(0)} className="flex flex-wrap items-center gap-3">
              <span className="technical-label rounded-full border border-primary/20 bg-primary/10 px-3 py-2">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Available for opportunities
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">SYS_VER 4.1.0</span>
            </motion.div>

            <div className="flex flex-col gap-5">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Software engineer / systems programmer
              </p>
              <div className="flex flex-col gap-1">
                <BlurText
                  text={`${data.profile.name}.`}
                  animateBy="words"
                  direction="top"
                  delay={80}
                  stepDuration={0.2}
                  className="text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl xl:text-7xl"
                  animationFrom={{ filter: 'blur(6px)', opacity: 0, y: -12 }}
                  animationTo={[{ filter: 'blur(2px)', opacity: 0.7, y: -2 }, { filter: 'blur(0px)', opacity: 1, y: 0 }]}
                  easing="easeOut"
                  threshold={0.4}
                />
                <BlurText
                  text="Engineering from bare metal to AI."
                  animateBy="words"
                  direction="top"
                  delay={90}
                  stepDuration={0.16}
                  className="text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-muted-foreground sm:text-6xl xl:text-7xl"
                  animationFrom={{ filter: 'blur(6px)', opacity: 0, y: -10 }}
                  animationTo={[{ filter: 'blur(1.5px)', opacity: 0.6, y: -1 }, { filter: 'blur(0px)', opacity: 1, y: 0 }]}
                  easing="easeOut"
                  threshold={0.4}
                />
              </div>
              <motion.p {...fade(0.2)} className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Writing operating systems in C, renderers in CUDA and Vulkan, and full-stack products in TypeScript.
              </motion.p>
            </div>

            <motion.div {...fade(0.25)} className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />United Kingdom</span>
              <span aria-hidden="true" className="hidden h-3 w-px bg-border sm:block" />
              <span><TextScramble text={topLanguages} />_</span>
            </motion.div>

            <motion.div {...fade(0.3)} className="flex flex-wrap items-center gap-3">
              <a href="#projects" className="group inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0">
                View selected work
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
              <a href={data.profile.htmlUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-border bg-card/70 px-5 text-sm font-medium transition-colors hover:border-primary/35 hover:bg-secondary">
                <Github className="h-4 w-4" aria-hidden="true" />GitHub<ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
              </a>
            </motion.div>
          </div>

          <motion.div {...fade(0.25)} className="min-w-0">
            <div className="mb-3 flex items-center justify-between px-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>Interactive environment</span>
              <span className="text-primary">Online</span>
            </div>
            <InteractiveTerminal />
          </motion.div>
        </div>

        <motion.dl {...fade(0.4)} className="mt-12 grid grid-cols-2 overflow-hidden rounded-2xl border border-border bg-border lg:mt-16 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex min-h-28 flex-col justify-between border-border bg-card/95 p-5 even:border-l lg:border-l first:lg:border-l-0">
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{stat.label}</dt>
              <dd className="mt-4 text-3xl font-semibold tracking-tight tabular-nums">
                <CountUp value={stat.value} />{stat.suffix ? <span className="text-primary">{stat.suffix}</span> : null}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
