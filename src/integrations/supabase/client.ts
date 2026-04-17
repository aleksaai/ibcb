import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Hardcoded to Aleksa's main Supabase project (znltfcxpngtztiwbcamm).
// The anon key is a public JWT — safe to commit. Env vars would also work
// but Netlify was picking up stale values from the old Lovable integration,
// so we inline to eliminate that class of bug.
//
// Backing tables: ibcb_enquiries, ibcb_contact_submissions, ibcb_consents
// Backing functions: ibcb-enquiry, ibcb-contact-submission, ibcb-consent-submission

const SUPABASE_URL =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  'https://znltfcxpngtztiwbcamm.supabase.co';

const SUPABASE_PUBLISHABLE_KEY =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpubHRmY3hwbmd0enRpd2JjYW1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMTIyNTEsImV4cCI6MjA5MDg4ODI1MX0.CzV6fklxHJpYvG08WCn39zQ1YFd5gPd2zQ6mgHQjwDI';

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
