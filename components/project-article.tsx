import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, GitBranch, Layers, Lightbulb, Telescope } from 'lucide-react'
import { Github } from '@/components/brand-icons'
import { Reveal } from '@/components/motion-primitives'
import { Highlight, themes } from 'prism-react-renderer'
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
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-muted/40">
      <figcaption className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5">
        <span className="truncate font-mono text-xs text-muted-foreground">{label}</span>
        <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-secondary-foreground">
          {language}
        </span>
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
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-28 md:pt-36">
      {/* Header */}
      <Reveal>
        <Link
          href="/#projects"
          className="inline-flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          All projects
        </Link>

        <header className="mt-8 flex flex-col gap-5">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            {project.category} / Deep dive
          </span>
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            {project.title}
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{project.tagline}</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-border py-4">
            <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              {article.readingTime}
            </span>
            {project.metrics ? (
              <span className="font-mono text-xs text-primary">{project.metrics}</span>
            ) : null}
            <div className="ml-auto flex items-center gap-2">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Live demo
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : null}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                Source
              </a>
            </div>
          </div>
        </header>
      </Reveal>

      {/* Intro */}
      <Reveal className="mt-10">
        <p className="text-pretty text-lg leading-relaxed text-foreground/90">{article.intro}</p>
      </Reveal>

      {/* Tech stack */}
      <Reveal className="mt-8">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </Reveal>

      {/* Challenges + Architecture summary */}
      <Reveal className="mt-12">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5">
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
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5">
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <Layers className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Architecture
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">{project.architecture}</p>
          </div>
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
        <section className="rounded-xl border border-primary/20 bg-primary/5 p-6 md:p-8">
          <h2 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            <Lightbulb className="h-4 w-4" aria-hidden="true" />
            What this project taught me
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
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
      </Reveal>

      {/* What's next */}
      <Reveal className="mt-8">
        <section className="rounded-xl border border-border bg-card p-6 md:p-8">
          <h2 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Telescope className="h-4 w-4 text-primary" aria-hidden="true" />
            Where it goes next
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
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
      </Reveal>

      {/* Next project navigation */}
      <Reveal className="mt-16">
        <Link
          href={`/projects/${next.slug}`}
          className="group flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40 md:p-8"
        >
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Next deep dive
            </span>
            <span className="text-xl font-semibold tracking-tight md:text-2xl">{next.title}</span>
            <span className="text-sm text-muted-foreground">{next.tagline}</span>
          </div>
          <ArrowRight
            className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary"
            aria-hidden="true"
          />
        </Link>
      </Reveal>
    </main>
  )
}
