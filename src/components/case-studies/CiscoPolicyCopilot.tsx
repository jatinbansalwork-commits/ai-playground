"use client";

import { CaseStudyActivationModels, ActivationModelQuote } from "@/components/case-studies/case-study-activation-models";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { CaseStudyRevealCountdown } from "@/components/case-studies/case-study-reveal-countdown";
import { CaseStudyMedia } from "@/components/case-studies/case-study-media";
import {
  CaseStudyDivider,
  CaseStudyH1,
  CaseStudyH2,
  CaseStudyH3,
  CaseStudyList,
  CaseStudyParagraph,
  CaseStudyProse,
  CaseStudyQuestionStack,
  CaseStudyQuote,
  CaseStudyWide,
} from "@/components/case-studies/case-study-prose";
import { CASE_STUDY_CDN_MEDIA } from "@/lib/asset-cdn";
import { getCaseStudyContent } from "@/lib/project-content";
import { useCaseStudyRevealCountdownForSlug } from "@/hooks/use-case-study-reveal-countdown";

const SLUG = "cisco-policy-copilot";

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
        metaBottom={<CaseStudyRevealCountdown slug={SLUG} />}
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
        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            src={CASE_STUDY_CDN_MEDIA["cisco-policy-copilot-workflow-transformation"]}
            alt="Cisco Policy Copilot — workflow transformation"
            label="Policy Copilot turns a plain-language request into an editable policy draft, while making assumptions, risks, and recommended checks visible before deployment."
          />
        </CaseStudyWide>
        <CaseStudyDivider />
      </CaseStudyProse>

      <CaseStudyProse>
        <CaseStudyH2>The Challenge</CaseStudyH2>
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
        <CaseStudyQuestionStack
          ariaLabel="Policy determination questions"
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
            alt="Cisco Policy Copilot — fragmented policy workflow"
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
            label="The goal was not full automation. It was to reduce configuration effort while increasing clarity, confidence, and control."
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
        <CaseStudyH2 className="!mt-8">The Vision</CaseStudyH2>
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
          During discovery, we realised policy creation was only one part of a much larger
          problem. Administrators were not primarily struggling with configuration screens.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          They were struggling with decision-making. Every policy change required answering
          critical questions:
        </CaseStudyParagraph>
        <CaseStudyQuestionStack
          ariaLabel="Critical policy questions"
          items={[
            "Is this policy secure?",
            "Does it violate compliance requirements?",
            "Will it conflict with existing rules?",
            "Is the access scope broader than intended?",
            "What systems or users will this impact?",
            "What evidence supports this recommendation?",
            "What risks remain after deployment?",
          ]}
        />
        <CaseStudyParagraph>
          For example, an administrator may create a rule allowing Engineering access to
          GitHub. The rule itself is simple. But the real questions are:
        </CaseStudyParagraph>
        <CaseStudyQuestionStack
          ariaLabel="GitHub access policy questions"
          items={[
            "Should access be limited to company-managed devices?",
            "Is GitHub access already covered by another rule?",
            "Should access be restricted to working hours?",
            "Does the organisation require logging for external SaaS access?",
            "Will this rule affect all engineers or only a specific project team?",
            "What happens if the GitHub IP range changes?",
          ]}
        />
        <CaseStudyParagraph>
          The real opportunity was not generating policies. It was helping administrators
          reason about policy decisions.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            alt="Cisco Policy Copilot — from configuration to defensible decisions"
          />
        </CaseStudyWide>
        <CaseStudyDivider className="!mt-8" />

        <CaseStudyH2>Designing the Agent Framework</CaseStudyH2>
        <CaseStudyParagraph>
          As the vision evolved, Policy Copilot became part of a broader agent framework. We
          defined a model where the system could assist throughout the full policy lifecycle,
          while ensuring administrators remained responsible for final approval.
        </CaseStudyParagraph>
        <CaseStudyH3>What is it helping with?</CaseStudyH3>
        <CaseStudyQuote>
          Helping teams safely reason about, validate, deploy, and manage policy decisions
          across the policy lifecycle.
        </CaseStudyQuote>
        <CaseStudyH3>Why should it do this work?</CaseStudyH3>
        <CaseStudyParagraph>
          Policy changes are high-risk and fragmented across systems. Administrators should not
          need to manually assemble rules, context, risk signals, and compliance evidence before
          making every decision.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            alt="Cisco Policy Copilot — agent framework"
          />
        </CaseStudyWide>

        <CaseStudyDivider className="!mt-8" />

        <CaseStudyH2>Triggering the Copilot</CaseStudyH2>
        <CaseStudyParagraph>
          One of the most important design decisions was determining when AI should appear. If
          Policy Copilot appeared too often, it could interrupt expert administrators. If it
          appeared too late, it could miss important risk or compliance issues.
        </CaseStudyParagraph>
        <CaseStudyParagraph>We explored three activation models.</CaseStudyParagraph>

        <CaseStudyActivationModels
          className="!pb-6"
          items={[
            {
              number: 1,
              name: "Explicit",
              subtitle: "The administrator asks for help",
              description:
                "The administrator intentionally requests assistance.",
              example: (
                <ActivationModelQuote>
                  &ldquo;Create a policy allowing Engineering access to GitHub over
                  HTTPS.&rdquo;
                </ActivationModelQuote>
              ),
              takeaway: "This provides maximum control and predictability.",
              imageAlt: "Cisco Policy Copilot — explicit activation model",
            },
            {
              number: 2,
              name: "Ambient",
              subtitle: "The Copilot is available when needed",
              description:
                "The assistant quietly observes progress and becomes available without interrupting the workflow.",
              example: (
                <>
                  <p>
                    While configuring a rule manually, the Copilot notices that logging is
                    disabled for an external access rule. It surfaces a small, non-blocking
                    suggestion:
                  </p>
                  <ActivationModelQuote>
                    &ldquo;This external access rule may require audit logging. Review
                    recommendation.&rdquo;
                  </ActivationModelQuote>
                </>
              ),
              takeaway:
                "This reduces friction without forcing the administrator into a chat workflow.",
              imageAlt: "Cisco Policy Copilot — ambient activation model",
            },
            {
              number: 3,
              name: "Proactive",
              subtitle: "The Copilot intervenes when risk is detected",
              description:
                "The Copilot surfaces itself when there is meaningful uncertainty, risk, or opportunity.",
              example: (
                <>
                  <p>
                    A newly created rule conflicts with an existing compliance requirement.
                    The Copilot recommends validation before deployment.
                  </p>
                  <ActivationModelQuote>
                    &ldquo;This rule may conflict with HR access-control policy. Run validation
                    before deployment.&rdquo;
                  </ActivationModelQuote>
                </>
              ),
              takeaway:
                "This transforms the assistant from a passive tool into an active teammate.",
              imageAlt: "Cisco Policy Copilot — proactive activation model",
            },
          ]}
        />

        <CaseStudyDivider className="!mt-8" />

        <CaseStudyH2 className="!mt-8">The Core Experience</CaseStudyH2>
        <CaseStudyParagraph>
          The experience was designed around six fundamental capabilities.
        </CaseStudyParagraph>
      </CaseStudyProse>
      </div>
    </div>
  );
}
