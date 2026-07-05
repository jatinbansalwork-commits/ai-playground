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
  "policy-copilot-confidence-before-deployment":
    "/assets/illustrations/jb_illustrations/policy-copilot-confidence-before-deployment-en.png",
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
  "policy-copilot-discovery-workshop":
    "/assets/illustrations/jb_illustrations/policy-copilot-discovery-workshop-en.png",
  "policy-copilot-discovery-context":
    "/assets/illustrations/jb_illustrations/policy-copilot-discovery-context-en.png",
  "policy-copilot-pain-points-concepts":
    "/assets/illustrations/jb_illustrations/policy-copilot-pain-points-concepts-en.png",
  "policy-copilot-experience-research":
    "/assets/illustrations/jb_illustrations/policy-copilot-experience-research-en.png",
  "policy-copilot-translation-bridge":
    "/assets/illustrations/jb_illustrations/policy-copilot-translation-bridge-en.png",
  "policy-copilot-translation-gap":
    "/assets/illustrations/jb_illustrations/policy-copilot-translation-gap-en.png",
  "policy-copilot-intent-translation":
    "/assets/illustrations/jb_illustrations/policy-copilot-intent-translation-en.png",
  "policy-copilot-automation-to-understanding":
    "/assets/illustrations/jb_illustrations/policy-copilot-automation-to-understanding-en.png",
  "policy-copilot-design-foundation":
    "/assets/illustrations/jb_illustrations/policy-copilot-design-foundation-en.png",
  "policy-copilot-design-principles":
    "/assets/illustrations/jb_illustrations/policy-copilot-design-principles-en.png",
  "policy-copilot-living-workspace":
    "/assets/illustrations/jb_illustrations/policy-copilot-living-workspace-en.png",
  "policy-copilot-confirm-understanding":
    "/assets/illustrations/jb_illustrations/policy-copilot-confirm-understanding-en.png",
  "policy-copilot-lifecycle-start":
    "/assets/illustrations/jb_illustrations/policy-copilot-lifecycle-start-en.png",
  "policy-copilot-lifecycle-copilot":
    "/assets/illustrations/jb_illustrations/policy-copilot-lifecycle-copilot-en.png",
  "policy-copilot-lifecycle-human":
    "/assets/illustrations/jb_illustrations/policy-copilot-lifecycle-human-en.png",
  "policy-copilot-invisible-complexity":
    "/assets/illustrations/jb_illustrations/policy-copilot-invisible-complexity-en.png",
  "policy-copilot-request-journey-map":
    "/assets/illustrations/jb_illustrations/policy-copilot-request-journey-map-en.png",
  "policy-copilot-firewall-form-overload":
    "/assets/illustrations/jb_illustrations/policy-copilot-firewall-form-overload-en.png",
  "policy-copilot-projects-hover":
    "/assets/illustrations/jb_illustrations/policy-copilot-projects-hover-en.png",
  "policy-copilot-simulation-impact":
    "/assets/illustrations/jb_illustrations/policy-copilot-simulation-impact-en.png",
  "policy-copilot-intent-before-generation":
    "/assets/illustrations/jb_illustrations/policy-copilot-intent-before-generation-en.png",
} as const;

export type JbIllustrationId = keyof typeof JB_ILLUSTRATIONS;

/** Cropped JB character sprites from full editorial illustrations (1536×1024 source). */
export const JB_ILLUSTRATION_CHARACTERS = {
  "two-worlds-stakeholder": {
    source: "policy-copilot-administrator-two-worlds",
    width: "360%",
    left: "2%",
    top: "-78%",
  },
  "two-worlds-sec-admin": {
    source: "policy-copilot-administrator-two-worlds",
    width: "390%",
    left: "-108%",
    top: "-74%",
  },
  "two-worlds-firewall": {
    source: "policy-copilot-administrator-two-worlds",
    width: "440%",
    left: "-198%",
    top: "-62%",
  },
} as const satisfies Record<
  string,
  {
    source: JbIllustrationId;
    width: string;
    left: string;
    top: string;
  }
>;

export type JbIllustrationCharacterId = keyof typeof JB_ILLUSTRATION_CHARACTERS;

export function getJbIllustration(id: JbIllustrationId): string {
  return JB_ILLUSTRATIONS[id];
}

export function getJbIllustrationCharacter(id: JbIllustrationCharacterId) {
  return JB_ILLUSTRATION_CHARACTERS[id];
}
