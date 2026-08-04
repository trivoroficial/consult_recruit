'use server'

import { createClient } from '@/lib/supabase/server'

// ============================================
// PARTICIPANTES (SEM USUÁRIO, SEM NOTIFICAÇÃO)
// ============================================

export async function criarParticipante(data: any) {
  try {
    console.log('🚀 criarParticipante - Iniciando')
    const supabase = createClient()

    const { data: participante, error } = await supabase
      .from('participantes')
      .insert([{
        nome: data.nome,
        email: data.email || null,
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
        origem: data.origem || 'operacional',
        status: 'ativo'
      }])
      .select()
      .single()

    if (error) {
      console.error('❌ Erro ao criar participante:', error)
      return { success: false, error: error.message }
    }

    console.log('✅ Participante criado (SEM USUÁRIO):', participante)

    // ❌ NÃO cria usuário no Auth
    // ❌ NÃO envia notificação
    // ❌ NÃO envia email
    // ❌ NÃO dá acesso ao sistema

    return { success: true, data: participante }
  } catch (error: any) {
    console.error('❌ Erro criarParticipante:', error)
    return { success: false, error: error.message }
  }
}

export async function listarParticipantes() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('participantes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Erro listarParticipantes:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data || [] }
  } catch (error: any) {
    console.error('❌ Erro listarParticipantes:', error)
    return { success: false, error: error.message }
  }
}

export async function buscarParticipantePorId(id: number) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('participantes')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('❌ Erro buscarParticipantePorId:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('❌ Erro buscarParticipantePorId:', error)
    return { success: false, error: error.message }
  }
}

export async function atualizarParticipante(id: number, data: any) {
  try {
    const supabase = createClient()

    const { data: participante, error } = await supabase
      .from('participantes')
      .update({
        nome: data.nome,
        email: data.email || null,
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
        status: data.status || 'ativo'
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('❌ Erro atualizarParticipante:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: participante }
  } catch (error: any) {
    console.error('❌ Erro atualizarParticipante:', error)
    return { success: false, error: error.message }
  }
}

export async function excluirParticipante(id: number) {
  try {
    const supabase = createClient()

    const { error } = await supabase
      .from('participantes')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('❌ Erro excluirParticipante:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error('❌ Erro excluirParticipante:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// ENTREVISTAS OPERACIONAIS
// ============================================

export async function criarEntrevistaOperacional(data: any) {
  try {
    const supabase = createClient()

    const { data: entrevista, error } = await supabase
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
        observacoes: data.observacoes || null,
        // Campos de controle
        liberado_para_participante: false,
        preenchido_por: 'admin'
      }])
      .select()
      .single()

    if (error) {
      console.error('❌ Erro criarEntrevistaOperacional:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: entrevista }
  } catch (error: any) {
    console.error('❌ Erro criarEntrevistaOperacional:', error)
    return { success: false, error: error.message }
  }
}

export async function listarEntrevistasOperacionais() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('entrevistas_operacionais')
      .select('*, participantes(*)')
      .order('data', { ascending: false })

    if (error) {
      console.error('❌ Erro listarEntrevistasOperacionais:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data || [] }
  } catch (error: any) {
    console.error('❌ Erro listarEntrevistasOperacionais:', error)
    return { success: false, error: error.message }
  }
}

export async function buscarEntrevistaOperacionalPorId(id: number) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('entrevistas_operacionais')
      .select('*, participantes(*)')
      .eq('id', id)
      .single()

    if (error) {
      console.error('❌ Erro buscarEntrevistaOperacionalPorId:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('❌ Erro buscarEntrevistaOperacionalPorId:', error)
    return { success: false, error: error.message }
  }
}

export async function atualizarEntrevistaOperacional(id: number, data: any) {
  try {
    const supabase = createClient()

    const updateData: any = {
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
    }

    // Se o admin está preenchendo, marcar como admin
    if (data.preenchido_por) {
      updateData.preenchido_por = data.preenchido_por
      updateData.data_preenchimento = new Date().toISOString()
    }

    const { data: entrevista, error } = await supabase
      .from('entrevistas_operacionais')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('❌ Erro atualizarEntrevistaOperacional:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: entrevista }
  } catch (error: any) {
    console.error('❌ Erro atualizarEntrevistaOperacional:', error)
    return { success: false, error: error.message }
  }
}

export async function excluirEntrevistaOperacional(id: number) {
  try {
    const supabase = createClient()

    const { error } = await supabase
      .from('entrevistas_operacionais')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('❌ Erro excluirEntrevistaOperacional:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error('❌ Erro excluirEntrevistaOperacional:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// PROCESSOS OPERACIONAIS
// ============================================

export async function criarProcessoOperacional(data: any) {
  try {
    const supabase = createClient()

    const { data: processo, error } = await supabase
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

    if (error) {
      console.error('❌ Erro criarProcessoOperacional:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: processo }
  } catch (error: any) {
    console.error('❌ Erro criarProcessoOperacional:', error)
    return { success: false, error: error.message }
  }
}

export async function listarProcessosOperacionais() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('processos_operacionais')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Erro listarProcessosOperacionais:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data || [] }
  } catch (error: any) {
    console.error('❌ Erro listarProcessosOperacionais:', error)
    return { success: false, error: error.message }
  }
}

export async function buscarProcessoOperacionalPorId(id: number) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('processos_operacionais')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('❌ Erro buscarProcessoOperacionalPorId:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('❌ Erro buscarProcessoOperacionalPorId:', error)
    return { success: false, error: error.message }
  }
}

export async function atualizarProcessoOperacional(id: number, data: any) {
  try {
    const supabase = createClient()

    const { data: processo, error } = await supabase
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

    if (error) {
      console.error('❌ Erro atualizarProcessoOperacional:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: processo }
  } catch (error: any) {
    console.error('❌ Erro atualizarProcessoOperacional:', error)
    return { success: false, error: error.message }
  }
}

export async function excluirProcessoOperacional(id: number) {
  try {
    const supabase = createClient()

    const { error } = await supabase
      .from('processos_operacionais')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('❌ Erro excluirProcessoOperacional:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error('❌ Erro excluirProcessoOperacional:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// DASHBOARD OPERACIONAL
// ============================================

export async function getDashboardOperacional() {
  try {
    const supabase = createClient()

    const [
      { count: participantes },
      { count: entrevistas },
      { count: processos },
      { data: resultados }
    ] = await Promise.all([
      supabase.from('participantes').select('*', { count: 'exact', head: true }),
      supabase.from('entrevistas_operacionais').select('*', { count: 'exact', head: true }),
      supabase.from('processos_operacionais').select('*', { count: 'exact', head: true }),
      supabase.from('entrevistas_operacionais').select('resultado')
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
    console.error('❌ Erro getDashboardOperacional:', error)
    return { success: false, error: error.message }
  }
}
