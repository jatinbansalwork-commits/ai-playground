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

const SLUG = "open-money";

export default function OpenMoneyContent() {
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
          Payments infrastructure must feel calm even when rails are complex. Open
          Money foregrounds account health, verification status, and transfer history
          in layouts that prioritize trust cues — clear balances, explicit states, and
          recoverable error paths.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyBento
          cells={[
            { label: "Account overview", aspect: "video", span: "full" },
            { label: "Payments infrastructure", aspect: "square" },
            { label: "Trust and verification patterns", aspect: "square" },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudySubheading>Trust as a designed system</CaseStudySubheading>
        <CaseStudyList
          items={[
            "Verification flows that explain why each step matters before requesting documents.",
            "Transaction receipts with immutable status timelines for dispute resolution.",
          ]}
        />
      </CaseStudyProse>
    </div>
  );
}
