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
    <header className={`space-y-6 ${className}`}>
      <p className="text-sm font-medium tracking-wide text-white/50">{year}</p>
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
      <p className="max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
        {overview}
      </p>
    </header>
  );
}
