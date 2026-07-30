'use server'
import { createClient } from '@/lib/supabase/server'

export async function listarVagas() {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('vagas')
      .select('*')
      .order('id', { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao listar vagas:', error)
    return { success: false, error: error.message }
  }
}

export async function excluirVaga(id: number) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase
      .from('vagas')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true }
  } catch (error: any) {
    console.error('Erro ao excluir vaga:', error)
    return { success: false, error: error.message }
  }
}

export async function criarVaga(data: any) {
  try {
    const supabase = createClient()
    
    const { data: vaga, error } = await supabase
      .from('vagas')
      .insert([{
        titulo: data.titulo,
        empresa: data.empresa,
        empresa_id: data.empresa_id || null,
        descricao: data.descricao,
        requisitos: data.requisitos,
        beneficios: data.beneficios,
        local: data.local,
        tipo: data.tipo || 'CLT',
        status: data.status || 'Aberta',
        exibir_carrossel: data.exibirCarrossel || false,
        badge: data.badge || '',
        cor_badge: data.corBadge || '',
        confidencial: data.confidencial || false,
        salario_inicial: data.salarioInicial || null,
        salario_final: data.salarioFinal || null
      }])
      .select()
      .single()

    if (error) throw error
    return { success: true, data: vaga }
  } catch (error: any) {
    console.error('Erro ao criar vaga:', error)
    return { success: false, error: error.message }
  }
}

export async function buscarVagaPorId(id: number) {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('vagas')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao buscar vaga:', error)
    return { success: false, error: error.message }
  }
}

export async function atualizarVaga(id: number, data: any) {
  try {
    const supabase = createClient()
    
    const { data: vaga, error } = await supabase
      .from('vagas')
      .update({
        titulo: data.titulo,
        descricao: data.descricao,
        requisitos: data.requisitos,
        beneficios: data.beneficios,
        local: data.local,
        tipo: data.tipo || 'CLT',
        status: data.status || 'Aberta',
        exibir_carrossel: data.exibirCarrossel || false,
        badge: data.badge || '',
        cor_badge: data.corBadge || '',
        confidencial: data.confidencial || false,
        salario_inicial: data.salarioInicial || null,
        salario_final: data.salarioFinal || null
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { success: true, data: vaga }
  } catch (error: any) {
    console.error('Erro ao atualizar vaga:', error)
    return { success: false, error: error.message }
  }
}
