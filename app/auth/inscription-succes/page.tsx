import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'

export default function InscriptionSuccesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="py-8 px-6 md:px-12 flex justify-center border-b border-border">
        <Link href="/" className="relative h-12 w-32">
          <Image
            src="/images/logo.png"
            alt="Interloft"
            fill
            className="object-contain"
            priority
          />
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle size={64} strokeWidth={1} className="text-foreground" />
          </div>
          
          <h1 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4">
            Inscription reussie
          </h1>
          
          <p className="text-muted-foreground mb-8">
            Merci pour votre inscription. Un email de confirmation vous a ete envoye. 
            Veuillez verifier votre boite de reception et cliquer sur le lien pour activer votre compte.
          </p>

          <div className="space-y-4">
            <Link
              href="/auth/connexion"
              className="block w-full py-4 bg-foreground text-background text-xs tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors"
            >
              Se connecter
            </Link>
            
            <Link
              href="/"
              className="block text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Retour a l'accueil
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
