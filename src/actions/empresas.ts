'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function salvarEmpresaNoBanco(dados: any) {
  const supabase = createClient()

  const { error } = await supabase
    .from('empresas')
    .insert([{
      nome: dados.nome,
      cnpj: dados.cnpj,
      cidade: dados.cidade,
      estado: dados.estado || '',
      status: dados.status || 'Ativo',
      created_at: new Date().toISOString()
    }])

  if (error) {
    console.error('Erro ao salvar empresa:', error)
    return { success: false, message: error.message }
  }

  revalidatePath('/admin/empresas')
  return { success: true, message: 'Empresa salva com sucesso!' }
}

export async function buscarTodasEmpresas() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('empresas')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erro ao buscar empresas:', error)
    return { success: false, data: [], message: error.message }
  }

  return { success: true, data: data || [] }
}

export async function atualizarEmpresa(id: string, dados: any) {
  const supabase = createClient()

  const { error } = await supabase
    .from('empresas')
    .update(dados)
    .eq('id', id)

  if (error) {
    console.error('Erro ao atualizar empresa:', error)
    return { success: false, message: error.message }
  }

  revalidatePath('/admin/empresas')
  return { success: true, message: 'Empresa atualizada com sucesso!' }
}

export async function excluirEmpresa(id: string) {
  const supabase = createClient()

  const { error } = await supabase
    .from('empresas')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Erro ao excluir empresa:', error)
    return { success: false, message: error.message }
  }

  revalidatePath('/admin/empresas')
  return { success: true, message: 'Empresa excluída com sucesso!' }
}
