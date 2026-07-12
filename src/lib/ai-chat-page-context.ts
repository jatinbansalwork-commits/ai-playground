import { ROUTES } from "@/lib/constants";
import { getCaseStudyContent } from "@/lib/project-content";

/** Injects page-aware hints into the JB_AI system prompt. */
export function buildPageContext(pagePath?: string): string {
  if (!pagePath || pagePath === "/") {
    return "The user is on the index slider — mention Projects, Ideas, Craft, Field Notes, or Contact if relevant.";
  }

  if (pagePath.startsWith("/projects/")) {
    const slug = pagePath.replace("/projects/", "").split("/")[0] ?? "";
    const study = getCaseStudyContent(slug);

    if (study) {
      return `The user is already reading **${study.title}** (${study.year}) at ${pagePath}.
Do **not** tell them to open or read this case study — they are on it.
If they ask from the Ask JB button, share a behind-the-scenes fun fact from knowledge, not the overview below.
Overview (for other questions only): ${study.overviewText}`;
    }

    return `The user is on a project page at ${pagePath}. Prioritise case study content from knowledge when relevant.`;
  }

  if (pagePath.startsWith("/craft/")) {
    const slug = pagePath.replace("/craft/", "").split("/")[0] ?? "";
    return `The user is reading the Design Review essay at ${pagePath}${slug ? ` (${slug})` : ""}. Prioritise process, quality, and craft context when relevant.`;
  }

  if (pagePath === "/craft") {
    return "The user is browsing the Craft gallery — motion studies and illustrations only. The Design Review essay lives at /craft/design-review-checklist; AI demos are on /ideas.";
  }

  if (pagePath === "/projects") {
    return "The user is on the Projects index — help them pick a case study based on their interest.";
  }

  if (pagePath === "/ideas") {
    return "The user is browsing Ideas — external AI demos and side experiments. Point them to Try Now links when relevant.";
  }

  if (pagePath === ROUTES.notes || pagePath.startsWith(`${ROUTES.notes}/`)) {
    return "The user is reading Field Notes — process logs on interaction design and how this portfolio is built.";
  }

  return `The user is on ${pagePath}. Keep answers relevant to JB's portfolio and this section when possible.`;
}
