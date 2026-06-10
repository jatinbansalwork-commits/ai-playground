"use client";

import { CaseStudyBento } from "@/components/case-studies/case-study-bento";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { CaseStudyMedia } from "@/components/case-studies/case-study-media";
import {
  CaseStudyH3,
  CaseStudyParagraph,
  CaseStudyProse,
  CaseStudyYear,
  CaseStudyWide,
} from "@/components/case-studies/case-study-prose";
import { CASE_STUDY_CDN_MEDIA } from "@/lib/asset-cdn";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "freshprints-design-system";

export default function FreshprintsDesignSystemContent() {
  const content = getCaseStudyContent(SLUG)!;

  return (
    <div className="w-full space-y-16">
      <CaseStudyHero
        title={content.title}
        year={content.year}
        overview={content.overviewText}
        meta={content.meta}
      />

      <CaseStudyWide>
        <CaseStudyMedia
          aspect="video"
          src={CASE_STUDY_CDN_MEDIA["freshprints-design-system"]}
          alt="FreshPrints design system overview"
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudyYear>PROJECT OVERVIEW</CaseStudyYear>
        <CaseStudyH3>Principles Behind the Design System</CaseStudyH3>
        <CaseStudyParagraph>
          As the FreshPrints platform expanded across multiple products and teams,
          maintaining consistency, accessibility, and scalability became increasingly
          challenging. Different teams were building features independently, which created
          variations in components, interaction patterns, and visual language across
          products.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          To address this, the design system was guided by three core principles:
          accessibility first, scalable components, and consistent patterns. These values
          ensured that every component not only looked unified but also behaved predictably
          across products, helping teams build faster while delivering inclusive and
          reliable user experiences.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyBento
          cells={[
            {
              label: "Component primitives",
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-primitives"],
              alt: "FreshPrints component primitives",
            },
            {
              label: "Documentation surfaces",
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-documentation"],
              alt: "FreshPrints documentation surfaces",
            },
            {
              label: "Design tokens",
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-tokens"],
              alt: "FreshPrints design tokens",
            },
            {
              label: "Swatch",
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-swatch"],
              alt: "FreshPrints color swatch",
            },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudyYear>{content.year}</CaseStudyYear>
        <CaseStudyH3>Improving Speed and Product Quality</CaseStudyH3>
        <CaseStudyParagraph>
          Building the design system required aligning multiple product teams around a
          shared foundation of reusable components, patterns, and documentation. By
          introducing structured components, designers could build interfaces faster while
          maintaining consistency across the platform.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This reduced duplicate design work, improved collaboration with engineers, and
          helped teams move from designing individual screens to building scalable product
          experiences.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The impact became measurable after launch. The new system helped reduce
          design-to-development and release cycles, contributing to a 2× reduction in
          go-to-market time for new features. Adoption grew quickly across teams, with
          design system usage increasing 4× after launch as more designers and engineers
          relied on shared components.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          aspect="video"
          src={CASE_STUDY_CDN_MEDIA["freshprints-design-system-impact"]}
          alt="FreshPrints design system impact"
        />
      </CaseStudyWide>
    </div>
  );
}
