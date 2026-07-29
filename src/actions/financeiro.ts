'use server'

import { supabase } from '@/lib/supabase/server'

// ============================================
// TRANSAÇÕES
// ============================================

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
        observacoes: data.observacoes,
        categoria_detalhada: data.categoriaDetalhada || null,
        comprovante_url: data.comprovanteUrl || null
      }])
      .select()
      .single()

    if (error) throw error

    return { success: true, data: transacao }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function listarTransacoes(filtros?: any) {
  try {
    const supabaseClient = supabase()
    
    let query = supabaseClient
      .from('transacoes')
      .select('*')
    
    if (filtros?.tipo) {
      query = query.eq('tipo', filtros.tipo)
    }
    if (filtros?.status) {
      query = query.eq('status', filtros.status)
    }
    if (filtros?.categoria) {
      query = query.eq('categoria', filtros.categoria)
    }
    if (filtros?.dataInicio) {
      query = query.gte('data', filtros.dataInicio)
    }
    if (filtros?.dataFim) {
      query = query.lte('data', filtros.dataFim)
    }
    
    const { data, error } = await query.order('id', { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function buscarTransacaoPorId(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('transacoes')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function atualizarTransacao(id: number, data: any) {
  try {
    const supabaseClient = supabase()
    
    const { data: transacao, error } = await supabaseClient
      .from('transacoes')
      .update({
        tipo: data.tipo,
        categoria: data.categoria,
        descricao: data.descricao,
        cliente: data.cliente,
        valor: parseFloat(data.valor) || 0,
        data: data.data,
        status: data.status || 'pendente',
        observacoes: data.observacoes,
        categoria_detalhada: data.categoriaDetalhada || null,
        comprovante_url: data.comprovanteUrl || null
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return { success: true, data: transacao }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function excluirTransacao(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { error } = await supabaseClient
      .from('transacoes')
      .delete()
      .eq('id', id)

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function atualizarStatusTransacao(id: number, status: string) {
  try {
    const supabaseClient = supabase()
    
    const { data: transacao, error } = await supabaseClient
      .from('transacoes')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return { success: true, data: transacao }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// ============================================
// RESUMOS E ESTATÍSTICAS
// ============================================

export async function getResumoFinanceiro(ano?: number, mes?: number) {
  try {
    const supabaseClient = supabase()
    
    const anoAtual = ano || new Date().getFullYear()
    const mesAtual = mes !== undefined ? mes : new Date().getMonth() + 1
    
    const { data: transacoes, error } = await supabaseClient
      .from('transacoes')
      .select('*')
      .gte('data', `${anoAtual}-${String(mesAtual).padStart(2, '0')}-01`)
      .lte('data', `${anoAtual}-${String(mesAtual).padStart(2, '0')}-31`)

    if (error) throw error

    const receitas = transacoes?.filter((t: any) => t.tipo === 'receita') || []
    const despesas = transacoes?.filter((t: any) => t.tipo === 'despesa') || []
    
    const totalReceitas = receitas.reduce((acc: number, t: any) => acc + t.valor, 0)
    const totalDespesas = despesas.reduce((acc: number, t: any) => acc + t.valor, 0)
    const saldo = totalReceitas - totalDespesas

    // Agrupar por categoria
    const categorias = transacoes?.reduce((acc: any, t: any) => {
      if (!acc[t.categoria]) {
        acc[t.categoria] = { receita: 0, despesa: 0 }
      }
      if (t.tipo === 'receita') {
        acc[t.categoria].receita += t.valor
      } else {
        acc[t.categoria].despesa += t.valor
      }
      return acc
    }, {})

    return {
      success: true,
      data: {
        totalReceitas,
        totalDespesas,
        saldo,
        totalTransacoes: transacoes?.length || 0,
        categorias,
        receitas: receitas.length,
        despesas: despesas.length
      }
    }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getResumoFinanceiroPorPeriodo(dataInicio: string, dataFim: string) {
  try {
    const supabaseClient = supabase()
    
    const { data: transacoes, error } = await supabaseClient
      .from('transacoes')
      .select('*')
      .gte('data', dataInicio)
      .lte('data', dataFim)

    if (error) throw error

    const receitas = transacoes?.filter((t: any) => t.tipo === 'receita') || []
    const despesas = transacoes?.filter((t: any) => t.tipo === 'despesa') || []
    
    const totalReceitas = receitas.reduce((acc: number, t: any) => acc + t.valor, 0)
    const totalDespesas = despesas.reduce((acc: number, t: any) => acc + t.valor, 0)
    const saldo = totalReceitas - totalDespesas

    return {
      success: true,
      data: {
        totalReceitas,
        totalDespesas,
        saldo,
        totalTransacoes: transacoes?.length || 0,
        receitas: receitas.length,
        despesas: despesas.length
      }
    }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// ============================================
// PAGAMENTOS E FATURAS
// ============================================

export async function getFaturasPendentes() {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('transacoes')
      .select('*')
      .eq('status', 'pendente')
      .or('tipo.eq.despesa')
      .order('data', { ascending: true })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getFaturasVencidas() {
  try {
    const supabaseClient = supabase()
    
    const hoje = new Date().toISOString().split('T')[0]
    
    const { data, error } = await supabaseClient
      .from('transacoes')
      .select('*')
      .eq('status', 'pendente')
      .eq('tipo', 'despesa')
      .lt('data', hoje)
      .order('data', { ascending: true })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getFluxoCaixaDiario() {
  try {
    const supabaseClient = supabase()
    
    const hoje = new Date().toISOString().split('T')[0]
    
    const { data: transacoes, error } = await supabaseClient
      .from('transacoes')
      .select('*')
      .eq('data', hoje)

    if (error) throw error

    const receitas = transacoes?.filter((t: any) => t.tipo === 'receita') || []
    const despesas = transacoes?.filter((t: any) => t.tipo === 'despesa') || []
    
    const totalReceitas = receitas.reduce((acc: number, t: any) => acc + t.valor, 0)
    const totalDespesas = despesas.reduce((acc: number, t: any) => acc + t.valor, 0)
    const saldo = totalReceitas - totalDespesas

    return {
      success: true,
      data: {
        data: hoje,
        totalReceitas,
        totalDespesas,
        saldo,
        receitas: receitas.length,
        despesas: despesas.length,
        transacoes
      }
    }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// ============================================
// DASHBOARD FINANCEIRO
// ============================================

export async function getDashboardFinanceiro() {
  try {
    const supabaseClient = supabase()
    
    const hoje = new Date()
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1).toISOString().split('T')[0]
    const fimMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).toISOString().split('T')[0]
    
    // Buscar transações do mês atual
    const { data: transacoesMes, error: error1 } = await supabaseClient
      .from('transacoes')
      .select('*')
      .gte('data', inicioMes)
      .lte('data', fimMes)

    if (error1) throw error1

    // Buscar total de transações
    const { count: totalTransacoes, error: error2 } = await supabaseClient
      .from('transacoes')
      .select('*', { count: 'exact', head: true })

    if (error2) throw error2

    const receitasMes = transacoesMes?.filter((t: any) => t.tipo === 'receita') || []
    const despesasMes = transacoesMes?.filter((t: any) => t.tipo === 'despesa') || []
    
    const totalReceitas = receitasMes.reduce((acc: number, t: any) => acc + t.valor, 0)
    const totalDespesas = despesasMes.reduce((acc: number, t: any) => acc + t.valor, 0)

    // Pendencias
    const { data: pendentes, error: error3 } = await supabaseClient
      .from('transacoes')
      .select('*')
      .eq('status', 'pendente')

    if (error3) throw error3

    return {
      success: true,
      data: {
        totalReceitas,
        totalDespesas,
        saldo: totalReceitas - totalDespesas,
        totalTransacoes: totalTransacoes || 0,
        pendentes: pendentes?.length || 0,
        receitas: receitasMes.length,
        despesas: despesasMes.length
      }
    }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
