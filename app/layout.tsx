import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { SiteBackground } from "@/components/site/site-background";
import { SiteFooter } from "@/components/site/site-footer";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/site/site-header";
import { StructuredData } from "@/components/site/structured-data";
import { site } from "@/content/site";
import "./globals.css";

const grotesk = Schibsted_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.title}`,
  },
  description: site.description,
  applicationName: site.title,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    site.name,
    "University of Waterloo",
    "Software Engineering",
    "Copperlane",
    "YC W26",
    "software engineering intern",
    "Winter 2027 internship",
    "Summer 2027 internship",
    "AI agents",
    "agent infrastructure",
  ],
  alternates: {
    types: { "text/markdown": "/llms.txt" },
  },
  openGraph: {
    type: "profile",
    siteName: site.title,
    title: site.title,
    description: site.description,
    locale: "en_US",
    firstName: "Aidan",
    lastName: "Jeon",
    username: "aidanjnn",
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.description,
    creator: "@aidanjnn",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-canvas text-ink">
        <StructuredData />
        <SiteBackground />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:bg-canvas focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[600px] flex-col px-8 pt-[8vh] pb-6">
          <SiteHeader />
          <main id="content" tabIndex={-1} className="page-enter flex flex-1 flex-col">
            {children}
          </main>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
