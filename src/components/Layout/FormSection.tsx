import React from "react";

const FormSection: React.FC = () => {
  return (
    <section className="w-1/2 p-6 overflow-y-auto bg-white border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Informações do Currículo
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Preencha os dados e veja o preview em tempo real
      </p>

      {/* Placeholder do formulário */}
      <div className="bg-gray-50 p-6 rounded-md shadow">
        <p className="text-gray-400 italic">[Formulário aqui]</p>
      </div>
    </section>
  );
};

export default FormSection;
