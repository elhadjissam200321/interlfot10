'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface FooterV2Props {
  overlay?: boolean
  noPaddingTop?: boolean
  globals?: {
    phone: string
    email: string
    instagram: string
    showrooms: string[]
    footer_text: string
  }
}

export default function FooterV2({ overlay = false, noPaddingTop = false, globals }: FooterV2Props) {
  const [newsletterOpen, setNewsletterOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const base = overlay
    ? 'text-background/90 hover:text-background transition-colors'
    : 'text-foreground/45 hover:text-foreground transition-colors'

  const label = overlay
    ? 'text-[9px] tracking-[0.3em] uppercase font-sans text-background/60 mb-4 block'
    : 'text-[9px] tracking-[0.3em] uppercase font-sans text-foreground/25 mb-4 block'

  const divider = overlay ? 'border-background/10' : 'border-foreground/10'
  const muted = overlay ? 'text-background/70' : 'text-foreground/30'
  const inputColor = overlay
    ? 'bg-transparent text-background placeholder-background/30 border-background/20 focus:border-background/60'
    : 'bg-transparent text-foreground placeholder-foreground/30 border-foreground/20 focus:border-foreground/60'
  const overlayPanelBg = overlay ? 'border-background/10' : 'border-foreground/10'

  function handleNewsletterToggle() {
    setNewsletterOpen(v => !v)
    setSent(false)
    setEmail('')
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSent(true)
    setEmail('')
  }

  return (
    <footer
      className={overlay ? 'w-full' : 'w-full border-t border-foreground/8'}
      style={!overlay ? { backgroundColor: 'var(--color-footer-bg)' } : undefined}
    >

      {overlay && <div className={`w-full border-t ${divider}`} />}

      {/* Newsletter expand panel — Studio27 style */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${newsletterOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className={`px-8 md:px-12 lg:px-16 py-7 border-b ${overlayPanelBg}`}>
          <div className="flex flex-col items-end gap-5">
            {/* Title block — right-aligned like studio27 */}
            <div className="text-right">
              <p className={`font-sans text-[10px] tracking-[0.35em] uppercase font-light ${overlay ? 'text-background/70' : 'text-foreground/60'}`}>
                Interloft Newsletter
              </p>
              <a
                href={globals?.instagram || "https://instagram.com/interloft"}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-sans text-[10px] tracking-[0.35em] uppercase font-light ${base} block mt-1`}
              >
                Instagram
              </a>
            </div>

            {/* Email row */}
            {sent ? (
              <p className={`font-sans text-[10px] tracking-[0.25em] uppercase font-light ${muted}`}>
                Merci — vous êtes inscrit.
              </p>
            ) : (
              <form onSubmit={handleSend} className="flex items-baseline gap-4 w-full max-w-sm">
                <label className={`font-sans text-[10px] tracking-[0.3em] uppercase font-light shrink-0 ${muted}`}>
                  Email
                </label>
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder=""
                  className={`flex-1 font-sans text-[10px] font-light tracking-wide border-0 border-b outline-none pb-0.5 ${inputColor} transition-colors`}
                  required
                />
                <button
                  type="submit"
                  className={`font-sans text-[10px] tracking-[0.3em] uppercase font-light shrink-0 ${base}`}
                >
                  Send
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className={`px-8 md:px-12 lg:px-16 pt-4 pb-3 ${noPaddingTop ? '!pt-0' : ''}`}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 mb-4 mt-4">
          {/* Col 1: Produits */}
          <div>
            <span className={label}>Produits</span>
            <nav className="flex flex-col gap-2.5">
              <Link href="/produits" className={`font-sans text-[10px] font-light tracking-wide ${base}`}>
                Tous les produits
              </Link>
              <Link href="/produits/canapes" className={`font-sans text-[10px] font-light tracking-wide ${base}`}>
                Canapés
              </Link>
              <Link href="/produits/fauteuils" className={`font-sans text-[10px] font-light tracking-wide ${base}`}>
                Fauteuils
              </Link>
              <Link href="/produits/lits" className={`font-sans text-[10px] font-light tracking-wide ${base}`}>
                Lits
              </Link>
              <Link href="/produits/meubles" className={`font-sans text-[10px] font-light tracking-wide ${base}`}>
                Meubles
              </Link>
            </nav>
          </div>

          {/* Col 2: Collections */}
          <div>
            <span className={label}>Collections</span>
            <nav className="flex flex-col gap-2.5">
              <Link href="/collections/beldi" className={`font-sans text-[10px] font-light tracking-wide ${base}`}>
                Beldi
              </Link>
              <Link href="/collections/moderne" className={`font-sans text-[10px] font-light tracking-wide ${base}`}>
                Moderne
              </Link>
              <Link href="/collections/contemporaine" className={`font-sans text-[10px] font-light tracking-wide ${base}`}>
                Contemporaine
              </Link>
              <Link href="/collections/nature" className={`font-sans text-[10px] font-light tracking-wide ${base}`}>
                Nature
              </Link>
              <Link href="/collections/luxe" className={`font-sans text-[10px] font-light tracking-wide ${base}`}>
                Luxe
              </Link>
            </nav>
          </div>

          {/* Col 3: Contact */}
          <div>
            <span className={label}>Contact</span>
            <div className="flex flex-col gap-2.5">
              <a href={`tel:${globals?.phone?.replace(/[^0-9+]/g, '') || '+212660252070'}`} className={`font-sans text-[10px] font-light tracking-wide ${base}`}>
                {globals?.phone || '+212 660-252070'}
              </a>
              <a href={`mailto:${globals?.email || 'contact@interloft.ma'}`} className={`font-sans text-[10px] font-light tracking-wide ${base}`}>
                {globals?.email || 'contact@interloft.ma'}
              </a>
              {globals?.showrooms ? (
                globals.showrooms.map((room, i) => (
                  <p key={i} className={`font-sans text-[10px] font-light tracking-wide ${muted}`}>{room}</p>
                ))
              ) : (
                <>
                  <p className={`font-sans text-[10px] font-light tracking-wide ${muted} mt-1`}>Casablanca</p>
                  <p className={`font-sans text-[10px] font-light tracking-wide ${muted}`}>Marrakech</p>
                </>
              )}
            </div>
          </div>

          {/* Col 4: Suivez-nous + Service client */}
          <div>
            <span className={label}>Suivez-nous</span>
            <div className="flex flex-col gap-2.5 mb-5">
              <a
                href={globals?.instagram || "https://instagram.com/interloft"}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-sans text-[10px] font-light tracking-wide ${base}`}
              >
                Instagram
              </a>
              <button
                onClick={handleNewsletterToggle}
                className={`font-sans text-[10px] font-light tracking-wide text-left ${base} ${newsletterOpen ? 'underline underline-offset-4' : ''}`}
              >
                Newsletter
              </button>
            </div>
            <span className={label}>Légal</span>
            <nav className="flex flex-col gap-2.5">
              <Link href="/confidentialite" className={`font-sans text-[10px] font-light tracking-wide ${base}`}>
                Confidentialité
              </Link>
              <Link href="/cookies" className={`font-sans text-[10px] font-light tracking-wide ${base}`}>
                Cookies
              </Link>
              <Link href="/conditions" className={`font-sans text-[10px] font-light tracking-wide ${base}`}>
                Conditions
              </Link>
            </nav>
          </div>
        </div>
        <div className={`border-t ${divider} pt-4`}>
          <p className={`font-sans text-[9px] font-light tracking-[0.25em] uppercase ${muted}`}>
            © {new Date().getFullYear()} {globals?.footer_text || 'Interloft'}
          </p>
        </div>
      </div>
    </footer>
  )
}
