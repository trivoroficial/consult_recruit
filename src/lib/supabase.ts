// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = 'https://dhnmyofmavrsfjtntxjt.supabase.co'
const supabaseAnonKey = 'sb_publishable_NpAUC2GRqhwUsafIkFo6iQ_4azrbrsC'

export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
)
