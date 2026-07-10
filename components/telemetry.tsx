'use client'

import { motion } from 'framer-motion'
import { Reveal, SectionHeading, staggerContainer, staggerItem } from '@/components/motion-primitives'
import type { GitHubData, ContributionDay } from '@/lib/github'

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
      <div className="flex min-w-[720px] gap-[3px]">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <div
                key={day.date}
                title={`${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
                className={`h-2.5 w-2.5 rounded-[2px] ${LEVEL_CLASSES[Math.min(day.level, 4)]}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function Telemetry({ data }: { data: GitHubData }) {
  const sortedRepos = [...data.repos].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )

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
              {metrics.map((m) => (
                <div key={m.label} className="flex flex-col gap-1 bg-card px-5 py-4">
                  <dt className="font-mono text-[11px] text-muted-foreground">{m.label}</dt>
                  <dd className="text-2xl font-semibold tabular-nums">{m.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Heatmap */}
          <motion.div
            variants={staggerItem}
            className="glass flex flex-col gap-4 rounded-xl p-6 lg:col-span-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
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
          <motion.div variants={staggerItem} className="glass flex flex-col gap-5 rounded-xl p-6 lg:col-span-1">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
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
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className={`h-full rounded-full ${LANGUAGE_COLORS[lang.name] ?? 'bg-primary/40'}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.max(lang.percent, 2)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Repository timeline */}
          <motion.div variants={staggerItem} className="glass flex flex-col gap-5 rounded-xl p-6 lg:col-span-1">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              repo_timeline — technology evolution
            </h3>
            <ol className="relative flex flex-col gap-4 border-l border-border pl-5">
              {sortedRepos.map((repo) => (
                <li key={repo.name} className="relative flex flex-col gap-0.5">
                  <span
                    className="absolute -left-[26px] top-1.5 h-2 w-2 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  <div className="flex items-baseline justify-between gap-3">
                    <a
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer font-mono text-sm text-foreground transition-colors hover:text-primary"
                    >
                      {repo.name}
                    </a>
                    <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                      {new Date(repo.createdAt).toLocaleDateString('en-GB', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {repo.language ?? 'Polyglot'} · last push{' '}
                    {new Date(repo.pushedAt).toLocaleDateString('en-GB', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </li>
              ))}
            </ol>
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
