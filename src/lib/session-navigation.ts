import { ROUTES } from "@/lib/constants";

const STORAGE_KEY = "session-back-context";

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

export function saveSessionBackContext(context: SessionBackContext): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(context));
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

/** Back target when opening a craft article from the craft index. */
export function backContextForCraftNavigation(): SessionBackContext {
  return BACK_CRAFT;
}
