'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Command, Menu, X } from 'lucide-react'

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
  const [menuOpen, setMenuOpen] = useState(false)

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
    const elements = links
      .map(({ href }) => document.querySelector(href))
      .filter((element): element is Element => Boolean(element))
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Main navigation"
        className={`relative mx-auto max-w-6xl overflow-hidden rounded-2xl border transition-all duration-300 ${
          scrolled || menuOpen
            ? 'border-border bg-background/90 shadow-2xl shadow-background/40 backdrop-blur-xl'
            : 'border-border/60 bg-background/55 backdrop-blur-md'
        }`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px origin-left bg-primary"
          style={{ transform: `scaleX(${progress})`, transition: 'transform 80ms linear' }}
        />
        <div className="flex h-14 items-center justify-between px-4 sm:px-5">
          <a href="#top" onClick={closeMenu} className="group inline-flex min-h-11 items-center gap-3 rounded-lg">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 font-mono text-xs font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              RJ
            </span>
            <span className="hidden flex-col sm:flex">
              <span className="text-sm font-semibold leading-none">Rohan Jose</span>
              <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Systems / AI</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const isActive = active === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative inline-flex min-h-11 items-center rounded-lg px-3 text-sm transition-colors ${
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute inset-x-3 bottom-1.5 h-px bg-primary"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  ) : null}
                  {link.label}
                </a>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenPalette}
              className="group inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-card/70 px-3 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              aria-label="Open command palette"
            >
              <Command className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Command</span>
              <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-primary sm:inline">⌘K</kbd>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card/70 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {menuOpen ? (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="border-t border-border p-2 lg:hidden"
            >
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-5">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`flex min-h-11 items-center rounded-lg px-3 text-sm transition-colors ${
                      active === link.href ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
    </header>
  )
}
