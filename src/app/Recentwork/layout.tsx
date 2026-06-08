import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import "./models-platform.css";

export const metadata: Metadata = {
  title: `Recent Work · ${SITE_NAME}`,
  description: "Interactive case study chapters for recent project work.",
};

export default function RecentWorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
