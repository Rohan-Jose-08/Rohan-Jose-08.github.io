'use client'

import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import {
  Coffee,
  FileDown,
  FolderGit2,
  Home,
  Mail,
  Radar,
  Sparkles,
  SquareTerminal,
  User,
} from 'lucide-react'
import { Github, Linkedin } from '@/components/brand-icons'
import { contactLinks } from '@/lib/portfolio-data'
import type { GitHubRepo } from '@/lib/github'

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  repos: GitHubRepo[]
}

const sections = [
  { id: '#top', label: 'Home', icon: Home },
  { id: '#about', label: 'About', icon: User },
  { id: '#projects', label: 'Projects', icon: FolderGit2 },
  { id: '#telemetry', label: 'Telemetry', icon: Radar },
  { id: '#experience', label: 'Experience', icon: Sparkles },
  { id: '#skills', label: 'Skills', icon: SquareTerminal },
  { id: '#contact', label: 'Contact', icon: Mail },
]

export function CommandPalette({ open, onOpenChange, repos }: CommandPaletteProps) {
  const [sudo, setSudo] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      }
      if (e.key === 'Escape') onOpenChange(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onOpenChange])

  useEffect(() => {
    if (!open) setSudo(false)
  }, [open])

  const go = (hash: string) => {
    onOpenChange(false)
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
  }

  const openUrl = (url: string) => {
    onOpenChange(false)
    window.open(url, url.startsWith('mailto') ? '_self' : '_blank', 'noopener,noreferrer')
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-background/70 px-4 pt-[15vh] backdrop-blur-sm"
      onClick={() => onOpenChange(false)}
      role="presentation"
    >
      <Command
        label="Command palette"
        onClick={(e) => e.stopPropagation()}
        className="glass w-full max-w-lg overflow-hidden rounded-xl shadow-2xl shadow-black/40"
      >
        <div className="flex items-center gap-2 border-b border-border px-4">
          <span className="font-mono text-sm text-primary" aria-hidden="true">
            $
          </span>
          <Command.Input
            autoFocus
            placeholder="Type a command, section, or repository..."
            className="h-12 w-full bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground"
            onValueChange={(v) => {
              if (v.trim().toLowerCase() === 'sudo') setSudo(true)
            }}
          />
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            esc
          </kbd>
        </div>
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="flex items-center gap-2 px-3 py-6 font-mono text-sm text-muted-foreground">
            {sudo ? (
              <>
                <Coffee className="h-4 w-4 text-primary" aria-hidden="true" />
                permission granted. now go build something.
              </>
            ) : (
              <>command not found. try &quot;projects&quot; — or &quot;sudo&quot;.</>
            )}
          </Command.Empty>

          <Command.Group
            heading="Navigate"
            className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-muted-foreground"
          >
            {sections.map((s) => {
              const Icon = s.icon
              return (
                <Command.Item
                  key={s.id}
                  value={`goto ${s.label}`}
                  onSelect={() => go(s.id)}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors data-[selected=true]:bg-secondary data-[selected=true]:text-foreground"
                >
                  <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  {s.label}
                </Command.Item>
              )
            })}
          </Command.Group>

          <Command.Group
            heading="Repositories"
            className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-muted-foreground"
          >
            {repos.map((r) => (
              <Command.Item
                key={r.name}
                value={`repo ${r.name} ${r.language ?? ''}`}
                onSelect={() => openUrl(r.htmlUrl)}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors data-[selected=true]:bg-secondary data-[selected=true]:text-foreground"
              >
                <FolderGit2 className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="font-mono">{r.name}</span>
                {r.language ? (
                  <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                    {r.language}
                  </span>
                ) : null}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group
            heading="Links"
            className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-muted-foreground"
          >
            <Command.Item
              value="open github profile"
              onSelect={() => openUrl(contactLinks.github)}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors data-[selected=true]:bg-secondary data-[selected=true]:text-foreground"
            >
              <Github className="h-4 w-4 text-primary" aria-hidden="true" />
              GitHub profile
            </Command.Item>
            <Command.Item
              value="open linkedin"
              onSelect={() => openUrl(contactLinks.linkedin)}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors data-[selected=true]:bg-secondary data-[selected=true]:text-foreground"
            >
              <Linkedin className="h-4 w-4 text-primary" aria-hidden="true" />
              LinkedIn
            </Command.Item>
            <Command.Item
              value="send email"
              onSelect={() => openUrl(contactLinks.email)}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors data-[selected=true]:bg-secondary data-[selected=true]:text-foreground"
            >
              <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
              Email
            </Command.Item>
            <Command.Item
              value="download resume"
              onSelect={() => openUrl(contactLinks.resume)}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors data-[selected=true]:bg-secondary data-[selected=true]:text-foreground"
            >
              <FileDown className="h-4 w-4 text-primary" aria-hidden="true" />
              Resume
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  )
}
