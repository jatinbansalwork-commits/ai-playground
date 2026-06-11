"use client";

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

const SLUG = "freshprints-poll-on-your-design";

export default function DesignPollingContent() {
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
          Async design reviews stall when feedback lives in scattered threads. We
          built a polling canvas where stakeholders vote on layout directions in
          context — seeing variants side by side instead of parsing static exports
          and emoji reactions in Slack.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <CaseStudyMedia
            label="Polling canvas — overview"
            aspect="video"
            className="md:col-span-2"
          />
          <CaseStudyMedia label="Vote aggregation panel" aspect="square" />
          <CaseStudyMedia label="Participant feedback states" aspect="square" />
          <CaseStudyMedia
            label="Workspace layout variants"
            aspect="video"
            className="md:col-span-2"
          />
        </div>
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudySubheading>Closing the Loop Between Vote and Revision</CaseStudySubheading>
        <CaseStudyList
          items={[
            "Aggregated preference signals into a single panel designers could act on immediately.",
            "Preserved participant rationale alongside votes so tie-breaks carried narrative weight.",
          ]}
        />
        <CaseStudyParagraph>
          Layout variants scale from single-column critique sessions to multi-track
          workshops — the workspace grid adapts without rewriting the underlying
          engagement model.
        </CaseStudyParagraph>
      </CaseStudyProse>
    </div>
  );
}
