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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass' : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight">
          <span className="text-primary">rj</span>
          <span className="text-muted-foreground">@</span>
          <span>portfolio</span>
          <span className="text-primary">:~$</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Magnet key={l.href} magnetStrength={0.6} padding={20} activeTransition="transform 0.2s ease-out" inactiveTransition="transform 0.4s ease-in-out">
              <a
                href={l.href}
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {l.label}
              </a>
            </Magnet>
          ))}
        </div>
        <button
          type="button"
          onClick={onOpenPalette}
          className="glass flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-muted-foreground transition-colors duration-200 hover:text-foreground"
          aria-label="Open command palette"
        >
          <Command className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Command</span>
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
            ⌘K
          </kbd>
        </button>
      </nav>
    </header>
  )
}
