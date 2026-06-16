"use client";

import { CaseStudyBento } from "@/components/case-studies/case-study-bento";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { CaseStudyMedia } from "@/components/case-studies/case-study-media";
import {
  CaseStudyDivider,
  CaseStudyH2,
  CaseStudyParagraph,
  CaseStudyProse,
  CaseStudyTightStack,
  CaseStudySubheading,
  CaseStudyWide,
} from "@/components/case-studies/case-study-prose";
import { CASE_STUDY_CDN_MEDIA } from "@/lib/asset-cdn";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "kalash-year-end-recap";

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

      <CaseStudyWide>
        <CaseStudyMedia
          aspect="natural"
          src={CASE_STUDY_CDN_MEDIA["kalash-year-end-recap-hero"]}
          alt="Kalash Year-End Recap overview"
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudyH2>Our Goal</CaseStudyH2>
        <CaseStudyParagraph>
          Financial products often focus on numbers and performance, but rarely help
          users appreciate the journey behind them.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The objective was to create a personalised Year-End Recap that transforms
          complex financial activity into meaningful stories, helping users recognise
          their growth, celebrate achievements, and strengthen their connection with
          the platform.
        </CaseStudyParagraph>
        <CaseStudyH2>Collaboration with</CaseStudyH2>
        <CaseStudyTightStack>
          <CaseStudyParagraph tight>
            Product Manager: Aman Bansal, Gaurav Arora
          </CaseStudyParagraph>
          <CaseStudyParagraph tight>Product &amp; Design Led by me</CaseStudyParagraph>
          <CaseStudyParagraph tight>
            Engineering: Development Team
          </CaseStudyParagraph>
        </CaseStudyTightStack>
        <CaseStudyH2>A Year Worth Looking Back On</CaseStudyH2>
        <CaseStudyParagraph>
          Led the end-to-end design process—from concept exploration and storytelling
          framework to visual design, interaction design, and delivery.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyBento
          cells={[
            {
              label: "Year-End Recap overview",
              aspect: "natural",
              span: "full",
              src: CASE_STUDY_CDN_MEDIA["kalash-year-end-recap-rewards"],
              alt: "Kalash Year-End Recap rewards overview",
            },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyWide>
        <CaseStudyBento
          cells={[
            {
              label: "Recap milestone highlights",
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["kalash-year-end-recap-milestones"],
              alt: "Kalash Year-End Recap milestone highlights",
            },
            {
              label: "Shareable year-end moments",
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["kalash-year-end-recap-shareable"],
              alt: "Kalash Year-End Recap shareable moments",
            },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudyDivider />
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyBento
          cells={[
            {
              label: "Recap engagement metrics",
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["kalash-year-end-recap-engagement"],
              alt: "Kalash Year-End Recap engagement metrics",
            },
            {
              label: "Share card templates",
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["kalash-year-end-recap-share-cards"],
              alt: "Kalash Year-End Recap share card templates",
            },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyWide>
        <CaseStudyBento
          cells={[
            {
              label: "Year-End Recap closing showcase",
              aspect: "natural",
              span: "full",
              src: CASE_STUDY_CDN_MEDIA["kalash-year-end-recap-closing"],
              alt: "Kalash Year-End Recap closing showcase",
            },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyWide>
        <CaseStudyBento
          cells={[
            {
              label: "Year-End Recap impact summary",
              aspect: "natural",
              span: "full",
              src: CASE_STUDY_CDN_MEDIA["kalash-year-end-recap-impact"],
              alt: "Kalash Year-End Recap impact summary",
            },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudySubheading>Outcome</CaseStudySubheading>
        <CaseStudyParagraph>
          The Year-End Recap turned a year&apos;s worth of financial activity into a
          personalised narrative that users could explore, celebrate, and share. By
          combining storytelling with data visualisation, Kalash strengthened
          engagement while helping users build a deeper connection with their financial
          progress.
        </CaseStudyParagraph>
      </CaseStudyProse>
    </div>
  );
}
