import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import FooterV2 from '@/components/footer-v2'
import { getPageContent } from '@/lib/data-client'

export const metadata: Metadata = {
  title: 'Politique Cookies | INTERloft',
  description: 'Politique de gestion des cookies et technologies de suivi chez INTERloft.',
}

export default async function CookiesPage() {
  const page = await getPageContent('cookies')

  const title = page?.title || 'Politique Cookies'
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
              <h2 className="font-serif text-2xl font-light mb-4">Qu'est-ce qu'un cookie ?</h2>
              <p>
                Un cookie est un petit fichier texte stocké sur votre appareil lors de votre visite sur notre site. Les cookies nous aident à mémoriser vos préférences, à analyser votre comportement de navigation et à améliorer votre expérience utilisateur.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-light mb-4">Types de cookies que nous utilisons</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg font-light mb-2">Cookies essentiels</h3>
                  <p>
                    Ces cookies sont nécessaires au fonctionnement du site et à la sécurité. Ils permettent l'authentification et la protection contre les frauds. Vous ne pouvez pas les désactiver.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-light mb-2">Cookies de performance</h3>
                  <p>
                    Nous utilisons ces cookies pour analyser comment vous utilisez notre site (pages visitées, temps passé, erreurs). Ces données nous aident à améliorer les performances du site.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-light mb-2">Cookies marketing</h3>
                  <p>
                    Ces cookies enregistrent votre comportement de navigation pour vous offrir des publicités ciblées et du contenu personnalisé, tant sur notre site que sur d'autres plateformes.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-light mb-2">Cookies de préférences</h3>
                  <p>
                    Nous utilisons ces cookies pour mémoriser vos choix (langue, région, paramètres) afin de personnaliser votre expérience.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-light mb-4">Technologies similaires aux cookies</h2>
              <p>
                En plus des cookies, nous pouvons utiliser des pixels de suivi, des balises web et des technologies similaires pour collecter des informations sur votre visite et votre activité en ligne.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-light mb-4">Contrôle des cookies</h2>
              <p className="mb-4">
                Vous avez le contrôle sur les cookies. Vous pouvez :
              </p>
              <ul className="space-y-3 list-disc list-inside">
                <li><strong>Accepter ou refuser les cookies :</strong> Utilisez notre banneau de consentement lors de votre première visite.</li>
                <li><strong>Modifier vos préférences :</strong> Allez dans les paramètres de votre navigateur pour activer/désactiver les cookies.</li>
                <li><strong>Supprimer les cookies :</strong> Vous pouvez supprimer tous les cookies stockés à tout moment via votre navigateur.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-light mb-4">Impact du refus des cookies</h2>
              <p>
                Si vous refusez les cookies essentiels, certaines fonctionnalités du site peuvent ne pas fonctionner correctement. Le refus des cookies marketing et de performance n'affectera pas l'accès au site.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-light mb-4">Tiers et outils externes</h2>
              <p className="mb-4">
                Notre site peut utiliser des services tiers qui déposent leurs propres cookies :
              </p>
              <ul className="space-y-3 list-disc list-inside">
                <li>Google Analytics : analyse du trafic et du comportement des utilisateurs</li>
                <li>Stripe / PayPal : traitement des paiements</li>
                <li>Meta Pixel : publicités ciblées et remarketing</li>
              </ul>
              <p className="mt-4">
                Ces services sont soumis à leurs propres politiques de confidentialité. Consultez-les pour plus de détails.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-light mb-4">Durée de conservation</h2>
              <p>
                La durée de stockage des cookies varie. Les cookies de session sont supprimés à la fermeture de votre navigateur. Les cookies persistants peuvent être conservés jusqu'à 2 ans, selon votre consentement et la réglementation applicable.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-light mb-4">Conformité légale</h2>
              <p>
                Notre politique de cookies est conforme au Règlement Général sur la Protection des Données (RGPD), à la loi ePrivacy et à la loi marocaine sur la protection des données personnelles.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-light mb-4">Contact</h2>
              <p>
                Pour toute question ou demande concernant cette Politique Cookies, veuillez nous contacter :
              </p>
              <div className="mt-4 p-4 border-l-2 border-foreground/20">
                <p><strong>Email :</strong> contact@interloft.ma</p>
                <p><strong>Téléphone :</strong> +212 660-252070</p>
              </div>
            </section>
          </div>
        </div>
      </section>
      <FooterV2 />
    </main>
  )
}
