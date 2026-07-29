'use server'

import { supabase } from '@/lib/supabase/server'

export async function criarNotificacao(data: any) {
  try {
    const supabaseClient = supabase()
    
    const { data: notificacao, error } = await supabaseClient
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
    return { success: false, error: error.message }
  }
}

export async function listarNotificacoes() {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('notificacoes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getNotificacoesNaoLidas() {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('notificacoes')
      .select('*')
      .eq('lida', false)
      .order('created_at', { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function marcarComoLida(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('notificacoes')
      .update({ lida: true, lida_em: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function marcarTodasComoLidas() {
  try {
    const supabaseClient = supabase()
    
    const { error } = await supabaseClient
      .from('notificacoes')
      .update({ lida: true, lida_em: new Date().toISOString() })
      .eq('lida', false)

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function excluirNotificacao(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { error } = await supabaseClient
      .from('notificacoes')
      .delete()
      .eq('id', id)

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
