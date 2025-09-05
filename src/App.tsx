import { Mail, Phone, Linkedin, User, FileText, Key, Download, Briefcase, Moon, Sun,
} from "lucide-react";
import { useDarkMode } from "./hooks/useDarkMode";
import { usePersistentState } from "./hooks/usePersistentState";

export default function App() {
  const [formData, setFormData] = usePersistentState("cv-data", {
    nome: "",
    email: "",
    telefone: "",
    linkedin: "",
    resumo: "",
  });


  const { darkMode, setDarkMode } = useDarkMode();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
              type="text"
              placeholder="Cole sua API Key"
              className="outline-none text-sm bg-transparent text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Botão Exportar PDF */}
          <button className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
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
            </div>
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
                <Mail className="w-4 h-4" />{" "}
                {formData.email || "seu.email@exemplo.com"}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" />{" "}
                {formData.telefone || "(11) 99999-9999"}
              </span>
            </div>
            <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 mt-1">
              <Linkedin className="w-4 h-4" />{" "}
              {formData.linkedin || "linkedin.com/in/seuusuario"}
            </p>

            <p className="text-gray-500 dark:text-gray-400 mt-4">
              {formData.resumo ||
                "Seu resumo profissional aparecerá aqui..."}
            </p>

            <hr className="my-4 border-gray-200 dark:border-gray-700" />

            <div className="mb-4">
              <h4 className="font-bold flex items-center gap-2 text-gray-800 dark:text-white">
                <User className="w-4 h-4" /> Habilidades
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Suas habilidades aparecerão aqui conforme você adiciona...
              </p>
            </div>

            <div>
              <h4 className="font-bold flex items-center gap-2 text-gray-800 dark:text-white">
                <Briefcase className="w-4 h-4" /> Experiência Profissional
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Suas experiências profissionais aparecerão aqui...
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
