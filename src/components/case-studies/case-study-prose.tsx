import type { ReactNode } from "react";
import {
  CASE_STUDY_H3,
  CASE_STUDY_LIST,
  CASE_STUDY_PAGE_GRID,
  CASE_STUDY_PARAGRAPH,
  CASE_STUDY_PROSE_INNER,
  CASE_STUDY_SUBHEADING,
  CASE_STUDY_WIDE_WRAPPER,
  CASE_STUDY_YEAR,
} from "@/components/case-studies/case-study-editorial";

interface CaseStudyProseProps {
  children: ReactNode;
  className?: string;
}

export function CaseStudyProse({ children, className = "" }: CaseStudyProseProps) {
  return (
    <div className={CASE_STUDY_PAGE_GRID}>
      <div className={`${CASE_STUDY_PROSE_INNER} ${className}`.trim()}>
        {children}
      </div>
    </div>
  );
}

interface CaseStudyWideProps {
  children: ReactNode;
  className?: string;
}

export function CaseStudyWide({ children, className = "" }: CaseStudyWideProps) {
  return (
    <div className={`${CASE_STUDY_WIDE_WRAPPER} ${className}`.trim()}>
      {children}
    </div>
  );
}

interface CaseStudyParagraphProps {
  children: ReactNode;
}

export function CaseStudyParagraph({ children }: CaseStudyParagraphProps) {
  return <p className={CASE_STUDY_PARAGRAPH}>{children}</p>;
}

interface CaseStudySubheadingProps {
  children: ReactNode;
}

export function CaseStudySubheading({ children }: CaseStudySubheadingProps) {
  return <h2 className={CASE_STUDY_SUBHEADING}>{children}</h2>;
}

interface CaseStudyH3Props {
  children: ReactNode;
}

export function CaseStudyH3({ children }: CaseStudyH3Props) {
  return <h3 className={CASE_STUDY_H3}>{children}</h3>;
}

interface CaseStudyYearProps {
  children: ReactNode;
}

export function CaseStudyYear({ children }: CaseStudyYearProps) {
  return <p className={CASE_STUDY_YEAR}>{children}</p>;
}

interface CaseStudyListProps {
  items: string[];
}

export function CaseStudyList({ items }: CaseStudyListProps) {
  return (
    <ul className={CASE_STUDY_LIST}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
