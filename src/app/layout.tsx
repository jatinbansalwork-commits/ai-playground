import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ScrollManager } from "@/hooks/use-index-scroll-reset";
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
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="h-full font-sans">
        <ScrollManager />
        {children}
      </body>
    </html>
  );
}
