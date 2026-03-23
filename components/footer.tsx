import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <p className="font-serif text-2xl tracking-[0.12em] uppercase font-light text-foreground mb-4">
            INTERloft
          </p>
          <p className="font-sans text-sm leading-relaxed text-muted-foreground max-w-xs">
            Mobilier contemporain pour des intérieurs modernes. Design minimaliste, matériaux de qualité, confort élégant.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="label-text mb-6">Navigation</p>
          <nav className="flex flex-col gap-3">
            {[
              { label: 'À propos', href: '/about' },
              { label: 'Produits', href: '/products' },
              { label: 'Collections', href: '/collections/beldi' },
              { label: 'Collaborations', href: '/collaborations' },
              { label: 'Contact', href: '/contact' },
              { label: 'Accueil 2', href: '/accueil-2' },
              { label: 'Accueil 3', href: '/accueil-3' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <p className="label-text mb-6">Contact</p>
          <div className="flex flex-col gap-3">
            <p className="font-sans text-sm text-muted-foreground">+212 660-252070</p>
            <a
              href="mailto:contact@interloft.ma"
              className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              contact@interloft.ma
            </a>
            <p className="font-sans text-sm text-muted-foreground mt-2">
              Casablanca, Maroc<br />
              Marrakech, Maroc
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
          © {new Date().getFullYear()} INTERloft. Tous droits réservés.
        </p>
        <p className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
          Mobilier Contemporain — Maroc
        </p>
      </div>
    </footer>
  )
}
