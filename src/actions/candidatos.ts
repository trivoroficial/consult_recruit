'use server'

import { supabase } from '@/lib/supabase/server'

export async function criarCandidato(data: any) {
  try {
    const supabaseClient = supabase()
    
    const { data: candidato, error } = await supabaseClient
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
    return { success: false, error: error.message }
  }
}

export async function listarCandidatos() {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('candidatos')
      .select('*')
      .order('id', { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function excluirCandidato(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { error } = await supabaseClient
      .from('candidatos')
      .delete()
      .eq('id', id)

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
