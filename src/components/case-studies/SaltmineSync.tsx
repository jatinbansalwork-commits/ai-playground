"use client";

import { CaseStudyBento } from "@/components/case-studies/case-study-bento";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "saltmine-sync";

export default function SaltmineSyncContent() {
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
          { label: "Sync health dashboard", aspect: "video", span: "full" },
          { label: "Reconciliation diff view", aspect: "square" },
          { label: "Conflict resolution flow", aspect: "square" },
        ]}
      />
    </div>
  );
}
