import type { ReactNode } from "react";

interface CaseStudyTagsProps {
  tags: string[];
}

export function CaseStudyTags({ tags }: CaseStudyTagsProps) {
  return (
    <ul className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-[#6B36FF]/50 bg-[#6B36FF]/10 px-4 py-2 text-sm leading-snug text-[#B794FF] md:text-base"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

interface CaseStudyFindingsProps {
  tags: string[];
  children?: ReactNode;
}

export function CaseStudyFindings({ tags, children }: CaseStudyFindingsProps) {
  return (
    <div className="overflow-hidden rounded-2xl py-6 md:py-8">
      {children ? <div className="mb-8">{children}</div> : null}

      <div className={children ? "border-t border-neutral-800/40 pt-6" : ""}>
        <CaseStudyTags tags={tags} />
      </div>
    </div>
  );
}
