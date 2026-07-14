'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, MapPin } from 'lucide-react'
import { Github } from '@/components/brand-icons'
import { NeuralCanvas } from '@/components/neural-canvas'
import { Aurora } from '@/components/aurora'
import BlurText from '@/components/BlurText'
import Magnet from '@/components/Magnet'
import { CountUp } from '@/components/count-up'
import { TextScramble } from '@/components/text-scramble'
import { ShimmerButton } from '@/components/shimmer-button'
import { InteractiveTerminal } from '@/components/interactive-terminal'
import type { GitHubData } from '@/lib/github'

const easeOut = [0.16, 1, 0.3, 1] as const

interface HeroStat {
  label: string
  value: number
  suffix?: string
  format?: (n: number) => string
}

export function Hero({ data }: { data: GitHubData }) {
  const reduced = useReducedMotion()
  const topLanguages = data.languages
    .slice(0, 4)
    .map((l) => l.name)
    .join(' · ')

  const stats: HeroStat[] = [
    { label: 'Contributions (12 mo)', value: data.totalContributions },
    { label: 'Public repositories', value: data.profile.publicRepos },
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
    <section id="top" className="relative flex min-h-dvh flex-col justify-center overflow-hidden">
      <NeuralCanvas />
      <Aurora />
      <div
        aria-hidden="true"
        className="grid-bg grid-bg-drift pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pt-28 pb-16">
        <motion.div {...fade(0)} className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <span className="relative inline-flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span>
            <span className="text-primary">$</span> currently_building ={' '}
            <TextScramble text="systems, renderers, and AI tooling" />_
          </span>
        </motion.div>

        <div className="flex flex-col gap-6">
          <BlurText
            text={`${data.profile.name}.`}
            animateBy="words"
            direction="top"
            delay={80}
            stepDuration={0.2}
            className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
            animationFrom={{ filter: 'blur(6px)', opacity: 0, y: -12 }}
            animationTo={[
              { filter: 'blur(2px)', opacity: 0.7, y: -2 },
              { filter: 'blur(0px)', opacity: 1, y: 0 },
            ]}
            easing="easeOut"
            threshold={0.4}
          />

          <BlurText
            text="Engineering from bare metal to AI."
            animateBy="words"
            direction="top"
            delay={100}
            stepDuration={0.18}
            className="text-gradient text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
            animationFrom={{ filter: 'blur(6px)', opacity: 0, y: -10 }}
            animationTo={[
              { filter: 'blur(1.5px)', opacity: 0.6, y: -1 },
              { filter: 'blur(0px)', opacity: 1, y: 0 },
            ]}
            easing="easeOut"
            threshold={0.4}
          />

          <motion.p {...fade(0.2)} className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Software Engineer <span className="text-foreground">|</span> Systems Programmer{' '}
            <span className="text-foreground">|</span> AI Builder — writing operating systems in C,
            renderers in CUDA and Vulkan, and full-stack products in TypeScript.
          </motion.p>

          <motion.div {...fade(0.25)} className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            <span>United Kingdom</span>
            <span aria-hidden="true">·</span>
            <span>{topLanguages}</span>
          </motion.div>

          <motion.div {...fade(0.3)} className="flex flex-wrap items-center gap-4">
            <Magnet magnetStrength={6} padding={16} activeTransition="transform 0.12s ease-out" inactiveTransition="transform 0.25s ease-in-out">
              <ShimmerButton href="#projects" ariaLabel="Jump to projects">
                View projects
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-y-0.5" aria-hidden="true" />
              </ShimmerButton>
            </Magnet>
            <Magnet magnetStrength={6} padding={16} activeTransition="transform 0.12s ease-out" inactiveTransition="transform 0.25s ease-in-out">
              <a
                href={data.profile.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-[1.02] hover:border-primary/40 hover:bg-secondary active:scale-[0.98]"
              >
                <Github className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
                GitHub
              </a>
            </Magnet>
          </motion.div>
        </div>

        <motion.dl
          {...fade(0.4)}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="group/stat relative flex flex-col gap-1 bg-card px-5 py-4 transition-colors duration-300 hover:bg-secondary/40"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transition-transform duration-500 group-hover/stat:scale-x-100"
              />
              <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {s.label}
              </dt>
              <dd className="text-2xl font-semibold tabular-nums text-foreground">
                <CountUp value={s.value} />
                {s.suffix ? <span className="text-primary">{s.suffix}</span> : null}
              </dd>
            </div>
          ))}
        </motion.dl>

        <InteractiveTerminal />
      </div>
    </section>
  )
}
