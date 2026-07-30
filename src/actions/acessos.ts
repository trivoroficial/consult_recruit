'use server'
import { createClient } from '@/lib/supabase/server'

export async function listarUsuarios() {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao listar usuários:', error)
    return { success: false, error: error.message }
  }
}

export async function atualizarRoleUsuario(id: string, role: string) {
  try {
    const supabase = createClient()
    
    const { data: usuario, error } = await supabase
      .from('usuarios')
      .update({ role })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { success: true, data: usuario }
  } catch (error: any) {
    console.error('Erro ao atualizar role:', error)
    return { success: false, error: error.message }
  }
}

export async function listarPermissoes() {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('configuracoes')
      .select('*')
      .eq('chave', 'permissoes')
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return { success: true, data: data || { chave: 'permissoes', valor: {} } }
  } catch (error: any) {
    console.error('Erro ao listar permissões:', error)
    return { success: false, error: error.message }
  }
}

export async function salvarPermissoes(permissoes: any) {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
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
    console.error('Erro ao salvar permissões:', error)
    return { success: false, error: error.message }
  }
}
