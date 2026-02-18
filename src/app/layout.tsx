import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scriptify - Digitalisez aujourd’hui. Dominez demain.",
  description:
    "Services de développement web, mobile, community management et IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light" storageKey="scriptify-theme">
          {children}
        </ThemeProvider>
        <GoogleAnalytics gaId="GTM-5CPS5RHK" />
      </body>
    </html>
  );
}
