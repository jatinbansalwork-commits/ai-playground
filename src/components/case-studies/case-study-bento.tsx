import type { ReactNode } from "react";
import { CaseStudyMedia } from "@/components/case-studies/case-study-media";

export interface CaseStudyBentoCell {
  label: string;
  caption?: ReactNode;
  aspect?: "video" | "square" | "portrait" | "natural";
  span?: "full" | "half";
  src?: string;
  alt?: string;
  paragraph?: ReactNode;
}

interface CaseStudyBentoProps {
  cells: CaseStudyBentoCell[];
  className?: string;
  columns?: 2 | 3;
}

export function CaseStudyBento({
  cells,
  className = "",
  columns = 2,
}: CaseStudyBentoProps) {
  const columnClass = columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <section
      aria-label="Case study gallery"
      className={`grid grid-cols-1 gap-6 ${columnClass} ${className}`.trim()}
    >
      {cells.map((cell) => (
        <CaseStudyMedia
          key={cell.label}
          label={cell.caption}
          aspect={cell.aspect}
          src={cell.src}
          alt={cell.alt ?? cell.label}
          paragraph={cell.paragraph}
          className={cell.span === "full" ? "md:col-span-2" : undefined}
        />
      ))}
    </section>
  );
}
