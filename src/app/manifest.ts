import type { MetadataRoute } from "next";
import { SITE_CANVAS, SITE_NAME } from "@/lib/constants";
import { SITE_AUTHOR } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_AUTHOR} — ${SITE_NAME}`,
    short_name: SITE_NAME,
    description: "Product designer portfolio — case studies, craft, and AI experiments.",
    start_url: "/",
    display: "standalone",
    background_color: SITE_CANVAS,
    theme_color: SITE_CANVAS,
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
