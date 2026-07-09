'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RecuperarSenha() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEnviado(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-purple-600">TRIVOR</h1>
            <h2 className="mt-2 text-xl font-semibold">Recuperar senha</h2>
            <p className="text-gray-500 text-sm">
              Enviaremos um link para redefinir sua senha
            </p>
          </div>

          {!enviado ? (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  className="input-default"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                />
              </div>

              <button type="submit" className="btn-primary btn-full">
                Enviar link
              </button>

              <p className="text-center">
                <Link href="/login" className="text-sm text-purple-600 hover:text-purple-700">
                  Voltar para o login
                </Link>
              </p>
            </form>
          ) : (
            <div className="mt-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">Email enviado!</h3>
              <p className="text-gray-600 text-sm">
                Enviamos um link para redefinir sua senha para <strong>{email}</strong>
              </p>
              <Link
                href="/login"
                className="mt-6 inline-block text-purple-600 font-medium hover:text-purple-700"
              >
                Voltar para o login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
