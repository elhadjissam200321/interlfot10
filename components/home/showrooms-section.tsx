import Image from 'next/image'
import Link from 'next/link'

export default function ShowroomsSection() {
  return (
    <section className="w-full bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px]">
        {/* Image */}
        <div className="relative min-h-[320px] md:min-h-0 overflow-hidden">
          <Image
            src="/images/showroom.jpg"
            alt="Showroom INTERloft"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Content */}
        <div className="px-10 md:px-16 py-20 flex flex-col justify-center">
          <p className="label-text mb-8">Nos espaces</p>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,3.5rem)] font-light leading-tight text-foreground mb-12">
            Points de Vente
          </h2>

          <div className="space-y-8 mb-12">
            <div className="border-t border-border pt-6">
              <p className="font-serif text-xl font-light text-foreground mb-1">Casablanca</p>
              <p className="font-sans text-sm text-muted-foreground">Maroc</p>
            </div>
            <div className="border-t border-border pt-6">
              <p className="font-serif text-xl font-light text-foreground mb-1">Marrakech</p>
              <p className="font-sans text-sm text-muted-foreground">Maroc</p>
            </div>
          </div>

          <div className="space-y-2 mb-12">
            <p className="font-sans text-sm text-muted-foreground">
              <span className="text-foreground">Téléphone</span>&nbsp;&nbsp;
              +212 660-252070
            </p>
            <p className="font-sans text-sm text-muted-foreground">
              <span className="text-foreground">Email</span>&nbsp;&nbsp;
              contact@interloft.ma
            </p>
          </div>

          <Link
            href="/points-de-vente"
            className="inline-flex items-center gap-4 font-sans text-xs tracking-[0.2em] uppercase text-foreground hover:opacity-60 transition-opacity"
          >
            Découvrir nos showrooms
            <span className="w-10 h-px bg-foreground" />
          </Link>
        </div>
      </div>
    </section>
  )
}
