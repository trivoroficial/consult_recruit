'use server'

import { supabase } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function login(email: string, password: string) {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function logout() {
  try {
    const supabaseClient = supabase()
    
    const { error } = await supabaseClient.auth.signOut()

    if (error) throw error

    // Limpar cookie
    cookies().delete('zenthos_user')

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getSession() {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient.auth.getSession()

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getUser() {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient.auth.getUser()

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function resetPassword(email: string) {
  try {
    const supabaseClient = supabase()
    
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/recuperar-senha`
    })

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function updatePassword(password: string) {
  try {
    const supabaseClient = supabase()
    
    const { error } = await supabaseClient.auth.updateUser({
      password
    })

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function registerUser(data: any) {
  try {
    const supabaseClient = supabase()
    
    const { data: user, error } = await supabaseClient.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          role: data.role || 'candidato'
        }
      }
    })

    if (error) throw error

    // Salvar na tabela usuarios
    if (user?.user) {
      await supabaseClient
        .from('usuarios')
        .insert([{
          id: user.user.id,
          email: data.email,
          name: data.name,
          role: data.role || 'candidato'
        }])
    }

    return { success: true, data: user }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
