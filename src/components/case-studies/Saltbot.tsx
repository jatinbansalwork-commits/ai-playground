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

const SLUG = "saltbot";

export default function SaltbotContent() {
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
          Conversational assistants earn trust through predictable escalation, not
          endless small talk. We mapped Saltbot&apos;s highest-risk automation paths
          and designed thread states that make guardrails visible before a user commits
          to an irreversible action.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyBento
          cells={[
            { label: "Conversation thread", aspect: "video", span: "full" },
            { label: "Automation guardrails", aspect: "square" },
            { label: "Escalation handoff", aspect: "square" },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudySubheading>When the bot should step aside</CaseStudySubheading>
        <CaseStudyList
          items={[
            "Inline confidence cues before executing account-level changes.",
            "One-tap human handoff preserving full thread context for support agents.",
          ]}
        />
      </CaseStudyProse>
    </div>
  );
}
