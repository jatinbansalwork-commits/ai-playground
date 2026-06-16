import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import CacheManager from "@/components/CacheManager";
import ScrollToTop from "@/components/ScrollToTop";
import { SiteCursor } from "@/components/site-cursor-loader";
import { SkipToContentLink } from "@/components/skip-to-content-link";
import { BLOB_CDN_ORIGIN } from "@/lib/asset-cdn";
import { SITE_NAME } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_NAME,
  description:
    "An experimental interface exploring latency and intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} bg-[#1a1a1a]`}>
      <head>
        <link rel="preconnect" href={BLOB_CDN_ORIGIN} crossOrigin="anonymous" />
      </head>
      <body className="relative min-h-screen bg-[#1a1a1a] text-white antialiased">
        <SkipToContentLink />
        <CacheManager />
        <ScrollToTop />
        <SiteCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
