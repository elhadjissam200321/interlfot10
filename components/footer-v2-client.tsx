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

  const linkCls = 'font-sans text-[10px] font-light tracking-wide text-foreground/60 hover:text-foreground transition-colors'
  const labelCls = 'text-[9px] tracking-[0.3em] uppercase font-sans font-medium text-foreground/35 mb-3 block'
  const mutedCls = 'font-sans text-[10px] font-light tracking-wide text-foreground/40'
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
    <footer className={`w-full footer-gradient border-t ${dividerCls}`}>

      {/* Newsletter expand panel */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${newsletterOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className={`px-8 md:px-12 lg:px-16 py-7 border-b ${dividerCls}`}>
          {sent ? (
            <p className={mutedCls}>Merci — vous êtes inscrit.</p>
          ) : (
            <form onSubmit={handleSend} className="flex items-baseline gap-4 max-w-xs">
              <label className={`${mutedCls} shrink-0`}>Email</label>
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={inputCls}
                required
              />
              <button type="submit" className={`${linkCls} shrink-0`}>Envoyer</button>
            </form>
          )}
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className={`px-8 md:px-12 lg:px-16 pt-12 pb-8 ${noPaddingTop ? '!pt-6' : ''}`}>

        {/* 4 equal columns on md+, 2 columns on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 mb-10">

          {/* Col 1: Interloft — Produits + Collections */}
          <div>
            <span className={labelCls}>Interloft</span>
            <nav className="flex flex-col gap-2.5">
              <Link href="/produits" className={linkCls}>Produits</Link>
              <Link href="/collections" className={linkCls}>Collections</Link>
            </nav>
          </div>

          {/* Col 2: Service client */}
          <div>
            <span className={labelCls}>Service client</span>
            <nav className="flex flex-col gap-2.5">
              <Link href="/confidentialite" className={linkCls}>Confidentialité</Link>
              <Link href="/cookies" className={linkCls}>Cookies</Link>
              <Link href="/conditions" className={linkCls}>Conditions</Link>
            </nav>
          </div>

          {/* Col 3: Contact */}
          <div>
            <span className={labelCls}>Contact</span>
            <div className="flex flex-col gap-2.5">
              <a href={`tel:${globals?.phone?.replace(/[^0-9+]/g, '') || '+212660252070'}`} className={linkCls}>
                {globals?.phone || '+212 660-252070'}
              </a>
              <a href={`mailto:${globals?.email || 'contact@interloft.ma'}`} className={linkCls}>
                {globals?.email || 'contact@interloft.ma'}
              </a>
            </div>
          </div>

          {/* Col 4: Suivez-nous */}
          <div>
            <span className={labelCls}>Suivez-nous</span>
            <div className="flex flex-col gap-2.5">
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
          </div>

        </div>

        {/* Copyright — centered */}
        <div className={`border-t ${dividerCls} pt-6`}>
          <p className="font-sans text-[9px] font-light tracking-[0.25em] uppercase text-foreground/30 text-center">
            © {new Date().getFullYear()} {globals?.footer_text || 'Interloft'} — Tous droits réservés
          </p>
        </div>

      </div>
    </footer>
  )
}
