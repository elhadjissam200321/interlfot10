import Navbar from '@/components/navbar'
import FooterV2 from '@/components/footer-v2'
import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingProduct() {
    return (
        <div className="bg-background min-h-screen">
            <Navbar />

            <div className="pt-24 min-h-screen flex flex-col lg:flex-row gap-0">
                <div className="lg:w-2/3 lg:sticky lg:top-0 lg:h-screen">
                    <Skeleton className="relative h-[60vh] lg:h-full w-full rounded-none bg-muted" />
                </div>

                <div className="lg:w-1/3 px-6 md:px-12 lg:px-10 py-12 lg:py-16 flex flex-col">
                    <div className="flex-1 space-y-8">
                        <Skeleton className="h-3 w-24 rounded-none bg-muted" />
                        <Skeleton className="h-10 w-full max-w-[80%] rounded-none bg-muted mt-8 mb-8 delay-75" />

                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full rounded-none bg-muted delay-100" />
                            <Skeleton className="h-4 w-full rounded-none bg-muted delay-100" />
                            <Skeleton className="h-4 w-3/4 rounded-none bg-muted delay-100" />
                        </div>

                        <div className="space-y-8 pt-8">
                            <div>
                                <Skeleton className="h-3 w-20 rounded-none bg-muted mb-4 delay-150" />
                                <Skeleton className="h-4 w-32 rounded-none bg-muted delay-150" />
                            </div>
                            <div>
                                <Skeleton className="h-3 w-20 rounded-none bg-muted mb-4 delay-150" />
                                <Skeleton className="h-4 w-40 rounded-none bg-muted delay-150" />
                            </div>
                        </div>
                    </div>

                    <Skeleton className="h-14 w-full rounded-none bg-muted mt-12 delay-200" />
                </div>
            </div>

            <FooterV2 />
        </div>
    )
}
