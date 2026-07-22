import type { Metadata } from "next";
import { CONTACT_LINKS, HERO_COPY, ROUTES, SITE_NAME } from "@/lib/constants";
import {
  getAllCaseStudies,
  getCaseStudyContent,
  type CaseStudyContent,
} from "@/lib/project-content";
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
  "case studies",
  "case study",
  "cybersecurity UX",
  "fintech design",
  "design systems",
  "AI product design",
  "enterprise security UX",
  "firewall policy design",
  "AI copilot design",
  "network security UX",
  "firewall administrator UX",
  "Saltbot",
  "FreshPrints",
  "motion graphics",
  "design craft",
] as const;

/** Per-slug keyword extensions merged after content-derived terms. */
export const CASE_STUDY_SEO_KEYWORDS: Partial<Record<string, readonly string[]>> = {
  "cisco-policy-copilot": [
    "Cisco Policy Copilot",
    "Cisco Hybrid Mesh Firewall",
    "Cisco Secure Firewall",
    "AgentiOps",
    "AI-assisted firewall policy",
    "firewall policy management",
    "firewall rule management",
    "network security policy",
    "natural language firewall policy",
    "intent-based security policy",
    "enterprise AI copilot",
    "explainable AI security",
    "human-in-the-loop AI",
    "security policy automation",
    "firewall policy validation",
    "blast radius simulation",
    "conversational security policy",
    "firewall administrator UX",
    "enterprise security AI",
    "AI firewall UX case study",
  ],
  "saltbot-ai-saltmine": [
    "Saltbot",
    "Saltmine",
    "AI analytics UX",
    "workplace analytics",
    "conversational analytics",
    "enterprise AI assistant",
  ],
  "freshprints-design-system": [
    "FreshPrints",
    "design system case study",
    "component library",
    "design tokens",
    "product design system",
  ],
  "freshprints-image-gen-ai": [
    "FreshPrints",
    "Image Gen AI",
    "generative AI UX",
    "AI content creation",
  ],
};

/** SERP-optimised meta descriptions — used instead of `overviewText` when set. */
export const CASE_STUDY_META_DESCRIPTIONS: Partial<Record<string, string>> = {
  "cisco-policy-copilot":
    "Cisco Policy Copilot UX case study: AI-assisted firewall policy design for Hybrid Mesh Firewall—natural language intent, explainable recommendations, continuous validation, and an interactive workspace demo.",
};

/** SERP-optimised page titles — used instead of registry title when set. */
export const CASE_STUDY_PAGE_TITLES: Partial<Record<string, string>> = {
  "cisco-policy-copilot": "Cisco Policy Copilot — AI Firewall UX Case Study",
};

const SEO_KEYWORD_CAP = 48;

function normalizeSeoKeyword(term: string): string {
  return term.replace(/\s+/g, " ").trim();
}

export function mergeSeoKeywords(
  ...groups: ReadonlyArray<string | readonly string[]>
): string[] {
  const seen = new Set<string>();
  const merged: string[] = [];

  for (const group of groups) {
    for (const term of group) {
      const normalized = normalizeSeoKeyword(term);
      const key = normalized.toLowerCase();
      if (!normalized || key.length < 2 || seen.has(key)) continue;
      seen.add(key);
      merged.push(normalized);
      if (merged.length >= SEO_KEYWORD_CAP) return merged;
    }
  }

  return merged;
}

/** Keywords derived from a single case study's title, client, location, and services. */
export function buildCaseStudyContentKeywords(content: CaseStudyContent): string[] {
  const title = stripCaseStudyStatusPrefix(content.title);
  const titleParts = title.split(/\s*[-–—]\s*/).map((part) => part.trim()).filter(Boolean);

  return mergeSeoKeywords([
    title,
    ...titleParts,
    content.meta.client,
    content.meta.location,
    ...content.meta.services,
    `${content.meta.client} UX`,
    `${content.meta.client} case study`,
    `${content.year} case study`,
  ]);
}

/** All indexable project keywords — for home, projects index, and section pages. */
export function allProjectsSeoKeywords(): string[] {
  return mergeSeoKeywords(
    SEO_KEYWORDS,
    ...getAllCaseStudies().map(buildCaseStudyContentKeywords),
  );
}

export function caseStudySeoKeywords(slug: string): string[] {
  const content = getCaseStudyContent(slug);

  return mergeSeoKeywords(
    SEO_KEYWORDS,
    content ? buildCaseStudyContentKeywords(content) : [],
    CASE_STUDY_SEO_KEYWORDS[slug] ?? [],
  );
}

export const DEFAULT_SITE_DESCRIPTION =
  "Jatin Bansal (JB) — product designer at Cisco. Portfolio of UX case studies in cybersecurity, AI products, fintech, and design systems, plus craft work in motion and illustration.";

export const HOME_SEO_DESCRIPTION =
  "Howdy, I'm JB. Designing AI products, prototyping them in code, and raising the bar for design craft at Cisco. Explore case studies including Cisco Policy Copilot—AI-assisted firewall policy with an interactive demo—plus Saltbot, FreshPrints, Kalash, and craft work.";

export const PROJECTS_SEO_DESCRIPTION =
  "UX and product design case studies by Jatin Bansal — Cisco Policy Copilot firewall UX, Saltbot AI analytics, FreshPrints design systems and Image Gen AI, and Kalash rewards.";

export const CRAFT_SEO_DESCRIPTION =
  "Motion graphics, illustration, and design essays by Jatin Bansal — craft experiments, visual play, and a Design Review checklist from shipped product work.";

export const NOTES_SEO_DESCRIPTION =
  "JB's Case Notes — field notes on product design, AI craft, and working in progress from Jatin Bansal.";

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

export function caseStudyPageTitle(slug: string, fallbackTitle: string): string {
  return CASE_STUDY_PAGE_TITLES[slug] ?? stripCaseStudyStatusPrefix(fallbackTitle);
}

export function caseStudyOgImage(slug: string): string | undefined {
  const image = HOVER_THUMBNAIL_OVERRIDES[slug];
  return isUsableOgImage(image) ? image : undefined;
}

/** Rich meta description for case studies — client, outcome, and services when space allows. */
export function buildCaseStudyMetaDescription(content: CaseStudyContent): string {
  const slugOverride = CASE_STUDY_META_DESCRIPTIONS[content.slug];
  if (slugOverride) {
    return truncateMetaDescription(slugOverride);
  }

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
  keywords?: string[];
  article?: {
    publishedTime?: string;
    authors?: string[];
    section?: string;
    tags?: string[];
  };
}

export function buildSocialMetadata({
  title,
  description,
  path,
  image,
  noIndex,
  openGraphType = "website",
  article,
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
      ...(article?.publishedTime ? { publishedTime: article.publishedTime } : {}),
      ...(article?.authors ? { authors: article.authors } : {}),
      ...(article?.section ? { section: article.section } : {}),
      ...(article?.tags ? { tags: article.tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@jatinbansal",
    },
  };
}

export function buildPageMetadata(input: PageSeoInput): Metadata {
  return {
    title: input.title,
    description: truncateMetaDescription(input.description),
    keywords: input.keywords ?? [...SEO_KEYWORDS],
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
  keywords: allProjectsSeoKeywords(),
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
      "Firewall Policy Management",
      "Enterprise AI",
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
    description: PROJECTS_SEO_DESCRIPTION,
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
      { name: "Case Studies", path: ROUTES.projects },
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
      keywords: caseStudySeoKeywords(input.slug).join(", "),
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
