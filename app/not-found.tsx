import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import FooterV2 from '@/components/footer-v2'

export default function NotFound() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 flex flex-col items-center justify-center px-6 py-32 text-center">
                {/* Decorative background element */}
                <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                    <span className="font-serif text-[40rem] leading-none select-none">404</span>
                </div>

                <div className="relative z-10 max-w-xl">
                    <p className="label-text mb-8">ERREUR 404</p>

                    <h1 className="font-serif text-5xl md:text-7xl font-light tracking-wide text-foreground mb-10">
                        Page égarée
                    </h1>

                    <div className="w-12 h-px bg-foreground mx-auto mb-10" />

                    <p className="font-sans text-sm md:text-base leading-relaxed text-muted-foreground mb-16 max-w-sm mx-auto">
                        La page que vous recherchez semble avoir été déplacée ou n&rsquo;existe plus dans notre collection actuelle.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/"
                            className="w-full sm:w-auto px-8 py-5 bg-primary text-primary-foreground font-sans text-[10px] tracking-[0.3em] uppercase hover:opacity-90 transition-opacity"
                        >
                            Retour à l&rsquo;accueil
                        </Link>

                        <Link
                            href="/collaborations"
                            className="w-full sm:w-auto px-8 py-5 border border-border text-foreground font-sans text-[10px] tracking-[0.3em] uppercase hover:bg-foreground hover:text-background transition-all"
                        >
                            Nos collaborations
                        </Link>
                    </div>
                </div>
            </div>

            <FooterV2 />
        </main>
    )
}
