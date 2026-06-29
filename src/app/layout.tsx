import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import CacheManager from "@/components/CacheManager";
import { WireframeFilters } from "@/components/wireframe-filters";
import { SiteEntryAnalytics } from "@/components/site-entry-analytics";
import ScrollToTop from "@/components/ScrollToTop";
import { SiteCursor } from "@/components/site-cursor-loader";
import { AiChatBall } from "@/components/ai-chat/ai-chat-ball";
import { SkipToContentLink } from "@/components/skip-to-content-link";
import { JsonLd } from "@/components/seo/json-ld";
import { WireframeProvider } from "@/context/wireframe-context";
import { BLOB_CDN_ORIGIN } from "@/lib/asset-cdn";
import { personJsonLd, ROOT_METADATA, webSiteJsonLd } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = ROOT_METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} bg-background`}>
      <head>
        <link rel="preconnect" href={BLOB_CDN_ORIGIN} crossOrigin="anonymous" />
        <JsonLd data={[personJsonLd(), webSiteJsonLd()]} />
      </head>
      <body className="relative min-h-screen bg-background text-white antialiased">
        <WireframeFilters />
        <SkipToContentLink />
        <CacheManager />
        <ScrollToTop />
        <SiteCursor />
        <WireframeProvider>
          {children}
          <AiChatBall />
        </WireframeProvider>
        <Analytics />
        <SiteEntryAnalytics />
      </body>
    </html>
  );
}
