'use server'

import { createClient } from '@/lib/supabase/server'

export async function criarVaga(data: any) {
  try {
    const supabase = createClient()

    console.log('Action criarVaga - Dados recebidos:', data)

    const { data: vaga, error } = await supabase
      .from('vagas')
      .insert([{
        titulo: data.titulo,
        empresa: data.empresa,
        empresa_id: data.empresa_id || null,
        descricao: data.descricao || null,
        requisitos: data.requisitos || null,
        beneficios: data.beneficios || null,
        local: data.local || null,
        tipo: data.tipo || 'CLT',
        status: data.status || 'Aberta',
        exibir_carrossel: data.exibir_carrossel || false,
        badge: data.badge || null,
        cor_badge: data.cor_badge || '#6B1A2A',
        confidencial: data.confidencial || false,
        salario_inicial: data.salario_inicial || null,
        salario_final: data.salario_final || null
      }])
      .select()
      .single()

    if (error) {
      console.error('Erro Supabase:', error)
      throw error
    }

    console.log('Vaga criada com sucesso:', vaga)
    return { success: true, data: vaga }
  } catch (error: any) {
    console.error('Erro ao criar vaga:', error)
    return { success: false, error: error.message }
  }
}
