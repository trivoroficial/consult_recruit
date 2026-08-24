'use server'

import { createClient } from '@/lib/supabase/server'

// ============================================
// LISTAR CANDIDATOS
// ============================================
export async function listarCandidatos() {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('candidatos')
      .select('*')
      .order('id', { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao listar candidatos:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// LISTAR CANDIDATOS POR TIPO
// ============================================
export async function listarCandidatosPorTipo(tipo?: string) {
  try {
    const supabase = createClient()

    let query = supabase.from('candidatos').select('*')

    if (tipo) {
      query = query.eq('tipo', tipo)
    }

    const { data, error } = await query.order('id', { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao listar candidatos por tipo:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// EXCLUIR CANDIDATO
// ============================================
export async function excluirCandidato(id: number) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase
      .from('candidatos')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true }
  } catch (error: any) {
    console.error('Erro ao excluir candidato:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// CRIAR CANDIDATO (ADMIN)
// ============================================
export async function criarCandidato(data: any) {
  try {
    const supabase = createClient()
    
    // 1. Criar usuário no Auth
    const { data: user, error: authError } = await supabase.auth.admin.createUser({
      email: data.email,
      password: data.senha || '12345678',
      email_confirm: true,
      user_metadata: {
        name: data.nome,
        role: 'candidato'
      }
    })

    if (authError) throw authError

    // 2. Inserir na tabela usuarios
    await supabase
      .from('usuarios')
      .insert([{
        id: user.user.id,
        email: data.email,
        name: data.nome,
        role: 'candidato'
      }])

    // 3. Inserir na tabela candidatos
    const { data: candidato, error } = await supabase
      .from('candidatos')
      .insert([{
        user_id: user.user.id,
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        whatsapp: data.whatsapp,
        cidade: data.cidade,
        estado: data.estado,
        cargo: data.cargo,
        experiencia: data.experiencia,
        competencias: data.competencias,
        resumo: data.resumo,
        status: data.status || 'Disponível',
        tipo: data.tipo || 'externo',
        acesso_dashboard: data.tipo === 'externo',
        score: 0
      }])
      .select()
      .single()

    if (error) throw error
    return { success: true, data: candidato }
  } catch (error: any) {
    console.error('Erro ao criar candidato:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// BUSCAR CANDIDATO POR ID
// ============================================
export async function buscarCandidatoPorId(id: number) {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('candidatos')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao buscar candidato:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// ATUALIZAR CANDIDATO
// ============================================
export async function atualizarCandidato(id: number, data: any) {
  try {
    const supabase = createClient()
    
    const { data: candidato, error } = await supabase
      .from('candidatos')
      .update({
        nome: data.nome,
        telefone: data.telefone,
        whatsapp: data.whatsapp,
        cidade: data.cidade,
        estado: data.estado,
        cargo: data.cargo,
        experiencia: data.experiencia,
        competencias: data.competencias,
        resumo: data.resumo,
        status: data.status || 'Disponível',
        tipo: data.tipo || 'externo',
        acesso_dashboard: data.tipo === 'externo'
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { success: true, data: candidato }
  } catch (error: any) {
    console.error('Erro ao atualizar candidato:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// ADMIN ATIVAR ACESSO AO DASHBOARD
// ============================================
export async function ativarAcessoDashboard(candidatoId: number) {
  try {
    const supabase = createClient()

    const { data: candidato, error } = await supabase
      .from('candidatos')
      .update({ 
        acesso_dashboard: true,
        tipo: 'externo'
      })
      .eq('id', candidatoId)
      .select()
      .single()

    if (error) throw error
    return { success: true, data: candidato }
  } catch (error: any) {
    console.error('Erro ao ativar acesso:', error)
    return { success: false, error: error.message }
  }
}

// ============================================
// ADMIN ENVIAR PARA OPERACIONAL
// ============================================
export async function enviarParaOperacional(candidatoId: number) {
  try {
    const supabase = createClient()

    const { data: candidato, error } = await supabase
      .from('candidatos')
      .update({ 
        tipo: 'operacional',
        acesso_dashboard: false
      })
      .eq('id', candidatoId)
      .select()
      .single()

    if (error) throw error
    return { success: true, data: candidato }
  } catch (error: any) {
    console.error('Erro ao enviar para operacional:', error)
    return { success: false, error: error.message }
  }
}
