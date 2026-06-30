/**
 * JB illustration pack — English editorial variants for case study cards.
 * Assets live under `public/assets/illustrations/jb_illustrations/`.
 */
export const JB_ILLUSTRATIONS = {
  "idea-press": "/assets/illustrations/jb_illustrations/11-idea-press-en.png",
  "handoff-path": "/assets/illustrations/jb_illustrations/05-handoff-path-en.png",
  "trust-bridge": "/assets/illustrations/jb_illustrations/14-trust-bridge-en.png",
  "sort-by-purpose": "/assets/illustrations/jb_illustrations/03-sort-by-purpose-en.png",
  "policy-copilot-before":
    "/assets/illustrations/jb_illustrations/policy-copilot-before-en.png",
  "policy-copilot-after":
    "/assets/illustrations/jb_illustrations/policy-copilot-after-en.png",
  "policy-copilot-opportunity":
    "/assets/illustrations/jb_illustrations/policy-copilot-opportunity-en.png",
  "policy-copilot-google-maps-inspiration":
    "/assets/illustrations/jb_illustrations/policy-copilot-google-maps-inspiration-en.png",
  "policy-copilot-decision-triptych":
    "/assets/illustrations/jb_illustrations/policy-copilot-decision-triptych-en.png",
  "policy-copilot-lifecycle-triptych":
    "/assets/illustrations/jb_illustrations/policy-copilot-lifecycle-triptych-en.png",
} as const;

export type JbIllustrationId = keyof typeof JB_ILLUSTRATIONS;

export function getJbIllustration(id: JbIllustrationId): string {
  return JB_ILLUSTRATIONS[id];
}
