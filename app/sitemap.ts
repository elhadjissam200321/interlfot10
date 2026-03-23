import { MetadataRoute } from 'next'
import { getProducts, getCategories, getCollaborators } from '@/lib/data-client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://interloftlux.com'

    // Static Routes
    const staticRoutes = [
        '',
        '/produits',
        '/collaborations',
        '/points-de-vente',
        '/introduction',
        '/contact',
        '/conditions',
        '/confidentialite',
        '/cookies'
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    try {
        // Dynamic Routes: Products
        const { products } = await getProducts(1, 1000)
        const productRoutes = products.map((product) => ({
            url: `${baseUrl}/produits/${product.category}/${product.slug}`,
            lastModified: new Date(product.created_at || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }))

        // Dynamic Routes: Categories
        const categories = await getCategories()
        const categoryRoutes = categories.map((cat) => ({
            url: `${baseUrl}/produits/${cat.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))

        // Dynamic Routes: Collaborations
        const collaborations = await getCollaborators()
        const collabRoutes = collaborations.map((collab) => ({
            url: `${baseUrl}/collaborations/${collab.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }))

        return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...collabRoutes]
    } catch (e) {
        console.error('Error generating sitemap dynamic routes:', e)
        return staticRoutes
    }
}
