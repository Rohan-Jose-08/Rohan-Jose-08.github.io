'use client'

import { useEffect, useState } from 'react'

export function Aurora() {
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEnabled(false)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className={`absolute -top-32 left-1/4 h-[420px] w-[560px] rounded-full opacity-50 blur-[120px] ${
          enabled ? 'animate-aurora-1' : ''
        }`}
        style={{ background: 'oklch(0.77 0.19 155 / 0.18)' }}
      />
      <div
        className={`absolute top-1/3 right-1/4 h-[380px] w-[480px] rounded-full opacity-40 blur-[130px] ${
          enabled ? 'animate-aurora-2' : ''
        }`}
        style={{ background: 'oklch(0.7 0.18 230 / 0.16)' }}
      />
      <div
        className={`absolute -bottom-20 left-1/2 h-[320px] w-[520px] -translate-x-1/2 rounded-full opacity-40 blur-[120px] ${
          enabled ? 'animate-aurora-3' : ''
        }`}
        style={{ background: 'oklch(0.78 0.16 165 / 0.14)' }}
      />
    </div>
  )
}
