import type { Metadata } from "next";
import { EXPERIMENTS_PAGE } from "@/lib/experiments-registry";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: EXPERIMENTS_PAGE.title,
  description: EXPERIMENTS_PAGE.description,
  path: "/craft",
});

export default function CraftLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
