import {
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  CASE_STUDY_DIVIDER,
  CASE_STUDY_DISPLAY_LINE,
  CASE_STUDY_CHAPTER,
  CASE_STUDY_H2,
  CASE_STUDY_H3,
  CASE_STUDY_LABEL,
  CASE_STUDY_LIST,
  CASE_STUDY_PAGE_GRID,
  CASE_STUDY_PARAGRAPH,
  CASE_STUDY_PARAGRAPH_DENSE,
  CASE_STUDY_PARAGRAPH_TIGHT,
  CASE_STUDY_SECTION_DEFAULT,
  CASE_STUDY_SECTION_INNER,
  CASE_STUDY_SECTION_MAJOR,
  CASE_STUDY_SECTION_TIGHT,
  CASE_STUDY_SUBSECTION,
  CASE_STUDY_TIGHT_STACK,
  CASE_STUDY_PROSE_INNER,
  CASE_STUDY_PROSE_INNER_DENSE,
  CASE_STUDY_QUOTE,
  CASE_STUDY_TEXT_COLUMN,
  CASE_STUDY_WIDE_WRAPPER,
  CASE_STUDY_YEAR,
} from "@/components/case-studies/case-study-editorial";
import { useCaseStudyHeading } from "@/components/case-studies/case-study-toc-context";
import { splitCaseStudyListLead } from "@/lib/case-study-heading";
import { CASE_STUDY_HEADING_SCROLL_MARGIN } from "@/lib/case-study-a11y";

function headingText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(headingText).join("");
  }

  if (isValidElement(children)) {
    return headingText((children as ReactElement<{ children?: ReactNode }>).props.children);
  }

  return "";
}

interface CaseStudyProseProps {
  children: ReactNode;
  className?: string;
  /** Halves default paragraph spacing (space-y-3). */
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

interface CaseStudySectionProps {
  children: ReactNode;
  variant?: "major" | "default" | "tight";
  className?: string;
}

export function CaseStudySection({
  children,
  variant = "default",
  className = "",
}: CaseStudySectionProps) {
  const spacing =
    variant === "major"
      ? CASE_STUDY_SECTION_MAJOR
      : variant === "tight"
        ? CASE_STUDY_SECTION_TIGHT
        : CASE_STUDY_SECTION_DEFAULT;

  return (
    <section className={`${spacing} ${CASE_STUDY_SECTION_INNER} ${className}`.trim()}>
      {children}
    </section>
  );
}

interface CaseStudySubsectionProps {
  children: ReactNode;
  className?: string;
}

export function CaseStudySubsection({
  children,
  className = "",
}: CaseStudySubsectionProps) {
  return <div className={`${CASE_STUDY_SUBSECTION} ${className}`.trim()}>{children}</div>;
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
  className?: string;
}

export function CaseStudyParagraph({
  children,
  dense = false,
  tight = false,
  className = "",
}: CaseStudyParagraphProps) {
  const textClass = tight
    ? CASE_STUDY_PARAGRAPH_TIGHT
    : dense
      ? CASE_STUDY_PARAGRAPH_DENSE
      : CASE_STUDY_PARAGRAPH;

  return (
    <p className={`${CASE_STUDY_TEXT_COLUMN} ${textClass} ${className}`.trim()}>
      {children}
    </p>
  );
}

interface CaseStudyTightStackProps {
  children: ReactNode;
}

export function CaseStudyTightStack({ children }: CaseStudyTightStackProps) {
  return <div className={`${CASE_STUDY_TEXT_COLUMN} ${CASE_STUDY_TIGHT_STACK}`}>{children}</div>;
}

interface CaseStudyQuoteProps {
  children: ReactNode;
  className?: string;
}

export function CaseStudyQuote({ children, className = "" }: CaseStudyQuoteProps) {
  return (
    <blockquote className={`${CASE_STUDY_TEXT_COLUMN} ${CASE_STUDY_QUOTE} ${className}`.trim()}>
      {children}
    </blockquote>
  );
}

interface CaseStudySubheadingProps {
  children: ReactNode;
}

/** @deprecated Prefer `CaseStudyH2` — kept for existing layouts. */
export function CaseStudySubheading({ children }: CaseStudySubheadingProps) {
  return <CaseStudyH2>{children}</CaseStudyH2>;
}

interface CaseStudyChapterProps {
  children: ReactNode;
  toc?: boolean;
}

/** Opening narrative line — renders as `h2` (hero retains the page `h1`). */
export function CaseStudyChapter({ children, toc = true }: CaseStudyChapterProps) {
  const title = headingText(children);
  const { id } = useCaseStudyHeading(title, 2, toc);

  return (
    <h2 id={id} tabIndex={-1} className={`${CASE_STUDY_CHAPTER} ${CASE_STUDY_HEADING_SCROLL_MARGIN}`}>
      {children}
    </h2>
  );
}

/** @deprecated Use `CaseStudyChapter` — same semantics, clearer name. */
export function CaseStudyH1({ children, toc = true }: CaseStudyChapterProps) {
  return <CaseStudyChapter toc={toc}>{children}</CaseStudyChapter>;
}

interface CaseStudyH2Props {
  children: ReactNode;
  className?: string;
  toc?: boolean;
}

export function CaseStudyH2({
  children,
  className = "",
  toc = true,
}: CaseStudyH2Props) {
  const title = headingText(children);
  const { id } = useCaseStudyHeading(title, 2, toc);

  return (
    <h2
      id={id}
      tabIndex={-1}
      className={`${CASE_STUDY_TEXT_COLUMN} ${CASE_STUDY_H2} ${CASE_STUDY_HEADING_SCROLL_MARGIN} ${className}`.trim()}
    >
      {children}
    </h2>
  );
}

interface CaseStudyH3Props {
  children: ReactNode;
  className?: string;
  toc?: boolean;
}

export function CaseStudyH3({
  children,
  className = "",
  toc = true,
}: CaseStudyH3Props) {
  const title = headingText(children);
  const { id } = useCaseStudyHeading(title, 3, toc);

  return (
    <h3
      id={id}
      tabIndex={-1}
      className={`${CASE_STUDY_TEXT_COLUMN} ${CASE_STUDY_H3} ${CASE_STUDY_HEADING_SCROLL_MARGIN} ${className}`.trim()}
    >
      {children}
    </h3>
  );
}

interface CaseStudyYearProps {
  children: ReactNode;
}

/** Hero year stamp — not used for in-page section kickers. */
export function CaseStudyYear({ children }: CaseStudyYearProps) {
  return <p className={`${CASE_STUDY_TEXT_COLUMN} ${CASE_STUDY_YEAR}`}>{children}</p>;
}

interface CaseStudyLabelProps {
  children: ReactNode;
}

/** In-page section kicker — PROJECT OVERVIEW, UX Principle Applied, etc. */
export function CaseStudyLabel({ children }: CaseStudyLabelProps) {
  return <p className={`${CASE_STUDY_TEXT_COLUMN} ${CASE_STUDY_LABEL}`}>{children}</p>;
}

interface CaseStudyListProps {
  items: string[];
  className?: string;
}

export function CaseStudyList({ items, className = "" }: CaseStudyListProps) {
  return (
    <ul className={`${CASE_STUDY_TEXT_COLUMN} ${CASE_STUDY_LIST} ${className}`.trim()}>
      {items.map((item) => {
        const { lead, body } = splitCaseStudyListLead(item);

        return (
          <li key={item}>
            {lead ? (
              <>
                <span className="font-medium text-white">{lead}</span> {body}
              </>
            ) : (
              item
            )}
          </li>
        );
      })}
    </ul>
  );
}

interface CaseStudyChipsProps {
  items: string[];
  className?: string;
  /** Accessible name when chips replace a labelled list. */
  ariaLabel?: string;
}

export function CaseStudyChips({
  items,
  className = "",
  ariaLabel = "Items",
}: CaseStudyChipsProps) {
  return (
    <ul
      className={`${CASE_STUDY_TEXT_COLUMN} flex flex-wrap gap-3 ${className}`.trim()}
      aria-label={ariaLabel}
    >
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-[#6B36FF]/50 bg-[#6B36FF]/10 px-4 py-2 text-sm leading-snug text-[#B794FF] md:text-base"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

interface CaseStudyQuestionStackProps {
  items: string[];
  className?: string;
  ariaLabel?: string;
}

/** Stacked question rows — clearer than bullets for decision checklists. */
export function CaseStudyQuestionStack({
  items,
  className = "",
  ariaLabel = "Questions",
}: CaseStudyQuestionStackProps) {
  return (
    <ul
      className={`${CASE_STUDY_TEXT_COLUMN} space-y-2 ${className}`.trim()}
      aria-label={ariaLabel}
    >
      {items.map((item, index) => (
        <li
          key={item}
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base leading-relaxed text-neutral-200"
        >
          <span
            className="shrink-0 font-mono text-xs font-medium tabular-nums text-[#B794FF]"
            aria-hidden
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CaseStudyDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`${CASE_STUDY_TEXT_COLUMN} ${CASE_STUDY_DIVIDER} ${className}`.trim()}
      role="separator"
      aria-orientation="horizontal"
    />
  );
}

interface CaseStudyTableProps {
  /** Accessible name — rendered as sr-only caption. */
  caption: string;
  headers: readonly string[];
  rows: readonly (readonly string[])[];
  className?: string;
}

export function CaseStudyTable({
  caption,
  headers,
  rows,
  className = "",
}: CaseStudyTableProps) {
  return (
    <div
      className={`w-full max-w-5xl overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] ${className}`.trim()}
    >
      <table className="w-full min-w-[640px] border-collapse text-left text-sm leading-relaxed md:text-base">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-white/10">
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-5 py-4 font-semibold tracking-tight text-white md:px-6"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={row.join("-")}
              className="border-b border-white/10 last:border-b-0"
            >
              {row.map((cell, cellIndex) => {
                if (cellIndex === 0) {
                  return (
                    <th
                      key={`${rowIndex}-${cellIndex}`}
                      scope="row"
                      className="px-5 py-4 font-medium text-white md:px-6"
                    >
                      {cell}
                    </th>
                  );
                }

                return (
                  <td
                    key={`${rowIndex}-${cellIndex}`}
                    className="px-5 py-4 text-neutral-300 md:px-6"
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface CaseStudyDisplayLineProps {
  children: ReactNode;
  className?: string;
}

export function CaseStudyDisplayLine({
  children,
  className = "",
}: CaseStudyDisplayLineProps) {
  return (
    <p className={`${CASE_STUDY_TEXT_COLUMN} ${CASE_STUDY_DISPLAY_LINE} ${className}`.trim()}>
      {children}
    </p>
  );
}
