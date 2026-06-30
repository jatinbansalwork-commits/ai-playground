# Image prompt template

Generate **one image per call**. Replace `{variables}` from the source content.

## Light mode (impact cards, light panels)

```text
Generate one standalone 16:9 horizontal English editorial illustration.

Visual DNA:
Pure white background. Minimalist black hand-drawn line art. Slightly wobbly pen lines. Lots of empty white space. Sparse red/orange/blue handwritten ENGLISH annotations. Clean absurd product-sketch feeling. No gradients, no shadows, no paper texture, no commercial vector style, no PPT infographic look, no cute mascot poster, no children's illustration, no realistic UI. No Chinese characters.

Recurring IP character required:
Xiaohei — small solid-black absurd creature with white dot eyes, tiny thin legs, blank serious deadpan expression, slightly uneven hand-drawn body. Xiaohei must perform the core conceptual action, not decorate the scene. Serious, bizarre, not cute.

Theme:
{section theme}

Structure type:
{Workflow / system slice / before-after / character state / concept metaphor / layered method / path / mini comic}

Core idea:
{one sentence}

Composition:
{where Xiaohei is, what they do, main objects, how information moves}

Suggested elements:
{element 1} / {element 2} / {element 3}

English handwritten labels:
{label 1} / {label 2} / {label 3} / {optional 4–5}

Color use:
Black for lines and Xiaohei. Orange for main flow/arrows. Red for warnings or stakes. Blue for secondary notes only.

Constraints:
One core structure only. Subject ~40–60% of canvas. At least ~35% blank space. Max 5–8 short English labels. No top-left title. No structure-type label on image. Not a formal diagram or dense explainer. Fresh metaphor for this specific copy — do not copy prior example compositions. Clear but not instructional; interesting but not childish; strange but clean.
```

## Dark mode (case study `CaseStudyMedia`)

```text
Generate one standalone 16:9 horizontal English editorial illustration for a dark UI case study.

Visual DNA:
Near-black background (#0a0a0a to #1a1a1a). White and light-gray hand-drawn line art. Slightly wobbly pen lines. Generous empty dark space. Sparse orange/red/blue handwritten ENGLISH annotations that read on dark. Clean absurd product-sketch feeling — NOT a dense Stripe marketing diagram unless explicitly requested. No gradients, muddy gray fills, or realistic UI. No Chinese characters.

Recurring IP character required:
Xiaohei — small light-bodied or white-outline absurd creature with dark dot eyes on dark background, thin legs, deadpan expression. Xiaohei performs the core action.

Theme:
{section theme}

Core idea:
{one sentence}

Composition:
{layout — keep cognitive load low; prefer 3–6 labeled elements max for narrative sections}

English handwritten labels:
{short labels}

Constraints:
One idea per image. High contrast on dark. No overcrowded grid of cards unless user explicitly requests premium editorial layout. Fresh metaphor. Max 5–8 short English labels.
```

## Edit prompts

**Remove a stray title:**

```text
Edit the provided image. Remove only the handwritten title "{text to remove}" and any underline from the top-left corner. Fill with matching background (white or near-black). Preserve everything else: character, labels, paths, line style, composition, aspect ratio. Do not add new text or objects.
```

**Make Xiaohei more central:**

```text
Regenerate with the same core meaning and simple layout, but Xiaohei must drive the bizarre action that explains the idea — not stand beside a diagram. Keep sparse, hand-drawn, deadpan, not cute.
```

**Invert light → dark (last resort):**

If a light illustration already exists and only background polarity is wrong, invert with sharp-cli:

```bash
npx --yes sharp-cli -i public/assets/illustrations/jb_illustrations/{file}.png -o public/assets/illustrations/jb_illustrations/{file}.png negate
```

Note: invert shifts orange toward cyan — prefer dark-native generation when accent hue matters.
