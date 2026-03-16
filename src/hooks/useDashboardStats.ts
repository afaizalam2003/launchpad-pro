import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

export interface DashboardStats {
  activeUsers: number | null
  mrr: number | null
  apiCalls: number | null
  templateDeploys: number | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

const PRO_PRICE = 999
const ENTERPRISE_PRICE = 4999

export function useDashboardStats(): DashboardStats {
  const [activeUsers, setActiveUsers] = useState<number | null>(null)
  const [mrr, setMrr] = useState<number | null>(null)
  const [apiCalls, setApiCalls] = useState<number | null>(null)
  const [templateDeploys, setTemplateDeploys] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [usersResult, planCountResult, apiLogsResult, templateDeploysResult] = await Promise.all([
        supabase.from('users').select('id', { count: 'exact', head: true }),
        supabase.from('users').select('plan'),
        supabase.from('api_logs').select('id', { count: 'exact', head: true }),
        supabase.from('activity_logs').select('id', { count: 'exact', head: true }).ilike('event', 'Template deployed%'),
      ])

      if (usersResult.error) throw usersResult.error
      setActiveUsers(usersResult.count ?? 0)

      if (planCountResult.error) throw planCountResult.error
      const plans = (planCountResult.data ?? []) as { plan: string }[]
      const proCount = plans.filter((p) => (p.plan ?? '').toLowerCase() === 'pro').length
      const enterpriseCount = plans.filter((p) => (p.plan ?? '').toLowerCase() === 'enterprise').length
      setMrr(proCount * PRO_PRICE + enterpriseCount * ENTERPRISE_PRICE)

      if (apiLogsResult.error) throw apiLogsResult.error
      setApiCalls(apiLogsResult.count ?? 0)

      if (templateDeploysResult.error) throw templateDeploysResult.error
      setTemplateDeploys(templateDeploysResult.count ?? 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats')
      setActiveUsers(null)
      setMrr(null)
      setApiCalls(null)
      setTemplateDeploys(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { activeUsers, mrr, apiCalls, templateDeploys, loading, error, refetch }
}
