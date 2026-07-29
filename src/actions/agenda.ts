'use server'

import { supabase } from '@/lib/supabase/server'

export async function criarEvento(data: any) {
  try {
    const supabaseClient = supabase()
    
    const { data: evento, error } = await supabaseClient
      .from('agenda')
      .insert([{
        titulo: data.titulo,
        descricao: data.descricao,
        data: data.data,
        hora_inicio: data.horaInicio,
        hora_fim: data.horaFim,
        local: data.local,
        tipo: data.tipo || 'compromisso',
        status: data.status || 'pendente',
        responsavel: data.responsavel,
        observacoes: data.observacoes
      }])
      .select()
      .single()

    if (error) throw error

    return { success: true, data: evento }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function listarEventos() {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('agenda')
      .select('*')
      .order('data', { ascending: true })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function excluirEvento(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { error } = await supabaseClient
      .from('agenda')
      .delete()
      .eq('id', id)

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
