"use client";

import { CaseStudyBento } from "@/components/case-studies/case-study-bento";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "piggy-mutual-fund";

export default function PiggyMutualFundContent() {
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
          { label: "Onboarding funnel", aspect: "video", span: "full" },
          { label: "Portfolio summary", aspect: "square" },
          { label: "Investment education modules", aspect: "square" },
        ]}
      />
    </div>
  );
}
