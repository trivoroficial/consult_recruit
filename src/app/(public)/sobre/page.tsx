export default function Sobre() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center">
          Sobre a <span className="text-purple-600">TRIVOR</span>
        </h1>
        
        <div className="mt-12 space-y-8">
          {/* Missão */}
          <div className="bg-white p-8 rounded-xl border shadow-sm">
            <h2 className="text-2xl font-semibold text-purple-600">Nossa Missão</h2>
            <p className="mt-4 text-gray-600 text-lg">
              Transformar empresas através de pessoas, processos e inteligência, 
              conectando gestão estratégica, tecnologia e conhecimento humano.
            </p>
          </div>

          {/* Visão */}
          <div className="bg-white p-8 rounded-xl border shadow-sm">
            <h2 className="text-2xl font-semibold text-purple-600">Nossa Visão</h2>
            <p className="mt-4 text-gray-600 text-lg">
              Ser referência em consultoria empresarial e gestão de talentos no Brasil, 
              reconhecida pela inovação, resultados e impacto positivo nas organizações.
            </p>
          </div>

          {/* Valores */}
          <div className="bg-white p-8 rounded-xl border shadow-sm">
            <h2 className="text-2xl font-semibold text-purple-600">Nossos Valores</h2>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold">🤝 Confiança</h3>
                <p className="text-sm text-gray-600">Relacionamentos transparentes e éticos</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold">💡 Inovação</h3>
                <p className="text-sm text-gray-600">Tecnologia e inteligência aplicada</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold">📈 Resultados</h3>
                <p className="text-sm text-gray-600">Compromisso com o crescimento</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold">❤️ Pessoas</h3>
                <p className="text-sm text-gray-600">Valorização e desenvolvimento humano</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
