'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function loginAction(
  _prevState: { error: string | null },
  formData: FormData
): Promise<{ error: string | null }> {
  const supabase = await createClient()
  if (!supabase) {
    return { error: 'Service unavailable. Please try again later.' }
  }

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Veuillez remplir tous les champs.' }
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    return { error: error.message }
  }

  redirect('/compte')
}

export async function signUpAction(
  _prevState: { error: string | null },
  formData: FormData
): Promise<{ error: string | null }> {
  const supabase = await createClient()
  if (!supabase) {
    return { error: 'Service unavailable. Please try again later.' }
  }

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  if (!email || !password || !confirmPassword || !firstName || !lastName) {
    return { error: 'Veuillez remplir tous les champs.' }
  }

  if (password !== confirmPassword) {
    return { error: 'Les mots de passe ne correspondent pas.' }
  }

  if (password.length < 6) {
    return { error: 'Le mot de passe doit contenir au moins 6 caractères.' }
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/auth/inscription-succes')
}

export async function resetPasswordAction(
  _prevState: { error: string | null },
  formData: FormData
): Promise<{ error: string | null }> {
  const supabase = await createClient()
  if (!supabase) {
    return { error: 'Service unavailable. Please try again later.' }
  }

  const email = formData.get('email') as string
  if (!email) {
    return { error: 'Veuillez entrer votre email.' }
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email)
  if (error) {
    return { error: error.message }
  }

  return { error: null }
}
