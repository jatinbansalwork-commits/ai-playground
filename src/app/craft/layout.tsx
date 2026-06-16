import type { Metadata } from "next";
import { EXPERIMENTS_METADATA } from "@/lib/experiments-registry";

export const metadata: Metadata = EXPERIMENTS_METADATA;

export default function CraftLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
