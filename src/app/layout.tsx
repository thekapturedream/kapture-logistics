import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TemplateBanner } from "@/components/TemplateBanner";
import { SITE } from "@/lib/utils";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "logistics",
    "freight",
    "supply chain",
    "managed transportation",
    "multi-modal",
    "last mile",
    "Africa logistics",
    "Zimbabwe freight",
    "SADC supply chain",
    "Kapture",
  ],
  authors: [{ name: SITE.parent, url: SITE.parentUrl }],
  creator: SITE.parent,
  publisher: SITE.parent,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE.url,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-white font-sans text-kapture-black antialiased dark:bg-kapture-black dark:text-kapture-white">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TemplateBanner />
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)] pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
