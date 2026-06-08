"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { resetDocumentScroll } from "@/hooks/use-index-scroll-reset";

export default function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    resetDocumentScroll();
  }, [pathname]);

  return null;
}
