// src/services/aiService.ts
interface FormData {
  nome: string;
  email: string;
  linkedin: string;
  telefone: string;
  resumo?: string;
}

interface Experience {
  position: string;
  company: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
}

export async function generateSummaryGemini(
  apiKey: string,
  formData: FormData,
  experiences: Experience[]
) {
  const prompt = `
    Gere um resumo profissional em primeira pessoa, breve (até 5 linhas),
    baseado nas informações abaixo:

  Nome: ${formData.nome}
  Email: ${formData.email}
  Telefone: ${formData.telefone}
  LinkedIn: ${formData.linkedin}
  Resumo fornecido: ${formData.resumo || "Não informado"}
  Experiências: ${experiences
    //incluir skill aqui
      .map(
        (exp) =>
          `${exp.position} na ${exp.company} de ${exp.startDate} até ${
            exp.isCurrent ? "Presente" : exp.endDate
          }`
      )
      .join("; ")}
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    console.log("Resposta da API Gemini:", data);

    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Resposta inválida da API Gemini.");
    }
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    throw error;
  }
}
