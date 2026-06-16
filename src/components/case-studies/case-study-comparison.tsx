import type { ReactNode } from "react";
import { CASE_STUDY_LABEL } from "@/components/case-studies/case-study-editorial";

interface CaseStudyComparisonProps {
  before: ReactNode;
  after: ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function CaseStudyComparison({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}: CaseStudyComparisonProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 ${className}`.trim()}
      role="group"
      aria-label={`${beforeLabel} and ${afterLabel} comparison`}
    >
      <div className="space-y-3">
        <p className={CASE_STUDY_LABEL}>{beforeLabel}</p>
        {before}
      </div>
      <div className="space-y-3">
        <p className={CASE_STUDY_LABEL}>{afterLabel}</p>
        {after}
      </div>
    </div>
  );
}
