import Link from 'next/link'
import Image from 'next/image'
import { categories } from '@/lib/data'

export default function CategoriesSection() {
  // Feature first category large, rest in grid
  const [featured, ...rest] = categories

  return (
    <section className="w-full bg-secondary">
      <div className="px-6 md:px-12 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="label-text mb-3">Collections</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-foreground">
              Nos Produits
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden md:inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Voir tout
            <span className="w-8 h-px bg-current" />
          </Link>
        </div>

        {/* Featured category */}
        <Link href={featured.href} className="group block mb-4 relative overflow-hidden">
          <div className="relative w-full aspect-[16/7] overflow-hidden">
            <Image
              src={featured.image}
              alt={featured.label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 100vw"
            />
            <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors duration-500" />
            <div className="absolute bottom-8 left-8">
              <p className="label-text text-background/70 mb-2">01</p>
              <h3 className="font-serif text-3xl md:text-5xl font-light text-background tracking-wide">
                {featured.label}
              </h3>
            </div>
          </div>
        </Link>

        {/* Rest grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {rest.map((category, index) => (
            <Link
              key={category.id}
              href={category.href}
              className="group block relative overflow-hidden"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-accent">
                <Image
                  src={category.image}
                  alt={category.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-foreground/15 group-hover:bg-foreground/5 transition-colors duration-500" />
              </div>
              <div className="pt-4">
                <p className="label-text text-muted-foreground mb-1">
                  {String(index + 2).padStart(2, '0')}
                </p>
                <h3 className="font-serif text-base font-light text-foreground">
                  {category.label}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground"
          >
            Voir tout
            <span className="w-8 h-px bg-current" />
          </Link>
        </div>
      </div>
    </section>
  )
}
