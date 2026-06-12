import type { ReactNode } from "react";
import {
  CASE_STUDY_HERO_COLUMN,
  CASE_STUDY_LEAD,
  CASE_STUDY_PAGE_GRID,
} from "@/components/case-studies/case-study-editorial";
import { ProjectMetaSpecs } from "@/components/case-studies/project-meta-specs";
import { CaseStudyYear } from "@/components/case-studies/case-study-prose";
import type { CaseStudyMetaSpecs } from "@/lib/project-content";

interface CaseStudyHeroProps {
  title: string;
  year: string;
  overview: string;
  meta?: CaseStudyMetaSpecs;
  metaBottom?: ReactNode;
  className?: string;
}

export function CaseStudyHero({
  title,
  year,
  overview,
  meta,
  metaBottom,
  className = "",
}: CaseStudyHeroProps) {
  return (
    <>
      <header className={`${CASE_STUDY_PAGE_GRID} ${className}`.trim()}>
        <div className={CASE_STUDY_HERO_COLUMN}>
          <CaseStudyYear>{year}</CaseStudyYear>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {title}
          </h1>
          <p className={`${CASE_STUDY_LEAD} md:whitespace-nowrap`}>{overview}</p>
        </div>
      </header>

      {meta ? (
        <ProjectMetaSpecs {...meta}>{metaBottom}</ProjectMetaSpecs>
      ) : null}
    </>
  );
}
