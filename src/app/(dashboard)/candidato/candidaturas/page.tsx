'use client'

const candidaturas = [
  {
    id: 1,
    vaga: 'Analista Administrativo',
    empresa: 'Empresa XYZ',
    status: 'Entrevista',
    data: '09/07/2026'
  },
  {
    id: 2,
    vaga: 'Auxiliar de RH',
    empresa: 'Indústria ABC',
    status: 'Análise',
    data: '08/07/2026'
  }
]

export default function CandidaturasCandidato() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">
          Minhas <span className="text-purple-600">Candidaturas</span>
        </h1>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          {candidaturas.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Você ainda não se candidatou a nenhuma vaga.</p>
          ) : (
            <div className="space-y-4">
              {candidaturas.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{item.vaga}</h3>
                    <p className="text-sm text-gray-500">{item.empresa}</p>
                    <p className="text-xs text-gray-400">Candidatado em {item.data}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
