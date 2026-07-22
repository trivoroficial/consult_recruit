// src/components/home/EmpresasParceiras.tsx
export function EmpresasParceiras() {
  const empresas = [
    { nome: 'XPTO', logo: 'XPTO' },
    { nome: 'ABC', logo: 'ABC' },
    { nome: 'Financeiro', logo: 'FIN' },
    { nome: 'Tech', logo: 'TECH' },
    { nome: 'Indústria', logo: 'IND' },
    { nome: 'Varejo', logo: 'VAR' },
  ]

  return (
    <section className="py-16 bg-[#F8F4E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-[#708090] uppercase tracking-wider mb-8">
          Empresas que confiam na ZENTHOS
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {empresas.map((empresa) => (
            <div key={empresa.nome} className="flex items-center justify-center">
              <div className="w-24 h-12 bg-white rounded-lg border border-[#E8EAE0] flex items-center justify-center text-[#708090] font-bold text-sm">
                {empresa.logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
