import Navbar from '@/components/navbar'
import FooterV2 from '@/components/footer-v2'
import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingCollaborations() {
    return (
        <main className="bg-background min-h-screen">
            <Navbar />

            <div className="pt-32 pb-16 px-8 md:px-16 lg:px-24 border-b border-border space-y-6">
                <Skeleton className="h-3 w-32 rounded-none bg-muted" />
                <Skeleton className="h-16 md:h-24 w-full max-w-2xl rounded-none bg-muted delay-75" />
                <Skeleton className="h-16 w-full max-w-xl rounded-none bg-muted delay-100" />
            </div>

            <section className="w-full py-20 px-8 bg-background">
                <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6">
                    <Skeleton className="h-3 w-40 rounded-none bg-muted" />
                    <Skeleton className="h-24 w-full rounded-none bg-muted delay-75" />
                </div>
            </section>

            <section className="w-full px-8 md:px-16 lg:px-24 pb-24 md:pb-32 bg-background">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {[1, 2, 3].map((i) => (
                            <div key={i}>
                                <Skeleton className="relative aspect-[3/4] mb-6 w-full rounded-none bg-muted" />
                                <div className="space-y-4">
                                    <Skeleton className="h-3 w-1/3 rounded-none bg-muted delay-100" />
                                    <Skeleton className="h-8 w-3/4 rounded-none bg-muted delay-150" />
                                    <Skeleton className="h-4 w-1/2 rounded-none bg-muted delay-200" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FooterV2 />
        </main>
    )
}
