import { createBrowserClient } from '@supabase/ssr'

// URL do seu projeto
const supabaseUrl = 'https://dhnmyofmavrsfjtntxjt.supabase.co'

// ⚠️ PEGUE A CHAVE CORRETA AQUI:
// 1. Vá em: https://supabase.com/dashboard/project/dhnmyofmavrsfjtntxjt/settings/api
// 2. Copie a chave que diz "anon" ou "public" (deve começar com eyJ...)
// 3. Cole abaixo no lugar de 'SUA_CHAVE_AQUI'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...(COLE A CHAVE COMPLETA AQUI)'

export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
)
