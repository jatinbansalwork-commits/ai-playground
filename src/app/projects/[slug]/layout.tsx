import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { isNoIndexProjectSlug } from "@/lib/projects-list-data";
import { getCaseStudyContent } from "@/lib/project-content";
import {
  buildCaseStudyMetaDescription,
  buildPageMetadata,
  caseStudyArticleJsonLd,
  caseStudyOgImage,
  stripCaseStudyStatusPrefix,
} from "@/lib/seo";

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
    return buildPageMetadata({
      title: "Not Found",
      description: "This case study could not be found.",
      path: `/projects/${slug}`,
      noIndex: true,
    });
  }

  const displayTitle = stripCaseStudyStatusPrefix(content.title);
  const description = buildCaseStudyMetaDescription(content);

  return buildPageMetadata({
    title: `${displayTitle} · Projects`,
    description,
    path: `/projects/${slug}`,
    image: caseStudyOgImage(slug),
    noIndex: isNoIndexProjectSlug(slug),
    openGraphType: "article",
  });
}

export default async function CaseStudyLayout({
  children,
  params,
}: CaseStudyLayoutProps) {
  const { slug } = await params;
  const content = getCaseStudyContent(slug);

  if (!content) {
    return children;
  }

  const displayTitle = stripCaseStudyStatusPrefix(content.title);
  const description = buildCaseStudyMetaDescription(content);
  const preloadImage = caseStudyOgImage(slug);

  return (
    <>
      {preloadImage ? (
        <link rel="preload" href={preloadImage} as="image" fetchPriority="high" />
      ) : null}
      <JsonLd
        data={caseStudyArticleJsonLd({
          slug,
          name: displayTitle,
          description,
          year: content.year,
          client: content.meta.client,
          services: content.meta.services,
          image: caseStudyOgImage(slug),
        })}
      />
      {children}
    </>
  );
}
