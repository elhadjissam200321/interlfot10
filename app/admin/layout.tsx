import type { Metadata } from 'next'
import AdminSidebar from './components/admin-sidebar'

export const metadata: Metadata = {
  title: 'Admin — Interloft',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#f7f6f4]">
      <AdminSidebar />
      <main className="flex-1 min-w-0 overflow-auto">
        <div className="md:hidden h-14" />
        {children}
      </main>
    </div>
  )
}
