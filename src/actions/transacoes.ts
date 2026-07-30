'use server'
import { createClient } from '@/lib/supabase/server'

export async function criarTransacao(data: any) {
  try {
    const supabase = createClient()
    
    const { data: transacao, error } = await supabase
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
    console.error('Erro ao criar transação:', error)
    return { success: false, error: error.message }
  }
}

export async function listarTransacoes() {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('transacoes')
      .select('*')
      .order('id', { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao listar transações:', error)
    return { success: false, error: error.message }
  }
}

export async function buscarTransacaoPorId(id: number) {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('transacoes')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao buscar transação:', error)
    return { success: false, error: error.message }
  }
}

export async function atualizarTransacao(id: number, data: any) {
  try {
    const supabase = createClient()
    
    const { data: transacao, error } = await supabase
      .from('transacoes')
      .update({
        tipo: data.tipo,
        categoria: data.categoria,
        descricao: data.descricao,
        cliente: data.cliente,
        valor: parseFloat(data.valor) || 0,
        data: data.data,
        status: data.status || 'pendente',
        observacoes: data.observacoes
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { success: true, data: transacao }
  } catch (error: any) {
    console.error('Erro ao atualizar transação:', error)
    return { success: false, error: error.message }
  }
}

export async function excluirTransacao(id: number) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase
      .from('transacoes')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true }
  } catch (error: any) {
    console.error('Erro ao excluir transação:', error)
    return { success: false, error: error.message }
  }
}
