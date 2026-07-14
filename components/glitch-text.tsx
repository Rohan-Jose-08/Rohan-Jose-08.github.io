'use client'

import { useState, useEffect } from 'react'

export function GlitchText({ text, className = '' }: { text: string; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 150)
      }
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <span 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      <span className="relative z-10">{text}</span>
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-[2px] -z-10 opacity-70 text-destructive mix-blend-screen"
            aria-hidden="true"
          >
            {text}
          </span>
          <span 
            className="absolute top-0 -left-[2px] -z-10 opacity-70 text-blue-500 mix-blend-screen"
            aria-hidden="true"
          >
            {text}
          </span>
        </>
      )}
    </span>
  )
}
