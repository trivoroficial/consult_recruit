'use server'
import { createClient } from '@/lib/supabase/server'

export async function criarNotificacao(data: any) {
  try {
    const supabase = createClient()
    
    const { data: notificacao, error } = await supabase
      .from('notificacoes')
      .insert([{
        titulo: data.titulo,
        mensagem: data.mensagem,
        tipo: data.tipo || 'info',
        user_id: data.userId || null,
        link: data.link || null,
        icone: data.icone || null
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

export async function listarNotificacoes() {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('notificacoes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao listar notificações:', error)
    return { success: false, error: error.message }
  }
}

export async function getNotificacoesNaoLidas() {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('notificacoes')
      .select('*')
      .eq('lida', false)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao buscar notificações não lidas:', error)
    return { success: false, error: error.message }
  }
}

export async function marcarComoLida(id: number) {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('notificacoes')
      .update({ lida: true, lida_em: new Date().toISOString() })
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

export async function marcarTodasComoLidas() {
  try {
    const supabase = createClient()
    
    const { error } = await supabase
      .from('notificacoes')
      .update({ lida: true, lida_em: new Date().toISOString() })
      .eq('lida', false)

    if (error) throw error
    return { success: true }
  } catch (error: any) {
    console.error('Erro ao marcar todas como lidas:', error)
    return { success: false, error: error.message }
  }
}

export async function excluirNotificacao(id: number) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase
      .from('notificacoes')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true }
  } catch (error: any) {
    console.error('Erro ao excluir notificação:', error)
    return { success: false, error: error.message }
  }
}
