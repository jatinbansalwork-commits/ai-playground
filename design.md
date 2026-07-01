# Design notes

Implementation reference for the portfolio. For routes and content ownership, see [`IA.md`](./IA.md). For setup and deploy, see [`README.md`](./README.md).

---

## Index slider

The homepage is a horizontal scroll-driven frame carousel.

| Piece | Location |
|-------|----------|
| Frame definitions | `src/lib/constants.ts` → `FRAMES` |
| Scroll geometry | `SCROLL_RANGE`, `FRAME_STRIDE`, `SCROLL_PER_FRAME` in `constants.ts` |
| Experience shell | `src/components/slider/index-experience.tsx` |
| Section panels | `src/components/slider/section-frame.tsx` |

### Frames (in order)

| Frame | Label | Destination |
|-------|-------|-------------|
| Hero | JB Portfolio | — |
| Projects | Projects | `/projects` |
| Ideas | AI Experiment | `/ideas` |
| Design Review | My favorite | `/craft/design-review-checklist` |
| Craft | Craft | `/craft` |
| Archive | Me | `/archive` |
| Contact | Contact | in-page contact sheet |
| Manifest | Manifest | in-page manifest sheet |

Monogram pan speed is normalised by overflow distance in `section-frame-monogram.tsx` so shorter labels scroll at the same pixel velocity as longer ones.

**Wireframe mode** — layout debug overlay on the index. Toggle via the centre cross on the homepage or by typing `wireframe mode` in JBAI. Context: `src/context/wireframe-context.tsx`.

---

## Craft gallery

Creative work — motion graphics, illustrations, and essays — in a bento grid at `/craft`.

### Source of truth

| Piece | Location |
|-------|----------|
| Registry (all entries) | `src/lib/experiments-registry.ts` → `EXPERIMENTS_REGISTRY` |
| CDN preview keys | `src/lib/asset-cdn.ts` → `EXPERIMENT_CDN_MEDIA` |
| Filter chips & layout | `src/lib/experiments-filters.ts` |
| Bento grid | `src/components/experiments/experiments-bento-grid.tsx` |
| Essay routes | `src/app/craft/[slug]/page.tsx` |

### What appears on `/craft`

`getExperimentGalleryItems()` returns registry rows **except**:

- **Article-only** entries (`isArticleOnlyExperiment`) — essays stay at `/craft/[slug]` but are omitted from the grid (reachable from the index Design Review slide).
- **Ideas slugs** (`isIdeasGalleryExperiment`) — live on `/ideas` instead.

### Filter tabs

| Tab | Category id | Default? |
|-----|-------------|----------|
| All | `all` | — |
| Motion Graphic | `motion-graphic` | **Yes** (default when no `?filter=` param) |
| Illustration | `illustration` | — |

Legacy `?filter=article` and `?filter=ai-experiment` fall back to the default Motion Graphic tab.

### Category layout rules

| Category | Grid span | CTA |
|----------|-----------|-----|
| `motion-graphic` | 2 columns | None (media-only) |
| `illustration` | 1 column | None (media-only) |
| `article` | 1 column | Read Essay |
| `ai-experiment` | 1 column | Try Now |

On the **All** tab, multi-category entries expand to one card per category (article cards are skipped). Per-slug aspect overrides live in `EXPERIMENT_PREVIEW_ASPECT_OVERRIDES`.

### Adding a Craft entry

1. Add a row to `EXPERIMENTS_REGISTRY` with `slug`, `title`, `categories`, and `media`.
2. Wire CDN preview in `EXPERIMENT_CDN_MEDIA` if needed.
3. For essays, add an `article` block — route is automatic at `/craft/[slug]`.
4. Do **not** add AI experiment slugs here if they belong on Ideas — use `IDEAS_EXPERIMENT_SLUGS` instead.

---

## Ideas gallery

External AI side projects at `/ideas` — detail.design-style cards with preview media, chips, editor notes, and **Try Now** links.

### Source of truth

| Piece | Location |
|-------|----------|
| Slug list | `IDEAS_EXPERIMENT_SLUGS` in `experiments-registry.ts` |
| Intro copy | `src/lib/ideas-page-data.ts` → `IDEAS_PAGE_INTRO` |
| Per-card meta | `IDEAS_CARD_META` in `ideas-page-data.ts` (subtext, chips, editor note, preview size) |
| Grid & modals | `src/components/ideas/*` |

### Current demos

| Slug | Title | External link |
|------|-------|---------------|
| `ghost-spacer` | Lock in Police | Registry `href` |
| `spring-physics` | Miner Gift | Registry `href` |
| `click-sound` | DoodleLab | Registry `href` |
| `scroll-slider` | FriendCaptcha | Registry `href` |
| `clip-reveal` | Focus Mode | Registry `href` |

Registry rows must keep `categories: ["ai-experiment"]` and `external: true`. Preview media reuses `EXPERIMENT_CDN_MEDIA` keys shared with the experiments registry.

### Adding an Ideas demo

1. Add the full registry entry in `EXPERIMENTS_REGISTRY`.
2. Append the slug to `IDEAS_EXPERIMENT_SLUGS`.
3. Add card meta in `IDEAS_CARD_META` (`ideas-page-data.ts`).

---

## JBAI (site chat)

Floating assistant (`JB_AI`) on all pages.

| Piece | Location |
|-------|----------|
| FAB + panel UI | `src/components/ai-chat/*` |
| API route | `src/app/api/chat/route.ts` |
| Intents & chips | `src/lib/ai-chat-intents.ts` |
| Question routing | `src/lib/ai-chat-question-intent.ts` |
| Knowledge bank | `src/lib/ai-chat-knowledge.ts`, `ai-chat-career-knowledge.ts` |
| OpenAI stream | `src/lib/ai-chat-openai.server.ts` |
| GIPHY reactions | `src/lib/ai-chat-giphy.server.ts` |
| Session limits | `src/lib/ai-chat-config.ts`, cookie helpers |

Reply path: detect intent → static chip reply or OpenAI stream → optional GIPHY GIF → follow-up suggestions. After the OpenAI session budget is used, curated fallback replies still respond without an API call.

---

## Case studies

Long-form project pages at `/projects/[slug]`.

### Wiring

| Piece | Location |
|-------|----------|
| Metadata | `src/lib/project-content.ts` |
| Body layout | `src/components/case-studies/<Component>.tsx` |
| Registry / href helper | `src/lib/projects-registry.ts` |
| Dynamic import gateway | `src/components/projects/dynamic-case-study-gateway.tsx` |
| Scroll shell + analytics | `src/components/projects/case-study-page-shell.tsx` |
| Hero (title, meta, NDA notice) | `src/components/case-studies/case-study-hero.tsx` |
| Projects index | `src/lib/projects-list-data.ts` |

Add a case study: entry in `project-content.ts`, new `src/components/case-studies/YourProject.tsx`, register in `dynamic-case-study-gateway.tsx`.

### Pre-launch reveal gate (optional)

Infrastructure for blurring case study body copy until a **worldwide UTC** countdown finishes. **Cisco Policy Copilot** is currently scheduled.

| Piece | Location |
|-------|----------|
| Schedule | `src/lib/case-study-reveal-schedule.ts` |
| Hook | `useCaseStudyRevealCountdownForSlug(slug)` |
| Countdown UI | `CaseStudyRevealCountdown` in hero `metaBottom` |
| Blur wrapper | `blur-xl` + `pointer-events-none` until `isRevealed` |

Unlock instant = `startsAtUtc + CASE_STUDY_REVEAL_DURATION_MS` (24 hours).

| Slug | `startsAtUtc` (reset here) | Unlock (UTC) |
|------|---------------------------|--------------|
| `cisco-policy-copilot` | `2026-07-01T05:50:43.000Z` | `2026-07-02T05:50:43.000Z` |

Rules: `.cursor/rules/case-study-reveal-timer.mdc`

### Analytics

Custom Vercel Web Analytics events in `src/lib/analytics.ts`. Fired from page shells, the index slider, galleries, JBAI chat, and media players.

| Event | Key properties | When |
|-------|----------------|------|
| `site_entry` | `landing_path`, `referrer_host`, `timezone`, `locale` | Once per session on first page load |
| `index_slide_click` | `frame_id`, `frame_label`, `href` | Index slide link click (internal routes) |
| `index_frame_view` | `frame_id`, `frame_label`, `index` | Index frame enters view |
| `index_frame_navigate` | `from`, `to`, `method` | Index frame change (scroll, nav, keyboard, minimap) |
| `project_list_click` | `slug` | Projects index row click |
| `project_open` | `slug`, `source` | Case study page load |
| `case_study_scroll_depth` | `slug`, `depth` | 25 / 50 / 75 / 100 % scroll milestones |
| `projects_view` | — | `/projects` page load |
| `craft_view` | — | `/craft` page load |
| `craft_item_click` | `slug`, `category`, `external` | Craft gallery item click |
| `craft_filter` | `filter` | Craft filter tab change (legacy bento) |
| `ai_experiment_view` | — | `/ideas` page load |
| `ai_experiment_detail_view` | `slug` | Ideas detail modal open |
| `ai_experiment_item_click` | `slug`, `cta`, `url` | Ideas card or live-demo CTA |
| `external_demo_open` | `slug`, `url`, `surface` | External demo link |
| `design_review_view` | `slug` | Craft essay page load |
| `archive_view` | — | `/archive` page load |
| `media_play` | `surface`, `media_id`, `slug?` | Video or motion autoplay / play |
| `contact_click` | `method` | LinkedIn, email, or manual contact |
| `resume_download` | — | Resume PDF download |
| `ai_chat_open` | `source` | JBAI panel opened |
| `ai_chat_chip_click` | `intent_id` | Suggested prompt chip |
| `ai_chat_message` | `source` | User message sent (`chip` or `typed`) |
| `ai_chat_reply` | `source` | Assistant reply source (`static`, `openai`, `fallback`) |
| `ai_chat_intent` | `intent_id`, `confidence`, `input?` | Detected visitor goal |
| `ai_chat_session_messages` | counts | Chat close — transcript breakdown |
| `ai_chat_close` | `message_count` | Chat panel closed |
| `ai_chat_wireframe_toggle` | `enabled` | Wireframe mode toggle |
| `ai_chat_gif` | `giphy_id?` | Reaction GIF shown |
| `ai_chat_error` | `reason` | Chat stream or network error |

Dashboard quick reference: [`README.md` § Vercel Web Analytics](./README.md#vercel-web-analytics-traffic-and-behaviour).

### Media

| Source | Use for | Registration |
|--------|---------|--------------|
| Vercel Blob | UI screenshots, video, legacy PNGs | `CASE_STUDY_CDN_MEDIA` in `asset-cdn.ts` |
| `jb_illustrations/` | Hand-drawn editorial PNGs | `JB_ILLUSTRATIONS` → `getJbIllustration()` |
| `cisco/` local | Large illustration boards | Path in `CASE_STUDY_CDN_MEDIA` or direct `/assets/...` |

`CaseStudyMedia` props worth knowing:

- `aspect="natural"` — intrinsic ratio when loaded; 16:9 placeholder when empty
- `shellBackground="#0D1114"` — dark editorial frame behind Ian/JB art
- Remote CDN images lazy-load via `IntersectionObserver` (240px root margin)

`CaseStudyActivationModels` supports `showImageSlot`, `imagePosition: "top" | "bottom"`, and optional `imageSrc`.

---

## Case study editorial components

Import from `src/components/case-studies/case-study-prose.tsx` unless noted.

| Component | Use for |
|-----------|---------|
| `CaseStudyProse` | Prose band wrapper |
| `CaseStudyH1` / `CaseStudyChapter` | Opening narrative line (hero keeps page `h1`) |
| `CaseStudyH2` / `CaseStudyH3` | Section and subsection headings — **title case** |
| `CaseStudyParagraph` | Body copy |
| `CaseStudyQuote` | Pull quotes |
| `CaseStudyList` | Bullets; supports `"Lead: body"` via `splitCaseStudyListLead` |
| `CaseStudyChips` | Tag-style lists (e.g. trust principles) |
| `CaseStudyQuestionStack` | Numbered decision questions |
| `CaseStudyTable` | Comparison / activation tables |
| `CaseStudyWide` + `CaseStudyMedia` | Full-width media band |
| `CaseStudyDivider` | Section rule |
| `CaseStudyImpactCards` | Numbered impact outcomes panel — `case-study-impact-cards.tsx` |
| `CaseStudyActivationModels` | Numbered card grid for activation / responsibility models |

Text column width: `CASE_STUDY_TEXT_COLUMN` in `case-study-editorial.ts` (currently `max-w-4xl`).

Heading and caption rules: `.cursor/rules/case-study-headings.mdc` · Copy/spelling: `.cursor/rules/spelling.mdc`

---

## JB illustration library

Hand-drawn editorial illustrations (English labels). Adapted from [Ian Xiaohei Illustrations](https://github.com/helloianneo/ian-xiaohei-illustrations) (MIT); this repo uses the **JB** naming and paths below.

| Piece | Location |
|-------|----------|
| Cursor skill | `.cursor/skills/jb_illustrations/` (`name: jb_illustrations`) |
| Character IP | `.cursor/skills/jb_illustrations/references/jb-character-ip.md` |
| Published PNGs | `public/assets/illustrations/jb_illustrations/*-en.png` |
| ID → path map | `src/lib/jb-illustration-library.ts` → `getJbIllustration()` |

### Background mode

| Target | Mode | Notes |
|--------|------|-------|
| `CaseStudyImpactCards` | **light** | White card panel — e.g. `11-idea-press-en.png` |
| `CaseStudyMedia` in dark prose | **dark** | Near-black art; use `shellBackground="#0D1114"` on the frame |

### Registering a new illustration

1. Save PNG to `public/assets/illustrations/jb_illustrations/{id}-en.png`
2. Add kebab-case key to `JB_ILLUSTRATIONS`
3. Reference with `getJbIllustration("your-id")` in the case study TSX

### Cisco Policy Copilot IDs (reference)

| Section | Library ID |
|---------|------------|
| Impact cards | `idea-press`, `handoff-path`, `trust-bridge`, `sort-by-purpose` |
| Opportunity | `policy-copilot-opportunity` |
| Inspiration (Google Maps) | `policy-copilot-google-maps-inspiration` |
| From Copilot to Agent | `policy-copilot-decision-triptych` |
| Agent framework lifecycle | `policy-copilot-lifecycle-triptych` |
| Understand / Propose UI | `cisco-policy-copilot-trust-ui`, `cisco-policy-copilot-propose-recommend-ui` (CDN SVGs in `asset-cdn.ts`) |

`CaseStudyImpactCards` accepts an optional `illustration` id for a text + illustration row layout:

```tsx
{
  illustration: "trust-bridge",
  title: "Improved Decision Confidence",
  description: "...",
}
```

Preview images for docs: see [`README.md`](./README.md#preview).

---

## Projects index

- **List data:** `src/lib/projects-list-data.ts` — syncs titles/years from `project-content.ts`
- **Hover thumbnails:** `HOVER_THUMBNAIL_OVERRIDES` (CDN paths)
- **Hidden slugs:** `HIDDEN_PROJECT_SLUGS` — excluded from `/projects` until ready (direct URL still works)
- **Noindex drafts:** `NOINDEX_PROJECT_SLUGS` — omitted from sitemap

See [`IA.md`](./IA.md) for visibility rules.
