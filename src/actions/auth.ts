'use server'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function login(email: string, password: string) {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao fazer login:', error)
    return { success: false, error: error.message }
  }
}

export async function logout() {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    
    cookies().delete('zenthos_user')
    return { success: true }
  } catch (error: any) {
    console.error('Erro ao fazer logout:', error)
    return { success: false, error: error.message }
  }
}

export async function getSession() {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao buscar sessão:', error)
    return { success: false, error: error.message }
  }
}

export async function getUser() {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao buscar usuário:', error)
    return { success: false, error: error.message }
  }
}

export async function resetPassword(email: string) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/recuperar-senha`
    })
    if (error) throw error
    return { success: true }
  } catch (error: any) {
    console.error('Erro ao resetar senha:', error)
    return { success: false, error: error.message }
  }
}

export async function updatePassword(password: string) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.auth.updateUser({ password })
    if (error) throw error
    return { success: true }
  } catch (error: any) {
    console.error('Erro ao atualizar senha:', error)
    return { success: false, error: error.message }
  }
}

export async function registerUser(data: any) {
  try {
    const supabase = createClient()
    
    const { data: user, error } = await supabase.auth.signUp({
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

    if (user?.user) {
      await supabase
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
    console.error('Erro ao registrar usuário:', error)
    return { success: false, error: error.message }
  }
}
