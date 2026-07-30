'use server'

import { createClient } from '@/lib/supabase/server'

// ============================================
// CRIAR EVENTO
// ============================================
export async function criarEvento(data: any) {
  try {
    console.log('🚀 criarEvento - Iniciando')
    const supabase = createClient()

    const { data: evento, error } = await supabase
      .from('agenda')
      .insert([{
        titulo: data.titulo,
        descricao: data.descricao || null,
        data: data.data,
        hora_inicio: data.hora_inicio || null,
        hora_fim: data.hora_fim || null,
        local: data.local || null,
        tipo: data.tipo || 'compromisso',
        status: data.status || 'pendente',
        responsavel: data.responsavel || null,
        observacoes: data.observacoes || null
      }])
      .select()
      .single()

    if (error) {
      console.error('❌ Erro criarEvento:', error)
      return { success: false, error: error.message }
    }

    console.log('✅ Evento criado:', evento)
    return { success: true, data: evento }
  } catch (error: any) {
    console.error('❌ Erro criarEvento:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// LISTAR EVENTOS
// ============================================
export async function listarEventos() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('agenda')
      .select('*')
      .order('data', { ascending: true })

    if (error) {
      console.error('❌ Erro listarEventos:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data || [] }
  } catch (error: any) {
    console.error('❌ Erro listarEventos:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// BUSCAR EVENTO POR ID
// ============================================
export async function buscarEventoPorId(id: number) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('agenda')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('❌ Erro buscarEventoPorId:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('❌ Erro buscarEventoPorId:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// ATUALIZAR EVENTO
// ============================================
export async function atualizarEvento(id: number, data: any) {
  try {
    console.log('🚀 atualizarEvento - Iniciando')
    const supabase = createClient()

    const { data: evento, error } = await supabase
      .from('agenda')
      .update({
        titulo: data.titulo,
        descricao: data.descricao || null,
        data: data.data,
        hora_inicio: data.hora_inicio || null,
        hora_fim: data.hora_fim || null,
        local: data.local || null,
        tipo: data.tipo || 'compromisso',
        status: data.status || 'pendente',
        responsavel: data.responsavel || null,
        observacoes: data.observacoes || null
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('❌ Erro atualizarEvento:', error)
      return { success: false, error: error.message }
    }

    console.log('✅ Evento atualizado:', evento)
    return { success: true, data: evento }
  } catch (error: any) {
    console.error('❌ Erro atualizarEvento:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// EXCLUIR EVENTO
// ============================================
export async function excluirEvento(id: number) {
  try {
    const supabase = createClient()

    const { error } = await supabase
      .from('agenda')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('❌ Erro excluirEvento:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error('❌ Erro excluirEvento:', error)
    return { success: false, error: error.message }
  }
}
