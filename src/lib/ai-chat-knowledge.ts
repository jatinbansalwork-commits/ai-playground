import {
  CONTACT_EMAIL,
  CONTACT_LINKS,
  CRAFT_EXTERNAL_URL,
  HERO_COPY,
  MANIFEST_LINES,
  ROUTES,
} from "@/lib/constants";
import { EXPERIMENTS_PAGE, EXPERIMENTS_REGISTRY } from "@/lib/experiments-registry";
import { isOnSiteCaseStudyRow, PROJECTS_LIST } from "@/lib/projects-list-data";
import { PROJECTS_PAGE } from "@/lib/projects-registry";
import { getCaseStudyContent } from "@/lib/project-content";
import { buildCareerKnowledgeSection } from "@/lib/ai-chat-career-knowledge";

export interface CaseStudyChatMeta {
  bestFor: string;
  outcome?: string;
}

/** Curated routing tags — keep in sync with public projects on `/projects`. */
export const CASE_STUDY_CHAT_META: Partial<Record<string, CaseStudyChatMeta>> = {
  "cisco-policy-copilot": {
    bestFor:
      "Cybersecurity AI, firewall policy UX, enterprise copilots, explainable AI, human-in-the-loop security",
    outcome:
      "Designed Policy Copilot—AI-assisted firewall policy for Cisco Hybrid Mesh Firewall with intent-first workflows and an interactive workspace demo.",
  },
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
};

const CRAFT_HIGHLIGHT_SLUGS = [
  "design-review-checklist",
  "wireframe-mode",
  "minimap-tracker",
] as const;

const CRAFT_HIGHLIGHT_BLURBS: Partial<Record<string, string>> = {
  "design-review-checklist":
    "Essay on introducing a design review checklist alongside a design system at FreshPrints.",
  "wireframe-mode": "Wireframe Mode — toggle on the index slider for layout debug.",
  "minimap-tracker": "Minimap tracker motion study for the index slider.",
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
  const caseStudyLines = PROJECTS_LIST.filter(isOnSiteCaseStudyRow)
    .map((project) => formatCaseStudyLine(project.slug, project.title, project.year))
    .join("\n\n");

  const contactLines = [
    ...CONTACT_LINKS.map((link) => `- **${link.label}:** ${link.href}`),
    `- **Email:** ${CONTACT_EMAIL}`,
  ].join("\n");

  const jbManual = CONTACT_LINKS.find((link) => link.label === "JB Manual")!.href;

  return `
## About JB
${HERO_COPY}

JB designs AI products, prototypes them in code, and raises the bar for design craft at Cisco. Strengths: product design, design systems, fintech B2C, AI/conversational UX, motion, and dev handoff.

## Site sections
- **Index** — scroll-driven slide experience at ${ROUTES.home}
- **${PROJECTS_PAGE.title}** — ${PROJECTS_PAGE.description} (${ROUTES.projects})
- **${EXPERIMENTS_PAGE.title}** — index Craft slide opens [Design to Build](${CRAFT_EXTERNAL_URL}) in a new tab (JB's design-to-build craft site). On-site Craft gallery remains at ${ROUTES.craft}; Design Review essay at ${ROUTES.craft}/design-review-checklist
- **Design Review essay** — process and quality framework at ${ROUTES.craft}/design-review-checklist
- **Case Notes** — JB's Case Notes (${ROUTES.fieldNotesOne})
- **Contact** — LinkedIn, email, resume, and JB Manual on the index Contact slide
- **AI Labs / Ideas** — retired; old /ideas links redirect home

## JB's Case Notes
- **JB's Case Notes #1** (${ROUTES.fieldNotesOne}): JB's note on Cisco Policy Copilot — a one-line business ask vs a structured firewall policy.
- **Problem:** Chat is a bad container for something you review, edit, and approve.
- **Solution №1 (rejected):** Drop the draft policy into the thread as a card — works for a first look, then follow-ups bury Edit/Approve.
- **Solution №2 (chosen direction):** Keep chat and policy side by side — intent trail on the left, living draft on the right; understand first, then rules; Approve stays separate from chatting.
- Full interactive case study: [Cisco Policy Copilot](${ROUTES.ciscoPolicyCopilot})

## Case studies (public on Projects)
${caseStudyLines || "Case studies are being updated."}

## Craft highlights
${buildCraftHighlights()}

## How this portfolio was built
- **Stack:** Next.js, React, TypeScript, Tailwind CSS v4, Framer Motion
- **Hosting / media:** Vercel, Vercel Blob CDN, Vercel Analytics with custom events
- **Patterns:** Custom editorial case-study components, scroll-linked index slider, craft bento gallery, wireframe debug mode, darkroom mood toggle, soft chat secrets, no off-the-shelf UI kit
- Soft easter eggs (do not dump unprompted): chat secrets \`pivot\` / \`friends\` / \`could this be any more\`; \`darkroom\` mood; \`do a barrel roll\`; \`askew\`; \`i'm feeling lucky\`; Shift-click cycles the custom cursor label; visit Manifest 3× to remix the case-study minimap label
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
- Public case studies (Policy Copilot, Saltbot AI, FreshPrints) are for portfolio browsing, not the default hiring CTA

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
