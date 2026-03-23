import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import Preloader from '@/components/preloader'
import ColorSwitcher from '@/components/color-switcher'
import WhatsappButton from '@/components/whatsapp-button'
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/react'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'INTERloft — Mobilier Contemporain',
  description:
    'INTERloft est une marque marocaine dédiée au mobilier contemporain et à l\'aménagement d\'intérieurs modernes.',
  generator: 'v0.app',
  keywords: ['mobilier', 'contemporain', 'luxe', 'Maroc', 'intérieur', 'design'],
  openGraph: {
    title: 'INTERloft — Mobilier Contemporain',
    description: 'Collections de mobilier contemporain de luxe.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`} data-scroll-behavior="smooth" style={{ scrollBehavior: 'smooth' }} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        <Preloader />
        {children}
        <Analytics />
        <ColorSwitcher />
        <WhatsappButton />
        <Toaster />
      </body>
    </html>
  )
}

