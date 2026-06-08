"use client";

import { CaseStudyBento } from "@/components/case-studies/case-study-bento";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "saltbot";

export default function SaltbotContent() {
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
          { label: "Conversation thread", aspect: "video", span: "full" },
          { label: "Automation guardrails", aspect: "square" },
          { label: "Escalation handoff", aspect: "square" },
        ]}
      />
    </div>
  );
}
