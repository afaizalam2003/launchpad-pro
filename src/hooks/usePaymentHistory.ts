import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

export interface PaymentRecord {
  id: string
  amount: number
  plan: string
  status: string
  invoice_id: string | null
  created_at: string
}

export function usePaymentHistory(userId: string | undefined) {
  const [payments, setPayments] = useState<PaymentRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    if (!userId) {
      setPayments([])
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchError } = await supabase
        .from('payment_history')
        .select('id, amount, plan, status, invoice_id, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setPayments((data ?? []) as PaymentRecord[])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch payments')
      setPayments([])
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { payments, loading, error, refetch }
}

export function formatPaymentDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatAmount(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}
