"use client";

import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { CaseStudyMedia } from "@/components/case-studies/case-study-media";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "design-polling";

export default function DesignPollingContent() {
  const content = getCaseStudyContent(SLUG)!;

  return (
    <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
      <CaseStudyHero
        title="Design Polling Workspace"
        year={content.year}
        overview={content.overviewText}
        className="md:col-span-2"
      />
      <CaseStudyMedia label="Polling canvas — overview" aspect="video" className="md:col-span-2" />
      <CaseStudyMedia label="Vote aggregation panel" aspect="square" />
      <CaseStudyMedia label="Participant feedback states" aspect="square" />
      <CaseStudyMedia label="Workspace layout variants" aspect="video" className="md:col-span-2" />
    </div>
  );
}
