import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import FooterV2 from '@/components/footer-v2'
import { getPageContent } from '@/lib/data-client'

export const metadata: Metadata = {
  title: 'Introduction | INTERloft',
  description: 'Découvrez l\'histoire et la vision d\'INTERloft, maison de design contemporain fondée à Casablanca en 2015.',
}

export default async function Introduction() {
  const page = await getPageContent('about')

  const title = page?.title || 'Introduction'
  const subtitle = page?.subtitle || 'FONDÉE 2015'
  const description = page?.description || 'DIRECTRICE GÉNÉRALE ET CRÉATIVE : LEILA BOUTALEB'
  const content = page?.content || {}

  return (
    <main>
      <Navbar />
      <section id="about" className="w-full py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-background">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16 md:mb-24">
            <p className="label-text mb-6">{subtitle}</p>
            <p className="label-text mb-4">{description}</p>
          </div>

          {/* Main text - All caps, paragraphs */}
          <div className="space-y-8 md:space-y-12 text-sm md:text-base leading-[1.8] font-sans text-foreground">
            {content.main_text ? (
              content.main_text.split('\n\n').map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))
            ) : (
              <>
                <p>
                  INTERLOFT EST UNE MAISON DE DESIGN CONTEMPORAIN FONDÉE À CASABLANCA EN 2015. LEILA BOUTALEB, DIRECTRICE GÉNÉRALE ET CRÉATIVE, SÉLECTIONNE AVEC SOIN CHAQUE PIÈCE DE MOBILIER ET D'OBJETS PRÉSENTÉS PAR INTERLOFT. SA PERSPECTIVE CURATORIALE EN MATIÈRE DE DESIGN, DE MEUBLES, D'ÉCLAIRAGE ET D'OBJETS PEUT ÊTRE DÉCRITE COMME INTEMPORELLE, LUXUEUSE ET MINIMALISTE, BIEN QU'ELLE ÉCHAPPE À TOUTE CATÉGORISATION FACILE. LES CLIENTS DU MONDE ENTIER VIENNENT À INTERLOFT POUR TROUVER DES PIÈCES EXCLUSIVES ET UNIQUES, TOUTES PRODUITES SELON LEURS SPÉCIFICATIONS.
                </p>

                <p>
                  INTERLOFT REPRÉSENTE UNE SÉLECTION DE DESIGNERS ET D'ARTISANS CONTEMPORAINS, DONT LES PIÈCES REFLÈTENT LA RICHESSE DU PATRIMOINE MAROCAIN COMBINÉE À UN LANGAGE DESIGN RÉSOLUMENT MODERNE. CHAQUE OBJET EST PENSÉ COMME UNE DÉCLARATION D'INTENTION, OÙ LA FORME ET LA FONCTION S'ENTRELACENT POUR CRÉER DES ESPACES QUI INSPIRENT LA CONTEMPLATION ET LE BIEN-ÊTRE.
                </p>

                <p>
                  LA MARQUE SUIT UNE PHILOSOPHIE DE CRÉATION ARTISANALE OÙ CHAQUE DÉTAIL EST MÉTICULEUSEMENT CONSIDÉRÉ. LES MATÉRIAUX SÉLECTIONNÉS — LIN NATUREL, BOIS MASSIFS, MÉTAUX NOBLES — SONT TRAVAILLÉS AVEC UNE RIGUEUR SANS COMPROMIS. LE RÉSULTAT EST UNE COLLECTION DE MEUBLES ET D'OBJETS QUI INCARNENT LA TIMELESSNESS, CONJUGUANT TRADITION ARTISANALE ET MINIMALISME CONTEMPORAIN.
                </p>

                <p>
                  INTERLOFT OFFRE UNE EXPÉRIENCE CURATORIALE PERSONNALISÉE À SES CLIENTS. PAR UN PROTOCOLE PRIVÉ ET SUR RENDEZ-VOUS, CHAQUE VISITEUR EST IMMERGÉ DANS L'UNIVERS ESTHÉTIQUE DE LA MAISON, DÉCOUVRANT DES PIÈCES QUI RÉSONNENT AVEC LEUR VISION PERSONNELLE DE L'HABITAT MODERNE.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
      <FooterV2 />
    </main>
  )
}
