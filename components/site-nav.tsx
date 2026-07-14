'use client'

import { useEffect, useState } from 'react'
import { Command } from 'lucide-react'
import Magnet from '@/components/Magnet'

const links = [
  { href: '#projects', label: 'Projects' },
  { href: '#telemetry', label: 'Telemetry' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export function SiteNav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = ['#projects', '#telemetry', '#experience', '#skills', '#contact']
    const elements = sectionIds
      .map((id) => document.querySelector(id))
      .filter((el): el is Element => Boolean(el))
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          const id = `#${visible.target.id}`
          setActive(id)
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass' : 'bg-transparent'
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500"
        style={{ opacity: scrolled ? 1 : 0 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-px origin-left bg-gradient-to-r from-primary/0 via-primary to-primary/0"
        style={{ transform: `scaleX(${progress})`, transition: 'transform 80ms linear' }}
      />
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <a
          href="#top"
          className="group inline-flex items-center font-mono text-sm font-semibold tracking-tight"
        >
          <span className="text-primary transition-transform duration-300 group-hover:-translate-y-px">
            rj
          </span>
          <span className="text-muted-foreground">@</span>
          <span>portfolio</span>
          <span className="ml-1 inline-block h-4 w-2 translate-y-px bg-primary animate-pulse" />
          <span className="text-primary">:~$</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const isActive = active === l.href
            return (
              <Magnet
                key={l.href}
                magnetStrength={6}
                padding={8}
                activeTransition="transform 0.12s ease-out"
                inactiveTransition="transform 0.25s ease-in-out"
              >
                <a
                  href={l.href}
                  className="relative inline-flex items-center text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_2px_var(--ring)]"
                    />
                  ) : null}
                  {l.label}
                </a>
              </Magnet>
            )
          })}
        </div>
        <button
          type="button"
          onClick={onOpenPalette}
          className="group glass flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-muted-foreground transition-all duration-200 hover:text-foreground hover:border-primary/40"
          aria-label="Open command palette"
        >
          <Command className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
          <span className="hidden sm:inline">Command</span>
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] transition-colors group-hover:border-primary/40 group-hover:text-primary">
            ⌘K
          </kbd>
        </button>
      </nav>
    </header>
  )
}
