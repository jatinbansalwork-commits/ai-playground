import { CASE_STUDY_LEAD, CASE_STUDY_PROSE_WRAPPER } from "@/components/case-studies/case-study-editorial";

interface CaseStudyHeroProps {
  title: string;
  year: string;
  overview: string;
  className?: string;
}

export function CaseStudyHero({
  title,
  year,
  overview,
  className = "",
}: CaseStudyHeroProps) {
  return (
    <header className={`${CASE_STUDY_PROSE_WRAPPER} ${className}`.trim()}>
      <p className="text-sm font-medium tracking-wide text-neutral-400">{year}</p>
      <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
        {title}
      </h1>
      <p className={CASE_STUDY_LEAD}>{overview}</p>
    </header>
  );
}
