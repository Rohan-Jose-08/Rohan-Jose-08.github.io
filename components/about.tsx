'use client'

import { Reveal, SectionHeading } from '@/components/motion-primitives'
import type { GitHubData } from '@/lib/github'

export function About({ data }: { data: GitHubData }) {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeading eyebrow="01 / About" title="Depth over breadth. Both, ideally." />
      <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
        <Reveal className="flex flex-col gap-6 text-pretty text-lg leading-relaxed text-muted-foreground">
          <p>
            Most engineers pick a layer of the stack and stay there. The repositories on{' '}
            <a
              href={data.profile.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-foreground underline decoration-primary/50 underline-offset-4 transition-colors hover:decoration-primary"
            >
              this GitHub
            </a>{' '}
            tell a different story: an operating system kernel written from scratch in C and
            Assembly, a CUDA ray tracer, a Vulkan renderer, a million bytes of Rust — and a
            cross-platform social product shipping in Dart and TypeScript on top of it all.
          </p>
          <p>
            That range is deliberate. Understanding how a bootloader hands off to a kernel makes
            you a better backend engineer. Writing GPU kernels makes you a better AI engineer.
            Building control systems for competition robots under deadline makes you a better
            engineer, full stop.
          </p>
          <p>
            The current focus: AI-powered developer tooling and impact analysis for large
            codebases — applying systems-level thinking to the problem of understanding software
            at scale.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="glass flex flex-col gap-4 rounded-xl p-6 font-mono text-sm">
            <span className="text-xs uppercase tracking-[0.2em] text-primary">Focus areas</span>
            <ul className="flex flex-col gap-3 text-muted-foreground">
              {[
                'Systems architecture',
                'Graphics programming',
                'Artificial intelligence',
                'Scalable application design',
                'Developer tooling',
                'Full-stack development',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="text-primary" aria-hidden="true">
                    ▸
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
