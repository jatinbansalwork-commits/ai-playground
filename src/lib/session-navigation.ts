import { ROUTES } from "@/lib/constants";

const STORAGE_KEY = "session-back-context";

const listeners = new Set<() => void>();

export interface SessionBackContext {
  href: string;
  destination: string;
}

export const BACK_HOME: SessionBackContext = {
  href: ROUTES.home,
  destination: "Home",
};

export const BACK_PROJECTS: SessionBackContext = {
  href: ROUTES.projects,
  destination: "Projects",
};

export const BACK_CRAFT: SessionBackContext = {
  href: ROUTES.craft,
  destination: "Craft",
};

export const BACK_IDEAS: SessionBackContext = {
  href: ROUTES.ideas,
  destination: "AI Labs",
};

export const BACK_NOTES: SessionBackContext = {
  href: ROUTES.notes,
  destination: "Field Notes",
};

export function subscribeSessionBackContext(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function saveSessionBackContext(context: SessionBackContext): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(context));
    listeners.forEach((listener) => listener());
  } catch {
    // Private mode / blocked storage — ignore.
  }
}

export function readSessionBackContext(): SessionBackContext | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as SessionBackContext;
    if (typeof parsed.href !== "string" || typeof parsed.destination !== "string") {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function isProjectCaseStudyPath(path: string): boolean {
  return path.startsWith("/projects/") && path !== ROUTES.projects;
}

/** Back target when leaving the index slider for any slide destination. */
export function backContextForIndexNavigation(_href: string): SessionBackContext {
  return BACK_HOME;
}

/** Back target when opening a case study from the projects list. */
export function backContextForProjectsListNavigation(): SessionBackContext {
  return BACK_PROJECTS;
}

/** Back target when opening a field note from the notes index. */
export function backContextForNotesNavigation(): SessionBackContext {
  return BACK_NOTES;
}

/** Back target when opening a craft article from the craft index. */
export function backContextForCraftNavigation(): SessionBackContext {
  return BACK_CRAFT;
}

/** Back target for top-level pages when entered via in-app navigation. */
export function backContextForPageEntry(href: string): SessionBackContext | null {
  if (href === ROUTES.home || href === "/") return BACK_HOME;
  if (href === ROUTES.projects) return BACK_HOME;
  if (href === ROUTES.craft) return BACK_HOME;
  if (href === ROUTES.ideas) return BACK_HOME;
  if (href === ROUTES.notes) return BACK_HOME;
  return null;
}
