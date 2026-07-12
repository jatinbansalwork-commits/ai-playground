import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants";

/** Legacy `/archive` (Me) — redirects to Field Notes. */
export default function ArchivePage() {
  redirect(ROUTES.notes);
}
