import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { UserProfile } from '@/lib/supabase'

export function useUserProfile(userId: string | undefined) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const refetch = useCallback(async () => {
    if (!userId) {
      setProfile(null)
      setLoading(false)
      return
    }
    setLoading(true)
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      setProfile(null)
    } else {
      setProfile(data as UserProfile)
    }
    setLoading(false)
  }, [userId])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { profile, loading, refetch }
}
