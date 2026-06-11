"use client";

import { CaseStudyBento } from "@/components/case-studies/case-study-bento";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { CaseStudyMedia } from "@/components/case-studies/case-study-media";
import {
  CaseStudyH2,
  CaseStudyParagraph,
  CaseStudyProse,
  CaseStudyWide,
} from "@/components/case-studies/case-study-prose";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "piggy-personalised-mutual-fund-recommendation";

export default function ProjectTwoContent() {
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
          alt="Piggy mutual fund recommendation overview"
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudyH2>Our Goal</CaseStudyH2>
        <CaseStudyParagraph>
          Redesign Piggy&apos;s mutual fund recommendation experience to help investors
          discover, evaluate, and select funds with greater confidence. The objective
          was to simplify complex investment decisions while strengthening one of the
          platform&apos;s most widely used wealth products.
        </CaseStudyParagraph>

        <CaseStudyH2>My Role</CaseStudyH2>
        <CaseStudyParagraph>
          Led the end-to-end product design process—from research and concept development
          to prototyping and visual design. Worked closely with the founders and product
          leadership to define the strategy, validate solutions, and bring the experience
          to market.
        </CaseStudyParagraph>

        <div className="border-t border-neutral-800/40 pt-6" role="separator" />

        <CaseStudyH2>Clarity at First Glance</CaseStudyH2>
        <CaseStudyParagraph>
          Investors were often overwhelmed by the number of fund options available within
          each category. Instead of requiring users to compare funds individually, we
          introduced category-based rankings that surfaced the strongest performers
          upfront. This reduced research effort and helped investors identify promising
          options within seconds.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          aspect="natural"
          alt="Piggy category-based fund rankings"
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudyParagraph>
          A tap on the ranking badge reveals the fund&apos;s historical performance and
          position over time, giving investors the context needed to evaluate long-term
          consistency—not just current performance.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyBento
          cells={[
            { label: "Fund rank badge", aspect: "natural", span: "half" },
            { label: "Performance history", aspect: "natural", span: "half" },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudyH2>Breaking Down Each Fund</CaseStudyH2>
        <CaseStudyParagraph>
          A strong rank alone isn&apos;t enough to build conviction. To help investors
          make informed decisions, we paired each fund&apos;s ranking with indicators of
          performance consistency and downside risk. This enabled users to evaluate not
          only potential returns, but also the reliability of those returns over time,
          creating greater confidence before investing.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          aspect="natural"
          alt="Piggy fund performance indicators"
        />
      </CaseStudyWide>

      <CaseStudyWide>
        <CaseStudyBento
          cells={[
            { label: "Performance consistency", aspect: "natural", span: "half" },
            { label: "Volatility indicators", aspect: "natural", span: "half" },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudyH2>Recommendations That Feel Personal</CaseStudyH2>
        <CaseStudyParagraph>
          Rather than presenting a generic list of funds, we tailored recommendations to
          each investor&apos;s risk profile and investment goals. Every recommendation was
          accompanied by clear reasoning and a structured investment approach, helping
          users understand not just what to invest in, but why.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyBento
          cells={[
            { label: "Recommendation overview", aspect: "natural", span: "half" },
            { label: "Fund fit rationale", aspect: "natural", span: "half" },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudyParagraph>
          Sector-specific opportunities were further contextualized with prevailing
          market conditions, ensuring recommendations remained timely, relevant, and
          actionable. The result was a more personalized experience that reduced
          uncertainty and helped investors make allocation decisions with confidence.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyBento
          cells={[
            { label: "Investor questions", aspect: "natural", span: "half" },
            { label: "Trade-off context", aspect: "natural", span: "half" },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudyH2>My Learnings</CaseStudyH2>
        <CaseStudyParagraph>
          This project taught me that designing financial products is fundamentally about
          designing trust. Beyond usability and information architecture, success
          depended on helping investors understand complex decisions and feel confident
          acting on them.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Working closely with the founders deepened my understanding of investor
          psychology, risk perception, and decision-making under uncertainty. It
          reinforced a lesson I continue to apply today: the best financial experiences
          don&apos;t just provide information—they create clarity.
        </CaseStudyParagraph>

        <div className="border-t border-neutral-800/40 pt-6" role="separator" />

        <CaseStudyH2>Thanks for Reading</CaseStudyH2>
        <CaseStudyParagraph>
          What began as a mutual fund discovery project evolved into a broader exercise in
          simplifying complex financial decisions. By combining transparency,
          personalization, and context, we helped investors move from uncertainty to
          confidence—one decision at a time.
        </CaseStudyParagraph>
      </CaseStudyProse>
    </div>
  );
}
