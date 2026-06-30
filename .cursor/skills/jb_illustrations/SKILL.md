---
name: jb_illustrations
description: Generate JB-style English editorial illustrations for case studies, essays, and portfolio content. Use when the user asks for hand-drawn explanatory art, shot lists, impact-card illustrations, before/after diagrams, or character-led scenes — white or dark background, sparse English handwritten labels, absurd-but-clear product-sketch feeling.
---

# JB Illustrations — English Editorial (Portfolio Edition)

Adapted from [helloianneo/ian-xiaohei-illustrations](https://github.com/helloianneo/ian-xiaohei-illustrations) for this portfolio site.

## Core purpose

Design and generate **16:9 horizontal editorial illustrations** that turn one judgment, workflow, structure, state, or metaphor from case-study copy into a memorable hand-drawn explainer.

This is **not** commercial illustration, PPT infographics, or cute mascot art. It is sparse, absurd, readable product sketching on paper — in **English**.

Default visual IP: **JB character** — a small solid-black creature with white dot eyes, thin legs, blank serious expression, earnestly doing something bizarre but legible. The character must perform the core action, not decorate the scene.

## Read these references first

Load only what the task needs:

| File | When |
|------|------|
| `references/style-dna.md` | Colors, line weight, labels, don'ts |
| `references/jb-character-ip.md` | Character rules and action library |
| `references/composition-patterns.md` | Structure types and fresh metaphors |
| `references/prompt-template.md` | Image-generation prompt skeleton |
| `references/qa-checklist.md` | Post-generation review |
| `references/portfolio-integration.md` | Asset paths, dark vs light mode, React wiring |
| `assets/examples/` | Style calibration only — do not copy compositions |
| `examples/prompts.md` | Ready-made prompt examples |

## Workflow

### 1. Digest the content

Read the case study section, essay, or brief. Extract:

- Core claim or tension
- Cognitive turning points worth illustrating
- What should stay text-only

Do not illustrate every paragraph. Pick **cognitive anchors**: before/after, broken handoff, trust gap, overload, approval gate, one metaphor that carries the section.

### 2. Shot list (when planning)

If the user asks for planning only, output a shot list. Per image include:

- Placement (which section / heading)
- Theme
- Core idea (one sentence)
- Structure type
- What the JB character is doing
- Suggested elements
- Suggested English labels (2–8 words each)
- **Background mode**: `light` (white) or `dark` (near-black for case study media)

Default **4–8** images for a long case study; **1–3** for a short section. Enough to help, not a picture book.

### 3. Generate one image at a time

When the user wants images, generate **each illustration separately** with Cursor's image tool (the upstream skill references Codex `image_gen` — use `GenerateImage` here).

Every prompt must include:

- 16:9 horizontal English editorial illustration
- **Light mode**: pure white background, black hand-drawn lines
- **Dark mode**: near-black background (`#0a0a0a`–`#1a1a1a`), white/light hand-drawn lines, restrained accent colour
- Sparse red / orange / blue **English** handwritten annotations
- Generous whitespace (~40–60% subject, rest empty)
- JB character as the action subject
- No PPT layout, no cute mascot poster, no dense architecture diagram, no top-left type titles like "Workflow" or "Architecture"

Invent a **new metaphor** from the current copy. Do not clone example compositions (conveyor breakpoints, material fish, stamp toolbox, etc.) unless the user explicitly asks.

### 4. QA and iterate

Check `references/qa-checklist.md`. Regenerate or edit when:

- The character is decorative
- Frame is overcrowded
- Labels are long, numerous, or misspelled
- It reads like a slide deck, not a sketch
- Wrong background mode for the target component

### 5. Deliver into the repo

Save finals to:

```text
public/assets/illustrations/jb_illustrations/<slug-or-topic>-en.png
```

Register the ID in `src/lib/jb-illustration-library.ts`.

Use kebab-case IDs (`policy-copilot-before`, `trust-bridge`). Keep `-en` in filenames.

Report: count, purpose per image, paths, which are required vs optional.

## Background mode guide

| Target | Mode | Notes |
|--------|------|-------|
| `CaseStudyImpactCards` | **light** | White card panel behind image |
| `CaseStudyMedia` in dark case study | **dark** | Matches `bg-[#1a1a1a]` frame |
| Craft / Ideas gallery | **light** | Unless art direction says otherwise |

See `references/portfolio-integration.md` for component wiring.

## Output tone

Shot lists: short and precise. After generation: what was made, where it lives, what to swap — not a lecture on illustration theory.
