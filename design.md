# Design notes

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
| Design Review | Design Review | `/craft/design-review-checklist` |
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

## Ian Xiaohei illustration library

Hand-drawn editorial illustrations (English variants) for optional card art.

| Piece | Location |
|-------|----------|
| Skill (generation workflow) | `.cursor/skills/ian-xiaohei-illustrations/` |
| Web assets | `public/assets/illustrations/ian-xiaohei/*-en.png` |
| ID → path map | `src/lib/ian-xiaohei-illustration-library.ts` |

`CaseStudyImpactCards` accepts an optional `illustration` id for a text + illustration row layout.

```tsx
{
  illustration: "trust-bridge",
  title: "Improved Decision Confidence",
  description: "...",
}
```

---

## Projects index

- **List data:** `src/lib/projects-list-data.ts` — syncs titles/years from `project-content.ts`
- **Hover thumbnails:** `HOVER_THUMBNAIL_OVERRIDES` (CDN paths)
- **Hidden slugs:** `HIDDEN_PROJECT_SLUGS` — excluded from `/projects` until ready
