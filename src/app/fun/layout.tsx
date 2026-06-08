import type { Metadata } from "next";
import { EXPERIMENTS_METADATA } from "@/lib/experiments-registry";

export const metadata: Metadata = EXPERIMENTS_METADATA;

export default function FunLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
