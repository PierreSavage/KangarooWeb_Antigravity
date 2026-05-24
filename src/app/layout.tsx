import type { Metadata } from "next";
import { Inter, Outfit, Manrope } from "next/font/google";
import "./globals.css";

import LenisProvider from "@/components/providers/lenis-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "KANGAROO PRODUCTION | Premium Creative & Audiovisual Studio",
  description: "KANGAROO PRODUCTION je špičkové kreativní a multimediální studio Michala Dvořáka. Pořádáme Soundtrack Festival, show Beats & Blondes, DRAWMAN a koncerty legendární skupiny LUCIE.",
  keywords: ["Kangaroo Production", "Michal Dvořák", "Soundtrack Festival", "Beats & Blondes", "DRAWMAN Show", "LUCIE 40 Let", "multimediální show", "audiovizuální produkce"],
  authors: [{ name: "Kangaroo Production" }],
  icons: {
    icon: "/favicon.ico",
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
      className={`${inter.variable} ${outfit.variable} ${manrope.variable} h-full antialiased`}
      style={{ scrollBehavior: "auto" }}
    >
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent-cyan)]/25 selection:text-[var(--foreground)] transition-colors duration-500">
        <LanguageProvider>
          <ThemeProvider>
            <LenisProvider>
              {/* Global Repeating Noise Overlay */}
              <div className="bg-noise" />
              
              {/* Interactive Dynamic Mouse Spotlight */}
              <CustomCursor />
              
              {/* Main Content Page */}
              <div className="relative z-10">
                {children}
              </div>
            </LenisProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
