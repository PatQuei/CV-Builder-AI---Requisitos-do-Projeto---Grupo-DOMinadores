import { useEffect, useState } from "react";
import PersonalHeader from "./PersonalHeader";
import ExperienceSection from "./ExperienceSection";
import SkillsSection from "./SkillsSection"; 
type Experience = {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

type Skill = {
  name: string;
  level: string;
};

export default function CVPreview() {
  const [name, setName] = useState("John Doe");
  const [title, setTitle] = useState("Software Engineer");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("(123) 456-7890");

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [expForm, setExpForm] = useState<Experience>({
    jobTitle: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillForm, setSkillForm] = useState<Skill>({ name: "", level: "" });

  useEffect(() => {
    const saved = localStorage.getItem("cv.personal");
    if (saved) {
      const d = JSON.parse(saved) as { name: string; title: string; email: string; phone: string };
      setName(d.name);
      setTitle(d.title);
      setEmail(d.email);
      setPhone(d.phone);
    }

    const expSaved = localStorage.getItem("cv.experiences");
    if (expSaved) {
      setExperiences(JSON.parse(expSaved));
    }

    const skillsSaved = localStorage.getItem("cv.skills");
    if (skillsSaved) {
      setSkills(JSON.parse(skillsSaved));
    }
  }, []);

  useEffect(() => {
    const d = { name, title, email, phone };
    localStorage.setItem("cv.personal", JSON.stringify(d));
  }, [name, title, email, phone]);

  useEffect(() => {
    localStorage.setItem("cv.experiences", JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem("cv.skills", JSON.stringify(skills));
  }, [skills]);

  function handleAddExperience(e: React.FormEvent) {
    e.preventDefault();
    setExperiences([...experiences, expForm]);
    setExpForm({
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  }

  function handleAddSkill(e: React.FormEvent) {
    e.preventDefault();
    setSkills([...skills, skillForm]);
    setSkillForm({ name: "", level: "" });
  }

  return (
    <div>
      <label htmlFor="name">Nome:</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label htmlFor="title">Título:</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="phone">Telefone:</label>
      <input
        id="phone"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br />
      <PersonalHeader
        name={name}
        title={title}
        email={email}
        phone={phone}
      />
      <hr />
      <h3>Adicionar Experiência</h3>
      <form onSubmit={handleAddExperience}>
        <input
          type="text"
          placeholder="Cargo"
          value={expForm.jobTitle}
          onChange={e => setExpForm({ ...expForm, jobTitle: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Empresa"
          value={expForm.company}
          onChange={e => setExpForm({ ...expForm, company: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Local"
          value={expForm.location}
          onChange={e => setExpForm({ ...expForm, location: e.target.value })}
        />
        <input
          type="text"
          placeholder="Início"
          value={expForm.startDate}
          onChange={e => setExpForm({ ...expForm, startDate: e.target.value })}
        />
        <input
          type="text"
          placeholder="Fim"
          value={expForm.endDate}
          onChange={e => setExpForm({ ...expForm, endDate: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={expForm.description}
          onChange={e => setExpForm({ ...expForm, description: e.target.value })}
        />
        <button type="submit">Adicionar</button>
      </form>
      <ExperienceSection items={experiences} />
      <hr />
      <h3>Adicionar Habilidade</h3>
      <form onSubmit={handleAddSkill}>
        <input
          type="text"
          placeholder="Habilidade"
          value={skillForm.name}
          onChange={e => setSkillForm({ ...skillForm, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Nível"
          value={skillForm.level}
          onChange={e => setSkillForm({ ...skillForm, level: e.target.value })}
          required
        />
        <button type="submit">Adicionar</button>
      </form>
      <SkillsSection items={skills} /> {/* Corrigido para plural */}
    </div>
  );
}

