'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [initialized, setInitialized] = useState(false)

    const fetchFavorites = useCallback(async () => {
        const supabase = createClient()
        if (!supabase) {
            setLoading(false)
            return
        }

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            setFavorites([])
            setLoading(false)
            return
        }

        const { data, error } = await supabase
            .from('favorites')
            .select('product_id')
            .eq('user_id', user.id)

        if (!error && data) {
            setFavorites(data.map((f: { product_id: string }) => f.product_id))
        }
        setLoading(false)
        setInitialized(true)
    }, [])

    useEffect(() => {
        fetchFavorites()
    }, [fetchFavorites])

    const toggleFavorite = useCallback(async (productId: string) => {
        const supabase = createClient()
        if (!supabase) return

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            window.location.href = '/auth/connexion'
            return
        }

        const isFavorite = favorites.includes(productId)

        if (isFavorite) {
            const { error } = await supabase
                .from('favorites')
                .delete()
                .eq('user_id', user.id)
                .eq('product_id', productId)

            if (!error) {
                setFavorites(prev => prev.filter(id => id !== productId))
            }
        } else {
            const { error } = await supabase
                .from('favorites')
                .insert({ user_id: user.id, product_id: productId })

            if (!error) {
                setFavorites(prev => [...prev, productId])
            }
        }
    }, [favorites])

    return { favorites, toggleFavorite, loading, initialized, refetch: fetchFavorites }
}
