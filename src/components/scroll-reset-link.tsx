"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { resetDocumentScroll } from "@/hooks/use-index-scroll-reset";
import { FOCUS_RING } from "@/lib/a11y";

type ScrollResetLinkProps = ComponentProps<typeof Link>;

export function ScrollResetLink({
  onClick,
  scroll = true,
  className = "",
  ...props
}: ScrollResetLinkProps) {
  return (
    <Link
      {...props}
      scroll={scroll}
      className={[className, FOCUS_RING].filter(Boolean).join(" ")}
      onClick={(event) => {
        resetDocumentScroll();
        onClick?.(event);
      }}
    />
  );
}
