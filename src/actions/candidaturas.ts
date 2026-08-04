'use server'

import { createClient } from '@/lib/supabase/server'
import { notificarAtualizacaoCandidatura } from './notificacoes'

// ============================================
// CRIAR CANDIDATURA (Candidato se inscreve)
// ============================================
export async function criarCandidatura(data: {
  candidatoId: number
  vagaId: number
  vagaNome: string
  empresaNome: string
  email: string
}) {
  try {
    const supabase = createClient()

    // Verificar se já existe candidatura para esta vaga
    const { data: existente, error: checkError } = await supabase
      .from('candidaturas')
      .select('id')
      .eq('candidato_id', data.candidatoId)
      .eq('vaga_id', data.vagaId)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError
    }

    if (existente) {
      return { 
        success: false, 
        error: 'Você já se candidatou a esta vaga' 
      }
    }

    // Criar candidatura
    const { data: candidatura, error } = await supabase
      .from('candidaturas')
      .insert([{
        candidato_id: data.candidatoId,
        vaga_id: data.vagaId,
        vaga_nome: data.vagaNome,
        empresa_nome: data.empresaNome,
        status: 'Em análise',
        data_inscricao: new Date().toISOString()
      }])
      .select()
      .single()

    if (error) throw error

    // Criar notificação para o candidato
    await notificarAtualizacaoCandidatura(
      data.candidatoId,
      data.vagaNome,
      'Em análise',
      data.email
    )

    return { success: true, data: candidatura }
  } catch (error: any) {
    console.error('Erro ao criar candidatura:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// LISTAR CANDIDATURAS DO CANDIDATO
// ============================================
export async function listarCandidaturasPorCandidato(candidatoId: number) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('candidaturas')
      .select('*')
      .eq('candidato_id', candidatoId)
      .order('data_inscricao', { ascending: false })

    if (error) throw error
    return { success: true, data: data || [] }
  } catch (error: any) {
    console.error('Erro ao listar candidaturas:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// LISTAR TODAS CANDIDATURAS (ADMIN)
// ============================================
export async function listarTodasCandidaturas() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('candidaturas')
      .select('*, candidatos(nome, email, telefone)')
      .order('data_inscricao', { ascending: false })

    if (error) throw error
    return { success: true, data: data || [] }
  } catch (error: any) {
    console.error('Erro ao listar todas candidaturas:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// BUSCAR CANDIDATURA POR ID
// ============================================
export async function buscarCandidaturaPorId(id: number) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('candidaturas')
      .select('*, candidatos(*)')
      .eq('id', id)
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao buscar candidatura:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// ATUALIZAR STATUS DA CANDIDATURA (ADMIN)
// ============================================
export async function atualizarStatusCandidatura(
  id: number,
  status: string,
  email: string,
  candidatoId: number,
  vagaNome: string
) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('candidaturas')
      .update({ 
        status,
        data_atualizacao: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    // Notificar candidato
    await notificarAtualizacaoCandidatura(
      candidatoId,
      vagaNome,
      status,
      email
    )

    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao atualizar status da candidatura:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// EXCLUIR CANDIDATURA
// ============================================
export async function excluirCandidatura(id: number) {
  try {
    const supabase = createClient()

    const { error } = await supabase
      .from('candidaturas')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true }
  } catch (error: any) {
    console.error('Erro ao excluir candidatura:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// CONTAR CANDIDATURAS POR CANDIDATO
// ============================================
export async function contarCandidaturasPorCandidato(candidatoId: number) {
  try {
    const supabase = createClient()

    const { count, error } = await supabase
      .from('candidaturas')
      .select('*', { count: 'exact', head: true })
      .eq('candidato_id', candidatoId)

    if (error) throw error
    return { success: true, count: count || 0 }
  } catch (error: any) {
    console.error('Erro ao contar candidaturas:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// VERIFICAR SE CANDIDATO JÁ SE CANDIDATOU
// ============================================
export async function verificarCandidaturaExistente(candidatoId: number, vagaId: number) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('candidaturas')
      .select('id')
      .eq('candidato_id', candidatoId)
      .eq('vaga_id', vagaId)
      .maybeSingle()

    if (error) throw error
    return { success: true, existe: !!data }
  } catch (error: any) {
    console.error('Erro ao verificar candidatura:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// ADICIONAR NOTA/AVALIAÇÃO DO ADMIN
// ============================================
export async function adicionarAvaliacaoCandidatura(
  id: number,
  avaliacao: string,
  nota?: number
) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('candidaturas')
      .update({ 
        avaliacao_admin: avaliacao,
        nota_admin: nota || null,
        data_avaliacao: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao adicionar avaliação:', error)
    return { success: false, error: error.message }
  }
}
