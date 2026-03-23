import Link from 'next/link'

export default function ContactCtaSection() {
  return (
    <section className="w-full bg-foreground py-28 md:py-40 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-sans text-xs tracking-[0.35em] uppercase text-background/50 mb-8">
          Contact
        </p>
        <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-light text-background leading-tight mb-8 text-balance">
          Parlons de votre projet d&rsquo;intérieur
        </h2>
        <p className="font-sans text-sm leading-relaxed text-background/60 max-w-md mx-auto mb-14">
          Pour toute demande d&rsquo;information concernant nos collections ou nos produits, contactez
          notre équipe.
        </p>
        <Link
          href="/contact"
          className="inline-block font-sans text-xs tracking-[0.3em] uppercase text-foreground bg-background px-10 py-4 hover:bg-background/90 transition-colors"
        >
          Nous contacter
        </Link>
      </div>
    </section>
  )
}
