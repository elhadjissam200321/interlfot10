"use client"

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface CollectionsDropdownProps {
  variant?: 'light' | 'dark'
  className?: string
  label?: string
}

export default function CollectionsDropdown({ variant = 'dark', className = '', label = 'Collections' }: CollectionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [collections, setCollections] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch collections when dropdown opens for the first time
  const fetchCollections = async () => {
    if (hasFetched) return

    setIsLoading(true)
    try {
      const res = await fetch('/api/collections')
      const data = await res.json()
      setCollections(data)
      setHasFetched(true)
    } catch (error) {
      console.error('Failed to fetch collections:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isOpen) {
      fetchCollections()
    }
    setIsOpen(!isOpen)
  }

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const textColor = variant === 'light'
    ? 'text-background/80 hover:text-background'
    : 'text-foreground hover:opacity-60'

  const dropdownBg = variant === 'light'
    ? 'bg-foreground/95 backdrop-blur-sm'
    : 'bg-background/95 backdrop-blur-sm border border-border'

  const dropdownTextColor = variant === 'light'
    ? 'text-background/70 hover:text-background'
    : 'text-foreground/70 hover:text-foreground'

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        className={`nav-link flex items-center gap-1.5 transition-all cursor-pointer ${textColor}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown
          size={12}
          strokeWidth={1.5}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute top-full left-0 mt-4 min-w-[220px] py-4 transition-all duration-300 ease-out z-[60] ${dropdownBg} ${isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
      >
        {isLoading ? (
          <div className="px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin opacity-50" />
              <span className={`text-xs tracking-wider ${dropdownTextColor}`}>Chargement...</span>
            </div>
          </div>
        ) : (
          <nav className="flex flex-col">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/products/${collection.id}`}
                onClick={() => setIsOpen(false)}
                className={`px-5 py-2.5 text-xs tracking-[0.2em] uppercase transition-colors ${dropdownTextColor}`}
              >
                {collection.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </div>
  )
}
