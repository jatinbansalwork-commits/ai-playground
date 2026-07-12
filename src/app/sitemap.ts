import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/constants";
import { getCaseStudyContent } from "@/lib/project-content";
import { getExperimentArticleSlugs } from "@/lib/experiments-registry";
import { FIELD_NOTE_SLUGS } from "@/lib/field-notes-content";
import { getIndexableCaseStudySlugs } from "@/lib/projects-list-data";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl(ROUTES.home), lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: absoluteUrl(ROUTES.projects),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(ROUTES.craft),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(ROUTES.ideas),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl(ROUTES.notes),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getIndexableCaseStudySlugs().map(
    (slug) => {
      const content = getCaseStudyContent(slug);
      const priority = slug === "cisco-policy-copilot" ? 0.95 : 0.85;

      return {
        url: absoluteUrl(`${ROUTES.projects}/${slug}`),
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority,
      };
    },
  );

  const craftArticleRoutes: MetadataRoute.Sitemap = getExperimentArticleSlugs().map(
    (slug) => ({
      url: absoluteUrl(`${ROUTES.craft}/${slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.65,
    }),
  );

  const fieldNoteRoutes: MetadataRoute.Sitemap = FIELD_NOTE_SLUGS.map((slug) => ({
    url: absoluteUrl(`${ROUTES.notes}/${slug}`),
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...craftArticleRoutes, ...fieldNoteRoutes];
}
