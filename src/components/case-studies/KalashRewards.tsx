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

const SLUG = "kalash-rewards";

export default function KalashRewardsContent() {
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
          Loyalty programs feel abstract until redemption paths are obvious. We
          reframed Kalash Rewards around member milestones — showing tier progress,
          available perks, and next-best actions in a single home surface tuned for
          repeat visits on mobile.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyBento
          cells={[
            { label: "Member rewards home", aspect: "video", span: "full" },
            { label: "Redemption paths", aspect: "portrait" },
            { label: "Tier progression", aspect: "portrait" },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudySubheading>Motivation without noise</CaseStudySubheading>
        <CaseStudyList
          items={[
            "Tier storytelling that highlights earned status instead of hidden point math.",
            "Redemption flows shortened to two taps for the most common reward categories.",
          ]}
        />
      </CaseStudyProse>
    </div>
  );
}
