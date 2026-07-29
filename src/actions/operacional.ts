'use server'

import { supabase } from '@/lib/supabase/server'

// ============================================
// PARTICIPANTES
// ============================================

export async function criarParticipante(data: any) {
  try {
    const supabaseClient = supabase()
    
    const { data: participante, error } = await supabaseClient
      .from('participantes')
      .insert([{
        nome: data.nome,
        telefone: data.telefone,
        cpf: data.cpf || null,
        cidade: data.cidade,
        bairro: data.bairro,
        cargo_pretendido: data.cargoPretendido,
        escolaridade: data.escolaridade,
        experiencia: data.experiencia,
        empresa_atual: data.empresaAtual,
        ultimo_salario: data.ultimoSalario || null,
        disponibilidade: data.disponibilidade,
        observacoes: data.observacoes,
        origem: data.origem || 'manual'
      }])
      .select()
      .single()

    if (error) throw error

    return { success: true, data: participante }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function listarParticipantes() {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('participantes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function buscarParticipantePorId(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('participantes')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function atualizarParticipante(id: number, data: any) {
  try {
    const supabaseClient = supabase()
    
    const { data: participante, error } = await supabaseClient
      .from('participantes')
      .update({
        nome: data.nome,
        telefone: data.telefone,
        cpf: data.cpf || null,
        cidade: data.cidade,
        bairro: data.bairro,
        cargo_pretendido: data.cargoPretendido,
        escolaridade: data.escolaridade,
        experiencia: data.experiencia,
        empresa_atual: data.empresaAtual,
        ultimo_salario: data.ultimoSalario || null,
        disponibilidade: data.disponibilidade,
        observacoes: data.observacoes
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return { success: true, data: participante }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function excluirParticipante(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { error } = await supabaseClient
      .from('participantes')
      .delete()
      .eq('id', id)

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// ============================================
// ENTREVISTAS OPERACIONAIS
// ============================================

export async function criarEntrevistaOperacional(data: any) {
  try {
    const supabaseClient = supabase()
    
    const { data: entrevista, error } = await supabaseClient
      .from('entrevistas_operacionais')
      .insert([{
        participante_id: data.participanteId,
        processo_id: data.processoId || null,
        titulo: data.titulo,
        data: data.data,
        hora: data.hora,
        local: data.local,
        entrevistador: data.entrevistador,
        modelo: data.modelo || 'padrao',
        perguntas: data.perguntas || [],
        respostas: data.respostas || [],
        avaliacao: data.avaliacao || null,
        parecer: data.parecer || null,
        resultado: data.resultado || 'aguardando',
        observacoes: data.observacoes || null
      }])
      .select()
      .single()

    if (error) throw error

    return { success: true, data: entrevista }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function listarEntrevistasOperacionais() {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('entrevistas_operacionais')
      .select('*, participantes(*)')
      .order('data', { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function buscarEntrevistaOperacionalPorId(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('entrevistas_operacionais')
      .select('*, participantes(*)')
      .eq('id', id)
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function atualizarEntrevistaOperacional(id: number, data: any) {
  try {
    const supabaseClient = supabase()
    
    const { data: entrevista, error } = await supabaseClient
      .from('entrevistas_operacionais')
      .update({
        data: data.data,
        hora: data.hora,
        local: data.local,
        entrevistador: data.entrevistador,
        perguntas: data.perguntas || [],
        respostas: data.respostas || [],
        avaliacao: data.avaliacao || null,
        parecer: data.parecer || null,
        resultado: data.resultado || 'aguardando',
        observacoes: data.observacoes || null
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return { success: true, data: entrevista }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function excluirEntrevistaOperacional(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { error } = await supabaseClient
      .from('entrevistas_operacionais')
      .delete()
      .eq('id', id)

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// ============================================
// PROCESSOS OPERACIONAIS
// ============================================

export async function criarProcessoOperacional(data: any) {
  try {
    const supabaseClient = supabase()
    
    const { data: processo, error } = await supabaseClient
      .from('processos_operacionais')
      .insert([{
        nome: data.nome,
        empresa: data.empresa,
        unidade: data.unidade,
        cidade: data.cidade,
        responsavel: data.responsavel,
        consultor: data.consultor || null,
        vagas: parseInt(data.vagas) || 0,
        cargo: data.cargo,
        tipo_contratacao: data.tipoContratacao || 'CLT',
        data_inicio: data.dataInicio,
        status: data.status || 'ativo',
        observacoes: data.observacoes
      }])
      .select()
      .single()

    if (error) throw error

    return { success: true, data: processo }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function listarProcessosOperacionais() {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('processos_operacionais')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function buscarProcessoOperacionalPorId(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('processos_operacionais')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function atualizarProcessoOperacional(id: number, data: any) {
  try {
    const supabaseClient = supabase()
    
    const { data: processo, error } = await supabaseClient
      .from('processos_operacionais')
      .update({
        nome: data.nome,
        empresa: data.empresa,
        unidade: data.unidade,
        cidade: data.cidade,
        responsavel: data.responsavel,
        consultor: data.consultor || null,
        vagas: parseInt(data.vagas) || 0,
        cargo: data.cargo,
        tipo_contratacao: data.tipoContratacao || 'CLT',
        data_inicio: data.dataInicio,
        status: data.status || 'ativo',
        observacoes: data.observacoes
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return { success: true, data: processo }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function excluirProcessoOperacional(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { error } = await supabaseClient
      .from('processos_operacionais')
      .delete()
      .eq('id', id)

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// ============================================
// RELATÓRIOS OPERACIONAIS
// ============================================

export async function getDashboardOperacional() {
  try {
    const supabaseClient = supabase()
    
    const [
      { count: participantes },
      { count: entrevistas },
      { count: processos },
      { data: resultados }
    ] = await Promise.all([
      supabaseClient.from('participantes').select('*', { count: 'exact', head: true }),
      supabaseClient.from('entrevistas_operacionais').select('*', { count: 'exact', head: true }),
      supabaseClient.from('processos_operacionais').select('*', { count: 'exact', head: true }),
      supabaseClient.from('entrevistas_operacionais').select('resultado')
    ])

    const aprovados = resultados?.filter(r => r.resultado === 'aprovado').length || 0
    const reprovados = resultados?.filter(r => r.resultado === 'reprovado').length || 0
    const bancoTalentos = resultados?.filter(r => r.resultado === 'banco_talentos').length || 0

    return {
      success: true,
      data: {
        participantes: participantes || 0,
        entrevistas: entrevistas || 0,
        processos: processos || 0,
        aprovados,
        reprovados,
        bancoTalentos
      }
    }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
