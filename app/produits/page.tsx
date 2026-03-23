import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import FooterV2 from '@/components/footer-v2'
import { getCategories } from '@/lib/data-client'

export const metadata = {
  title: 'Produits — INTERloft',
  description: 'Découvrez toutes nos collections de mobilier contemporain.',
}

export default async function ProductsPage() {
  const categories = await getCategories()
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Minimal Header */}
      <div className="pt-28 pb-12 px-6 md:px-12">
        <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light text-foreground">
          Collections
        </h1>
      </div>

      {/* Clean Grid */}
      <div className="px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative aspect-[4/3] overflow-hidden bg-secondary"
            >
              <Image
                src={category.image}
                alt={category.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors duration-500" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="font-serif text-2xl md:text-3xl font-light text-background">
                  {category.label}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <FooterV2 />
    </div>
  )
}
