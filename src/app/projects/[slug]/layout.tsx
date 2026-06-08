import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { getCaseStudyContent } from "@/lib/project-content";

interface CaseStudyLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = getCaseStudyContent(slug);

  if (!content) {
    return { title: `Not Found · ${SITE_NAME}` };
  }

  return {
    title: `${content.title} · Projects · ${SITE_NAME}`,
    description: content.overviewText,
  };
}

export default function CaseStudyLayout({ children }: CaseStudyLayoutProps) {
  return children;
}
