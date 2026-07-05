/** @deprecated Import from `@/lib/session-navigation` — re-exported for compatibility. */
export {
  BACK_HOME as CASE_STUDY_BACK_FROM_HOME,
  BACK_PROJECTS as CASE_STUDY_BACK_FROM_PROJECTS,
  type SessionBackContext as CaseStudyBackContext,
  backContextForIndexNavigation,
  backContextForProjectsListNavigation,
  readSessionBackContext as readCaseStudyBackContext,
  saveSessionBackContext as saveCaseStudyBackContext,
} from "@/lib/session-navigation";
