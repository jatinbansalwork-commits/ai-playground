"use client";

import { CaseStudyFaq } from "@/components/case-studies/case-study-faq";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import {
  PolicyCopilotAdministratorTwoWorlds,
  PolicyCopilotConfigurationVsConversation,
  PolicyCopilotConfidenceGrowth,
  PolicyCopilotContinuousValidation,
  PolicyCopilotFinalApproval,
  PolicyCopilotLivingWorkspace,
  PolicyCopilotLookingBack,
  PolicyCopilotProblemReframe,
  PolicyCopilotRecommendationCards,
  PolicyCopilotTransparentAiExploration,
  PolicyCopilotWorkBeforeFirewall,
  PolicyCopilotWorkspace,
} from "@/components/case-studies/policy-copilot/policy-copilot-showcase";
import { POLICY_COPILOT_FAQ_ITEMS } from "@/components/case-studies/policy-copilot/policy-copilot-faq-data";
import { WORKSPACE_EMBED_SHELL, WORKSPACE_HOST_BREAKOUT } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import { CaseStudyMedia } from "@/components/case-studies/case-study-media";
import {
  CaseStudyDivider,
  CaseStudyH1,
  CaseStudyH2,
  CaseStudyH3,
  CaseStudyChips,
  CaseStudyList,
  CaseStudyParagraph,
  CaseStudyProse,
  CaseStudyQuote,
  CaseStudyWide,
} from "@/components/case-studies/case-study-prose";
import { getJbIllustration } from "@/lib/jb-illustration-library";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "cisco-policy-copilot";

export default function CiscoPolicyCopilotContent() {
  const content = getCaseStudyContent(SLUG)!;

  return (
    <>
      <CaseStudyHero
        title={content.title}
        year={content.year}
        overview={content.overviewText}
        meta={content.meta}
        metaClassName="!mb-4"
        notice="Designs are recreated from memory; original files are under Cisco IP."
      />

      <CaseStudyWide className="pb-2">
        <div className="mb-4 flex justify-center text-center md:mb-5">
          <CaseStudyH1>
            Every firewall policy starts with a conversation.
          </CaseStudyH1>
        </div>
        <div className={WORKSPACE_HOST_BREAKOUT}>
          <div className={WORKSPACE_EMBED_SHELL}>
            <PolicyCopilotWorkspace />
          </div>
          <div className="mx-auto mt-4 flex max-w-[1440px] justify-center px-3 md:mt-5 md:px-4">
            <p
              className="inline-flex items-center gap-2.5 rounded-full border border-sky-400/45 bg-sky-500/12 px-4 py-2 text-sm font-medium tracking-wide text-sky-100 shadow-[0_0_28px_-6px_rgba(56,189,248,0.45)] antialiased"
              role="note"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden>
                <span className="absolute inline-flex h-full w-full rounded-full bg-sky-300/45 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-300" />
              </span>
              <svg className="h-4 w-4 shrink-0 text-sky-200/90" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M4.5 3.5 9 8l-4.5 4.5M9 3.5h2.5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H9"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Interactive demo — explore the workspace
            </p>
          </div>
        </div>
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudyH2>Every Firewall Policy Starts the Same Way.</CaseStudyH2>
        <CaseStudyList
          items={[
            "Not with a firewall rule.",
            "Not with a protocol.",
            "Not with a configuration screen.",
          ]}
        />
        <CaseStudyParagraph>It starts with someone saying,</CaseStudyParagraph>
        <CaseStudyQuote>
          &ldquo;Can doctors securely access patient records from hospital-managed devices?&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph className="!pb-6">
          It sounds like a simple request, but behind that sentence are dozens of security decisions.
          Who should have access? Which application is involved? Should remote access be allowed? Does it
          meet compliance requirements? Could one mistake expose the network? The request takes
          seconds to describe, but making the right decision can take hours.
        </CaseStudyParagraph>
        <CaseStudyWide className="!mt-4 !pb-8">
          <PolicyCopilotAdministratorTwoWorlds />
        </CaseStudyWide>
        <CaseStudyParagraph className="!pt-6 !pb-6 !text-lg md:!text-xl !text-neutral-200">
          When I joined the project, I thought we were redesigning firewall policy creation. After
          spending time with security engineers, I realised the real challenge came much earlier. We
          weren&rsquo;t redesigning firewall policies&mdash;we were redesigning how administrators
          understand a business request before it becomes one.
        </CaseStudyParagraph>
        <CaseStudyH2 className="!pt-4 !pb-6">The Real Work Happens Before the Firewall</CaseStudyH2>
        <CaseStudyWide className="!pb-6">
          <PolicyCopilotWorkBeforeFirewall />
        </CaseStudyWide>
        <CaseStudyWide className="!mt-4 !pb-2">
          <CaseStudyMedia
            aspect="natural"
            shellBackground="#0D1114"
            src={getJbIllustration("policy-copilot-discovery-workshop")}
            alt="Miro discovery workshop — current-state journey mapping, affinity clusters, pain points, and how-might-we opportunities for network policy creation"
          />
        </CaseStudyWide>
        <CaseStudyWide className="!mt-4 pb-2">
          <CaseStudyMedia
            aspect="natural"
            shellBackground="#0D1114"
            src={getJbIllustration("policy-copilot-pain-points-concepts")}
            alt="Miro workshop — pain point clusters and low-fi concept sketches from discovery, before the Policy Copilot direction was set"
          />
        </CaseStudyWide>
        <CaseStudyParagraph className="!pt-6">
          One security engineer said something I&rsquo;ll probably remember for the rest of my career.
        </CaseStudyParagraph>
        <CaseStudyQuote>
          &ldquo;Writing the policy isn&rsquo;t the hard part. Understanding what people actually mean
          is.&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph className="!pb-8">
          That sentence changed how I looked at the product.
        </CaseStudyParagraph>
        <CaseStudyDivider className="!mb-8" />
        <CaseStudyH2 className="!pt-8">We Were Solving the Wrong Problem</CaseStudyH2>
        <CaseStudyParagraph>
          After several research sessions, our workshop wall was covered with sticky notes. We had
          captured everything we heard:
        </CaseStudyParagraph>
        <CaseStudyChips
          ariaLabel="Themes captured during research workshops"
          items={[
            "Applications",
            "Identity",
            "Compliance",
            "Existing Policies",
            "Risk",
            "Business Language",
            "Trust",
          ]}
        />
        <CaseStudyParagraph>
          Individually, they felt like disconnected observations. Together, they revealed something
          much bigger.
        </CaseStudyParagraph>
        <CaseStudyParagraph className="!pb-8">
          Administrators weren&rsquo;t struggling to create firewall policies. They were translating
          business conversations into technical decisions.
        </CaseStudyParagraph>
        <CaseStudyWide className="!pb-8">
          <PolicyCopilotProblemReframe />
        </CaseStudyWide>
        <CaseStudyDivider className="!mb-8" />
        <CaseStudyH2>A Familiar Problem, Different Industry</CaseStudyH2>
        <CaseStudyParagraph>
          I often explain this challenge using Google Maps.
        </CaseStudyParagraph>
        <CaseStudyParagraph>Imagine typing,</CaseStudyParagraph>
        <CaseStudyQuote>&ldquo;Take me to the airport.&rdquo;</CaseStudyQuote>
        <CaseStudyParagraph>
          Instead of showing directions, Maps asks for GPS coordinates, routing algorithms, and road
          classifications.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Everything is technically correct. Nothing helps you reach the airport. Traditional firewall
          products often worked the same way. They asked administrators to think about firewall objects
          before helping them think about the business problem.
        </CaseStudyParagraph>
        <CaseStudyQuote>
          People don&rsquo;t think in ports, protocols, or policies. They think in outcomes.
        </CaseStudyQuote>
        <CaseStudyParagraph>Policy Copilot simply flipped that order.</CaseStudyParagraph>
        <CaseStudyParagraph className="!pb-8">
          Start with intent. Let configuration follow.
        </CaseStudyParagraph>
        <CaseStudyDivider className="!mb-8" />
        <CaseStudyH2 className="!pt-4">Four Principles Shaped Everything</CaseStudyH2>
        <CaseStudyParagraph className="!pb-2">
          Once we understood the real problem, the design principles became surprisingly clear.
        </CaseStudyParagraph>
        <CaseStudyWide className="!pb-8">
          <CaseStudyMedia
            aspect="natural"
            shellBackground="#0D1114"
            src={getJbIllustration("policy-copilot-design-principles")}
            alt="Four design principles for Policy Copilot — start with intent, reflect before generating, explain every recommendation, and keep humans in control"
          />
        </CaseStudyWide>
        <CaseStudyParagraph className="!pb-8">
          By the end of discovery, we weren&rsquo;t designing a tool that generated firewall policies.
          We were designing one that helped people make better security decisions. Everything that
          followed&mdash;from the interaction model to the final workflow&mdash;was built around that
          idea.
        </CaseStudyParagraph>
        <CaseStudyH3 className="!pt-4">Designing Understanding Before Automation</CaseStudyH3>
        <CaseStudyParagraph>
          The goal wasn&rsquo;t to generate a firewall policy. It was to help administrators understand
          what they were about to approve.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          By the end of research, we realised every policy started as a business request but ended as
          technical configuration. Somewhere between those two worlds sat the administrator,
          translating outcomes into secure decisions.
        </CaseStudyParagraph>
        <CaseStudyParagraph className="!pb-8">
          Policy Copilot wasn&rsquo;t designed to replace that expertise. It was designed to make the
          journey from business intent to trusted policy faster, clearer, and easier to understand.
        </CaseStudyParagraph>
        <CaseStudyWide className="!pb-12">
          <PolicyCopilotConfigurationVsConversation />
        </CaseStudyWide>
        <CaseStudyH3 className="!pt-4">Start With Intent, Not Configuration</CaseStudyH3>
        <CaseStudyParagraph>
          Traditional firewall products usually begin with configuration.
        </CaseStudyParagraph>
        <CaseStudyChips
          ariaLabel="Traditional firewall configuration fields"
          items={[
            "Source",
            "Destination",
            "Application",
            "Protocol",
            "Ports",
            "Logging",
          ]}
        />
        <CaseStudyParagraph>
          Every field assumes the administrator already knows the technical answer.
        </CaseStudyParagraph>
        <CaseStudyParagraph>Policy Copilot starts with a different question:</CaseStudyParagraph>
        <CaseStudyQuote>&ldquo;What are you trying to achieve?&rdquo;</CaseStudyQuote>
        <CaseStudyParagraph className="!pb-8">
          Administrators no longer had to translate a business request before opening the product.
          They could simply describe the outcome. The product handled the translation. People stayed
          focused on the problem. The firewall received the configuration it needed.
        </CaseStudyParagraph>
        <CaseStudyH3 className="!pt-4">Understanding Before Generation</CaseStudyH3>
        <CaseStudyParagraph>
          Like many AI products, our first prototype generated a policy immediately. It worked&mdash;but
          it answered before proving it had understood the request.
        </CaseStudyParagraph>
        <CaseStudyParagraph className="!pb-2">
          So we slowed the experience down. Before generating anything, Policy Copilot reflected its
          understanding back to the administrator.
        </CaseStudyParagraph>
        <CaseStudyWide className="!pb-12">
          <div className={WORKSPACE_HOST_BREAKOUT}>
            <div className={WORKSPACE_EMBED_SHELL}>
              <PolicyCopilotWorkspace presentation="intent-summary" />
            </div>
          </div>
        </CaseStudyWide>
        <CaseStudyH2 className="!pt-4">The First Draft Wasn&rsquo;t the Policy</CaseStudyH2>
        <CaseStudyParagraph className="!pt-4">
          During usability testing, one pattern appeared again and again. Administrators rarely edited
          the generated policy first.
        </CaseStudyParagraph>
        <CaseStudyParagraph>They corrected the AI&rsquo;s interpretation instead:</CaseStudyParagraph>
        <CaseStudyChips
          ariaLabel="What administrators corrected during usability testing"
          items={["User groups", "Applications", "Remote access", "Missing context"]}
        />
        <CaseStudyParagraph>That changed our thinking.</CaseStudyParagraph>
        <CaseStudyParagraph className="!pb-2">
          People preferred reviewing meaning before configuration. So we changed what &ldquo;first
          draft&rdquo; meant. The interpretation became the first draft. The firewall policy became
          the second.
        </CaseStudyParagraph>
        <CaseStudyWide className="!pb-12">
          <CaseStudyMedia
            aspect="natural"
            shellBackground="#0D1114"
            src="https://vpocozyaql1wuw3p.public.blob.vercel-storage.com/Cisco%20Miro/Screenshot%202026-07-06%20at%203.09.00%E2%80%AFAM.png"
            alt="Miro workshop — interpretation as first draft, firewall policy as second; usability findings on correcting meaning before configuration"
          />
        </CaseStudyWide>
        <CaseStudyH2 className="!pt-8">One Workspace, Not Five Screens</CaseStudyH2>
        <CaseStudyParagraph>
          Most enterprise products move people through a series of screens. We wanted the opposite. One
          workspace where the conversation, the context, and the policy stayed together.
        </CaseStudyParagraph>
        <CaseStudyParagraph>As administrators confirmed details, the workspace gradually expanded:</CaseStudyParagraph>
        <CaseStudyChips
          ariaLabel="Workspace areas that expanded as administrators confirmed details"
          items={["Users", "Applications", "Network zones", "Access conditions", "Compliance"]}
        />
        <CaseStudyParagraph>
          Every new card was connected to the original request. Nothing appeared out of nowhere.
        </CaseStudyParagraph>
        <CaseStudyParagraph className="!pb-8">
          The policy wasn&rsquo;t generated in a single step. It was assembled one decision at a time.
        </CaseStudyParagraph>
        <CaseStudyWide className="!pb-12">
          <PolicyCopilotLivingWorkspace />
        </CaseStudyWide>
        <CaseStudyH2 className="!pt-8">Make AI Thinking Visible</CaseStudyH2>
        <CaseStudyParagraph>
          One design principle guided almost every interaction. Never make administrators wonder what
          changed.
        </CaseStudyParagraph>
        <CaseStudyParagraph>Whenever the AI updated the workspace, it clearly explained:</CaseStudyParagraph>
        <CaseStudyChips
          ariaLabel="What the AI explained when the workspace updated"
          items={[
            "What changed",
            "Why it changed",
            "How confident it was",
            "What still needed confirmation",
          ]}
        />
        <CaseStudyParagraph>
          Nothing appeared without context. Nothing felt like a black box.
        </CaseStudyParagraph>
        <CaseStudyParagraph className="!pb-2">
          The goal wasn&rsquo;t to make administrators trust the AI. It was to make its thinking easy
          to understand.
        </CaseStudyParagraph>
        <CaseStudyWide className="!pt-6 !pb-12">
          <PolicyCopilotTransparentAiExploration />
        </CaseStudyWide>
        <CaseStudyH2 className="!pt-4">One Moment Changed Everything</CaseStudyH2>
        <CaseStudyParagraph>
          During one internal review, an engineer looked at the prototype for a few seconds and said,
        </CaseStudyParagraph>
        <CaseStudyQuote>
          &ldquo;This doesn&rsquo;t feel like writing firewall rules anymore.&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph>He paused. Then smiled.</CaseStudyParagraph>
        <CaseStudyQuote>&ldquo;It feels like reviewing someone else&rsquo;s work.&rdquo;</CaseStudyQuote>
        <CaseStudyParagraph className="!pb-2">
          That was exactly the experience we were trying to create. The AI wasn&rsquo;t the author. It
          was the first reviewer. The administrator remained the final one.
        </CaseStudyParagraph>
        <CaseStudyDivider className="!my-8" />
        <CaseStudyH2 className="!pt-4">Designing Trust</CaseStudyH2>
        <CaseStudyParagraph>
          The hardest question wasn&rsquo;t &ldquo;Can AI generate a policy?&rdquo; It was &ldquo;Should I trust
          it?&rdquo;
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Once Policy Copilot could understand a request and draft a policy, the challenge shifted. In
          enterprise security, a policy is only valuable if someone is confident enough to approve it.
        </CaseStudyParagraph>
        <CaseStudyParagraph>One security architect captured it perfectly:</CaseStudyParagraph>
        <CaseStudyQuote>
          &ldquo;I don&rsquo;t mind if AI writes the first draft. I mind if I can&rsquo;t explain why
          I&rsquo;m approving it.&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph className="!pb-8">
          That insight shaped the rest of the product. Trust wasn&rsquo;t something we added at the
          end&mdash;it had to be designed into every interaction.
        </CaseStudyParagraph>
        <CaseStudyDivider className="!mb-8" />
        <CaseStudyH2 className="!pt-8">Validation Became Part of the Conversation</CaseStudyH2>
        <CaseStudyParagraph>
          Our first idea was straightforward: Generate &rarr; Validate &rarr; Fix &rarr; Deploy.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          It looked logical, but it didn&rsquo;t reflect how administrators actually worked. Research
          showed that experienced administrators validated continuously. Every decision raised another
          question:
        </CaseStudyParagraph>
        <CaseStudyChips
          ariaLabel="Questions administrators raised during continuous validation"
          items={[
            "Does a similar rule already exist?",
            "Could this affect another application?",
            "Does it meet company standards?",
          ]}
        />
        <CaseStudyParagraph>
          Validation wasn&rsquo;t a final step. It was part of the decision-making process. So instead
          of adding another validation screen, we embedded validation into the workspace. As
          administrators confirmed users, applications, and access conditions, Policy Copilot quietly
          checked:
        </CaseStudyParagraph>
        <CaseStudyChips
          ariaLabel="What Policy Copilot checked during the workflow"
          items={[
            "Existing policies",
            "Compliance requirements",
            "Security standards",
            "Duplicate rules",
            "Network segmentation",
            "Potential blast radius",
          ]}
        />
        <CaseStudyParagraph className="!pb-8">
          Nothing interrupted the workflow. The product surfaced issues only when they mattered.
        </CaseStudyParagraph>
        <CaseStudyWide className="!pb-8">
          <PolicyCopilotContinuousValidation />
        </CaseStudyWide>
        <CaseStudyH2 className="!pt-4">Explain the Recommendation, Not Just the Result</CaseStudyH2>
        <CaseStudyParagraph>
          Usability testing revealed another important insight.
        </CaseStudyParagraph>
        <CaseStudyParagraph>Administrators rarely asked, &ldquo;What should I do?&rdquo;</CaseStudyParagraph>
        <CaseStudyParagraph>They asked, &ldquo;Why are you recommending this?&rdquo;</CaseStudyParagraph>
        <CaseStudyParagraph>
          That changed how we designed recommendations. Instead of simple alerts, every suggestion
          included the reasoning behind it.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          For example, if Policy Copilot recommended enabling audit logging, it explained why:
        </CaseStudyParagraph>
        <CaseStudyList
          items={[
            "The application handled sensitive healthcare records.",
            "Similar policies already enabled logging.",
            "Organisational standards required an audit trail.",
          ]}
        />
        <CaseStudyParagraph className="!pb-8">
          Instead of asking administrators to trust the recommendation, we gave them the context to
          make their own decision.
        </CaseStudyParagraph>
        <CaseStudyWide className="!pb-8">
          <PolicyCopilotRecommendationCards />
        </CaseStudyWide>
        <CaseStudyH2 className="!pt-4">Let the AI Admit Uncertainty</CaseStudyH2>
        <CaseStudyParagraph>
          Another design decision was surprisingly simple. If the AI wasn&rsquo;t sure, it said so.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Instead of making assumptions, it asked for clarification:
        </CaseStudyParagraph>
        <CaseStudyChips
          ariaLabel="Clarification questions when confidence was low"
          items={[
            "Should remote access be allowed?",
            "Should contractors inherit these permissions?",
            "Should access expire automatically?",
          ]}
        />
        <CaseStudyParagraph className="!pb-8">
          Rather than reducing trust, those moments increased it. In enterprise security, admitting
          uncertainty is often safer than pretending certainty.
        </CaseStudyParagraph>
        <CaseStudyWide className="!pb-8">
          <PolicyCopilotConfidenceGrowth />
        </CaseStudyWide>
        <CaseStudyH2 className="!pt-4">Help People Review Impact, Not Configuration</CaseStudyH2>
        <CaseStudyParagraph>
          Before approving a policy, administrators wanted one answer:
        </CaseStudyParagraph>
        <CaseStudyQuote>&ldquo;What happens if I deploy this?&rdquo;</CaseStudyQuote>
        <CaseStudyParagraph>
          Instead of asking them to interpret firewall rules, Policy Copilot simulated the outcome:
        </CaseStudyParagraph>
        <CaseStudyList
          items={[
            "Who gains access",
            "Which applications become reachable",
            "How traffic paths change",
            "The potential blast radius",
          ]}
        />
        <CaseStudyParagraph>Administrators stopped reviewing configuration.</CaseStudyParagraph>
        <CaseStudyParagraph className="!pb-6">They started reviewing impact.</CaseStudyParagraph>
        <CaseStudyWide className="!pb-12">
          <CaseStudyMedia
            aspect="natural"
            shellBackground="#0D1114"
            src={getJbIllustration("policy-copilot-simulation-impact")}
            alt="Simulation and impact analysis — who gains access, reachable applications, traffic paths, and blast radius instead of dense firewall configuration"
          />
        </CaseStudyWide>
        <CaseStudyH2 className="!pt-12">Human Approval Was Never Optional</CaseStudyH2>
        <CaseStudyParagraph>One principle never changed.</CaseStudyParagraph>
        <CaseStudyParagraph>
          No matter how confident the AI became, it could never deploy a policy. It could:
        </CaseStudyParagraph>
        <CaseStudyChips
          ariaLabel="What Policy Copilot could do before human approval"
          items={[
            "Understand intent",
            "Interpret requests",
            "Recommend actions",
            "Validate decisions",
            "Simulate impact",
            "Optimise policies",
          ]}
        />
        <CaseStudyParagraph>The final approval always belonged to the administrator.</CaseStudyParagraph>
        <CaseStudyParagraph className="!pb-4">
          That wasn&rsquo;t a technical limitation&mdash;it was a product principle. Enterprise
          security depends on accountability, so AI supports judgement, but people make the final
          decision.
        </CaseStudyParagraph>
        <CaseStudyWide className="!pb-10">
          <PolicyCopilotFinalApproval />
        </CaseStudyWide>
        <CaseStudyH2 className="!pt-4">The Real Product Was Confidence</CaseStudyH2>
        <CaseStudyParagraph>
          Looking back, I don&rsquo;t think the product we designed was a validation engine.
        </CaseStudyParagraph>
        <CaseStudyParagraph>It was confidence.</CaseStudyParagraph>
        <CaseStudyParagraph>
          Every interaction&mdash;from clarifying intent to explaining recommendations and simulating
          impact&mdash;helped administrators answer one simple question:
        </CaseStudyParagraph>
        <CaseStudyQuote>
          &ldquo;Do I understand this well enough to move forward?&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph className="!pb-8">
          Once they did, approving the policy became the easiest decision in the workflow.
        </CaseStudyParagraph>
        <CaseStudyH2 className="!pt-4 !pb-2">One Workspace. One Conversation.</CaseStudyH2>
        <CaseStudyParagraph>
          The most successful part of the experience wasn&rsquo;t any individual screen.
        </CaseStudyParagraph>
        <CaseStudyParagraph>It was the continuity.</CaseStudyParagraph>
        <CaseStudyParagraph>
          The original request stayed visible, every decision built on the last, and the entire
          workflow happened in one shared workspace.
        </CaseStudyParagraph>
        <CaseStudyParagraph className="!pb-8">
          By the time the policy was approved, it no longer felt AI-generated. It felt like a decision
          the administrator had made&mdash;with AI helping along the way.
        </CaseStudyParagraph>
        <CaseStudyDivider className="!mb-8" />
        <CaseStudyH2 className="!pt-4 !pb-6">What Changed — and Where I&rsquo;d Take It Next</CaseStudyH2>
        <CaseStudyWide className="!pb-8">
          <PolicyCopilotLookingBack />
        </CaseStudyWide>
        <CaseStudyFaq className="!pt-8 !pb-12" items={POLICY_COPILOT_FAQ_ITEMS} />
      </CaseStudyProse>
    </>
  );
}
