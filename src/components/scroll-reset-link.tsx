"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { resetDocumentScroll } from "@/hooks/use-index-scroll-reset";
import { ROUTES } from "@/lib/constants";
import { FOCUS_RING } from "@/lib/a11y";
import {
  backContextForPageEntry,
  saveSessionBackContext,
} from "@/lib/session-navigation";

type ScrollResetLinkProps = ComponentProps<typeof Link>;

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>): boolean {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

export function ScrollResetLink({
  onClick,
  scroll = true,
  className = "",
  href,
  ...props
}: ScrollResetLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const hrefStr = typeof href === "string" ? href : "";
  const returnsToIndex = hrefStr === ROUTES.home || hrefStr === "/";
  const leavesIndex = pathname === ROUTES.home && !returnsToIndex;
  const preserveIndexScroll = returnsToIndex || leavesIndex;

  return (
    <Link
      {...props}
      href={href}
      scroll={preserveIndexScroll ? false : scroll}
      className={[
        className,
        className.includes("focus-visible:outline") ? "" : FOCUS_RING,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={(event) => {
        const entryContext = hrefStr ? backContextForPageEntry(hrefStr) : null;
        if (entryContext) {
          saveSessionBackContext(entryContext);
        }

        if (returnsToIndex) {
          if (!isModifiedClick(event)) {
            event.preventDefault();
            router.push(ROUTES.home);
          }
          onClick?.(event);
          return;
        }

        if (!leavesIndex) {
          resetDocumentScroll();
        }
        onClick?.(event);
      }}
    />
  );
}
