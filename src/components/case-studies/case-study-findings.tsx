import type { ReactNode } from "react";
import {
  CASE_STUDY_DIVIDER,
  CASE_STUDY_LABEL,
  CASE_STUDY_TEXT_COLUMN,
} from "@/components/case-studies/case-study-editorial";

interface CaseStudyTagsProps {
  tags: string[];
  label?: string;
}

export function CaseStudyTags({ tags, label = "Key themes" }: CaseStudyTagsProps) {
  return (
    <div className={CASE_STUDY_TEXT_COLUMN}>
      <p className={CASE_STUDY_LABEL}>{label}</p>
      <ul className="mt-3 flex flex-wrap gap-3">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-[#6B36FF]/50 bg-[#6B36FF]/10 px-4 py-2 text-sm leading-snug text-[#B794FF] md:text-base"
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
