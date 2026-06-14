"use client";

import dynamic from "next/dynamic";

export const SiteCursor = dynamic(
  () => import("@/components/site-cursor").then((mod) => mod.SiteCursor),
  { ssr: false },
);
