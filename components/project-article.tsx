'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, GitBranch, Layers, Lightbulb, Telescope, Copy, Check } from 'lucide-react'
import { Github } from '@/components/brand-icons'
import { Reveal } from '@/components/motion-primitives'
import { Highlight, themes } from 'prism-react-renderer'
import { ScrollProgress } from '@/components/scroll-progress'
import { TiltCard } from '@/components/tilt-card'
import Magnet from '@/components/Magnet'
import { BorderBeam } from '@/components/border-beam'
import type { FeaturedProject } from '@/lib/portfolio-data'
import type { ProjectArticle } from '@/lib/project-articles'
import { GITHUB_USERNAME } from '@/lib/github'

const LANGUAGE_MAP: Record<string, string> = {
  asm: 'c',
  c: 'c',
  typescript: 'typescript',
  cuda: 'cpp',
  cpp: 'cpp',
  rust: 'rust',
}

function CodeBlock({ language, label, snippet }: { language: string; label: string; snippet: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(snippet.trim())
      setCopied(true)
    } catch (err) {
      console.error('Failed to copy code: ', err)
    }
  }, [snippet])

  return (
    <figure className="group relative overflow-hidden rounded-xl border border-border bg-muted/40 transition-colors duration-300 hover:border-primary/30">
      <figcaption className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5 bg-card/50">
        <span className="truncate font-mono text-xs text-muted-foreground">{label}</span>
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-secondary-foreground">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
            aria-label="Copy code snippet"
          >
            {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
          </button>
        </div>
      </figcaption>
      <Highlight theme={themes.nightOwl} code={snippet.trim()} language={LANGUAGE_MAP[language] ?? 'c'}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed" style={{ backgroundColor: 'transparent' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="table-row">
                <span className="table-cell select-none pr-4 text-right text-muted-foreground/40">{i + 1}</span>
                <span className="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </figure>
  )
}

export function ProjectArticleView({
  project,
  article,
  next,
}: {
  project: FeaturedProject
  article: ProjectArticle
  next: FeaturedProject
}) {
  const githubUrl = project.repo
    ? `https://github.com/${GITHUB_USERNAME}/${project.repo}`
    : `https://github.com/${GITHUB_USERNAME}`

  return (
    <>
      <ScrollProgress className="top-[64px]" />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-28 md:pt-36">
        {/* Header */}
        <Reveal>
          <Link
            href="/#projects"
            className="group inline-flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-all duration-300 hover:-translate-x-1 hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300" aria-hidden="true" />
            <span className="underline-draw">All projects</span>
          </Link>

          <header className="relative mt-8 flex flex-col gap-5">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[80px]"
            />
            <span className="relative z-10 font-mono text-xs uppercase tracking-[0.25em] text-primary">
              {project.category} / Deep dive
            </span>
            <h1 className="relative z-10 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              {project.title}
            </h1>
            <p className="relative z-10 text-pretty text-lg leading-relaxed text-muted-foreground">{project.tagline}</p>

            <div className="relative z-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-border py-4">
              <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                {article.readingTime}
              </span>
              {project.metrics ? (
                <span className="font-mono text-xs text-primary">{project.metrics}</span>
              ) : null}
              <div className="ml-auto flex items-center gap-2">
                {project.liveUrl ? (
                  <Magnet magnetStrength={4} padding={8} activeTransition="transform 0.12s ease-out" inactiveTransition="transform 0.25s ease-in-out">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass press hover-glow inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Live demo
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </Magnet>
                ) : null}
                <Magnet magnetStrength={4} padding={8} activeTransition="transform 0.12s ease-out" inactiveTransition="transform 0.25s ease-in-out">
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass press hover-glow inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Github className="h-3.5 w-3.5" aria-hidden="true" />
                    Source
                  </a>
                </Magnet>
              </div>
            </div>
          </header>
        </Reveal>

        {/* Intro */}
        <Reveal className="mt-10" delay={0.1}>
          <p className="text-pretty text-lg leading-relaxed text-foreground/90">{article.intro}</p>
        </Reveal>

        {/* Tech stack */}
        <Reveal className="mt-8" delay={0.15}>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="hover-lift press rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary cursor-default"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Challenges + Architecture summary */}
        <Reveal className="mt-12" delay={0.2}>
          <div className="grid gap-4 md:grid-cols-2">
            <TiltCard maxTilt={3} scaleOnHover={1.01} className="h-full">
              <div className="flex h-full flex-col gap-2 rounded-xl border border-border bg-card p-5 transition-colors duration-300 hover:border-primary/30">
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <GitBranch className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  Challenges solved
                </span>
                <ul className="flex flex-col gap-1.5 text-sm leading-relaxed text-muted-foreground">
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
            </TiltCard>
            <TiltCard maxTilt={3} scaleOnHover={1.01} className="h-full">
              <div className="flex h-full flex-col gap-2 rounded-xl border border-border bg-card p-5 transition-colors duration-300 hover:border-primary/30">
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <Layers className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  Architecture
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">{project.architecture}</p>
              </div>
            </TiltCard>
          </div>
        </Reveal>

        {/* Article sections */}
        <div className="mt-16 flex flex-col gap-14">
          {article.sections.map((section, i) => (
            <Reveal key={section.heading}>
              <section className="flex flex-col gap-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-primary" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                    {section.heading}
                  </h2>
                </div>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="text-pretty leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
                {section.code ? <CodeBlock {...section.code} /> : null}
                {section.bullets ? (
                  <ul className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="text-primary" aria-hidden="true">
                          —
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            </Reveal>
          ))}
        </div>

        {/* Lessons learned */}
        <Reveal className="mt-16">
          <TiltCard maxTilt={2} scaleOnHover={1.005}>
            <section className="group relative overflow-hidden rounded-xl border border-primary/20 bg-primary/5 p-6 md:p-8">
              <BorderBeam duration={8} size={250} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <h2 className="relative z-10 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                <Lightbulb className="h-4 w-4" aria-hidden="true" />
                What this project taught me
              </h2>
              <ul className="relative z-10 mt-5 flex flex-col gap-3">
                {article.lessons.map((l) => (
                  <li key={l} className="flex gap-3 leading-relaxed text-foreground/90">
                    <span className="text-primary" aria-hidden="true">
                      →
                    </span>
                    {l}
                  </li>
                ))}
              </ul>
            </section>
          </TiltCard>
        </Reveal>

        {/* What's next */}
        <Reveal className="mt-8">
          <TiltCard maxTilt={2} scaleOnHover={1.005}>
            <section className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/40 md:p-8">
              <BorderBeam duration={8} size={250} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <h2 className="relative z-10 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">
                <Telescope className="h-4 w-4 text-primary" aria-hidden="true" />
                Where it goes next
              </h2>
              <ul className="relative z-10 mt-5 flex flex-col gap-3">
                {article.future.map((f) => (
                  <li key={f} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="text-primary" aria-hidden="true">
                      —
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          </TiltCard>
        </Reveal>

        {/* Next project navigation */}
        <Reveal className="mt-16">
          <TiltCard maxTilt={3} scaleOnHover={1.02}>
            <Link
              href={`/projects/${next.slug}`}
              className="group flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:bg-secondary/20 md:p-8"
            >
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Next deep dive
                </span>
                <span className="text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary md:text-2xl">
                  {next.title}
                </span>
                <span className="text-sm text-muted-foreground">{next.tagline}</span>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                <ArrowRight
                  className="h-5 w-5 text-primary transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </TiltCard>
        </Reveal>
      </main>
    </>
  )
}
