import { createClient } from './server'
import { categories as localCategories, products as localProducts, collections as localCollections } from '../data'
// Removed localCollaborators import after Phase 11 cleanup

const DEFAULT_PAGE_SIZE = 12

export async function getProducts(page: number = 1, pageSize: number = DEFAULT_PAGE_SIZE) {
    try {
        const supabase = await createClient()
        if (!supabase) return { products: [], total: 0 }
        const from = (page - 1) * pageSize
        const to = from + pageSize - 1
        const { data, error, count } = await supabase
            .from('products')
            .select('*', { count: 'exact' })
            .range(from, to)
            .order('created_at', { ascending: false })
        if (error || !data) throw error || new Error('No data')
        return { products: data, total: count || data.length }
    } catch (e) {
        console.warn('getProducts fallback triggered:', e instanceof Error ? e.message : 'Timeout')
        return { products: localProducts.slice(0, pageSize), total: localProducts.length }
    }
}

export async function getProductsByCategory(
    category: string,
    page: number = 1,
    pageSize: number = DEFAULT_PAGE_SIZE
) {
    try {
        const supabase = await createClient()
        if (!supabase) return { products: [], total: 0 }
        const from = (page - 1) * pageSize
        const to = from + pageSize - 1
        const { data, error, count } = await supabase
            .from('products')
            .select('*', { count: 'exact' })
            .eq('category', category)
            .range(from, to)
            .order('created_at', { ascending: false })
        if (error || !data) throw error || new Error('No data')
        return { products: data, total: count || data.length }
    } catch (e) {
        console.warn('getProductsByCategory fallback triggered:', e instanceof Error ? e.message : 'Timeout')
        const filtered = localProducts.filter(p => p.category === category)
        return { products: filtered.slice(0, pageSize), total: filtered.length }
    }
}

export async function getProductBySlug(slug: string) {
    try {
        const supabase = await createClient()
        if (!supabase) return null
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('slug', slug)
            .single()
        if (error || !data) throw error || new Error('No data')
        return data
    } catch (e) {
        console.warn('getProductBySlug fallback triggered:', e instanceof Error ? e.message : 'Timeout')
        return localProducts.find(p => p.slug === slug) || null
    }
}

export async function getCategories() {
    try {
        const supabase = await createClient()
        if (!supabase) return []
        const { data, error } = await supabase.from('categories').select('*')
        if (error || !data) throw error || new Error('No data')
        return data.map((c) => ({ ...c, slug: c.id }))
    } catch (e) {
        console.warn('getCategories fallback triggered:', e instanceof Error ? e.message : 'Timeout')
        return localCategories.map(c => ({ ...c, slug: c.id }))
    }
}

export async function getCategoryBySlug(slug: string) {
    try {
        const supabase = await createClient()
        if (!supabase) return null
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('id', slug)
            .single()
        if (error || !data) throw error || new Error('No data')
        return { ...data, slug: data.id }
    } catch (e) {
        console.warn('getCategoryBySlug fallback triggered:', e instanceof Error ? e.message : 'Timeout')
        const found = localCategories.find(c => c.id === slug)
        return found ? { ...found, slug: found.id } : null
    }
}

export async function getCollections() {
    try {
        const supabase = await createClient()
        if (!supabase) return []
        const { data, error } = await supabase.from('collections').select('*')
        if (error || !data) throw error || new Error('No data')
        return data.map((c) => ({ ...c, slug: c.id }))
    } catch (e) {
        console.warn('getCollections fallback triggered:', e instanceof Error ? e.message : 'Timeout')
        return localCollections.map(c => ({ ...c, slug: c.id }))
    }
}

export async function getCollectionBySlug(slug: string) {
    try {
        const supabase = await createClient()
        if (!supabase) return null
        const { data, error } = await supabase
            .from('collections')
            .select('*')
            .eq('id', slug)
            .single()
        if (error || !data) throw error || new Error('No data')
        return { ...data, slug: data.id }
    } catch (e) {
        console.warn('getCollectionBySlug fallback triggered:', e instanceof Error ? e.message : 'Timeout')
        const found = localCollections.find(c => c.id === slug)
        return found ? { ...found, slug: found.id } : null
    }
}

export async function getCollaborators() {
    try {
        const supabase = await createClient()
        if (!supabase) return []
        const { data, error } = await supabase
            .from('collaborators')
            .select('*')
            .order('created_at', { ascending: false })
        if (error || !data) throw error || new Error('No data')
        return data
    } catch (e) {
        console.warn('getCollaborators fallback triggered:', e instanceof Error ? e.message : 'Timeout')
        return []
    }
}

export async function getCollaboratorBySlug(slug: string) {
    try {
        const supabase = await createClient()
        if (!supabase) return null
        const { data, error } = await supabase
            .from('collaborators')
            .select('*')
            .eq('slug', slug)
            .single()
        if (error || !data) throw error || new Error('No data')
        return data
    } catch (e) {
        console.warn('getCollaboratorBySlug fallback triggered:', e instanceof Error ? e.message : 'Timeout')
        return null
    }
}

export async function getOtherCollaborators(currentSlug: string, limit: number = 3) {
    try {
        const supabase = await createClient()
        if (!supabase) return []
        const { data, error } = await supabase
            .from('collaborators')
            .select('*')
            .neq('slug', currentSlug)
            .limit(limit)
        if (error || !data) throw error || new Error('No data')
        return data
    } catch (e) {
        console.warn('getOtherCollaborators fallback triggered:', e instanceof Error ? e.message : 'Timeout')
        return []
    }
}

export async function getPageContent(id: string) {
    try {
        const supabase = await createClient()
        if (!supabase) return null
        const { data, error } = await supabase
            .from('pages_content')
            .select('*')
            .eq('id', id)
            .single()
        if (error || !data) throw error || new Error('No data')
        return data
    } catch (e) {
        console.warn('getPageContent fallback triggered:', e instanceof Error ? e.message : 'Timeout')
        // Fallback for page content (empty or standard defaults)
        return {
            id,
            title: id === 'accueil' ? 'Interloft Luxury' : id,
            content: {},
            slider_images: id === 'accueil' ? [
                'https://images.unsplash.com/photo-1618220179428-22790b46a013?q=80&w=2727&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2670&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2727&auto=format&fit=crop'
            ] : []
        }
    }
}

export async function getGlobalSettings() {
    return {
        phone: '+212 660-252070',
        email: 'contact@interloft.ma',
        instagram: 'https://instagram.com/interloft',
        showrooms: ['Casablanca (en cours)', 'Marrakech (en cours)', 'Rabat (en cours)'],
        footer_text: 'Interloft',
        ui_strings: {
            nav_intro: 'Introduction',
            nav_products: 'Produits',
            nav_collections: 'Collections',
            nav_collabs: 'Collaborations',
            nav_contact: 'Contact',
            btn_quote: 'Demander informations',
            lbl_materials: 'Matériaux',
            lbl_dimensions: 'Dimensions',
            lbl_empty_collection: 'Collection à venir',
            lbl_all_collections: 'Toutes les collections',
            btn_view_collab: 'Voir la collaboration'
        }
    }
}
