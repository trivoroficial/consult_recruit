'use server'
import { createClient } from '@/lib/supabase/server'

export async function getDashboardStats() {
  try {
    const supabase = createClient()
    
    const [
      { count: empresas },
      { count: candidatos },
      { count: vagas },
      { count: processos },
      { count: transacoes },
      { count: usuarios }
    ] = await Promise.all([
      supabase.from('empresas').select('*', { count: 'exact', head: true }),
      supabase.from('candidatos').select('*', { count: 'exact', head: true }),
      supabase.from('vagas').select('*', { count: 'exact', head: true }),
      supabase.from('processos').select('*', { count: 'exact', head: true }),
      supabase.from('transacoes').select('*', { count: 'exact', head: true }),
      supabase.from('usuarios').select('*', { count: 'exact', head: true })
    ])

    return {
      success: true,
      data: {
        empresas: empresas || 0,
        candidatos: candidatos || 0,
        vagas: vagas || 0,
        processos: processos || 0,
        transacoes: transacoes || 0,
        usuarios: usuarios || 0
      }
    }
  } catch (error: any) {
    console.error('Erro ao buscar stats do dashboard:', error)
    return { success: false, error: error.message }
  }
}

export async function getAtividadesRecentes(limit: number = 10) {
  try {
    const supabase = createClient()
    
    const [
      { data: novasEmpresas },
      { data: novosCandidatos },
      { data: novasVagas },
      { data: novasCandidaturas }
    ] = await Promise.all([
      supabase.from('empresas').select('id, nome, created_at').order('created_at', { ascending: false }).limit(3),
      supabase.from('candidatos').select('id, nome, created_at').order('created_at', { ascending: false }).limit(3),
      supabase.from('vagas').select('id, titulo, created_at').order('created_at', { ascending: false }).limit(3),
      supabase.from('candidaturas').select('id, created_at').order('created_at', { ascending: false }).limit(3)
    ])

    const atividades = [
      ...(novasEmpresas || []).map((e: any) => ({
        tipo: 'empresa',
        descricao: 'Nova empresa cadastrada',
        nome: e.nome,
        hora: new Date(e.created_at).toLocaleString('pt-BR')
      })),
      ...(novosCandidatos || []).map((c: any) => ({
        tipo: 'candidato',
        descricao: 'Novo candidato cadastrado',
        nome: c.nome,
        hora: new Date(c.created_at).toLocaleString('pt-BR')
      })),
      ...(novasVagas || []).map((v: any) => ({
        tipo: 'vaga',
        descricao: 'Nova vaga publicada',
        nome: v.titulo,
        hora: new Date(v.created_at).toLocaleString('pt-BR')
      }))
    ]

    atividades.sort((a, b) => new Date(b.hora).getTime() - new Date(a.hora).getTime())
    return { success: true, data: atividades.slice(0, limit) }
  } catch (error: any) {
    console.error('Erro ao buscar atividades recentes:', error)
    return { success: false, error: error.message }
  }
}

export async function getBancoStatus() {
  try {
    const supabase = createClient()
    
    const tabelas = [
      'empresas',
      'candidatos', 
      'vagas',
      'processos',
      'transacoes',
      'usuarios',
      'entrevistas',
      'notificacoes',
      'backups'
    ]

    let totalRegistros = 0
    for (const tabela of tabelas) {
      const { count } = await supabase.from(tabela).select('*', { count: 'exact', head: true })
      totalRegistros += count || 0
    }

    const percentual = Math.min(Math.round((totalRegistros / 100) * 10), 100)
    const usadoMB = Math.round((totalRegistros * 0.5) / 1024 * 100) / 100

    return {
      success: true,
      data: {
        percentual,
        usado: `${usadoMB} MB`,
        total: '500 MB',
        tabelas: tabelas.length,
        registros: totalRegistros
      }
    }
  } catch (error: any) {
    console.error('Erro ao buscar status do banco:', error)
    return { success: false, error: error.message }
  }
}
