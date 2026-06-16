"use client";

import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { CaseStudyRevealCountdown } from "@/components/case-studies/case-study-reveal-countdown";
import { CaseStudyTags } from "@/components/case-studies/case-study-findings";
import { CaseStudyImpactCards } from "@/components/case-studies/case-study-impact-cards";
import { CaseStudyMedia } from "@/components/case-studies/case-study-media";
import {
  CaseStudyDisplayLine,
  CaseStudyDivider,
  CaseStudyH1,
  CaseStudyH2,
  CaseStudyH3,
  CaseStudyList,
  CaseStudyParagraph,
  CaseStudyProse,
  CaseStudyQuote,
  CaseStudySubheading,
  CaseStudyWide,
} from "@/components/case-studies/case-study-prose";
import { CASE_STUDY_CDN_MEDIA } from "@/lib/asset-cdn";
import { getCaseStudyContent } from "@/lib/project-content";
import { useCaseStudyRevealCountdown } from "@/hooks/use-case-study-reveal-countdown";

const SLUG = "cisco-policy-copilot";
const REVEAL_STORAGE_KEY = `case-study-reveal:${SLUG}:v3`;

export default function CiscoPolicyCopilotContent() {
  const content = getCaseStudyContent(SLUG)!;
  const { isRevealed } = useCaseStudyRevealCountdown(REVEAL_STORAGE_KEY);

  return (
    <div className="w-full space-y-16">
      <CaseStudyHero
        title={content.title}
        year={content.year}
        overview={content.overviewText}
        meta={content.meta}
        metaBottom={
          <CaseStudyRevealCountdown storageKey={REVEAL_STORAGE_KEY} />
        }
      />

      <div
        className={
          isRevealed ? "" : "pointer-events-none select-none blur-xl"
        }
        aria-hidden={!isRevealed}
      >
      <CaseStudyProse>
        <CaseStudyWide className="!mb-4">
          <CaseStudyMedia
            aspect="video"
            src={CASE_STUDY_CDN_MEDIA["cisco-policy-copilot-overview"]}
            alt="Cisco Policy Copilot overview"
          />
        </CaseStudyWide>
        <CaseStudyH1>
          Security policy creation is often slow, complex, and deeply manual, even for
          experienced network administrators.
        </CaseStudyH1>
        <CaseStudyParagraph>A simple business request like:</CaseStudyParagraph>
        <CaseStudyQuote>
          &ldquo;Allow the Engineering team to access GitHub securely&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph>
          can require administrators to manually configure users, applications, protocols,
          security profiles, logging rules, compliance requirements, and deployment settings
          across multiple systems. The challenge wasn&apos;t understanding what needed to
          happen. The challenge was translating business intent into a safe, compliant, and
          deployable policy.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4">
          <CaseStudyMedia
            aspect="natural"
            src={CASE_STUDY_CDN_MEDIA["cisco-policy-copilot-why-matters"]}
            alt="Cisco Policy Copilot — why this matters"
          />
        </CaseStudyWide>
        <CaseStudyParagraph>
          I got an opportunity to transform this workflow into an AI-assisted experience that
          helps administrators create policies faster while maintaining trust, compliance, and
          full control over every decision.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4">
          <CaseStudyMedia
            aspect="natural"
            src={CASE_STUDY_CDN_MEDIA["cisco-policy-copilot-workflow-transformation"]}
            alt="Cisco Policy Copilot — workflow transformation"
          />
        </CaseStudyWide>
        <CaseStudyDivider />
      </CaseStudyProse>

      <CaseStudyProse>
        <CaseStudyH2>OVERVIEW</CaseStudyH2>
        <CaseStudyParagraph>
          We set out to build an AI-powered assistant that felt less like automation and more
          like a security teammate.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Instead of forcing administrators to navigate complex policy configurations, Policy
          Copilot helps them describe what they want to achieve in natural language and then
          guides them through validation, risk assessment, and deployment.
        </CaseStudyParagraph>

        <CaseStudyH2>Why This Matters</CaseStudyH2>
        <CaseStudyList
          items={[
            "Policy creation is slow, repetitive, and heavily dependent on platform expertise.",
            "Administrators understand security intent but struggle to translate it into policy rules.",
            "Risk validation, compliance checks, and impact analysis are often fragmented across workflows.",
            "Every policy mistake can introduce security vulnerabilities or business disruptions.",
            "Existing tools optimise for configuration efficiency, not decision confidence.",
          ]}
        />
        <CaseStudyDivider />

        <CaseStudyH2>MY ROLE</CaseStudyH2>
        <CaseStudyParagraph>
          I led the end-to-end experience strategy, designed the AI-assisted policy
          creation workflow, and partnered closely with product, engineering, and AI teams
          to balance automation, trust, and administrator control.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          My goal was not simply to make policy creation faster. It was to create an AI
          experience administrators could trust in high-risk security environments.
        </CaseStudyParagraph>

        <CaseStudyH2>Impact</CaseStudyH2>
        <CaseStudyImpactCards
          items={[
            {
              title: "Reduced Configuration Effort",
              description:
                "Policy Copilot converts natural-language intent into structured policy drafts, reducing the need to manually configure multiple policy attributes and dependencies.",
            },
            {
              title: "Faster Policy Decisions",
              description:
                "Administrators can move from a business request to a validated, reviewable policy in minutes instead of navigating complex configuration flows.",
            },
          ]}
        />
        <CaseStudyImpactCards
          items={[
            {
              title: "Improved Decision Confidence",
              description:
                "AI recommendations are supported with evidence, compliance checks, and impact analysis before deployment.",
            },
            {
              title: "Lower Cognitive Load",
              description:
                "Instead of remembering hundreds of policy dependencies and security considerations, administrators receive contextual guidance throughout the workflow.",
            },
          ]}
        />
        <CaseStudyDivider />

        <CaseStudyH2>The Vision</CaseStudyH2>
        <CaseStudyParagraph>
          We weren&apos;t building another chatbot. We were designing a security teammate. A
          system capable of helping administrators:
        </CaseStudyParagraph>
        <CaseStudyTags
          tags={[
            "Understand requests",
            "Gather context",
            "Recommend policies",
            "Validate risk",
            "Explain decisions",
            "Support deployment",
            "Learn over time",
          ]}
        />
        <CaseStudyParagraph>
          While ensuring humans remained responsible for final approval.
        </CaseStudyParagraph>
        <CaseStudyDivider />

        <CaseStudyH2>From Copilot to Agent</CaseStudyH2>
        <CaseStudyParagraph>
          During discovery, we realised policy creation was only one part of a much larger
          problem. Administrators weren&apos;t struggling with configuration screens. They were
          struggling with decision-making.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Every policy change required answering critical questions:
        </CaseStudyParagraph>
        <CaseStudyList
          items={[
            "Is this policy secure?",
            "Does it violate compliance requirements?",
            "Will it conflict with existing rules?",
            "Is the scope broader than intended?",
            "What business impact will this create?",
          ]}
        />
        <CaseStudyParagraph>
          These questions forced administrators to constantly switch between systems,
          documentation, and validation tools. The real opportunity wasn&apos;t generating
          policies. It was helping administrators reason about policy decisions.
        </CaseStudyParagraph>
        <CaseStudyDivider />

        <CaseStudyH2>Designing the Agent Framework</CaseStudyH2>
        <CaseStudyParagraph>
          As the vision evolved, Policy Copilot became part of Cisco&apos;s broader Agent
          Workforce initiative. We defined a framework where the agent could assist throughout
          the entire policy lifecycle.
        </CaseStudyParagraph>

        <CaseStudyParagraph>What is it helping with?</CaseStudyParagraph>
        <CaseStudyQuote>
          Helping teams safely reason about, validate, deploy, and manage policy decisions
          across the policy lifecycle.
        </CaseStudyQuote>

        <CaseStudyParagraph>Why should it do this work?</CaseStudyParagraph>
        <CaseStudyQuote>
          Policy changes are high-risk and fragmented across systems. Administrators
          shouldn&apos;t need to manually assemble rules, context, risk signals, and compliance
          evidence before making decisions.
        </CaseStudyQuote>

        <CaseStudySubheading>Value it provides</CaseStudySubheading>
        <CaseStudyParagraph>
          Policy Copilot improves confidence and reduces cognitive load by combining:
        </CaseStudyParagraph>
        <CaseStudyTags
          tags={[
            "Clear intent",
            "Context awareness",
            "Validated impact",
            "Explainable recommendations",
            "Safe execution paths",
          ]}
        />
        <CaseStudyDivider />

        <CaseStudyH3>Triggering the Copilot</CaseStudyH3>
        <CaseStudyParagraph>
          One of the most important design decisions was determining{" "}
          <span className="font-semibold text-white">when AI should appear.</span> Instead of
          making users constantly invoke the assistant, we explored three activation models.
        </CaseStudyParagraph>

        <CaseStudyH3>Explicit</CaseStudyH3>
        <CaseStudyParagraph>
          The administrator intentionally requests assistance.
        </CaseStudyParagraph>
        <CaseStudyParagraph>Example:</CaseStudyParagraph>
        <CaseStudyQuote>
          &ldquo;Create a policy allowing Engineering access to GitHub.&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph>
          This provides maximum control and predictability.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4">
          <CaseStudyMedia
            aspect="natural"
            alt="Cisco Policy Copilot — activation model 1"
          />
        </CaseStudyWide>

        <CaseStudyH3>Ambient</CaseStudyH3>
        <CaseStudyParagraph>
          The assistant quietly observes progress and becomes available when needed.
        </CaseStudyParagraph>
        <CaseStudyParagraph>Example:</CaseStudyParagraph>
        <CaseStudyQuote>
          While configuring a rule, the Copilot notices missing logging requirements and
          offers guidance.
        </CaseStudyQuote>
        <CaseStudyParagraph>
          This reduces friction without interrupting workflows.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4">
          <CaseStudyMedia
            aspect="natural"
            alt="Cisco Policy Copilot — activation model 2"
          />
        </CaseStudyWide>

        <CaseStudyH3>Proactive</CaseStudyH3>
        <CaseStudyParagraph>
          The assistant surfaces itself when risk, uncertainty, or opportunity is detected.
        </CaseStudyParagraph>
        <CaseStudyParagraph>Example:</CaseStudyParagraph>
        <CaseStudyQuote>
          A newly created rule conflicts with compliance requirements.
        </CaseStudyQuote>
        <CaseStudyParagraph>
          The assistant proactively recommends validation before deployment. This transforms
          AI from a tool into an active teammate.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4">
          <CaseStudyMedia
            aspect="natural"
            alt="Cisco Policy Copilot — activation model 3"
          />
        </CaseStudyWide>

        <CaseStudyDivider />

        <CaseStudyH2>The Core Experience</CaseStudyH2>
        <CaseStudyParagraph>
          The experience was designed around six fundamental capabilities.
        </CaseStudyParagraph>

        <CaseStudyH3>1. Understand</CaseStudyH3>
        <CaseStudyParagraph>
          The first challenge wasn&apos;t generating policies. It was understanding intent.
          Inspired by conversational planning experiences found in tools like ChatGPT and
          GitHub Copilot, the system begins by clarifying requirements before making
          recommendations. Instead of immediately generating configurations, Policy Copilot
          reflects understanding back to the administrator.
        </CaseStudyParagraph>
        <CaseStudyParagraph>It asks questions such as:</CaseStudyParagraph>
        <CaseStudyTags
          tags={[
            "Who needs access?",
            "What applications are involved?",
            "Are there time restrictions?",
            "Are additional security controls required?",
          ]}
        />
        <CaseStudyParagraph>
          This creates alignment before automation begins.
        </CaseStudyParagraph>

        <CaseStudyH3>2. Suggest</CaseStudyH3>
        <CaseStudyParagraph>
          Once intent is understood, the system proposes actions. Rather than generating a
          single answer, it recommends next steps and alternative paths.
        </CaseStudyParagraph>
        <CaseStudyParagraph>For example:</CaseStudyParagraph>
        <CaseStudyTags
          tags={[
            "Run compliance checks",
            "Enable logging",
            "Perform impact analysis",
            "Add time restrictions",
            "Review conflicting rules",
          ]}
        />

        <CaseStudyH3>3. Summarise</CaseStudyH3>
        <CaseStudyParagraph>
          Security workflows generate large amounts of information. To reduce analysis burden,
          the system continuously summarises:
        </CaseStudyParagraph>
        <CaseStudyTags
          tags={[
            "Intent",
            "Policy scope",
            "Compliance status",
            "Risk findings",
            "Recommended actions",
          ]}
        />
        <CaseStudyParagraph>
          This provides a clear snapshot of progress without requiring administrators to
          inspect every detail.
        </CaseStudyParagraph>

        <CaseStudyH3>4. Prove</CaseStudyH3>
        <CaseStudyParagraph>
          Trust became one of the most important design principles.
        </CaseStudyParagraph>
        <CaseStudyParagraph>Administrators repeatedly told us:</CaseStudyParagraph>
        <CaseStudyQuote>
          &ldquo;Don&apos;t just tell me it&apos;s safe. Show me why.&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph>
          Every recommendation is therefore connected to supporting evidence.
        </CaseStudyParagraph>
        <CaseStudyParagraph>The system surfaces:</CaseStudyParagraph>
        <CaseStudyTags
          tags={[
            "Policy sources",
            "Compliance references",
            "Existing rule comparisons",
            "Risk analysis outputs",
            "Supporting security signals",
          ]}
        />
        <CaseStudyParagraph>
          This transforms AI from an opinion engine into a reasoning engine.
        </CaseStudyParagraph>

        <CaseStudyH3>5. Validate</CaseStudyH3>
        <CaseStudyParagraph>
          Before deployment, Policy Copilot evaluates policies against:
        </CaseStudyParagraph>
        <CaseStudyTags
          tags={[
            "Security standards",
            "Compliance requirements",
            "Existing firewall rules",
            "Risk conditions",
            "Organisational policies",
          ]}
        />
        <CaseStudyParagraph>
          Validation becomes a continuous process rather than a final checkpoint.
        </CaseStudyParagraph>

        <CaseStudyH3>6. Execute</CaseStudyH3>
        <CaseStudyParagraph>
          Execution was intentionally designed as the final step. Even when AI completed all
          validations successfully, administrators retained full control. The system could
          prepare policies for deployment, but human approval remained mandatory. This balance
          between automation and oversight proved critical for adoption.
        </CaseStudyParagraph>

        <CaseStudyDivider />

        <CaseStudyH3>Quick feedback for AI</CaseStudyH3>
        <CaseStudyParagraph>
          A lightweight, optional 5-point rating system at each clause review passively
          gathers accuracy feedback. Ensures continuous learning without interrupting user
          workflows, improving AI over time.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4">
          <CaseStudyMedia
            aspect="natural"
            src={CASE_STUDY_CDN_MEDIA["cisco-policy-copilot-rating"]}
            alt="Cisco Policy Copilot — quick feedback for AI"
          />
        </CaseStudyWide>

        <CaseStudyH2>Designing for Trust</CaseStudyH2>
        <CaseStudyWide className="!mt-4">
          <CaseStudyMedia
            aspect="natural"
            borderless
            src={CASE_STUDY_CDN_MEDIA["cisco-policy-copilot-trust"]}
            alt="Cisco Policy Copilot — designing for trust"
          />
        </CaseStudyWide>
        <CaseStudyParagraph>
          The most important lesson from this project wasn&apos;t about AI. It was about trust.
          In cybersecurity, speed alone isn&apos;t valuable.
        </CaseStudyParagraph>
        <CaseStudyDisplayLine className="!text-base md:!text-lg">
          Confidence is.
        </CaseStudyDisplayLine>
        <CaseStudyParagraph>Administrators need to understand:</CaseStudyParagraph>
        <CaseStudyTags
          tags={[
            "What the AI knows",
            "What the AI recommends",
            "Why it recommends it",
            "What evidence supports it",
            "What risks remain",
          ]}
        />
        <CaseStudyParagraph>
          Only then can automation become genuinely useful.
        </CaseStudyParagraph>

        <CaseStudyDivider />

        <CaseStudyH2>Reflection</CaseStudyH2>
        <CaseStudyParagraph>
          Designing Policy Copilot reinforced a belief I have about AI products:
        </CaseStudyParagraph>
        <CaseStudyDisplayLine>
          Designing for AI isn&apos;t just about connecting APIs—it&apos;s about trust,
          context, and control. Especially when the stakes are high, human judgement still
          leads. The role of design is to bridge that gap with clarity.
        </CaseStudyDisplayLine>
      </CaseStudyProse>
      </div>
    </div>
  );
}
