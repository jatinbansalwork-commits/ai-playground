import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants";

/** AI Labs retired — keep the route so old links land on the index. */
export default function IdeasRoutePage() {
  redirect(ROUTES.home);
}
