/**
 * JB career & interview narratives — injected into JBAI knowledge only.
 * Not shown as starter chips; used when visitors ask similar questions.
 */

export interface CareerFaqEntry {
  id: string;
  /** Substrings used for fallback matching (lowercase). */
  triggers: readonly string[];
  title: string;
  body: string;
}

export const CAREER_FAQ_ENTRIES: readonly CareerFaqEntry[] = [
  {
    id: "about-yourself",
    triggers: [
      "tell me about yourself",
      "about yourself",
      "about jb",
      "your background",
      "career journey",
      "where did you start",
      "graphic designer",
      "8+ years",
      "eight years",
      "8 years",
    ],
    title: "Tell me about yourself",
    body: `JB has been a product designer for 8+ years — focused on solving problems, not just designing screens.

Started in graphic design. Saw another team working more strategically — shaping how users move through a product, not just choosing fonts. That curiosity led to UI/UX at Tinystep, then lead product roles across fintech (Drivezy, Piggy, Kalash), retail (FreshPrints), SaaS (Open Financial), and B2B (Saltmine).

**Drivezy:** Redesigned keyless vehicle unlock — phone as QR key. Learned to reduce steps, remove friction, think like an end user.

**Open:** Built internal chat support from scratch — saved money, made support faster. Great design is not always user-facing; sometimes it enables internal teams.

**Kalash:** Retention focus — Bitcoin rewards instead of cashback. Many users did not understand the benefit; onboarding was redesigned to highlight it with measurable impact.

**FreshPrints today:** Designers act as owners on quarterly OKRs — outcomes, not just screens.

Core belief: great design is like good teaching — clarity over cleverness. If a user is confused, that is on the design team.`,
  },
  {
    id: "freshprints-company",
    triggers: [
      "what is freshprints",
      "what is fresh prints",
      "freshprints company",
      "freshprints platform",
      "custom apparel",
      "sorority",
      "campus club",
      "account manager",
      "fp.com",
      "create your store",
      "order management",
      "design tool",
      "freshprints modules",
      "freshprints v4",
    ],
    title: "What is FreshPrints?",
    body: `**FreshPrints** is a New York-based custom apparel startup for student groups, small businesses, and creators who want stylish, fast, affordable merch without generic e-comm friction.

**What makes it different:** Tech plus people — a dedicated account manager (often a college student) guides fabric, colour, and design like a creative partner.

**Platform today (beyond printing):** Creator-led apparel and college community merch, powered by internal tools connecting designers, creators, printers, and logistics.

**Product modules JB works across:**
1. **FP.com** — marketing website
2. **Design tool** — custom design creation
3. **Create Your Store** — creator storefronts
4. **Order management (V4)** — ops and fulfilment workflows
5. **AI (in progress)** — including Image Gen AI and emerging AI product surfaces

Portfolio proof: [FreshPrints Design System](/projects/freshprints-design-system), [Image Gen AI](/projects/freshprints-image-gen-ai).`,
  },
  {
    id: "piggy-retention",
    triggers: [
      "piggy story",
      "telegram campaign",
      "signup rewards",
      "uninstall",
      "churn",
      "point system",
      "gold-saving",
      "15% engagement",
      "piggy retention",
      "marketing sustainable",
    ],
    title: "Piggy — retention after a Telegram campaign",
    body: `At **Piggy**, marketing spent heavily on a Telegram campaign — big signup spike in a week. Problem: many users uninstalled right after claiming signup rewards. A retention red flag.

JB spoke with users — at a local chai shop, active app users, and Telegram group members. Insight: people came for the reward with no reason to stay.

**Design response:** A point system — users earned points with every gold-saving action, convertible into digital gold. Long-term value attached to behaviour.

**Results:** ~15% increase in user engagement within a week; uninstalls dropped. Marketing became more sustainable by reducing churn.

Case study: [Piggy — Reduced Support Tickets](/projects/piggy-reduced-mutual-fund-support-tickets).`,
  },
  {
    id: "zero-to-one",
    triggers: [
      "zero to one",
      "zero-to-one",
      "0 to 1",
      "0→1",
      "launched from scratch",
      "built from scratch",
      "north star",
      "smallest version",
      "ship and learn",
    ],
    title: "Tell me about a zero-to-one product you launched",
    body: `**Kalash (activation):** Users signed up, made one transaction, disappeared. Interviews surfaced: "Why should I stick around?" Founders assumed users saving ₹100 would accept ~₹103 checkout (100 + 3% GST) — it did not work.

**Principle:** Make value obvious early. Kalash returns 3% GST as Bitcoin that grows over time — most users did not know. JB redesigned onboarding to highlight this and added a daily streak with small rewards. Marketing budget shifted from low-performing campaigns to real value that compounds.

**MVP results:** Daily engagement up ~30%.

**Open (internal support):** Too much spend on Freshchat. JB designed internal support from scratch — chat inbox, ticket tagging, escalation flows. Cut costs roughly in half; agents got more control.

Mindset: "What is the smallest version we can ship and learn from?"`,
  },
  {
    id: "design-approach",
    triggers: [
      "approach a new design project",
      "new design project",
      "design process framework",
      "discover define design deliver",
      "4-step framework",
      "how do you start a project",
    ],
    title: "How do you approach a new design project?",
    body: `**4-step framework:**
1. **Discover** — business goals, user pain, audit
2. **Define** — JTBD, problem statements, success criteria
3. **Design** — sketches → wireframes → prototypes → feedback
4. **Deliver & learn** — final designs, QA, metrics, post-launch learnings

**Drivezy — keyless entry:** Discover (10 hosts, 20 renters; KYC friction). Define (streamline entry without losing trust). Design (3-step onboarding: selfie + doc scan + match preview). Deliver (progressive unlock UI — keyless adoption doubled in ~3 months).

**Open — CSV import:** Discover (complaints, no status visibility). Define (confidence during large imports). Design (progress bar, real-time error summary, retry). Deliver (import failures down ~40%; CSV uploads ~3× per week).`,
  },
  {
    id: "user-research",
    triggers: [
      "user research",
      "research methods",
      "qualitative quantitative",
      "usability testing",
      "funnel analysis",
      "card sorting",
      "mixpanel",
      "contextual inquiry",
    ],
    title: "What methods do you use for user research?",
    body: `Mix **qualitative + quantitative**.

**Qualitative:** usability testing, 1:1 interviews, diary studies, card sorting / tree testing.

**Quantitative:** funnel analysis, heatmaps, in-app surveys, Google Analytics / Mixpanel.

**FreshPrints — Add a Review:** Interviews on why users skip reviews + funnel data on PDP drop-off. Review form felt intimidating; users assumed photo upload was mandatory. Simplified copy and CTA — **+45% review submissions in 2 weeks**.

**Saltmine — workspace preferences:** Contextual inquiry with 5 large B2B clients + analytics on seat-plan usage. Admins needed approval flows the tool lacked — shaped the roadmap.`,
  },
  {
    id: "user-feedback",
    triggers: [
      "incorporate user feedback",
      "user feedback into design",
      "rice moscow",
      "close the loop",
      "feature request",
    ],
    title: "How do you incorporate user feedback into your designs?",
    body: `**Process:** Categorise (UI bug, usability, feature request) → prioritise (RICE, MoSCoW) → reflect changes visibly → close the loop with users.

**Open — UPI onboarding:** Complaints about slowness; testing showed lack of feedback, not speed. Added "verifying bank" animation with "takes 3–5 seconds" copy — perceived speed improved.

**FreshPrints — moodboard save:** Users clicked designs expecting save. Moved save to top-right (Pinterest pattern) — saved-design click-throughs **+29%**.`,
  },
  {
    id: "challenging-project",
    triggers: [
      "challenging project",
      "difficult project",
      "design versioning",
      "version history",
      "pricing model adoption",
      "automatic pricing trust",
    ],
    title: "Describe a challenging project and how you handled it",
    body: `**Drivezy — pricing adoption:** Hosts turned off automatic pricing. Partnered with data science to visualise pricing — peak demand, location surge, competitor pricing. Transparency raised adoption **41% → 58% in 6 weeks**.

**FreshPrints — design versioning:** Version history for custom designs under tight timeline; scope kept growing. Shipped in slices: undo/redo → version naming → preview diffs. Progressive delivery let the team test fast; PM valued the phased approach.`,
  },
  {
    id: "accessibility",
    triggers: [
      "accessibility",
      "accessible",
      "inclusive design",
      "wcag",
      "aria",
      "keyboard navigation",
      "dark mode",
      "vision-impaired",
    ],
    title: "How do you ensure your designs are accessible and inclusive?",
    body: `**Tactics:** WCAG contrast and typography, keyboard navigability, ARIA labels and alt text, testing with vision-impaired users, errors via text not colour alone.

**FreshPrints — PDP redesign:** Tab-focusable chips, text labels on icons, Stark checks — accessibility score **68% → 93%**.

**Groww — dark mode fund explorer:** Some older users struggled with readability. Added light/dark toggle in settings and increased contrast — more inclusive for eye strain.

**Open Financial:** Clear hierarchy, keyboard-friendly interactions, forgiving error states across regions and experience levels.`,
  },
  {
    id: "design-tools",
    triggers: [
      "design tools",
      "what tools",
      "figma",
      "sketch",
      "adobe xd",
      "maze",
      "lottie",
      "after effects",
      "hotjar",
      "amplitude",
    ],
    title: "What design tools are you proficient in?",
    body: `**UI / prototyping:** Figma (variants, auto layout), Sketch, Adobe XD

**Testing:** Maze, Useberry

**Collaboration:** FigJam, Notion, Whimsical

**Animation:** Lottie, After Effects (light use)

**Analytics:** Mixpanel, Amplitude, Hotjar

**FreshPrints Image Gen AI:** Figma interactive components simulated editing — saved dev team ~1 week of prototyping.

**Open:** Figma flows linked to Amplitude dashboards in Notion — PMs aligned flows with drop-off points.`,
  },
  {
    id: "design-trends",
    triggers: [
      "design trends",
      "stay updated",
      "ux collective",
      "lenny",
      "laws of ux",
      "dense discovery",
      "designbetter",
    ],
    title: "How do you stay updated with design trends and standards?",
    body: `**Newsletters:** Dense Discovery, UX Collective, Fintech Today

**Podcasts:** DesignBetter.co, Lenny's Podcast

**Books:** Laws of UX, Don't Make Me Think, Lean UX

**Communities:** Figma Discord, UX Stack Exchange, Growth Design Slack

**Applied examples:**
- UX Collective article on Tinder match-card transitions → subtle slide-in on FreshPrints saved-design gallery
- Lenny podcast on retention → A/B sticky CTA on FreshPrints PDPs → **+9% cart add rate**`,
  },
  {
    id: "critical-feedback",
    triggers: [
      "critical feedback",
      "received feedback",
      "spacing system",
      "design tokens",
      "flows too flat",
      "edge cases",
    ],
    title: "Can you describe a time when you received critical feedback?",
    body: `**FreshPrints / dev collaboration:** A frontend dev said spacing was not tokenised, causing inconsistency. Instead of defending, JB co-reviewed design tokens and rebuilt a spacing scale together — better design–dev trust; design QA time dropped.

**Saltmine:** Lead said flows were too flat — linear, no escape routes or edge cases. JB started adding cancel/edit/alternate paths in every journey. That feedback shaped design maturity significantly.`,
  },
  {
    id: "prioritization",
    triggers: [
      "prioritise features",
      "prioritize features",
      "prioritize tasks",
      "prioritise tasks",
      "rice scoring",
      "moscow",
      "must should could",
    ],
    title: "How do you prioritize features and tasks?",
    body: `**Frameworks:** RICE (Reach, Impact, Confidence, Effort), MoSCoW, tech feasibility with dev bandwidth, metric impact on north-star.

**FreshPrints — poll feature:** Dev capacity ~2 weeks. Shipped slices: Vote CTA → Vote Summary → Poll Creation. CTA alone still lifted engagement.

**Groww — watchlist:** Four portfolio features planned; RICE showed real-time watchlist alerts had highest confidence + reach. Prioritised first — **+20% time on portfolio view**.`,
  },
  {
    id: "recent-project",
    triggers: [
      "recent design project",
      "recent project",
      "walk me through a project",
      "activation and retention",
      "gst bitcoin",
      "3 percent gst",
      "daily investment streak",
      "daily engagement",
    ],
    title: "Walk me through a recent design project",
    body: `Financial product — large drop-off after one or two transactions (retention framed as the problem).

Funnel data + marketing qual + interviews (users 22–28). Insight: users did not understand core value — **3% GST returned as Bitcoin that can grow over time**.

JB owned framing and onboarding redesign: surfaced the benefit clearly; daily investment streak with small Bitcoin rewards for habit formation.

MVP launch — daily activity and retention improved meaningfully. Lesson: users disengage when value is invisible, not when they are uninterested.`,
  },
  {
    id: "research-feature",
    triggers: [
      "research for a new feature",
      "approach research",
      "where users hesitate",
      "support escalations",
    ],
    title: "How do you approach research for a new feature?",
    body: `Start where uncertainty is highest.

**Kalash:** Direct user access. **Enterprise (Cisco-style):** SMEs, support data, prior research. Same questions: where users hesitate, where mistakes are costly, where support escalates.

**Enterprise workflow example:** SMEs flagged policy confusion; research validated with users; JB iterated from feedback.

Research reduces risk — not artifact creation.`,
  },
  {
    id: "ambiguity",
    triggers: [
      "ambiguity",
      "unclear requirements",
      "automated pricing",
      "investor pressure",
    ],
    title: "How did you handle ambiguity?",
    body: `**Drivezy — automated pricing:** Unclear requirements, high investor pressure. Separated known constraints from assumptions; turned assumptions into testable questions; designed for flexibility without overcommitting early. Structure helped the team align and iterate.`,
  },
  {
    id: "checkout-payment",
    triggers: [
      "checkout",
      "payment flow",
      "trust breaks",
      "abandoning during confirmation",
    ],
    title: "How would you improve a checkout or payment flow?",
    body: `Start where trust breaks. Users abandoned at confirmation — not UI polish, but uncertainty whether money went through. Improved status feedback, clearer errors, explicit recovery steps. In payments, clarity and reassurance beat raw speed.`,
  },
  {
    id: "success-metrics",
    triggers: [
      "success metrics",
      "define metrics",
      "ux experiments",
      "guardrails",
      "primary metric",
    ],
    title: "How do you define success metrics for UX experiments?",
    body: `One primary metric plus guardrails. Kalash onboarding: activation primary; guardrails included checkout drop-offs and support tickets. Paired quant with qual to explain why numbers moved.`,
  },
  {
    id: "business-strategy",
    triggers: [
      "business strategy",
      "influenced strategy",
      "discovery sprint",
      "30 percent",
      "30%",
      "checkout drop",
      "arpu",
      "first transaction",
      "round numbers",
    ],
    title: "Tell me about a time you influenced product strategy",
    body: `**Kalash:** ~30% checkout drop-off. Many disliked 3% GST added on top.

Two-day discovery sprint + survey — users preferred saving round numbers. A/B test: with fee vs without on first transaction. **Without fee: +40% conversion, +44% retention, ARPU improved** — shifted company-wide activation strategy.

Principle: data shows the "what"; interviews show the "why".`,
  },
  {
    id: "resistance",
    triggers: [
      "resistance",
      "pushback",
      "another team",
      "engineering pushed back",
      "poll feature",
    ],
    title: "Tell me about a time you faced resistance from another team",
    body: `**Drivezy — automated pricing:** Engineering tired of frequent changes. JB paused, set regular check-ins, version-controlled design files, listened to tech constraints. Phased MVP — adoption **+11%**, revenue **+6%**.

**FreshPrints — poll feature:** Marketing loved it; devs said too complex. Shipped vote action first; validated interest before expanding scope.`,
  },
  {
    id: "user-vs-business",
    triggers: [
      "balance user",
      "business goals",
      "compliance",
      "fewer steps",
    ],
    title: "How do you balance user needs with business goals?",
    body: `**Kalash:** Users wanted fewer steps; compliance non-negotiable. Sequencing and transparency — explain why steps exist, group logically. Reduced friction while meeting business goals.`,
  },
  {
    id: "collaboration",
    triggers: [
      "collaborate with pm",
      "collaborate with engineer",
      "pms and engineers",
      "work with engineers",
    ],
    title: "How do you collaborate with PMs and engineers?",
    body: `Align early on goals and constraints. At FreshPrints, designers act as owners — engineers in flow discussions, PMs on metrics before design. Fewer late trade-offs, more trust.`,
  },
  {
    id: "team-growth",
    triggers: [
      "helped someone grow",
      "team growth",
      "championed growth",
      "junior designer",
      "promotion",
      "1-on-1",
      "one on one",
    ],
    title: "Tell me about a time you helped someone grow",
    body: `**Kalash:** Junior designer stuck on small tickets wanted bigger ownership. Split onboarding into Workstream A (quick wins: tooltips, layout) and Workstream B (bold first-investment redesign). Weekly coaching on PM presentations and dev alignment. She owned the redesign — promoted next cycle.

**FreshPrints:** Weekly 1:1s with a rule — "This is your hour, not just mine." Designers share notes a day ahead; JB comments before the meeting so time goes to goals, blockers, confidence — not status updates. Helped the team think bigger about growth.`,
  },
  {
    id: "conflict",
    triggers: [
      "dealt with conflict",
      "handled conflict",
      "engineering manager",
      "cc'd leadership",
      "copied leadership",
    ],
    title: "Tell me about a time you handled conflict",
    body: `**Open:** Engineering manager cc'd leadership listing design problems. JB booked a private 1:1 — real issue was team capacity, not design quality. Reframed into core-now vs optional-later; shipped on time; he thanked JB for listening.

Conflict often comes from misalignment, not bad intent.`,
  },
  {
    id: "work-process",
    triggers: [
      "work process",
      "your process",
      "how do you work",
      "quarterly outcomes",
      "product manager in a designer",
    ],
    title: "What's your work process?",
    body: `Works from goals, not screens — "product manager in a designer's body."

**Example flow (increase first-time orders):** audit data (Mixpanel, support) → user interviews (emotional blockers) → journey map (drop-offs) → sketch → prototype → test and repeat.

**FreshPrints Image Gen AI:** Broke into flows — text tool, colour picker, generate button, edit layers — testing each before the full build.

Structured but flexible: quarterly outcomes, measurable impact. Step by step, problems become outcomes.`,
  },
] as const;

function normaliseQuestion(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Best matching career narrative for fallback replies — null if no strong match. */
export function resolveCareerKnowledgeReply(userMessage: string): string | null {
  const text = normaliseQuestion(userMessage);
  if (!text) return null;

  let best: CareerFaqEntry | null = null;
  let bestScore = 0;

  for (const entry of CAREER_FAQ_ENTRIES) {
    let score = 0;
    for (const trigger of entry.triggers) {
      if (text.includes(trigger)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (!best || bestScore === 0) return null;

  return `${best.body.trim()}

Ask about [Projects](/projects) for case-study proof, or [Craft](/craft) for interaction work.`;
}

/** Full career pointers for the OpenAI system prompt. */
export function buildCareerKnowledgeSection(): string {
  const entries = CAREER_FAQ_ENTRIES.map(
    (entry) => `### ${entry.title}\n${entry.body}`,
  ).join("\n\n");

  return `
## Career & interview pointers (use when asked — never offer as starter chips)
When visitors ask about JB's background, FreshPrints, Piggy, Kalash, process, metrics, research, collaboration, conflict, tools, or interview-style stories, answer from the narratives below. Synthesise in Friends trio voice; keep metrics accurate. Link to /projects case studies when relevant (FreshPrints Design System, Image Gen AI, Piggy, Kalash, Saltbot).

${entries}
`.trim();
}
