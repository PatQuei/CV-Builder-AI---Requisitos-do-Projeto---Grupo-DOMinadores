import React from "react";

const PreviewSection: React.FC = () => {
  return (
    <section className="w-1/2 p-6 overflow-y-auto bg-gray-50">
      <h2 className="text-lg font-semibold mb-4 text-green-700">
        Preview do Currículo
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Visualização em tempo real
      </p>

      {/* Placeholder do preview */}
      <div className="bg-white shadow rounded-md p-6 min-h-[400px]">
        <p className="text-gray-400 italic">[Preview do currículo]</p>
      </div>
    </section>
  );
};

export default PreviewSection;
