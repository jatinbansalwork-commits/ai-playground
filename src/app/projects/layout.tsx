import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { isOnSiteCaseStudyRow, PROJECTS_LIST } from "@/lib/projects-list-data";
import { getCaseStudyContent } from "@/lib/project-content";
import { PROJECTS_PAGE } from "@/lib/projects-registry";
import {
  allProjectsSeoKeywords,
  buildCaseStudyMetaDescription,
  buildPageMetadata,
  caseStudyPageTitle,
  PROJECTS_SEO_DESCRIPTION,
  projectsCollectionJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: PROJECTS_PAGE.title,
  description: PROJECTS_SEO_DESCRIPTION,
  path: "/projects",
  keywords: allProjectsSeoKeywords(),
});

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const collectionItems = [...PROJECTS_LIST]
    .filter(isOnSiteCaseStudyRow)
    .map((project) => {
      const content = getCaseStudyContent(project.slug);
      if (!content) return null;

      return {
        name: caseStudyPageTitle(project.slug, content.title),
        url: `/projects/${project.slug}`,
        description: buildCaseStudyMetaDescription(content),
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <>
      <JsonLd data={projectsCollectionJsonLd(collectionItems)} />
      {children}
    </>
  );
}
