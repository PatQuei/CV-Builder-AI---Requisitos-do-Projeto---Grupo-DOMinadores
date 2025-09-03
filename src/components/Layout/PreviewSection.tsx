export function PreviewSection() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="bg-green-600 text-white p-3 rounded-lg mb-4">
        <h2 className="text-lg font-bold">Preview do Currículo</h2>
        <p className="text-sm text-gray-100">Visualização em tempo real</p>
      </div>

      <div className="space-y-6">
        {/* Cabeçalho do CV */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Seu Nome Completo</h3>
          <p className="text-gray-600 text-sm">seu.email@exemplo.com | (11) 99999-9999</p>
          <p className="text-gray-600 text-sm">linkedin.com/in/seuusuario</p>
          <p className="text-gray-500 mt-2 italic">
            Seu resumo profissional aparecerá aqui...
          </p>
        </div>

        <hr />

        {/* Habilidades */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Habilidades</h4>
          <p className="text-gray-400 italic">
            Suas habilidades aparecerão aqui conforme você adiciona...
          </p>
        </div>

        {/* Experiência Profissional */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Experiência Profissional
          </h4>
          <p className="text-gray-400 italic">
            Suas experiências profissionais aparecerão aqui...
          </p>
        </div>
      </div>
    </div>
  );
}
