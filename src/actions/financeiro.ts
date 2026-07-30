'use server'

import { createClient } from '@/lib/supabase/server'

// ============================================
// CRIAR TRANSAÇÃO
// ============================================
export async function criarTransacao(data: any) {
  try {
    console.log('🚀 Iniciando criarTransacao')
    console.log('📦 Dados recebidos:', JSON.stringify(data, null, 2))

    const supabase = createClient()
    console.log('✅ Supabase cliente criado')

    // Validar dados obrigatórios
    if (!data.descricao || !data.descricao.trim()) {
      console.error('❌ Descrição é obrigatória')
      return { success: false, error: 'Descrição é obrigatória' }
    }

    if (!data.valor || parseFloat(data.valor) <= 0) {
      console.error('❌ Valor é obrigatório')
      return { success: false, error: 'Valor é obrigatório e deve ser maior que zero' }
    }

    if (!data.categoria) {
      console.error('❌ Categoria é obrigatória')
      return { success: false, error: 'Categoria é obrigatória' }
    }

    // Montar objeto para inserir
    const insertData = {
      tipo: data.tipo || 'receita',
      categoria: data.categoria,
      categoria_detalhada: data.categoria_detalhada || null,
      descricao: data.descricao.trim(),
      cliente: data.cliente || null,
      valor: parseFloat(data.valor) || 0,
      data: data.data || new Date().toISOString().split('T')[0],
      status: data.status || 'pendente',
      observacoes: data.observacoes || null,
      // Campos de parcelamento
      valor_entrada: data.valor_entrada ? parseFloat(data.valor_entrada) : null,
      parcelas_total: data.parcelas_total ? parseInt(data.parcelas_total) : 1,
      parcelas_pagas: data.parcelas_pagas ? parseInt(data.parcelas_pagas) : 0,
      valor_parcela: data.valor_parcela ? parseFloat(data.valor_parcela) : null,
      data_proxima_parcela: data.data_proxima_parcela || null,
      data_ultima_parcela: data.data_ultima_parcela || null,
      comprovante_url: data.comprovanteUrl || null
    }

    console.log('📤 Dados para inserir:', JSON.stringify(insertData, null, 2))

    const { data: transacao, error } = await supabase
      .from('transacoes')
      .insert([insertData])
      .select()
      .single()

    if (error) {
      console.error('❌ Erro Supabase:', error)
      console.error('❌ Mensagem:', error.message)
      console.error('❌ Detalhes:', error.details)
      console.error('❌ Código:', error.code)
      return { success: false, error: error.message }
    }

    console.log('✅ Transação criada com sucesso:', transacao)
    return { success: true, data: transacao }
  } catch (error: any) {
    console.error('❌ Erro geral:', error)
    console.error('❌ Mensagem:', error.message)
    return { success: false, error: error.message }
  }
}

// ============================================
// LISTAR TRANSAÇÕES COM FILTROS
// ============================================
export async function listarTransacoes(filtros?: any) {
  try {
    console.log('🚀 listarTransacoes - Iniciando...')
    const supabase = createClient()

    let query = supabase.from('transacoes').select('*')

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

    if (error) {
      console.error('❌ Erro ao listar transacoes:', error)
      return { success: false, error: error.message }
    }

    console.log('✅ Transações carregadas:', data?.length || 0)
    return { success: true, data: data || [] }
  } catch (error: any) {
    console.error('❌ Erro listarTransacoes:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// BUSCAR TRANSAÇÃO POR ID
// ============================================
export async function buscarTransacaoPorId(id: number) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('transacoes')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('❌ Erro buscarTransacaoPorId:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('❌ Erro buscarTransacaoPorId:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// ATUALIZAR TRANSAÇÃO
// ============================================
export async function atualizarTransacao(id: number, data: any) {
  try {
    const supabase = createClient()

    // Validar dados obrigatórios
    if (!data.descricao || !data.descricao.trim()) {
      return { success: false, error: 'Descrição é obrigatória' }
    }

    if (!data.valor || parseFloat(data.valor) <= 0) {
      return { success: false, error: 'Valor é obrigatório e deve ser maior que zero' }
    }

    const updateData = {
      tipo: data.tipo || 'receita',
      categoria: data.categoria,
      categoria_detalhada: data.categoria_detalhada || null,
      descricao: data.descricao.trim(),
      cliente: data.cliente || null,
      valor: parseFloat(data.valor) || 0,
      data: data.data || new Date().toISOString().split('T')[0],
      status: data.status || 'pendente',
      observacoes: data.observacoes || null,
      valor_entrada: data.valor_entrada ? parseFloat(data.valor_entrada) : null,
      parcelas_total: data.parcelas_total ? parseInt(data.parcelas_total) : 1,
      parcelas_pagas: data.parcelas_pagas ? parseInt(data.parcelas_pagas) : 0,
      valor_parcela: data.valor_parcela ? parseFloat(data.valor_parcela) : null,
      data_proxima_parcela: data.data_proxima_parcela || null,
      data_ultima_parcela: data.data_ultima_parcela || null,
      comprovante_url: data.comprovanteUrl || null
    }

    const { data: transacao, error } = await supabase
      .from('transacoes')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('❌ Erro atualizarTransacao:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: transacao }
  } catch (error: any) {
    console.error('❌ Erro atualizarTransacao:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// EXCLUIR TRANSAÇÃO
// ============================================
export async function excluirTransacao(id: number) {
  try {
    const supabase = createClient()

    const { error } = await supabase
      .from('transacoes')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('❌ Erro excluirTransacao:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error('❌ Erro excluirTransacao:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// ATUALIZAR STATUS DA TRANSAÇÃO
// ============================================
export async function atualizarStatusTransacao(id: number, status: string) {
  try {
    const supabase = createClient()

    const { data: transacao, error } = await supabase
      .from('transacoes')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('❌ Erro atualizarStatusTransacao:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: transacao }
  } catch (error: any) {
    console.error('❌ Erro atualizarStatusTransacao:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// ATUALIZAR PARCELAS PAGAS
// ============================================
export async function atualizarParcelasPagas(id: number, parcelasPagas: number) {
  try {
    const supabase = createClient()

    const { data: transacao, error } = await supabase
      .from('transacoes')
      .update({ parcelas_pagas: parcelasPagas })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('❌ Erro atualizarParcelasPagas:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: transacao }
  } catch (error: any) {
    console.error('❌ Erro atualizarParcelasPagas:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// RESUMO FINANCEIRO
// ============================================
export async function getResumoFinanceiro(ano?: number, mes?: number) {
  try {
    const supabase = createClient()

    const anoAtual = ano || new Date().getFullYear()
    const mesAtual = mes !== undefined ? mes : new Date().getMonth() + 1

    const dataInicio = `${anoAtual}-${String(mesAtual).padStart(2, '0')}-01`
    const ultimoDia = new Date(anoAtual, mesAtual, 0).getDate()
    const dataFim = `${anoAtual}-${String(mesAtual).padStart(2, '0')}-${String(ultimoDia).padStart(2, '0')}`

    const { data: transacoes, error } = await supabase
      .from('transacoes')
      .select('*')
      .gte('data', dataInicio)
      .lte('data', dataFim)

    if (error) {
      console.error('❌ Erro getResumoFinanceiro:', error)
      return { success: false, error: error.message }
    }

    const receitas = transacoes?.filter((t: any) => t.tipo === 'receita') || []
    const despesas = transacoes?.filter((t: any) => t.tipo === 'despesa') || []

    const totalReceitas = receitas.reduce((acc: number, t: any) => acc + t.valor, 0)
    const totalDespesas = despesas.reduce((acc: number, t: any) => acc + t.valor, 0)
    const saldo = totalReceitas - totalDespesas

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

    // Calcular parcelas pendentes
    const parcelasPendentes = transacoes?.filter((t: any) => 
      t.parcelas_total > 1 && t.parcelas_pagas < t.parcelas_total
    ) || []

    const totalParcelasPendentes = parcelasPendentes.reduce((acc: number, t: any) => {
      const restante = t.parcelas_total - t.parcelas_pagas
      return acc + (t.valor_parcela || 0) * restante
    }, 0)

    return {
      success: true,
      data: {
        totalReceitas,
        totalDespesas,
        saldo,
        totalTransacoes: transacoes?.length || 0,
        categorias,
        receitas: receitas.length,
        despesas: despesas.length,
        parcelasPendentes: parcelasPendentes.length,
        totalParcelasPendentes
      }
    }
  } catch (error: any) {
    console.error('❌ Erro getResumoFinanceiro:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// DASHBOARD FINANCEIRO
// ============================================
export async function getDashboardFinanceiro() {
  try {
    const supabase = createClient()

    const hoje = new Date()
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
    const fimMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0)

    const inicioStr = inicioMes.toISOString().split('T')[0]
    const fimStr = fimMes.toISOString().split('T')[0]

    const { data: transacoesMes, error: error1 } = await supabase
      .from('transacoes')
      .select('*')
      .gte('data', inicioStr)
      .lte('data', fimStr)

    if (error1) {
      console.error('❌ Erro getDashboardFinanceiro - transacoesMes:', error1)
      return { success: false, error: error1.message }
    }

    const { count: totalTransacoes, error: error2 } = await supabase
      .from('transacoes')
      .select('*', { count: 'exact', head: true })

    if (error2) {
      console.error('❌ Erro getDashboardFinanceiro - totalTransacoes:', error2)
      return { success: false, error: error2.message }
    }

    const receitasMes = transacoesMes?.filter((t: any) => t.tipo === 'receita') || []
    const despesasMes = transacoesMes?.filter((t: any) => t.tipo === 'despesa') || []

    const totalReceitas = receitasMes.reduce((acc: number, t: any) => acc + t.valor, 0)
    const totalDespesas = despesasMes.reduce((acc: number, t: any) => acc + t.valor, 0)

    const { data: pendentes, error: error3 } = await supabase
      .from('transacoes')
      .select('*')
      .eq('status', 'pendente')

    if (error3) {
      console.error('❌ Erro getDashboardFinanceiro - pendentes:', error3)
      return { success: false, error: error3.message }
    }

    // Calcular total a receber (parcelas pendentes)
    const parcelasPendentes = transacoesMes?.filter((t: any) => 
      t.parcelas_total > 1 && t.parcelas_pagas < t.parcelas_total
    ) || []

    const totalParcelasPendentes = parcelasPendentes.reduce((acc: number, t: any) => {
      const restante = t.parcelas_total - t.parcelas_pagas
      return acc + (t.valor_parcela || 0) * restante
    }, 0)

    return {
      success: true,
      data: {
        totalReceitas,
        totalDespesas,
        saldo: totalReceitas - totalDespesas,
        totalTransacoes: totalTransacoes || 0,
        pendentes: pendentes?.length || 0,
        receitas: receitasMes.length,
        despesas: despesasMes.length,
        parcelasPendentes: parcelasPendentes.length,
        totalParcelasPendentes
      }
    }
  } catch (error: any) {
    console.error('❌ Erro getDashboardFinanceiro:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// FATURAS PENDENTES
// ============================================
export async function getFaturasPendentes() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('transacoes')
      .select('*')
      .eq('status', 'pendente')
      .or('tipo.eq.despesa')
      .order('data', { ascending: true })

    if (error) {
      console.error('❌ Erro getFaturasPendentes:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('❌ Erro getFaturasPendentes:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// PARCELAS A RECEBER
// ============================================
export async function getParcelasAReceber() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('transacoes')
      .select('*')
      .eq('tipo', 'receita')
      .gt('parcelas_total', 1)
      .lt('parcelas_pagas', 'parcelas_total')
      .order('data_proxima_parcela', { ascending: true })

    if (error) {
      console.error('❌ Erro getParcelasAReceber:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('❌ Erro getParcelasAReceber:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// PARCELAS A PAGAR
// ============================================
export async function getParcelasAPagar() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('transacoes')
      .select('*')
      .eq('tipo', 'despesa')
      .gt('parcelas_total', 1)
      .lt('parcelas_pagas', 'parcelas_total')
      .order('data_proxima_parcela', { ascending: true })

    if (error) {
      console.error('❌ Erro getParcelasAPagar:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('❌ Erro getParcelasAPagar:', error)
    return { success: false, error: error.message }
  }
}
