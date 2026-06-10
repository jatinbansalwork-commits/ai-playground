import type { Metadata } from "next";
import { Geist } from "next/font/google";
import CacheManager from "@/components/CacheManager";
import ScrollToTop from "@/components/ScrollToTop";
import { SkipToContentLink } from "@/components/skip-to-content-link";
import { SITE_NAME } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "900"],
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
      <body className="relative min-h-screen bg-[#1a1a1a] text-white antialiased">
        <SkipToContentLink />
        <CacheManager />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
