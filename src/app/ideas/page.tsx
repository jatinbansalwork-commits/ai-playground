import type { Metadata } from "next";
import { IdeasPage } from "@/components/ideas/ideas-page";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Some other things I do · ${SITE_NAME}`,
  description:
    "Something I get asked a lot is: JB, why do you have so much time outside of work? My answer is: I have no idea.",
};

export default function IdeasRoutePage() {
  return <IdeasPage />;
}
