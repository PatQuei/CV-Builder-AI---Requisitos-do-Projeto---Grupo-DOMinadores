import { useState } from "react";
import type { Skill } from "../../types/cv.types";

interface SkillsFormProps {
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
}

export default function SkillsForm({ skills, setSkills }: SkillsFormProps) {
  const [form, setForm] = useState<Skill>({
    id: crypto.randomUUID(),
    name: "",
    level: "Iniciante",
  });

  // Atualiza os campos do form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Adiciona habilidade
  const addSkill = () => {
    if (!form.name.trim()) {
      alert("Digite uma habilidade!");
      return;
    }

    setSkills([...skills, form]);

    // Limpa o form
    setForm({
      id: crypto.randomUUID(),
      name: "",
      level: "Iniciante",
    });
  };

  // Remove habilidade
  const removeSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  return (
    <div className="p-4 border rounded-xl shadow-sm mt-6">
      <h2 className="text-lg font-semibold mb-4">Habilidades Profissionais</h2>

      <input
        type="text"
        name="name"
        placeholder="Habilidade"
        value={form.name}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-2"
      />

      <select
        name="level"
        value={form.level}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-2"
      >
        <option value="Iniciante">Iniciante</option>
        <option value="Intermediário">Intermediário</option>
        <option value="Avançado">Avançado</option>
      </select>

      <button
        onClick={addSkill}
        className="bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Adicionar Habilidade
      </button>

      {/* Lista das habilidades */}
      <ul className="mt-4 space-y-2">
        {skills.map((skill) => (
          <li
            key={skill.id}
            className="border p-2 rounded text-sm flex justify-between items-center"
          >
            <span>
              <strong>{skill.name}</strong> - {skill.level}
            </span>
            <button
              onClick={() => removeSkill(skill.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}