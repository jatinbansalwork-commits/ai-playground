const MANIFEST_VISIT_STORAGE_KEY = "jb_manifest_visits";
const MANIFEST_REMIX_THRESHOLD = 3;

export function readManifestVisitCount(): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(MANIFEST_VISIT_STORAGE_KEY);
  const count = Number.parseInt(raw ?? "0", 10);
  return Number.isFinite(count) && count > 0 ? count : 0;
}

/** Count each time the Manifest slide becomes the active frame. */
export function recordManifestVisit(): number {
  if (typeof window === "undefined") return 0;
  const next = readManifestVisitCount() + 1;
  window.localStorage.setItem(MANIFEST_VISIT_STORAGE_KEY, String(next));
  return next;
}

export function hasManifestRemixUnlocked(): boolean {
  return readManifestVisitCount() >= MANIFEST_REMIX_THRESHOLD;
}

export const MANIFEST_BEAM_LABEL_DEFAULT = "I'm here";
export const MANIFEST_BEAM_LABEL_REMIX = "Still making it.";
