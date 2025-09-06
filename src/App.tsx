
import { useState } from "react";
import {
  Mail,
  Phone,
  Linkedin,
  User,
  FileText,
  Key,
  Download,
  Briefcase,
  Moon,
  Sun,
  Sparkles,
} from "lucide-react";
import { useDarkMode } from "./hooks/useDarkMode";
import type { ExperienceItem } from "./types/cv.types";
import ExperienceForm from "./components/Form/Experience";
import type { Skill } from "../../types/cv.types";
import SkillsForm from "./components/Form/Skills";
import { generateSummaryGemini } from "./services/aiService";
import jsPDF from "jspdf";
import { usePersistentState } from "./hooks/usePersistentState";
import { useAutoSaveToast } from "./hooks/useAutoSaveToast";


export default function App() {
  // Estado do formulário
  const [formData, setFormData] = usePersistentState("cv-data", {
    nome: "",
    email: "",
    telefone: "",
    linkedin: "",
    resumo: "",
  });



  const { ToastComponent } = useAutoSaveToast("cv-data", formData);

  
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [apiKey, setApiKey] = useState("");

  const { darkMode, setDarkMode } = useDarkMode();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Geração de resumo com IA
  const handleGenerateSummary = async () => {
    if (
      !formData.nome ||
      !formData.email ||
      !formData.telefone ||
      !formData.linkedin ||
      !formData.resumo ||
      experiences.length === 0
    ) {
      alert(
        "Por favor, preencha todas as informações (incluindo experiências) antes de gerar o resumo com IA."
      );
      return;
    }

    if (!apiKey) {
      alert("Insira sua API Key para usar a IA.");
      return;
    }

    try {
      const resumo = await generateSummaryGemini(apiKey, formData, experiences);
      setFormData({ ...formData, resumo });
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar resumo com IA.");
    }
  };

  // 🔹 Exportar PDF
  const exportPDF = () => {
    const doc = new jsPDF();

    // 🔹 Cabeçalho com nome
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(formData.nome || "Seu Nome Completo", 20, 20);

    // 🔹 Contatos logo abaixo
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Email: ${formData.email}`, 20, 30);
    doc.text(`Telefone: ${formData.telefone}`, 20, 36);
    doc.text(`LinkedIn: ${formData.linkedin}`, 20, 42);

    // 🔹 Linha separadora
    doc.setDrawColor(150);
    doc.line(20, 48, 190, 48);

    // 🔹 Resumo
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Resumo Profissional", 20, 60);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(formData.resumo || "Não informado", 20, 70, { maxWidth: 170 });

    // 🔹 Experiências
    let y = 95;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Experiências Profissionais", 20, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    y += 10;

    experiences.forEach((exp, i) => {
      doc.text(`${exp.position} - ${exp.company}`, 20, y);
      y += 6;
      doc.text(
        `${exp.startDate} até ${exp.isCurrent ? "Presente" : exp.endDate}`,
        20,
        y
      );
      y += 6;
      if (exp.description) {
        doc.text(exp.description, 20, y, { maxWidth: 170 });
        y += 10;
      } else {
        y += 4;
      }
    });

    // 🔹 Rodapé (opcional)
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text("Gerado com CV Builder AI ✨", 20, 280);

    doc.save("curriculo.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-black border-b shadow-sm px-6 py-4 flex justify-between items-center transition-colors duration-300">
        <div className="flex items-center gap-2">
          <FileText className="text-purple-600 dark:text-purple-400 w-6 h-6" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Gerador de Currículos AI
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Botão Dark Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* Campo API Key */}
          <div className="flex items-center border rounded-lg px-3 py-1 bg-gray-50 dark:bg-gray-800 transition">
            <Key className="w-4 h-4 text-gray-500 dark:text-gray-300 mr-2" />
            <input
              type="password"
              placeholder="Cole sua API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="outline-none text-sm bg-transparent text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Botão Exportar PDF */}
          <button
            onClick={exportPDF}
            className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4" />
            Exportar PDF
          </button>
        </div>
      </header>

      {/* Layout principal */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formulário */}
        <div className="bg-white dark:bg-black shadow-md rounded-2xl p-6 transition-colors duration-300">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            Informações do Currículo
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Preencha os dados e veja o preview em tempo real
          </p>

          <div className="space-y-4">
            {/* Nome */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Nome Completo *
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Seu nome completo"
                className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu.email@exemplo.com"
                className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Telefone *
              </label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
                className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                LinkedIn
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="linkedin.com/in/seuusuario"
                className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Resumo */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Resumo Profissional
              </label>
              <textarea
                name="resumo"
                value={formData.resumo}
                onChange={handleChange}
                placeholder="Digite aqui seu resumo profissional..."
                className="w-full border rounded-lg px-3 py-2 mt-1 h-24 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <button
                onClick={handleGenerateSummary}
                className="mt-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition"
              >
                <Sparkles className="w-4 h-4" /> Gerar com IA
              </button>
            </div>
          </div>
          {/* 🔽 Formulário de Experiências */}
          <div className="mt-6">
            <ExperienceForm
              experiences={experiences}
              setExperiences={setExperiences}
            />
          </div>

          {/* 🔽 Formulário de Habilidades */}
          <div className="mt-6">
             <SkillsForm skills={skills} setSkills={setSkills} />
          </div>
      
          </div>


        {/* Preview */}
        <div className="bg-white dark:bg-black shadow-md rounded-2xl overflow-hidden transition-colors duration-300">
          <div className="bg-purple-600 dark:bg-purple-800 text-white px-6 py-3 transition-colors duration-300">
            <h2 className="text-lg font-bold">Preview do Currículo</h2>
            <p className="text-sm text-purple-100">
              Visualização em tempo real
            </p>
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {formData.nome || "Seu Nome Completo"}
            </h3>
            <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-300 mt-2">
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" /> {formData.email || "seu.email@exemplo.com"}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" /> {formData.telefone || "(11) 99999-9999"}
              </span>
            </div>
            <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 mt-1">
              <Linkedin className="w-4 h-4" /> {formData.linkedin || "linkedin.com/in/seuusuario"}
            </p>

            <p className="text-gray-500 dark:text-gray-400 mt-4">
              {formData.resumo || "Seu resumo profissional aparecerá aqui..."}
            </p>

            <hr className="my-4 border-gray-200 dark:border-gray-700" />

            <div className="mb-4">
              <h4 className="font-bold flex items-center gap-2 text-gray-800 dark:text-white">
               <User className="w-4 h-4" /> Habilidades
             </h4>
              <ul className="text-sm text-gray-500 dark:text-gray-400 mt-2 space-y-1">
                {skills.length > 0 ? (
                skills.map((skill) => (
                  <li key={skill.id}>
                  <strong>{skill.name}</strong> - {skill.level}
                  </li>
                ))
             ) : (
                <p>Suas habilidades aparecerão aqui conforme você adiciona...</p>
             )}
             </ul>
            </div>

            <div>
              <h4 className="font-bold flex items-center gap-2 text-gray-800 dark:text-white">
                <Briefcase className="w-4 h-4" /> Experiência Profissional
              </h4>
              <ul className="text-sm text-gray-500 dark:text-gray-400 mt-2 space-y-2">
                {experiences.length > 0 ? (
                  experiences.map((exp) => (
                    <li key={exp.id} className="border p-2 rounded">
                      <strong>{exp.position}</strong> - {exp.company}
                    </li>
                  ))
                ) : (
                  <p>Suas experiências profissionais aparecerão aqui...</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Toast de auto-save */}
      <ToastComponent />
    </div>
  );
}
