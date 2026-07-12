/**
 * Claude-inspired design tokens for Policy Copilot.
 * Warm dark product surfaces, blue accent, IBM Plex Mono throughout.
 */
import { SITE_FONT_STACK } from "@/lib/fonts";

export const CLAUDE = {
  /** Dark navy product canvas — not cold black */
  bg: "#181715",
  surface: "#1f1e1b",
  surfaceRaised: "#252320",
  surfaceOverlay: "#2c2a27",
  /** Blue primary — CTAs, progress, and active states */
  primary: "#5C97EE",
  primaryActive: "#4A7BC4",
  primaryMuted: "rgb(92 151 238 / 0.14)",
  primaryBorder: "rgb(92 151 238 / 0.35)",
  /** On-dark text hierarchy — tuned for 4.5:1 on #1f1e1b / #252320 */
  text: "#faf9f5",
  textSecondary: "#d4d0c8",
  textMuted: "#b5b1a8",
  textSoft: "#a39f96",
  border: "rgb(250 249 245 / 0.1)",
  borderStrong: "rgb(250 249 245 / 0.16)",
  hairline: "rgb(230 223 216 / 0.12)",
  validated: "#5db872",
  validatedMuted: "rgb(93 184 114 / 0.14)",
  warning: "#e8a55a",
  warningMuted: "rgb(232 165 90 / 0.14)",
  risk: "#c64545",
  riskMuted: "rgb(198 69 69 / 0.14)",
  accentTeal: "#5db8a6",
  accentTealMuted: "rgb(93 184 166 / 0.14)",
  fontDisplay: SITE_FONT_STACK,
  fontBody: SITE_FONT_STACK,
  fontMono: SITE_FONT_STACK,
  radius: "0.625rem",
  radiusLg: "0.875rem",
} as const;

/** Shared motion curves — warm, deliberate, never bouncy. */
export const CLAUDE_MOTION = {
  spring: { type: "spring" as const, stiffness: 380, damping: 32 },
  springSoft: { type: "spring" as const, stiffness: 280, damping: 30 },
  springPop: { type: "spring" as const, stiffness: 420, damping: 26 },
  ease: [0.25, 0.1, 0.25, 1] as const,
  stagger: 0.06,
} as const;

/** Living workspace — discovery motion (Linear / Arc sensibility). */
export const LIVING_MOTION = {
  /** MOTION_PURPOSE.discover — new information arrived */
  discover: { type: "spring" as const, stiffness: 340, damping: 28 },
  /** MOTION_PURPOSE.morph — state transition */
  morph: { type: "spring" as const, stiffness: 420, damping: 34 },
  /** MOTION_PURPOSE.progress — system working */
  breathe: { duration: 2.4, ease: [0.4, 0, 0.2, 1] as const, repeat: Infinity },
  stagger: 0.08,
  /** MOTION_PURPOSE.resolve — uncertainty removed */
  confidence: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  /** MOTION_PURPOSE.confirm — user committed */
  confirm: { type: "spring" as const, stiffness: 480, damping: 30 },
  /** Multi-keyframe pulse — tween only (spring supports two keyframes max). */
  pulse: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
} as const;

/** Reference viewport — dev preview and case study embed share one frame. */
export const WORKSPACE_VIEWPORT = { width: 1440, height: 900 } as const;

/** Workspace content height at 1440×900 (viewport minus dev / page chrome). */
export const WORKSPACE_CONTENT_HEIGHT_PX = 820;

export const WORKSPACE_FRAME_DESKTOP =
  "h-[820px] max-h-[calc(100dvh-4.5rem)] min-h-[28rem] w-full overflow-hidden rounded-xl border";

export const WORKSPACE_FRAME_GRID_DESKTOP =
  "grid h-[820px] max-h-[calc(100dvh-4.5rem)] min-h-[28rem] w-full grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-xl border";

/** @deprecated alias */
export const WORKSPACE_FRAME = WORKSPACE_FRAME_DESKTOP;
export const WORKSPACE_FRAME_GRID = WORKSPACE_FRAME_GRID_DESKTOP;

export const WORKSPACE_FRAME_SHADOW =
  "0 1px 0 rgb(250 249 245 / 0.04) inset, 0 24px 48px rgb(0 0 0 / 0.25)";

/** Max width at reference resolution; centres in dev and case study embed. */
export const WORKSPACE_HOST = "mx-auto w-full max-w-[1440px]";

/** Shared inset around the workspace frame — dev preview and case study embed. */
export const WORKSPACE_HOST_PADDING = "p-3 md:p-4";

/** Outer shell wrapping PolicyCopilotWorkspace (padding + max width + editorial isolation). */
export const WORKSPACE_EMBED_SHELL = `${WORKSPACE_HOST_PADDING} ${WORKSPACE_HOST} policy-copilot-embed`;

/** Break out of case study max-w-5xl prose column to viewport width (up to 1440px). */
export const WORKSPACE_HOST_BREAKOUT =
  "relative w-[min(100vw,1440px)] max-w-none [margin-left:calc(50%-min(50vw,720px))] [margin-right:calc(50%-min(50vw,720px))]";

export function workspaceFrameClasses() {
  return {
    frame: WORKSPACE_FRAME_DESKTOP,
    grid: WORKSPACE_FRAME_GRID_DESKTOP,
    shadow: WORKSPACE_FRAME_SHADOW,
  };
}

/** @deprecated Use CLAUDE */
export const NIK = CLAUDE;

/** @deprecated Use CLAUDE — home and canvas share one token set. */
export const CISCO_HOME = CLAUDE;

export {
  COPILOT_FOCUS,
  COPILOT_PLACEHOLDER,
  COPILOT_TARGET,
  COPILOT_TYPE,
} from "@/components/case-studies/policy-copilot/policy-copilot-a11y";
