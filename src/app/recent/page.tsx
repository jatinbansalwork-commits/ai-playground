"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProjectCaseStudyHref } from "@/lib/projects-registry";
import { BACK_HOME, saveSessionBackContext } from "@/lib/session-navigation";

/** Legacy `/recent` alias — Cisco case study with Home back context. */
export default function RecentPage() {
  const router = useRouter();

  useEffect(() => {
    saveSessionBackContext(BACK_HOME);
    router.replace(getProjectCaseStudyHref("cisco-policy-copilot"));
  }, [router]);

  return null;
}
