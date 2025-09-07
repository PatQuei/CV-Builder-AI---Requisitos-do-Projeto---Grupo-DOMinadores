type Experience = {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};


type ExperienceSectionProps = {
  items: Experience[];
};

export default function ExperienceSection({ items }: ExperienceSectionProps) {
  return (
    <section>
      <h3>Experiências</h3>
      <ul>
        {items.map((exp, idx) => (
          <li key={idx}>
            <strong>{exp.jobTitle}</strong> - {exp.company} ({exp.startDate} - {exp.endDate})
            <br />
            <span>{exp.location}</span>
            <p>{exp.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}