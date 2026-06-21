import { redirect } from "next/navigation";
import { getProjectCaseStudyHref } from "@/lib/projects-registry";

/** Legacy `/recent` alias — Cisco case study lives on the projects index. */
export default function RecentPage() {
  redirect(getProjectCaseStudyHref("cisco-policy-copilot"));
}
