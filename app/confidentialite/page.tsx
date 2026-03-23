import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import FooterV2 from '@/components/footer-v2'
import { getPageContent } from '@/lib/data-client'

export const metadata: Metadata = {
  title: 'Confidentialité | INTERloft',
  description: 'Politique de confidentialité et protection des données personnelles chez INTERloft.',
}

export default async function ConfidentialitePage() {
  const page = await getPageContent('confidentialite')

  const title = page?.title || 'Politique de Confidentialité'
  const updatedAt = page?.subtitle || 'Mars 2026'

  return (
    <main>
      <Navbar />
      <section className="w-full py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-background">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16 md:mb-24">
            <h1 className="font-serif text-5xl md:text-6xl font-light text-foreground mb-8">
              {title}
            </h1>
            <p className="label-text text-muted-foreground">Dernière mise à jour : {updatedAt}</p>
          </div>

          {/* Content */}
          <div className="space-y-12 text-sm md:text-base leading-[1.8] font-sans text-foreground">
            <section>
              <h2 className="font-serif text-2xl font-light mb-4">Introduction</h2>
              <p>
                INTERloft (« nous », « notre » ou « la Société ») s'engage à protéger votre vie privée. Cette Politique de Confidentialité explique comment nous collectons, utilisons, divulguons et préservons vos informations lorsque vous visitez notre site web et utilisez nos services.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-light mb-4">1. Informations que nous collectons</h2>
              <p className="mb-4">
                Nous collectons des informations de plusieurs manières :
              </p>
              <ul className="space-y-3 list-disc list-inside">
                <li><strong>Informations directes :</strong> Nom, adresse e-mail, numéro de téléphone, adresse postale que vous fournissez via nos formulaires de contact ou d'inscription.</li>
                <li><strong>Informations de navigation :</strong> Adresse IP, type de navigateur, pages visitées, temps passé sur le site, source du trafic.</li>
                <li><strong>Cookies :</strong> Identifiants et données de préférences stockés sur votre appareil.</li>
                <li><strong>Informations transactionnelles :</strong> Détails d'achat, adresse de livraison, historique de commandes.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-light mb-4">2. Utilisation de vos informations</h2>
              <p className="mb-4">
                Nous utilisons les informations collectées pour :
              </p>
              <ul className="space-y-3 list-disc list-inside">
                <li>Fournir et améliorer nos services et produits</li>
                <li>Traiter vos commandes et effectuer les paiements</li>
                <li>Vous envoyer des mises à jour, promotions et communications marketing</li>
                <li>Répondre à vos demandes et questions</li>
                <li>Analyser l'utilisation du site pour améliorer l'expérience utilisateur</li>
                <li>Respecter les obligations légales et réglementaires</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-light mb-4">3. Partage de vos informations</h2>
              <p>
                Nous ne vendons, n'échangeons et ne louons pas vos informations personnelles à des tiers. Nous pouvons partager vos informations avec : nos partenaires de livraison, nos prestataires de paiement, nos partenaires marketing (avec votre consentement), et les autorités publiques si requises par la loi.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-light mb-4">4. Sécurité des données</h2>
              <p>
                Nous implémentons des mesures de sécurité techniques, administratives et physiques pour protéger vos informations personnelles contre l'accès non autorisé, la modification, la divulgation ou la destruction.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-light mb-4">5. Vos droits</h2>
              <p className="mb-4">
                Vous avez le droit de :
              </p>
              <ul className="space-y-3 list-disc list-inside">
                <li>Accéder à vos données personnelles</li>
                <li>Corriger les données inexactes</li>
                <li>Demander la suppression de vos données</li>
                <li>Vous opposer au traitement de vos données</li>
                <li>Demander la portabilité de vos données</li>
                <li>Retirer votre consentement à tout moment</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-light mb-4">6. Cookies et technologies similaires</h2>
              <p>
                Notre site utilise des cookies et technologies similaires pour améliorer votre expérience. Vous pouvez contrôler les cookies via les paramètres de votre navigateur. Consultez notre Politique Cookies pour plus de détails.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-light mb-4">7. Contact</h2>
              <p>
                Pour toute question concernant cette Politique de Confidentialité ou vos droits en matière de données personnelles, veuillez nous contacter à :
              </p>
              <div className="mt-4 p-4 border-l-2 border-foreground/20">
                <p><strong>Email :</strong> contact@interloft.ma</p>
                <p><strong>Téléphone :</strong> +212 660-252070</p>
                <p><strong>Adresse :</strong> Casablanca, Maroc</p>
              </div>
            </section>
          </div>
        </div>
      </section>
      <FooterV2 />
    </main>
  )
}
