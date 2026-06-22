"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { resetDocumentScroll } from "@/hooks/use-index-scroll-reset";
import { ROUTES } from "@/lib/constants";
import { FOCUS_RING } from "@/lib/a11y";

type ScrollResetLinkProps = ComponentProps<typeof Link>;

export function ScrollResetLink({
  onClick,
  scroll = true,
  className = "",
  href,
  ...props
}: ScrollResetLinkProps) {
  const pathname = usePathname();
  const hrefStr = typeof href === "string" ? href : "";
  const returnsToIndex = hrefStr === ROUTES.home || hrefStr === "/";
  const leavesIndex = pathname === ROUTES.home && !returnsToIndex;
  const preserveIndexScroll = returnsToIndex || leavesIndex;

  return (
    <Link
      {...props}
      href={href}
      scroll={preserveIndexScroll ? false : scroll}
      className={[className, FOCUS_RING].filter(Boolean).join(" ")}
      onClick={(event) => {
        if (!returnsToIndex && !leavesIndex) {
          resetDocumentScroll();
        }
        onClick?.(event);
      }}
    />
  );
}
