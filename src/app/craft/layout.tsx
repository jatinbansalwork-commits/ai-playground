import type { Metadata } from "next";
import { EXPERIMENTS_PAGE } from "@/lib/experiments-registry";
import {
  allProjectsSeoKeywords,
  buildPageMetadata,
  CRAFT_SEO_DESCRIPTION,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: EXPERIMENTS_PAGE.title,
  description: CRAFT_SEO_DESCRIPTION,
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
