import Navbar from '@/components/navbar'
import FooterV2 from '@/components/footer-v2'
import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingCategory() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <div className="pt-28 pb-12 px-6 md:px-12 flex items-end justify-between">
        <Skeleton className="h-12 w-64 md:w-96 rounded-none bg-muted" />
        <Skeleton className="h-4 w-32 rounded-none bg-muted hidden sm:block delay-150" />
      </div>

      <div className="px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="group block">
              <Skeleton className="relative aspect-[4/5] w-full rounded-none bg-muted" />
              <div className="pt-4">
                <Skeleton className="h-6 w-3/4 rounded-none bg-muted mt-2 delay-75" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <FooterV2 />
    </div>
  )
}
