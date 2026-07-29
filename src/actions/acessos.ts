'use server'

import { supabase } from '@/lib/supabase/server'

export async function listarUsuarios() {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('usuarios')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function atualizarRoleUsuario(id: string, role: string) {
  try {
    const supabaseClient = supabase()
    
    const { data: usuario, error } = await supabaseClient
      .from('usuarios')
      .update({ role })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return { success: true, data: usuario }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function listarPermissoes() {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('configuracoes')
      .select('*')
      .eq('chave', 'permissoes')
      .single()

    if (error && error.code !== 'PGRST116') throw error

    return { success: true, data: data || { chave: 'permissoes', valor: {} } }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function salvarPermissoes(permissoes: any) {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('configuracoes')
      .upsert({
        chave: 'permissoes',
        valor: permissoes,
        descricao: 'Permissões de acesso por perfil'
      })
      .select()
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
