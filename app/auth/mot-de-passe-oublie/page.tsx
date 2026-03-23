'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useActionState } from 'react'
import { resetPasswordAction } from '@/lib/actions/auth'

type ResetState = { error: string | null }

export default function MotDePasseOubliePage() {
  const [state, formAction, isPending] = useActionState<ResetState, FormData>(resetPasswordAction, { error: null })

  if (state.error === null && !isPending) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="py-8 px-6 md:px-12 flex justify-center border-b border-border">
          <Link href="/" className="relative h-12 w-32">
            <Image src="/images/logo.png" alt="Interloft" fill className="object-contain" priority />
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-md text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
              <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4">
              Email envoyé
            </h1>
            <p className="text-sm text-muted-foreground mb-8">
              Si un compte existe avec cet email, vous recevrez un lien pour réinitialiser votre mot de passe.
            </p>
            <Link href="/auth/connexion" className="inline-block text-xs tracking-[0.15em] uppercase text-foreground underline underline-offset-4 hover:opacity-70">
              Retour à la connexion
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="py-8 px-6 md:px-12 flex justify-center border-b border-border">
        <Link href="/" className="relative h-12 w-32">
          <Image src="/images/logo.png" alt="Interloft" fill className="object-contain" priority />
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-3">
              Mot de passe oublié
            </h1>
            <p className="text-sm text-muted-foreground">
              Entrez votre email pour recevoir un lien de réinitialisation
            </p>
          </div>

          <form action={formAction} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground"
                placeholder="votre@email.com"
              />
            </div>

            {state.error && (
              <p className="text-sm text-destructive text-center">{state.error}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 bg-foreground text-background text-xs tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors disabled:opacity-50"
            >
              {isPending ? 'Envoi en cours...' : 'Envoyer le lien'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/auth/connexion" className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">
              Retour à la connexion
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
