# 👾 CV Builder AI

Gerador de Currículo Inteligente com **preview em tempo real** e melhorias por **Inteligência Artificial**.  
Projeto desenvolvido durante o [Programa Desenvolve](https://desenvolve.grupoboticario.com.br/) fornecido pelo [Grupo Boticário](https://www.grupoboticario.com.br/). 🌱

---

## 🚀 Tecnologias

- React 19  
- TypeScript  
- TailwindCSS v4  
- Vite  
- OpenAI API  

---

## 💡 Conceito

Layout em **split-screen** (duas colunas fixas):  
- **Esquerda** → Formulário para entrada de dados  
- **Direita** → Preview atualizado do currículo em tempo real  

---

## 📝 Formulário

- **Dados Pessoais**: nome, email, telefone, LinkedIn, resumo  
- **Habilidades**: lista dinâmica com níveis de proficiência  
- **Experiências**: empresa, cargo, período, descrição, trabalho atual  

---

## ⚙️ Funcionalidades

- Preview instantâneo  
- Listas dinâmicas (habilidades e experiências)  
- Melhoria de textos por IA  
- Validações e feedback visual  
- Layout desktop otimizado  

---

## ▶️ Como rodar

```bash
git clone https://github.com/seu-usuario/cv-builder-ai.git
cd cv-builder-ai
npm install
echo VITE_OPENAI_API_KEY="sua_api_key_aqui" > .env
npm run dev
