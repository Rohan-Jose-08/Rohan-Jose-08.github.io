'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, GitBranch, Layers } from 'lucide-react'
import { Github } from '@/components/brand-icons'
import { Reveal, SectionHeading, staggerContainer, staggerItem } from '@/components/motion-primitives'
import GlareHover from '@/components/GlareHover'
import StarBorder from '@/components/StarBorder'
import Magnet from '@/components/Magnet'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { featuredProjects, type FeaturedProject } from '@/lib/portfolio-data'
import type { GitHubRepo } from '@/lib/github'

const categories = ['All', 'Systems', 'Graphics', 'AI', 'Full-Stack', 'Robotics'] as const

function ProjectCard({
  project,
  repo,
}: {
  project: FeaturedProject
  repo?: GitHubRepo
}) {
  const githubUrl = repo?.htmlUrl ?? `https://github.com/Rohan-Jose-08`
  return (
    <StarBorder as="div" color="#a78bfa" speed="10s" thickness={2} className="rounded-xl block">
      <motion.article
        variants={staggerItem}
        className="group relative flex flex-col gap-5 overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:scale-[1.005] md:p-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/5 blur-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-8 left-1/2 h-16 w-3/4 -translate-x-1/2 rounded-full bg-primary/8 blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        />
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`Read the full deep dive on ${project.title}`}
          className="absolute inset-0 z-10 cursor-pointer rounded-xl"
        >
          <span className="sr-only">Read the full deep dive on {project.title}</span>
        </Link>
        <GlareHover width="100%" height="100%" background="transparent" borderRadius="0" borderColor="transparent" glareColor="#ffffff" glareOpacity={0.04} glareSize={300} transitionDuration={800} className="pointer-events-none block h-full">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                {project.category}
              </span>
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

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge key={t} variant="secondary" className="font-mono text-xs">
                  {t}
                </Badge>
              ))}
            </div>
            {project.metrics ? (
              <span className="font-mono text-xs text-primary">{project.metrics}</span>
            ) : null}
          </div>

          <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors duration-300 group-hover:text-primary">
            Read the deep dive
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </GlareHover>
      </motion.article>
    </StarBorder>
  )
}

export function Projects({ repos }: { repos: GitHubRepo[] }) {
  const [filter, setFilter] = useState<(typeof categories)[number]>('All')
  const repoMap = useMemo(() => new Map(repos.map((r) => [r.name, r])), [repos])
  const visible = featuredProjects.filter((p) => filter === 'All' || p.category === filter)

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="02 / Featured work"
        title="Projects built from first principles"
        description="Pulled from live GitHub repositories — kernels, renderers, and products, each documented with the hard problems they solve."
      />
      <Reveal className="mb-10 flex flex-wrap gap-2">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="w-full justify-start">
          <TabsList variant="line" className="bg-card/40 rounded-xl p-1 border border-border flex-wrap h-auto gap-2">
            {categories.map((c) => (
              <TabsTrigger
                key={c}
                value={c}
                className="font-mono text-xs px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:after:hidden rounded-lg hover:text-foreground"
              >
                {c}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
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
