'use client'

import { FileDown, Mail } from 'lucide-react'
import { Github, Linkedin } from '@/components/brand-icons'
import { Reveal, SectionHeading } from '@/components/motion-primitives'
import { contactLinks, currentlyBuilding } from '@/lib/portfolio-data'

const links = [
  { href: contactLinks.github, label: 'GitHub', icon: Github, external: true },
  { href: contactLinks.linkedin, label: 'LinkedIn', icon: Linkedin, external: true },
  { href: contactLinks.email, label: 'Email', icon: Mail, external: false },
  { href: contactLinks.resume, label: 'Resume', icon: FileDown, external: false },
]

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[130px]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeading
          eyebrow="07 / Contact"
          title="Let's build something that matters"
          description="Open to founding-engineer opportunities, systems roles, and ambitious collaborations."
        />
        <div className="grid gap-12 md:grid-cols-[1fr_1fr]">
          <Reveal className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-3">
              {links.map((l) => {
                const Icon = l.icon
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="glass inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-[1.03] hover:bg-secondary active:scale-[0.98]"
                  >
                    <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                    {l.label}
                  </a>
                )
              })}
            </div>
            <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              Fastest response is via GitHub or email. If you&apos;re building something at the
              intersection of systems, graphics, or AI — the answer is probably yes.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="glass flex flex-col gap-4 rounded-xl p-6 font-mono text-sm">
              <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary">
                <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-primary" aria-hidden="true" />
                Currently building
              </span>
              <ul className="flex flex-col gap-3">
                {currentlyBuilding.map((item) => (
                  <li key={item.name} className="flex flex-col gap-0.5">
                    <span className="text-foreground">{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <footer className="mt-20 flex flex-col items-center gap-2 border-t border-border pt-8 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-primary">$</span> built with Next.js · powered by live GitHub
            telemetry
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Rohan Jose
          </p>
        </footer>
      </div>
    </section>
  )
}
