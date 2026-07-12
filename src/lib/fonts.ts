import { IBM_Plex_Sans } from "next/font/google";

/** Sitewide typeface — loaded once in the root layout. */
export const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const SITE_FONT_STACK =
  'var(--font-ibm-plex-sans), "IBM Plex Sans", system-ui, sans-serif';

export const SITE_BACK_FONT_STACK = SITE_FONT_STACK;

export const SITE_BACK_LINK_STYLE = {
  fontFamily: SITE_FONT_STACK,
} as const;
