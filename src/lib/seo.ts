import type { Metadata } from "next";
import { CONTACT_LINKS, HERO_COPY, ROUTES, SITE_NAME } from "@/lib/constants";
import type { CaseStudyContent } from "@/lib/project-content";
import { HOVER_THUMBNAIL_OVERRIDES } from "@/lib/projects-list-data";

/** Production origin — set `NEXT_PUBLIC_SITE_URL` in Vercel env. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://jatinbansal.vercel.app";

export const SITE_AUTHOR = "Jatin Bansal";

export const SEO_KEYWORDS = [
  "product designer",
  "UX designer",
  "UI designer",
  "portfolio",
  "case study",
  "cybersecurity UX",
  "fintech design",
  "design systems",
  "AI product design",
] as const;

export const DEFAULT_SITE_DESCRIPTION =
  "Jatin Bansal (JB) — product designer portfolio featuring cybersecurity, fintech, and AI product case studies, design systems, motion graphics, and interface experiments.";

export const HOME_SEO_DESCRIPTION =
  "Jatin Bansal is a product designer working on cybersecurity by day and AI experiments by night. Explore UX case studies for Cisco, FreshPrints, Kalash, Piggy, Saltmine, craft work, and side projects.";

export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";

const LINKEDIN_URL =
  CONTACT_LINKS.find((link) => link.label === "LinkedIn")?.href ??
  "https://www.linkedin.com/in/jatin-bansal-design/";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function truncateMetaDescription(text: string, max = 160): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  const clipped = normalized.slice(0, max - 1);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${(lastSpace > 80 ? clipped.slice(0, lastSpace) : clipped).trim()}…`;
}

/** Strip draft / status emoji prefixes from case study titles in SERP copy. */
export function stripCaseStudyStatusPrefix(title: string): string {
  return title.replace(/^[\s⏳✅🔒]+/u, "").trim();
}

function isUsableOgImage(url: string | undefined): url is string {
  if (!url) return false;
  return !url.startsWith("data:");
}

export function caseStudyOgImage(slug: string): string | undefined {
  const image = HOVER_THUMBNAIL_OVERRIDES[slug];
  return isUsableOgImage(image) ? image : undefined;
}

/** Rich meta description for case studies — client, outcome, and services when space allows. */
export function buildCaseStudyMetaDescription(content: CaseStudyContent): string {
  const title = stripCaseStudyStatusPrefix(content.title);
  const { client, services } = content.meta;
  const servicePhrase =
    services.length > 0
      ? ` Services: ${services.slice(0, 4).join(", ")}.`
      : "";

  let description = content.overviewText.trim();

  if (description.length < 90) {
    description = `${title} — UX case study for ${client}. ${description}`;
  } else if (!description.toLowerCase().includes(client.toLowerCase())) {
    description = `${client}: ${description}`;
  }

  if (servicePhrase && description.length + servicePhrase.length <= 158) {
    description += servicePhrase;
  }

  return truncateMetaDescription(description);
}

interface PageSeoInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  openGraphType?: "website" | "article";
}

export function buildSocialMetadata({
  title,
  description,
  path,
  image,
  noIndex,
  openGraphType = "website",
}: PageSeoInput): Pick<Metadata, "alternates" | "robots" | "openGraph" | "twitter"> {
  const ogImage = isUsableOgImage(image)
    ? absoluteUrl(image)
    : absoluteUrl(DEFAULT_OG_IMAGE_PATH);

  return {
    alternates: path ? { canonical: absoluteUrl(path) } : undefined,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: openGraphType,
      locale: "en_GB",
      siteName: SITE_NAME,
      title,
      description,
      url: path ? absoluteUrl(path) : SITE_URL,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function buildPageMetadata(input: PageSeoInput): Metadata {
  return {
    title: input.title,
    description: truncateMetaDescription(input.description),
    keywords: [...SEO_KEYWORDS],
    ...buildSocialMetadata(input),
  };
}

export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_AUTHOR} — Product Designer Portfolio`,
    template: `%s · ${SITE_NAME}`,
  },
  description: DEFAULT_SITE_DESCRIPTION,
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
  creator: SITE_AUTHOR,
  publisher: SITE_AUTHOR,
  category: "design",
  ...buildSocialMetadata({
    title: `${SITE_AUTHOR} — Product Designer Portfolio`,
    description: DEFAULT_SITE_DESCRIPTION,
    path: "/",
  }),
};

export const HOME_METADATA: Metadata = buildPageMetadata({
  title: `${SITE_AUTHOR} — Product Designer`,
  description: HOME_SEO_DESCRIPTION,
  path: "/",
});

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SITE_AUTHOR,
    alternateName: ["JB", "Jatin Bansal"],
    url: SITE_URL,
    jobTitle: "Product Designer",
    description: DEFAULT_SITE_DESCRIPTION,
    sameAs: [LINKEDIN_URL],
    knowsAbout: [
      "Product Design",
      "User Experience Design",
      "Cybersecurity",
      "Fintech",
      "Design Systems",
      "Artificial Intelligence",
      "Interaction Design",
    ],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_SITE_DESCRIPTION,
    inLanguage: "en-GB",
    author: { "@id": `${SITE_URL}/#person` },
  };
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}${ROUTES.archive}`,
    name: `About ${SITE_AUTHOR}`,
    url: absoluteUrl(ROUTES.archive),
    description: HOME_SEO_DESCRIPTION,
    mainEntity: { "@id": `${SITE_URL}/#person` },
  };
}

export function projectsCollectionJsonLd(
  projects: ReadonlyArray<{ name: string; url: string; description: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}${ROUTES.projects}`,
    name: "Product Design Case Studies",
    url: absoluteUrl(ROUTES.projects),
    description:
      "Selected UX and product design case studies by Jatin Bansal across cybersecurity, fintech, design systems, and AI.",
    author: { "@id": `${SITE_URL}/#person` },
    hasPart: projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.name,
      url: absoluteUrl(project.url),
      description: project.description,
    })),
  };
}

export function breadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function caseStudyArticleJsonLd(input: {
  slug: string;
  name: string;
  description: string;
  year: string;
  client: string;
  services: string[];
  image?: string;
}) {
  const pageUrl = `/projects/${input.slug}`;
  const image = isUsableOgImage(input.image)
    ? absoluteUrl(input.image)
    : absoluteUrl(DEFAULT_OG_IMAGE_PATH);

  return [
    breadcrumbJsonLd([
      { name: "Home", path: ROUTES.home },
      { name: "Projects", path: ROUTES.projects },
      { name: input.name, path: pageUrl },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": absoluteUrl(pageUrl),
      headline: input.name,
      name: input.name,
      description: input.description,
      url: absoluteUrl(pageUrl),
      inLanguage: "en-GB",
      datePublished: `${input.year}-01-01`,
      author: { "@id": `${SITE_URL}/#person` },
      publisher: { "@id": `${SITE_URL}/#person` },
      image: [image],
      keywords: input.services.join(", "),
      about: {
        "@type": "Organization",
        name: input.client,
      },
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
      },
    },
  ];
}

export function craftArticleJsonLd(input: {
  slug: string;
  title: string;
  description: string;
}) {
  const pageUrl = `/craft/${input.slug}`;

  return [
    breadcrumbJsonLd([
      { name: "Home", path: ROUTES.home },
      { name: "Craft", path: ROUTES.craft },
      { name: input.title, path: pageUrl },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": absoluteUrl(pageUrl),
      headline: input.title,
      name: input.title,
      description: input.description,
      url: absoluteUrl(pageUrl),
      inLanguage: "en-GB",
      author: { "@id": `${SITE_URL}/#person` },
      publisher: { "@id": `${SITE_URL}/#person` },
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
      },
    },
  ];
}

/** @deprecated Use `caseStudyArticleJsonLd` */
export function creativeWorkJsonLd(input: {
  name: string;
  description: string;
  url: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.url),
    author: { "@type": "Person", name: SITE_AUTHOR },
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
  };
}
