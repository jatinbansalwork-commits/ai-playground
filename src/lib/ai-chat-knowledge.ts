import {
  CONTACT_EMAIL,
  CONTACT_LINKS,
  HERO_COPY,
  MANIFEST_LINES,
  ROUTES,
} from "@/lib/constants";
import { EXPERIMENTS_PAGE, EXPERIMENTS_REGISTRY } from "@/lib/experiments-registry";
import { PROJECTS_LIST } from "@/lib/projects-list-data";
import { PROJECTS_PAGE } from "@/lib/projects-registry";
import { getCaseStudyContent } from "@/lib/project-content";
import { buildCareerKnowledgeSection } from "@/lib/ai-chat-career-knowledge";

interface CaseStudyChatMeta {
  bestFor: string;
  outcome?: string;
}

/** Curated routing tags — keep in sync with public projects on `/projects`. */
const CASE_STUDY_CHAT_META: Partial<Record<string, CaseStudyChatMeta>> = {
  "freshprints-design-system": {
    bestFor: "Design systems, UI architecture, documentation, scaling design orgs",
    outcome: "Built a scalable design system from 0→1 for a growing e-commerce platform.",
  },
  "freshprints-image-gen-ai": {
    bestFor: "Generative AI, prompt flows, asset review, shipped MVP",
    outcome: "Generative image tooling and review interfaces for creator workflows.",
  },
  "saltbot-ai-saltmine": {
    bestFor: "AI UX, conversational analytics, enterprise reporting, guardrails",
    outcome: "Report analytics in ~5 seconds — no spreadsheets or complex navigation.",
  },
  "kalash-rewards": {
    bestFor: "Fintech B2C, rewards, branding, motion, product strategy",
    outcome: "Digital gold savings for 1M+ users — daily, weekly, and monthly plans from ₹10.",
  },
  "kalash-year-end-recap": {
    bestFor: "Growth, personalisation, year-in-review, delight",
    outcome: "Turns a year of transactions into a personalised recap that motivates retention.",
  },
  "piggy-reduced-mutual-fund-support-tickets": {
    bestFor: "Fintech, UX research, support reduction, mutual funds",
    outcome: "Reduced mutual fund support tickets by 19% through clearer flows and UX research.",
  },
};

const CRAFT_HIGHLIGHT_SLUGS = [
  "design-review-checklist",
  "scroll-slider",
  "clip-reveal",
  "wireframe-mode",
  "minimap-tracker",
  "spring-physics",
] as const;

const CRAFT_HIGHLIGHT_BLURBS: Partial<Record<string, string>> = {
  "design-review-checklist":
    "Essay on introducing a design review checklist alongside a design system at FreshPrints.",
  "scroll-slider": "FriendCaptcha — AI experiment (external demo).",
  "clip-reveal": "Focus Mode — interaction prototype (external demo).",
  "wireframe-mode": "Wireframe Mode — toggle on the index slider for layout debug.",
  "minimap-tracker": "Minimap tracker motion study for the index slider.",
  "spring-physics": "Miner Gift — spring-physics AI experiment (external demo).",
};

function formatCaseStudyLine(slug: string, title: string, year: string): string {
  const content = getCaseStudyContent(slug);
  const overview = content?.overviewText ?? "";
  const services =
    content?.meta.services.length ? content.meta.services.join(", ") : "";
  const client = content?.meta.client ?? "";
  const meta = CASE_STUDY_CHAT_META[slug];
  const parts = [
    `- **${title}** (${year})`,
    meta?.bestFor ? `  - Best for: ${meta.bestFor}` : "",
    meta?.outcome ? `  - Outcome: ${meta.outcome}` : "",
    services ? `  - Services: ${services}` : "",
    client ? `  - Client: ${client}` : "",
    overview ? `  - Summary: ${overview}` : "",
    `  - Link: [/projects/${slug}](/projects/${slug})`,
  ].filter(Boolean);

  return parts.join("\n");
}

function buildCraftHighlights(): string {
  return CRAFT_HIGHLIGHT_SLUGS.map((slug) => {
    const entry = EXPERIMENTS_REGISTRY.find((item) => item.slug === slug);
    if (!entry) return "";

    const blurb = CRAFT_HIGHLIGHT_BLURBS[slug] ?? entry.title;
    const href =
      entry.categories.includes("article")
        ? `${ROUTES.craft}/${slug}`
        : entry.external && entry.href
          ? entry.href
          : ROUTES.craft;

    const linkLabel = entry.categories.includes("article")
      ? `[Read essay](${ROUTES.craft}/${slug})`
      : entry.external
        ? `[Try demo](${entry.href})`
        : `[Craft gallery](${ROUTES.craft})`;

    return `- **${entry.title}** — ${blurb} ${linkLabel}`;
  })
    .filter(Boolean)
    .join("\n");
}

/** Curated context injected into the JB_AI system prompt — keep in sync with the live site. */
export function buildAiChatKnowledge(): string {
  const caseStudyLines = PROJECTS_LIST.map((project) =>
    formatCaseStudyLine(project.slug, project.title, project.year),
  ).join("\n\n");

  const contactLines = [
    ...CONTACT_LINKS.map((link) => `- **${link.label}:** ${link.href}`),
    `- **Email:** ${CONTACT_EMAIL}`,
  ].join("\n");

  const jbManual = CONTACT_LINKS.find((link) => link.label === "JB Manual")!.href;

  return `
## About JB
${HERO_COPY}

JB is a Product Designer working in cybersecurity by day and AI experiments by night. Strengths: product design, design systems, fintech B2C, AI/conversational UX, motion, and dev handoff.

## Site sections
- **Index** — scroll-driven slide experience at ${ROUTES.home}
- **${PROJECTS_PAGE.title}** — ${PROJECTS_PAGE.description} (${ROUTES.projects})
- **${EXPERIMENTS_PAGE.title}** — ${EXPERIMENTS_PAGE.description} (${ROUTES.craft})
- **Design Review essay** — process and quality framework at ${ROUTES.craft}/design-review-checklist
- **Me** — intro / archive (${ROUTES.archive})
- **Contact** — LinkedIn, email, resume, and JB Manual on the index Contact slide

## Case studies (public on Projects)
${caseStudyLines || "Case studies are being updated."}

Note: Some work (including Cisco Policy Copilot) is intentionally hidden from the public projects list while it is being prepared. Do not link to hidden projects.

## Craft highlights
${buildCraftHighlights()}

## How this portfolio was built
- **Stack:** Next.js, React, TypeScript, Tailwind CSS v4, Framer Motion
- **Hosting / media:** Vercel, Vercel Blob CDN, Vercel Analytics with custom events
- **Patterns:** Custom editorial case-study components, scroll-linked index slider, craft bento gallery, wireframe debug mode, no off-the-shelf UI kit
- **JB_AI:** This chat uses curated site knowledge plus OpenAI — not general web browsing
- **Footer:** "2026 · Designed by JB · Amplified by AI."

## Manifest (design principles)
${MANIFEST_LINES.map((line) => `- ${line}`).join("\n")}

## Mentorship
- JB offers design feedback, career guidance, and AI product craft conversations when there is mutual fit
- Read the [JB Manual](${jbManual}) first — it explains working style, strengths, and how to prepare
- Reach out on LinkedIn with a focused question; avoid vague "pick your brain" messages
- JB is based in India and works with global teams

## Hiring
- Open to full-time and contract product design roles — especially cybersecurity, AI products, fintech, and design systems
- **JB_AI hiring replies:** share only JB's phone number **6362408280** — do not list case studies, resume, LinkedIn, or email unless the user asks for them
- Case studies (Saltbot AI, FreshPrints Design System, Piggy, etc.) are for portfolio browsing, not the default hiring CTA

## JB Manual (summary)
- Explains how JB works best, communication preferences, and collaboration style
- Useful before mentorship or hiring conversations
- Link: ${jbManual}

## Contact & collaboration
${contactLines}

For mentorship, prefer LinkedIn or email after reading the JB Manual. For hiring, share phone **6362408280** only unless the user asks for more. When someone asks for JB's resume or CV, link the Resume directly — do not deflect to case studies.

${buildCareerKnowledgeSection()}
`.trim();
}
