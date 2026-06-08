"use client";

import { CaseStudyBento } from "@/components/case-studies/case-study-bento";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "freshprints-image-gen";

export default function FreshprintsImageGenContent() {
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
          { label: "Prompt composer", aspect: "video", span: "full" },
          { label: "Generation queue", aspect: "square" },
          { label: "Asset review grid", aspect: "square" },
        ]}
      />
    </div>
  );
}
