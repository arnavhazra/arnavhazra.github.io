import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CustomCursor } from "@/components/craft/CustomCursor";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.geoDescription,
  jobTitle: "Co-founder & CTO",
  worksFor: {
    "@type": "Organization",
    name: "Neural Next",
    url: siteConfig.links.neuralnext,
  },
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.neuralnext,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <LenisProvider>
            <CustomCursor />
            <div aria-hidden className="grain" />
            <Header />
            <main className="view-transition-main flex-1">{children}</main>
            <Footer />
          </LenisProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
