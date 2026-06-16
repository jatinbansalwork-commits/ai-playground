import Link from "next/link";
import { CASE_STUDY_BODY_ID } from "@/lib/case-study-a11y";
import { SKIP_LINK_CLASS } from "@/lib/a11y";

/** WCAG 2.4.1 — bypass back link + minimap to the case study article body. */
export function CaseStudySkipLink() {
  return (
    <Link href={`#${CASE_STUDY_BODY_ID}`} className={SKIP_LINK_CLASS}>
      Skip to case study content
    </Link>
  );
}
