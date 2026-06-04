import type { Metadata } from "next";
import { Geist, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const SITE_URL = "https://openaish.com";
const DESCRIPTION =
  "aish is an early, open-source design for an AI-native shell — natural language meets the command line. Free software, AGPL-3.0, built in the open.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "aish — the AI-native shell",
  description: DESCRIPTION,
  keywords: ["aish", "AI shell", "REPL", "terminal", "AI-native", "open source", "AGPL"],
  authors: [{ name: "daaquan" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "aish — the AI-native shell",
    description: DESCRIPTION,
    siteName: "aish",
  },
  twitter: {
    card: "summary",
    title: "aish — the AI-native shell",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
