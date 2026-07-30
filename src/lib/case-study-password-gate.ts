/** Soft access gates for pre-release case studies — client-side only, not real DRM. */

export const CASE_STUDY_ACCESS_STORAGE_PREFIX = "jb_case_unlock_";
export const CASE_STUDY_ACCESS_PRESS_TARGET = 3;

/** Slugs that require email + triple-press unlock. */
export const CASE_STUDY_ACCESS_GATED_SLUGS = [
  "cisco-policy-copilot",
] as const;

export type CaseStudyAccessSlug = (typeof CASE_STUDY_ACCESS_GATED_SLUGS)[number];

export function caseStudyAccessStorageKey(slug: string): string {
  return `${CASE_STUDY_ACCESS_STORAGE_PREFIX}${slug}`;
}

export function isCaseStudyAccessGated(slug: string): boolean {
  return (CASE_STUDY_ACCESS_GATED_SLUGS as readonly string[]).includes(slug);
}

/** @deprecated Prefer `isCaseStudyAccessGated` — kept for older call sites. */
export function isCaseStudyPasswordGated(slug: string): boolean {
  return isCaseStudyAccessGated(slug);
}

export function normaliseCaseStudyEmail(value: string): string {
  return value.trim().toLowerCase();
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidCaseStudyAccessEmail(value: string): boolean {
  const email = normaliseCaseStudyEmail(value);
  return email.length <= 254 && EMAIL_PATTERN.test(email);
}

export function readCaseStudyAccessUnlock(slug: string): boolean {
  if (typeof window === "undefined") return false;
  if (!isCaseStudyAccessGated(slug)) return true;
  return window.sessionStorage.getItem(caseStudyAccessStorageKey(slug)) === "1";
}

/** @deprecated Prefer `readCaseStudyAccessUnlock`. */
export function readCaseStudyPasswordUnlock(slug: string): boolean {
  return readCaseStudyAccessUnlock(slug);
}

export function persistCaseStudyAccessUnlock(slug: string): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(caseStudyAccessStorageKey(slug), "1");
}

/** @deprecated Prefer `persistCaseStudyAccessUnlock`. */
export function persistCaseStudyPasswordUnlock(slug: string): void {
  persistCaseStudyAccessUnlock(slug);
}

export function queueCaseStudyAccessLog(input: {
  email: string;
  slug: string;
  title?: string;
}): void {
  void fetch("/api/case-study-access", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: normaliseCaseStudyEmail(input.email),
      slug: input.slug,
      title: input.title,
    }),
  }).catch(() => {
    // Logging must never block unlock.
  });
}
