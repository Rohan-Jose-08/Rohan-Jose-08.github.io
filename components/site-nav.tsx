'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Command } from 'lucide-react'

const links = [
  { href: '#projects', label: 'Work' },
  { href: '#telemetry', label: 'Signals' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Stack' },
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
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const elements = links
      .map(({ href }) => document.querySelector(href))
      .filter((element): element is Element => Boolean(element))
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5] }
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`nav-shell pointer-events-auto relative mx-auto max-w-6xl overflow-hidden rounded-2xl transition-all duration-300 ${
          scrolled ? 'shadow-2xl' : ''
        }`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-primary"
          style={{ transform: `scaleX(${progress})`, transition: 'transform 80ms linear' }}
        />
        <nav aria-label="Main navigation" className="flex h-14 items-center justify-between gap-3 px-3 sm:px-4">
          <a href="#top" className="group flex shrink-0 items-center gap-2 rounded-xl px-2 py-1.5 font-mono text-sm font-semibold">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:-rotate-3">RJ</span>
            <span className="hidden text-foreground sm:inline">Rohan Jose</span>
          </a>

          <div className="scrollbar-none flex min-w-0 flex-1 items-center justify-start gap-1 overflow-x-auto md:justify-center">
            {links.map((link) => {
              const isActive = active === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative shrink-0 rounded-lg px-2.5 py-2 text-xs transition-colors sm:text-sm ${
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute inset-0 rounded-lg bg-secondary"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  ) : null}
                  <span className="relative">{link.label}</span>
                </a>
              )
            })}
          </div>

          <button
            type="button"
            onClick={onOpenPalette}
            className="flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-border bg-secondary px-2.5 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Open command palette"
          >
            <Command aria-hidden="true" />
            <span className="hidden lg:inline">Command</span>
            <kbd className="hidden rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] sm:inline">⌘K</kbd>
          </button>
        </nav>
      </div>
    </header>
  )
}
