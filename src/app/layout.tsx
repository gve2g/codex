import type { Metadata } from "next";
import { Source_Serif_4, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-serif-4",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-instrument-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://caseandsignal.netlify.app"),
  title: "Case & Signal — AI Policy Case Studies for Universities and Schools",
  description:
    "Case & Signal provides interactive case-study modules, facilitator support, and institutional licensing for teaching AI governance, the future of work, and related technology-policy issues.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Case & Signal — AI Policy Case Studies for Universities and Schools",
    description:
      "Interactive case-study modules for teaching AI governance, the future of work, and technology policy. Built for universities, schools, and organizations.",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Case & Signal" }],
    type: "website",
    siteName: "Case & Signal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case & Signal — AI Policy Case Studies for Universities and Schools",
    description:
      "Interactive case-study modules for teaching AI governance, the future of work, and technology policy.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sourceSerif4.variable} ${instrumentSans.variable} ${ibmPlexMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-sans bg-background text-foreground antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
