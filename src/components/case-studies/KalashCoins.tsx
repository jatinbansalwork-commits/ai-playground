"use client";

import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import {
  CaseStudyH2,
  CaseStudyParagraph,
  CaseStudyProse,
  CaseStudySection,
} from "@/components/case-studies/case-study-prose";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "kalash-coins";

export default function KalashCoinsContent() {
  const content = getCaseStudyContent(SLUG)!;

  return (
    <>
      <CaseStudyHero
        title={content.title}
        year={content.year}
        overview={content.overviewText}
        tagline="Loyalty adoption from 10% to 85%"
        meta={content.meta}
      />

      <CaseStudyProse>
        <CaseStudySection>
          <CaseStudyH2>Project Overview</CaseStudyH2>
          <CaseStudyParagraph>
            Kalash Coins optimised the &ldquo;coin&rdquo; to gold redemption
            journey to increase adoption of Kalash&apos;s rewards loyalty
            program from 10% to 85%.
          </CaseStudyParagraph>
          <CaseStudyParagraph>
            This case study page is the live shell for the project — flow detail,
            research, and outcome visuals will land here as assets are ready.
          </CaseStudyParagraph>
        </CaseStudySection>
      </CaseStudyProse>
    </>
  );
}
