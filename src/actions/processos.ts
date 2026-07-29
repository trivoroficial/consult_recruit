'use server'

import { supabase } from '@/lib/supabase/server'

export async function criarProcesso(data: any) {
  try {
    const supabaseClient = supabase()
    
    const { data: processo, error } = await supabaseClient
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
        descricao: data.descricao,
        observacoes: data.observacoes
      }])
      .select()
      .single()

    if (error) throw error

    return { success: true, data: processo }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function listarProcessos() {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('processos')
      .select('*')
      .order('id', { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function buscarProcessoPorId(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('processos')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function atualizarProcesso(id: number, data: any) {
  try {
    const supabaseClient = supabase()
    
    const { data: processo, error } = await supabaseClient
      .from('processos')
      .update({
        vaga: data.vaga,
        responsavel: data.responsavel,
        candidatos: parseInt(data.candidatos) || 0,
        status: data.status || 'triagem',
        inicio: data.inicio,
        descricao: data.descricao,
        observacoes: data.observacoes
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return { success: true, data: processo }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function excluirProcesso(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { error } = await supabaseClient
      .from('processos')
      .delete()
      .eq('id', id)

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
