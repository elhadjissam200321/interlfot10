import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import { User, Heart, Settings, LogOut } from 'lucide-react'
import LogoutButton from '@/components/logout-button'
import ProfileEditForm from '@/components/profile-edit-form'
import FavoritesList from '@/components/favorites-list'

export const metadata = {
  title: 'Mon Compte — Interloft',
  description: 'Gerez votre compte Interloft',
}

export default async function ComptePage() {
  const supabase = await createClient()

  if (!supabase) {
    // If Supabase is not configured, we show a message or redirect to an info page
    // For now, let's redirect to home or show an error state
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-serif text-2xl mb-4">Configuration Requise</h1>
        <p className="text-sm text-muted-foreground max-w-md mb-8">
          Le système d'authentification n'est pas encore configuré.
          Veuillez définir les clés Supabase dans votre fichier .env.local.
        </p>
        <Link href="/" className="label-text underline">Retour à l'accueil</Link>
      </div>
    )
  }

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/auth/connexion')
  }

  const user = data.user
  const firstName = user.user_metadata?.first_name || ''
  const lastName = user.user_metadata?.last_name || ''
  const displayName = firstName && lastName ? `${firstName} ${lastName}` : user.email

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content */}
      <main className="px-6 md:px-12 pt-28 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
              Bienvenue
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-foreground">
              {displayName}
            </h1>
          </div>

          {/* Account Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Profile Card */}
            <div className="border border-border p-8 md:col-span-2">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center">
                  <User size={24} strokeWidth={1} className="text-foreground" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-1">Mon Profil</h2>
                  <p className="text-sm text-muted-foreground">Gérez vos informations personnelles</p>
                </div>
              </div>
              <ProfileEditForm
                initialData={{
                  firstName: firstName,
                  lastName: lastName,
                  email: user.email || ''
                }}
              />
            </div>

            {/* Favorites Card */}
            <div className="border border-border p-8">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center">
                  <Heart size={24} strokeWidth={1} className="text-foreground" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-1">Mes Favoris</h2>
                  <p className="text-sm text-muted-foreground">Vos pièces favorites</p>
                </div>
              </div>
              <FavoritesList />
            </div>

            {/* Settings Card */}
            <div className="border border-border p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center">
                  <Settings size={24} strokeWidth={1} className="text-foreground" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-1">Parametres</h2>
                  <p className="text-sm text-muted-foreground">Gerez votre compte</p>
                </div>
              </div>
              <div className="space-y-3">
                <LogoutButton />
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Retour a l'accueil
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
