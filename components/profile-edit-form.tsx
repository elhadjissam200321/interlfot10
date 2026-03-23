'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'

interface ProfileEditFormProps {
    initialData: {
        firstName: string
        lastName: string
        email: string
    }
}

export default function ProfileEditForm({ initialData }: ProfileEditFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState(initialData)
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [showPasswordChange, setShowPasswordChange] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!supabase) return

        setIsLoading(true)
        
        // Update profile
        const { error: profileError } = await supabase.auth.updateUser({
            data: {
                first_name: form.firstName,
                last_name: form.lastName,
            }
        })

        if (profileError) {
            toast({
                title: "Erreur",
                description: "Impossible de mettre à jour le profil.",
                variant: "destructive",
            })
        } else {
            toast({
                title: "Profil mis à jour",
                description: "Vos informations ont été enregistrées avec succès.",
            })
            router.refresh()
        }
        setIsLoading(false)
    }

    async function handlePasswordChange(e: React.FormEvent) {
        e.preventDefault()
        if (!supabase) return

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast({
                title: "Erreur",
                description: "Les mots de passe ne correspondent pas.",
                variant: "destructive",
            })
            return
        }

        if (passwordData.newPassword.length < 6) {
            toast({
                title: "Erreur",
                description: "Le mot de passe doit contenir au moins 6 caractères.",
                variant: "destructive",
            })
            return
        }

        setIsLoading(true)

        // First verify the current password by signing in
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: form.email,
            password: passwordData.currentPassword,
        })

        if (signInError) {
            toast({
                title: "Erreur",
                description: "Mot de passe actuel incorrect.",
                variant: "destructive",
            })
            setIsLoading(false)
            return
        }

        // Update password
        const { error: updateError } = await supabase.auth.updateUser({
            password: passwordData.newPassword,
        })

        if (updateError) {
            toast({
                title: "Erreur",
                description: "Impossible de modifier le mot de passe.",
                variant: "destructive",
            })
        } else {
            toast({
                title: "Mot de passe modifié",
                description: "Votre mot de passe a été changé avec succès.",
            })
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
            setShowPasswordChange(false)
        }
        setIsLoading(false)
    }

    return (
        <div className="space-y-8">
            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block label-text mb-2">Prénom</label>
                        <input
                            type="text"
                            value={form.firstName}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                            className="w-full border border-border bg-transparent px-4 py-2 font-sans text-sm text-foreground focus:outline-none focus:border-foreground"
                        />
                    </div>
                    <div>
                        <label className="block label-text mb-2">Nom</label>
                        <input
                            type="text"
                            value={form.lastName}
                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                            className="w-full border border-border bg-transparent px-4 py-2 font-sans text-sm text-foreground focus:outline-none focus:border-foreground"
                        />
                    </div>
                </div>
                <div>
                    <label className="block label-text mb-2">Email</label>
                    <input
                        type="email"
                        value={form.email}
                        disabled
                        className="w-full border border-border bg-foreground/5 px-4 py-2 font-sans text-sm text-muted-foreground cursor-not-allowed"
                    />
                    <p className="text-[10px] text-muted-foreground mt-2">L'adresse email ne peut pas être modifiée.</p>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-foreground text-background text-xs tracking-[0.2em] uppercase font-sans hover:opacity-90 transition-colors disabled:opacity-50"
                >
                    {isLoading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                </button>
            </form>

            {/* Password Change Section */}
            <div className="border-t border-border pt-6">
                {!showPasswordChange ? (
                    <button
                        type="button"
                        onClick={() => setShowPasswordChange(true)}
                        className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                    >
                        Changer le mot de passe
                    </button>
                ) : (
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <h3 className="label-text mb-4">Changer le mot de passe</h3>
                        <div>
                            <label className="block label-text mb-2">Mot de passe actuel</label>
                            <input
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                className="w-full border border-border bg-transparent px-4 py-2 font-sans text-sm text-foreground focus:outline-none focus:border-foreground"
                                required
                            />
                        </div>
                        <div>
                            <label className="block label-text mb-2">Nouveau mot de passe</label>
                            <input
                                type="password"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                className="w-full border border-border bg-transparent px-4 py-2 font-sans text-sm text-foreground focus:outline-none focus:border-foreground"
                                required
                                minLength={6}
                            />
                        </div>
                        <div>
                            <label className="block label-text mb-2">Confirmer le nouveau mot de passe</label>
                            <input
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                className="w-full border border-border bg-transparent px-4 py-2 font-sans text-sm text-foreground focus:outline-none focus:border-foreground"
                                required
                                minLength={6}
                            />
                        </div>
                        <div className="flex gap-4 pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="py-3 px-6 bg-foreground text-background text-xs tracking-[0.15em] uppercase font-sans hover:opacity-90 transition-colors disabled:opacity-50"
                            >
                                {isLoading ? 'Modification...' : 'Modifier le mot de passe'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowPasswordChange(false)
                                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                                }}
                                className="py-3 px-6 border border-border text-xs tracking-[0.15em] uppercase font-sans hover:bg-secondary transition-colors"
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
