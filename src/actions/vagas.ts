'use server'

import { createClient } from '@/lib/supabase/server'

export async function listarVagas() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('vagas')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error('❌ Erro Supabase listarVagas:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data || [] }
  } catch (error: any) {
    console.error('❌ Erro listarVagas:', error)
    return { success: false, error: error.message }
  }
}

export async function excluirVaga(id: number) {
  try {
    const supabase = createClient()

    const { error } = await supabase
      .from('vagas')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('❌ Erro excluirVaga:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error('❌ Erro excluirVaga:', error)
    return { success: false, error: error.message }
  }
}

export async function criarVaga(data: any) {
  try {
    const supabase = createClient()

    const { data: vaga, error } = await supabase
      .from('vagas')
      .insert([{
        titulo: data.titulo,
        empresa: data.empresa,
        empresa_id: data.empresa_id || null,
        descricao: data.descricao || null,
        requisitos: data.requisitos || null,
        beneficios: data.beneficios || null,
        local: data.local || null,
        tipo: data.tipo || 'CLT',
        status: data.status || 'Aberta',
        exibir_carrossel: data.exibir_carrossel || false,
        badge: data.badge || null,
        cor_badge: data.cor_badge || '#6B1A2A',
        confidencial: data.confidencial || false,
        salario_inicial: data.salario_inicial || null,
        salario_final: data.salario_final || null
      }])
      .select()
      .single()

    if (error) {
      console.error('❌ Erro criarVaga:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: vaga }
  } catch (error: any) {
    console.error('❌ Erro criarVaga:', error)
    return { success: false, error: error.message }
  }
}

export async function buscarVagaPorId(id: number) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('vagas')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('❌ Erro buscarVagaPorId:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('❌ Erro buscarVagaPorId:', error)
    return { success: false, error: error.message }
  }
}

export async function atualizarVaga(id: number, data: any) {
  try {
    const supabase = createClient()

    const { data: vaga, error } = await supabase
      .from('vagas')
      .update({
        titulo: data.titulo,
        empresa: data.empresa,
        empresa_id: data.empresa_id || null,
        descricao: data.descricao || null,
        requisitos: data.requisitos || null,
        beneficios: data.beneficios || null,
        local: data.local || null,
        tipo: data.tipo || 'CLT',
        status: data.status || 'Aberta',
        exibir_carrossel: data.exibir_carrossel || false,
        badge: data.badge || null,
        cor_badge: data.cor_badge || '#6B1A2A',
        confidencial: data.confidencial || false,
        salario_inicial: data.salario_inicial || null,
        salario_final: data.salario_final || null
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('❌ Erro atualizarVaga:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: vaga }
  } catch (error: any) {
    console.error('❌ Erro atualizarVaga:', error)
    return { success: false, error: error.message }
  }
}
