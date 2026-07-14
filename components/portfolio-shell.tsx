'use client'

import { useState } from 'react'
import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Projects } from '@/components/projects'
import { Telemetry } from '@/components/telemetry'
import { Experience } from '@/components/experience'
import { Skills } from '@/components/skills'
import { Philosophy } from '@/components/philosophy'
import { Contact } from '@/components/contact'
import { CommandPalette } from '@/components/command-palette'
import Noise from '@/components/Noise'
import ClickSpark from '@/components/ClickSpark'
import { CursorSpotlight } from '@/components/cursor-spotlight'
import type { GitHubData } from '@/lib/github'

export function PortfolioShell({ data }: { data: GitHubData }) {
  const [paletteOpen, setPaletteOpen] = useState(false)

  return (
    <>
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <CursorSpotlight />
      <SiteNav onOpenPalette={() => setPaletteOpen(true)} />
      <ClickSpark sparkColor="#a78bfa" sparkSize={5} sparkRadius={12} sparkCount={4} duration={400}>
        <main>
          <Hero data={data} />
          <About data={data} />
          <Projects repos={data.repos} />
          <Telemetry data={data} />
          <Experience />
          <Skills />
          <Philosophy />
          <Contact />
        </main>
      </ClickSpark>
      <Noise patternAlpha={5} patternSize={200} patternRefreshInterval={4} />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} repos={data.repos} />
    </>
  )
}
