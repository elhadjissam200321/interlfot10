import { IDataProvider } from '../data-provider'
import { Product, Category, Collection } from '../data'

// Ensure this matches your WordPress server URL
const WP_GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL || 'https://demo.interloft.ma/graphql'

/**
 * Universal fetcher for GraphQL queries.
 * Handles network requests, error states, and Next.js caching configurations.
 */
async function fetchGraphQL(query: string, variables = {}) {
    try {
        const res = await fetch(WP_GRAPHQL_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, variables }),
            // Utilize Next.js caching features if desired:
            // next: { revalidate: 60 } 
        })

        const json = await res.json()
        if (json.errors) {
            console.error('[WPGraphQL] Errors:', json.errors)
            throw new Error('Failed to fetch GraphQL API')
        }
        return json.data
    } catch (e) {
        console.warn('[WPGraphQL] Fetch Exception:', e)
        return null
    }
}

/**
 * Maps the raw WPGraphQL Product node to the internal Next.js `Product` type
 */
function mapProductNode(node: any): any {
    return {
        id: node.id || node.databaseId?.toString(),
        slug: node.slug,
        name: node.title,
        category: node.productCategories?.nodes?.[0]?.slug || 'nouveautes',
        description: node.content || node.excerpt || '',
        // Assuming ACF or standard fields are mapping here
        materials: node.acfProductFields?.materials ? node.acfProductFields.materials.split(',') : [],
        dimensions: node.acfProductFields?.dimensions || '',
        image: node.featuredImage?.node?.sourceUrl || '/images/placeholder.jpg',
        gallery: node.acfProductFields?.gallery?.map((img: any) => img.sourceUrl) || []
    }
}

export const WPGraphQLProvider: IDataProvider = {
    async getProducts(page = 1, pageSize = 12) {
        const query = `
            query GetProducts($first: Int!) {
                products(first: $first) {
                    pageInfo { total }
                    nodes {
                        databaseId
                        slug
                        title
                        content
                        featuredImage { node { sourceUrl } }
                        productCategories { nodes { slug name } }
                        acfProductFields { materials dimensions }
                    }
                }
            }
        `
        const data = await fetchGraphQL(query, { first: pageSize }) // Real pagination uses cursors, but simulated here.
        if (!data?.products?.nodes) return { products: [], total: 0 }

        return {
            products: data.products.nodes.map(mapProductNode),
            total: data.products.pageInfo?.total || data.products.nodes.length
        }
    },

    async getProductsByCategory(categorySlug, page = 1, pageSize = 12) {
        const query = `
            query GetProductsByCategory($category: String!, $first: Int!) {
                products(where: { category: $category }, first: $first) {
                    nodes {
                        databaseId
                        slug
                        title
                        content
                        featuredImage { node { sourceUrl } }
                        productCategories { nodes { slug name } }
                        acfProductFields { materials dimensions }
                    }
                }
            }
        `
        const data = await fetchGraphQL(query, { category: categorySlug, first: pageSize })
        if (!data?.products?.nodes) return { products: [], total: 0 }

        return {
            products: data.products.nodes.map(mapProductNode),
            total: data.products.nodes.length
        }
    },

    async getProductBySlug(slug) {
        const query = `
            query GetProductBySlug($id: ID!) {
                product(id: $id, idType: SLUG) {
                    databaseId
                    slug
                    title
                    content
                    featuredImage { node { sourceUrl } }
                    productCategories { nodes { slug } }
                    acfProductFields { materials dimensions gallery { sourceUrl } }
                }
            }
        `
        const data = await fetchGraphQL(query, { id: slug })
        if (!data?.product) return null
        return mapProductNode(data.product)
    },

    async getCategories() {
        const query = `
            query GetCategories {
                productCategories(where: { hideEmpty: false }) {
                    nodes {
                        databaseId
                        slug
                        name
                        acfCategoryFields { image { sourceUrl } }
                    }
                }
            }
        `
        const data = await fetchGraphQL(query)
        if (!data?.productCategories?.nodes) return []

        return data.productCategories.nodes.map((node: any) => ({
            id: node.slug,
            label: node.name,
            image: node.acfCategoryFields?.image?.sourceUrl || '/images/placeholder.jpg',
            href: `/products/${node.slug}`
        }))
    },

    async getCategoryBySlug(slug) {
        const categories = await this.getCategories()
        return categories.find((c: any) => c.id === slug) || null
    },

    async getCollections() {
        const query = `
            query GetCollections {
                collections(first: 20) {
                    nodes {
                        databaseId
                        slug
                        title
                        content
                    }
                }
            }
        `
        const data = await fetchGraphQL(query)
        if (!data?.collections?.nodes) return []

        return data.collections.nodes.map((node: any) => ({
            id: node.slug,
            label: node.title,
            description: node.content || '',
            href: `/collections/${node.slug}`
        }))
    },

    async getCollectionBySlug(slug) {
        const collections = await this.getCollections()
        return collections.find((c: any) => c.id === slug) || null
    },

    async getCollaborators() {
        const query = `
            query GetCollaborators {
                collaborators(first: 50) {
                    nodes {
                        databaseId
                        slug
                        title
                        content
                        featuredImage { node { sourceUrl } }
                        acfCollaboratorFields {
                            profession
                            city
                            collaborationStory
                            email
                            website
                            expertise
                            featuredProject { name description image { sourceUrl } }
                            projects { title location description image { sourceUrl } }
                        }
                    }
                }
            }
        `
        const data = await fetchGraphQL(query)
        if (!data?.collaborators?.nodes) return []

        return data.collaborators.nodes.map((node: any) => ({
            id: node.databaseId || node.slug,
            slug: node.slug,
            name: node.title,
            description: node.content,
            image: node.featuredImage?.node?.sourceUrl || '/images/placeholder.jpg',
            profession: node.acfCollaboratorFields?.profession || '',
            city: node.acfCollaboratorFields?.city || '',
            collaboration_story: node.acfCollaboratorFields?.collaborationStory || '',
            email: node.acfCollaboratorFields?.email || '',
            website: node.acfCollaboratorFields?.website || '',
            expertise: node.acfCollaboratorFields?.expertise?.split(',') || [],
            featured_project: node.acfCollaboratorFields?.featuredProject ? {
                name: node.acfCollaboratorFields.featuredProject.name,
                description: node.acfCollaboratorFields.featuredProject.description,
                image: node.acfCollaboratorFields.featuredProject.image?.sourceUrl || ''
            } : null,
            projects: node.acfCollaboratorFields?.projects?.map((p: any) => ({
                title: p.title,
                location: p.location,
                description: p.description,
                image: p.image?.sourceUrl || ''
            })) || []
        }))
    },

    async getCollaboratorBySlug(slug) {
        const collaborators = await this.getCollaborators()
        return collaborators.find((c: any) => c.slug === slug) || null
    },

    async getOtherCollaborators(currentSlug, limit = 3) {
        const collabs = await this.getCollaborators()
        return collabs.filter((c: any) => c.slug !== currentSlug).slice(0, limit)
    },

    async getPageContent(id) {
        const query = `
            query GetPageByUri($id: ID!) {
                page(id: $id, idType: URI) {
                    title
                    content
                    acfPageFields { 
                        subtitle
                        homeSliderImages {
                            nodes {
                                sourceUrl
                            }
                        }
                    }
                }
            }
        `
        const data = await fetchGraphQL(query, { id })
        if (!data?.page) return null

        const slider_images = data.page.acfPageFields?.homeSliderImages?.nodes?.map((n: any) => n.sourceUrl) || [
            'https://images.unsplash.com/photo-1618220179428-22790b46a013?q=80&w=2727&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2670&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2727&auto=format&fit=crop'
        ]

        return {
            id,
            title: data.page.title,
            subtitle: data.page.acfPageFields?.subtitle || '',
            description: '',
            content: { main_text: data.page.content },
            slider_images
        }
    },

    async getGlobalSettings() {
        const query = `
            query GetGlobalSettings {
                acfOptionsGlobalSettings {
                    globalSettings {
                        phone
                        email
                        instagram
                        showrooms
                        footerText
                        uiStrings {
                            navIntro
                            navProducts
                            navCollections
                            navCollabs
                            navContact
                            btnQuote
                            lblMaterials
                            lblDimensions
                            lblEmptyCollection
                            lblAllCollections
                            btnViewCollab
                        }
                    }
                }
            }
        `
        const data = await fetchGraphQL(query)
        const settings = data?.acfOptionsGlobalSettings?.globalSettings

        return {
            phone: settings?.phone || '+212 660-252070',
            email: settings?.email || 'contact@interloft.ma',
            instagram: settings?.instagram || 'https://instagram.com/interloft',
            showrooms: settings?.showrooms ? settings.showrooms.split('\\n') : ['Casablanca, Maroc', 'Marrakech, Maroc'],
            footer_text: settings?.footerText || 'Interloft',
            ui_strings: {
                nav_intro: settings?.uiStrings?.navIntro || 'Introduction',
                nav_products: settings?.uiStrings?.navProducts || 'Produits',
                nav_collections: settings?.uiStrings?.navCollections || 'Collections',
                nav_collabs: settings?.uiStrings?.navCollabs || 'Collaborations',
                nav_contact: settings?.uiStrings?.navContact || 'Contact',
                btn_quote: settings?.uiStrings?.btnQuote || 'Demander un devis',
                lbl_materials: settings?.uiStrings?.lblMaterials || 'Matériaux',
                lbl_dimensions: settings?.uiStrings?.lblDimensions || 'Dimensions',
                lbl_empty_collection: settings?.uiStrings?.lblEmptyCollection || 'Collection à venir',
                lbl_all_collections: settings?.uiStrings?.lblAllCollections || 'Toutes les collections',
                btn_view_collab: settings?.uiStrings?.btnViewCollab || 'Voir la collaboration'
            }
        }
    }
}

