'use server'

import { supabase } from '@/lib/supabase/server'

export async function criarBackup(data: any) {
  try {
    const supabaseClient = supabase()
    
    const { data: backup, error } = await supabaseClient
      .from('backups')
      .insert([{
        nome: data.nome,
        tipo: data.tipo || 'manual',
        tamanho: data.tamanho,
        registros: parseInt(data.registros) || 0,
        arquivo: data.arquivo
      }])
      .select()
      .single()

    if (error) throw error

    return { success: true, data: backup }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function listarBackups() {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('backups')
      .select('*')
      .order('id', { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function excluirBackup(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { error } = await supabaseClient
      .from('backups')
      .delete()
      .eq('id', id)

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
