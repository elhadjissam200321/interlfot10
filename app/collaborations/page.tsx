import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import FooterV2 from '@/components/footer-v2'
import { getCollaborators, getPageContent, getGlobalSettings } from '@/lib/data-client'

export const metadata: Metadata = {
  title: 'Collaborations | INTERloft',
  description: 'Découvrez nos collaborations avec des architectes et designers à travers le Maroc.',
}

export default async function CollaborationsPage() {
  const [collaborators, page, globals] = await Promise.all([
    getCollaborators(),
    getPageContent('collaborations'),
    getGlobalSettings()
  ])

  const title = page?.title || 'Collaborations'
  const subtitle = page?.subtitle || 'NOS PARTENAIRES CRÉATIFS'
  const description = page?.description || "Nous travaillons avec les meilleurs architectes et designers du Maroc pour créer des espaces d'exception. Découvrez les créatifs qui partagent notre vision."
  const content = page?.content || {}

  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      {/* Header Section */}
      <div className="pt-32 pb-16 px-8 md:px-16 lg:px-24 border-b border-border">
        <h1 className="font-serif text-[clamp(3rem,7vw,6rem)] font-light text-foreground leading-none">
          Collaborations
        </h1>
      </div>


      {/* Collaborators Grid */}
      <section className="w-full px-8 md:px-16 lg:px-24 pb-24 md:pb-32 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {collaborators.map((collaborator) => (
              <article
                key={collaborator.id}
                className="group"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-muted">
                  <Image
                    src={collaborator.image}
                    alt={collaborator.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <p className="label-text">{collaborator.profession}</p>
                  <h2 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-foreground">
                    {collaborator.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {collaborator.city}, Maroc
                  </p>
                  <Link
                    href={`/collaborations/${collaborator.slug}`}
                    className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase text-foreground hover:opacity-60 transition-opacity pt-2"
                  >
                    {globals.ui_strings?.btn_view_collab || 'Voir la collaboration'}
                    <span className="w-6 h-px bg-current transition-all group-hover:w-10" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FooterV2 />
    </main>
  )
}
