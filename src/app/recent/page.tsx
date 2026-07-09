"use client";

import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { FRAMES } from "@/lib/constants";
import { saveIndexActiveFrameForNavigation } from "@/lib/index-frame-memory";
import { getProjectCaseStudyHref } from "@/lib/projects-registry";
import { BACK_HOME, saveSessionBackContext } from "@/lib/session-navigation";

const RECENT_FRAME_INDEX = FRAMES.findIndex((frame) => frame.id === "cisco-policy-copilot");

/** Legacy `/recent` alias — Cisco case study with Home back context. */
export default function RecentPage() {
  const router = useRouter();

  useLayoutEffect(() => {
    saveSessionBackContext(BACK_HOME);
    if (RECENT_FRAME_INDEX >= 0) {
      saveIndexActiveFrameForNavigation(RECENT_FRAME_INDEX);
    }
    router.replace(getProjectCaseStudyHref("cisco-policy-copilot"));
  }, [router]);

  return null;
}
