'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export default function PaginationControls({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null

  const prevUrl = currentPage > 1
    ? `${baseUrl}${currentPage === 2 ? '' : `?page=${currentPage - 1}`}`
    : '#'
  const nextUrl = currentPage < totalPages
    ? `${baseUrl}?page=${currentPage + 1}`
    : '#'

  const prevDisabled = currentPage <= 1
  const nextDisabled = currentPage >= totalPages

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-6 pt-16"
    >
      <Link
        href={prevUrl}
        aria-label="Page précédente"
        className={`flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase transition-opacity ${
          prevDisabled
            ? 'opacity-30 pointer-events-none'
            : 'hover:opacity-60'
        }`}
        replace
      >
        <ChevronLeft size={14} strokeWidth={1.5} />
        Précédent
      </Link>

      <div className="flex items-center gap-3">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
          const isActive = p === currentPage
          return (
            <Link
              key={p}
              href={`${baseUrl}${p === 1 ? '' : `?page=${p}`}`}
              aria-label={`Page ${p}`}
              aria-current={isActive ? 'page' : undefined}
              className={`w-2 h-2 transition-all duration-300 ${
                isActive
                  ? 'bg-foreground w-8'
                  : 'bg-foreground/20 hover:bg-foreground/40'
              }`}
              replace
            />
          )
        })}
      </div>

      <Link
        href={nextUrl}
        aria-label="Page suivante"
        className={`flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase transition-opacity ${
          nextDisabled
            ? 'opacity-30 pointer-events-none'
            : 'hover:opacity-60'
        }`}
        replace
      >
        Suivant
        <ChevronRight size={14} strokeWidth={1.5} />
      </Link>
    </nav>
  )
}
