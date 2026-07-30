'use server'
import { createClient } from '@/lib/supabase/server'

export async function getConfiguracoes() {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('configuracoes')
      .select('*')

    if (error) throw error
    
    const configs: Record<string, any> = {}
    data?.forEach((item: any) => {
      configs[item.chave] = item.valor
    })
    return { success: true, data: configs }
  } catch (error: any) {
    console.error('Erro ao buscar configurações:', error)
    return { success: false, error: error.message }
  }
}

export async function getConfiguracaoByChave(chave: string) {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('configuracoes')
      .select('*')
      .eq('chave', chave)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return { success: true, data: data || null }
  } catch (error: any) {
    console.error('Erro ao buscar configuração:', error)
    return { success: false, error: error.message }
  }
}

export async function atualizarConfiguracao(chave: string, valor: any, descricao?: string) {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
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
    console.error('Erro ao atualizar configuração:', error)
    return { success: false, error: error.message }
  }
}

export async function salvarConfiguracoes(configuracoes: Record<string, any>) {
  try {
    const supabase = createClient()
    
    const promises = Object.entries(configuracoes).map(([chave, valor]) => {
      return supabase
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
    console.error('Erro ao salvar configurações:', error)
    return { success: false, error: error.message }
  }
}

export async function getConfiguracoesSistema() {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
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
    console.error('Erro ao buscar configurações do sistema:', error)
    return { success: false, error: error.message }
  }
}
