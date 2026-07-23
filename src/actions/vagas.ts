'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function salvarVagaNoBanco(dadosVaga: any) {
  const supabase = createClient()

  const dadosParaSalvar = {
    ...dadosVaga,
    quantidade: parseInt(dadosVaga.quantidade) || 1,
    candidatos: parseInt(dadosVaga.candidatos) || 0,
    status: dadosVaga.status || 'Aberta',
    empresaExibida: dadosVaga.confidencial ? 'Confidencial' : dadosVaga.empresa,
    created_at: new Date().toISOString()
  }

  const { error } = await supabase.from('vagas').insert([dadosParaSalvar])

  if (error) {
    console.error('Erro ao salvar no Supabase:', error)
    return { success: false, message: error.message }
  }

  revalidatePath('/admin/vagas')
  return { success: true, message: 'Vaga criada com sucesso!' }
}

export async function buscarTodasVagas() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('vagas')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erro ao buscar vagas:', error)
    return { success: false, data: [], message: error.message }
  }

  return { success: true, data: data || [] }
}

export async function atualizarVaga(id: string, dados: any) {
  const supabase = createClient()
  
  // Garante que o nome exibido esteja correto baseado na confidencialidade
  const dadosAtualizados = {
    ...dados,
    empresaExibida: dados.confidencial ? 'Confidencial' : dados.empresa
  }

  const { error } = await supabase
    .from('vagas')
    .update(dadosAtualizados)
    .eq('id', id)

  if (error) {
    console.error('Erro ao atualizar vaga:', error)
    return { success: false, message: error.message }
  }

  revalidatePath('/admin/vagas')
  return { success: true, message: 'Vaga atualizada com sucesso!' }
}

export async function excluirVaga(id: string) {
  const supabase = createClient()

  const { error } = await supabase.from('vagas').delete().eq('id', id)

  if (error) {
    console.error('Erro ao excluir vaga:', error)
    return { success: false, message: error.message }
  }

  revalidatePath('/admin/vagas')
  return { success: true, message: 'Vaga excluída com sucesso!' }
}
