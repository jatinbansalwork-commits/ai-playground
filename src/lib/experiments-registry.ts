import { CRAFT_PREVIEW } from "@/lib/craft-colors";
import { ROUTES, SITE_NAME } from "@/lib/constants";
import type { CraftSection } from "@/lib/craft-content";
import { getArticleExcerptText } from "@/lib/craft-content";
import type { CraftArticleSection } from "@/lib/craft-content";
import type { ExperimentCategory } from "@/lib/experiments-filters";
import {
  getExperimentsFilterLabel,
  getExperimentsGalleryHref,
} from "@/lib/experiments-filters";
import type { ExperimentMedia } from "@/lib/experiment-media";
import { EXPERIMENT_CDN_MEDIA } from "@/lib/asset-cdn";

type ExperimentMediaInput =
  | string
  | (ExperimentMedia & { src: string })
  | Partial<Record<ExperimentCategory, string | ExperimentMedia>>;

export interface ExperimentArticleSection extends CraftArticleSection {}

export interface ExperimentRegistryEntry {
  /** URL-safe id — also used for media filenames and article routes. */
  slug: string;
  /** Sandbox label shown on the card. */
  title: string;
  /**
   * Filter tabs this card appears on.
   * article · ai-experiment · illustration · motion-graphic
   */
  categories: ExperimentCategory[];
  /**
   * Preview media — live Vercel Blob CDN URLs from `EXPERIMENT_CDN_MEDIA`.
   */
  media?: ExperimentMediaInput;
  /** Essay page content — enables "Read Essay" when present. */
  article?: {
    date?: string;
    sections: ExperimentArticleSection[];
  };
  external?: boolean;
  href?: string;
}

/** Lightweight row consumed by the /craft bento grid — not shared with projects. */
export interface ExperimentGalleryItem {
  slug: string;
  title: string;
  date: string;
  external?: boolean;
  href?: string;
}

export const EXPERIMENTS_PAGE = {
  title: "Craft",
  description: "Interaction prototypes and interface studies.",
  href: ROUTES.craft,
} as const;

/**
 * ═══════════════════════════════════════════════════════════════════
 *  EXPERIMENTS REGISTRY — sandbox / creative prototypes only
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Professional case studies live in `projects-registry.ts`.
 *
 *  Categories control filter tabs + container shape:
 *    motion-graphic → 16:9 full width, no link, no CTA
 *    illustration   → 3:4 half width, no link, no CTA
 *    article        → 3:2 full width, Read Essay CTA
 *    ai-experiment  → 3:2 full width, Try Now CTA
 */
export const EXPERIMENTS_REGISTRY: ExperimentRegistryEntry[] = [
  {
    slug: "scroll-slider",
    title: "FriendCaptcha",
    categories: ["ai-experiment"],
    media: EXPERIMENT_CDN_MEDIA["scroll-slider"],
    external: true,
    href: "https://friend-captcha.vercel.app/",
  },
  {
    slug: "wireframe-mode",
    title: "Wireframe Mode",
    categories: ["illustration"],
    media: EXPERIMENT_CDN_MEDIA["wireframe-mode"],
  },
  {
    slug: "minimap-tracker",
    title: "Minimap Tracker",
    categories: ["motion-graphic"],
    media: EXPERIMENT_CDN_MEDIA["minimap-tracker"],
  },
  {
    slug: "clip-reveal",
    title: "Focus Mode",
    categories: ["ai-experiment", "motion-graphic"],
    media: EXPERIMENT_CDN_MEDIA["clip-reveal"],
    external: true,
    href: "https://focus-mode-ten.vercel.app/",
  },
  {
    slug: "spring-physics",
    title: "Miner Gift",
    categories: ["ai-experiment"],
    media: EXPERIMENT_CDN_MEDIA["spring-physics"],
    external: true,
    href: "https://miner-seven-rho.vercel.app/",
  },
  {
    slug: "ghost-spacer",
    title: "Lock in Police",
    categories: ["ai-experiment"],
    media: EXPERIMENT_CDN_MEDIA["ghost-spacer"],
    external: true,
    href: "https://lock-in-police.vercel.app/",
  },
  {
    slug: "click-sound",
    title: "DoodleLab",
    categories: ["ai-experiment"],
    media: EXPERIMENT_CDN_MEDIA["click-sound"],
    external: true,
    href: "https://doodlelab-ai.vercel.app/",
  },
  {
    slug: "illustration-gold-jar",
    title: "Gold Jar",
    categories: ["illustration"],
    media: EXPERIMENT_CDN_MEDIA["illustration-gold-jar"],
  },
  {
    slug: "illustration-ticket-mark",
    title: "Ticket Mark",
    categories: ["illustration"],
    media: EXPERIMENT_CDN_MEDIA["illustration-ticket-mark"],
  },
  {
    slug: "illustration-coin-stack",
    title: "Coin Stack",
    categories: ["illustration"],
    media: EXPERIMENT_CDN_MEDIA["illustration-coin-stack"],
  },
  {
    slug: "illustration-pass-stub",
    title: "Pass Stub",
    categories: ["illustration"],
    media: EXPERIMENT_CDN_MEDIA["illustration-pass-stub"],
  },
  {
    slug: "illustration-savings-vault",
    title: "Savings Vault",
    categories: ["illustration"],
    media: EXPERIMENT_CDN_MEDIA["illustration-savings-vault"],
  },
  {
    slug: "illustration-brand-ticket",
    title: "Brand Ticket",
    categories: ["illustration"],
    media: EXPERIMENT_CDN_MEDIA["illustration-brand-ticket"],
  },
  {
    slug: "illustration-8",
    title: "Illustration 8",
    categories: ["illustration"],
    media: EXPERIMENT_CDN_MEDIA["illustration-8"],
  },
  {
    slug: "illustration-9",
    title: "Illustration 9",
    categories: ["illustration"],
    media: EXPERIMENT_CDN_MEDIA["illustration-9"],
  },
  {
    slug: "motion-graphic-1",
    title: "Motion Graphic 1",
    categories: ["motion-graphic"],
    media: EXPERIMENT_CDN_MEDIA["motion-graphic-1"],
  },
  {
    slug: "motion-graphic-2",
    title: "Motion Graphic 2",
    categories: ["motion-graphic"],
    media: EXPERIMENT_CDN_MEDIA["motion-graphic-2"],
  },
  {
    slug: "motion-graphic-3",
    title: "Motion Graphic 3",
    categories: ["motion-graphic"],
    media: EXPERIMENT_CDN_MEDIA["motion-graphic-3"],
  },
  {
    slug: "motion-graphic-4",
    title: "Motion Graphic 4",
    categories: ["motion-graphic"],
    media: EXPERIMENT_CDN_MEDIA["motion-graphic-4"],
  },
  {
    slug: "motion-graphic-5",
    title: "Motion Graphic 5",
    categories: ["motion-graphic"],
    media: EXPERIMENT_CDN_MEDIA["motion-graphic-5"],
  },
  {
    slug: "motion-graphic-6",
    title: "Motion Graphic 6",
    categories: ["motion-graphic"],
    media: EXPERIMENT_CDN_MEDIA["motion-graphic-6"],
  },
  {
    slug: "motion-graphic-7",
    title: "Motion Graphic 7",
    categories: ["motion-graphic"],
    media: EXPERIMENT_CDN_MEDIA["motion-graphic-7"],
  },
  {
    slug: "motion-graphic-8",
    title: "Motion Graphic 8",
    categories: ["motion-graphic"],
    media: EXPERIMENT_CDN_MEDIA["motion-graphic-8"],
  },
  {
    slug: "motion-graphic-9",
    title: "Motion Graphic 9",
    categories: ["motion-graphic"],
    media: {
      src: EXPERIMENT_CDN_MEDIA["motion-graphic-9"],
      type: "video",
    },
  },
  {
    slug: "design-review-checklist",
    title: "Why We Introduced a Design Review Checklist",
    categories: ["article"],
    media: EXPERIMENT_CDN_MEDIA["design-review-checklist-cover"],
    article: {
      date: "May 2025",
      sections: [
        {
          id: "reviews-without-structure",
          title: "As Fresh Prints grew",
          blocks: [
            {
              type: "paragraph",
              text: "As Fresh Prints continued to grow, so did the complexity of our product ecosystem. More designers were contributing across multiple teams, new features were being launched faster, and maintaining consistency became increasingly challenging.",
            },
            {
              type: "paragraph",
              text: "To support this growth, we introduced a Design System—a shared foundation of components, typography, colours, spacing standards, and interaction patterns. The goal was simple: create a common language that would help designers build consistent experiences more efficiently. The Design System gave teams a clear set of standards. But after several review cycles, I noticed an important gap.",
            },
            {
              type: "image",
              src: "/Review%20Checklist/cover.png",
              alt: "Design system overview",
              aspect: "natural",
            },
            {
              type: "paragraph",
              text: "Even though designers had access to the right components and guidelines, many reviews were still uncovering the same issues:",
            },
            {
              type: "list",
              variant: "chips",
              items: [
                "Inconsistent spacing and layouts",
                "Missing empty and error states",
                "Accessibility concerns",
                "Incorrect component usage",
                "Unclear content hierarchy",
                "Design system standards being overlooked",
              ],
            },
            {
              type: "paragraph",
              text: "The issue wasn't a lack of knowledge. The issue was that as products become more complex, it's unrealistic to expect designers to remember every design principle, accessibility requirement, and system guideline during every project.",
            },
            {
              type: "paragraph",
              text: "That's when I realised something important:",
            },
            {
              type: "quote",
              text: "A Design System tells teams what to use. A Review System helps teams use it consistently.",
            },
          ],
        },
        {
          id: "what-the-checklist-covers",
          title: "The Inspiration",
          blocks: [
            {
              type: "paragraph",
              text: "While researching how mature design organisations maintain quality at scale, I noticed a common pattern. The best teams don't rely on memory. They rely on systems. Pilots use pre-flight checklists before takeoff. Surgeons use checklists before procedures. Engineers use deployment checklists before releasing software.",
            },
            {
              type: "paragraph",
              text: "Not because they lack expertise, but because consistency matters more than memory. That idea resonated deeply with me.",
            },
            {
              type: "paragraph",
              text: "Instead of treating design reviews as the place where quality issues were discovered, what if we could help designers identify those issues before the review even started?",
            },
            {
              type: "paragraph",
              text: "What if reviews could focus on product thinking rather than quality control?",
            },
          ],
        },
        {
          id: "designing-the-checklist",
          title: "Designing the Checklist",
          blocks: [
            {
              type: "image",
              src: "/Review%20Checklist/2.png",
              alt: "Design review checklist",
              aspect: "natural",
            },
            {
              type: "paragraph",
              text: "As we launched the Design System, I introduced a Design Review Checklist to act as a quality gate before any design entered formal review. The objective wasn't to add more process. The objective was to reduce review cycles, improve consistency, and create a shared definition of quality across the organisation.",
            },
            {
              type: "paragraph",
              text: "The checklist focused on recurring themes that frequently surfaced during reviews:",
            },
            {
              type: "checklist-table",
              categories: [
                {
                  title: "Design System Adoption",
                  questions: [
                    "Are approved components being used correctly?",
                    "Is spacing aligned with system standards?",
                    "Are typography styles applied consistently?",
                    "Are design tokens being used correctly?",
                  ],
                },
                {
                  title: "Accessibility",
                  questions: [
                    "Is information communicated through more than colour alone?",
                    "Does text meet contrast requirements?",
                    "Are interactive elements clearly identifiable?",
                  ],
                },
                {
                  title: "Content Quality",
                  questions: [
                    "Are labels and messaging clear?",
                    "Are empty states considered?",
                    "Are error states included?",
                  ],
                },
                {
                  title: "Experience Quality",
                  questions: [
                    "Have edge cases been addressed?",
                    "Is the user flow complete?",
                    "Can users clearly understand the next step?",
                  ],
                },
              ],
            },
            {
              type: "paragraph",
              text: "Instead of relying on memory, designers now had a simple framework to self-review their work.",
            },
            {
              type: "divider",
            },
            {
              type: "heading",
              text: "Building a Review Process Around the Checklist",
            },
            {
              type: "paragraph",
              text: "Creating the checklist was only the first step. For it to be successful, it needed to become part of the team's workflow. Rather than introducing another manual approval process, I designed a lightweight review system around it.",
            },
            {
              type: "paragraph",
              text: "Before requesting a design review, every designer would:",
            },
            {
              type: "process-steps",
              steps: [
                {
                  title: "Complete the Checklist",
                  body: [
                    {
                      type: "paragraph",
                      text: "Designers reviewed their work against the checklist and confirmed that each requirement had been addressed.",
                    },
                    {
                      type: "paragraph",
                      text: "This encouraged self-review and helped identify issues early in the process.",
                    },
                  ],
                },
                {
                  title: "Submit Through a Review Form",
                  body: [
                    {
                      type: "paragraph",
                      text: "Once completed, designers submitted their work through a Google Form.",
                    },
                    {
                      type: "paragraph",
                      text: "The submission included:",
                    },
                    {
                      type: "bullets",
                      items: [
                        "Designer Name",
                        "Team Name",
                        "Email Address",
                        "Link to Figma File",
                        "Brief Overview of the Feature or Flow",
                        "Completed Checklist (Y/N)",
                      ],
                    },
                    {
                      type: "paragraph",
                      text: "The overview section was particularly valuable because it provided reviewers with context before opening the design file.",
                    },
                    {
                      type: "paragraph",
                      text: "Instead of immediately jumping into screens, reviewers could understand:",
                    },
                    {
                      type: "bullets",
                      items: [
                        "What problem was being solved",
                        "Which users were impacted",
                        "What changes were introduced",
                        "Any important constraints or considerations",
                      ],
                    },
                    {
                      type: "image",
                      src: "/Review%20Checklist/5.png",
                      alt: "Google Form submission overview",
                      aspect: "natural",
                    },
                  ],
                },
                {
                  title: "Automated Submission Confirmation",
                  body: [
                    {
                      type: "paragraph",
                      text: "After submission, the designer received a confirmation email, ensuring there was clear visibility into the review process.",
                    },
                    {
                      type: "paragraph",
                      text: "This reduced uncertainty around review status and created a record of submissions.",
                    },
                  ],
                },
                {
                  title: "Design System Team Review",
                  body: [
                    {
                      type: "paragraph",
                      text: "A member of the Design System team would then review the submission.",
                    },
                    {
                      type: "paragraph",
                      text: "Their review focused on:",
                    },
                    {
                      type: "bullets",
                      items: [
                        "Design System compliance",
                        "Accessibility requirements",
                        "Consistency across patterns",
                        "Overall experience quality",
                      ],
                    },
                    {
                      type: "paragraph",
                      text: "Depending on the outcome, the submission would receive:",
                    },
                    {
                      type: "chips",
                      items: [
                        "Feedback for improvements",
                        "Requests for revisions",
                        "Final approval",
                      ],
                    },
                    {
                      type: "paragraph",
                      text: "This created a structured yet lightweight quality assurance process that scaled across teams without creating unnecessary bottlenecks.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "review-workflow",
          title: "The Review Workflow",
          blocks: [
            {
              type: "paragraph",
              text: "The final workflow looked like this:",
            },
            {
              type: "workflow-flow",
              steps: [
                "Design Exploration",
                "Self Review Using Checklist",
                "Google Form Submission",
                "Design System Team Review",
                "Feedback or Approval",
                "Design Handoff & Implementation",
              ],
            },
            {
              type: "paragraph",
              text: "By introducing this process, quality became part of the workflow instead of being dependent on individual reviewers.",
            },
          ],
        },
        {
          id: "what-changed",
          title: "What Changed",
          blocks: [
            {
              type: "paragraph",
              text: "The impact became visible within a few review cycles. Design reviews became more focused and productive.",
            },
            {
              type: "paragraph",
              text: "Instead of spending time identifying basic issues such as spacing inconsistencies, accessibility gaps, or missing states, conversations shifted toward more strategic topics:",
            },
            {
              type: "list",
              variant: "chips",
              items: [
                "User behaviour",
                "Product decisions",
                "Business goals",
                "Trade-offs",
                "Experiment opportunities",
              ],
            },
            {
              type: "paragraph",
              text: "The checklist also created a shared understanding of what \"review ready\" meant. New designers onboarded faster because expectations were documented. Teams became more confident in their submissions. The Design System gained stronger adoption because designers were actively validating their work against it.",
            },
            {
              type: "paragraph",
              text: "Most importantly, quality became more consistent across teams. Not because reviewers worked harder. But because the process made quality easier to achieve.",
            },
            {
              type: "image",
              src: "/Review%20Checklist/Screenshot%202026-06-16%20at%2010.14.28%E2%80%AFAM.png",
              alt: "Design review checklist impact",
              aspect: "natural",
            },
          ],
        },
        {
          id: "the-bigger-lesson",
          title: "Lessons Learned",
          blocks: [
            {
              type: "paragraph",
              text: "One of the biggest lessons from this initiative was that Design Systems alone don't create consistency.",
            },
            {
              type: "paragraph",
              text: "People, processes, and habits create consistency. The Design System provided the building blocks. The Review Checklist provided accountability. The Review Workflow ensured adoption. Together, they formed a scalable quality framework that helped FreshPrints maintain design excellence as the organisation continued to grow.",
            },
            {
              type: "paragraph",
              text: "And while users never saw the checklist itself, they experienced its impact every time they interacted with a more consistent, accessible, and thoughtfully designed product. Sometimes the most valuable design work isn't designing another screen. It's designing the systems that help an entire team create better experiences.",
            },
          ],
        },
      ],
    },
  },
];

/** Slugs in gallery order — derived from registry. */
export const EXPERIMENT_SLUG_ORDER = EXPERIMENTS_REGISTRY.map(
  (entry) => entry.slug,
);

export function getExperimentRegistryEntry(
  slug: string,
): ExperimentRegistryEntry | undefined {
  return EXPERIMENTS_REGISTRY.find((entry) => entry.slug === slug);
}

export function getExperimentCategories(slug: string): ExperimentCategory[] {
  return getExperimentRegistryEntry(slug)?.categories ?? ["ai-experiment"];
}

export function getExperimentGalleryItems(): ExperimentGalleryItem[] {
  return EXPERIMENTS_REGISTRY.map((entry) => ({
    slug: entry.slug,
    title: entry.title,
    date: entry.article?.date ?? "",
    external: entry.external,
    href: entry.href,
  }));
}

export function getExperimentArticleSlugs(): string[] {
  return EXPERIMENTS_REGISTRY.filter((entry) => entry.article).map(
    (entry) => entry.slug,
  );
}

export function hasExperimentArticle(slug: string): boolean {
  return Boolean(getExperimentRegistryEntry(slug)?.article);
}

export function getExperimentArticleExcerpt(slug: string, maxLength = 180): string {
  const article = getExperimentArticle(slug);
  if (!article) return "";
  return getArticleExcerptText(article.sections, maxLength);
}

export function getExperimentArticle(slug: string) {
  const entry = getExperimentRegistryEntry(slug);
  if (!entry?.article) return undefined;

  return {
    slug: entry.slug,
    title: entry.title,
    date: entry.article.date,
    sections: entry.article.sections,
  };
}

export function getAdjacentExperimentArticles(slug: string) {
  const slugs = getExperimentArticleSlugs();
  const index = slugs.indexOf(slug);

  return {
    prev: index > 0 ? slugs[index - 1]! : null,
    next: index >= 0 && index < slugs.length - 1 ? slugs[index + 1]! : null,
  };
}

/** Section shell for experiment essay pages — isolated from craft/projects. */
export function getExperimentsArticleSection(): CraftSection {
  return {
    id: "experiments",
    title: EXPERIMENTS_PAGE.title,
    href: EXPERIMENTS_PAGE.href,
    backHref: ROUTES.home,
    backLabel: "Home",
    description: EXPERIMENTS_PAGE.description,
    items: getExperimentGalleryItems().map((item) => ({
      ...item,
      previewClass: CRAFT_PREVIEW.grayMid,
    })),
    articles: Object.fromEntries(
      getExperimentArticleSlugs()
        .map((slug) => {
          const article = getExperimentArticle(slug);
          return article ? [slug, article] : null;
        })
        .filter((entry): entry is [string, NonNullable<ReturnType<typeof getExperimentArticle>>] =>
          entry !== null,
        ),
    ),
  };
}

export const EXPERIMENTS_METADATA = {
  title: `${EXPERIMENTS_PAGE.title} · ${SITE_NAME}`,
  description: EXPERIMENTS_PAGE.description,
} as const;
