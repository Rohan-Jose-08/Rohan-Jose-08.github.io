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

export function Hero({ data }: { data: GitHubData }) {
  const reduced = useReducedMotion()
  const topLanguages = data.languages.slice(0, 4).map((language) => language.name).join(' / ')
  const stats = [
    { label: 'Contributions', value: data.totalContributions, note: 'last 12 months' },
    { label: 'Repositories', value: data.profile.publicRepos, note: 'public builds' },
    { label: 'Longest streak', value: data.longestStreak, suffix: 'd', note: 'daily activity' },
    { label: 'Languages', value: data.languages.length, note: 'across source' },
  ]

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: easeOut },
        }

  return (
    <section id="top" className="relative flex min-h-dvh items-center overflow-hidden pt-24">
      <NeuralCanvas />
      <div className="hero-halo pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
        <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <motion.div {...fade(0)} className="eyebrow w-fit">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Available for select opportunities
            </motion.div>

            <div className="flex flex-col gap-4">
              <BlurText
                text={data.profile.name}
                animateBy="words"
                direction="top"
                delay={70}
                stepDuration={0.2}
                className="text-balance text-6xl font-semibold leading-none tracking-[-0.055em] sm:text-7xl md:text-8xl"
                animationFrom={{ filter: 'blur(6px)', opacity: 0, y: -12 }}
                animationTo={[{ filter: 'blur(0px)', opacity: 1, y: 0 }]}
                easing="easeOut"
                threshold={0.4}
              />
              <BlurText
                text="I engineer close to the machine."
                animateBy="words"
                direction="top"
                delay={85}
                stepDuration={0.16}
                className="max-w-3xl text-balance text-3xl font-medium leading-tight tracking-tight text-muted-foreground sm:text-4xl md:text-5xl"
                animationFrom={{ filter: 'blur(5px)', opacity: 0, y: -8 }}
                animationTo={[{ filter: 'blur(0px)', opacity: 1, y: 0 }]}
                easing="easeOut"
                threshold={0.4}
              />
            </div>

            <motion.p {...fade(0.18)} className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Systems programmer and AI builder creating operating systems, GPU renderers, and thoughtful full-stack products—from first principles to production.
            </motion.p>

            <motion.div {...fade(0.24)} className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
              <span className="flex items-center gap-2"><MapPin aria-hidden="true" />United Kingdom</span>
              <span className="hidden h-3 w-px bg-border sm:block" aria-hidden="true" />
              <span>{topLanguages}</span>
            </motion.div>

            <motion.div {...fade(0.3)} className="flex flex-wrap items-center gap-3">
              <a href="#projects" className="press inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
                Explore selected work
                <ArrowDown aria-hidden="true" />
              </a>
              <a href={data.profile.htmlUrl} target="_blank" rel="noopener noreferrer" className="press inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40">
                <Github aria-hidden="true" />
                GitHub
                <ArrowUpRight aria-hidden="true" />
              </a>
            </motion.div>
          </div>

          <motion.div {...fade(0.28)} className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4 px-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <span>Live engineering profile</span>
              <span className="text-primary"><TextScramble text="systems online" /></span>
            </div>
            <InteractiveTerminal />
          </motion.div>
        </div>

        <motion.dl {...fade(0.4)} className="mt-14 grid grid-cols-2 border-y border-border md:mt-20 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`flex flex-col gap-1 py-5 ${index % 2 ? 'pl-5' : 'pr-5'} md:border-l md:px-6 md:first:border-l-0`}>
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{stat.label}</dt>
              <dd className="text-2xl font-semibold tabular-nums sm:text-3xl">
                <CountUp value={stat.value} />{stat.suffix ? <span className="text-primary">{stat.suffix}</span> : null}
              </dd>
              <span className="text-xs text-muted-foreground">{stat.note}</span>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
