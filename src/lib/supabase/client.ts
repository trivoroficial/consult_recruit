import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = 'https://dhnmyofmavrsfjtntxjt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobm15b2ZtYXZyc2ZqdG50eGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1OTgzMzMsImV4cCI6MjA5OTE3NDMzM30.2Ahc15Mw5FPqm4nMx8xCORAFt3OoobmsVQIjrTjXAhA'

export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
)
