import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { PROJECTS_LIST } from "@/lib/projects-list-data";
import { getCaseStudyContent } from "@/lib/project-content";
import { PROJECTS_PAGE } from "@/lib/projects-registry";
import {
  buildCaseStudyMetaDescription,
  buildPageMetadata,
  projectsCollectionJsonLd,
  stripCaseStudyStatusPrefix,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: PROJECTS_PAGE.title,
  description: PROJECTS_PAGE.description,
  path: "/projects",
});

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const collectionItems = [...PROJECTS_LIST]
    .map((project) => {
      const content = getCaseStudyContent(project.slug);
      if (!content) return null;

      return {
        name: stripCaseStudyStatusPrefix(content.title),
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
