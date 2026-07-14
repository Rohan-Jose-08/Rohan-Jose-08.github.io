'use client'

import { Reveal, SectionHeading } from '@/components/motion-primitives'
import { TextScramble } from '@/components/text-scramble'
import { TiltCard } from '@/components/tilt-card'
import type { GitHubData } from '@/lib/github'

export function About({ data }: { data: GitHubData }) {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeading eyebrow="01 / About" title="Depth over breadth. Both, ideally." />
      <div className="grid gap-12 md:grid-cols-[2fr_1fr] items-stretch">
        <Reveal className="flex flex-col gap-6 text-pretty text-lg leading-relaxed text-muted-foreground">
          <p>
            Most engineers pick a layer of the stack and stay there. The repositories on{' '}
            <a
              href={data.profile.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-foreground underline-draw font-medium"
            >
              this GitHub
            </a>{' '}
            tell a different story: an <span className="tooltip-trigger underline-draw text-foreground cursor-default">operating system kernel<span className="tooltip-content">View the rj-os project</span></span> written from scratch in C and
            Assembly, a <span className="tooltip-trigger underline-draw text-foreground cursor-default">CUDA ray tracer<span className="tooltip-content">View the renderer project</span></span>, a Vulkan renderer, a million bytes of Rust — and a
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
        <Reveal delay={0.15} className="h-full">
          <TiltCard as="div" maxTilt={4} scaleOnHover={1.02} className="h-full">
            <div className="glass flex flex-col gap-4 rounded-xl p-6 font-mono text-sm relative overflow-hidden group h-full">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transition-transform duration-500 group-hover:scale-x-100"
              />
              <span className="text-xs uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                <TextScramble text="Focus areas" />
              </span>
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
          </TiltCard>
        </Reveal>
      </div>
    </section>
  )
}
