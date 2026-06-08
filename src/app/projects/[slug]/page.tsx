import DynamicCaseStudyGateway from "@/components/projects/dynamic-case-study-gateway";
import { getCaseStudySlugs } from "@/lib/project-content";

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export default function ProjectCaseStudyPage() {
  return <DynamicCaseStudyGateway />;
}
