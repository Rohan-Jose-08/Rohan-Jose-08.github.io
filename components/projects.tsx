'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, CalendarDays, GitBranch, Layers, ShieldCheck } from 'lucide-react'
import { Github } from '@/components/brand-icons'
import { Reveal, SectionHeading, staggerContainer, staggerItem } from '@/components/motion-primitives'
import { TiltCard } from '@/components/tilt-card'
import Magnet from '@/components/Magnet'
import { Badge } from '@/components/ui/badge'
import { featuredProjects, type FeaturedProject } from '@/lib/portfolio-data'
import { BorderBeam } from '@/components/border-beam'
import type { GitHubRepo } from '@/lib/github'

const categories = ['All', 'Systems', 'Graphics', 'AI', 'Full-Stack', 'Robotics'] as const

function ProjectCard({
  project,
  repo,
}: {
  project: FeaturedProject
  repo?: GitHubRepo
}) {
  const githubUrl = repo?.htmlUrl ?? `https://github.com/Rohan-Jose-08/${project.repo ?? ''}`
  const updatedAt = repo
    ? new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' }).format(new Date(repo.pushedAt))
    : null
  return (
    <TiltCard className="rounded-xl block" maxTilt={4} scaleOnHover={1.008}>
      <motion.article
        variants={staggerItem}
        className="group relative flex flex-col gap-5 overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 md:p-8"
      >
        <BorderBeam duration={8} size={300} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-primary/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`Read the full deep dive on ${project.title}`}
          className="absolute inset-0 z-10 cursor-pointer rounded-xl"
        >
          <span className="sr-only">Read the full deep dive on {project.title}</span>
        </Link>

        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em]">
              <span className="text-primary">{project.category}</span>
              <span className="text-muted-foreground">/</span>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                Code reviewed
              </span>
            </div>
            <h3 className="text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary md:text-2xl">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground">{project.tagline}</p>
          </div>
          <div className="pointer-events-auto relative z-20 flex items-center gap-2">
            {project.liveUrl ? (
              <Magnet magnetStrength={5} padding={10} activeTransition="transform 0.12s ease-out" inactiveTransition="transform 0.25s ease-in-out">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Live demo of ${project.title}`}
                  className="glass cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Magnet>
            ) : null}
            <Magnet magnetStrength={5} padding={10} activeTransition="transform 0.12s ease-out" inactiveTransition="transform 0.25s ease-in-out">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="glass cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
            </Magnet>
          </div>
        </div>

        <p className="text-pretty leading-relaxed text-muted-foreground">{project.description}</p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-lg bg-muted/50 p-4">
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <GitBranch className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Challenges solved
            </span>
            <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
              {project.challenges.map((c) => (
                <li key={c} className="flex gap-2">
                  <span className="text-primary" aria-hidden="true">
                    —
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2 rounded-lg bg-muted/50 p-4">
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <Layers className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Architecture
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">{project.architecture}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-border/60 pt-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge key={t} variant="secondary" className="press hover-lift font-mono text-xs">
                  {t}
                </Badge>
              ))}
            </div>
            {project.metrics ? <span className="font-mono text-xs text-primary">{project.metrics}</span> : null}
          </div>
          <div className="flex flex-col items-end gap-2">
            {updatedAt ? (
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                Updated {updatedAt}
              </span>
            ) : null}
            <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors duration-300 group-hover:text-primary">
              Read the deep dive
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </div>
        </div>
      </motion.article>
    </TiltCard>
  )
}

export function Projects({ repos }: { repos: GitHubRepo[] }) {
  const [filter, setFilter] = useState<(typeof categories)[number]>('All')
  const repoMap = useMemo(() => new Map(repos.map((r) => [r.name, r])), [repos])
  const visible = featuredProjects.filter((p) => filter === 'All' || p.category === filter)
  const countFor = (category: (typeof categories)[number]) =>
    category === 'All' ? featuredProjects.length : featuredProjects.filter((project) => project.category === category).length

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="02 / Featured work"
        title="Projects built from first principles"
        description="A curated set of 11 public repositories. Every deep dive is grounded in the implementation, file structure, and documentation visible in source."
      />
      <Reveal className="mb-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p aria-live="polite" className="font-mono text-xs text-muted-foreground">
            Showing <span className="text-foreground">{visible.length}</span> of {featuredProjects.length} projects
          </p>
          <span className="hidden items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground sm:flex">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            Source-backed case studies
          </span>
        </div>
        <div aria-label="Filter projects by category" className="flex flex-wrap gap-2 rounded-xl border border-border bg-card/40 p-1">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className="press relative rounded-lg px-3 py-2 font-mono text-xs text-muted-foreground transition-colors duration-200 hover:text-foreground cursor-pointer sm:px-4"
            >
              {filter === c && (
                <motion.span
                  layoutId="active-project-filter"
                  className="absolute inset-0 rounded-lg bg-primary"
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                />
              )}
              <span className={`relative z-10 inline-flex items-center gap-1.5 ${filter === c ? 'text-primary-foreground' : ''}`}>
                {c}
                <span className={filter === c ? 'text-primary-foreground/70' : 'text-muted-foreground/60'}>{countFor(c)}</span>
              </span>
            </button>
          ))}
        </div>
      </Reveal>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="flex flex-col gap-6"
        key={filter}
      >
        {visible.length > 0 ? (
          visible.map((p) => (
            <ProjectCard key={p.title} project={p} repo={p.repo ? repoMap.get(p.repo) : undefined} />
          ))
        ) : (
          <p className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
            No projects in this category yet — more shipping soon.
          </p>
        )}
      </motion.div>
    </section>
  )
}
