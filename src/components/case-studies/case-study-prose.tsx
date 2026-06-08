import type { ReactNode } from "react";
import {
  CASE_STUDY_LIST,
  CASE_STUDY_PARAGRAPH,
  CASE_STUDY_PROSE_WRAPPER,
  CASE_STUDY_SUBHEADING,
  CASE_STUDY_WIDE_WRAPPER,
} from "@/components/case-studies/case-study-editorial";

interface CaseStudyProseProps {
  children: ReactNode;
  className?: string;
}

export function CaseStudyProse({ children, className = "" }: CaseStudyProseProps) {
  return (
    <div className={`${CASE_STUDY_PROSE_WRAPPER} ${className}`.trim()}>
      {children}
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
