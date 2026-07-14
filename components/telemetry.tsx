'use client'

import { motion } from 'framer-motion'
import { Reveal, SectionHeading, staggerContainer, staggerItem } from '@/components/motion-primitives'
import { CountUp } from '@/components/count-up'
import type { GitHubData, ContributionDay } from '@/lib/github'

const easeOut = [0.16, 1, 0.3, 1] as const

const LEVEL_CLASSES = [
  'bg-muted',
  'bg-primary/30',
  'bg-primary/50',
  'bg-primary/75',
  'bg-primary',
]

const LANGUAGE_COLORS: Record<string, string> = {
  Dart: 'bg-primary',
  C: 'bg-primary/80',
  Rust: 'bg-primary/65',
  TypeScript: 'bg-primary/50',
  'C++': 'bg-primary/40',
  Python: 'bg-primary/30',
  Cuda: 'bg-primary/25',
  Assembly: 'bg-primary/20',
}

function Heatmap({ days }: { days: ContributionDay[] }) {
  // Group into weeks of 7
  const weeks: ContributionDay[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }
  return (
    <div className="overflow-x-auto pb-2" role="img" aria-label="GitHub contribution heatmap for the last year">
      <motion.div
        className="flex min-w-[720px] gap-[3px]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.004 } },
        }}
      >
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <motion.div
                key={day.date}
                title={`${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
                variants={{
                  hidden: { opacity: 0, scale: 0.4 },
                  show: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: easeOut } },
                }}
                className={`h-2.5 w-2.5 rounded-[2px] transition-transform duration-200 hover:scale-[1.8] hover:ring-1 hover:ring-primary/60 cursor-pointer press hover:z-10 relative ${LEVEL_CLASSES[Math.min(day.level, 4)]}`}
                onClick={() => window.open(`https://github.com/Rohan-Jose-08?tab=overview&from=${day.date}&to=${day.date}`, '_blank', 'noopener,noreferrer')}
              />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function Telemetry({ data }: { data: GitHubData }) {
  const sortedRepos = [...data.repos].sort(
    (a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime()
  ).slice(0, 5) // Show top 5 most recently active

  const metrics = [
    { label: 'commits.last_year', value: data.totalContributions },
    { label: 'active_days', value: data.activeDays },
    { label: 'repos.public', value: data.profile.publicRepos },
    { label: 'streak.longest', value: `${data.longestStreak}d` },
  ]

  return (
    <section id="telemetry" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeading
          eyebrow="03 / Engineering telemetry"
          title="Live signals from the GitHub graph"
          description="Contribution cadence, language distribution, and repository evolution — streamed from the GitHub API and rendered as engineering telemetry."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 lg:grid-cols-2 items-start"
        >
          {/* Metrics strip */}
          <motion.div variants={staggerItem} className="lg:col-span-2">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
              {metrics.map((m) => {
                const isNumeric = typeof m.value === 'number'
                return (
                  <div
                    key={m.label}
                    className="group/metric relative flex flex-col gap-1 bg-card px-5 py-4 transition-colors duration-300 hover:bg-secondary/40 press"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transition-transform duration-500 group-hover/metric:scale-x-100"
                    />
                    <dt className="font-mono text-[11px] text-muted-foreground">{m.label}</dt>
                    <dd className="text-2xl font-semibold tabular-nums">
                      {isNumeric ? <CountUp value={m.value as number} /> : m.value}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </motion.div>

          {/* Heatmap */}
          <motion.div
            variants={staggerItem}
            className="glass flex flex-col gap-4 rounded-xl p-6 lg:col-span-2 relative overflow-hidden group"
          >
            <span className="pointer-events-none absolute -top-px left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/60" />
                contribution_matrix — 52w
              </h3>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                <span>less</span>
                {LEVEL_CLASSES.map((c) => (
                  <span key={c} className={`h-2.5 w-2.5 rounded-[2px] ${c}`} aria-hidden="true" />
                ))}
                <span>more</span>
              </div>
            </div>
            <Heatmap days={data.contributions} />
          </motion.div>

          {/* Language distribution */}
          <motion.div variants={staggerItem} className="glass flex flex-col gap-5 rounded-xl p-6 lg:col-span-1 relative group">
            <span className="pointer-events-none absolute -top-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
               <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/60" />
              language_distribution — by bytes
            </h3>
            <ul className="flex flex-col gap-3">
              {data.languages.map((lang) => (
                <li key={lang.name} className="flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between font-mono text-xs">
                    <span className="text-foreground">{lang.name}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {lang.percent.toFixed(1)}%
                    </span>
                  </div>
                  <div className="relative h-1.5 overflow-hidden rounded-full bg-muted tooltip-trigger">
                    <motion.div
                      className={`h-full rounded-full ${LANGUAGE_COLORS[lang.name] ?? 'bg-primary/40'}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.max(lang.percent, 2)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: easeOut }}
                    />
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: '-200%' }}
                      whileInView={{ x: '500%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: 0.6, ease: 'easeInOut' }}
                    />
                    <span className="tooltip-content">{lang.name} codebase analysis</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Repository timeline */}
          <motion.div variants={staggerItem} className="glass flex flex-col gap-5 rounded-xl p-6 lg:col-span-1 relative group">
            <span className="pointer-events-none absolute -top-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
               <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/60 animate-pulse" />
              repo_timeline — recent activity
            </h3>
            <motion.ol
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
              }}
              className="relative flex flex-col gap-4 border-l border-border pl-5"
            >
              {sortedRepos.map((repo) => (
                <motion.li
                  key={repo.name}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeOut } },
                  }}
                  className="group/repo relative flex flex-col gap-0.5 rounded-lg -ml-5 pl-5 py-1.5 pr-2 transition-colors hover:bg-secondary/40"
                >
                  <span
                    className="absolute left-[-4px] top-[14px] h-2 w-2 rounded-full bg-primary transition-transform duration-300 group-hover/repo:scale-150 group-hover/repo:shadow-[0_0_10px_2px_oklch(0.77_0.19_155/0.6)]"
                    aria-hidden="true"
                  />
                  <div className="flex items-baseline justify-between gap-3">
                    <a
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer font-mono text-sm text-foreground transition-colors group-hover/repo:text-primary"
                    >
                      {repo.name}
                    </a>
                    <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                      {new Date(repo.pushedAt).toLocaleDateString('en-GB', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground transition-colors group-hover/repo:text-foreground/80">
                    {repo.language ?? 'Polyglot'}
                  </span>
                </motion.li>
              ))}
            </motion.ol>
          </motion.div>
        </motion.div>

        <Reveal className="mt-6">
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-primary">$</span> data sourced live from api.github.com — cached
            hourly, rendered at request time
          </p>
        </Reveal>
      </div>
    </section>
  )
}
