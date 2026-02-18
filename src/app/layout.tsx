import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://scriptify.cm";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Scriptify - Digitalisez aujourd'hui. Dominez demain.",
    template: "%s | Scriptify",
  },
  description:
    "Scriptify : développement web, sites vitrine, applications mobiles, community management et solutions IA au Cameroun. Devis gratuit, accompagnement sur mesure.",
  keywords: [
    "Scriptify",
    "développement web Cameroun",
    "création site web",
    "application mobile",
    "community management",
    "agence digitale",
    "IA chatbot",
    "SEO",
  ],
  authors: [{ name: "Scriptify", url: siteUrl }],
  creator: "Scriptify",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Scriptify",
    title: "Scriptify - Digitalisez aujourd'hui. Dominez demain.",
    description:
      "Développement web, mobile, community management et IA au Cameroun. Sites, apps et stratégie digitale.",
    images: [
      {
        url: "/images/SCRIPTY_n_Plan_de_travail_1_copie_5.png",
        width: 1200,
        height: 630,
        alt: "Scriptify - Agence digitale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scriptify - Digitalisez aujourd'hui. Dominez demain.",
    description: "Développement web, mobile, community management et IA au Cameroun.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // À remplir après inscription Google Search Console (voir SEO.md)
    // google: "code-de-verification-google",
    google:"7VZXGThdYi2XQVZI6IsHnrYVhuyWkEPC-lL4NeRS1WA"
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Scriptify",
  url: "https://scriptify.cm",
  logo: "https://scriptify.cm/images/SCRIPTY_n_Plan_de_travail_1_copie_5.png",
  description:
    "Agence digitale au Cameroun : développement web, applications mobiles, community management et solutions IA.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "brightman@scriptify.cm",
    availableLanguage: "French",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider defaultTheme="light" storageKey="scriptify-theme">
          {children}
        </ThemeProvider>
        <GoogleAnalytics gaId="GTM-5CPS5RHK" />
      </body>
    </html>
  );
}
