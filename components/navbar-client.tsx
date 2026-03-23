'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Search, User, X } from 'lucide-react'
import ProductsDropdown from './products-dropdown'
import CollectionsDropdown from './collections-dropdown'
import MobileProductsMenu from './mobile-products-menu'
import MobileCollectionsMenu from './mobile-collections-menu'
import SearchModal from './search-modal'

export default function NavbarClient({ uiStrings }: { uiStrings?: any }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-border/60 backdrop-blur-sm"
        style={{ backgroundColor: 'var(--color-navbar)' }}
      >
        <div className="flex items-center justify-between px-6 md:px-12 h-16">
          {/* Logo */}
          <Link href="/" className="relative h-12 w-[134px]">
            <Image
              src="/images/logo.png"
              alt="Interloft"
              fill
              className="object-contain transition-all"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <Link
              href="/introduction"
              className="nav-link text-foreground/70 hover:text-foreground transition-colors"
            >
              {uiStrings?.nav_intro || 'Introduction'}
            </Link>

            <ProductsDropdown variant="dark" label={uiStrings?.nav_products} />

            <CollectionsDropdown variant="dark" label={uiStrings?.nav_collections} />

            <Link
              href="/collaborations"
              className="nav-link text-foreground/70 hover:text-foreground transition-colors"
            >
              {uiStrings?.nav_collabs || 'Collaborations'}
            </Link>

            <Link
              href="/contact"
              className="nav-link text-foreground/70 hover:text-foreground transition-colors"
            >
              {uiStrings?.nav_contact || 'Contact'}
            </Link>

            <div className="flex items-center gap-4 ml-4">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Rechercher"
                className="text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
              >
                <Search size={16} strokeWidth={1.5} />
              </button>
              <Link
                href="/compte"
                aria-label="Compte"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                <User size={16} strokeWidth={1.5} />
              </Link>
            </div>
          </nav>

          {/* Mobile right: search + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Rechercher"
              className="text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
            >
              <Search size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-1.5 p-1 text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
              aria-label="Menu"
            >
              <span className={`block w-6 h-px bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-px bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ backgroundColor: 'var(--color-mobile-menu)' }}
      >
        {/* Top bar with close */}
        <div className="flex items-center justify-between px-6 h-16 shrink-0">
          <div className="w-[134px]" />
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer le menu"
            className="text-foreground hover:opacity-50 transition-opacity p-1"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Nav links centered */}
        <div className="flex-1 flex flex-col justify-center items-center overflow-y-auto py-8">
          <nav className="flex flex-col items-center gap-8">
            <Link
              href="/introduction"
              onClick={() => setMenuOpen(false)}
              className="font-serif text-3xl font-light tracking-widest uppercase text-foreground hover:opacity-50 transition-opacity"
            >
              {uiStrings?.nav_intro || 'Introduction'}
            </Link>

            <MobileProductsMenu onLinkClick={() => setMenuOpen(false)} label={uiStrings?.nav_products} />

            <MobileCollectionsMenu onLinkClick={() => setMenuOpen(false)} label={uiStrings?.nav_collections} />

            <Link
              href="/collaborations"
              onClick={() => setMenuOpen(false)}
              className="font-serif text-3xl font-light tracking-widest uppercase text-foreground hover:opacity-50 transition-opacity"
            >
              {uiStrings?.nav_collabs || 'Collaborations'}
            </Link>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="font-serif text-3xl font-light tracking-widest uppercase text-foreground hover:opacity-50 transition-opacity"
            >
              {uiStrings?.nav_contact || 'Contact'}
            </Link>
          </nav>
        </div>

        {/* Bottom icons */}
        <div className="shrink-0 flex items-center justify-center gap-8 pb-10">
          <a
            href="https://wa.me/212660252070"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-foreground hover:opacity-50 transition-opacity"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
          <Link
            href="/compte"
            onClick={() => setMenuOpen(false)}
            aria-label="Compte"
            className="text-foreground hover:opacity-50 transition-opacity"
          >
            <User size={20} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </>
  )
}
