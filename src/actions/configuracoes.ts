'use server'

import { supabase } from '@/lib/supabase/server'

export async function getConfiguracoes() {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('configuracoes')
      .select('*')

    if (error) throw error

    // Transformar em objeto chave-valor
    const configs: Record<string, any> = {}
    data?.forEach((item: any) => {
      configs[item.chave] = item.valor
    })

    return { success: true, data: configs }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getConfiguracaoByChave(chave: string) {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('configuracoes')
      .select('*')
      .eq('chave', chave)
      .single()

    if (error && error.code !== 'PGRST116') throw error

    return { success: true, data: data || null }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function atualizarConfiguracao(chave: string, valor: any, descricao?: string) {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('configuracoes')
      .upsert({
        chave,
        valor,
        descricao: descricao || '',
        data_atualizacao: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function salvarConfiguracoes(configuracoes: Record<string, any>) {
  try {
    const supabaseClient = supabase()
    
    const promises = Object.entries(configuracoes).map(([chave, valor]) => {
      return supabaseClient
        .from('configuracoes')
        .upsert({
          chave,
          valor,
          data_atualizacao: new Date().toISOString()
        })
    })

    await Promise.all(promises)

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getConfiguracoesSistema() {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('configuracoes')
      .select('*')
      .in('chave', [
        'site_titulo',
        'site_descricao',
        'backup_automatico',
        'horario_backup',
        'modo_manutencao'
      ])

    if (error) throw error

    const configs: Record<string, any> = {}
    data?.forEach((item: any) => {
      configs[item.chave] = item.valor
    })

    return { success: true, data: configs }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
