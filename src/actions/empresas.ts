'use server'

import { supabase } from '@/lib/supabase/server'

export async function criarEmpresa(data: any) {
  try {
    const supabaseClient = supabase()
    
    const { data: empresa, error } = await supabaseClient
      .from('empresas')
      .insert([{
        nome: data.nome,
        cnpj: data.cnpj,
        telefone: data.telefone,
        email: data.email,
        cidade: data.cidade,
        estado: data.estado,
        funcionarios: parseInt(data.funcionarios) || 0,
        plano: data.plano || 'Básico',
        status: data.status || 'Ativo',
        descricao: data.descricao,
        responsavel: data.responsavel,
        vagas_ativas: 0
      }])
      .select()
      .single()

    if (error) throw error

    return { success: true, data: empresa }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function listarEmpresas() {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('empresas')
      .select('*')
      .order('id', { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function buscarEmpresaPorId(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('empresas')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function atualizarEmpresa(id: number, data: any) {
  try {
    const supabaseClient = supabase()
    
    const { data: empresa, error } = await supabaseClient
      .from('empresas')
      .update({
        nome: data.nome,
        cnpj: data.cnpj,
        telefone: data.telefone,
        email: data.email,
        cidade: data.cidade,
        estado: data.estado,
        funcionarios: parseInt(data.funcionarios) || 0,
        plano: data.plano || 'Básico',
        status: data.status || 'Ativo',
        descricao: data.descricao,
        responsavel: data.responsavel
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return { success: true, data: empresa }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function excluirEmpresa(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { error } = await supabaseClient
      .from('empresas')
      .delete()
      .eq('id', id)

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
