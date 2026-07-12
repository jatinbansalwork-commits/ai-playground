import { IBM_Plex_Mono } from "next/font/google";

/** Sitewide typeface — loaded once in the root layout. */
export const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const SITE_FONT_STACK =
  'var(--font-ibm-plex-mono), "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

export const SITE_BACK_FONT_STACK = SITE_FONT_STACK;

export const SITE_BACK_LINK_STYLE = {
  fontFamily: SITE_FONT_STACK,
} as const;
