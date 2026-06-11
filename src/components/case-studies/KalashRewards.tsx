"use client";

import { CaseStudyBento } from "@/components/case-studies/case-study-bento";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { CaseStudyMedia } from "@/components/case-studies/case-study-media";
import {
  CaseStudyH2,
  CaseStudyH3,
  CaseStudyList,
  CaseStudyParagraph,
  CaseStudyProse,
  CaseStudyQuote,
  CaseStudySubheading,
  CaseStudyWide,
  CaseStudyYear,
} from "@/components/case-studies/case-study-prose";
import { CASE_STUDY_CDN_MEDIA } from "@/lib/asset-cdn";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "kalash-rewards";

export default function KalashRewardsContent() {
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
          src={CASE_STUDY_CDN_MEDIA["kalash-rewards-hero"]}
          alt="Kalash Your New Gold overview"
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudyYear>PROJECT OVERVIEW</CaseStudyYear>
        <CaseStudyH2>Our Goal</CaseStudyH2>
        <CaseStudyParagraph>
          Drive better financial decisions through building trust, friendly
          design & delight from feature adoption & retention.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          aspect="natural"
          src={CASE_STUDY_CDN_MEDIA["kalash-rewards-k1"]}
          alt="Kalash Your New Gold"
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudyH2>Why were Indians still saving offline?</CaseStudyH2>
        <CaseStudyParagraph>
          People had already become comfortable using UPI for daily payments like
          groceries, food delivery, and bills. But when it came to savings, trust
          worked differently.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Users still preferred traditional methods like physical gold, cash savings,
          or recurring deposits because digital investing felt unfamiliar, risky, or
          too complicated to understand.
        </CaseStudyParagraph>

        <div className="border-t border-neutral-800/40 pt-6" role="separator" />

        <CaseStudyH2>One user during testing described it simply:</CaseStudyH2>
        <CaseStudyQuote>
          &ldquo;Saving money in digital gold feels more serious.&rdquo;
        </CaseStudyQuote>
        <CaseStudyParagraph>
          That insight became the foundation of the experience. The challenge
          wasn&apos;t only onboarding users into an app. It was helping
          first-time investors feel confident enough to start saving digitally in
          the first place.
        </CaseStudyParagraph>

        <CaseStudyH2>Many users didn&apos;t fully understand:</CaseStudyH2>
        <CaseStudyList
          items={[
            "How digital gold worked",
            "Whether their money was actually safe",
            "Why small digital savings could become valuable over time",
          ]}
        />
      </CaseStudyProse>

      <CaseStudyProse>
        <CaseStudyH2>What did I do</CaseStudyH2>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyBento
          columns={3}
          cells={[
            {
              label: "How digital gold worked",
              caption:
                "Explored multiple onboarding directions through rapid Figma iterations",
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["kalash-rewards-p1"],
              alt: "Kalash onboarding exploration",
            },
            {
              label: "Whether their money was actually safe",
              caption:
                "Worked closely with product, engineering, and founders to simplify the saving experience",
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["kalash-rewards-p2"],
              alt: "Kalash saving experience simplification",
            },
            {
              label: "Why small digital savings could become valuable over time",
              caption:
                "Tested different ways to build trust inside a financial product",
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["kalash-rewards-p3"],
              alt: "Kalash trust-building explorations",
            },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyWide>
        <CaseStudyBento
          columns={3}
          cells={[
            {
              label: "Onboarding direction one",
              caption:
                "Turned complex investing concepts into simple, approachable flows",
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["kalash-rewards-p4"],
              alt: "Kalash approachable investing flows",
            },
            {
              label: "Onboarding direction two",
              caption: "Obsessed over small interaction details",
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["kalash-rewards-p5"],
              alt: "Kalash interaction details",
            },
            {
              label: "Onboarding direction three",
              caption: "And yes… a lot of Product design",
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["kalash-rewards-p6"],
              alt: "Kalash product design work",
            },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudyParagraph>What I actually worked on</CaseStudyParagraph>
        <CaseStudyParagraph>
          Product Design · UX Design · Interaction Design · Onboarding
          Experience · Design Systems · Concept Development · Prototyping · User
          Flows · Micro-interactions · Growth & Retention Thinking
        </CaseStudyParagraph>
        <CaseStudySubheading>
          But why should I trust Kalash & why digital gold?
        </CaseStudySubheading>
        <CaseStudyH3>Why Invest in Gold?</CaseStudyH3>
        <CaseStudyParagraph>
          Many users already trusted gold as a way to save money, but they were
          unsure how digital gold actually worked. So instead of showing
          complicated financial data, we explained things in a simple and
          familiar way. We used easy-to-read graphs, short insights, and
          historical gold trends to help users understand why gold can be a
          strong long-term savings option.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          aspect="natural"
          src={CASE_STUDY_CDN_MEDIA["kalash-rewards-k3"]}
          alt="Why invest in gold"
        />
      </CaseStudyWide>

      <div className="w-full space-y-8">
        <CaseStudyProse>
          <CaseStudyH2>Trust and safety before anything else</CaseStudyH2>
          <CaseStudyParagraph dense>
            Saving money is emotional. Before users invest, they first need to
            feel that their money is safe. Many people were trying digital gold
            for the first time, so trust became one of the most important parts
            of the experience.
          </CaseStudyParagraph>
        </CaseStudyProse>

        <CaseStudyWide>
          <CaseStudyMedia
            aspect="natural"
            borderless
            src={CASE_STUDY_CDN_MEDIA["kalash-rewards-k10"]}
            alt="Kalash gold trends detail"
          />
        </CaseStudyWide>
      </div>

      <CaseStudyProse>
        <CaseStudyParagraph>
          Many users already trusted gold as a way to save money, but they were
          unsure how digital gold actually worked. So instead of showing
          complicated financial data, we explained things in a simple and familiar
          way.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          aspect="natural"
          src={CASE_STUDY_CDN_MEDIA["kalash-rewards-k8"]}
          alt="Kalash digital gold explanation"
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudyH2>Making investing fun</CaseStudyH2>
        <CaseStudyParagraph>
          We created engaging feature that kept the users excited and not
          overwhelmed by money.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          aspect="natural"
          label="Gamification"
          src={CASE_STUDY_CDN_MEDIA["kalash-rewards-k14"]}
          alt="Making investing fun"
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudyH2>Uncomplicated Investing</CaseStudyH2>
        <CaseStudyParagraph>
          Financial jargon and information is often tough to read. We switched
          the complicated terms with easy-to-understand terms and moulded the
          data into easy-to-read graphs and visual cues which the user could
          read, absorb and understand easily.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyBento
          cells={[
            {
              label: "Uncomplicated investing detail",
              aspect: "natural",
              span: "full",
              src: CASE_STUDY_CDN_MEDIA["kalash-rewards-k17"],
              alt: "Uncomplicated investing detail",
            },
          ]}
        />
      </CaseStudyWide>
    </div>
  );
}
