export interface PersonalInfoData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface CVData {
  personalInfo: PersonalInfoData;
  skills: Skill[];
  experiences: ExperienceItem[];
}
