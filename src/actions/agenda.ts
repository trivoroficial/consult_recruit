'use server'
import { createClient } from '@/lib/supabase/server'

export async function criarEvento(data: any) {
  try {
    const supabase = createClient()
    
    const { data: evento, error } = await supabase
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
    console.error('Erro ao criar evento:', error)
    return { success: false, error: error.message }
  }
}

export async function listarEventos() {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('agenda')
      .select('*')
      .order('data', { ascending: true })

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao listar eventos:', error)
    return { success: false, error: error.message }
  }
}

export async function excluirEvento(id: number) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase
      .from('agenda')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true }
  } catch (error: any) {
    console.error('Erro ao excluir evento:', error)
    return { success: false, error: error.message }
  }
}

export async function buscarEventoPorId(id: number) {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('agenda')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao buscar evento:', error)
    return { success: false, error: error.message }
  }
}

export async function atualizarEvento(id: number, data: any) {
  try {
    const supabase = createClient()
    
    const { data: evento, error } = await supabase
      .from('agenda')
      .update({
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
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { success: true, data: evento }
  } catch (error: any) {
    console.error('Erro ao atualizar evento:', error)
    return { success: false, error: error.message }
  }
}
