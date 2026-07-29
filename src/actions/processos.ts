'use server'

import { supabase } from '@/lib/supabase/server'

export async function criarProcesso(data: any) {
  try {
    const supabaseClient = supabase()
    
    const { data: processo, error } = await supabaseClient
      .from('processos')
      .insert([{
        vaga: data.vaga,
        vaga_id: data.vaga_id,
        empresa: data.empresa,
        empresa_id: data.empresa_id,
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
