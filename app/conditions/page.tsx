import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import FooterV2 from '@/components/footer-v2'
import { getPageContent } from '@/lib/data-client'

export const metadata: Metadata = {
  title: 'Conditions Générales | INTERloft',
  description: 'Conditions générales de vente et d\'utilisation du site INTERloft.',
}

export default async function ConditionsPage() {
  const page = await getPageContent('conditions')

  const title = page?.title || 'Conditions Générales'
  const updatedAt = page?.subtitle || 'Mars 2026'
  const content = page?.content || {}

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
            {content.main_text ? (
              content.main_text.split('\n\n').map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))
            ) : (
              <>
                <section>
                  <h2 className="font-serif text-2xl font-light mb-4">1. Acceptation des conditions</h2>
                  <p>
                    En accédant et en utilisant le site web d'INTERloft, vous acceptez sans réserve ces Conditions Générales et toutes les lois et réglementations applicables. Si vous n'acceptez pas ces conditions, vous devez cesser d'utiliser ce site immédiatement.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl font-light mb-4">2. Licence d'utilisation</h2>
                  <p>
                    INTERloft vous accorde une licence limitée, non exclusive et révocable pour utiliser ce site à titre personnel et non commercial. Vous ne pouvez pas :
                  </p>
                  <ul className="space-y-2 mt-3 list-disc list-inside">
                    <li>Modifier ou copier le contenu</li>
                    <li>Utiliser le contenu à des fins commerciales</li>
                    <li>Transférer les droits d'accès à des tiers</li>
                    <li>Contourner ou désactiver des mesures de sécurité</li>
                    <li>Mener des attaques de phishing ou de piratage</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-serif text-2xl font-light mb-4">3. Propriété intellectuelle</h2>
                  <p>
                    Tout le contenu du site (textes, images, vidéos, designs, codes) est la propriété exclusive d'INTERloft ou de ses fournisseurs, protégé par les lois sur les droits d'auteur et la propriété intellectuelle. Toute utilisation non autorisée est strictement interdite.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl font-light mb-4">4. Produits et services</h2>
                  <p className="mb-4">
                    INTERloft se réserve le droit de :
                  </p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Modifier ou discontinuer des produits/services sans préavis</li>
                    <li>Corriger les erreurs ou les imprécisions sur le site</li>
                    <li>Refuser ou annuler toute commande</li>
                    <li>Limiter les quantités de produits</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-serif text-2xl font-light mb-4">5. Commandes et paiements</h2>
                  <p className="mb-4">
                    <strong>Processus de commande :</strong> Une commande ne devient ferme qu'après confirmation par INTERloft. Les prix affichés sont en dirham marocain (MAD) et incluent les taxes applicables.
                  </p>
                  <p className="mb-4">
                    <strong>Paiement :</strong> Nous acceptons les paiements par carte bancaire, virement et autres méthodes spécifiées. Le paiement doit être effectué avant la livraison.
                  </p>
                  <p>
                    <strong>Factures :</strong> Une facture sera émise pour chaque commande confirmée.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl font-light mb-4">6. Livraison</h2>
                  <p className="mb-4">
                    <strong>Zones de livraison :</strong> Nous livrons au Maroc et à l'international selon les conditions spécifiées lors de la commande.
                  </p>
                  <p className="mb-4">
                    <strong>Délais :</strong> Les délais de livraison sont des estimations et ne constituent pas des engagements fermes. INTERloft ne sera pas responsable des retards indépendants de sa volonté.
                  </p>
                  <p>
                    <strong>Frais de livraison :</strong> Les frais de livraison sont calculés et affichés avant la validation de votre commande.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl font-light mb-4">7. Retours et remboursements</h2>
                  <p className="mb-4">
                    <strong>Délai de rétractation :</strong> Vous avez 14 jours à compter de la réception de votre commande pour exercer votre droit de rétractation.
                  </p>
                  <p className="mb-4">
                    <strong>Conditions :</strong> Le produit doit être dans son état original, non utilisé et avec tous les emballages et documents.
                  </p>
                  <p>
                    <strong>Remboursement :</strong> Les remboursements seront traités dans un délai de 30 jours après réception et inspection de l'article retourné.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl font-light mb-4">8. Limitation de responsabilité</h2>
                  <p>
                    INTERloft ne sera pas responsable des dommages directs, indirects, accessoires ou consécutifs résultant de l'utilisation ou de l'incapacité à utiliser ce site ou ses services, y compris les pertes de revenus, les interruptions commerciales ou les pertes de données.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl font-light mb-4">9. Exonération de responsabilité</h2>
                  <p>
                    Le site et son contenu sont fournis « en l'état » sans garantie. INTERloft ne garantit pas que le site sera ininterrompu, sécurisé ou exempt d'erreurs.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl font-light mb-4">10. Lien vers des sites tiers</h2>
                  <p>
                    Notre site peut contenir des liens vers des sites tiers. INTERloft n'est pas responsable du contenu, de la précision ou des pratiques de ces sites externes. L'utilisation de ces sites est à votre propre risque.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl font-light mb-4">11. Confidentialité et données</h2>
                  <p>
                    Votre utilisation du site est également régie par notre Politique de Confidentialité. Veuillez la lire attentivement pour comprendre nos pratiques en matière de gestion des données.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl font-light mb-4">12. Modification des conditions</h2>
                  <p>
                    INTERloft se réserve le droit de modifier ces Conditions Générales à tout moment. Les modifications entrent en vigueur dès leur publication. L'utilisation continue du site après les modifications constitue votre acceptation des nouvelles conditions.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl font-light mb-4">13. Loi applicable et juridiction</h2>
                  <p>
                    Ces Conditions Générales sont régies par les lois du Maroc. Tout litige découlant de ces conditions sera soumis à la juridiction exclusive des tribunaux marocains.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl font-light mb-4">14. Contact</h2>
                  <p>
                    Pour toute question concernant ces Conditions Générales, veuillez nous contacter :
                  </p>
                  <div className="mt-4 p-4 border-l-2 border-foreground/20">
                    <p><strong>Email :</strong> contact@interloft.ma</p>
                    <p><strong>Téléphone :</strong> +212 660-252070</p>
                    <p><strong>Adresse :</strong> Casablanca, Maroc</p>
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </section>
      <FooterV2 />
    </main>
  )
}
