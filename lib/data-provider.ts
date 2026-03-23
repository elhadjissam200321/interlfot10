export interface IDataProvider {
    getProducts(page?: number, pageSize?: number): Promise<{ products: any[], total: number }>
    getProductsByCategory(category: string, page?: number, pageSize?: number): Promise<{ products: any[], total: number }>
    getProductBySlug(slug: string): Promise<any | null>
    getCategories(): Promise<any[]>
    getCategoryBySlug(slug: string): Promise<any | null>
    getCollections(): Promise<any[]>
    getCollectionBySlug(slug: string): Promise<any | null>
    getCollaborators(): Promise<any[]>
    getCollaboratorBySlug(slug: string): Promise<any | null>
    getOtherCollaborators(currentSlug: string, limit?: number): Promise<any[]>
    getPageContent(id: string): Promise<any>
    getGlobalSettings(): Promise<{
        phone: string
        email: string
        instagram: string
        showrooms: string[]
        footer_text: string
        ui_strings?: {
            nav_intro: string
            nav_products: string
            nav_collections: string
            nav_collabs: string
            nav_contact: string
            btn_quote: string
            lbl_materials: string
            lbl_dimensions: string
            lbl_empty_collection: string
            lbl_all_collections: string
            btn_view_collab: string
        }
    }>
}
