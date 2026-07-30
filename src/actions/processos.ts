'use server'
import { createClient } from '@/lib/supabase/server'

export async function listarProcessos() {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('processos')
      .select('*')
      .order('id', { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao listar processos:', error)
    return { success: false, error: error.message }
  }
}

export async function excluirProcesso(id: number) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase
      .from('processos')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true }
  } catch (error: any) {
    console.error('Erro ao excluir processo:', error)
    return { success: false, error: error.message }
  }
}

export async function criarProcesso(data: any) {
  try {
    const supabase = createClient()
    
    const { data: processo, error } = await supabase
      .from('processos')
      .insert([{
        vaga: data.vaga,
        vaga_id: data.vaga_id || null,
        empresa: data.empresa,
        empresa_id: data.empresa_id || null,
        responsavel: data.responsavel,
        candidatos: parseInt(data.candidatos) || 0,
        status: data.status || 'triagem',
        inicio: data.inicio,
        previsao_fim: data.previsaoFim || null,
        descricao: data.descricao,
        observacoes: data.observacoes
      }])
      .select()
      .single()

    if (error) throw error
    return { success: true, data: processo }
  } catch (error: any) {
    console.error('Erro ao criar processo:', error)
    return { success: false, error: error.message }
  }
}

export async function buscarProcessoPorId(id: number) {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('processos')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao buscar processo:', error)
    return { success: false, error: error.message }
  }
}

export async function atualizarProcesso(id: number, data: any) {
  try {
    const supabase = createClient()
    
    const { data: processo, error } = await supabase
      .from('processos')
      .update({
        vaga: data.vaga,
        responsavel: data.responsavel,
        candidatos: parseInt(data.candidatos) || 0,
        status: data.status || 'triagem',
        inicio: data.inicio,
        previsao_fim: data.previsaoFim || null,
        descricao: data.descricao,
        observacoes: data.observacoes
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { success: true, data: processo }
  } catch (error: any) {
    console.error('Erro ao atualizar processo:', error)
    return { success: false, error: error.message }
  }
}
