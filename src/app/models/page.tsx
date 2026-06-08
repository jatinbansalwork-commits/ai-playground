import type { Metadata } from "next";
import { CiscoCaseStudiesPage } from "@/components/models/cisco-platform-page";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Recent Work · ${SITE_NAME}`,
  description: "Interactive case study chapters for recent project work.",
};

export default function ModelsPage() {
  return <CiscoCaseStudiesPage />;
}
