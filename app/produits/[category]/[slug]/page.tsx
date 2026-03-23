import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar'
import FooterV2 from '@/components/footer-v2'
import { getProductBySlug, getCategoryBySlug, getProducts, getGlobalSettings } from '@/lib/data-client'

export async function generateStaticParams() {
  const { products } = await getProducts(1, 1000)
  return products.map((p: { category: string; slug: string }) => ({
    category: p.category,
    slug: p.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'INTERloft' }
  return {
    title: `${product.name} — INTERloft`,
    description: product.description,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category: categorySlug, slug } = await params
  const [product, category, globals] = await Promise.all([
    getProductBySlug(slug),
    getCategoryBySlug(categorySlug),
    getGlobalSettings()
  ])

  if (!product || !category) notFound()

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            image: product.image,
            description: product.description,
            sku: product.id,
            brand: {
              '@type': 'Brand',
              name: 'INTERloft',
            },
          }),
        }}
      />

      {/* Product Layout */}
      <div className="pt-24 min-h-screen flex flex-col lg:flex-row">
        {/* Image - Full height on desktop */}
        <div className="lg:w-2/3 lg:sticky lg:top-0 lg:h-screen">
          <div className="relative h-[60vh] lg:h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>
        </div>

        {/* Info Panel */}
        <div className="lg:w-1/3 px-6 md:px-12 lg:px-10 py-12 lg:py-16 flex flex-col">
          <div className="flex-1">
            {/* Back link */}
            <Link
              href={`/produits/${category.slug}`}
              className="inline-block font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-12"
            >
              ← {category.label}
            </Link>

            {/* Name */}
            <h1 className="font-serif text-[clamp(2rem,3vw,2.5rem)] font-light text-foreground leading-tight mb-8">
              {product.name}
            </h1>

            {/* Description */}
            <p className="font-sans text-sm leading-relaxed text-muted-foreground mb-12">
              {product.description}
            </p>

            {/* Details */}
            <div className="space-y-8 mb-12">
              <div>
                <p className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                  {globals.ui_strings?.lbl_materials || 'Matériaux'}
                </p>
                <ul className="space-y-1">
                  {product.materials?.map((m: string, i: number) => (
                    <li key={i} className="font-sans text-sm text-foreground">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                  {globals.ui_strings?.lbl_dimensions || 'Dimensions'}
                </p>
                <p className="font-sans text-sm text-foreground">
                  {product.dimensions}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="block w-full text-center font-sans text-xs tracking-[0.2em] uppercase text-primary-foreground bg-primary py-4 hover:opacity-80 transition-opacity"
          >
            {globals.ui_strings?.btn_quote || 'Demander informations'}
          </Link>
        </div>
      </div>

      <FooterV2 />
    </div>
  )
}
