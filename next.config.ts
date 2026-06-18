import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
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
        source: "/recent-work",
        destination: "/projects",
        permanent: false,
      },
      {
        source: "/Recentwork",
        destination: "/projects",
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
