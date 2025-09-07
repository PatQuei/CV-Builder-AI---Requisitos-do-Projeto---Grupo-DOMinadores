type Skill = {
  name: string;
  level: string;
};

type SkillSectionProps = {
  items: Skill[];
};

export default function SkillSection({ items }: SkillSectionProps) {
  return (
    <section>
      <h3>Habilidades</h3>
      <ul>
        {items.map((skill, idx) => (
          <li key={idx}>
            <strong>{skill.name}</strong> - {skill.level}
          </li>
        ))}
      </ul>
    </section>
  );
}