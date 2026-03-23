import { Suspense } from 'react'
import Navbar from '@/components/navbar'
import FooterV2 from '@/components/footer-v2'
import { getPageContent, getGlobalSettings } from '@/lib/data-client'
import ContactForm from '@/components/contact/contact-form'

export default async function ContactPage() {
  const [page, globals] = await Promise.all([
    getPageContent('contact'),
    getGlobalSettings()
  ])

  const title = page?.title || 'Contact'
  const subtitle = page?.subtitle || 'Nous contacter'
  const description = page?.description || 'Pour toute demande d\'information concernant nos collections ou nos produits, contactez notre équipe. Nous vous répondrons dans les meilleurs délais.'

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="pt-32 pb-16 px-6 md:px-12 border-b border-border">
        <p className="label-text mb-4">{subtitle}</p>
        <h1 className="font-serif text-[clamp(3rem,7vw,6rem)] font-light text-foreground leading-none">
          {title}
        </h1>
      </div>

      {/* Layout */}
      <div className="px-6 md:px-12 py-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
        {/* Left: info */}
        <div>
          <p className="font-sans text-sm leading-relaxed text-muted-foreground max-w-sm mb-16">
            {description}
          </p>

          <div className="space-y-8">
            <div className="border-t border-border pt-6">
              <p className="label-text mb-3">Téléphone / WhatsApp</p>
              <div className="flex flex-col gap-2">
                <a
                  href={`tel:${globals.phone.replace(/[^0-9+]/g, '')}`}
                  className="font-serif text-xl font-light text-foreground hover:opacity-60 transition-opacity"
                >
                  {globals.phone}
                </a>
                <a
                  href={`https://wa.me/${globals.phone.replace(/[^0-9+]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-xl font-light text-foreground hover:opacity-60 transition-opacity"
                >
                  WhatsApp: {globals.phone}
                </a>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <p className="label-text mb-3">Email</p>
              <a
                href={`mailto:${globals.email}`}
                className="font-serif text-xl font-light text-foreground hover:opacity-60 transition-opacity"
              >
                {globals.email}
              </a>
            </div>

            <div className="border-t border-border pt-6">
              <p className="label-text mb-3">Showrooms</p>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {globals.showrooms.map((room, i) => (
                  <span key={i}>
                    {room}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div>
          <Suspense fallback={<div className="py-20 text-center opacity-50">Chargement du formulaire...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </div>

      <FooterV2 />
    </div>
  )
}

