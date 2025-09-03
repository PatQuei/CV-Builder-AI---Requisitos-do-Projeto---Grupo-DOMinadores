export function FormSection() {
  return (
    <div className="bg-gray-800 text-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-lg font-bold mb-2">Informações do Currículo</h2>
      <p className="text-sm text-gray-300 mb-6">
        Preencha os dados e veja o preview em tempo real
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome Completo *</label>
          <input
            type="text"
            placeholder="Seu nome completo"
            className="w-full rounded-lg border border-gray-300 p-2 text-black focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            placeholder="seu.email@exemplo.com"
            className="w-full rounded-lg border border-gray-300 p-2 text-black focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Telefone *</label>
            <input
              type="text"
              placeholder="(11) 99999-9999"
              className="w-full rounded-lg border border-gray-300 p-2 text-black focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn</label>
            <input
              type="text"
              placeholder="linkedin.com/in/seuusuario"
              className="w-full rounded-lg border border-gray-300 p-2 text-black focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Resumo Profissional</label>
          <textarea
            placeholder="Digite aqui seu resumo profissional..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2 text-black focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
