// DADOS FIXOS PARA TESTE
export const USERS = {
  admin: {
    id: '1',
    name: 'Administrador',
    email: 'admin@trivor.com',
    password: 'trivor2026',
    role: 'admin',
    avatar: 'A'
  },
  empresa: {
    id: '2',
    name: 'Empresa XPTO',
    email: 'empresa@trivor.com',
    password: 'trivor2026',
    role: 'empresa',
    avatar: 'E'
  },
  candidato: {
    id: '3',
    name: 'João Silva',
    email: 'candidato@trivor.com',
    password: 'trivor2026',
    role: 'candidato',
    avatar: 'JC'
  }
}

export function autenticar(email: string, password: string) {
  // Verifica em todos os usuários
  for (const key of Object.keys(USERS)) {
    const user = USERS[key as keyof typeof USERS]
    if (user.email === email && user.password === password) {
      return { success: true, user }
    }
  }
  return { success: false, error: 'Email ou senha inválidos' }
}

export function getUserByEmail(email: string) {
  for (const key of Object.keys(USERS)) {
    const user = USERS[key as keyof typeof USERS]
    if (user.email === email) {
      return user
    }
  }
  return null
}
