'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, MapPin } from 'lucide-react'
import { Github } from '@/components/brand-icons'
import { NeuralCanvas } from '@/components/neural-canvas'
import BlurText from '@/components/BlurText'
import Magnet from '@/components/Magnet'
import type { GitHubData } from '@/lib/github'

const easeOut = [0.16, 1, 0.3, 1] as const

interface HeroStat {
  label: string
  value: string
}

export function Hero({ data }: { data: GitHubData }) {
  const reduced = useReducedMotion()
  const topLanguages = data.languages
    .slice(0, 4)
    .map((l) => l.name)
    .join(' · ')

  const stats: HeroStat[] = [
    { label: 'Contributions (12 mo)', value: String(data.totalContributions) },
    { label: 'Public repositories', value: String(data.profile.publicRepos) },
    { label: 'Longest streak', value: `${data.longestStreak}d` },
    { label: 'Languages', value: String(data.languages.length) },
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pt-28 pb-16">
        <motion.div {...fade(0)} className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <span className="inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
          <span>Currently building: systems, renderers, and AI tooling</span>
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
            <Magnet magnetStrength={3} padding={30} activeTransition="transform 0.15s ease-out" inactiveTransition="transform 0.3s ease-in-out">
              <a
                href="#projects"
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                View projects
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </Magnet>
            <Magnet magnetStrength={3} padding={30} activeTransition="transform 0.15s ease-out" inactiveTransition="transform 0.3s ease-in-out">
              <a
                href={data.profile.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-200 hover:bg-secondary"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
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
            <div key={s.label} className="flex flex-col gap-1 bg-card px-5 py-4">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {s.label}
              </dt>
              <dd className="text-2xl font-semibold tabular-nums text-foreground">{s.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
