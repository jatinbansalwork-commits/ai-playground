import { ROUTES } from "@/lib/constants";

function normaliseCommand(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Easter egg — toggles index wireframe debug from chat. */
export function isWireframeModeCommand(text: string): boolean {
  const command = normaliseCommand(text);
  return command === "wireframe mode" || command === "wireframe";
}

export function buildWireframeModeReply(
  enabled: boolean,
  onIndex: boolean,
): string {
  if (enabled) {
    if (onIndex) {
      return `Could this *be* any more wireframe? Layout debug is on — strokes, grids, the Monica-approved version of the slider.

Click the centre cross anytime, or type \`wireframe mode\` again when you're done pretending this is a blueprint.`;
    }

    return `Wireframe mode is on — head to the [homepage](${ROUTES.home}) slider and watch every box outline itself.

Could we *be* any more designer? (Chandler would say yes. Loudly.)`;
  }

  return `Fine. Back to full colour. Could this *be* any less blueprint?

Type \`wireframe mode\` when you miss the grid — designers always come back.`;
}
