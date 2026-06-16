"use client";

import { CaseStudyBento } from "@/components/case-studies/case-study-bento";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { CaseStudyMedia } from "@/components/case-studies/case-study-media";
import {
  CaseStudyH2,
  CaseStudyDivider,
  CaseStudyH3,
  CaseStudyList,
  CaseStudyParagraph,
  CaseStudyProse,
  CaseStudyQuote,
  CaseStudyTightStack,
  CaseStudyLabel,
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
        <CaseStudyLabel>PROJECT OVERVIEW</CaseStudyLabel>
        <CaseStudyH2>Principles Behind the Design System</CaseStudyH2>
        <CaseStudyParagraph>
          At FreshPrints, Systems Design supports a wide range of internal and external
          products. Most of this work involves designing, managing, and deploying
          components, as well as building the core architecture that supports these
          complex design systems.
        </CaseStudyParagraph>
        <CaseStudyH2>Collaboration with</CaseStudyH2>
        <CaseStudyTightStack>
          <CaseStudyParagraph tight>
            Director of Product Design: Tikshita Bharti
          </CaseStudyParagraph>
          <CaseStudyParagraph tight>
            Product &amp; Design: Team B Led by Me
          </CaseStudyParagraph>
          <CaseStudyParagraph tight>
            Engineering: Vivek Singh &amp; Team
          </CaseStudyParagraph>
        </CaseStudyTightStack>
        <CaseStudyH2>Approach</CaseStudyH2>
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
          columns={3}
          cells={[
            {
              label: "Colours",
              caption: "Colours",
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-ds-card-1"],
              alt: "FreshPrints design system colours",
            },
            {
              label: "Typography",
              caption: "Typography",
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-ds-card-2"],
              alt: "FreshPrints design system typography",
            },
            {
              label: "Shadows",
              caption: "Shadows",
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-ds-card-3"],
              alt: "FreshPrints design system shadows",
            },
            {
              label: "Avatar",
              caption: "Avatar",
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-ds-card-4"],
              alt: "FreshPrints design system avatar",
            },
            {
              label: "Menu",
              caption: "Menu",
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-ds-card-5"],
              alt: "FreshPrints design system menu",
            },
            {
              label: "Component docs detail 6",
              caption: "14+",
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-ds-card-6"],
              alt: "FreshPrints design system 14+ components",
            },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudyH2>Making Component Docs Easy & Automated</CaseStudyH2>
        <CaseStudyParagraph>
          Component documentation in Figma helps designers and developers understand how
          to use each UI component. However, FreshPrint&apos;s design system &amp; docs
          both were incomplete and hard to understand. Our goal was to create clear,
          consistent, and automated component documentation that&apos;s easy to read and
          update.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          <span className="font-semibold text-white">
            Understanding how teams use component docs
          </span>
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Each design system&apos;s component docs look different. To learn what patterns
          worked and what didn&apos;t, I reached out to design system teams across
          various companies.
        </CaseStudyParagraph>
        <CaseStudyQuote>
          &ldquo;We need to prioritise a method that is at least 100% modular to adapt
          to constant updates across our products.&rdquo;
          <span className="mt-2 block text-base font-normal text-neutral-400">
            — Director of design
          </span>
        </CaseStudyQuote>
      </CaseStudyProse>

      <CaseStudyProse>
        <CaseStudyH2>Creating Measurable design features</CaseStudyH2>
        <CaseStudyList
          items={[
            "Increase editing efficiency",
            "Understand for designer & engineers",
            "Scalable across other design systems",
          ]}
        />
        <CaseStudyParagraph>
          To make sure my design aligns with product team&apos;s needs, I created
          goals that I could use to ensure my solution addressed the prior mentioned
          pain points successfully.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyProse>
        <CaseStudyLabel>Goal 1</CaseStudyLabel>
        <CaseStudyH3>Increase editing efficiency</CaseStudyH3>
        <CaseStudyParagraph>
          In order for the design system to adapt to the ever-changing needs of Fresh
          Prints Platforms, any documentation should be equally adaptive to reflect new
          updates.
        </CaseStudyParagraph>
        <CaseStudyLabel>Goal 2</CaseStudyLabel>
        <CaseStudyH3>Understandable across teams</CaseStudyH3>
        <CaseStudyParagraph>
          Any team, such as product design or engineering should easily understand the
          documentation without adding any additional learning curve.
        </CaseStudyParagraph>
        <CaseStudyLabel>Goal 3</CaseStudyLabel>
        <CaseStudyH3>Scalable across all products</CaseStudyH3>
        <CaseStudyParagraph>
          With many internal and consumer-based product FreshPrints, the documentation
          should act as unifying guide, recognisable from file to file.
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
              alt: "FreshPrints colour swatch",
            },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudyDivider />
        <CaseStudyH2>Conclusion &amp; Learnings</CaseStudyH2>
        <CaseStudyParagraph>
          This project is still a work in progress — we&apos;re about 30% through the
          design process. But so far, I&apos;ve already learned some key lessons:
        </CaseStudyParagraph>
        <CaseStudyList
          items={[
            "Prioritising User-Centricity: Early insights into user needs have guided the initial design direction.",
            "Strategic Design Systems: Laying the groundwork for a structured system has been crucial for scaling our efforts.",
            "Collaborative Approach: Strong teamwork has been vital to make steady progress and align design with development.",
          ]}
        />
        <CaseStudyParagraph>
          Even at this early stage, these lessons are shaping the project&apos;s
          direction and helping ensure it stays focused on user impact.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          aspect="natural"
          src={CASE_STUDY_CDN_MEDIA["freshprints-design-system-impact"]}
          alt="FreshPrints design system impact"
        />
      </CaseStudyWide>
    </div>
  );
}
