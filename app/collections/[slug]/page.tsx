import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import FooterV2 from '@/components/footer-v2'
import { getCollectionBySlug, getCollections, getProducts } from '@/lib/data-client'

interface CollectionPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = await getCollectionBySlug(slug)

  if (!collection) {
    return { title: 'Collection non trouvée | INTERloft' }
  }

  return {
    title: `${collection.label} | INTERloft`,
    description: collection.description,
  }
}

export async function generateStaticParams() {
  const collections = await getCollections()
  return collections.map((collection) => ({
    slug: collection.slug,
  }))
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params
  const collection = await getCollectionBySlug(slug)

  if (!collection) {
    notFound()
  }

  const { products } = await getProducts(1, 4)
  const displayProducts = products

  const collections = await getCollections()

  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 md:mb-24">
            <p className="label-text mb-6">COLLECTION</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-foreground mb-8">
              {collection.label}
            </h1>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-2xl uppercase">
              {collection.description}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-full px-8 md:px-16 lg:px-24 pb-24 md:pb-32 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {displayProducts.map((product) => (
              <Link
                key={product.id}
                href={`/produits/${product.category}/${product.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-6">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
                  {product.category.replace(/-/g, ' ')}
                </p>
                <h3 className="font-serif text-xl md:text-2xl font-light tracking-wide text-foreground group-hover:opacity-60 transition-opacity">
                  {product.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other Collections */}
      <section className="w-full py-16 md:py-20 px-8 md:px-16 lg:px-24 bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-foreground mb-10 text-center">
            Autres Collections
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {collections
              .filter((c) => c.slug !== collection.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={c.href}
                  className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/60 hover:text-foreground transition-colors"
                >
                  {c.label}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <FooterV2 />
    </main>
  )
}
