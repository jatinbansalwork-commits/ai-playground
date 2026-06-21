const STORAGE_KEY = "index-active-frame";

/** Persist the index slider position across subpage navigation. */
export function saveIndexActiveFrame(index: number): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(STORAGE_KEY, String(index));
  } catch {
    // Private mode / blocked storage — ignore.
  }
}

export function readIndexActiveFrame(): number | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;

    const index = Number.parseInt(raw, 10);
    return Number.isFinite(index) ? index : null;
  } catch {
    return null;
  }
}
