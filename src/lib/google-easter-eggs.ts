import { PRESENCE_ACCENT, ROUTES } from "@/lib/constants";
import { PROJECTS_LIST } from "@/lib/projects-list-data";

export const BARREL_ROLL_EVENT = "jb-barrel-roll";
export const ASKEW_EVENT = "jb-askew";

function normaliseCommand(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[?!.,]+$/g, "")
    .replace(/\s+/g, " ");
}

/** Google classic — spin the homepage once. */
export function isBarrelRollCommand(text: string): boolean {
  const command = normaliseCommand(text);
  return (
    command === "do a barrel roll" ||
    command === "barrel roll" ||
    command === "do a barell roll"
  );
}

export function buildBarrelRollReply(onIndex: boolean): string {
  if (onIndex) {
    return `Barrel roll engaged. (Yes, that one.)

Could this *be* any more Google? The slider just did a 360 — now back to craft.`;
  }

  return `Barrel roll queued — open the [homepage](${ROUTES.home}) and type \`do a barrel roll\` again to spin the slider.

Google energy. Portfolio manners.`;
}

export function dispatchBarrelRoll(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(BARREL_ROLL_EVENT));
}

/** Google classic — tip the page slightly askew. */
export function isAskewCommand(text: string): boolean {
  const command = normaliseCommand(text);
  return command === "askew" || command === "tilt";
}

export function buildAskewReply(enabled: boolean, onIndex: boolean): string {
  if (enabled) {
    if (onIndex) {
      return `Everything's a little askew now. Intentionally.

Type \`askew\` again when you want gravity to behave.`;
    }

    return `Askew is on — visit the [homepage](${ROUTES.home}) to see the lean.

Type \`askew\` to straighten up.`;
  }

  return `Straightened out. (Ross would approve.)

Type \`askew\` when you want the room to tip again.`;
}

export function dispatchAskewToggle(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(ASKEW_EVENT));
}

/** Google "I'm Feeling Lucky" — jump to a random public case study. */
export function isFeelingLuckyCommand(text: string): boolean {
  const command = normaliseCommand(text);
  return (
    command === "i'm feeling lucky" ||
    command === "im feeling lucky" ||
    command === "feeling lucky"
  );
}

export function pickFeelingLuckyProject(): {
  slug: string;
  title: string;
  href: string;
} | null {
  if (PROJECTS_LIST.length === 0) return null;
  const index = Math.floor(Math.random() * PROJECTS_LIST.length);
  const project = PROJECTS_LIST[index];
  if (!project) return null;
  return {
    slug: project.slug,
    title: project.title,
    href: `${ROUTES.projects}/${project.slug}`,
  };
}

export function buildFeelingLuckyReply(
  project: { title: string; href: string } | null,
): string {
  if (!project) {
    return `Feeling lucky… but the projects list is empty. That can't be right.`;
  }

  return `I'm Feeling Lucky™ (portfolio edition).

You landed on **${project.title}** — [open the case](${project.href}).

No ads. No auction. Just craft.`;
}

/** Quiet Chrome-style console tip — runs once per session on the index. */
export function logIndexConsoleEasterEgg(): void {
  if (typeof window === "undefined" || typeof console === "undefined") return;
  if (window.sessionStorage.getItem("jb_console_tip") === "1") return;
  window.sessionStorage.setItem("jb_console_tip", "1");

  console.log(
    `%cJB Portfolio%c — curious minds type in chat: %cdo a barrel roll%c · %caskew%c · %ci'm feeling lucky`,
    `color:${PRESENCE_ACCENT};font-weight:700`,
    "color:inherit;font-weight:400",
    `color:${PRESENCE_ACCENT};font-weight:600`,
    "color:inherit;font-weight:400",
    `color:${PRESENCE_ACCENT};font-weight:600`,
    "color:inherit;font-weight:400",
    `color:${PRESENCE_ACCENT};font-weight:600`,
  );
}
