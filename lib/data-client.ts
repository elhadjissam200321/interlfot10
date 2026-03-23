import { IDataProvider } from './data-provider'
import { WPGraphQLProvider } from './wordpress/graphql'
import * as SupabaseProvider from './supabase/queries'

// The active data provider is determined by the environment variable.
// Switch to 'true' in .env.local when WordPress Headless is fully populated.
const useWordPress = process.env.NEXT_PUBLIC_USE_WORDPRESS === 'true'

export const db: IDataProvider = useWordPress ? WPGraphQLProvider : SupabaseProvider

export const getProducts = db.getProducts.bind(db)
export const getProductsByCategory = db.getProductsByCategory.bind(db)
export const getProductBySlug = db.getProductBySlug.bind(db)
export const getCategories = db.getCategories.bind(db)
export const getCategoryBySlug = db.getCategoryBySlug.bind(db)
export const getCollections = db.getCollections.bind(db)
export const getCollectionBySlug = db.getCollectionBySlug.bind(db)
export const getCollaborators = db.getCollaborators.bind(db)
export const getCollaboratorBySlug = db.getCollaboratorBySlug.bind(db)
export const getOtherCollaborators = db.getOtherCollaborators.bind(db)
export const getPageContent = db.getPageContent.bind(db)
export const getGlobalSettings = db.getGlobalSettings.bind(db)
