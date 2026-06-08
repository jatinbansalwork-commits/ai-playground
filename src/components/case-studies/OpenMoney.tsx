"use client";

import { CaseStudyBento } from "@/components/case-studies/case-study-bento";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "open-money";

export default function OpenMoneyContent() {
  const content = getCaseStudyContent(SLUG)!;

  return (
    <div className="w-full space-y-16">
      <CaseStudyHero
        title={content.title}
        year={content.year}
        overview={content.overviewText}
      />
      <CaseStudyBento
        cells={[
          { label: "Account overview", aspect: "video", span: "full" },
          { label: "Payments infrastructure", aspect: "square" },
          { label: "Trust and verification patterns", aspect: "square" },
        ]}
      />
    </div>
  );
}
