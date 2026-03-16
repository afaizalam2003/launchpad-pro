import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

export interface ActivityLog {
  id: string
  event: string
  user_email: string | null
  status: string
  created_at: string
}

export function useRecentActivity() {
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchError } = await supabase
        .from('activity_logs')
        .select('id, event, user_email, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5)

      if (fetchError) throw fetchError
      setActivities((data ?? []) as ActivityLog[])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch activity')
      setActivities([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { activities, loading, error, refetch }
}

export function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHr = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHr / 24)

  if (diffSec < 60) return 'just now'
  if (diffMin < 60) return `${diffMin} min ago`
  if (diffHr < 24) return `${diffHr} hr ago`
  if (diffDay < 7) return `${diffDay} days ago`
  return date.toLocaleDateString()
}
