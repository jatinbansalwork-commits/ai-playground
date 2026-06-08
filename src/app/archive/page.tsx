import type { Metadata } from "next";
import { MePage } from "@/components/me/me-page";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Me · ${SITE_NAME}`,
  description: "Introduction",
};

export default function ArchivePage() {
  return <MePage />;
}
