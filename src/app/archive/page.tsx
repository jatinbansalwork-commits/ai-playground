import type { Metadata } from "next";
import { MePage } from "@/components/me/me-page";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPageMetadata, HOME_SEO_DESCRIPTION, profilePageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Jatin Bansal",
  description: HOME_SEO_DESCRIPTION,
  path: "/archive",
});

export default function ArchivePage() {
  return (
    <>
      <JsonLd data={profilePageJsonLd()} />
      <MePage />
    </>
  );
}
