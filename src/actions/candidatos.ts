'use server'
import { supabase } from '@/lib/supabase/server'

export async function listarCandidatos() {
  try {
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

export async function excluirCandidato(id: number) {
  try {
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

export async function criarCandidato(data: any) {
  try {
    const { data: candidato, error } = await supabase
      .from('candidatos')
      .insert([{
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

export async function buscarCandidatoPorId(id: number) {
  try {
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

export async function atualizarCandidato(id: number, data: any) {
  try {
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
        status: data.status || 'Disponível'
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
