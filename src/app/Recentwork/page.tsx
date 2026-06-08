import CiscoPolicyCopilotContent from "@/components/case-studies/CiscoPolicyCopilot";
import { CaseStudyPageShell } from "@/components/projects/case-study-page-shell";
import { ROUTES } from "@/lib/constants";

/** Track A — featured case study entry from the index "Recent Work" slide. */
export default function RecentWorkPage() {
  return (
    <CaseStudyPageShell backHref={ROUTES.home} backDestination="Home">
      <CiscoPolicyCopilotContent />
    </CaseStudyPageShell>
  );
}
