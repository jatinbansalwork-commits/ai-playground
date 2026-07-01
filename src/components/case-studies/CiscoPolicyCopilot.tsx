"use client";

import { CopilotActivationInfographic } from "@/components/case-studies/copilot-activation-infographic";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { CaseStudyRevealCountdown } from "@/components/case-studies/case-study-reveal-countdown";
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
  CaseStudyQuote,
  CaseStudyWide,
} from "@/components/case-studies/case-study-prose";
import { CASE_STUDY_CDN_MEDIA } from "@/lib/asset-cdn";
import { getJbIllustration } from "@/lib/jb-illustration-library";
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
        notice="Designs are recreated from memory; original files are under Cisco IP."
        metaBottom={<CaseStudyRevealCountdown slug={SLUG} />}
      />

      <div
        className={isRevealed ? "" : "pointer-events-none select-none blur-xl"}
        aria-hidden={!isRevealed}
      >
      <CaseStudyProse>
        <CaseStudyH1>
          Turning business requests into secure firewall policies with AI
        </CaseStudyH1>
        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            alt="Cisco Policy Copilot — fragmented policy workflow"
          />
        </CaseStudyWide>
        <CaseStudyH2>Every Firewall Policy Starts with a Conversation.</CaseStudyH2>
        <CaseStudyParagraph>
          For most people, a firewall is invisible. For a security administrator, every rule is a
          decision that carries risk. A single mistake can expose critical systems or bring business
          operations to a halt.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          While working on Cisco Hybrid Mesh Firewall, I realised that firewall policies rarely
          begin inside the firewall. They begin with a conversation.
        </CaseStudyParagraph>
        <CaseStudyQuote>
          &ldquo;Can we give doctors secure access to patient records?&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph>
          It sounds simple. The work behind it isn&apos;t.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4 !pb-10">
          <CaseStudyMedia
            aspect="natural"
            src={getJbIllustration("policy-copilot-translation-bridge")}
            alt="A hospital administrator requesting secure access. A security engineer stands between business teams and the network, surrounded by architecture diagrams, compliance documents, policy objects, and firewall rules. The illustration should communicate translation rather than technical complexity."
          />
        </CaseStudyWide>
        <CaseStudyParagraph className="!pt-4">
          That single request immediately raises questions. Who counts as a doctor? Should access
          only work from managed devices? Does an existing policy already allow it? Will it satisfy
          compliance requirements? Could this unintentionally expose another part of the network?
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Those answers don&apos;t exist in the original request, yet someone has to find them before
          a single firewall rule can be written. As I spent more time with security teams, I noticed
          something interesting. Nobody spoke in firewall terminology.
        </CaseStudyParagraph>
        <CaseStudyQuote>
          &ldquo;Finance needs access to SAP.&rdquo;
        </CaseStudyQuote>
        <CaseStudyQuote>
          &ldquo;Contractors shouldn&apos;t reach production.&rdquo;
        </CaseStudyQuote>
        <CaseStudyQuote>
          &ldquo;Doctors should be able to access patient records.&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph>
          People naturally described business intent. The firewall expected technical intent.
          Administrators spent their time translating one into the other while juggling applications,
          user groups, compliance rules, and potential risks. The product expected them to think like
          the firewall before the firewall helped them.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4">
          <CaseStudyMedia
            aspect="natural"
            src={getJbIllustration("policy-copilot-intent-translation")}
            alt="A handwritten business request gradually transforms into structured policy objects before becoming a deployed firewall policy — emphasising translation, not automation"
            label="From Business Request to Deployed Policy"
            captionClassName="text-center"
          />
        </CaseStudyWide>
        <CaseStudyParagraph className="!pt-4">
          At first, I thought AI could solve this by generating firewall policies faster. But after
          more conversations with engineers and security experts, it became clear that generation
          wasn&apos;t the hardest part. Understanding the request was. That insight completely changed
          the direction of the project.
        </CaseStudyParagraph>
        <CaseStudyWide>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-white/10">
              <div className="space-y-4 p-6 md:p-8">
                <CaseStudyLabel>Instead of asking</CaseStudyLabel>
                <p className="text-lg font-medium leading-relaxed tracking-tight text-neutral-400 md:text-xl">
                  &ldquo;How can AI generate firewall policies?&rdquo;
                </p>
              </div>
              <div className="space-y-4 border-t border-white/10 bg-[#6B36FF]/[0.04] p-6 md:border-t-0 md:p-8">
                <CaseStudyLabel>We started asking</CaseStudyLabel>
                <p className="text-lg font-medium leading-relaxed tracking-tight text-white md:text-xl">
                  &ldquo;How can AI help administrators feel understood before asking them to trust
                  a generated policy?&rdquo;
                </p>
              </div>
            </div>
          </div>
        </CaseStudyWide>
        <CaseStudyParagraph className="!pb-8">
          That shift became the foundation of Policy Copilot. It wasn&apos;t about replacing expert
          decisions. It was about removing the mental effort required to translate business intent
          into secure, technical policies.
        </CaseStudyParagraph>
        <CaseStudyDivider />
      </CaseStudyProse>

      <CaseStudyProse>
        <CaseStudyH2 className="!pt-8">The Problem</CaseStudyH2>
        <CaseStudyParagraph>
          The first time I looked at a firewall policy, I thought I was looking at the hard part.
          Rows of rules. Applications. Zones. Protocols. It looked like a complex spreadsheet. I was
          wrong. The hardest work happened long before anyone clicked{" "}
          <span className="font-semibold text-white">Create Policy</span>.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            src={getJbIllustration("policy-copilot-invisible-complexity")}
            alt="A security administrator surrounded by business requests, network diagrams, compliance checklists, existing policies, and infrastructure maps before a rule is created"
          />
        </CaseStudyWide>
        <CaseStudyParagraph>
          Every policy starts with a business request, but those requests rarely contain the
          information security teams actually need. They describe an outcome, not the technical path
          to achieve it. Before writing a single rule, administrators gather context, identify users,
          understand network paths, review existing policies, and validate compliance. Every answer
          uncovers another question.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The policy itself is often the easy part. Understanding the request is where experience
          matters.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          One security engineer described his job as &ldquo;solving a puzzle where some of the pieces
          are always missing.&rdquo; Sometimes nobody knew which application was actually being used.
          Sometimes a similar policy already existed. Sometimes the safest decision was not to create
          a new policy at all.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The interface wasn&apos;t the hard part. Understanding the network was.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            src={getJbIllustration("policy-copilot-request-journey-map")}
            alt="Journey map from business request through identify users, applications, network path, existing policies, compliance, risk, to create policy"
          />
        </CaseStudyWide>
        <CaseStudyDivider />
        <CaseStudyParagraph>
          I also noticed how fragmented the workflow had become. Administrators constantly switched
          between architecture diagrams, documentation, compliance guides, ticketing systems, and
          conversations with different teams. By the time they reached the firewall console, most of
          the thinking had already happened somewhere else.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The product became the final destination instead of the place where understanding
          happened.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            src={getJbIllustration("policy-copilot-firewall-form-overload")}
            alt="Zoomed-out firewall policy creation form with dozens of fields, emphasising cognitive load from information density"
          />
        </CaseStudyWide>
        <CaseStudyParagraph>
          The interface assumed administrators already knew exactly what they needed. Dozens of
          configuration fields required them to translate business intent into technical rules with
          little guidance.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Validation came too late. Most issues—policy conflicts, compliance violations, or security
          risks—were only discovered after the policy had been written. The product wasn&apos;t
          preventing mistakes. It was helping users find them after the fact.
        </CaseStudyParagraph>
        <CaseStudyParagraph className="!pb-8">
          That led to a simple realisation. The challenge wasn&apos;t creating firewall policies. It
          was translating business intent into secure, compliant decisions. Instead of redesigning
          the policy editor, we chose to redesign the conversation that happens before the first rule
          is ever created.
        </CaseStudyParagraph>
        <CaseStudyDivider className="!mb-8" />

        <CaseStudyH2 className="!pt-8">The Opportunity</CaseStudyH2>
        <CaseStudyParagraph>
          As we stepped back from the workflow, we asked ourselves a simple question:
        </CaseStudyParagraph>
        <CaseStudyQuote>
          What are we actually trying to improve?
        </CaseStudyQuote>
        <CaseStudyParagraph>
          At first, the answer seemed obvious. Make policy creation faster. But the more we observed
          administrators, the more we realised they weren&apos;t slow because they didn&apos;t know
          where to click.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          They were slow because they were thinking. Every policy required judgment—who should have
          access, what already existed, what could break, and whether the request met security and
          compliance requirements. AI couldn&apos;t replace those decisions, but it could remove the
          repetitive work of translating business intent into technical configuration.
        </CaseStudyParagraph>

        <CaseStudyWide className="!mt-2 pb-2">
          <CaseStudyMedia
            aspect="natural"
            shellBackground="#0D1114"
            src={getJbIllustration("policy-copilot-administrator-two-worlds")}
            alt="A security administrator standing between business teams discussing outcomes and a firewall filled with technical configuration, translating one language into the other"
          />
        </CaseStudyWide>

        <CaseStudyParagraph>
          One discussion changed the direction of the project. Someone pointed out that
          administrators weren&apos;t trying to create firewall policies. They were trying to solve
          business problems. The policy was simply the output. That shifted our thinking from:
        </CaseStudyParagraph>
        <CaseStudyWide>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-white/10">
              <div className="space-y-4 p-6 md:p-8">
                <CaseStudyLabel>From</CaseStudyLabel>
                <p className="text-lg font-medium leading-relaxed tracking-tight text-neutral-400 md:text-xl">
                  &ldquo;How can AI generate firewall rules?&rdquo;
                </p>
              </div>
              <div className="space-y-4 border-t border-white/10 bg-[#6B36FF]/[0.04] p-6 md:border-t-0 md:p-8">
                <CaseStudyLabel>To</CaseStudyLabel>
                <p className="text-lg font-medium leading-relaxed tracking-tight text-white md:text-xl">
                  &ldquo;How can AI understand the business request first?&rdquo;
                </p>
              </div>
            </div>
          </div>
        </CaseStudyWide>
        <CaseStudyParagraph>
          That small change influenced almost every design decision that followed.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            shellBackground="#0D1114"
            src={CASE_STUDY_CDN_MEDIA["cisco-policy-copilot-understand-first"]}
            alt="Policy Copilot workflow that begins by understanding the request before generating policy configuration"
          />
        </CaseStudyWide>
        <CaseStudyParagraph>
          Take our hospital example. Instead of asking administrators to immediately configure zones,
          applications, and policies, we imagined a workflow that began by understanding the request.
          Who are the users? Which application is being referenced? What assumptions are missing?
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Only after building that shared understanding would the product generate a policy.
          Configuration became the outcome—not the starting point.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            shellBackground="#0D1114"
            src={CASE_STUDY_CDN_MEDIA["cisco-policy-copilot-design-sprint"]}
            alt="Design sprint whiteboard mapping how AI should understand policy requests and gather missing context before generating firewall rules"
          />
        </CaseStudyWide>
        <CaseStudyParagraph>
          That idea also changed how we designed AI. Most assistants begin by giving answers.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Policy Copilot began by asking better questions. Instead of hiding complexity, it organised
          it—surfacing assumptions, explaining recommendations, highlighting uncertainty, and making
          validation visible throughout the workflow.
        </CaseStudyParagraph>
        <CaseStudyParagraph className="!pb-8">
          By the end, Policy Copilot no longer felt like an AI feature. It felt like working alongside
          an experienced security engineer. Not one that replaced human expertise. One that helped
          people think more clearly.
        </CaseStudyParagraph>
        <CaseStudyDivider />

        <CaseStudyH2 className="!pt-8">Designing Policy Copilot</CaseStudyH2>
        <CaseStudyParagraph>
          By the time we started designing Policy Copilot, one thing was clear. We weren&apos;t
          building another AI chatbot.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Enterprise administrators already worked across dashboards, documentation, ticketing
          systems, and collaboration tools. Asking them to leave their workflow to chat with AI
          would only add more friction. If AI was going to help, it needed to live where the work
          was already happening.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Not beside the workflow. Inside it.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia aspect="natural" shellBackground="#0D1114" />
        </CaseStudyWide>
        <CaseStudyParagraph>
          Embedding the Copilot directly into the policy workflow changed the interaction model.
          Instead of starting with an empty chat, the AI already understood the task, existing
          policies, and available network objects.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We wanted it to feel less like talking to a chatbot and more like collaborating with an
          experienced security engineer—one that asked the right questions before suggesting a
          solution.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            shellBackground="#0D1114"
            src={getJbIllustration("policy-copilot-conversation-storyboard")}
            alt="Storyboard of an administrator and Policy Copilot in short exchanges, with the policy preview updating alongside each response in real time"
            label="Conversation Shapes the Policy"
            captionClassName="text-center"
          />
        </CaseStudyWide>
        <CaseStudyParagraph>
          Take our hospital example.
        </CaseStudyParagraph>
        <CaseStudyQuote>
          &ldquo;Allow doctors to securely access Electronic Health Records from hospital-managed
          devices.&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph>
          Instead of immediately generating a policy, Policy Copilot first reflected its
          understanding back to the administrator. It identified users, applications, devices, and
          assumptions, then asked for confirmation before generating a draft.
        </CaseStudyParagraph>
        <CaseStudyWide className="!pb-8">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-white/10">
              <div className="space-y-4 p-6 md:p-8">
                <CaseStudyLabel>From</CaseStudyLabel>
                <p className="text-lg font-medium leading-relaxed tracking-tight text-neutral-400 md:text-xl">
                  &ldquo;Here&rsquo;s the answer.&rdquo;
                </p>
              </div>
              <div className="space-y-4 border-t border-white/10 bg-[#6B36FF]/[0.04] p-6 md:border-t-0 md:p-8">
                <CaseStudyLabel>To</CaseStudyLabel>
                <p className="text-lg font-medium leading-relaxed tracking-tight text-white md:text-xl">
                  &ldquo;Here&rsquo;s what I think you mean.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </CaseStudyWide>
        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia aspect="natural" shellBackground="#0D1114" />
        </CaseStudyWide>
        <CaseStudyParagraph>
          Nothing happened behind a black box. Administrators could inspect every recommendation,
          edit assumptions, and understand how business intent translated into firewall rules.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          In enterprise security, trust comes from transparency—not automation.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            shellBackground="#0D1114"
            src={getJbIllustration("policy-copilot-confidence-path")}
            alt="Decision path from intent through a confidence check—high confidence proceeds to draft, low confidence or ambiguity triggers clarifying questions before continuing"
            label="Understanding Drives the Workflow"
            captionClassName="text-center"
          />
        </CaseStudyWide>
        <CaseStudyParagraph>
          Rather than always producing an answer, Policy Copilot recognised uncertainty and asked
          for clarification when needed. Every stage—from interpretation to validation—was designed
          to reduce uncertainty before introducing the next decision.
        </CaseStudyParagraph>
        <CaseStudyParagraph>The workflow became simple:</CaseStudyParagraph>
        <CaseStudyParagraph>
          Intent &rarr; Interpretation &rarr; Draft &rarr; Review &rarr; Validate &rarr; Approve
        </CaseStudyParagraph>
        <CaseStudyParagraph className="!pb-8">
          Not a form to complete. A conversation that gradually built confidence.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            shellBackground="#0D1114"
            src={getJbIllustration("policy-copilot-workflow-lifecycle")}
            alt="Horizontal policy lifecycle workflow — Intent, Interpret, Draft, Review, Validate, Approve, Deploy"
          />
        </CaseStudyWide>
        <CaseStudyParagraph>
          We also made a deliberate choice to keep the AI concise. No unnecessary personality. No long
          conversations. Every response was actionable, transparent, and respectful of the
          administrator&apos;s expertise.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Looking back, the most important thing we designed wasn&apos;t the interface. It was the
          relationship between the administrator and the AI. Every interaction answered one question:
        </CaseStudyParagraph>
        <CaseStudyQuote>
          &ldquo;Can I trust this recommendation enough to move forward?&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph className="!pb-8">
          That principle became the foundation for everything that followed, especially how we
          approached validation and explainability.
        </CaseStudyParagraph>
        <CaseStudyDivider className="!mt-8" />

        <CaseStudyH2 className="!pt-8">Validation &amp; Explainability</CaseStudyH2>
        <CaseStudyParagraph>
          One question kept coming up throughout the project:
        </CaseStudyParagraph>
        <CaseStudyQuote>
          &ldquo;How do we know the AI got it right?&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph>
          Not whether it could generate a firewall policy. Whether it generated the right one. For a
          security product, &ldquo;trust me&rdquo; isn&apos;t enough. Every recommendation needs to be
          transparent, explainable, and easy to verify.
        </CaseStudyParagraph>

        <CaseStudyWide className="!mt-4 pb-6">
          <CaseStudyMedia
            aspect="natural"
            shellBackground="#0D1114"
            src={getJbIllustration("policy-copilot-validation-layers")}
            alt="A policy moving through multiple validation layers—security standards, compliance rules, existing policies, and risk analysis—before reaching deployment, rather than a linear approval flow"
          />
        </CaseStudyWide>
        <CaseStudyParagraph>
          That changed how we thought about validation. Instead of checking policies after they were
          written, we brought validation into the creation process itself.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          As Policy Copilot drafted a policy, it continuously checked existing firewall rules,
          compliance requirements, security standards, network boundaries, and potential blast
          radius.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The goal wasn&apos;t to catch mistakes later. It was to prevent them from happening in the
          first place.
        </CaseStudyParagraph>

        <CaseStudyDivider className="!mt-8" />

        <CaseStudyH2 className="!mt-8">Triggering the Copilot</CaseStudyH2>
        <CaseStudyParagraph>
          A key design question was: when should AI appear? We explored three activation
          models.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          If it appeared too often, it could interrupt experienced administrators. If it
          appeared too late, it could miss important risk or compliance issues.
        </CaseStudyParagraph>

        <CaseStudyWide className="!mt-4 pb-6">
          <CopilotActivationInfographic />
        </CaseStudyWide>

        <CaseStudyDivider className="!mt-8" />

        <CaseStudyH2>Designing for Trust</CaseStudyH2>
        <CaseStudyParagraph>
          In cybersecurity, speed alone is not valuable. Administrators need to understand:
        </CaseStudyParagraph>
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
          Every recommendation was designed to include evidence, context, and a clear next
          action. For example:
        </CaseStudyParagraph>
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
            alt="Cisco Policy Copilot — evidence and recommendation patterns"
          />
        </CaseStudyWide>

        <CaseStudyDivider className="!mt-8" />

        <CaseStudyH2>Learning Loop</CaseStudyH2>
        <CaseStudyParagraph>
          To improve recommendations over time, I designed a lightweight feedback pattern.
          After a recommendation, the Copilot could ask:
        </CaseStudyParagraph>
        <CaseStudyQuote>
          &ldquo;How accurate were the AI Suggestions?&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph>
          Administrators could provide a quick 1–5 rating without leaving their workflow.
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
