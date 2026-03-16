-- Run this in Supabase SQL Editor first
-- ============================================
-- 1. api_logs table (for API Calls stat)
-- ============================================
CREATE TABLE IF NOT EXISTS public.api_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  created_at timestamptz DEFAULT now(),
  endpoint text
);

ALTER TABLE public.api_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert api_logs"
  ON public.api_logs FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read api_logs"
  ON public.api_logs FOR SELECT
  USING (true);

-- ============================================
-- 2. activity_logs table (for Recent Activity)
-- ============================================
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  event text NOT NULL,
  user_email text,
  status text DEFAULT 'success',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert activity"
  ON public.activity_logs FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can read activity"
  ON public.activity_logs FOR SELECT
  USING (true);

-- ============================================
-- 3. payment_history table (for Billing page)
-- ============================================
CREATE TABLE IF NOT EXISTS public.payment_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.users(id),
  amount integer NOT NULL,
  plan text NOT NULL,
  status text DEFAULT 'paid',
  invoice_id text,
  razorpay_payment_id text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.payment_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own payments"
  ON public.payment_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payments"
  ON public.payment_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);
