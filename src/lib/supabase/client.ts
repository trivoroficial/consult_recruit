import { createBrowserClient } from '@supabase/ssr'

// Cole a chave ANON (que começa com eyJ...) abaixo:
const supabaseUrl = 'https://dhnmyofmavrsfjtntxjt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...(cole a chave completa aqui, sem apagar nada)'

export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
)
