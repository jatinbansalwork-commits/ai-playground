# QA checklist

## Must pass

- [ ] 16:9 horizontal
- [ ] Correct background mode (light white / dark near-black)
- [ ] Xiaohei present
- [ ] Xiaohei drives the core action — not decoration
- [ ] Fresh metaphor for this copy — not a cloned example composition
- [ ] Absurd but legible
- [ ] Clean and spacious — subject ≤ ~60% of frame
- [ ] One core structure per image
- [ ] English labels — few, short, readable
- [ ] Orange only on main path/arrows
- [ ] Red only for emphasis, problems, outcomes
- [ ] Blue only for secondary notes or system state
- [ ] No Chinese characters in the image

## Failure signals → regenerate or edit

- Top-left titles: "Common pitfalls", "Workflow", "Architecture", "Roadmap"
- Xiaohei reads as mascot, emoji, or cute cartoon
- Looks like PPT, courseware, or formal flowchart
- Too many elements, arrows, or nodes
- Long paragraph labels
- Paper texture, shadow, gradient, cream background
- Real UI screenshots or glossy tech UI
- Misspelled or unreadable English
- Too stiff — no metaphor
- Too similar to `assets/examples/` composition

## Iteration playbook

| Problem | Fix |
|---------|-----|
| Too generic | Xiaohei performs the verb; add one odd physical metaphor |
| Too dense | Delete nodes; keep one action + 3–5 labels |
| Too cute | Emphasize deadpan, blank expression, not mascot |
| Too PPT | Remove title, grid, box borders; draw a scene |
| Clone of old example | Same meaning, new object + new Xiaohei action |
| Bad text | Fewer labels; regenerate with shorter words |
| Wrong polarity | Regenerate in correct mode or invert (see prompt-template) |

## Ship bar

Reader should think "that's a little weird" and understand the structure within ~1 second.

If the first read feels like a tutorial slide instead of a sketch on paper, it fails.
