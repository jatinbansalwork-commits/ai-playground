"use client";

import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "piggy-reduced-mutual-fund-support-tickets";

export default function NewProjectContent() {
  const content = getCaseStudyContent(SLUG)!;

  return (
    <div className="w-full space-y-16">
      <CaseStudyHero
        title={content.title}
        year={content.year}
        overview={content.overviewText}
        meta={content.meta}
      />
    </div>
  );
}
