import type { Metadata } from "next";
import { ExperimentsGallery } from "@/components/experiments/experiments-gallery";
import { sectionMetadata } from "@/lib/section-pages";

export const metadata: Metadata = sectionMetadata("experiments");

export default function ExperimentsPage() {
  return <ExperimentsGallery />;
}
