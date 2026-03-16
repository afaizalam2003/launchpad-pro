import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { initiatePayment } from '@/lib/razorpay'
import type { RazorpayResponse, RazorpayError } from '@/lib/razorpay'
import { supabase } from '@/lib/supabase'
import { toast } from '@/components/ui/sonner'

const PRO_AMOUNT = 999
const ENTERPRISE_AMOUNT = 4999

export function usePayment() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateUserPlan = useCallback(
    async (planName: string) => {
      if (!user?.id) return
      const { error: updateError } = await supabase
        .from('users')
        .update({ plan: planName.toLowerCase() })
        .eq('id', user.id)

      if (updateError) {
        throw new Error(updateError.message)
      }
    },
    [user?.id]
  )

  const handlePaymentSuccess = useCallback(
    async (
      planName: string,
      planAmount: number,
      response: RazorpayResponse
    ) => {
      if (!user?.id) return
      try {
        await updateUserPlan(planName)

        await supabase.from('payment_history').insert({
          user_id: user.id,
          amount: planAmount,
          plan: planName,
          status: 'paid',
          invoice_id: `INV-${Date.now()}`,
          razorpay_payment_id: response.razorpay_payment_id,
        })

        await supabase.from('activity_logs').insert({
          event: 'Payment received',
          user_email: user.email ?? null,
          status: 'success',
        })

        toast.success('Payment successful!')
        navigate('/dashboard')
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to update plan'
        toast.error(message)
        setError(message)
      }
    },
    [updateUserPlan, navigate, user?.id, user?.email]
  )

  const initiateProPayment = useCallback(async () => {
    if (!user) {
      toast.error('Please sign in to upgrade')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await initiatePayment({
        amount: PRO_AMOUNT,
        planName: 'Pro',
        userEmail: user.email ?? '',
        userName:
          (user.user_metadata?.full_name as string) ?? user.email ?? 'User',
        onSuccess: (response: RazorpayResponse) => {
          setLoading(false)
          void handlePaymentSuccess('Pro', PRO_AMOUNT, response)
        },
        onError: (err: RazorpayError) => {
          setLoading(false)
          const msg = err.description || 'Payment failed'
          setError(msg)
          toast.error(msg)
        },
      })
    } catch (err) {
      setLoading(false)
      const msg =
        err instanceof Error ? err.message : 'Failed to initiate payment'
      setError(msg)
      toast.error(msg)
    }
  }, [user, handlePaymentSuccess])

  const initiateEnterprisePayment = useCallback(async () => {
    if (!user) {
      toast.error('Please sign in to upgrade')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await initiatePayment({
        amount: ENTERPRISE_AMOUNT,
        planName: 'Enterprise',
        userEmail: user.email ?? '',
        userName:
          (user.user_metadata?.full_name as string) ?? user.email ?? 'User',
        onSuccess: (response: RazorpayResponse) => {
          setLoading(false)
          void handlePaymentSuccess(
            'Enterprise',
            ENTERPRISE_AMOUNT,
            response
          )
        },
        onError: (err: RazorpayError) => {
          setLoading(false)
          const msg = err.description || 'Payment failed'
          setError(msg)
          toast.error(msg)
        },
      })
    } catch (err) {
      setLoading(false)
      const msg =
        err instanceof Error ? err.message : 'Failed to initiate payment'
      setError(msg)
      toast.error(msg)
    }
  }, [user, handlePaymentSuccess])

  return {
    initiateProPayment,
    initiateEnterprisePayment,
    loading,
    error,
    user,
  }
}
