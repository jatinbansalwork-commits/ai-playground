import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { PROJECTS_PAGE } from "@/lib/projects-registry";

export const metadata: Metadata = {
  title: `${PROJECTS_PAGE.title} · ${SITE_NAME}`,
  description: PROJECTS_PAGE.description,
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
