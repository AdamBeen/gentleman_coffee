import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { siteConfig } from "@/config/site";
import { getSiteUrl } from "@/config/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || getSiteUrl()),
  title: {
    default: `${siteConfig.businessName} · Distributeurs automatiques café, boissons & snacking à Bordeaux`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description: siteConfig.tagline
    ? `${siteConfig.tagline}`
    : "Gentelman Coffee équipe entreprises, commerces et établissements avec des solutions automatiques de café, boissons et snacking adaptées à leurs besoins. Bordeaux & Gironde.",
  keywords: [
    "distributeur automatique Bordeaux",
    "machine à café entreprise Bordeaux",
    "distributeur café entreprise",
    "distributeur snacks Bordeaux",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: siteConfig.businessName,
    title: `${siteConfig.businessName} · Distributeurs automatiques Bordeaux & Gironde`,
    description:
      "Solutions automatiques de café, boissons et snacking pour entreprises, commerces et établissements.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-espresso"
        >
          Aller au contenu principal
        </a>
        <Navbar />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
