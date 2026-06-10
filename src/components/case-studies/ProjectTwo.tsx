"use client";

import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import {
  CaseStudyH2,
  CaseStudyParagraph,
  CaseStudyProse,
} from "@/components/case-studies/case-study-prose";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "project-2";

export default function ProjectTwoContent() {
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
        <CaseStudyH2>Section heading</CaseStudyH2>
        <CaseStudyParagraph>Paragraph copy coming soon.</CaseStudyParagraph>

        <CaseStudyH2>Section heading</CaseStudyH2>
        <CaseStudyParagraph>Paragraph copy coming soon.</CaseStudyParagraph>

        <CaseStudyH2>Section heading</CaseStudyH2>
        <CaseStudyParagraph>Paragraph copy coming soon.</CaseStudyParagraph>
      </CaseStudyProse>
    </div>
  );
}
