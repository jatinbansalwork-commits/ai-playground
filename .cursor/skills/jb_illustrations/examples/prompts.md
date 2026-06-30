# Prompt examples — Portfolio English Edition

Ready-to-adapt prompts. Replace `{...}` with your section copy.

---

## Plan only (shot list)

```text
Use the jb_illustrations skill. Do not generate images yet.

Analyze this case study section and propose 4–6 editorial illustrations.
For each: placement, theme, core idea, structure type, Xiaohei action, suggested elements, English labels, and light vs dark background mode.

<paste section>
```

---

## Impact card set (light / white background)

```text
Use jb_illustrations. Generate four 16:9 light-mode English editorial illustrations for impact outcome cards:

1. Reduced manual configuration — Xiaohei feeding a vague request into a simple press; label "Too vague" / "Needs structure"
2. Faster decisions — Xiaohei walking a short handoff path between two nodes
3. Decision confidence — Xiaohei crossing a bridge made of small evidence cards
4. Lower cognitive load — Xiaohei sorting items into a few purpose buckets

Ian Xiaohei style: white background, black wobbly lines, sparse red/orange/blue English labels, deadpan not cute.

Save to public/assets/illustrations/jb_illustrations/ and register IDs in jb-illustration-library.ts.
```

---

## Before / after narrative pair (dark mode)

```text
Use jb_illustrations. Generate two dark-mode 16:9 illustrations for "The Opportunity" in a cybersecurity case study.

BEFORE — policy-copilot-before-en.png
One speech bubble: "Allow contractor access". Five small boxes (Identity, Apps, Rules, Compliance, Manual config) connected by tangled orange/black scribbles. Xiaohei caught in the knot. Red note: "Too many decisions". Near-black background, white lines.

AFTER — policy-copilot-after-en.png
Calm left-to-right flow: Business intent → Copilot draft → You approve → Deploy. Orange arrow. Xiaohei at the approval step. Blue note: "Human stays in control". Same dark style.

One idea per image. Low cognitive load. English labels only.
```

---

## Single concept from a sentence

```text
Use jb_illustrations.

Illustrate: "Trust is not announced — it is built one small proof at a time."

Light mode, 16:9, Xiaohei crossing stepping stones made of customer proof cards. Labels: "Stranger" / "Warm lead" / "Small evidence". Hand-drawn English editorial style.
```

---

## Remove a bad title from an existing image

```text
Use jb_illustrations edit workflow.

Remove only the top-left handwritten title "Workflow" from this image. Keep composition, Xiaohei, labels, and line style unchanged. Fill removed area with matching background.
```

---

## Cisco Policy Copilot — full section pass

```text
Use jb_illustrations for Cisco Policy Copilot (/projects/cisco-policy-copilot).

Read src/components/case-studies/CiscoPolicyCopilot.tsx.
List which sections still lack illustrations, then generate dark-mode narrative art for gaps.

Match existing policy-copilot-before/after tone: hand-drawn, sparse, English, Xiaohei participates, one metaphor per frame.
Wire new IDs into jb-illustration-library.ts and the TSX file.
```

---

## Reference

Upstream Chinese skill: https://github.com/helloianneo/jb_illustrations

This portfolio fork: English labels, `public/assets/illustrations/jb_illustrations/`, light cards + dark case study media.
