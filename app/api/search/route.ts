import { getProducts, getCategories } from '@/lib/data-client'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const query = searchParams.get('q')?.trim()

        if (!query) {
            return Response.json({ products: [], categories: [] })
        }

        const normalizedQuery = query.toLowerCase()

        // Fetch full sets using fallback mechanisms safely
        const [productsResult, categoriesResult] = await Promise.all([
            getProducts(1, 1000),
            getCategories()
        ])

        // Fallback filter manually (since the generic query does not support direct full-text search strings easily)
        const matchedProducts = productsResult.products.filter((p: any) =>
            p.name.toLowerCase().includes(normalizedQuery) ||
            p.description.toLowerCase().includes(normalizedQuery) ||
            p.category.toLowerCase().includes(normalizedQuery)
        ).slice(0, 6).map((p: any) => ({
            id: p.id,
            slug: p.slug,
            name: p.name,
            category: p.category,
            image: p.image
        }))

        const matchedCategories = categoriesResult.filter((c: any) =>
            c.label.toLowerCase().includes(normalizedQuery)
        ).map((c: any) => ({
            id: c.slug || c.id,
            label: c.label,
            image: c.image
        }))

        return Response.json({
            products: matchedProducts,
            categories: matchedCategories,
        })
    } catch (e) {
        console.error('Search API error:', e)
        return Response.json({ products: [], categories: [] })
    }
}
