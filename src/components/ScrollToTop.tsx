"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { resetDocumentScroll } from "@/hooks/use-index-scroll-reset";
import { ROUTES } from "@/lib/constants";

export default function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname === ROUTES.home) {
      return;
    }
    resetDocumentScroll();
  }, [pathname]);

  return null;
}
