import HomeHeader2 from '@/components/home/home-header-2'
import { getCategories, getCollections, getPageContent, getGlobalSettings } from '@/lib/data-client'

export default async function Home() {
  const [categories, collections, page, globals] = await Promise.all([
    getCategories(),
    getCollections(),
    getPageContent('accueil'),
    getGlobalSettings()
  ])

  return (
    <main>
      <HomeHeader2
        initialCategories={categories}
        initialCollections={collections}
        pageContent={page}
        uiStrings={globals.ui_strings}
        globals={globals}
      />
    </main>
  )
}
