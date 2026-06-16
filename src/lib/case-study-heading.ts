/** Stable anchor id from visible heading copy. */
export function slugifyCaseStudyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

/** Split "Lead: body" list copy for scan-friendly bullets. */
export function splitCaseStudyListLead(item: string): {
  lead: string | null;
  body: string;
} {
  const colonIndex = item.indexOf(": ");

  if (colonIndex > 0) {
    return {
      lead: item.slice(0, colonIndex + 1),
      body: item.slice(colonIndex + 2),
    };
  }

  return { lead: null, body: item };
}
