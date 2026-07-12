import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Parent ~/package-lock.json otherwise becomes Turbopack's root and routes 404.
  turbopack: {
    root: path.join(__dirname),
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lottie-react"],
  },
  async redirects() {
    return [
      {
        source: "/fun",
        destination: "/craft",
        permanent: true,
      },
      {
        source: "/fun/:path*",
        destination: "/craft/:path*",
        permanent: true,
      },
      {
        source: "/recent",
        destination: "/projects/cisco-policy-copilot",
        permanent: false,
      },
      {
        source: "/recent-work",
        destination: "/projects/cisco-policy-copilot",
        permanent: false,
      },
      {
        source: "/Recentwork",
        destination: "/projects/cisco-policy-copilot",
        permanent: false,
      },
      {
        source: "/projects/piggy-mutual-fund",
        destination: "/projects/kalash-year-end-recap",
        permanent: true,
      },
      {
        source: "/projects/design-tool",
        destination: "/projects/freshprints-heal-tool",
        permanent: true,
      },
      {
        source: "/projects/design-polling",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/projects/freshprints-poll-on-your-design",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/projects/freshprints-image-gen",
        destination: "/projects/freshprints-image-gen-ai",
        permanent: true,
      },
      {
        source: "/projects/saltbot",
        destination: "/projects/saltbot-ai-saltmine",
        permanent: true,
      },
      {
        source: "/projects/new-project",
        destination: "/projects/piggy-reduced-mutual-fund-support-tickets",
        permanent: true,
      },
      {
        source: "/projects/project-2",
        destination: "/projects/piggy-personalised-mutual-fund-recommendation",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
