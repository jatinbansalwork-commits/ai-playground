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

const SLUG = "freshprints-image-gen";

export default function FreshprintsImageGenContent() {
  const content = getCaseStudyContent(SLUG)!;

  return (
    <div className="w-full space-y-16">
      <CaseStudyHero
        title={content.title}
        year={content.year}
        overview={content.overviewText}
        meta={content.meta}
      />

      <CaseStudyProse>
        <CaseStudyParagraph>
          Generative tooling breaks down when prompt craft and asset review live in
          different mental spaces. We connected composition, iteration history, and
          approval gates into one queue so merchants could steer outputs without losing
          brand guardrails mid-session.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyBento
          cells={[
            { label: "Prompt composer", aspect: "video", span: "full" },
            { label: "Generation queue", aspect: "square" },
            { label: "Asset review grid", aspect: "square" },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudySubheading>Governance without friction</CaseStudySubheading>
        <CaseStudyList
          items={[
            "Structured prompt templates around seasonal merch constraints and logo safe zones.",
            "Batch review grids that surface rejection reasons before assets reach production.",
          ]}
        />
      </CaseStudyProse>
    </div>
  );
}
