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

const SLUG = "freshprints-heal-tool";

export default function DesignToolContent() {
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
          Canvas editors fail when structure and spontaneity fight each other. We
          mapped how designers move between freeform exploration and precise layout
          passes, then shaped toolbars, inspectors, and collaboration cues around
          those mode shifts instead of forcing a single workflow metaphor.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyBento
          cells={[
            { label: "Canvas editor", aspect: "video", span: "full" },
            { label: "Layer inspector", aspect: "portrait" },
            { label: "Collaboration cursors", aspect: "portrait" },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudySubheading>Designing for Parallel Attention</CaseStudySubheading>
        <CaseStudyList
          items={[
            "Reduced context switching by anchoring layer metadata beside the active artboard.",
            "Surfaced live collaborator presence without obscuring the objects being edited.",
          ]}
        />
        <CaseStudyParagraph>
          Export and handoff flows close the loop — annotated specs leave the canvas
          with the same hierarchy designers used while exploring, so engineering
          handoffs stay legible under deadline pressure.
        </CaseStudyParagraph>
      </CaseStudyProse>
    </div>
  );
}
