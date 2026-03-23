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

  /* ── token classes — always use foreground-relative opacity ── */
  const linkCls = 'font-sans text-[10px] font-light tracking-wide text-foreground/60 hover:text-foreground transition-colors'
  const labelCls = 'text-[9px] tracking-[0.3em] uppercase font-sans text-foreground/35 mb-4 block'
  const mutedCls = 'font-sans text-[10px] font-light tracking-wide text-foreground/35'
  const dividerCls = 'border-foreground/10'
  const inputCls = 'flex-1 font-sans text-[10px] font-light tracking-wide border-0 border-b outline-none pb-0.5 bg-transparent text-foreground placeholder-foreground/30 border-foreground/20 focus:border-foreground/60 transition-colors'

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
      className={`w-full footer-gradient${overlay ? ' border-t border-foreground/10' : ' border-t border-foreground/8'}`}
    >
      {/* Newsletter expand panel */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          newsletterOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`px-8 md:px-12 lg:px-16 py-7 border-b ${dividerCls}`}>
          <div className="flex flex-col items-end gap-5">
            <div className="text-right">
              <p className="font-sans text-[10px] tracking-[0.35em] uppercase font-light text-foreground/60">
                Interloft Newsletter
              </p>
              <a
                href={globals?.instagram || 'https://instagram.com/interloft'}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-sans text-[10px] tracking-[0.35em] uppercase font-light block mt-1 ${linkCls}`}
              >
                Instagram
              </a>
            </div>

            {sent ? (
              <p className={mutedCls}>Merci — vous êtes inscrit.</p>
            ) : (
              <form onSubmit={handleSend} className="flex items-baseline gap-4 w-full max-w-sm">
                <label className={`${mutedCls} shrink-0`}>Email</label>
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder=""
                  className={inputCls}
                  required
                />
                <button type="submit" className={`${linkCls} shrink-0`}>
                  Envoyer
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className={`px-8 md:px-12 lg:px-16 pt-10 pb-6 ${noPaddingTop ? '!pt-0' : ''}`}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-8">

          {/* Col 1: Produits */}
          <div>
            <span className={labelCls}>Produits</span>
            <nav className="flex flex-col gap-3">
              <Link href="/produits" className={linkCls}>Tous les produits</Link>
              <Link href="/produits/canapes" className={linkCls}>Canapés</Link>
              <Link href="/produits/fauteuils" className={linkCls}>Fauteuils</Link>
              <Link href="/produits/lits" className={linkCls}>Lits</Link>
              <Link href="/produits/meubles" className={linkCls}>Meubles</Link>
            </nav>
          </div>

          {/* Col 2: Collections */}
          <div>
            <span className={labelCls}>Collections</span>
            <nav className="flex flex-col gap-3">
              <Link href="/collections/beldi" className={linkCls}>Beldi</Link>
              <Link href="/collections/moderne" className={linkCls}>Moderne</Link>
              <Link href="/collections/contemporaine" className={linkCls}>Contemporaine</Link>
              <Link href="/collections/nature" className={linkCls}>Nature</Link>
              <Link href="/collections/luxe" className={linkCls}>Luxe</Link>
            </nav>
          </div>

          {/* Col 3: Contact */}
          <div>
            <span className={labelCls}>Contact</span>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${globals?.phone?.replace(/[^0-9+]/g, '') || '+212660252070'}`}
                className={linkCls}
              >
                {globals?.phone || '+212 660-252070'}
              </a>
              <a
                href={`mailto:${globals?.email || 'contact@interloft.ma'}`}
                className={linkCls}
              >
                {globals?.email || 'contact@interloft.ma'}
              </a>
              {globals?.showrooms ? (
                globals.showrooms.map((room, i) => (
                  <p key={i} className={mutedCls}>{room}</p>
                ))
              ) : (
                <>
                  <p className={mutedCls}>Casablanca</p>
                  <p className={mutedCls}>Marrakech</p>
                </>
              )}
            </div>
          </div>

          {/* Col 4: Suivez-nous + Légal */}
          <div>
            <span className={labelCls}>Suivez-nous</span>
            <div className="flex flex-col gap-3 mb-6">
              <a
                href={globals?.instagram || 'https://instagram.com/interloft'}
                target="_blank"
                rel="noopener noreferrer"
                className={linkCls}
              >
                Instagram
              </a>
              <button
                onClick={handleNewsletterToggle}
                className={`${linkCls} text-left ${newsletterOpen ? 'underline underline-offset-4' : ''}`}
              >
                Newsletter
              </button>
            </div>
            <span className={labelCls}>Légal</span>
            <nav className="flex flex-col gap-3">
              <Link href="/confidentialite" className={linkCls}>Confidentialité</Link>
              <Link href="/cookies" className={linkCls}>Cookies</Link>
              <Link href="/conditions" className={linkCls}>Conditions</Link>
            </nav>
          </div>
        </div>

        {/* Bottom row */}
        <div className={`border-t ${dividerCls} pt-5`}>
          <p className={`${mutedCls} text-[9px] tracking-[0.25em] uppercase`}>
            © {new Date().getFullYear()} {globals?.footer_text || 'Interloft'}
          </p>
        </div>
      </div>
    </footer>
  )
}
