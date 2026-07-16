'use client'

import { useState } from 'react'
import { Save, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Linkedin, Github } from 'lucide-react'

export default function CandidatoPerfil() {
  const [form, setForm] = useState({
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    telefone: '(34) 99999-9999',
    cidade: 'Uberlândia',
    estado: 'MG',
    cargo: 'Desenvolvedor Full Stack',
    empresa: 'XPTO Tech',
    linkedin: 'linkedin.com/in/joaosilva',
    github: 'github.com/joaosilva',
    sobre: 'Profissional com 5 anos de experiência em desenvolvimento web...',
    formacao: 'Bacharel em Ciência da Computação - UFU',
    habilidades: 'React, Node.js, TypeScript, Python, AWS'
  })

  return (
    <div className="min-h-screen bg-gray-50/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ===== HEADER ===== */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
          <p className="text-sm text-gray-500 mt-1">Gerencie suas informações profissionais</p>
        </div>

        {/* ===== FORMULÁRIO ===== */}
        <div className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm">
          <div className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                    value={form.nome}
                    onChange={(e) => setForm({...form, nome: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                    value={form.telefone}
                    onChange={(e) => setForm({...form, telefone: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade/UF</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                    value={`${form.cidade} - ${form.estado}`}
                    onChange={(e) => {
                      const [cidade, estado] = e.target.value.split(' - ')
                      setForm({...form, cidade: cidade || '', estado: estado || ''})
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cargo Atual</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                    value={form.cargo}
                    onChange={(e) => setForm({...form, cargo: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                  value={form.empresa}
                  onChange={(e) => setForm({...form, empresa: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                    value={form.linkedin}
                    onChange={(e) => setForm({...form, linkedin: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                <div className="relative">
                  <Github className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                    value={form.github}
                    onChange={(e) => setForm({...form, github: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Formação</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                  value={form.formacao}
                  onChange={(e) => setForm({...form, formacao: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Habilidades</label>
              <textarea
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition resize-none"
                value={form.habilidades}
                onChange={(e) => setForm({...form, habilidades: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sobre mim</label>
              <textarea
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition resize-none"
                value={form.sobre}
                onChange={(e) => setForm({...form, sobre: e.target.value})}
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button className="px-6 py-2.5 text-sm font-semibold text-white bg-[#8B0000] rounded-xl hover:bg-[#700000] transition shadow-md shadow-[#8B0000]/20 flex items-center gap-2">
                <Save className="h-4 w-4" />
                Salvar Perfil
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
