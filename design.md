# Design notes

Implementation reference for the portfolio. For routes and content ownership, see [`IA.md`](./IA.md). For setup and deploy, see [`README.md`](./README.md).

---

## Design system

Site-wide visual language — not a component library. Tokens live in CSS (`src/app/globals.css`) and JS mirrors (`src/lib/constants.ts`).

### Surfaces & accents

| Token | CSS | JS constant | Hex | Use |
|-------|-----|-------------|-----|-----|
| Site canvas | `--site-canvas` / `--background` | `SITE_CANVAS` | `#09090b` | Default page canvas (index, craft, 404) |
| Darkroom canvas | `--darkroom-canvas` | `DARKROOM_CANVAS` | `#050507` | Near-black studio mood when darkroom is on |
| Brand accent (soft sky) | `--brand-accent` | `BRAND_ACCENT` | `#a3d9ff` | Manifest panel, chat bubbles, footer strip, index minimap active |
| Brand accent soft | `--brand-accent-soft` | — | `#c8e8ff` | Softer sky highlights |
| Brand accent foreground | `--brand-accent-foreground` | — | `#09090b` | Text on sky surfaces |
| Presence accent (cyan) | `--presence-accent` | `PRESENCE_ACCENT` | `#02BCEA` | Cursor label, case-study scroll beam, 404 CTA, darkroom accents |
| Presence foreground | `--presence-accent-foreground` | `PRESENCE_ACCENT_FOREGROUND` | `#0A0A0A` | Text on presence cyan |

Tailwind aliases (via `@theme inline`): `bg-brand-accent`, `text-brand-accent-soft`, `bg-presence-accent`, `text-presence-accent`, etc.

**Rule of thumb:** soft sky = chrome / chat / Manifest; presence cyan = “you are here” / discovery / darkroom.

### Typography

| Role | Source |
|------|--------|
| UI / body | IBM Plex Sans — `src/lib/fonts.ts` → `ibmPlexSans` |
| Hand / back-link flavour | Just Another Hand — `justAnotherHand` |
| Stack helper | `SITE_FONT_STACK` |

Case study headings use editorial components in `case-study-prose.tsx` — title case rules in `.cursor/rules/case-study-headings.mdc`.

### Index modes

| Mode | How to toggle | What changes | Context / styles |
|------|---------------|--------------|------------------|
| **Wireframe** | Centre cross on index, or chat `wireframe` / `wireframe mode` | Layout strokes, blueprint overlay | `wireframe-context.tsx`, `.wireframe-mode` |
| **Darkroom** | Chat `darkroom` / `darkroom mode` | Near-black canvas, presence cyan labels & Manifest | `darkroom-context.tsx`, `html.darkroom-mode`, `.darkroom-mode` |
| **Askew** | Chat `askew` / `tilt` | Index track tips ~−2° | `sessionStorage` `jb_askew`, `.index-askew` |
| **Barrel roll** | Chat `do a barrel roll` | One 360° spin of the slider track | `jb-barrel-roll` event, `.index-barrel-roll` |

Prefer CSS variables over hard-coded hex when adding new chrome that uses these accents.

### Content protection (soft deterrents)

Site-wide client guard: `src/components/content-protection.tsx` (mounted in `layout.tsx`). CSS class `content-protection` on `<html>`.

| Deterred | How |
|----------|-----|
| Right-click / context menu | `contextmenu` preventDefault (except inputs) |
| Copy / cut | `copy` / `cut` + Cmd/Ctrl+C / X |
| Select all / save / print / view-source shortcuts | Cmd/Ctrl+A / S / P / U |
| Drag media to download | `dragstart` on img/video/svg + `-webkit-user-drag: none` |
| Browser print | `@media print` blanks the page |

**Not blocked:** OS screenshots, DevTools, browser menu View Source / Save, curl, disable-JS. Chat and form fields remain selectable and copyable.

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
| Case Studies | Case Studies | `/projects` (monogram: **Project**) |
| Case Notes | Case Notes | `/notes/1` |
| Design Review | Design Review | `/craft/design-review-checklist` |
| Craft | Craft | External — `CRAFT_EXTERNAL_URL` (`design-to-build.vercel.app`) in a new tab |
| Contact | Contact | in-page contact sheet |
| Manifest | Manifest | in-page manifest sheet |

Monogram pan speed is normalised by overflow distance in `section-frame-monogram.tsx` so shorter labels scroll at the same pixel velocity as longer ones.

`/ideas` redirects to `/` (`next.config.ts`) — the Ideas index frame is retired.

---

## Easter eggs

Soft discovery moments — document here for maintainers; JB_AI should not dump the full list unprompted (see `ai-chat-knowledge.ts`).

| Egg | Trigger | Behaviour | Primary files |
|-----|---------|-----------|---------------|
| Chat secrets | `pivot`, `we were on a break`, `friends`, `central perk`, `could this be any more` | Friends-flavoured reply + public case link | `ai-chat-secrets.ts`, `ai-chat-ball.tsx` |
| Wireframe | `wireframe` / centre cross | Index layout debug | `wireframe-context.tsx`, `ai-chat-commands.client.ts` |
| Darkroom | `darkroom` | Near-black studio + presence cyan | `darkroom-context.tsx`, `globals.css` |
| Barrel roll | `do a barrel roll` | 360° spin on index | `google-easter-eggs.ts`, `index-experience.tsx` |
| Askew | `askew` / `tilt` | Tip index ~2° (toggle) | `google-easter-eggs.ts` |
| I'm Feeling Lucky | `i'm feeling lucky` | Navigate to a random public case | `google-easter-eggs.ts` |
| Cursor personality | **Shift+click** empty canvas | Cycle label: I'm here → Still here → Hire me? | `site-cursor.tsx` |
| Minimap remix | Visit Manifest slide **3×** | Case-study beam label → **Still making it.** | `manifest-visits.ts`, `scroll-minimap-ruler.tsx` |
| 404 wit | Any unknown route | “This page ghosted us.” + Policy Copilot CTA | `src/app/not-found.tsx` |
| Console tip | Open DevTools on index | One-time styled hint listing Google-style commands | `logIndexConsoleEasterEgg()` |

Analytics: `ai_chat_secret`, `ai_chat_darkroom_toggle`, `ai_chat_wireframe_toggle`, `cursor_label_cycle`, `manifest_visit`, `google_easter_egg` — see § Analytics.

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
- **Ideas slugs** (`isIdeasGalleryExperiment`) — legacy AI demos; `/ideas` redirects home (registry rows may still exist for media reuse).

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
4. Do **not** add new AI experiment slugs for a public Ideas gallery — that surface is retired.

---

## Ideas gallery (retired)

`/ideas` and `/ideas/*` **redirect to `/`** (`next.config.ts`). External AI demos are no longer a primary nav destination; registry + `ideas-page-data.ts` may remain for assets or archival reference.

| Piece | Location |
|-------|----------|
| Redirect | `next.config.ts` |
| Legacy slug list | `IDEAS_EXPERIMENT_SLUGS` in `experiments-registry.ts` |
| Legacy card meta | `src/lib/ideas-page-data.ts` |

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
| Client commands | `src/lib/ai-chat-commands.client.ts` (wireframe, darkroom) |
| Chat secrets | `src/lib/ai-chat-secrets.ts` |
| Google-style eggs | `src/lib/google-easter-eggs.ts` |
| OpenAI stream | `src/lib/ai-chat-openai.server.ts` |
| GIPHY reactions | `src/lib/ai-chat-giphy.server.ts` |
| Session limits | `src/lib/ai-chat-config.ts`, cookie helpers |

Reply path: client commands / secrets → detect intent → static chip reply or OpenAI stream → optional GIPHY GIF → follow-up suggestions. After the OpenAI session budget is used, curated fallback replies still respond without an API call.

Promote **public** case studies only (Policy Copilot, Saltbot, FreshPrints, Kalash, etc.) — do not surface hidden / unpublished project URLs.

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

Infrastructure for blurring case study body copy until a case study is **published**. Scheduled slugs use a **daily IST reset** — the countdown rolls over at midnight Asia/Kolkata but content stays blurred until the slug is removed from the schedule.

| Piece | Location |
|-------|----------|
| Schedule | `src/lib/case-study-reveal-schedule.ts` |
| Hook | `useCaseStudyRevealCountdownForSlug(slug)` |
| Countdown UI | `CaseStudyRevealCountdown` in hero `metaBottom` |
| Blur wrapper | `blur-xl` + `pointer-events-none` until `isRevealed` |

`daily-reset` mode: remaining time = until next **IST midnight (00:00 Asia/Kolkata)**; resets every day; `isRevealed` stays `false` until publish. To publish: remove the slug from `CASE_STUDY_REVEAL_SCHEDULE` and follow `.cursor/rules/case-study-reveal-timer.mdc`.

| Slug | Mode | Status |
|------|------|--------|
| — | — | No countdown-gated slugs — `CASE_STUDY_REVEAL_SCHEDULE` is `{}` |

### Password gate (Cisco)

Soft access unlock for pre-release case studies — hero + meta stay readable; **full body content** stays in place with `blur-xl`; access card is a sticky band on top of that blur.

| Piece | Location |
|-------|----------|
| Gate config | `src/lib/case-study-password-gate.ts` → `CASE_STUDY_ACCESS_GATED_SLUGS` |
| Overlay UI | `src/components/case-studies/case-study-password-gate.tsx` |
| Wired on | `CiscoPolicyCopilot.tsx` |
| Flow | Enter email → button becomes **Press 3 times to unlock** → unlock |
| Email log | `POST /api/case-study-access` → same Google Sheet webhook as JB_AI (`Email: …`) |
| Persistence | `sessionStorage` (`jb_case_unlock_<slug>`) |

Analytics: `case_study_access_request`, `case_study_access_unlock` with `slug`.

Rules: `.cursor/rules/case-study-reveal-timer.mdc`

### Policy Copilot interactive demo

Living-canvas workspace after **Begin** — reference home screen with sidebar, then inline policy build.

| Piece | Location |
|-------|----------|
| Home screen (reference UI) | `policy-copilot-home.tsx` — hero, intent card, secondary starts |
| Shared shell | `policy-copilot-shell.tsx` — sidebar, flow progress, atmosphere, motion primitives |
| Interpret intent (Step 1) | `policy-copilot-interpret.tsx` — three-column chat + contract panel |
| Case study shell | `CiscoPolicyCopilot.tsx` |
| Living workspace | `policy-copilot-workspace.tsx` |
| Home + canvas data | `policy-copilot-data.ts` — `COPILOT_NAV_ITEMS`, `COPILOT_RECENT_POLICIES`, `INTENT_CARD_EXAMPLE` |
| Home tokens | `policy-copilot-momentum.ts` → `CLAUDE` (warm dark + coral) |
| Canvas tokens | `CLAUDE` (same token set for home and post-Begin canvas) |

**Start Over** remounts the workspace via `copilotKey` in `CiscoPolicyCopilot.tsx`.

**Dev-only preview:** `http://localhost:3000/dev/policy-copilot` — isolated workspace (404 in production builds). Same component as the case study hero; not in sitemap or nav.

### Analytics

Custom Vercel Web Analytics events in `src/lib/analytics.ts`. Fired from page shells, the index slider, galleries, JBAI chat, and media players.

| Event | Key properties | When |
|-------|----------------|------|
| `site_entry` | `landing_path`, `referrer_host`, `timezone`, `locale` | Once per session on first page load |
| `index_slide_click` | `frame_id`, `frame_label`, `href`, `external` | Index slide link click (internal or new-tab external) |
| `ai_chat_darkroom_toggle` | `enabled` | Chat toggles darkroom mood |
| `ai_chat_secret` | `secret` | Chat secret password unlock |
| `cursor_label_cycle` | `label` | Shift-click cycles custom cursor label |
| `manifest_visit` | `count` | Manifest slide becomes active |
| `google_easter_egg` | `kind` | Barrel roll, askew, or I'm Feeling Lucky |
| `case_study_access_request` | `slug` | Email captured for gated case study |
| `case_study_access_unlock` | `slug` | Triple-press unlock completed |
| `index_frame_view` | `frame_id`, `frame_label`, `index` | Index frame enters view |
| `index_frame_navigate` | `from`, `to`, `method` | Index frame change (scroll, nav, keyboard, minimap) |
| `project_list_click` | `slug` | Projects index row click |
| `portfolio_1_click` | `url` | Projects index “Interested in portfolio 1.0?” CTA |
| `project_open` | `slug`, `source` | Case study page load |
| `case_study_scroll_depth` | `slug`, `depth` | 25 / 50 / 75 / 100 % scroll milestones |
| `projects_view` | — | `/projects` page load |
| `craft_view` | — | `/craft` page load |
| `craft_item_click` | `slug`, `category`, `external` | Craft gallery item click |
| `craft_filter` | `filter` | Craft filter tab change (legacy bento) |
| `ai_experiment_view` | — | Legacy `/ideas` page load (redirects home) |
| `ai_experiment_detail_view` | `slug` | Ideas detail modal open |
| `ai_experiment_item_click` | `slug`, `cta`, `url` | Ideas card or live-demo CTA |
| `external_demo_open` | `slug`, `url`, `surface` | External demo link |
| `design_review_view` | `slug` | Craft essay page load |
| `archive_view` | — | `/archive` page load |
| `field_notes_view` | `note_id`, `title` | JB's Field Notes article page load (`/notes/1`) |
| `media_play` | `surface`, `media_id`, `slug?` | Video or motion autoplay / play |
| `contact_click` | `method` | LinkedIn, email, or manual contact |
| `resume_download` | — | Resume PDF download |
| `ai_chat_open` | `source` | JBAI panel opened |
| `ai_chat_chip_click` | `intent_id` | Suggested prompt chip |
| `ai_chat_message` | `source` | User message sent (`chip` or `typed`) |
| `ai_chat_reply` | `source` | Assistant reply source (`static`, `openai`, `fallback`) |
| `ai_chat_intent` | `intent_id`, `confidence`, `input?`, `goal?` | Detected visitor goal |
| `ai_chat_session_messages` | counts | Chat close — transcript breakdown |
| `ai_chat_close` | `message_count` | Chat panel closed |
| `ai_chat_wireframe_toggle` | `enabled` | Wireframe mode toggle |
| `ai_chat_gif` | `giphy_id?` | Reaction GIF shown |
| `ai_chat_error` | `reason` | Chat stream or network error |
| `policy_copilot_demo` | `action`, `slug`, `scenario_id?`, `prompt?`, `confidence?` | Cisco hero workspace — intent, clarifications, draft, validation, simulation, recommendations, approve, reset |

### Page-wise tracking

| Route | Hook / component | Event(s) |
|-------|------------------|----------|
| `/` | `use-scroll-slider.ts`, `index-experience.tsx` | `index_frame_view`, `index_frame_navigate`, `index_slide_click`, `manifest_visit`, barrel/askew listeners |
| `/projects` | `use-projects-page-analytics.ts` | `projects_view` |
| `/projects` rows | `projects-list.tsx` | `project_list_click`, `portfolio_1_click` |
| `/projects/[slug]` | `case-study-page-shell.tsx` → `use-case-study-page-analytics.ts` | `project_open`, `case_study_scroll_depth` (25 / 50 / 75 / 100 %) |
| `/projects/cisco-policy-copilot` | `policy-copilot-workspace.tsx`, `CiscoPolicyCopilot.tsx` | `policy_copilot_demo` — see actions below |
| `/craft` | `use-craft-page-analytics.ts` | `craft_view` |
| `/craft/[slug]` | `craft-article-page-analytics.tsx` | `design_review_view` |
| `/archive` | `use-archive-page-analytics.ts` | `archive_view` |
| `/notes/1` | `field-notes-page-analytics.tsx` | `field_notes_view` |
| Case study / craft media | `use-track-media-play.ts` | `media_play` |
| All pages | `site-entry-analytics.tsx` | `site_entry` (once per session) |
| JBAI chat | `ai-chat/*` | `ai_chat_*` events, `google_easter_egg` |

**`policy_copilot_demo` actions:** `prompt_select` · `understand_intent` · `clarification_answer` · `draft_revealed` · `validation_complete` · `simulation_visible` · `recommendation_apply` · `recommendation_dismiss` · `approve` · `reset`

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
| Hero interactive demo | `PolicyCopilotWorkspace` — living canvas (Claude-inspired tokens in `policy-copilot-momentum.ts`) |
| Impact cards | `idea-press`, `handoff-path`, `trust-bridge`, `sort-by-purpose` |
| Opportunity | `policy-copilot-opportunity` |
| Inspiration (Google Maps) | `policy-copilot-google-maps-inspiration` |
| From Copilot to Agent | `policy-copilot-decision-triptych` |
| Agent framework lifecycle | `policy-copilot-lifecycle-triptych` |
| Understand / Propose UI | `cisco-policy-copilot-trust-ui`, `cisco-policy-copilot-propose-recommend-ui` (CDN SVGs in `asset-cdn.ts`) |

### SEO and social (case studies)

| Piece | Location |
|-------|----------|
| Meta description builder | `src/lib/seo.ts` → `buildCaseStudyMetaDescription()` |
| Home / projects / craft blurbs | `HOME_SEO_DESCRIPTION`, `PROJECTS_SEO_DESCRIPTION`, `CRAFT_SEO_DESCRIPTION` |
| Per-slug keywords | `CASE_STUDY_SEO_KEYWORDS` in `seo.ts` |
| OG image | `HOVER_THUMBNAIL_OVERRIDES[slug]` in `projects-list-data.ts` |
| Open Graph + Twitter | `buildSocialMetadata()` — `summary_large_image`, `twitter:creator` |
| Article JSON-LD | `caseStudyArticleJsonLd()` — breadcrumb label **Case Studies** |
| Sitemap | `sitemap.ts` — Cisco `0.95`; drafts in `NOINDEX_PROJECT_SLUGS` omitted |
| Robots | `robots.ts` — disallow `/api/`, `/dev/`, `/ideas` |

Canonical share URL: `https://<domain>/projects/cisco-policy-copilot` (also `/recent`).

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
