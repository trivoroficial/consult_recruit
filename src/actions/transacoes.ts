'use server'

import { supabase } from '@/lib/supabase/server'

export async function criarTransacao(data: any) {
  try {
    const supabaseClient = supabase()
    
    const { data: transacao, error } = await supabaseClient
      .from('transacoes')
      .insert([{
        tipo: data.tipo,
        categoria: data.categoria,
        descricao: data.descricao,
        cliente: data.cliente,
        valor: parseFloat(data.valor) || 0,
        data: data.data,
        status: data.status || 'pendente',
        observacoes: data.observacoes
      }])
      .select()
      .single()

    if (error) throw error

    return { success: true, data: transacao }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function listarTransacoes() {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('transacoes')
      .select('*')
      .order('id', { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
