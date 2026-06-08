import Link from "next/link";
import { SKIP_LINK_CLASS } from "@/lib/a11y";

/** WCAG 2.4.1 — bypass block link to `#main-content`. */
export function SkipToContentLink() {
  return (
    <Link href="#main-content" className={SKIP_LINK_CLASS}>
      Skip to main content
    </Link>
  );
}
