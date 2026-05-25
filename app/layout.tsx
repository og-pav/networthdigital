import type { Metadata, Viewport } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import { site, SITE_URL } from "@/lib/site";
import "./globals.css";

// Outfit is the closest free geometric match to the brand font (Azo Sans):
// it carries Black (display), Bold (headings), Light (sub-display) and Regular
// (body) weights. Swap in the licensed Azo Sans web fonts if/when available.
const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#11142A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NetWorth Digital — Operations partner for service businesses",
    template: "%s — NetWorth Digital",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "GoHighLevel agency",
    "business automation Australia",
    "CRM build-out",
    "operations partner",
    "lead nurture systems",
    "service business systems",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: SITE_URL,
    siteName: site.name,
    title: "NetWorth Digital — Operations partner for service businesses",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "NetWorth Digital — Operations partner for service businesses",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
