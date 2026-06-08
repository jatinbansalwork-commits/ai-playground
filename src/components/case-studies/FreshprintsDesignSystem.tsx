"use client";

import { CaseStudyBento } from "@/components/case-studies/case-study-bento";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "freshprints-design-system";

export default function FreshprintsDesignSystemContent() {
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
          { label: "Token architecture", aspect: "video", span: "full" },
          { label: "Component primitives", aspect: "square" },
          { label: "Documentation surfaces", aspect: "square" },
          { label: "Theming and density modes", aspect: "video", span: "full" },
        ]}
      />
    </div>
  );
}
