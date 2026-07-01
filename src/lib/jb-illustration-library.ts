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
  "policy-copilot-administrator-two-worlds":
    "/assets/illustrations/jb_illustrations/policy-copilot-administrator-two-worlds-en.png",
  "policy-copilot-confidence-path":
    "/assets/illustrations/jb_illustrations/policy-copilot-confidence-path-en.png",
  "policy-copilot-conversation-storyboard":
    "/assets/illustrations/jb_illustrations/policy-copilot-conversation-storyboard-en.png",
  "policy-copilot-validation-layers":
    "/assets/illustrations/jb_illustrations/policy-copilot-validation-layers-en.png",
  "policy-copilot-workflow-lifecycle":
    "/assets/illustrations/jb_illustrations/policy-copilot-workflow-lifecycle-en.png",
  "policy-copilot-decision-triptych":
    "/assets/illustrations/jb_illustrations/policy-copilot-decision-triptych-en.png",
  "policy-copilot-lifecycle-triptych":
    "/assets/illustrations/jb_illustrations/policy-copilot-lifecycle-triptych-en.png",
  "policy-copilot-conversation-email":
    "/assets/illustrations/jb_illustrations/policy-copilot-conversation-email-en.png",
  "policy-copilot-conversation-slack":
    "/assets/illustrations/jb_illustrations/policy-copilot-conversation-slack-en.png",
  "policy-copilot-conversation-ticket":
    "/assets/illustrations/jb_illustrations/policy-copilot-conversation-ticket-en.png",
  "policy-copilot-conversation-desk":
    "/assets/illustrations/jb_illustrations/policy-copilot-conversation-desk-en.png",
  "policy-copilot-conversation-sources":
    "/assets/illustrations/jb_illustrations/policy-copilot-conversation-sources-en.png",
  "policy-copilot-translation-bridge":
    "/assets/illustrations/jb_illustrations/policy-copilot-translation-bridge-en.png",
  "policy-copilot-intent-translation":
    "/assets/illustrations/jb_illustrations/policy-copilot-intent-translation-en.png",
  "policy-copilot-invisible-complexity":
    "/assets/illustrations/jb_illustrations/policy-copilot-invisible-complexity-en.png",
  "policy-copilot-request-journey-map":
    "/assets/illustrations/jb_illustrations/policy-copilot-request-journey-map-en.png",
  "policy-copilot-firewall-form-overload":
    "/assets/illustrations/jb_illustrations/policy-copilot-firewall-form-overload-en.png",
  "policy-copilot-projects-hover":
    "/assets/illustrations/jb_illustrations/policy-copilot-projects-hover-en.png",
} as const;

export type JbIllustrationId = keyof typeof JB_ILLUSTRATIONS;

export function getJbIllustration(id: JbIllustrationId): string {
  return JB_ILLUSTRATIONS[id];
}
