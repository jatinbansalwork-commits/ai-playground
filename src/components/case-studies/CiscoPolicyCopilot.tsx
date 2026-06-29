"use client";

import {
  CaseStudyActivationModels,
  ActivationModelQuote,
  type ActivationModel,
} from "@/components/case-studies/case-study-activation-models";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import {
  CaseStudyImpactCards,
} from "@/components/case-studies/case-study-impact-cards";
import { CaseStudyMedia } from "@/components/case-studies/case-study-media";
import {
  CaseStudyChips,
  CaseStudyDivider,
  CaseStudyH1,
  CaseStudyH2,
  CaseStudyLabel,
  CaseStudyList,
  CaseStudyParagraph,
  CaseStudyProse,
  CaseStudyQuestionStack,
  CaseStudyQuote,
  CaseStudyTable,
  CaseStudyWide,
} from "@/components/case-studies/case-study-prose";
import { CASE_STUDY_CDN_MEDIA } from "@/lib/asset-cdn";
import { getCaseStudyContent } from "@/lib/project-content";
import { useCaseStudyRevealCountdownForSlug } from "@/hooks/use-case-study-reveal-countdown";

const SLUG = "cisco-policy-copilot";

const CORE_RESPONSIBILITY_MODELS: ActivationModel[] = [
  {
    number: 1,
    name: "Understand and Clarify",
    subtitle: "",
    description:
      "Before generating a policy, the Copilot reflects its interpretation back to the administrator.",
    example: (
      <>
        <ActivationModelQuote>
          &ldquo;Allow contractors to access development servers during working hours.&rdquo;
        </ActivationModelQuote>
        <p>The Copilot may ask:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Which contractor group?</li>
          <li>Which development environment?</li>
          <li>Which time zone defines working hours?</li>
          <li>Should access be HTTPS-only?</li>
          <li>Is logging required?</li>
        </ul>
      </>
    ),
    takeaway: "This prevents the system from making hidden assumptions.",
    imageAlt: "Cisco Policy Copilot — understand and clarify",
  },
  {
    number: 2,
    name: "Recommend and Explain",
    subtitle: "",
    description: "Once the intent is clear, the Copilot proposes next steps.",
    example: (
      <ul className="list-disc space-y-1 pl-5">
        <li>Enable audit logging</li>
        <li>Restrict access to working hours</li>
        <li>Run compliance checks</li>
        <li>Review conflicting rules</li>
        <li>Perform impact analysis</li>
      </ul>
    ),
    takeaway: "Each recommendation includes context and evidence, not just an instruction.",
    imageAlt: "Cisco Policy Copilot — recommend and explain",
  },
];

const VALIDATE_FOR_APPROVAL_MODEL: ActivationModel = {
  number: 3,
  name: "Validate and Prepare for Approval",
  subtitle: "",
  description: "Before deployment, the Copilot evaluates the policy against:",
  example: (
    <ul className="list-disc space-y-1 pl-5">
      <li>Existing firewall rules</li>
      <li>Compliance requirements</li>
      <li>Security standards</li>
      <li>Risk conditions</li>
      <li>Potential blast radius</li>
    </ul>
  ),
  takeaway: "It prepares the decision, but does not deploy automatically.",
  imageAlt: "Cisco Policy Copilot — validate and prepare for approval",
  showExampleLabel: false,
};

export default function CiscoPolicyCopilotContent() {
  const content = getCaseStudyContent(SLUG)!;
  const { isRevealed } = useCaseStudyRevealCountdownForSlug(SLUG);

  return (
    <div className="w-full space-y-16">
      <CaseStudyHero
        title={content.title}
        year={content.year}
        overview={content.overviewText}
        meta={content.meta}
      />

      <div
        className={isRevealed ? "" : "pointer-events-none select-none blur-xl"}
        aria-hidden={!isRevealed}
      >
      <CaseStudyProse>
        <CaseStudyH1>
          Creating firewall policies is powerful, but often requires deep platform knowledge.
        </CaseStudyH1>
        <CaseStudyParagraph>
          A request such as:
        </CaseStudyParagraph>
        <CaseStudyQuote>
          &ldquo;Allow the Engineering team to access GitHub securely over HTTPS.&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph>
          It sounds simple. But an administrator still needs to decide who gets access, what is
          allowed, whether logging is required, how long access should last, whether the rule
          conflicts with existing policies, and whether it meets compliance requirements.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Policy Copilot helps administrators move from plain-language intent to an editable
          policy draft—while making assumptions, risks, and recommended next steps visible before
          deployment.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            alt="Cisco Policy Copilot — fragmented policy workflow"
          />
        </CaseStudyWide>
        <CaseStudyDivider />
      </CaseStudyProse>

      <CaseStudyProse>
        <CaseStudyH2 className="!pt-8">The Challenge</CaseStudyH2>
        <CaseStudyParagraph>
          Policy creation was not difficult because administrators could not fill in fields. It
          was difficult because every request required high-stakes decisions across multiple
          systems.
        </CaseStudyParagraph>
        <CaseStudyParagraph>For example:</CaseStudyParagraph>
        <CaseStudyQuote>
          &ldquo;Give contractors access to the internal hiring dashboard for the next two
          weeks.&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph>
          Before creating the rule, an administrator still needs to determine:
        </CaseStudyParagraph>
        <CaseStudyList
          items={[
            "Which contractor group needs access?",
            "Production or staging environment?",
            "VPN-only or open network access?",
            "Should access expire automatically?",
            "Is audit logging required?",
            "Does a similar rule already exist?",
            "Could the rule expose other HR systems?",
          ]}
        />
        <CaseStudyParagraph>
          The business request is simple. The policy decision is not.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            src={CASE_STUDY_CDN_MEDIA["cisco-policy-copilot-why-matters"]}
            alt="Cisco Policy Copilot — policy decision complexity"
          />
        </CaseStudyWide>
        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            alt="Cisco Policy Copilot — understanding policy creation"
          />
        </CaseStudyWide>
        <CaseStudyDivider />

        <CaseStudyH2>A simple real-world example</CaseStudyH2>
        <CaseStudyParagraph>Imagine an HR team requests:</CaseStudyParagraph>
        <CaseStudyQuote>
          &ldquo;Give contractors access to the internal hiring dashboard for the next two
          weeks.&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph>
          That sounds straightforward. But before creating the rule, a security administrator
          still needs to answer:
        </CaseStudyParagraph>
        <CaseStudyQuestionStack
          ariaLabel="Security policy questions"
          items={[
            "Which contractor group should receive access?",
            "Is access needed for the production hiring dashboard or the staging environment?",
            "Can contractors access it from any network, or only through VPN?",
            "Should access automatically expire after two weeks?",
            "Should activity be logged for audit?",
            "Does the request require approval from HR security owners?",
          ]}
        />
        <CaseStudyParagraph>
          The business request is simple. The policy decision is complex.
        </CaseStudyParagraph>

        <CaseStudyDivider />

        <CaseStudyH2 className="!mt-8">The Opportunity</CaseStudyH2>
        <CaseStudyParagraph>
          The opportunity was not simply to generate firewall rules faster. It was to help
          administrators move from business intent to a safer, more confident policy decision.
        </CaseStudyParagraph>
        <CaseStudyParagraph>Policy Copilot would:</CaseStudyParagraph>
        <CaseStudyList
          items={[
            "Understand the request",
            "Clarify missing details",
            "Generate an editable policy draft",
            "Surface risks and compliance checks",
            "Explain recommendations with evidence",
            "Keep administrators in control before deployment",
          ]}
        />
        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            alt="Cisco Policy Copilot — clarity, confidence, and control"
          />
        </CaseStudyWide>
        <CaseStudyDivider />

        <CaseStudyH2>My Role</CaseStudyH2>
        <CaseStudyParagraph>
          I led the end-to-end experience for Policy Copilot. My work included:
        </CaseStudyParagraph>
        <CaseStudyList
          items={[
            "Defining how AI should participate in policy creation",
            "Designing the AI-assisted Create Rule workflow",
            "Establishing the interaction model between administrator and Copilot",
            "Designing trust patterns for recommendations, validation, and approval",
            "Partnering with product, engineering, and AI teams",
            "Exploring how the Copilot could evolve into a broader policy decision-support system",
          ]}
        />
        <CaseStudyParagraph>
          The design challenge was to make policy creation faster without making security
          decisions feel automated or opaque.
        </CaseStudyParagraph>
        <CaseStudyDivider className="!mt-8" />
        <CaseStudyH2 className="!mt-8">From Copilot to Agent</CaseStudyH2>
        <CaseStudyParagraph>
          Early in discovery, we realised policy creation was only one part of the problem.
          Administrators were not struggling only with configuration screens. They were
          struggling with decision-making.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          For every policy change, they needed to answer:
        </CaseStudyParagraph>
        <CaseStudyList
          items={[
            "Is this secure?",
            "Does it violate compliance requirements?",
            "Does it conflict with an existing rule?",
            "Is the scope broader than intended?",
            "What is the blast radius?",
            "What evidence supports this recommendation?",
          ]}
        />
        <CaseStudyParagraph>
          The product therefore evolved from a rule-generation assistant into a system that
          helps administrators reason about policy decisions.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            alt="Cisco Policy Copilot — policy lifecycle participation"
          />
        </CaseStudyWide>

        <CaseStudyDivider className="!mt-8" />

        <CaseStudyH2 className="!mt-16">Designing the Agent Framework</CaseStudyH2>
        <CaseStudyParagraph>
          We defined Policy Copilot as a security teammate that could support the full policy
          lifecycle—not just generate a draft.
        </CaseStudyParagraph>
        <CaseStudyParagraph>The agent could help teams:</CaseStudyParagraph>
        <CaseStudyList
          items={[
            "Understand business intent",
            "Gather policy and identity context",
            "Propose changes",
            "Validate risk",
            "Prepare evidence for approval",
            "Support deployment",
            "Monitor outcomes over time",
          ]}
        />
        <CaseStudyParagraph>
          Administrators remained responsible for final approval.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            alt="Cisco Policy Copilot — from configuration to defensible decisions"
          />
        </CaseStudyWide>
        <CaseStudyDivider className="!mt-8" />

        <CaseStudyH2>Designing the Core Experience</CaseStudyH2>
        <CaseStudyParagraph>
          Instead of designing six separate AI features, I grouped the experience into three
          core responsibilities.
        </CaseStudyParagraph>

        <CaseStudyActivationModels className="!pb-6" items={CORE_RESPONSIBILITY_MODELS} />

        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            alt="Cisco Policy Copilot — core experience responsibilities"
          />
        </CaseStudyWide>

        <CaseStudyActivationModels
          className="!pb-6"
          columns={1}
          items={[VALIDATE_FOR_APPROVAL_MODEL]}
        />

        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            alt="Cisco Policy Copilot — validate and prepare for approval"
          />
        </CaseStudyWide>

        <CaseStudyDivider className="!mt-8" />

        <CaseStudyH2 className="!mt-8">Triggering the Copilot</CaseStudyH2>
        <CaseStudyParagraph>
          A key design question was: when should AI appear?
        </CaseStudyParagraph>
        <CaseStudyParagraph>We explored three activation models.</CaseStudyParagraph>
        <CaseStudyParagraph>
          If it appeared too often, it could interrupt experienced administrators. If it
          appeared too late, it could miss important risk or compliance issues.
        </CaseStudyParagraph>
        <CaseStudyTable
          caption="Copilot activation models"
          headers={["Model", "When It Appears", "Example"]}
          rows={[
            [
              "Explicit",
              "Administrator asks for help",
              "“Create a policy allowing Engineering access to GitHub.”",
            ],
            [
              "Ambient",
              "Copilot quietly notices a missing requirement",
              "“This external access rule may require audit logging.”",
            ],
            [
              "Proactive",
              "Copilot detects meaningful risk or conflict",
              "“This rule may conflict with HR access-control policy.”",
            ],
          ]}
        />

        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            alt="Cisco Policy Copilot — triggering the Copilot"
          />
        </CaseStudyWide>

        <CaseStudyDivider className="!mt-8" />

        <CaseStudyH2>Designing for Trust</CaseStudyH2>
        <CaseStudyParagraph>
          In cybersecurity, speed alone is not valuable.
        </CaseStudyParagraph>
        <CaseStudyParagraph>Administrators need to understand:</CaseStudyParagraph>
        <CaseStudyChips
          ariaLabel="What administrators need to understand"
          items={[
            "What the AI knows",
            "What it recommends",
            "Why it recommends it",
            "What evidence supports it",
            "What risks remain",
            "What will happen if they approve it",
          ]}
        />
        <CaseStudyParagraph>One principle shaped the experience:</CaseStudyParagraph>
        <CaseStudyQuote>
          &ldquo;Don&rsquo;t just tell me it&rsquo;s safe. Show me why.&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph>
          Every recommendation was designed to include evidence, context, and a clear next action.
        </CaseStudyParagraph>
        <CaseStudyParagraph>For example:</CaseStudyParagraph>
        <div className="w-full max-w-5xl space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:space-y-6 md:p-6">
          <div className="space-y-2">
            <CaseStudyLabel>Recommendation</CaseStudyLabel>
            <p className="text-base leading-relaxed text-neutral-200 md:text-lg">
              Enable audit logging
            </p>
          </div>
          <div className="space-y-2">
            <CaseStudyLabel>Why</CaseStudyLabel>
            <p className="text-base leading-relaxed text-neutral-300 md:text-lg">
              This policy grants access to an external SaaS application.
            </p>
          </div>
          <div className="space-y-2">
            <CaseStudyLabel>Evidence</CaseStudyLabel>
            <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-neutral-300 md:text-lg">
              <li>SEC-014 security standard</li>
              <li>Existing policy comparison</li>
              <li>Audit requirement for external access</li>
            </ul>
          </div>
          <div className="space-y-2">
            <CaseStudyLabel>Remaining risk</CaseStudyLabel>
            <p className="text-base leading-relaxed text-neutral-300 md:text-lg">
              Time range is not yet defined.
            </p>
          </div>
        </div>

        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            alt="Cisco Policy Copilot — designing for trust"
          />
        </CaseStudyWide>

        <CaseStudyDivider className="!mt-8" />

        <CaseStudyH2>Learning Loop</CaseStudyH2>
        <CaseStudyParagraph>
          To improve recommendations over time, I designed a lightweight feedback pattern.
        </CaseStudyParagraph>
        <CaseStudyParagraph>After a recommendation, the Copilot could ask:</CaseStudyParagraph>
        <CaseStudyQuote>
          &ldquo;How accurate were the AI Suggestions?&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph>
          Administrators could provide a quick 1–5 rating without leaving their workflow.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This created a low-friction learning loop while respecting the speed of security
          operations.
        </CaseStudyParagraph>

        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            alt="Cisco Policy Copilot — learning loop"
          />
        </CaseStudyWide>

        <CaseStudyDivider className="!mt-8" />

        <CaseStudyH2 className="!mt-8">Designed for Measurable Impact</CaseStudyH2>
        <CaseStudyParagraph>
          Policy Copilot was designed to improve both execution speed and decision confidence.
        </CaseStudyParagraph>

        <CaseStudyImpactCards
          items={[
            {
              title: "Reduced Configuration Effort",
              description:
                "Administrators can begin with natural language instead of manually configuring every policy attribute.",
            },
            {
              title: "Faster Policy Decisions",
              description:
                "The system helps move from a business request to a reviewable draft without navigating disconnected workflows.",
            },
            {
              title: "Improved Decision Confidence",
              description:
                "Recommendations include evidence, compliance checks, risk analysis, and clear next actions.",
            },
            {
              title: "Lower Cognitive Load",
              description:
                "Administrators receive contextual guidance instead of remembering rules, dependencies, and security requirements across systems.",
            },
          ]}
        />

        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            alt="Cisco Policy Copilot — measurable impact"
          />
        </CaseStudyWide>

        <CaseStudyDivider className="!mt-8" />

        <CaseStudyH2 className="!mt-8">Reflection</CaseStudyH2>
        <CaseStudyParagraph>
          Designing Policy Copilot reinforced an important belief about AI products:
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Designing for AI is not just about connecting APIs. It is about trust, context,
          and control.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          In high-stakes security workflows, AI earns adoption by making its reasoning visible
          and keeping humans responsible for the final decision.
        </CaseStudyParagraph>
        <CaseStudyParagraph className="!pb-8">
          The role of design is to make that relationship clear.
        </CaseStudyParagraph>
      </CaseStudyProse>
      </div>
    </div>
  );
}
