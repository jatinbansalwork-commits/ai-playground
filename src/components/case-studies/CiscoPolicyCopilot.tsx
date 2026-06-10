"use client";

import { CaseStudyBento } from "@/components/case-studies/case-study-bento";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { CaseStudyMedia } from "@/components/case-studies/case-study-media";
import {
  CaseStudyList,
  CaseStudyParagraph,
  CaseStudyProse,
  CaseStudySubheading,
  CaseStudyWide,
} from "@/components/case-studies/case-study-prose";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "cisco-policy-copilot";

export default function CiscoPolicyCopilotContent() {
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
          To effectively bridge the gap between network administration rules and
          automated AI configurations, we reimagined how security policy telemetry is
          surfaced. Our initial user journey maps revealed a critical friction point:
          practitioners were consistently toggling between siloed dashboard panes just
          to trace a single policy change footprint.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          label="Policy workflow overview"
          alt="Policy workflow overview"
          aspect="video"
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudySubheading>Tracing Policy at the Speed of Thought</CaseStudySubheading>
        <CaseStudyList
          items={[
            "Streamlined complex automated policy adjustments into clear, readable natural language logs.",
            "Cut look-up time in half by embedding direct trace pathways into interactive visual network maps.",
          ]}
        />
        <CaseStudyParagraph>
          The copilot layer sits above existing telemetry without replacing admin
          workflows — it translates rule diffs, validation errors, and deployment
          states into a single conversational surface practitioners can audit in
          place.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyBento
          cells={[
            { label: "Copilot panel states", aspect: "square" },
            { label: "Rule validation flow", aspect: "square" },
            { label: "Network topology context", aspect: "video", span: "full" },
          ]}
        />
      </CaseStudyWide>
    </div>
  );
}
