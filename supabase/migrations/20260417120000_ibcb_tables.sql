-- IBCB Tables — migrated to znltfcxpngtztiwbcamm (2026-04-17)
-- Replaces the single contact_submissions table from levcfosilqzpswoppvbp.

-- 1) Church enquiries (from old church-enquiry function)
CREATE TABLE IF NOT EXISTS public.ibcb_enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  first_time BOOLEAN NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.ibcb_enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ibcb_enquiries_insert_public"
  ON public.ibcb_enquiries FOR INSERT WITH CHECK (true);

-- 2) Contact form submissions (from old contact-submission function)
CREATE TABLE IF NOT EXISTS public.ibcb_contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.ibcb_contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ibcb_contact_insert_public"
  ON public.ibcb_contact_submissions FOR INSERT WITH CHECK (true);

-- 3) GDPR Consents (NEW — for Linktree contact listings)
-- Each submission is a legal record of consent given by a ministry contact person
-- (e.g. Preethi for Women's Breakfast, Csaba for Men's Breakfast) to have their
-- details publicly listed on the IBCB Linktree page.
CREATE TABLE IF NOT EXISTS public.ibcb_consents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  ministry TEXT NOT NULL,                       -- 'mens_breakfast' | 'womens_breakfast' | future
  consent_name BOOLEAN NOT NULL DEFAULT false,
  consent_email BOOLEAN NOT NULL DEFAULT false,
  consent_phone_public BOOLEAN NOT NULL DEFAULT false,
  consent_phone_on_request BOOLEAN NOT NULL DEFAULT false,
  signature_text TEXT NOT NULL,                 -- typed name as digital signature
  user_agent TEXT,
  ip_address TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  revoked_at TIMESTAMPTZ,
  withdrawal_reason TEXT
);
ALTER TABLE public.ibcb_consents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ibcb_consents_insert_public"
  ON public.ibcb_consents FOR INSERT WITH CHECK (true);
-- Note: no SELECT policy — only service-role (backend/Aleksa) can read consents.
