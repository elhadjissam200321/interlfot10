"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, User, X, ChevronDown } from 'lucide-react'
import SearchModal from '@/components/search-modal'
import FooterV2Client from '@/components/footer-v2-client'

// ── Inline Produits dropdown (vertical style) ──────────────────────────────
function ProduitsNav({ categories, label = 'Produits' }: { categories: any[], label?: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 font-sans text-[11px] tracking-[0.2em] uppercase text-background/80 hover:text-background transition-colors cursor-pointer"
      >
        {label}
        <ChevronDown size={10} strokeWidth={2} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-3 bg-background/95 backdrop-blur-sm shadow-xl min-w-[180px] py-3 z-50">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              onClick={() => setOpen(false)}
              className="block px-5 py-2 font-sans text-[10px] tracking-[0.15em] uppercase text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Inline Collections dropdown (vertical style) ───────────────────────────
function CollectionsNav({ collections, label = 'Collections' }: { collections: any[], label?: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 font-sans text-[11px] tracking-[0.2em] uppercase text-background/80 hover:text-background transition-colors cursor-pointer"
      >
        {label}
        <ChevronDown size={10} strokeWidth={2} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-3 bg-background/95 backdrop-blur-sm shadow-xl min-w-[200px] py-3 z-50">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={col.href}
              onClick={() => setOpen(false)}
              className="block px-5 py-2 font-sans text-[10px] tracking-[0.15em] uppercase text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              {col.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
interface HomeHeader2Props {
  initialCategories: any[]
  initialCollections: any[]
  pageContent?: any
  uiStrings?: any
  globals?: any
}

export default function HomeHeader2({
  initialCategories = [],
  initialCollections = [],
  pageContent,
  uiStrings,
  globals
}: HomeHeader2Props) {
  const content = pageContent?.content || {}
  const sliderImages = [
    '/images/sliders/nouveautes.png',
    '/images/sliders/canapes.png',
    '/images/sliders/fauteuils.png',
    '/images/sliders/lits.png',
    '/images/sliders/meubles.png',
  ]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    if (sliderImages.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [sliderImages.length])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  return (
    <>
      <header className="w-full relative h-screen min-h-[600px] overflow-hidden bg-foreground">

        {/* ── Full-height slides ── */}
        {sliderImages.map((imageUrl: string, index: number) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
          >
            <Image
              src={imageUrl}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover object-center"
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-foreground/25" />
          </div>
        ))}

        {/* ── Top bar: logo centered, nav left, icons right — all at top ── */}
        <div className="absolute top-0 left-0 right-0 z-30 pt-8 md:pt-10">

          {/* Logo row — centered */}
          <div className="flex justify-center pointer-events-none">
            <Link href="/" className="relative block h-[62px] md:h-[88px] w-[158px] md:w-[211px] pointer-events-auto">
              <Image
                src="/images/logo.png"
                alt="Interloft"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Nav + Icons row — directly below logo */}
          <div className="flex items-start justify-between px-8 md:px-12 mt-6 md:mt-8">

            {/* Left: vertical nav (desktop) / Menu button (mobile) */}
            <nav className="hidden md:flex flex-col gap-4">
              <Link
                href="/introduction"
                className="font-sans text-[11px] tracking-[0.2em] uppercase text-background/80 hover:text-background transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {uiStrings?.nav_intro || content.nav_about || 'Introduction'}
              </Link>
              <ProduitsNav categories={initialCategories} label={uiStrings?.nav_products} />
              <CollectionsNav collections={initialCollections} label={uiStrings?.nav_collections} />
              <Link
                href="/collaborations"
                className="font-sans text-[11px] tracking-[0.2em] uppercase text-background/80 hover:text-background transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {uiStrings?.nav_collabs || content.nav_collaborations || 'Collaborations'}
              </Link>
              <Link
                href="/contact"
                className="font-sans text-[11px] tracking-[0.2em] uppercase text-background/80 hover:text-background transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {uiStrings?.nav_contact || 'Contact'}
              </Link>
            </nav>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden font-sans text-[11px] tracking-[0.2em] uppercase text-background/80 hover:text-background transition-colors cursor-pointer"
              aria-label="Ouvrir le menu"
            >
              Menu
            </button>

            {/* Right: icons */}
            <div className="flex items-center gap-5 pointer-events-auto">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Rechercher"
                className="text-background/80 hover:text-background transition-colors cursor-pointer"
              >
                <Search size={16} strokeWidth={1.5} />
              </button>
              <Link
                href="/compte"
                aria-label="Compte"
                className="text-background/80 hover:text-background transition-colors"
              >
                <User size={16} strokeWidth={1.5} />
              </Link>
            </div>

          </div>
        </div>

      </header>

      {/* ── Standard Footer ── */}
      <FooterV2Client globals={globals} />

      {/* ── Search Modal ── */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`fixed inset-0 z-50 flex flex-col justify-center items-center transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        style={{ backgroundColor: 'var(--color-mobile-menu)' }}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-6 text-foreground/60 hover:text-foreground transition-colors"
          aria-label="Fermer le menu"
        >
          <X size={28} strokeWidth={1} />
        </button>
        <nav className="flex flex-col items-center gap-8">
          <Link
            href="/introduction"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-3xl font-light tracking-widest uppercase text-foreground hover:opacity-50 transition-opacity"
          >
            {uiStrings?.nav_intro || 'Introduction'}
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-3xl font-light tracking-widest uppercase text-foreground hover:opacity-50 transition-opacity"
          >
            {uiStrings?.nav_products || 'Produits'}
          </Link>
          <Link
            href="/collections/beldi"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-3xl font-light tracking-widest uppercase text-foreground hover:opacity-50 transition-opacity"
          >
            {uiStrings?.nav_collections || 'Collections'}
          </Link>
          <Link
            href="/collaborations"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-3xl font-light tracking-widest uppercase text-foreground hover:opacity-50 transition-opacity"
          >
            {uiStrings?.nav_collabs || 'Collaborations'}
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-3xl font-light tracking-widest uppercase text-foreground hover:opacity-50 transition-opacity"
          >
            {uiStrings?.nav_contact || 'Contact'}
          </Link>
        </nav>
      </div>
    </>
  )
}
