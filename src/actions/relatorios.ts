'use server'
import { createClient } from '@/lib/supabase/server'

export async function gerarRelatorioFinanceiro(data: any) {
  try {
    const supabase = createClient()
    
    let query = supabase
      .from('transacoes')
      .select('*')

    if (data.dataInicio) {
      query = query.gte('data', data.dataInicio)
    }
    if (data.dataFim) {
      query = query.lte('data', data.dataFim)
    }
    if (data.tipo) {
      query = query.eq('tipo', data.tipo)
    }

    const { data: transacoes, error } = await query.order('data', { ascending: false })
    if (error) throw error

    const totalReceitas = transacoes?.filter((t: any) => t.tipo === 'receita').reduce((acc: number, t: any) => acc + t.valor, 0) || 0
    const totalDespesas = transacoes?.filter((t: any) => t.tipo === 'despesa').reduce((acc: number, t: any) => acc + t.valor, 0) || 0
    const saldo = totalReceitas - totalDespesas

    return { 
      success: true, 
      data: {
        transacoes,
        totalReceitas,
        totalDespesas,
        saldo,
        total: transacoes?.length || 0
      } 
    }
  } catch (error: any) {
    console.error('Erro ao gerar relatório financeiro:', error)
    return { success: false, error: error.message }
  }
}

export async function gerarRelatorioProcessos(data: any) {
  try {
    const supabase = createClient()
    
    let query = supabase
      .from('processos')
      .select('*')

    if (data.status) {
      query = query.eq('status', data.status)
    }
    if (data.dataInicio) {
      query = query.gte('inicio', data.dataInicio)
    }

    const { data: processos, error } = await query.order('id', { ascending: false })
    if (error) throw error

    const statusCount = {
      triagem: processos?.filter((p: any) => p.status === 'triagem').length || 0,
      entrevista: processos?.filter((p: any) => p.status === 'entrevista').length || 0,
      aprovado: processos?.filter((p: any) => p.status === 'aprovado').length || 0,
      encerrado: processos?.filter((p: any) => p.status === 'encerrado').length || 0
    }

    return { 
      success: true, 
      data: {
        processos,
        statusCount,
        total: processos?.length || 0
      } 
    }
  } catch (error: any) {
    console.error('Erro ao gerar relatório de processos:', error)
    return { success: false, error: error.message }
  }
}

export async function gerarRelatorioCandidatos(data: any) {
  try {
    const supabase = createClient()
    
    let query = supabase
      .from('candidatos')
      .select('*')

    if (data.status) {
      query = query.eq('status', data.status)
    }
    if (data.cidade) {
      query = query.eq('cidade', data.cidade)
    }

    const { data: candidatos, error } = await query.order('id', { ascending: false })
    if (error) throw error

    const statusCount = {
      Disponivel: candidatos?.filter((c: any) => c.status === 'Disponível').length || 0,
      EmProcesso: candidatos?.filter((c: any) => c.status === 'Em processo').length || 0,
      Contratado: candidatos?.filter((c: any) => c.status === 'Contratado').length || 0,
      Inativo: candidatos?.filter((c: any) => c.status === 'Inativo').length || 0
    }

    return { 
      success: true, 
      data: {
        candidatos,
        statusCount,
        total: candidatos?.length || 0
      } 
    }
  } catch (error: any) {
    console.error('Erro ao gerar relatório de candidatos:', error)
    return { success: false, error: error.message }
  }
}

export async function gerarRelatorioVagas(data: any) {
  try {
    const supabase = createClient()
    
    let query = supabase
      .from('vagas')
      .select('*')

    if (data.status) {
      query = query.eq('status', data.status)
    }
    if (data.tipo) {
      query = query.eq('tipo', data.tipo)
    }

    const { data: vagas, error } = await query.order('id', { ascending: false })
    if (error) throw error

    const statusCount = {
      Aberta: vagas?.filter((v: any) => v.status === 'Aberta').length || 0,
      EmAnalise: vagas?.filter((v: any) => v.status === 'Em análise').length || 0,
      Pausada: vagas?.filter((v: any) => v.status === 'Pausada').length || 0,
      Fechada: vagas?.filter((v: any) => v.status === 'Fechada').length || 0
    }

    const totalCandidatos = vagas?.reduce((acc: number, v: any) => acc + (v.candidatos || 0), 0) || 0

    return { 
      success: true, 
      data: {
        vagas,
        statusCount,
        totalCandidatos,
        total: vagas?.length || 0
      } 
    }
  } catch (error: any) {
    console.error('Erro ao gerar relatório de vagas:', error)
    return { success: false, error: error.message }
  }
}

export async function exportarRelatorioExcel(data: any, tipo: string) {
  try {
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao exportar Excel:', error)
    return { success: false, error: error.message }
  }
}

export async function exportarRelatorioPDF(data: any, tipo: string) {
  try {
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao exportar PDF:', error)
    return { success: false, error: error.message }
  }
}
