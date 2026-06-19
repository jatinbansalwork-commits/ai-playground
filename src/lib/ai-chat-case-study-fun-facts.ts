import { ROUTES } from "@/lib/constants";
import { getCaseStudyContent } from "@/lib/project-content";

/** Behind-the-scenes facts — not duplicated from case study body copy. */
const CASE_STUDY_FUN_FACTS: Record<string, string> = {
  "saltbot-ai-saltmine":
    "Early Saltbot explorations looked like a form wizard with a chat skin. JB pushed the team to measure success in *one sentence to a report* — that constraint is what made the UI feel conversational instead of a spreadsheet with emoji.",
  "freshprints-design-system":
    "The spacing scale almost did not ship as tokens — a frontend dev flagged inconsistent padding in review. Instead of defending mocks, JB turned it into a co-review session. Design QA time dropped after that.",
  "freshprints-image-gen-ai":
    "JB used Figma interactive components to simulate generate-and-edit states before eng built a prototype. That saved roughly a week of throwaway code — and caught a dead-end flow early.",
  "piggy-reduced-mutual-fund-support-tickets":
    "After a Telegram signup spike, JB interviewed users at a local chai shop — not just in-app. That is where the insight landed: people wanted a reason to *stay*, not just claim a reward.",
  "kalash-rewards":
    "The GST-to-Bitcoin story almost stayed buried in checkout copy. JB ran a two-day discovery sprint with stakeholders before touching UI — the first-transaction fee test changed activation strategy company-wide.",
  "kalash-year-end-recap":
    "Recap card motion was tuned to feel like unwrapping a gift, not exporting a statement. JB storyboarded the beat timings with marketing before the eng sprint kicked off.",
};

const CASE_STUDY_FUN_FACT_FALLBACK =
  "JB usually starts case studies with the metric that almost did not ship — the messy discovery beat before the polished UI you see on this page.";

/** Matches the auto-prompt from case study Ask JB buttons. */
export function isCaseStudyFunFactRequest(text: string): boolean {
  const normalised = text.trim().toLowerCase();
  return (
    /fun fact/.test(normalised) ||
    /behind the scenes/.test(normalised) ||
    /not in the case study/.test(normalised) ||
    /what should i know about the .+ case study/.test(normalised) ||
    /surprise me/.test(normalised)
  );
}

export function slugFromCaseStudyPath(pagePath?: string): string | undefined {
  if (!pagePath?.startsWith("/projects/")) return undefined;
  return pagePath.replace("/projects/", "").split("/")[0] || undefined;
}

export function buildCaseStudyFunFactReply(pagePath: string): string | null {
  const slug = slugFromCaseStudyPath(pagePath);
  if (!slug) return null;

  const study = getCaseStudyContent(slug);
  const fact = CASE_STUDY_FUN_FACTS[slug] ?? CASE_STUDY_FUN_FACT_FALLBACK;
  const title = study?.title.replace(/^[^\p{L}\p{N}]+/u, "").trim() ?? slug;

  return `Fun fact — you will not find this in the write-up:

${fact}

You are already on **${title}**. Want a different lane? Browse [Projects](${ROUTES.projects}) or ask about hiring.`;
}
