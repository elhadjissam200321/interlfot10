import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import FooterV2 from '@/components/footer-v2'

export const metadata = {
  title: 'Points de Vente — INTERloft',
  description: 'Retrouvez nos showrooms à Casablanca et Marrakech, Maroc.',
}

const showrooms = [
  {
    city: 'Casablanca',
    country: 'Maroc',
    address: 'Quartier des Affaires, Casablanca',
    hours: 'Lun – Sam, 10h – 19h',
    image: '/images/showroom.jpg',
  },
  {
    city: 'Marrakech',
    country: 'Maroc',
    address: 'Guéliz, Marrakech',
    hours: 'Lun – Sam, 10h – 19h',
    image: '/images/hero.jpg',
  },
]

export default function PointsDeVentePage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="pt-32 pb-16 px-6 md:px-12 border-b border-border">
        <p className="label-text mb-4">Nos espaces</p>
        <h1 className="font-serif text-[clamp(3rem,7vw,6rem)] font-light text-foreground leading-none">
          Points de Vente
        </h1>
      </div>

      {/* Showrooms */}
      <div className="px-6 md:px-12 py-20 space-y-24">
        {showrooms.map((showroom, index) => (
          <div
            key={showroom.city}
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'md:[direction:rtl]' : ''
            }`}
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-secondary" style={{ direction: 'ltr' }}>
              <Image
                src={showroom.image}
                alt={`Showroom ${showroom.city}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Info */}
            <div style={{ direction: 'ltr' }}>
              <p className="label-text mb-6">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light text-foreground leading-tight mb-2">
                {showroom.city}
              </h2>
              <p className="font-sans text-sm text-muted-foreground mb-10">{showroom.country}</p>

              <div className="space-y-6">
                <div className="border-t border-border pt-5">
                  <p className="label-text mb-2">Adresse</p>
                  <p className="font-sans text-sm text-muted-foreground">{showroom.address}</p>
                </div>
                <div className="border-t border-border pt-5">
                  <p className="label-text mb-2">Horaires</p>
                  <p className="font-sans text-sm text-muted-foreground">{showroom.hours}</p>
                </div>
                <div className="border-t border-border pt-5">
                  <p className="label-text mb-2">Contact</p>
                  <p className="font-sans text-sm text-muted-foreground">+212 660-252070</p>
                  <a
                    href="mailto:contact@interloft.ma"
                    className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    contact@interloft.ma
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-6 md:px-12 py-20 border-t border-border text-center">
        <p className="font-sans text-sm text-muted-foreground mb-8">
          Prenez rendez-vous pour une visite privée de nos showrooms.
        </p>
        <Link
          href="/contact"
          className="inline-block font-sans text-xs tracking-[0.3em] uppercase text-primary-foreground bg-primary px-10 py-4 hover:opacity-80 transition-opacity"
        >
          Prendre rendez-vous
        </Link>
      </div>

      <FooterV2 />
    </div>
  )
}
