import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Hardcoded — env vars in Netlify were pointing to the old Lovable-linked
// Supabase project (levcfosilqzpswoppvbp) where the ibcb-* edge functions
// don't exist. The anon key below is a public JWT, safe to commit.
//
// Backing tables: ibcb_enquiries, ibcb_contact_submissions, ibcb_consents
// Backing functions: ibcb-enquiry, ibcb-contact-submission, ibcb-consent-submission

const SUPABASE_URL = 'https://znltfcxpngtztiwbcamm.supabase.co';
const SUPABASE_PUBLISHABLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpubHRmY3hwbmd0enRpd2JjYW1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMTIyNTEsImV4cCI6MjA5MDg4ODI1MX0.CzV6fklxHJpYvG08WCn39zQ1YFd5gPd2zQ6mgHQjwDI';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
