'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

// ============================================
// LOGIN
// ============================================
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

// ============================================
// LOGOUT
// ============================================
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

// ============================================
// GET SESSION
// ============================================
export async function getSession() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getSession()
    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao buscar sessao:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// GET USER
// ============================================
export async function getUser() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao buscar usuario:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// RESET PASSWORD
// ============================================
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

// ============================================
// UPDATE PASSWORD
// ============================================
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

// ============================================
// REGISTER USER (CADASTRO PÚBLICO)
// ============================================
export async function registerUser(data: any) {
  try {
    const supabase = createClient()

    // 1. Criar usuário no Auth
    const { data: user, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.nome,
          role: 'candidato'
        }
      }
    })

    if (error) throw error

    // 2. Inserir na tabela usuarios
    if (user?.user) {
      await supabase
        .from('usuarios')
        .insert([{
          id: user.user.id,
          email: data.email,
          name: data.nome,
          role: 'candidato'
        }])
      
      // 3. Inserir na tabela candidatos (SEM ACESSO AO DASHBOARD)
      await supabase
        .from('candidatos')
        .insert([{
          user_id: user.user.id,
          nome: data.nome,
          email: data.email,
          telefone: data.telefone || null,
          cidade: data.cidade || null,
          estado: data.estado || null,
          cargo: data.cargo || null,
          status: 'Disponível',
          tipo: 'externo',
          acesso_dashboard: false,
          score: 0
        }])
    }

    return { success: true, data: user }
  } catch (error: any) {
    console.error('Erro ao cadastrar:', error)
    return { success: false, error: error.message }
  }
}
