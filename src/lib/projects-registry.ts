export interface ProjectEntry {
  slug: string;
  title: string;
  year: string;
  /** Destination URL or site path — always opens in a new tab. */
  href: string;
  /** Set true for external URLs (optional if href starts with http). */
  external?: boolean;
}

export const PROJECTS_PAGE = {
  title: "Projects",
  description: "Selected product and interface work.",
} as const;

/**
 * Projects list — edit this array to add, remove, or reorder rows.
 *
 *   { slug: "my-project", title: "My Project", year: "2026", href: "https://example.com" }
 *   { slug: "local-page", title: "Local Page", year: "2025", href: "/experiments" }
 */
export const PROJECTS_REGISTRY: ProjectEntry[] = [
  {
    slug: "ai-playground",
    title: "Cisco-Policy Copliot",
    year: "2026",
    href: "/",
  },
  {
    slug: "embedding-viz",
    title: "FreshPrints Design System",
    year: "2025",
    href: "#",
    external: true,
  },
  {
    slug: "vector-field",
    title: "Design Tool",
    year: "2025",
    href: "#",
    external: true,
  },
  {
    slug: "scroll-slider",
    title: "Design Polling",
    year: "2025",
    href: "/experiments/scroll-slider",
  },
  {
    slug: "inference-v3",
    title: "FreshPrints Image Gen",
    year: "2025",
    href: "/models",
  },
  {
    slug: "wireframe-mode",
    title: "Saltbot",
    year: "2024",
    href: "/experiments/wireframe-mode",
  },
  {
    slug: "minimap-tracker",
    title: "Saltmine-Sync",
    year: "2024",
    href: "/experiments",
  },
  {
    slug: "spring-physics",
    title: "Kalash Rewards",
    year: "2024",
    href: "#",
    external: true,
  },
  {
    slug: "click-sound",
    title: "Piggy Mutual Fund",
    year: "2023",
    href: "#",
    external: true,
  },
  {
    slug: "ui-playbook",
    title: "Open Money",
    year: "2021",
    href: "#",
    external: true,
  },
];
