"use client";

import { CaseStudyBento } from "@/components/case-studies/case-study-bento";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import {
  CaseStudyList,
  CaseStudyParagraph,
  CaseStudyProse,
  CaseStudySubheading,
  CaseStudyWide,
} from "@/components/case-studies/case-study-prose";
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

      <CaseStudyProse>
        <CaseStudyParagraph>
          A design system only earns trust when tokens, components, and documentation
          read as one continuous language. We audited hundreds of one-off UI patterns
          across merchant tooling and consolidated them into a single spec surface
          designers and engineers could ship from without renegotiating spacing every
          sprint.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyBento
          cells={[
            { label: "Token architecture", aspect: "video", span: "full" },
            { label: "Component primitives", aspect: "square" },
            { label: "Documentation surfaces", aspect: "square" },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudySubheading>From scattered specs to shared primitives</CaseStudySubheading>
        <CaseStudyList
          items={[
            "Unified color, type, and elevation tokens across web and internal admin tools.",
            "Documented variant matrices so new contributors ship consistent states on first pass.",
          ]}
        />
        <CaseStudyParagraph>
          Density modes and theming hooks let product squads adapt the library without
          forking base components — the system scales with seasonal campaigns while the
          core grammar stays intact.
        </CaseStudyParagraph>
      </CaseStudyProse>
    </div>
  );
}
