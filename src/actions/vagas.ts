'use server'

import { supabase } from '@/lib/supabase/server'

export async function criarVaga(data: any) {
  try {
    const supabaseClient = supabase()
    
    const { data: vaga, error } = await supabaseClient
      .from('vagas')
      .insert([{
        titulo: data.titulo,
        empresa: data.empresa,
        empresa_id: data.empresa_id || null,
        descricao: data.descricao,
        requisitos: data.requisitos,
        beneficios: data.beneficios,
        local: data.local,
        tipo: data.tipo || 'CLT',
        status: data.status || 'Aberta',
        exibir_carrossel: data.exibirCarrossel || false,
        badge: data.badge || '',
        cor_badge: data.corBadge || '',
        confidencial: data.confidencial || false
      }])
      .select()
      .single()

    if (error) throw error

    return { success: true, data: vaga }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function listarVagas() {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('vagas')
      .select('*')
      .order('id', { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function buscarVagaPorId(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('vagas')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function buscarTodasVagas() {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('vagas')
      .select('*')
      .order('id', { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function atualizarVaga(id: number, data: any) {
  try {
    const supabaseClient = supabase()
    
    const { data: vaga, error } = await supabaseClient
      .from('vagas')
      .update({
        titulo: data.titulo,
        descricao: data.descricao,
        requisitos: data.requisitos,
        beneficios: data.beneficios,
        local: data.local,
        tipo: data.tipo || 'CLT',
        status: data.status || 'Aberta',
        exibir_carrossel: data.exibirCarrossel || false,
        badge: data.badge || '',
        cor_badge: data.corBadge || '',
        confidencial: data.confidencial || false
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return { success: true, data: vaga }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function excluirVaga(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { error } = await supabaseClient
      .from('vagas')
      .delete()
      .eq('id', id)

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
