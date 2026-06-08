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

const SLUG = "piggy-mutual-fund";

export default function PiggyMutualFundContent() {
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
          First-time investors need education woven into action, not bolted on as
          disclaimers. Piggy&apos;s onboarding sequences pair each funding decision
          with plain-language context so users understand risk before they commit
          capital.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyBento
          cells={[
            { label: "Onboarding funnel", aspect: "video", span: "full" },
            { label: "Portfolio summary", aspect: "square" },
            { label: "Investment education modules", aspect: "square" },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudySubheading>Confidence through progressive disclosure</CaseStudySubheading>
        <CaseStudyList
          items={[
            "Portfolio summaries that translate fund composition into everyday analogies.",
            "Education modules unlocked alongside milestones, not dumped upfront.",
          ]}
        />
      </CaseStudyProse>
    </div>
  );
}
