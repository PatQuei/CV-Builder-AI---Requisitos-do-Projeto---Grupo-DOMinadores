import { useState } from "react";
import type { ExperienceItem } from "../../types/cv.types";

interface ExperienceFormProps {
  experiences: ExperienceItem[];
  setExperiences: React.Dispatch<React.SetStateAction<ExperienceItem[]>>;
}

export default function ExperienceForm({
  experiences,
  setExperiences,
}: ExperienceFormProps) {
  const [form, setForm] = useState<ExperienceItem>({
    id: crypto.randomUUID(),
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
  });

  // Atualiza os campos do form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Adiciona experiência ao array
  const addExperience = () => {
    if (
      form.startDate &&
      !form.isCurrent &&
      form.endDate &&
      form.startDate > form.endDate
    ) {
      alert("Data de início não pode ser maior que a data de fim!");
      return;
    }

    setExperiences([...experiences, form]);

    // limpa o form para o próximo cadastro
    setForm({
      id: crypto.randomUUID(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    });
  };

  return (
    <div className="p-4 border rounded-xl shadow-sm mt-6">
      <h2 className="text-lg font-semibold mb-4">Experiências Profissionais</h2>

      <input
        type="text"
        name="company"
        placeholder="Empresa"
        value={form.company}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-2"
      />

      <input
        type="text"
        name="position"
        placeholder="Cargo"
        value={form.position}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-2"
      />

      <div className="flex gap-2 mb-2">
        <input
          type="month"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        {!form.isCurrent && (
          <input
            type="month"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        )}
      </div>

      <label className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          name="isCurrentJob"
          checked={form.isCurrent}
          onChange={handleChange}
        />
        Trabalho atual
      </label>

      <textarea
        name="description"
        placeholder="Descrição das atividades"
        value={form.description}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-2"
      />

      <button
        onClick={addExperience}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg"
      >
        Adicionar Experiência
      </button>

      {/* Lista das experiências já adicionadas */}
      <ul className="mt-4 space-y-2">
        {experiences.map((exp) => (
          <li key={exp.id} className="border p-2 rounded text-sm">
            <strong>{exp.position}</strong> - {exp.company}
            <br />
            {exp.startDate} - {exp.isCurrent ? "Presente" : exp.endDate}
          </li>
        ))}
      </ul>
    </div>
  );
}
