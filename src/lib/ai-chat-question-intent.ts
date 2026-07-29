import { resolveSuggestionChipReply } from "@/lib/ai-chat-chip-replies";
import { resolveChatSecretReply } from "@/lib/ai-chat-secrets";
import { CONTACT_EMAIL, CONTACT_LINKS, JB_CONTACT_PHONE, JB_CONTACT_PHONE_TEL, ROUTES } from "@/lib/constants";
import { resolveCareerKnowledgeReply } from "@/lib/ai-chat-career-knowledge";
import {
  buildCaseStudyFunFactReply,
  isCaseStudyFunFactRequest,
} from "@/lib/ai-chat-case-study-fun-facts";

const LINKEDIN = CONTACT_LINKS.find((link) => link.label === "LinkedIn")!.href;
const RESUME = CONTACT_LINKS.find((link) => link.label === "Resume")!.href;
const JB_MANUAL = CONTACT_LINKS.find((link) => link.label === "JB Manual")!.href;

export type QuestionIntentId =
  | "greeting"
  | "wireframe"
  | "darkroom"
  | "easter_secret"
  | "resume"
  | "hiring"
  | "contact"
  | "mentorship"
  | "career_interview"
  | "strongest_project"
  | "design_process"
  | "work_history"
  | "jb_manual"
  | "project_saltbot"
  | "project_cisco"
  | "project_freshprints"
  | "project_kalash"
  | "portfolio_site"
  | "craft"
  | "case_study_pick"
  | "case_study_fun_fact"
  | "explore";

export interface DetectedQuestionIntent {
  id: QuestionIntentId;
  /** How confident we are — high = answer from curated copy, skip OpenAI. */
  confidence: "high" | "low";
  /** What the visitor is trying to accomplish — guides reply tone and content. */
  goal: string;
}

interface IntentRule {
  id: QuestionIntentId;
  goal: string;
  curated: boolean;
  matches: (text: string, pagePath?: string) => boolean;
}

function normalise(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

function includesAny(text: string, terms: readonly string[]): boolean {
  return terms.some((term) => text.includes(term));
}

const INTENT_RULES: readonly IntentRule[] = [
  {
    id: "greeting",
    goal: "Welcome the visitor and offer clear paths — do not pitch JB's CV unprompted.",
    curated: true,
    matches: (text) =>
      /^(how you doin'?|how you doing|how are you|how'?s it going|what'?s up|whats up|hey|hi|hello|yo|sup)\b/.test(
        text.trim(),
      ) ||
      includesAny(text, ["how you doin", "how you doing", "how are you doing"]),
  },
  {
    id: "wireframe",
    goal: "Explain the wireframe easter egg — toggle via chat command or index cross.",
    curated: true,
    matches: (text) => includesAny(text, ["wireframe", "layout debug", "debug mode"]),
  },
  {
    id: "darkroom",
    goal: "Explain or acknowledge the darkroom mood toggle — type darkroom in chat.",
    curated: true,
    matches: (text) =>
      includesAny(text, ["darkroom mode"]) || text.trim() === "darkroom",
  },
  {
    id: "easter_secret",
    goal: "Friends-flavoured secret unlock — pivot / could this be any more / friends.",
    curated: true,
    matches: (text) =>
      includesAny(text, ["central perk"]) ||
      text.trim() === "pivot" ||
      text.trim() === "friends" ||
      text.includes("could this be any more"),
  },
  {
    id: "resume",
    goal: "They want JB's CV — link the Resume directly. No case studies, no contact menu.",
    curated: true,
    matches: (text) =>
      includesAny(text, ["resume", "curriculum vitae", "curriculum"]) ||
      /\bcv\b/.test(text) ||
      /(where|find|get|download|show|need|want).*(resume|cv)/.test(text),
  },
  {
    id: "hiring",
    goal: "They want to hire JB — give phone number only unless they ask for more.",
    curated: true,
    matches: (text) =>
      includesAny(text, [
        "i'd love to hire jb",
        "love to hire jb",
        "want to hire jb",
        "hire jb",
        "hiring jb",
      ]) || includesAny(text, ["hire", "hiring", "open role", "job opening", "contract role"]),
  },
  {
    id: "contact",
    goal: "They want to reach JB — give LinkedIn, email, resume, JB Manual.",
    curated: true,
    matches: (text) =>
      includesAny(text, [
        "how do i contact",
        "how to contact",
        "how do i reach",
        "how to reach",
        "get in touch",
        "reach out",
        "reach him",
        "reach jb",
        "message jb",
        "talk to jb",
      ]) ||
      (includesAny(text, ["contact", "email", "linkedin"]) &&
        !includesAny(text, ["case study", "project"])),
  },
  {
    id: "mentorship",
    goal: "They want mentorship — JB Manual first, then LinkedIn with one focused question.",
    curated: true,
    matches: (text) => includesAny(text, ["mentor", "mentorship", "career advice"]),
  },
  {
    id: "strongest_project",
    goal: "They want JB's strongest / flagship project — compare public work: Policy Copilot, Saltbot, and FreshPrints with metrics.",
    curated: true,
    matches: (text) =>
      includesAny(text, [
        "strongest project",
        "best project",
        "flagship",
        "proudest project",
        "favourite project",
        "favorite project",
      ]),
  },
  {
    id: "design_process",
    goal: "They asked how JB works / his design process — intent-first, prototype-in-code, measure impact.",
    curated: true,
    matches: (text) =>
      includesAny(text, [
        "design process",
        "his process",
        "how does he work",
        "how does jb work",
        "how he designs",
        "how jb designs",
      ]),
  },
  {
    id: "work_history",
    goal: "They asked where JB has worked — timeline across fintech, FreshPrints, Saltmine, Cisco.",
    curated: true,
    matches: (text) =>
      includesAny(text, [
        "where has he worked",
        "where has jb worked",
        "where did he work",
        "work history",
        "companies has he",
        "companies has jb",
      ]),
  },
  {
    id: "jb_manual",
    goal: "They asked what the JB Manual is — explain and link it.",
    curated: true,
    matches: (text) => includesAny(text, ["jb manual", "what is in the jb manual"]),
  },
  {
    id: "career_interview",
    goal: "Interview or background question — answer from career narratives with metrics.",
    curated: true,
    matches: (text) => resolveCareerKnowledgeReply(text) !== null,
  },
  {
    id: "project_saltbot",
    goal: "They asked about Saltbot / conversational AI work — link that case study.",
    curated: true,
    matches: (text) =>
      includesAny(text, [
        "saltbot",
        "saltmine",
        "conversational analytics",
        "analytics answers",
      ]),
  },
  {
    id: "project_cisco",
    goal: "They asked about Cisco Policy Copilot / JB's Case Notes on chat vs policy draft.",
    curated: true,
    matches: (text) =>
      includesAny(text, [
        "cisco",
        "policy copilot",
        "case notes",
        "field notes",
        "jb's case notes",
        "jb's field notes",
        "jb notes",
        "firewall policy",
        "intent-before-rules",
        "intent before",
        "user testing uncover",
        "agentiops",
      ]),
  },
  {
    id: "project_freshprints",
    goal: "They asked about FreshPrints — design system, merch platform, or Image Gen AI.",
    curated: true,
    matches: (text) =>
      includesAny(text, ["freshprints", "fresh prints", "design system", "image gen"]),
  },
  {
    id: "project_kalash",
    goal: "They asked about Kalash / gold rewards — explain as career history only; do not link a published case study.",
    curated: true,
    matches: (text) =>
      includesAny(text, ["kalash", "gold rewards", "digital gold", "fintech"]),
  },
  {
    id: "portfolio_site",
    goal: "They want to know how this portfolio was built — stack and patterns.",
    curated: true,
    matches: (text) =>
      includesAny(text, [
        "how did jb build",
        "built this portfolio",
        "built this site",
        "what stack",
        "next.js",
        "framer motion",
        "vercel",
      ]) || (text.includes("portfolio") && text.includes("built")),
  },
  {
    id: "craft",
    goal: "They want Craft / Design to Build — link https://design-to-build.vercel.app/ (and Design Review essay on-site if relevant).",
    curated: true,
    matches: (text) =>
      includesAny(text, [
        "craft page",
        "experiments",
        "prototype",
        "interaction demo",
        "design to build",
      ]) ||
      (text.includes("craft") && !text.includes("case study")),
  },
  {
    id: "case_study_fun_fact",
    goal: "They are on a case study page and want something extra — a behind-the-scenes fact, not a summary of what they are already reading.",
    curated: true,
    matches: (text, pagePath) =>
      Boolean(pagePath?.startsWith("/projects/")) &&
      isCaseStudyFunFactRequest(text),
  },
  {
    id: "case_study_pick",
    goal: "They want help choosing work to read — route by interest with links.",
    curated: true,
    matches: (text) =>
      includesAny(text, [
        "which case study",
        "what case study",
        "start with",
        "what project",
        "which project",
        "show me work",
      ]) || (includesAny(text, ["case study", "projects"]) && text.includes("which")),
  },
];

/** Infer what the visitor wants before choosing a reply. */
export function detectQuestionIntent(
  userMessage: string,
  pagePath?: string,
): DetectedQuestionIntent {
  const text = normalise(userMessage);

  for (const rule of INTENT_RULES) {
    if (rule.matches(text, pagePath)) {
      return {
        id: rule.id,
        confidence: rule.curated ? "high" : "low",
        goal: rule.goal,
      };
    }
  }

  return {
    id: "explore",
    confidence: "low",
    goal: "General portfolio browse — suggest relevant case studies or ask a clarifying question.",
  };
}

export function shouldUseCuratedReply(intent: DetectedQuestionIntent): boolean {
  return intent.confidence === "high" && intent.id !== "explore";
}

/** Build a reply that matches detected intent — null only for explore with no page context. */
export function buildIntentReply(
  intent: DetectedQuestionIntent,
  userMessage: string,
  pagePath?: string,
): string | null {
  const chipReply = resolveSuggestionChipReply(userMessage, pagePath);
  if (chipReply) return chipReply;

  switch (intent.id) {
    case "greeting":
      return `How YOU doin'? I'm JB_AI — JB's chat on this portfolio. Could this *be* any more fun?

Ask about hiring, a case study, or how to reach JB — I'll match the answer to what you actually need.`;

    case "wireframe":
      return "Type **wireframe mode** in this chat to toggle layout debug on the index slider — or click the centre cross on the homepage. Could this *be* any more designer?";

    case "darkroom":
      return "Type **darkroom** in this chat to flip the index into a near-black studio mood with cyan accents. Type it again to bring the lights back.";

    case "easter_secret":
      return (
        resolveChatSecretReply(userMessage) ??
        `You found a soft secret. Try \`pivot\`, \`friends\`, or \`could this be any more\` — then follow the case link.`
      );

    case "resume":
      return `You asked for the CV — here it is. JB's [Resume](${RESUME}) on Google Drive. Could this *be* any more straightforward?`;

    case "hiring":
      return `You want to hire JB — got it. Could this *be* any more straightforward?

Call **[${JB_CONTACT_PHONE}](${JB_CONTACT_PHONE_TEL})**.`;

    case "contact":
      return `Best ways to connect:

- **[LinkedIn](${LINKEDIN})**
- **[Email](mailto:${CONTACT_EMAIL})**
- **[Resume](${RESUME})**
- **[JB Manual](${JB_MANUAL})** for how he likes to work
- Hiring? Call **[${JB_CONTACT_PHONE}](${JB_CONTACT_PHONE_TEL})**

Want a case first, or jump straight to hiring?`;

    case "mentorship":
      return `JB's open to mentorship when it's a good fit — especially designers moving into product, fintech, or AI.

Start with the **[JB Manual](${JB_MANUAL})**, then message on [LinkedIn](${LINKEDIN}) with **one** focused question. Keep it sharp — that's how you get a real answer.`;

    case "work_history":
      return resolveSuggestionChipReply("Where has JB worked?")!;

    case "jb_manual":
      return resolveSuggestionChipReply("What is in the JB Manual?")!;

    case "strongest_project":
      return resolveSuggestionChipReply("What's JB's strongest project?")!;

    case "design_process":
      return resolveSuggestionChipReply("What's his design process?")!;

    case "career_interview":
      return resolveCareerKnowledgeReply(userMessage);

    case "project_saltbot":
      return `**Saltbot** (Saltmine) was built for a familiar pain: report analytics buried in spreadsheets and slow navigation.

**What JB changed:**
- Conversational / guided asks instead of hunting menus
- Answers aimed at **~5 seconds**, not a data scrape ritual
- Guardrails so automation stays trustworthy for workplace insights

Desktop + mobile UX — proof of concept through shipped conversation patterns.

Want a deeper tour of the [Saltbot case](${ROUTES.projects}/saltbot-ai-saltmine), or how he designs AI with guardrails?`;

    case "project_cisco":
      if (
        userMessage.toLowerCase().includes("intent") ||
        userMessage.toLowerCase().includes("before")
      ) {
        return `Policy Copilot starts with **intent before rules**.

**Before:** Admins got a one-line business ask, then spent hours translating it into users, apps, zones, and compliance — often in chat or tickets before the rule editor.

**After:** Copilot reflects understanding first (who / what / conditions), maps inventory objects, runs visible validation, and keeps drafts out of production until a human **Approves**.

That flip is why the workspace sits beside chat — not as a buried card in the thread. Detail: [Case Notes #1](${ROUTES.fieldNotesOne}) · full story: [Policy Copilot](${ROUTES.ciscoPolicyCopilot}).`;
      }
      if (userMessage.toLowerCase().includes("user testing")) {
        return `User testing found admins struggled to hold **both** the business request and the technical policy in the same chat thread.

Dumping a full draft into the conversation looked smart at first — then follow-ups buried Edit / Approve. That's why the product moved to a **side-by-side workspace**: intent on one side, living draft on the other.

Short write-up: [JB's Case Notes #1](${ROUTES.fieldNotesOne}).`;
      }
      return `**Cisco Policy Copilot** helps firewall admins turn a business ask into a policy they can trust — without drowning in prep work.

**How it works:**
1. Describe the outcome in plain language
2. Copilot **reflects** users, apps, and conditions first
3. Maps inventory objects + continuous validation
4. Human still owns **Approve** — AI never deploys alone

Impact framing: **~40% less policy-generation time** on the journey from intent to trusted draft.

Curious about intent-before-rules, or the shorter [Case Notes #1](${ROUTES.fieldNotesOne})?`;

    case "project_freshprints":
      if (userMessage.toLowerCase().includes("image gen") || userMessage.toLowerCase().includes("review")) {
        return `**FreshPrints Image Gen AI** was about shipping generative image tooling creators could actually review — not a flashy demobot.

**What JB designed:**
- Prompt → generate flows for merch / apparel workflows
- Asset **review** interfaces so teams could judge, iterate, and hand off
- Desktop + mobile UX for a shipped MVP

Want process notes (how he scoped AI UX), or the design-system work that sped delivery across teams?`;
      }
      return `The **FreshPrints design system** existed for one job: stop endless UI debates and help teams ship.

**What it did:**
- Shared components + tokens so product squads stopped reinventing buttons every sprint
- Documentation that made the "right" pattern obvious
- Helped **4 product teams** ship faster with less design debt

That's systems work — boring until you measure cycle time. Curious about Image Gen AI next, or how JB runs design reviews?`;

    case "project_kalash":
      return `**Kalash** was part of JB's fintech career — helping people in India buy **digital gold from ₹10** with clearer value early in onboarding and reward loops that encourage consistency.

It's career history here, not a published case study on this site. Want another public case — Policy Copilot, FreshPrints, or Saltbot?`;

    case "portfolio_site":
      return resolveSuggestionChipReply("How did JB build this portfolio?")!;

    case "craft":
      return resolveSuggestionChipReply("What is on the Craft page?")!;

    case "case_study_pick":
      return resolveSuggestionChipReply("Which case study should I start with?")!;

    case "case_study_fun_fact": {
      if (!pagePath) return null;
      return buildCaseStudyFunFactReply(pagePath);
    }

    case "explore":
    default:
      return null;
  }
}

export function buildIntentPromptBlock(intent: DetectedQuestionIntent): string {
  return `Visitor intent (latest message): **${intent.id}**
Reply goal: ${intent.goal}
Fulfill that intent first — do not answer a different question than the one they asked.`;
}

/** Reference list for analytics dashboards and chat question logs. */
export const QUESTION_INTENT_CATALOG: readonly {
  id: QuestionIntentId;
  goal: string;
}[] = [
  ...INTENT_RULES.map((rule) => ({ id: rule.id, goal: rule.goal })),
  {
    id: "explore",
    goal: "General portfolio browse — suggest relevant case studies or ask a clarifying question.",
  },
];
