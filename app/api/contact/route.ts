import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function sendEmail(payload: ContactPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return false

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'INTERloft <contact@interloft.ma>',
        to: ['contact@interloft.ma'],
        subject: payload.subject || `Nouveau message de ${payload.name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="font-size: 18px; margin-bottom: 16px;">Nouveau message depuis interloft.ma</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 100px;">Nom</td>
                <td style="padding: 8px 0;">${payload.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${payload.email}">${payload.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Sujet</td>
                <td style="padding: 8px 0;">${payload.subject || '—'}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-radius: 4px;">
              <p style="margin: 0; white-space: pre-wrap;">${payload.message}</p>
            </div>
          </div>
        `,
        text: `Nouveau message de ${payload.name} (${payload.email})\nSujet: ${payload.subject || '—'}\n\n${payload.message}`,
      }),
    })
    return res.ok
  } catch {
    return false
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, subject, message, website } = body as Partial<ContactPayload> & { website?: string }

    // Honeypot validation: Fake true success if the bot filled the invisible field.
    if (website && website.trim() !== '') {
      console.warn('Spam bot rejected via honeypot field.')
      return NextResponse.json({ success: true })
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Le nom, l\'email et le message sont requis.' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide.' },
        { status: 400 }
      )
    }

    if (name.trim().length > 200 || message.trim().length > 5000) {
      return NextResponse.json(
        { error: 'Données trop longues.' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    if (supabase) {
      const { error: insertError } = await supabase.from('contact_messages').insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject?.trim() || '',
        message: message.trim(),
      })

      if (insertError) {
        console.error('Contact insert error:', insertError)
        return NextResponse.json(
          { error: 'Erreur lors de l\'enregistrement du message.' },
          { status: 500 }
        )
      }
    }

    await sendEmail({ name, email, subject: subject || '', message: message })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: 'Erreur interne. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
