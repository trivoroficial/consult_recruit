'use server'

import { createClient } from '@/lib/supabase/server'
import { enviarEmailNotificacao } from './email'

// ============================================
// CRIAR NOTIFICAÇÃO PARA CANDIDATO
// ============================================
export async function criarNotificacaoCandidato(data: {
  candidatoId: number
  titulo: string
  mensagem: string
  tipo?: 'info' | 'success' | 'warning' | 'error'
  link?: string
}) {
  try {
    const supabase = createClient()

    const { data: notificacao, error } = await supabase
      .from('notificacoes_candidato')
      .insert([{
        candidato_id: data.candidatoId,
        titulo: data.titulo,
        mensagem: data.mensagem,
        tipo: data.tipo || 'info',
        link: data.link || null
      }])
      .select()
      .single()

    if (error) throw error

    return { success: true, data: notificacao }
  } catch (error: any) {
    console.error('Erro ao criar notificação:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// LISTAR NOTIFICAÇÕES DO CANDIDATO
// ============================================
export async function listarNotificacoesCandidato(candidatoId: number) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('notificacoes_candidato')
      .select('*')
      .eq('candidato_id', candidatoId)
      .order('data', { ascending: false })

    if (error) throw error
    return { success: true, data: data || [] }
  } catch (error: any) {
    console.error('Erro ao listar notificações:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// MARCAR NOTIFICAÇÃO COMO LIDA
// ============================================
export async function marcarNotificacaoCandidatoLida(id: number) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('notificacoes_candidato')
      .update({ lida: true })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao marcar notificação como lida:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// MARCAR TODAS COMO LIDAS
// ============================================
export async function marcarTodasNotificacoesCandidatoLidas(candidatoId: number) {
  try {
    const supabase = createClient()

    const { error } = await supabase
      .from('notificacoes_candidato')
      .update({ lida: true })
      .eq('candidato_id', candidatoId)
      .eq('lida', false)

    if (error) throw error
    return { success: true }
  } catch (error: any) {
    console.error('Erro ao marcar todas como lidas:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// CONTAR NÃO LIDAS
// ============================================
export async function contarNotificacoesNaoLidasCandidato(candidatoId: number) {
  try {
    const supabase = createClient()

    const { count, error } = await supabase
      .from('notificacoes_candidato')
      .select('*', { count: 'exact', head: true })
      .eq('candidato_id', candidatoId)
      .eq('lida', false)

    if (error) throw error
    return { success: true, count: count || 0 }
  } catch (error: any) {
    console.error('Erro ao contar notificações não lidas:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// EXCLUIR NOTIFICAÇÃO
// ============================================
export async function excluirNotificacaoCandidato(id: number) {
  try {
    const supabase = createClient()

    const { error } = await supabase
      .from('notificacoes_candidato')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true }
  } catch (error: any) {
    console.error('Erro ao excluir notificação:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// NOTIFICAR CANDIDATO SOBRE ATUALIZAÇÃO
// ============================================
export async function notificarAtualizacaoCandidatura(
  candidatoId: number,
  vagaNome: string,
  novoStatus: string,
  email: string
) {
  try {
    const titulo = `Atualização na sua candidatura: ${vagaNome}`
    const mensagem = `O status da sua candidatura para "${vagaNome}" mudou para "${novoStatus}"`
    const link = `/candidato/candidaturas`

    // 1. Criar notificação no sistema
    await criarNotificacaoCandidato({
      candidatoId,
      titulo,
      mensagem,
      tipo: 'warning',
      link
    })

    // 2. Enviar email
    await enviarEmailNotificacao(email, titulo, mensagem)

    return { success: true }
  } catch (error: any) {
    console.error('Erro ao notificar candidato:', error)
    return { success: false, error: error.message }
  }
}
