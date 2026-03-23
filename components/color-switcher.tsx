'use client'

import { useState, useEffect, useRef } from 'react'
import { X, ChevronRight, RotateCcw } from 'lucide-react'

const STORAGE_KEY = 'interloft-ambiance-v3'
const DEFAULT_AMBIANCE = 'ivoire'

const AMBIANCES = [
  {
    id: 'ivoire',
    name: 'Ivoire',
    desc: 'Blanc chaud',
    from: '#F8F5F0',
    to: '#EDE7DC',
  },
  {
    id: 'creme',
    name: 'Crème',
    desc: 'Douceur sablée',
    from: '#F2EDE4',
    to: '#DDD3C5',
  },
  {
    id: 'lin',
    name: 'Lin',
    desc: 'Naturel tendre',
    from: '#E8E0D5',
    to: '#D4C8B8',
  },
  {
    id: 'greige',
    name: 'Greige',
    desc: 'Chaleur profonde',
    from: '#D9CFBF',
    to: '#C5B9A5',
  },
]

function applyAmbiance(id: string) {
  document.documentElement.setAttribute('data-ambiance', id)
}

export default function ColorSwitcher() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(DEFAULT_AMBIANCE)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved && AMBIANCES.find(a => a.id === saved)) {
        setActive(saved)
        applyAmbiance(saved)
      }
    } catch {}
  }, [])

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  function handleSelect(id: string) {
    setActive(id)
    applyAmbiance(id)
    try { localStorage.setItem(STORAGE_KEY, id) } catch {}
  }

  function handleReset() {
    setActive(DEFAULT_AMBIANCE)
    applyAmbiance(DEFAULT_AMBIANCE)
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }

  const current = AMBIANCES.find(a => a.id === active) ?? AMBIANCES[0]

  return (
    <div ref={panelRef} className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-3">
      {open && (
        <div className="w-60 shadow-2xl border border-border bg-background text-foreground overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <span className="text-[10px] tracking-[0.22em] uppercase font-sans font-medium text-foreground">
              Ambiance
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                title="Réinitialiser"
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-1"
              >
                <RotateCcw size={12} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-1"
              >
                <X size={13} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Ambiance grid */}
          <div className="p-4 flex flex-col gap-2">
            {AMBIANCES.map((amb) => {
              const isActive = active === amb.id
              return (
                <button
                  key={amb.id}
                  onClick={() => handleSelect(amb.id)}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 border transition-all cursor-pointer text-left ${
                    isActive
                      ? 'border-foreground/50 bg-foreground/[0.04]'
                      : 'border-border hover:border-foreground/25 hover:bg-foreground/[0.02]'
                  }`}
                >
                  {/* Gradient swatch */}
                  <div
                    className="w-10 h-8 flex-shrink-0 border border-border/60"
                    style={{
                      background: `linear-gradient(135deg, ${amb.from} 0%, ${amb.to} 100%)`,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-[11px] font-medium tracking-wide text-foreground">
                      {amb.name}
                    </p>
                    <p className="font-sans text-[9px] tracking-[0.1em] text-muted-foreground mt-0.5">
                      {amb.desc}
                    </p>
                  </div>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground flex-shrink-0" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Footer hint */}
          <div className="px-4 py-2.5 border-t border-border bg-foreground/[0.02]">
            <p className="text-[9px] font-sans text-muted-foreground tracking-wide">
              Ambiance enregistrée automatiquement.
            </p>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-4 py-2.5 border border-border shadow-lg text-[10px] tracking-[0.2em] uppercase font-sans hover:shadow-xl transition-all cursor-pointer bg-background text-foreground"
      >
        {/* Mini gradient preview */}
        <div
          className="w-3.5 h-3.5 border border-border/40"
          style={{
            background: `linear-gradient(135deg, ${current.from} 0%, ${current.to} 100%)`,
          }}
        />
        Ambiance
        <ChevronRight
          size={11}
          strokeWidth={2}
          className={`transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
        />
      </button>
    </div>
  )
}
