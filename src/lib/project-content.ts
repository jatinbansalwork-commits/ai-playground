export interface CaseStudyMetaSpecs {
  services: string[];
  client: string;
  location: string;
  infoText: string;
  liveLinkUrl?: string;
  figmaUrl?: string;
}

export interface CaseStudyContent {
  slug: string;
  title: string;
  year: string;
  overviewText: string;
  meta: CaseStudyMetaSpecs;
}

function entry(
  slug: string,
  title: string,
  year: string,
  overviewText: string,
  meta: CaseStudyMetaSpecs,
): CaseStudyContent {
  return { slug, title, year, overviewText, meta };
}

/**
 * Case study metadata — title, year, SEO copy, and project specs for `/projects/[slug]`.
 * Page layouts and body copy live in `src/components/case-studies/*`.
 */
export const projectDataRegistry: Record<string, CaseStudyContent> = {
  "cisco-policy-copilot": entry(
    "cisco-policy-copilot",
    "⏳ Cisco - AgentiOps Firewall Copilot",
    "2026",
    "Designing an AI-powered security teammate that transforms business intent into deployable firewall policies.",
    {
      services: [],
      client: "Cisco",
      location: "San Jose, CA",
      infoText:
        "Cisco is a global leader in networking and cybersecurity, building the infrastructure that connects organizations worldwide and secures their digital operations.",
    },
  ),
  "freshprints-design-system": entry(
    "freshprints-design-system",
    "✅ FreshPrints - Design System",
    "2025",
    "Built a scalable design system from 0 to 1",
    {
      services: ["Design Systems", "UI Architecture", "Documentation"],
      client: "FreshPrints",
      location: "New York, NY",
      infoText:
        "FreshPrints' e-commerce platform has been a favorite for schools, colleges, sororities, fraternities, clubs, and sports teams across the USA for over a decade. Now, with the addition of content creation, the platform is growing even further. However, the current design systems and UI technology are struggling with scalability and consistency. As FreshPrints looks to expand globally, it's crucial to elevate our systems and design standards to match the expectations of modern creators.",
    },
  ),
  "freshprints-heal-tool": entry(
    "freshprints-heal-tool",
    "FreshPrints - Heal Tool",
    "2025",
    "Design Tool canvas workflows, editor surfaces, and collaboration patterns.",
    {
      services: ["Product Design", "Interaction Design", "Prototyping"],
      client: "FreshPrints",
      location: "New York, NY",
      infoText:
        "Designed canvas editor workflows that balance structure and spontaneity — enabling parallel attention across layers, assets, and live collaboration without overwhelming the editing surface.",
    },
  ),
  "freshprints-image-gen-ai": entry(
    "freshprints-image-gen-ai",
    "✅ FreshPrints - Image Gen AI",
    "2025",
    "Generative image tooling, prompt flows, and asset review interfaces.",
    {
      services: [
        "UX / UI for desktop + mobile",
        "Shipped MVP",
        "Design",
        "Conceptualization",
        "Dev handoff",
        "Discovery",
        "Audit",
        "Motion Graphics",
      ],
      client: "FreshPrints",
      location: "New York, NY",
      infoText:
        "FreshPrints' e-commerce platform has been a favorite for schools, colleges, sororities, fraternities, clubs, and sports teams across the USA for over a decade. Now, with the addition of content creation, the platform is growing even further. However, the current design systems and UI technology are struggling with scalability and consistency. As FreshPrints looks to expand globally, it's crucial to elevate our systems and design standards to match the expectations of modern creators.",
    },
  ),
  "saltbot-ai-saltmine": entry(
    "saltbot-ai-saltmine",
    "✅ Saltbot AI (Saltmine)",
    "2024",
    "Saltbot conversational assistant flows and automation guardrails.",
    {
      services: [
        "Micro-interactions",
        "Dev handoff",
        "Discovery",
        "Early tech exploration",
        "UX / UI for desktop + mobile",
        "Conceptualization",
      ],
      client: "Saltmine",
      location: "Bengaluru",
      infoText:
        "Our first AI-powered Report Analytics Tool at Saltmine. Saltbot makes it easy to generate detailed reports on employee headcount—no more tedious data pulling or complicated navigation. With just a few clicks, you can create and visualize exactly the data you need, all in 5 seconds or less. Say goodbye to cluttered spreadsheets and hello to clear, actionable insights!",
    },
  ),
  "saltmine-sync": entry(
    "saltmine-sync",
    "Saltmine - Sync",
    "2024",
    "Saltmine-Sync data reconciliation views and sync health monitoring.",
    {
      services: ["Product Design", "Data Visualization", "UI Design"],
      client: "Saltmine",
      location: "Remote",
      infoText:
        "Built data reconciliation views that surface drift before it becomes an incident — giving operators sync health monitoring and actionable context under operational load.",
    },
  ),
  "kalash-rewards": entry(
    "kalash-rewards",
    "✅ Kalash - Your New Gold",
    "2024",
    "Helping 1M+ users from their wealth with Digital gold",
    {
      services: [
        "Discovery",
        "Illustration",
        "Branding",
        "UX Research",
        "Fintech B2C",
        "Dev handoff",
        "Motion Graphic",
        "Product Strategy",
        "Shipped MVP",
        "Usability Testing",
      ],
      client: "Kalash",
      location: "Bangalore, India",
      infoText:
        "We at Kalash think \"Everyone can Buy Digital Gold\", starting from ₹10 by using our Gold App. Saving Money is crucial to a financially secure future. Start your gold buying journey now with India's Digital Kalash App. You can buy 24K Digital Gold on a daily, weekly & monthly basis and grow your Money with gold price appreciation. Your gold is 100% secure in a gold vault.",
    },
  ),
  "kalash-year-end-recap": entry(
    "kalash-year-end-recap",
    "✅ Kalash - Year-end Recap",
    "2024",
    "Years of investment history, distilled into one delightful experience",
    {
      services: [
        "Discovery",
        "Illustration",
        "Branding",
        "Dev handoff",
        "Motion Graphic",
        "Product Strategy",
      ],
      client: "Kalash",
      location: "Bangalore, India",
      infoText:
        "Kalash Year-End Recap transforms a year of transactions, investments, and achievements into a personalized experience that helps users reflect on their progress, celebrate wins, and stay motivated for the year ahead.",
    },
  ),
  "piggy-reduced-mutual-fund-support-tickets": entry(
    "piggy-reduced-mutual-fund-support-tickets",
    "✅ Piggy - Reduced Mutual Fund Support Tickets",
    "2023",
    "How we reduced mutual fund support tickets by 12% at Piggy",
    {
      services: [
        "UX Research",
        "Fintech B2C",
        "Dev handoff",
        "Motion Graphic",
        "Product Strategy",
        "Usability Testing",
        "Product Design",
      ],
      client: "Piggy",
      location: "Bangalore, India",
      infoText:
        "Piggy is a fintech investment platform that helps users grow their wealth through products such as Mutual Funds and Digital Gold. Piggy Mutual Funds offer a wide range of investment options, including low-cost index funds, ELSS, and funds across various sectors, market capitalizations, and geographies, catering to different financial goals and risk appetites. Digital Gold enables users to seamlessly buy, sell, and securely store gold online through the Piggy app, eliminating the complexities and risks associated with owning physical gold.",
    },
  ),
  "piggy-personalised-mutual-fund-recommendation": entry(
    "piggy-personalised-mutual-fund-recommendation",
    "Piggy - Personalised Mutual Fund Recommendation",
    "2022",
    "Case study overview coming soon.",
    {
      services: [
        "Micro-interactions",
        "Conceptualization",
        "UX / UI for Mobile",
        "Research",
      ],
      client: "Piggy",
      location: "Bengaluru",
      infoText:
        "Piggy is a mutual fund app that helps people start investing with small, regular contributions. This project focused on personalised fund recommendations—matching users to the right schemes based on their goals, risk appetite, and experience through a simple mobile flow.",
    },
  ),
};

export const PROJECT_CONTENT_SLUGS = Object.keys(
  projectDataRegistry,
) as (keyof typeof projectDataRegistry)[];

export type ProjectContentSlug = (typeof PROJECT_CONTENT_SLUGS)[number];

export function getCaseStudyContent(slug: string): CaseStudyContent | undefined {
  return projectDataRegistry[slug];
}

export function getCaseStudySlugs(): string[] {
  return PROJECT_CONTENT_SLUGS;
}

export function getAllCaseStudies(): CaseStudyContent[] {
  return PROJECT_CONTENT_SLUGS.map((slug) => projectDataRegistry[slug]!);
}
