import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    'https://dhnmyofmavrsfjtntxjt.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobm15b2ZtYXZyc2ZqdG50eGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1OTgzMzMsImV4cCI6MjA5OTE3NDMzM30.2Ahc15Mw5FPqm4nMx8xCORAFt3OoobmsVQIjrTjXAhA',
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Ignora erro em Server Components
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Ignora erro
          }
        },
      },
    }
  )
}
