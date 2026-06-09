import { CaseStudyMedia } from "@/components/case-studies/case-study-media";

export interface CaseStudyBentoCell {
  label: string;
  aspect?: "video" | "square" | "portrait";
  span?: "full" | "half";
  src?: string;
  alt?: string;
}

interface CaseStudyBentoProps {
  cells: CaseStudyBentoCell[];
  className?: string;
}

export function CaseStudyBento({ cells, className = "" }: CaseStudyBentoProps) {
  return (
    <section
      aria-label="Case study gallery"
      className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${className}`}
    >
      {cells.map((cell) => (
        <CaseStudyMedia
          key={cell.label}
          label={cell.label}
          aspect={cell.aspect}
          src={cell.src}
          alt={cell.alt}
          className={cell.span === "full" ? "md:col-span-2" : undefined}
        />
      ))}
    </section>
  );
}
