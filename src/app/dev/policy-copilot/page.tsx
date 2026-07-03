import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyCopilotDevShell } from "@/app/dev/policy-copilot/policy-copilot-dev-shell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Policy Copilot — Dev",
  description:
    "Isolated Policy Copilot living workspace for design and interaction review.",
  path: "/dev/policy-copilot",
  noIndex: true,
});

export default function PolicyCopilotDevPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return <PolicyCopilotDevShell />;
}
