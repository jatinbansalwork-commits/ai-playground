"use client";

import { CaseStudyComparison } from "@/components/case-studies/case-study-comparison";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import {
  CaseStudyFeatureGrid,
  CaseStudyFeatureImageIcon,
} from "@/components/case-studies/case-study-feature-grid";
import {
  CaseStudyFindings,
  CaseStudyTags,
} from "@/components/case-studies/case-study-findings";
import { CaseStudyImpactStats } from "@/components/case-studies/case-study-impact-stats";
import { CaseStudyMedia } from "@/components/case-studies/case-study-media";
import {
  CaseStudyDivider,
  CaseStudyH2,
  CaseStudyH3,
  CaseStudyLabel,
  CaseStudyList,
  CaseStudyParagraph,
  CaseStudyQuote,
  CaseStudyProse,
  CaseStudySection,
  CaseStudySubsection,
  CaseStudyTightStack,
  CaseStudyWide,
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
              aspect="natural"
              src={CASE_STUDY_CDN_MEDIA["piggy-support-tickets-hero"]}
              alt="Piggy reduced mutual fund support tickets overview"
            />
            <CaseStudyLabel>PROJECT OVERVIEW</CaseStudyLabel>
            <CaseStudyH2 toc={false}>Outline</CaseStudyH2>
            <CaseStudyParagraph>
              This project showcases how we identified critical gaps in both the
              pre-purchase and post-purchase journey of mutual fund investments. By
              addressing user confusion and anxiety around unit allotment through clear
              communication, improved UI states, and contextual education, we were able
              to streamline the experience and drive meaningful impact across key
              business metrics.
            </CaseStudyParagraph>
            <CaseStudyLabel>Key Impacts</CaseStudyLabel>
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
            <CaseStudyH2 toc={false}>My Role</CaseStudyH2>
            <CaseStudyParagraph>
              Owned end-to-end design: user research, UX strategy, prototyping, user
              testing, and final experience delivery.
            </CaseStudyParagraph>
            <CaseStudyH2 toc={false}>Collaboration with</CaseStudyH2>
            <CaseStudyTightStack>
              <CaseStudyParagraph tight>
                Product Manager : Aman Bansal
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
        <CaseStudySection variant="major">
          <CaseStudyH2>Journey to problem statement</CaseStudyH2>
          <CaseStudyParagraph>
            What started as a routine metrics meeting led us to closely examine the
            customer support tickets across the investments domain.
          </CaseStudyParagraph>
        </CaseStudySection>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          aspect="square"
          borderless
          src={CASE_STUDY_CDN_MEDIA["piggy-support-tickets-breakdown"]}
          alt="Piggy support ticket breakdown"
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudySection variant="major">
          <CaseStudyH2>Digging Deeper: Problem Identification Methods</CaseStudyH2>
          <CaseStudyFeatureGrid
            items={[
              {
                icon: (
                  <CaseStudyFeatureImageIcon
                    src={CASE_STUDY_CDN_MEDIA["piggy-support-tickets-icon-1"]}
                    alt=""
                  />
                ),
                title: "Quantitative Data",
                description:
                  "Analyzed support ticket data to identify patterns, trends, and peak time periods when investment-related issues were most frequently reported.",
              },
              {
                icon: (
                  <CaseStudyFeatureImageIcon
                    src={CASE_STUDY_CDN_MEDIA["piggy-support-tickets-icon-2"]}
                    alt=""
                  />
                ),
                title: "User Calls",
                description:
                  "Conducted direct customer interviews and shadowed customer support executives to understand user concerns, behaviors, and pain points firsthand.",
              },
            ]}
          />
          <CaseStudyFeatureGrid
            items={[
              {
                icon: (
                  <CaseStudyFeatureImageIcon
                    src={CASE_STUDY_CDN_MEDIA["piggy-support-tickets-icon-3"]}
                    alt=""
                  />
                ),
                title: "Customer Support Chat & Call Analysis",
                description:
                  "Reviewed conversations from chatbot interactions and customer support channels to uncover recurring questions, confusion points, and unresolved issues.",
              },
              {
                icon: (
                  <CaseStudyFeatureImageIcon
                    src={CASE_STUDY_CDN_MEDIA["piggy-support-tickets-icon-4"]}
                    alt=""
                  />
                ),
                title: "App Store Reviews & CSAT Analysis",
                description:
                  "Examined app reviews and low-CSAT feedback related to investment products to identify friction areas and understand customer sentiment at scale.",
              },
            ]}
          />
        </CaseStudySection>

        <CaseStudyDivider />

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
            src={CASE_STUDY_CDN_MEDIA["piggy-support-tickets-findings"]}
            alt="Piggy support ticket findings"
            label="Research synthesis map"
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
          src={CASE_STUDY_CDN_MEDIA["piggy-support-tickets-current-flow"]}
          alt="Piggy current flow"
          label="Existing end-to-end purchase flow"
        />

        <CaseStudySection variant="major" className="!space-y-10">
          <CaseStudyH2>Time for Testing</CaseStudyH2>

          <CaseStudySubsection>
            <CaseStudyH3>Usability Testing &amp; Validation</CaseStudyH3>
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
          </CaseStudySubsection>

          <CaseStudyDivider />

          <CaseStudySubsection>
            <CaseStudyH3>Key Validation Outcomes</CaseStudyH3>
            <CaseStudyList
              items={[
                "Users clearly understood that their investment transaction was successful.",
                "Users did not express confusion or anxiety after completing the purchase.",
                "Users were able to recall or infer the expected unit allotment timeline.",
                "The redesigned flow successfully set expectations before uncertainty could occur.",
              ]}
            />
          </CaseStudySubsection>

          <CaseStudyDivider />

          <CaseStudySubsection className="space-y-6">
            <CaseStudyH3>What Users Told Us</CaseStudyH3>
            <CaseStudyTightStack>
              <CaseStudyQuote>
                When asked: &ldquo;What just happened?&rdquo;
              </CaseStudyQuote>
              <CaseStudyParagraph tight>
                Most participants confidently responded that their investment had been
                completed successfully.
              </CaseStudyParagraph>
            </CaseStudyTightStack>
            <CaseStudyTightStack>
              <CaseStudyQuote>
                When asked: &ldquo;When do you expect to receive your units?&rdquo;
              </CaseStudyQuote>
              <CaseStudyParagraph tight>
                Participants either recalled the estimated allotment timeline shown in the
                experience or accurately inferred it from the post-purchase communication.
              </CaseStudyParagraph>
            </CaseStudyTightStack>
            <CaseStudyTags
              tags={[
                "Clearer communication",
                "Better post-purchase closure",
                "Reduced user anxiety",
                "Increased confidence and trust",
                "Expectations successfully set upfront",
              ]}
            />
          </CaseStudySubsection>
        </CaseStudySection>

        <CaseStudyH2>A/B Testing &amp; Rollout Strategy</CaseStudyH2>
        <CaseStudyParagraph>
          To minimize risk and validate impact, the redesigned experience was launched
          through an A/B test before a full-scale rollout. The experiment compared the
          redesigned journey against the existing experience and focused on both user
          experience and business outcomes.
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

        <CaseStudyDivider />

        <CaseStudySection variant="major">
          <CaseStudyH2>The Solution</CaseStudyH2>
          <CaseStudyParagraph>
            A lot of effort for a seemingly small problem—but one that significantly
            improved user confidence, reduced uncertainty, and delivered measurable
            business impact.
          </CaseStudyParagraph>
          <CaseStudyH3>Pre-Purchase</CaseStudyH3>
          <CaseStudyParagraph>
            Since a majority of our users were new to mutual funds, we proactively
            communicated unit allotment timelines throughout the purchase journey. By setting
            expectations before payment, we aimed to reduce post-purchase anxiety and help
            users understand what would happen after they invested.
          </CaseStudyParagraph>
        </CaseStudySection>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          aspect="natural"
          borderless
          src={CASE_STUDY_CDN_MEDIA["piggy-support-tickets-solution-1"]}
          alt="Piggy solution — 1"
          label="Pre-purchase timeline communication"
        />
      </CaseStudyWide>
      <CaseStudyWide>
        <CaseStudyMedia
          aspect="natural"
          borderless
          src={CASE_STUDY_CDN_MEDIA["piggy-support-tickets-solution-2"]}
          alt="Piggy solution — 2"
          label="Updated purchase journey"
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudyDivider />

        <CaseStudyWide>
          <CaseStudyMedia
            aspect="natural"
            borderless
            src={CASE_STUDY_CDN_MEDIA["piggy-support-tickets-solution-3"]}
            alt="Piggy solution — 3"
          />
        </CaseStudyWide>

        <CaseStudyParagraph>
          During our competitive analysis, we observed that most investment platforms only
          communicated market cut-off timings until 2:00 PM. Since Piggy allowed investments
          for an additional hour, we saw an opportunity to transform this operational
          advantage into a memorable product experience. To make the benefit more visible and
          easier for users to understand, we introduced &ldquo;Piggy Prime Hour&rdquo;—a
          branded concept that highlighted the extended investment window and reinforced
          Piggy&apos;s value proposition at a key decision-making moment.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          aspect="natural"
          borderless
          src={CASE_STUDY_CDN_MEDIA["piggy-support-tickets-solution-4"]}
          alt="Piggy solution — 4"
          label="Piggy Prime Hour campaign screen"
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudySection variant="major">
          <CaseStudyH2>Post-Purchase</CaseStudyH2>
          <CaseStudyParagraph>
            Once users completed their investment, the experience shifted from enabling action
            to providing reassurance. We redesigned the post-purchase state to reduce ambiguity,
            establish trust, and clearly communicate what was happening behind the scenes,
            helping users feel confident while waiting for unit allotment.
          </CaseStudyParagraph>
        </CaseStudySection>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyComparison
          before={
            <CaseStudyMedia
              aspect="natural"
              borderless
              src={CASE_STUDY_CDN_MEDIA["piggy-support-tickets-post-purchase-2"]}
              alt="Piggy post-purchase — old"
            />
          }
          after={
            <CaseStudyMedia
              aspect="natural"
              borderless
              src={CASE_STUDY_CDN_MEDIA["piggy-support-tickets-post-purchase-1"]}
              alt="Piggy post-purchase — new"
            />
          }
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudyList
          items={[
            "Visual Reassurance: Leveraged color psychology and stronger success states to provide immediate transactional closure.",
            "Reduced Ambiguity: Eliminated misleading status terminology that caused users to interpret normal processing delays as transaction issues.",
            "Proactive Education: Embedded contextual education directly into the experience, transforming a support-ticket-generating question into a self-service learning moment.",
          ]}
        />

        <CaseStudySection variant="major">
          <CaseStudyLabel>UX Principle Applied</CaseStudyLabel>
          <CaseStudyH3>Nielsen&apos;s Heuristic: Visibility of System Status</CaseStudyH3>
          <CaseStudyQuote>
            &ldquo;The system should always keep users informed about what is going on.&rdquo;
          </CaseStudyQuote>
          <CaseStudyParagraph>
            This principle guided our approach to the post-purchase experience, where users
            had already completed a high-stakes action—their money had been deducted—but
            lacked clear confirmation of what happened next. The absence of immediate
            feedback and visible outcomes created uncertainty, leading many users to
            question whether their investment had been processed successfully.
          </CaseStudyParagraph>
          <CaseStudyParagraph>
            To address this, we focused on clear feedback, stronger transactional closure,
            and proactive expectation management. By introducing success-oriented visual
            cues, shifting the interface from yellow to green, and reinforcing confirmation
            messaging, we ensured users could immediately understand that their investment
            was successful and no further action was required from them.
          </CaseStudyParagraph>
        </CaseStudySection>

        <CaseStudyH2>Overall Impact</CaseStudyH2>
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
      </CaseStudyProse>
    </div>
  );
}
