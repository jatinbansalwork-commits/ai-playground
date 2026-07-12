import { IBM_Plex_Sans, Just_Another_Hand } from "next/font/google";

/** Sitewide typeface — loaded once in the root layout. */
export const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/** Field Notes index slide — Google Fonts handwriting face. */
export const justAnotherHand = Just_Another_Hand({
  variable: "--font-just-another-hand",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const SITE_FONT_STACK =
  'var(--font-ibm-plex-sans), "IBM Plex Sans", system-ui, sans-serif';

export const SITE_BACK_FONT_STACK = SITE_FONT_STACK;

export const SITE_BACK_LINK_STYLE = {
  fontFamily: SITE_FONT_STACK,
} as const;
