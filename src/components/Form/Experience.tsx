import { Experience } from "/src/types/cv.types.ts";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  if (experiences.length === 0) return null;

  const formatPeriod = (
    startDate: string,
    endDate: string,
    isCurrentJob: boolean
  ) => {
    const formatDate = (dateString: string) => {
      if (!dateString) return "";

      // Handle YYYY-MM format
      if (/^\d{4}-\d{2}$/.test(dateString)) {
        const [year, month] = dateString.split("-");
        const monthNames = [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez",
        ];
        return `${monthNames[parseInt(month) - 1]} ${year}`;
      }

      return dateString;
    };

    const start = formatDate(startDate);
    const end = isCurrentJob ? "Presente" : formatDate(endDate);

    if (!start) return "";
    return `${start} - ${end || "Presente"}`;
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground mb-3 border-b border-border pb-1">
        Experiência Profissional
      </h2>
      <div className="space-y-4">
        {experiences.map((experience) => (
          <div key={experience.id} className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-foreground">
                  {experience.position || "Cargo"}
                </h3>
                <p className="text-primary font-medium text-sm">
                  {experience.company || "Nome da Empresa"}
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                {formatPeriod(
                  experience.startDate,
                  experience.endDate,
                  experience.isCurrentJob
                )}
              </span>
            </div>

            {experience.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {experience.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
