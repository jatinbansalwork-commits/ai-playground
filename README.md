# ai-playground

Portfolio site for case studies, Craft gallery (motion + illustration), and Ideas (AI experiments). Built with Next.js 16, React 19, Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `OPENAI_API_KEY` | For live JBAI replies | OpenAI chat completions (`gpt-4o-mini`) |
| `GIPHY_API_KEY` | Optional | Reaction GIFs on assistant replies |
| `AI_CHAT_OPENAI_ENABLED` | Optional | Set to `false` to disable OpenAI (static/fallback only) |
| `AI_CHAT_OPENAI_MAX_PER_USER` | Optional | OpenAI replies per browser session (default in code) |

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |
| `npm run spellcheck` | cspell over `src/**/*.{ts,tsx,md}` |

## Site map

| Route | Content |
|-------|---------|
| `/` | Index — horizontal scroll slider (hero → projects → ideas → design review → craft → archive → contact → manifest) |
| `/projects` | Case study list with hover thumbnails |
| `/projects/[slug]` | Long-form case study pages |
| `/craft` | Motion graphics and illustration gallery (bento grid + filter chips) |
| `/craft/[slug]` | Craft essays (e.g. design review checklist) |
| `/ideas` | AI experiment demos — external side projects with detail modals |
| `/archive` | About / “Me” slide destination |

Legacy `/fun` URLs redirect to `/craft` (`next.config.ts`).

## Case studies

- **Metadata** (title, year, client, overview): `src/lib/project-content.ts`
- **Page layouts and body copy**: `src/components/case-studies/*`
- **Projects index** (hover thumbnails, hidden slugs): `src/lib/projects-list-data.ts`
- **CDN media keys**: `src/lib/asset-cdn.ts` → `CASE_STUDY_CDN_MEDIA`

Editorial components (`CaseStudyH2`, `CaseStudyProse`, `CaseStudyTable`, etc.) live in `src/components/case-studies/case-study-prose.tsx`. Heading and caption casing rules are in `.cursor/rules/case-study-headings.mdc`.

## Craft gallery

- **Registry** (titles, categories, media, essays): `src/lib/experiments-registry.ts`
- **Filter chips & bento layout**: `src/lib/experiments-filters.ts`
- **Page shell**: `src/app/craft/` + `src/components/experiments/*`

Default filter is **Motion Graphic**. Categories on Craft: `motion-graphic`, `illustration`. Article-only and AI experiment entries are excluded from the Craft grid — see [`design.md`](./design.md).

## Ideas

- **Gallery slugs**: `IDEAS_EXPERIMENT_SLUGS` in `experiments-registry.ts`
- **Card copy & preview sizes**: `src/lib/ideas-page-data.ts`
- **UI**: `src/components/ideas/*`, route `src/app/ideas/page.tsx`

Five external demos: Lock in Police, Miner Gift, DoodleLab, FriendCaptcha, Focus Mode.

## JBAI (site chat)

Floating assistant on every page — `src/components/ai-chat/*`, API at `src/app/api/chat/route.ts`.

Curated knowledge, intent chips, OpenAI streaming, GIPHY reactions, and session limits.

## Design notes

See [`design.md`](./design.md) for index slider wiring, Craft/Ideas gallery rules, and shared case study UI patterns.

## Deploy

Deploy on [Vercel](https://vercel.com). Media is served from Vercel Blob CDN — see `src/lib/asset-cdn.ts`.
