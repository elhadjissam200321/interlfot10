'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useActionState } from 'react'
import { loginAction } from '@/lib/actions/auth'

type AuthState = { error: string | null }

export default function ConnexionPage() {
  const [state, formAction, isPending] = useActionState<AuthState, FormData>(loginAction, { error: null })

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
              Connexion
            </h1>
            <p className="text-sm text-muted-foreground">
              Connectez-vous a votre compte Interloft
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

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-xs tracking-[0.15em] uppercase text-muted-foreground">
                  Mot de passe
                </label>
                <Link
                  href="/auth/mot-de-passe-oublie"
                  className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground"
                placeholder="Votre mot de passe"
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
              {isPending ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Pas encore de compte ?{' '}
              <Link href="/auth/inscription" className="text-foreground underline underline-offset-4 hover:opacity-70">
                Creer un compte
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">
              Retour a l'accueil
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
