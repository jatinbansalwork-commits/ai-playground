import type { ReactNode } from "react";
import {
  CASE_STUDY_DIVIDER,
  CASE_STUDY_LABEL,
  CASE_STUDY_TEXT_COLUMN,
} from "@/components/case-studies/case-study-editorial";

interface CaseStudyTagsProps {
  tags: string[];
  label?: string;
  labelClassName?: string;
}

export function CaseStudyTags({
  tags,
  label = "Key themes",
  labelClassName,
}: CaseStudyTagsProps) {
  return (
    <div className={CASE_STUDY_TEXT_COLUMN}>
      <p className={labelClassName ?? CASE_STUDY_LABEL}>{label}</p>
      <ul className="mt-3 flex flex-wrap gap-3">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-brand-accent/50 bg-brand-accent/10 px-4 py-2 text-sm leading-snug text-brand-accent-soft md:text-base"
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface CaseStudyFindingsProps {
  tags: string[];
  children?: ReactNode;
}

export function CaseStudyFindings({ tags, children }: CaseStudyFindingsProps) {
  return (
    <div className={`${CASE_STUDY_TEXT_COLUMN} overflow-hidden rounded-2xl py-6 md:py-8`}>
      {children ? <div className="mb-8">{children}</div> : null}

      <div className={children ? CASE_STUDY_DIVIDER : ""}>
        <CaseStudyTags tags={tags} />
      </div>
    </div>
  );
}
