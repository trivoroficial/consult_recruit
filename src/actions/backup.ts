'use server'
import { createClient } from '@/lib/supabase/server'

export async function criarBackup(data: any) {
  try {
    const supabase = createClient()
    
    const { data: backup, error } = await supabase
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
    console.error('Erro ao criar backup:', error)
    return { success: false, error: error.message }
  }
}

export async function listarBackups() {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('backups')
      .select('*')
      .order('id', { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao listar backups:', error)
    return { success: false, error: error.message }
  }
}

export async function excluirBackup(id: number) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase
      .from('backups')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true }
  } catch (error: any) {
    console.error('Erro ao excluir backup:', error)
    return { success: false, error: error.message }
  }
}

export async function buscarBackupPorId(id: number) {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('backups')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao buscar backup:', error)
    return { success: false, error: error.message }
  }
}
