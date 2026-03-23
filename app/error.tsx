'use client'

import { useEffect } from 'react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <p className="label-text mb-6">Erreur</p>
      <h1 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4">
        Quelque chose s'est mal passé
      </h1>
      <p className="text-sm text-muted-foreground max-w-md mb-10">
        Une erreur inattendue s'est produite. Veuillez réessayer.
      </p>
      <button
        onClick={reset}
        className="px-8 py-4 bg-foreground text-background text-xs tracking-[0.2em] uppercase hover:opacity-90 transition-opacity"
      >
        Réessayer
      </button>
    </div>
  )
}
