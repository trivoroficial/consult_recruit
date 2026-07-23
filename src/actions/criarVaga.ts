'use server'

import { createClient } from '@/lib/supabase/server'

export async function salvarVagaNoBanco(dadosVaga: any) {
  const supabase = createClient()

  // Prepara os dados exatamente como a tabela do Supabase espera
  const dadosParaSalvar = {
    titulo: dadosVaga.titulo,
    empresa: dadosVaga.empresa,
    departamento: dadosVaga.departamento,
    tipo: dadosVaga.tipo,
    modalidade: dadosVaga.modalidade,
    local: dadosVaga.local,
    salario: dadosVaga.salario,
    beneficios: dadosVaga.beneficios,
    descricao: dadosVaga.descricao,
    requisitos: dadosVaga.requisitos,
    experiencia: dadosVaga.experiencia,
    escolaridade: dadosVaga.escolaridade,
    competencias: dadosVaga.competencias,
    quantidade: parseInt(dadosVaga.quantidade) || 1,
    prazo: dadosVaga.prazo || null,
    responsavel: dadosVaga.responsavel,
    confidencial: dadosVaga.confidencial,
    exibirCarrossel: dadosVaga.exibirCarrossel,
    badgeCarrossel: dadosVaga.badgeCarrossel,
    corBadge: dadosVaga.corBadge,
    candidatos: 0,
    status: 'Aberta',
    empresaExibida: dadosVaga.confidencial ? 'Confidencial' : dadosVaga.empresa,
  }

  // AQUI É ONDE A MÁGICA ACONTECE: SALVA NO BANCO DE DADOS REAL
  const { error } = await supabase
    .from('vagas')
    .insert([dadosParaSalvar])

  if (error) {
    console.error('Erro ao salvar no Supabase:', error)
    return { success: false, message: error.message }
  }

  return { success: true, message: 'Vaga criada com sucesso!' }
}
