import type { ReactNode } from "react";
import {
  CASE_STUDY_H3,
  CASE_STUDY_LIST,
  CASE_STUDY_PAGE_GRID,
  CASE_STUDY_PARAGRAPH,
  CASE_STUDY_PARAGRAPH_DENSE,
  CASE_STUDY_PARAGRAPH_TIGHT,
  CASE_STUDY_TIGHT_STACK,
  CASE_STUDY_PROSE_INNER,
  CASE_STUDY_PROSE_INNER_DENSE,
  CASE_STUDY_QUOTE,
  CASE_STUDY_SUBHEADING,
  CASE_STUDY_WIDE_WRAPPER,
  CASE_STUDY_YEAR,
} from "@/components/case-studies/case-study-editorial";

interface CaseStudyProseProps {
  children: ReactNode;
  className?: string;
  /** Halves default paragraph spacing (space-y-3, no mb-6 stack). */
  dense?: boolean;
}

export function CaseStudyProse({
  children,
  className = "",
  dense = false,
}: CaseStudyProseProps) {
  const innerClass = dense ? CASE_STUDY_PROSE_INNER_DENSE : CASE_STUDY_PROSE_INNER;

  return (
    <div className={CASE_STUDY_PAGE_GRID}>
      <div className={`${innerClass} ${className}`.trim()}>{children}</div>
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
  dense?: boolean;
  /** Half of dense spacing — use inside CaseStudyTightStack. */
  tight?: boolean;
}

export function CaseStudyParagraph({
  children,
  dense = false,
  tight = false,
}: CaseStudyParagraphProps) {
  const className = tight
    ? CASE_STUDY_PARAGRAPH_TIGHT
    : dense
      ? CASE_STUDY_PARAGRAPH_DENSE
      : CASE_STUDY_PARAGRAPH;

  return <p className={className}>{children}</p>;
}

interface CaseStudyTightStackProps {
  children: ReactNode;
}

export function CaseStudyTightStack({ children }: CaseStudyTightStackProps) {
  return <div className={CASE_STUDY_TIGHT_STACK}>{children}</div>;
}

interface CaseStudyQuoteProps {
  children: ReactNode;
}

export function CaseStudyQuote({ children }: CaseStudyQuoteProps) {
  return <blockquote className={CASE_STUDY_QUOTE}>{children}</blockquote>;
}

interface CaseStudySubheadingProps {
  children: ReactNode;
}

export function CaseStudySubheading({ children }: CaseStudySubheadingProps) {
  return <h2 className={CASE_STUDY_SUBHEADING}>{children}</h2>;
}

interface CaseStudyH2Props {
  children: ReactNode;
}

export function CaseStudyH2({ children }: CaseStudyH2Props) {
  return <h2 className={CASE_STUDY_H3}>{children}</h2>;
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
