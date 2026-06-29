/**
 * Ian Xiaohei-style illustration pack — English editorial variants for case study cards.
 * Assets live under `public/assets/illustrations/ian-xiaohei/`.
 */
export const IAN_XIAOHEI_ILLUSTRATIONS = {
  "idea-press": "/assets/illustrations/ian-xiaohei/11-idea-press-en.png",
  "handoff-path": "/assets/illustrations/ian-xiaohei/05-handoff-path-en.png",
  "trust-bridge": "/assets/illustrations/ian-xiaohei/14-trust-bridge-en.png",
  "sort-by-purpose": "/assets/illustrations/ian-xiaohei/03-sort-by-purpose-en.png",
  "policy-copilot-before":
    "/assets/illustrations/ian-xiaohei/policy-copilot-before-en.png",
  "policy-copilot-after":
    "/assets/illustrations/ian-xiaohei/policy-copilot-after-en.png",
  "policy-copilot-opportunity":
    "/assets/illustrations/ian-xiaohei/policy-copilot-opportunity-en.png",
  "policy-copilot-google-maps-inspiration":
    "/assets/illustrations/ian-xiaohei/policy-copilot-google-maps-inspiration-en.png",
  "policy-copilot-decision-triptych":
    "/assets/illustrations/ian-xiaohei/policy-copilot-decision-triptych-en.png",
  "policy-copilot-lifecycle-triptych":
    "/assets/illustrations/ian-xiaohei/policy-copilot-lifecycle-triptych-en.png",
} as const;

export type IanXiaoheiIllustrationId = keyof typeof IAN_XIAOHEI_ILLUSTRATIONS;

export function getIanXiaoheiIllustration(id: IanXiaoheiIllustrationId): string {
  return IAN_XIAOHEI_ILLUSTRATIONS[id];
}
