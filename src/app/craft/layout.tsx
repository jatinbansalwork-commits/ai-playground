import type { Metadata } from "next";
import { EXPERIMENTS_PAGE } from "@/lib/experiments-registry";
import { allProjectsSeoKeywords, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: EXPERIMENTS_PAGE.title,
  description: EXPERIMENTS_PAGE.description,
  path: "/craft",
  keywords: allProjectsSeoKeywords(),
});

export default function CraftLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
