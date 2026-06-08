"use client";

import { CaseStudyBento } from "@/components/case-studies/case-study-bento";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "kalash-rewards";

export default function KalashRewardsContent() {
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
          { label: "Member rewards home", aspect: "video", span: "full" },
          { label: "Redemption paths", aspect: "portrait" },
          { label: "Tier progression", aspect: "portrait" },
        ]}
      />
    </div>
  );
}
