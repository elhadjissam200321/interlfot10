'use client'

import { useState, useEffect, useRef } from 'react'
import { Pipette, X, ChevronRight, RotateCcw, ChevronDown } from 'lucide-react'

// ─── Color utilities ───────────────────────────────────────────────────────────

function isValidHex(hex: string) {
  return /^#[0-9A-Fa-f]{6}$/.test(hex)
}

// ─── CSS variable map ──────────────────────────────────────────────────────────

const SLOT_VAR = '--background'
const SLOT_LABEL = 'Arrière-plan'
const SLOT_DEFAULT = '#F8F5F0'
const STORAGE_KEY = 'interloft-colors-v2'

// ─── Palette (Beiges & Neutrals) ──────────────────────────────────────────────

const BEIGE_PALETTE = [
  { name: 'Ivoire', hex: '#F8F5F0' },
  { name: 'Crème', hex: '#F2EDE4' },
  { name: 'Lin', hex: '#E8E0D5' },
  { name: 'Greige', hex: '#D9CFBF' },
  { name: 'Perle', hex: '#ECEADB' },
  { name: 'Beige', hex: '#F5F5DC' },
  { name: 'Linen', hex: '#FAF0E6' },
  { name: 'Lace', hex: '#FDF5E6' },
  { name: 'Nuage', hex: '#F5F5F5' },
  { name: 'Blanc', hex: '#FFFFFF' },
]

const PALETTE_HEXES = new Set(BEIGE_PALETTE.map(p => p.hex))

// ─── Sub-component: one color picker ──────────────────────────────────────────

interface PickerProps {
  value: string
  onChange: (hex: string) => void
}

function ColorPicker({ value, onChange }: PickerProps) {
  const [input, setInput] = useState(value)
  const [err, setErr] = useState(false)

  useEffect(() => { setInput(value) }, [value])

  function handleInput(raw: string) {
    const v = raw.startsWith('#') ? raw : `#${raw}`
    setInput(v)
    if (isValidHex(v)) { setErr(false); onChange(v) }
    else setErr(true)
  }

  return (
    <div className="px-4 pb-4 pt-2">
      {/* Swatches */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {BEIGE_PALETTE.map(p => (
          <button
            key={p.hex}
            onClick={() => onChange(p.hex)}
            title={p.name}
            className="group relative"
          >
            <div
              className="w-full aspect-square border transition-transform"
              style={{
                backgroundColor: p.hex,
                borderColor: value === p.hex ? '#1A1510' : 'rgba(0,0,0,0.10)',
                transform: value === p.hex ? 'scale(1.1)' : 'scale(1)',
                boxShadow: value === p.hex ? `0 0 0 1px ${p.hex}, 0 0 0 2px #1A1510` : 'none',
              }}
            />
            <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 bg-foreground text-background text-[8px] px-1.5 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {p.name}
            </span>
          </button>
        ))}
      </div>

      {/* Hex input & Pipette */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 border border-border flex-shrink-0" style={{ backgroundColor: isValidHex(input) ? input : value }} />
        <input
          type="text"
          value={input}
          onChange={e => handleInput(e.target.value)}
          maxLength={7}
          placeholder="#F8F5F0"
          className={`flex-1 h-8 px-3 text-[11px] font-mono tracking-wider border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors ${err ? 'border-red-400' : 'border-border focus:border-foreground/60'
            }`}
        />
        <label title="Pipette" className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors p-1">
          <Pipette size={14} strokeWidth={1.5} />
          <input
            type="color"
            className="sr-only"
            value={isValidHex(input) ? input : value}
            onChange={e => handleInput(e.target.value)}
          />
        </label>
      </div>
      {err && <p className="text-[9px] text-red-400 mt-1">Format invalide — ex: #F8F5F0</p>}
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function ColorSwitcher() {
  const [open, setOpen] = useState(false)
  const [color, setColor] = useState(SLOT_DEFAULT)
  const panelRef = useRef<HTMLDivElement>(null)

  // Load persisted color
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        const hex = typeof parsed === 'string' ? parsed : parsed['bg-page'] || SLOT_DEFAULT
        if (isValidHex(hex)) {
          setColor(hex)
          document.documentElement.style.setProperty(SLOT_VAR, hex)
        }
      }
    } catch { }
  }, [])

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  function handleChange(hex: string) {
    if (!isValidHex(hex)) return
    setColor(hex)
    document.documentElement.style.setProperty(SLOT_VAR, hex)
    // Only persist palette colors to localStorage (XSS prevention)
    if (PALETTE_HEXES.has(hex)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ 'bg-page': hex }))
    }
  }

  function handleReset() {
    document.documentElement.style.removeProperty(SLOT_VAR)
    setColor(SLOT_DEFAULT)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <div ref={panelRef} className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-3">
      {open && (
        <div className="w-64 shadow-2xl border border-border bg-background text-foreground overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <span className="text-[10px] tracking-[0.22em] uppercase font-sans font-medium text-foreground">
              Arrière-plan
            </span>
            <div className="flex items-center gap-2">
              <button onClick={handleReset} title="Réinitialiser" className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-1">
                <RotateCcw size={12} strokeWidth={1.5} />
              </button>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-1">
                <X size={13} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Picker */}
          <ColorPicker value={color} onChange={handleChange} />

          {/* Footer hint */}
          <div className="px-4 py-2 border-t border-border bg-foreground/[0.02]">
            <p className="text-[9px] font-sans text-muted-foreground tracking-wide">
              Couleur enregistrée automatiquement.
            </p>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-4 py-2.5 border border-border shadow-lg text-[10px] tracking-[0.2em] uppercase font-sans hover:shadow-xl transition-all cursor-pointer bg-background text-foreground"
      >
        <div
          className="w-3.5 h-3.5 border border-border/40 shadow-sm"
          style={{ backgroundColor: color }}
        />
        Ambiance
        <ChevronRight size={11} strokeWidth={2} className={`transition-transform duration-200 ${open ? 'rotate-90' : ''}`} />
      </button>
    </div>
  )
}
