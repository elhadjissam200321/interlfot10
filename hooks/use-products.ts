'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface Product {
  id: string
  slug: string
  name: string
  category: string
  description: string
  materials: string[]
  dimensions: string
  image: string
  gallery: string[]
}

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProducts() {
            const supabase = createClient()
            if (!supabase) {
                setLoading(false)
                return
            }

            const { data } = await supabase.from('products').select('*')
            if (data) {
                setProducts(data)
            }
            setLoading(false)
        }

        fetchProducts()
    }, [])

    return { products, loading }
}
