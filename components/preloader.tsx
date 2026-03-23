'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

export default function Preloader() {
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState<'counting' | 'hold' | 'exit' | 'done'>('counting')
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  // Total duration for the count animation
  const DURATION = 1800 // ms
  const HOLD = 320     // pause at 100 before sliding out
  const EXIT = 700     // slide-up exit

  useEffect(() => {
    // Ease-out cubic function so it slows near 100
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const progress = Math.min(elapsed / DURATION, 1)
      const value = Math.floor(easeOut(progress) * 100)
      setCount(value)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setCount(100)
        setTimeout(() => {
          setPhase('exit')
          setTimeout(() => setPhase('done'), EXIT)
        }, HOLD)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
      style={{
        backgroundColor: 'var(--background)',
        transform: phase === 'exit' ? 'translateY(-100%)' : 'translateY(0)',
        transition: phase === 'exit' ? `transform ${EXIT}ms cubic-bezier(0.76, 0, 0.24, 1)` : 'none',
      }}
    >
      {/* Centered Logo + Counter */}
      <div className="flex flex-col items-center justify-center gap-8 md:gap-10">
        {/* Logo */}
        <div
          className="relative h-16 md:h-20 w-40 md:w-56"
          style={{
            opacity: phase === 'exit' ? 0 : 1,
            transition: phase === 'exit' ? 'opacity 0.2s ease' : 'none',
          }}
        >
          <Image
            src="/images/logo.png"
            alt="Interloft"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Counter and Progress */}
        <div className="flex flex-col items-center gap-4">
          {/* Counter */}
          <span
            className="font-sans text-[13px] md:text-[15px] tracking-[0.3em] uppercase text-foreground/50 tabular-nums"
            style={{
              opacity: phase === 'exit' ? 0 : 1,
              transition: phase === 'exit' ? 'opacity 0.2s ease' : 'none',
            }}
          >
            {String(count).padStart(3, '0')}
          </span>

          {/* Thin progress line */}
          <div className="w-[140px] md:w-[160px] h-px bg-foreground/10 overflow-hidden">
            <div
              className="h-full bg-foreground/40"
              style={{
                width: `${count}%`,
                transition: 'width 0.05s linear',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
