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

const SLUG = "saltmine-sync";

export default function SaltmineSyncContent() {
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
          Data reconciliation tools fail when operators cannot see drift before it
          becomes downtime. Saltmine-Sync foregrounds sync health, surfaces diffs at
          the field level, and routes conflicts through resolutions that mirror how
          engineers already triage production incidents.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyBento
          cells={[
            { label: "Sync health dashboard", aspect: "video", span: "full" },
            { label: "Reconciliation diff view", aspect: "square" },
            { label: "Conflict resolution flow", aspect: "square" },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudySubheading>Operational Clarity Under Load</CaseStudySubheading>
        <CaseStudyList
          items={[
            "At-a-glance pipeline status with drill-down to per-entity mismatch logs.",
            "Guided conflict resolution that preserves audit trails for compliance review.",
          ]}
        />
      </CaseStudyProse>
    </div>
  );
}
