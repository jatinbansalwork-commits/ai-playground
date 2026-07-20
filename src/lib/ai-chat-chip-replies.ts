import {
  CONTACT_EMAIL,
  CONTACT_LINKS,
  CRAFT_EXTERNAL_URL,
  JB_CONTACT_PHONE,
  JB_CONTACT_PHONE_TEL,
  ROUTES,
} from "@/lib/constants";
import { getCaseStudyContent } from "@/lib/project-content";
import { CASE_STUDY_CHAT_META } from "@/lib/ai-chat-knowledge";

const LINKEDIN = CONTACT_LINKS.find((link) => link.label === "LinkedIn")!.href;
const RESUME = CONTACT_LINKS.find((link) => link.label === "Resume")!.href;
const JB_MANUAL = CONTACT_LINKS.find((link) => link.label === "JB Manual")!.href;

function normalise(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

function includesAny(text: string, terms: readonly string[]): boolean {
  return terms.some((term) => text.includes(term));
}

/**
 * Rich in-chat answers for suggestion chips.
 * Prefer answering the how/what/why here — case links are optional depth only.
 */
const CHIP_REPLY_RULES: readonly {
  match: (text: string) => boolean;
  reply: (pagePath?: string) => string;
}[] = [
  {
    match: (t) => includesAny(t, ["strongest project", "best project", "flagship"]),
    reply: () => `That's a tough call — they shine in different ways — but if I had to pick, **Cisco Policy Copilot** stands out for clarity under real pressure.

Firewall policy is high-stakes: one wrong rule and you break access or open risk. JB flipped the order — start with the business ask, reflect understanding, then draft. The case positions **~40% less policy-generation time**, with humans still owning Approve.

**Saltbot** delivers analytics in ~5 seconds; **FreshPrints Design System** helped **4 product teams** ship faster.

Want Policy Copilot, Saltbot, or FreshPrints next?`,
  },
  {
    match: (t) =>
      includesAny(t, ["design process", "his process", "how does he work", "how does jb work"]),
    reply: () => `JB works **intent-first, prototype-in-code**. Roughly:

1. **Start with the real ask** — business language before control panels
2. **Prove it in product** — interactive demos, not slideware
3. **Ship systems** — FreshPrints helped **4 product teams** ship faster
4. **Measure impact** — Policy Copilot targets ~40% less generation time; Kalash serves **1M+** users

Want to see that in Policy Copilot, FreshPrints, or Kalash?`,
  },
  {
    match: (t) =>
      includesAny(t, ["how do i reach", "how to reach", "reach him", "how do i contact", "how to contact"]),
    reply: () => `Best ways to connect:

- **[LinkedIn](${LINKEDIN})**
- **[Email](mailto:${CONTACT_EMAIL})**
- **[Resume](${RESUME})**
- **[JB Manual](${JB_MANUAL})** for how he likes to work
- Hiring? Call **[${JB_CONTACT_PHONE}](${JB_CONTACT_PHONE_TEL})**

Want a case first, or jump straight to hiring?`,
  },
  {
    match: (t) =>
      includesAny(t, ["where has he worked", "where has jb worked", "where did he work", "work history", "companies"]),
    reply: () => `JB's path looks like this:

- **Early:** graphic design → UI/UX (Tinystep)
- **Fintech & mobility:** Drivezy, **Piggy**, **Kalash**
- **Retail / merch platform:** **FreshPrints** (design systems + Image Gen AI)
- **SaaS / B2B:** Open Financial, **Saltmine** (Saltbot)
- **Now:** **Cisco** — Policy Copilot on Hybrid Mesh Firewall

Throughline: research-led product craft across consumer, B2B, and AI-native workflows.

Want a story from fintech, FreshPrints, or Cisco next?`,
  },
  {
    match: (t) =>
      includesAny(t, ["resume", "curriculum vitae"]) || /\bcv\b/.test(t) || t.includes("where can i find jb's resume"),
    reply: () => `Here's JB's CV — [Resume on Google Drive](${RESUME}).

If you're hiring, call **[${JB_CONTACT_PHONE}](${JB_CONTACT_PHONE_TEL})** — that's the fastest path.`,
  },
  {
    match: (t) => includesAny(t, ["i'd love to hire", "love to hire jb", "hire jb", "hiring jb"]),
    reply: () => `Hiring? Could this *be* any more straightforward?

Call JB at **[${JB_CONTACT_PHONE}](${JB_CONTACT_PHONE_TEL})**.`,
  },
  {
    match: (t) => includesAny(t, ["jb manual", "what is in the jb manual"]),
    reply: () => `The **[JB Manual](${JB_MANUAL})** is JB's playbook for how he works best — how to brief him, what makes a good collaboration, and how to get a useful answer (especially for mentorship).

Skim that first, then bring **one** focused question on [LinkedIn](${LINKEDIN}). That's how conversations stay useful on both sides.`,
  },
  {
    match: (t) => includesAny(t, ["how did jb build", "built this portfolio", "built this site"]),
    reply: () => `This portfolio is **custom-built** — no template.

**Stack:** Next.js, React, TypeScript, Tailwind CSS v4, Framer Motion  
**Experience:** Scroll-linked index slider, editorial case-study system, Craft (Design to Build external + on-site gallery), JB's Case Notes  
**Infra:** Vercel + Blob CDN, custom analytics  
**This chat:** JB_AI — curated knowledge plus OpenAI when needed

Peek at [Craft / Design to Build](${CRAFT_EXTERNAL_URL}) or [Projects](${ROUTES.projects}) for the case work.`,
  },
  {
    match: (t) => includesAny(t, ["craft page", "what is on the craft", "design to build"]),
    reply: () => `**Craft** on the index opens **[Design to Build](${CRAFT_EXTERNAL_URL})** in a new tab — JB's craft playground for slides, illustrations, icons, and interface sketches.

Still on this site:
- [Design Review checklist essay](${ROUTES.craft}/design-review-checklist) — how FreshPrints paired reviews with a design system
- [Craft gallery](${ROUTES.craft}) — motion and illustration studies

Want the Design Review essay, or jump to a shipped case study?`,
  },
  {
    match: (t) =>
      includesAny(t, ["which case study", "what case study should", "start with"]) &&
      includesAny(t, ["case", "project", "start"]),
    reply: () => `Pick your lane — I'll match the work:

- **Cybersecurity AI / firewall UX** → Policy Copilot (or the shorter Case Notes #1)
- **Conversational AI / analytics** → Saltbot
- **Design systems** → FreshPrints Design System
- **Generative AI tooling** → FreshPrints Image Gen AI
- **Consumer gold / growth** → Kalash

Tell me AI vs fintech vs systems and I'll narrow it to one.`,
  },
  {
    match: (t) =>
      includesAny(t, ["case notes", "field notes"]) &&
      !includesAny(t, ["intent-before", "user testing"]),
    reply: () => `**JB's Case Notes #1** is a short working note on Policy Copilot — not the full case.

**The insight:** A one-line business ask lands in chat; the secure answer is a full firewall policy. Dumping a draft card into the thread looks smart, then follow-ups bury Edit / Approve.

**The fix:** Side-by-side workspace — intent on the left, living draft on the right. User testing showed admins couldn't hold both worlds in one thread.

Read it at [Case Notes #1](${ROUTES.fieldNotesOne}), or ask how intent-before-rules works in the full product.`,
  },
  {
    match: (t) =>
      includesAny(t, [
        "intent-before-rules",
        "intent before",
        "before generating firewall",
        "use intent before",
      ]),
    reply: () => `Policy Copilot starts with **intent before rules**.

**Before:** Admins got a one-line business ask, then spent hours translating it into users, apps, zones, and compliance — often outside the product.

**After:** Copilot reflects understanding first (who / what / conditions), maps inventory objects, validates continuously, and keeps drafts out of production until a human **Approves**.

That flip is why the draft lives beside the chat — not buried in it.`,
  },
  {
    match: (t) => includesAny(t, ["user testing uncover", "user testing"]),
    reply: () => `User testing found admins struggled to hold **both** the business request and the technical policy in the same chat thread.

A draft card in-thread worked for a first look — then follow-ups buried Edit / Approve. So the product moved to a **side-by-side workspace**: intent on one side, living draft on the other.

That's the core of [Case Notes #1](${ROUTES.fieldNotesOne}).`,
  },
  {
    match: (t) =>
      includesAny(t, ["problem did policy copilot", "what problem did policy"]) ||
      (t.includes("policy copilot") && t.includes("problem")),
    reply: () => `**The problem:** Firewall admins spend most of their time *before* the rule editor — translating business asks, hunting context (apps, identity, compliance), and validating risk.

Requests take seconds to describe; the right decision can take hours. That invisible prep never lived in the product.

**Policy Copilot** pulls that thinking into the workflow: understand intent → reflect → draft with validation → human Approve. Framing: **~40% less** policy-generation time on that journey.`,
  },
  {
    match: (t) =>
      includesAny(t, ["tell me about cisco", "tell me about policy copilot"]) ||
      (t.includes("cisco") && t.includes("policy")),
    reply: () => `**Cisco Policy Copilot** helps firewall admins turn a business ask into a policy they can trust.

**How it works:**
1. Describe the outcome in plain language
2. Copilot **reflects** users, apps, and conditions first
3. Maps inventory objects + continuous validation
4. Human still owns **Approve** — AI never deploys alone

Impact framing: **~40% less policy-generation time**.

Curious about intent-before-rules, or the shorter Case Notes #1?`,
  },
  {
    match: (t) =>
      includesAny(t, ["problem did saltbot", "what problem did saltbot"]) ||
      (t.includes("saltbot") && t.includes("problem")),
    reply: () => `**Saltbot's problem:** workplace analytics trapped in spreadsheets and dense navigation — pulling headcount reports meant tedious data hunting.

**What JB designed:** a conversational analytics assistant that gets you to the answer in **~5 seconds**, with guardrails so automation stays trustworthy.

Desktop + mobile UX, proof of concept through shipped conversation patterns. Want how the guardrails work, or another AI case like Policy Copilot?`,
  },
  {
    match: (t) =>
      includesAny(t, ["fast are saltbot", "analytics answers", "how fast"]) &&
      (t.includes("saltbot") || t.includes("analytics")),
    reply: () => `Saltbot targets analytics answers in **about five seconds** — the pitch is "say goodbye to cluttered spreadsheets."

That speed only works if the ask is clear and the system stays guarded: guided conversation, not raw free-form dump into production data.

Want the broader Saltbot story, or how JB designs AI with guardrails?`,
  },
  {
    match: (t) =>
      includesAny(t, ["tell me about saltbot", "tell me more about saltbot", "saltbot ai"]),
    reply: () => `**Saltbot** (Saltmine) was built for a familiar pain: report analytics buried in spreadsheets and slow navigation.

**What JB changed:**
- Conversational / guided asks instead of hunting menus
- Answers aimed at **~5 seconds**, not a data scrape ritual
- Guardrails so automation stays trustworthy for workplace insights

Desktop + mobile UX — proof of concept through shipped conversation patterns.

Want how guardrails show up, or Cisco Policy Copilot next?`,
  },
  {
    match: (t) =>
      includesAny(t, [
        "design system help",
        "helped teams ship",
        "help teams ship",
        "ship faster",
        "design system scope",
        "freshprints design system",
      ]) && !includesAny(t, ["image gen"]),
    reply: () => `The **FreshPrints design system** had one job: stop endless UI debates and help teams ship.

**Scope:** shared components, tokens, and docs so squads stopped reinventing patterns every sprint.

**Impact:** helped **4 product teams** ship faster with less design debt — systems work that only looks boring until you measure cycle time.

Curious about Image Gen AI (same org), or how JB runs design reviews?`,
  },
  {
    match: (t) =>
      includesAny(t, ["image gen", "asset review", "review handled", "review handle"]),
    reply: () => `**FreshPrints Image Gen AI** was generative tooling creators could actually ship with — not a demobot.

**What JB designed:**
- Prompt → generate flows for merch / apparel workflows
- Asset **review** interfaces so teams could judge, iterate, and hand off (the review surface mattered as much as generation)
- Desktop + mobile UX for a shipped MVP

Want how he scoped AI UX, or the design system that sped delivery across teams?`,
  },
  {
    match: (t) =>
      includesAny(t, ["digital gold", "gold savings", "kalash"]) &&
      !includesAny(t, ["recap", "year-end", "year end"]),
    reply: () => `**Kalash** helps people in India buy **digital gold from ₹10** — daily, weekly, or monthly — without physical-gold friction.

JB's work sat at growth/product: make saving feel attainable, trustworthy, and sticky for **1M+** users — clearer early value, reward loops for consistency.

Want the activation story, or how JB thinks about growth metrics?`,
  },
  {
    match: (t) => includesAny(t, ["outcome of this project", "what is the outcome"]),
    reply: (pagePath) => {
      const slug = pagePath?.startsWith("/projects/")
        ? pagePath.replace("/projects/", "").split("/")[0]
        : undefined;
      if (!slug) {
        return `Outcomes depend on the project — Policy Copilot (~40% less policy-generation time), FreshPrints (4 teams shipping faster), Saltbot (~5s analytics), and Kalash (1M+ gold savers).

Which one are you looking at?`;
      }
      const content = getCaseStudyContent(slug);
      const meta = CASE_STUDY_CHAT_META[slug];
      const title = content?.title ?? slug;
      const outcome = meta?.outcome ?? content?.overviewText;
      if (!outcome) {
        return `You're on **${title}** — ask what changed, what research found, or what shipped, and I'll answer from the work itself.`;
      }
      return `On **${title}**:

${outcome}

Want the problem it solved, or how the design got there?`;
    },
  },
  {
    match: (t) => includesAny(t, ["zero-to-one", "zero to one", "0 to 1", "0→1"]),
    reply: () => `**Kalash (activation):** Users signed up, made one transaction, disappeared. Interviews: "Why should I stick around?" Founders assumed ₹100 savers would accept ~₹103 checkout (GST) — they didn't.

**Move:** Make value obvious early — surface GST returned as Bitcoin that grows, plus a daily streak with small rewards. Marketing budget shifted toward value that compounds.

Want another 0→1 story, or how he defines activation metrics?`,
  },
  {
    match: (t) => includesAny(t, ["mentor", "mentorship"]),
    reply: () => `JB's open to mentorship when it's a good fit — especially designers moving into product, fintech, or AI.

Start with the **[JB Manual](${JB_MANUAL})**, then message on [LinkedIn](${LINKEDIN}) with **one** focused question. Keep it sharp — that's how you get a real answer.`,
  },
];

/** Resolve a rich reply when the user message matches a known suggestion chip / follow-up. */
export function resolveSuggestionChipReply(
  userMessage: string,
  pagePath?: string,
): string | null {
  const text = normalise(userMessage);
  if (!text) return null;

  for (const rule of CHIP_REPLY_RULES) {
    if (rule.match(text)) {
      return rule.reply(pagePath).trim();
    }
  }

  return null;
}
