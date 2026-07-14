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
      <ul className="mt-4 flex flex-wrap gap-3">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-sky-300 bg-sky-50 px-4 py-2 text-sm leading-snug text-sky-900 md:text-base"
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
    <div className={CASE_STUDY_TEXT_COLUMN}>
      {children ? <div className="pb-5">{children}</div> : null}

      <div className={children ? `${CASE_STUDY_DIVIDER} pt-3` : ""}>
        <CaseStudyTags tags={tags} />
      </div>
    </div>
  );
}
