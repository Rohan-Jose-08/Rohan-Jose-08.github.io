'use client'

import type { ReactNode } from 'react'

interface ShimmerButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  ariaLabel?: string
}

export function ShimmerButton({
  children,
  className = '',
  href,
  onClick,
  type = 'button',
  ariaLabel,
}: ShimmerButtonProps) {
  const classes = `group/btn relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_24px_-6px_oklch(0.77_0.19_155/0.6)] active:scale-[0.98] ${className}`

  const inner = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  )

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel} className={classes}>
        {inner}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className={classes}>
      {inner}
    </button>
  )
}
