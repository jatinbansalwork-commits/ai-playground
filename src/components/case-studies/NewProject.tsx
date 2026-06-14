"use client";

import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import {
  CaseStudyFeatureGrid,
  CompetitiveAnalysisIcon,
  JourneyMappingIcon,
  TicketAnalysisIcon,
  UserResearchIcon,
} from "@/components/case-studies/case-study-feature-grid";
import {
  CaseStudyFindings,
  CaseStudyTags,
} from "@/components/case-studies/case-study-findings";
import { CaseStudyImpactStats } from "@/components/case-studies/case-study-impact-stats";
import { CaseStudyMedia } from "@/components/case-studies/case-study-media";
import {
  CaseStudyH2,
  CaseStudyList,
  CaseStudyParagraph,
  CaseStudyQuote,
  CaseStudyProse,
  CaseStudyTightStack,
  CaseStudyWide,
  CaseStudyYear,
} from "@/components/case-studies/case-study-prose";
import { CASE_STUDY_CDN_MEDIA } from "@/lib/asset-cdn";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "piggy-reduced-mutual-fund-support-tickets";

export default function NewProjectContent() {
  const content = getCaseStudyContent(SLUG)!;

  return (
    <div className="w-full space-y-16">
      <CaseStudyHero
        title={content.title}
        year={content.year}
        overview={content.overviewText}
        meta={content.meta}
        metaBottom={
          <div className="space-y-6">
            <CaseStudyMedia
              aspect="video"
              alt="Piggy reduced mutual fund support tickets overview"
            />
            <CaseStudyYear>PROJECT OVERVIEW</CaseStudyYear>
            <CaseStudyH2>Outline</CaseStudyH2>
            <CaseStudyParagraph>
              This project showcases how we identified critical gaps in both the
              pre-purchase and post-purchase journey of mutual fund investments. By
              addressing user confusion and anxiety around unit allotment through clear
              communication, improved UI states, and contextual education, we were able
              to streamline the experience and drive meaningful impact across key
              business metrics.
            </CaseStudyParagraph>
            <CaseStudyH2>Key Impacts</CaseStudyH2>
            <CaseStudyImpactStats
              items={[
                {
                  value: "-19.2%",
                  label: "Reduction in Overall Support tickets",
                },
                {
                  value: "-23%",
                  label: "Decrease in unit allotment tickets",
                },
              ]}
            />
            <CaseStudyH2>My Role</CaseStudyH2>
            <CaseStudyParagraph>
              Owned end-to-end design: user research, UX strategy, prototyping, user
              testing, and final experience delivery.
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
          </div>
        }
      />

      <CaseStudyProse>
        <CaseStudyH2>Journey to problem statement</CaseStudyH2>
        <CaseStudyParagraph>
          What started as a routine metrics meeting led us to closely examine the
          customer support tickets across the investments domain.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide className="!mt-4">
        <CaseStudyMedia
          aspect="square"
          borderless
          src={CASE_STUDY_CDN_MEDIA["piggy-support-tickets-breakdown"]}
          alt="Piggy support ticket breakdown"
        />
      </CaseStudyWide>

      <CaseStudyProse className="!mt-8">
        <CaseStudyH2>Digging Deeper: Problem Identification Methods</CaseStudyH2>
        <CaseStudyFeatureGrid
          className="!mt-10"
          items={[
            {
              icon: <TicketAnalysisIcon />,
              title: "Quantitative Data",
              description:
                "Analyzed support ticket data to identify patterns, trends, and peak time periods when investment-related issues were most frequently reported.",
            },
            {
              icon: <UserResearchIcon />,
              title: "User Calls",
              description:
                "Conducted direct customer interviews and shadowed customer support executives to understand user concerns, behaviors, and pain points firsthand.",
            },
          ]}
        />
        <CaseStudyFeatureGrid
          className="!mt-8"
          items={[
            {
              icon: <JourneyMappingIcon />,
              title: "Customer Support Chat & Call Analysis",
              description:
                "Reviewed conversations from chatbot interactions and customer support channels to uncover recurring questions, confusion points, and unresolved issues.",
            },
            {
              icon: <CompetitiveAnalysisIcon />,
              title: "App Store Reviews & CSAT Analysis",
              description:
                "Examined app reviews and low-CSAT feedback related to investment products to identify friction areas and understand customer sentiment at scale.",
            },
          ]}
        />
        <div className="border-t border-neutral-800/40 pt-6" role="separator" />

        <CaseStudyH2>Findings:</CaseStudyH2>
        <CaseStudyFindings
          tags={[
            "Lack of awareness about the mutual fund allotment process",
            "Lack of closure and reassurance after investment",
            "Insufficient clarity around transaction status",
            'The "In Progress" state was interpreted as a problem',
            "Unit allotment timelines and delays were not adequately explained",
          ]}
        >
          <CaseStudyMedia
            aspect="natural"
            borderless
            alt="Piggy support ticket findings"
          />
        </CaseStudyFindings>

        <CaseStudyH2>Product Limitation</CaseStudyH2>
        <CaseStudyParagraph>
          Mutual fund transactions operate within market trading hours (9:00 AM–3:00 PM,
          Monday–Friday). Investments made after market hours, on weekends, or during
          market holidays are processed on the next business day, which can delay unit
          allotment.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Additionally, mutual fund units are typically allotted within 1–2 working days,
          an industry-wide process followed across investment platforms. While the
          transaction is completed instantly from the user&apos;s perspective, the
          underlying allotment process depends on market and fund-house settlement
          timelines.
        </CaseStudyParagraph>

        <CaseStudyH2>Current Flow</CaseStudyH2>
        <CaseStudyMedia
          aspect="natural"
          borderless
          alt="Piggy current flow"
        />

        <CaseStudyH2>Time for Testing</CaseStudyH2>
        <CaseStudyH2>Usability Testing &amp; Validation</CaseStudyH2>
        <CaseStudyParagraph>
          To validate the redesigned experience, we conducted usability testing with users
          who had little to no prior experience investing in mutual funds. The goal was
          to ensure the flow communicated the right expectations without requiring users
          to understand industry-specific concepts such as unit allotment.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The results were encouraging. Even when participants did not fully understand
          how mutual fund allotment worked behind the scenes, they clearly understood
          what was happening, what to expect next, and when they could expect their units
          to be allotted.
        </CaseStudyParagraph>

        <CaseStudyH2>Key Validation Outcomes</CaseStudyH2>
        <CaseStudyList
          items={[
            "Users clearly understood that their investment transaction was successful.",
            "Users did not express confusion or anxiety after completing the purchase.",
            "Users were able to recall or infer the expected unit allotment timeline.",
            "The redesigned flow successfully set expectations before uncertainty could occur.",
          ]}
        />

        <CaseStudyH2>What Users Told Us</CaseStudyH2>
        <CaseStudyQuote>
          When asked: &ldquo;What just happened?&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph>
          Most participants confidently responded that their investment had been
          completed successfully.
        </CaseStudyParagraph>
        <CaseStudyQuote>
          When asked: &ldquo;When do you expect to receive your units?&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph>
          Participants either recalled the estimated allotment timeline shown in the
          experience or accurately inferred it from the post-purchase communication.
        </CaseStudyParagraph>
        <CaseStudyTags
          tags={[
            "Clearer communication",
            "Better post-purchase closure",
            "Reduced user anxiety",
            "Increased confidence and trust",
            "Expectations successfully set upfront",
          ]}
        />

        <CaseStudyH2>A/B Testing &amp; Rollout Strategy</CaseStudyH2>
        <CaseStudyParagraph>
          To minimize risk and validate impact, the redesigned experience was launched
          through an A/B test before a full-scale rollout.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The experiment compared the redesigned journey against the existing experience
          and focused on both user experience and business outcomes.
        </CaseStudyParagraph>

        <CaseStudyH2>Results</CaseStudyH2>
        <CaseStudyList
          items={[
            "The new experience performed on par with the existing flow across key conversion metrics.",
            "No negative impact was observed on the investment funnel.",
            "Early indicators showed a reduction in support tickets related to unit allotment and transaction status confusion.",
            "Users demonstrated better understanding of transaction timelines and next steps.",
          ]}
        />
        <CaseStudyParagraph>
          These results gave us confidence that the redesign improved clarity and reduced
          customer support dependency without compromising business performance, paving
          the way for a full rollout.
        </CaseStudyParagraph>

        <div className="border-t border-neutral-800/40 pt-6" role="separator" />

        <CaseStudyH2>The Solution</CaseStudyH2>
        <CaseStudyParagraph>
          A lot of effort for a seemingly small problem—but one that significantly
          improved user confidence, reduced uncertainty, and delivered measurable
          business impact.
        </CaseStudyParagraph>
      </CaseStudyProse>
    </div>
  );
}
