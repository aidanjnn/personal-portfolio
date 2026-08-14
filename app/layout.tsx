import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { SiteHeader } from "@/components/site/site-header";
import { site } from "@/content/site";
import "./globals.css";

const grotesk = Schibsted_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s · ${site.title}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-canvas text-ink">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:bg-canvas focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <div className="mx-auto w-full max-w-[600px] px-8 pt-[8vh] pb-16">
          <SiteHeader />
          <main id="content" className="page-enter">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
