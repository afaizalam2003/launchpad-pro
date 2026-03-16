/**
 * Razorpay Checkout integration for LaunchKit
 * Loads Razorpay script from CDN and initiates payments
 */

export interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  prefill: { email: string; name: string }
  theme: { color: string }
  handler: (response: RazorpayResponse) => void
  modal: { ondismiss: () => void }
}

export interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export interface RazorpayError {
  code: string
  description: string
  source: string
  step: string
  reason: string
  metadata: { order_id: string; payment_id: string }
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      on: (event: string, handler: (error: RazorpayError) => void) => void
      open: () => void
    }
  }
}

export const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export const initiatePayment = async (options: {
  amount: number
  planName: string
  userEmail: string
  userName: string
  onSuccess: (response: RazorpayResponse) => void
  onError: (error: RazorpayError) => void
}) => {
  const loaded = await loadRazorpay()
  if (!loaded) {
    alert('Razorpay failed to load. Check your internet.')
    return
  }

  const razorpayOptions: RazorpayOptions = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: options.amount * 100, // paise
    currency: 'INR',
    name: 'LaunchKit',
    description: `${options.planName} Plan Subscription`,
    prefill: {
      email: options.userEmail,
      name: options.userName,
    },
    theme: { color: '#22C55E' },
    handler: options.onSuccess,
    modal: { ondismiss: () => console.log('Payment dismissed') },
  }

  const rzp = new window.Razorpay(razorpayOptions)
  rzp.on('payment.failed', options.onError)
  rzp.open()
}
