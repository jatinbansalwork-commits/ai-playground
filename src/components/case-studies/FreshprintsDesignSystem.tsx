"use client";

import { CaseStudyBento } from "@/components/case-studies/case-study-bento";
import { CaseStudyBeforeAfter } from "@/components/case-studies/case-study-before-after";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { CaseStudyMedia } from "@/components/case-studies/case-study-media";
import {
  CaseStudyH2,
  CaseStudyInfo,
  CaseStudyChips,
  CaseStudyList,
  CaseStudyParagraph,
  CaseStudyProse,
  CaseStudyQuote,
  CaseStudyLabel,
  CaseStudySection,
  CaseStudySubsection,
  CaseStudyWide,
} from "@/components/case-studies/case-study-prose";
import { CaseStudySummaryCards } from "@/components/case-studies/case-study-summary-cards";
import { CASE_STUDY_CDN_MEDIA } from "@/lib/asset-cdn";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "freshprints-design-system";

export default function FreshprintsDesignSystemContent() {
  const content = getCaseStudyContent(SLUG)!;

  return (
    <>
      <header className="case-study-editorial-intro">
          <CaseStudyHero
            title={content.title}
            year={content.year}
            meta={content.meta}
            tagline="Fewer debates • Faster delivery • Dev-rated 4.4/5 for speed & efficiency • Shared UX standards"
          />

          <CaseStudySummaryCards
            heading={
              <>
                A design system that stopped UI debates and helped 4 product teams{" "}
                <em className="italic">ship faster</em>.
              </>
            }
            cards={[
              {
                title: "Problems",
                variant: "problems",
                imageSrc: CASE_STUDY_CDN_MEDIA["freshprints-design-system-summary-problems"],
                imageAlt:
                  "Problems — UI decisions re-debated, library blocked progress, inconsistencies slowed delivery",
              },
              {
                title: "Solution",
                variant: "solution",
                imageSrc: CASE_STUDY_CDN_MEDIA["freshprints-design-system-summary-solution"],
                imageAlt:
                  "Solution — rebuilt the system, defined tokens patterns and rules, focused on adoption",
              },
              {
                title: "Results",
                variant: "results",
                imageSrc: CASE_STUDY_CDN_MEDIA["freshprints-design-system-summary-results"],
                imageAlt:
                  "Results — adopted by 4 product pods, 4.4/5 rating, fewer UI debates, systemic UX improvements",
              },
            ]}
          />
        </header>

        <CaseStudySection variant="major">
          <CaseStudyWide className="case-study-editorial-gallery">
            <CaseStudyBento
              columns={2}
              cells={[
                {
                  label: "FreshPrints design system overview — slot 1",
                  aspect: "square",
                  borderless: true,
                  rounded: "rounded-[24px]",
                  src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-gallery-m2"],
                  alt: "FreshPrints design system overview",
                },
                {
                  label: "FreshPrints design system overview — slot 2",
                  aspect: "square",
                  borderless: true,
                  rounded: "rounded-[24px]",
                  src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-gallery-m1"],
                  alt: "FreshPrints design system overview",
                },
              ]}
            />
            <CaseStudyMedia
              aspect="natural"
              borderless
              rounded="rounded-[24px]"
              src={CASE_STUDY_CDN_MEDIA["freshprints-design-system-gallery-ds"]}
              alt="FreshPrints design system overview"
            />
            <CaseStudyBento
              columns={3}
              cells={[
                {
                  label: "FreshPrints design system overview — slot 3",
                  aspect: "square",
                  borderless: true,
                  src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-gallery-component"],
                  alt: "FreshPrints design system overview",
                },
                {
                  label: "FreshPrints design system overview — slot 4",
                  aspect: "square",
                  borderless: true,
                  rounded: "rounded-[24px]",
                  src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-gallery-mob"],
                  alt: "FreshPrints design system overview",
                },
                {
                  label: "FreshPrints design system overview — slot 5",
                  aspect: "square",
                  borderless: true,
                  src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-gallery-avatar"],
                  alt: "FreshPrints design system overview",
                },
              ]}
            />
          </CaseStudyWide>
        </CaseStudySection>

        <CaseStudyProse>
          <CaseStudySection variant="major">
            <CaseStudyLabel>Setting the Scene</CaseStudyLabel>
            <CaseStudyH2>
              The product looked fine. Until you tried to build anything in it.
            </CaseStudyH2>
            <CaseStudyParagraph>
              Every UI decision turned into a discussion. The component library existed, but it
              was too limited to be useful and too rigid to evolve.
            </CaseStudyParagraph>
            <CaseStudyQuote>
              &ldquo;If it&apos;s not in the library, we don&apos;t build it.&rdquo;
            </CaseStudyQuote>
            <CaseStudyParagraph>
              This was the default answer to most things. So teams either argued, hacked
              around it, or shipped poor UX. As a surprise to no one, delivery slowed,
              issues piled up.
            </CaseStudyParagraph>
            <CaseStudyParagraph>
              This was the state of the product when I joined. It was clear this
              wouldn&apos;t be sustainable. So I pushed for a proper design system, one that
              teams could actually use. It wasn&apos;t an easy sell, but over time the need
              became obvious.
            </CaseStudyParagraph>
            <CaseStudyParagraph>
              Eventually, we formed a small team: two FE developers (web and mobile) and I
              (design)
            </CaseStudyParagraph>
            <CaseStudyMedia
              aspect="natural"
              borderless
              rounded="rounded-[24px]"
              src={CASE_STUDY_CDN_MEDIA["freshprints-design-system-team"]}
              alt="FreshPrints design system team"
            />
          </CaseStudySection>
        </CaseStudyProse>

        <CaseStudySection variant="major">
          <CaseStudyProse>
            <CaseStudyLabel>Constraints</CaseStudyLabel>
            <CaseStudyH2>
              With no full-time DS team, I chose speed and adoption over purity.
            </CaseStudyH2>
            <CaseStudyParagraph>
              No one was working on the system full-time, so aiming for a
              &ldquo;perfect&rdquo; system wasn&apos;t realistic. For us, the biggest goal
              was adoption, and that meant making trade-offs.
            </CaseStudyParagraph>
            <CaseStudyParagraph>
              I worked closely with developers to accelerate setup. Instead of building
              everything from scratch, we agreed to use existing foundations and align the
              UI to our brand, rather than reworking component logic.
            </CaseStudyParagraph>
            <CaseStudyParagraph>
              We landed on: WebAwesome for Angular and Material 3 for Flutter. This meant
              accepting some inconsistencies across platforms. To keep the system manageable,
              we set a few clear rules:
            </CaseStudyParagraph>
            <CaseStudyList
              highlight
              items={[
                "Add a component only if at least two teams need it",
                "Build for current needs, not hypothetical ones",
              ]}
            />
            <CaseStudyParagraph>
              This reduced complexity for developers and sped up their work a lot.
            </CaseStudyParagraph>
          </CaseStudyProse>

          <CaseStudyWide>
            <CaseStudyMedia
              aspect="natural"
              borderless
              rounded="rounded-[24px]"
              src={CASE_STUDY_CDN_MEDIA["freshprints-design-system-constraints"]}
              alt="FreshPrints design system constraints"
            />
          </CaseStudyWide>
        </CaseStudySection>

        <CaseStudySection variant="major">
          <CaseStudyProse>
            <CaseStudyLabel>The Foundations</CaseStudyLabel>
            <CaseStudyH2>Setting up a solid token structure.</CaseStudyH2>
            <CaseStudyParagraph>
              We built the system on an Atomic Design approach, supported by a shared token
              system between Figma and code.
            </CaseStudyParagraph>
            <CaseStudyParagraph>
              I set up tokens for color, typography, spacing, radii, and heights and I defined
              a three-layer token structure:
            </CaseStudyParagraph>
            <CaseStudyList
              items={[
                "Primitive: raw values",
                "Semantic: meaning-based tokens",
                "Component: specific overrides when needed",
              ]}
            />
            <CaseStudyParagraph>
              It was a pain to set up, but it saved us many times down the line 🥲
            </CaseStudyParagraph>
            <CaseStudyInfo>
              This token structure made dark mode and multi-brand theming a piece of cake.
            </CaseStudyInfo>
          </CaseStudyProse>

          <CaseStudyWide>
            <CaseStudyMedia
              aspect="natural"
              borderless
              rounded="rounded-[24px]"
              src={CASE_STUDY_CDN_MEDIA["freshprints-design-system-foundation-tokens"]}
              alt="FreshPrints design system token structure"
            />
          </CaseStudyWide>
        </CaseStudySection>

        <CaseStudySection variant="major">
          <CaseStudyProse>
            <CaseStudyH2>Iconography</CaseStudyH2>
            <CaseStudyParagraph>Icons were a huge topic for us.</CaseStudyParagraph>
            <CaseStudyParagraph>
              The previous icons had no unified style and were just jammed together, so I knew
              they had to be reworked. We decided to adopt Google&apos;s Material Icons (rounded)
              as a base, due to its extensive library and clean look. However, that wasn&apos;t
              enough, our product is very domain specific so we had to integrate many icons, down
              the line.
            </CaseStudyParagraph>
            <CaseStudyParagraph>
              We created about 80 custom icons by hand through the design system&apos;s lifecycle.
            </CaseStudyParagraph>
          </CaseStudyProse>

          <CaseStudyWide>
            <CaseStudyBento
              columns={2}
              cells={[
                {
                  label: "FreshPrints design system icons — slot 1",
                  aspect: "square",
                  borderless: true,
                  src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-icons-grid"],
                  alt: "FreshPrints design system custom icons",
                },
                {
                  label: "FreshPrints design system icons — slot 2",
                  aspect: "square",
                  borderless: true,
                  src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-icons-guide"],
                  alt: "FreshPrints design system icon guide",
                },
              ]}
            />
          </CaseStudyWide>

          <CaseStudyWide>
            <CaseStudyBeforeAfter
              beforeSrc={CASE_STUDY_CDN_MEDIA["freshprints-design-system-icons-after"]}
              beforeAlt="FreshPrints icons — before"
              afterSrc={CASE_STUDY_CDN_MEDIA["freshprints-design-system-icons-before"]}
              afterAlt="FreshPrints icons — after"
              aspect="natural"
              rounded="rounded-[24px]"
            />
          </CaseStudyWide>
        </CaseStudySection>

        <CaseStudySection variant="major">
          <CaseStudyProse>
            <CaseStudySubsection>
              <CaseStudyLabel>Systemic fixes</CaseStudyLabel>
              <CaseStudyH2>Making good UX the default</CaseStudyH2>
              <CaseStudyParagraph>
                At the same time, I used the system to fix long-standing UX issues; without turning
                each one into a debate. Instead of proposing isolated improvements (which usually get
                deprioritised), I embedded them directly into the foundation.
              </CaseStudyParagraph>
              <CaseStudyList
                items={[
                  "Accessibility by default: color tokens were set so text and surface combinations consistently pass WCAG AA or APCA contrast.",
                  "Usable touch targets: all interactive elements meet a minimum of 44px, even when visually smaller",
                  "Safer interactions: introduced proper destructive actions, previously missing from the library",
                ]}
              />
              <CaseStudyParagraph>
                This way, teams didn&apos;t have to &ldquo;opt in&rdquo; to better UX. It came built
                into the system.
              </CaseStudyParagraph>
            </CaseStudySubsection>
          </CaseStudyProse>

          <CaseStudyWide>
            <CaseStudyMedia
              aspect="natural"
              borderless
              rounded="rounded-[24px]"
              src={CASE_STUDY_CDN_MEDIA["freshprints-design-system-ux-good"]}
              alt="FreshPrints design system systemic UX fixes"
            />
          </CaseStudyWide>

          <CaseStudyWide>
            <CaseStudyBento
              columns={2}
              className="md:gap-12"
              cells={[
                {
                  label: "FreshPrints design system UX fixes — slot 1",
                  aspect: "square",
                  borderless: true,
                  src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-ux-chips"],
                  alt: "FreshPrints design system UX fixes — chips",
                },
                {
                  label: "FreshPrints design system UX fixes — slot 2",
                  aspect: "square",
                  borderless: true,
                  src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-ux-overlap"],
                  alt: "FreshPrints design system UX fixes — overlap",
                },
              ]}
            />
          </CaseStudyWide>

          <CaseStudyProse>
            <CaseStudySubsection>
              <CaseStudyParagraph>
                The rest of the UX improvements were covered by individual components and strict
                patterns.
              </CaseStudyParagraph>
              <CaseStudyLabel>Design patterns</CaseStudyLabel>
              <CaseStudyH2>Reducing design guesswork by defining clear patterns.</CaseStudyH2>
              <CaseStudyParagraph>
                Once we had a solid base of components, I focused on patterns. I audited other
                design systems and products (via Mobbin) to define clear guidelines for recurring
                problems, areas with no single &ldquo;correct&rdquo; solution that were causing
                inconsistency and unnecessary debate.
              </CaseStudyParagraph>
              <CaseStudyParagraph>I focused on:</CaseStudyParagraph>
              <CaseStudyChips
                ariaLabel="Design pattern focus areas"
                items={[
                  "Action hierarchy and button placement",
                  "Destructive actions",
                  "Feedback and system states",
                  "Tables: filtering, sorting, bulk actions",
                  "Forms and validation",
                  "Containers by use case",
                ]}
              />
            </CaseStudySubsection>
          </CaseStudyProse>

          <CaseStudyWide>
            <CaseStudyMedia
              aspect="natural"
              borderless
              rounded="rounded-[24px]"
              src={CASE_STUDY_CDN_MEDIA["freshprints-design-system-patterns"]}
              alt="FreshPrints design system patterns"
            />
          </CaseStudyWide>
        </CaseStudySection>

        <CaseStudySection variant="major">
          <CaseStudyProse>
            <CaseStudyLabel>Full workflow</CaseStudyLabel>
            <CaseStudyH2>From Figma to production</CaseStudyH2>
            <CaseStudyParagraph>
              Any designer working on a DS knows it&apos;s only as good as the frontend dev
              building it, luckily, we had two strong ones. To make this work, through Supernova,
              we connected the design system to Storybook and Widgetbook, which became the single
              source of truth for developers.
            </CaseStudyParagraph>
            <CaseStudyParagraph>Later, we pushed it a bit further.</CaseStudyParagraph>
            <CaseStudyParagraph>
              Using Figma&apos;s Code Connect and MCP servers, we made the system easier to use
              in AI-assisted code generation.
            </CaseStudyParagraph>
            <CaseStudyParagraph>My role here was support:</CaseStudyParagraph>
            <CaseStudyList
              items={[
                "aligning naming conventions with code standards",
                "adjusting variants to match component props",
              ]}
            />
          </CaseStudyProse>

          <CaseStudyWide>
            <CaseStudyMedia
              aspect="natural"
              borderless
              src={CASE_STUDY_CDN_MEDIA["freshprints-design-system-workflow"]}
              alt="FreshPrints design system workflow — Figma to production"
            />
          </CaseStudyWide>
        </CaseStudySection>

        <CaseStudySection variant="major">
          <CaseStudyProse>
            <CaseStudyLabel>Documentation and enforcement</CaseStudyLabel>
            <CaseStudyParagraph>
              Documentation alone wasn&apos;t enough to drive adoption.
            </CaseStudyParagraph>
            <CaseStudyParagraph>
              I initially thought that once we put out solid guidelines, things would naturally
              fall into place, but no one really reads documentation. Shocker.
            </CaseStudyParagraph>
            <CaseStudyParagraph>
              To make the system stick, I had to be more proactive. During design reviews, I pushed
              for proper use of components and patterns and encouraged fellow designers to follow
              the system more closely. It felt a bit uncomfortable at first, but over time these
              patterns became the default.
            </CaseStudyParagraph>
            <CaseStudyParagraph>
              On the dev side, the frontend team supported adoption by running workshops on Figma
              Dev Mode to help other devs get familiar with the system.
            </CaseStudyParagraph>
          </CaseStudyProse>

          <CaseStudyWide>
            <CaseStudyMedia
              aspect="natural"
              borderless
              src={CASE_STUDY_CDN_MEDIA["freshprints-design-system-chat"]}
              alt="FreshPrints design system documentation and enforcement"
            />
          </CaseStudyWide>
        </CaseStudySection>

        <CaseStudySection variant="major">
          <CaseStudyProse>
            <CaseStudyLabel>Results</CaseStudyLabel>
            <CaseStudyH2>Things shipped faster, and with less friction</CaseStudyH2>
            <CaseStudyParagraph>
              A design system is never &ldquo;done,&rdquo; but within six months we saw clear impact.
              It was adopted by 4 product pods, and developers reported faster delivery, rating it
              4.4/5 on average for speed and efficiency. In some cases, work that used to take a
              week was done in a day.
            </CaseStudyParagraph>
            <CaseStudyParagraph>
              At the same time, alignment and QA effort dropped significantly, since many
              inconsistencies were handled upfront by the system. Stakeholders also noticed, praising
              speed and calling the UI cleaner and more modern. The system has since also attracted
              interest from other companies within the group.
            </CaseStudyParagraph>
          </CaseStudyProse>

          <CaseStudyWide>
            <CaseStudyBento
              columns={3}
              cells={[
                {
                  label: "FreshPrints design system results — slot 1",
                  aspect: "square",
                  shellBackground: "#ffffff",
                  src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-results-average"],
                  alt: "FreshPrints design system — average rating for speed and efficiency",
                },
                {
                  label: "FreshPrints design system results — slot 2",
                  aspect: "square",
                  shellBackground: "#ffffff",
                  src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-results-alignment"],
                  alt: "FreshPrints design system — alignment and QA effort",
                },
                {
                  label: "FreshPrints design system results — slot 3",
                  aspect: "square",
                  shellBackground: "#ffffff",
                  src: CASE_STUDY_CDN_MEDIA["freshprints-design-system-results-systemic"],
                  alt: "FreshPrints design system — systemic UX improvements",
                },
              ]}
            />
          </CaseStudyWide>
        </CaseStudySection>

        <CaseStudyProse>
          <CaseStudySection variant="major">
            <CaseStudyLabel>Learnings</CaseStudyLabel>
            <CaseStudyParagraph>
              Most design problems aren&apos;t actually design problems but alignment problems.
            </CaseStudyParagraph>
            <CaseStudyParagraph>
              Once decisions were clearly defined in the system, a lot of friction disappeared.
              Teams spent less time debating small details, fewer inconsistencies reached development,
              and work moved faster.
            </CaseStudyParagraph>
          </CaseStudySection>
        </CaseStudyProse>
    </>
  );
}
