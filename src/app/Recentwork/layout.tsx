import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { getCaseStudyContent } from "@/lib/project-content";
import { FEATURED_CASE_STUDY_SLUG } from "@/lib/projects-registry";

const featured = getCaseStudyContent(FEATURED_CASE_STUDY_SLUG);

export const metadata: Metadata = {
  title: featured
    ? `${featured.title} · Recent Work · ${SITE_NAME}`
    : `Recent Work · ${SITE_NAME}`,
  description: featured?.overviewText ?? "Featured case study.",
};

export default function RecentWorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
