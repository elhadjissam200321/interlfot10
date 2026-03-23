import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar'
import FooterV2 from '@/components/footer-v2'
import FavoriteButton from '@/components/favorite-button'
import PaginationControls from '@/components/pagination-controls'
import { getCategoryBySlug, getProductsByCategory, getCategories, getGlobalSettings } from '@/lib/data-client'

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params
  const cat = await getCategoryBySlug(slug)
  if (!cat) return { title: 'INTERloft' }
  return {
    title: `${cat.label} — INTERloft`,
    description: `Découvrez notre collection de ${cat.label.toLowerCase()}.`,
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const { category: slug } = await params
  const { page: pageParam } = await searchParams
  const page = Math.max(1, parseInt(pageParam || '1', 10))

  const [category, globals] = await Promise.all([
    getCategoryBySlug(slug),
    getGlobalSettings()
  ])
  if (!category) notFound()

  const { products, total } = await getProductsByCategory(slug, page)
  const pageSize = 12
  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Minimal Header */}
      <div className="pt-28 pb-12 px-6 md:px-12 flex items-end justify-between">
        <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light text-foreground">
          {category.label}
        </h1>
        <Link
          href="/produits"
          className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors pb-2"
        >
          {globals.ui_strings?.lbl_all_collections || 'Toutes les collections'}
        </Link>
      </div>

      {/* Products Grid */}
      <div className="px-6 md:px-12 pb-24">
        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-sans text-sm text-muted-foreground">
              {globals.ui_strings?.lbl_empty_collection || 'Collection à venir'}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/produits/${category.id}/${product.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />

                    {/* Favorite Button */}
                    <div className="absolute top-4 right-4 z-20">
                      <FavoriteButton productId={product.id} />
                    </div>
                  </div>
                  <div className="pt-4">
                    <h2 className="font-serif text-lg font-light text-foreground">
                      {product.name}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <PaginationControls
                currentPage={page}
                totalPages={totalPages}
                baseUrl={`/produits/${slug}`}
              />
            )}
          </>
        )}
      </div>

      <FooterV2 />
    </div>
  )
}
