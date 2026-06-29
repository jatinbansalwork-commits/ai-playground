import type { Metadata } from "next";
import { IndexExperience } from "@/components/slider/index-experience";
import { HOME_METADATA } from "@/lib/seo";

export const metadata: Metadata = HOME_METADATA;

export default function Home() {
  return <IndexExperience />;
}
