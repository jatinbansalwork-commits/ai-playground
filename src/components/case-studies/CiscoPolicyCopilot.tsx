"use client";

import { CaseStudyBento } from "@/components/case-studies/case-study-bento";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { CaseStudyMedia } from "@/components/case-studies/case-study-media";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "cisco-policy-copilot";

export default function CiscoPolicyCopilotContent() {
  const content = getCaseStudyContent(SLUG)!;

  return (
    <div className="w-full space-y-16">
      <CaseStudyHero
        title={content.title}
        year={content.year}
        overview={content.overviewText}
      />
      <CaseStudyMedia
        label="Policy workflow overview"
        aspect="video"
        className="md:col-span-2"
      />
      <CaseStudyBento
        cells={[
          { label: "Copilot panel states", aspect: "square" },
          { label: "Rule validation flow", aspect: "square" },
          { label: "Network topology context", aspect: "video", span: "full" },
        ]}
      />
    </div>
  );
}
