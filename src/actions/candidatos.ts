'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function salvarCandidatoNoBanco(dados: any) {
  const supabase = createClient()

  const candidatoParaSalvar = {
    nome: dados.nome,
    email: dados.email,
    telefone: dados.telefone,
    whatsapp: dados.whatsapp,
    cidade: dados.cidade,
    estado: dados.estado,
    cargo: dados.cargo,
    experiencia: dados.experiencia,
    competencias: dados.competencias,
    resumo: dados.resumo,
    status: dados.status,
    score: Math.floor(Math.random() * 30) + 70,
    created_at: new Date().toISOString()
  }

  const { error } = await supabase
    .from('candidatos')
    .insert([candidatoParaSalvar])

  if (error) {
    console.error('Erro ao salvar candidato:', error)
    return { success: false, message: error.message }
  }

  // Opcional: Força o Next.js a atualizar a lista de candidatos se você estiver nela
  revalidatePath('/admin/candidatos')

  return { success: true, message: 'Candidato salvo com sucesso!' }
}
