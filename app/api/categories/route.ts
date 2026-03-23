import { getCategories } from '@/lib/data-client'

export async function GET() {
    try {
        const categories = await getCategories()
        const formatted = categories.slice(0, 6).map((c: any) => ({
            id: c.slug || c.id,
            label: c.label,
            image: c.image,
            href: (c.href || '').replace('/products', '/produits') || `/produits/${c.slug || c.id}`
        }))
        return Response.json(formatted)
    } catch (e) {
        console.error('Categories API fallback error:', e)
        return Response.json([])
    }
}

