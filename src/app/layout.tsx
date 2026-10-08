import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: "CodePrepTools - Free Developer Tools",
    template: "%s | CodePrepTools",
  },

  //description: siteConfig.description,

  description: "Free online developer tools and programming interview preparation resources for developers.",

  applicationName: "CodePrepTools",

  keywords: [
    "developer tools",
    "programming tools",
    "JSON formatter",
    "JSON validator",
    "JSON minifier",
    "coding interview preparation",
    "developer interview questions",
  ],

  authors: [
    {
      name: "Basant Kumar Yadav",
    },
  ],

  creator: "Basant Kumar Yadav",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    siteName: "CodePrepTools",
    title: "CodePrepTools - Free Developer Tools & Interview Prep",
    description: "Free online developer tools and programming interview preparation resources.",
    url: siteConfig.url,
  },

  twitter: {
    card: "summary_large_image",
    title: "CodePrepTools",
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Header />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}