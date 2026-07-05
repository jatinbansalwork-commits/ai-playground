import type { Metadata } from "next";
import { IdeasPage } from "@/components/ideas/ideas-page";
import { allProjectsSeoKeywords, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Ideas",
  description:
    "AI experiments and side projects by Jatin Bansal — focus tools, generative interfaces, playful prototypes, and motion-driven product demos.",
  path: "/ideas",
  keywords: allProjectsSeoKeywords(),
});

export default function IdeasRoutePage() {
  return <IdeasPage />;
}
