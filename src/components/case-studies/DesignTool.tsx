"use client";

import { CaseStudyBento } from "@/components/case-studies/case-study-bento";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "design-tool";

export default function DesignToolContent() {
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
          { label: "Canvas editor", aspect: "video", span: "full" },
          { label: "Layer inspector", aspect: "portrait" },
          { label: "Collaboration cursors", aspect: "portrait" },
          { label: "Export and handoff", aspect: "video", span: "full" },
        ]}
      />
    </div>
  );
}
