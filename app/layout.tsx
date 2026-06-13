import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: "Teqpadi - Repair, Swap, Buy",
    template: "%s | Teqpadi",
  },
  description:
    "Your trusted tech solutions provider in Nigeria. Get device prices, repair estimates, and trade-in values. Expert repairs delivered to your doorstep.",
  keywords: [
    "phone repair Lagos",
    "gadget repair Nigeria",
    "device trade-in",
    "laptop repair",
    "phone prices Nigeria",
    "tech solutions Lagos",
  ],
  authors: [{ name: "Teqpadi" }],
  creator: "Teqpadi",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://teqpadi.com",
    siteName: "Teqpadi",
    title: "Teqpadi - Repair, Swap, Buy",
    description:
      "Your trusted tech solutions provider in Nigeria. Expert repairs, device trade-ins, and competitive prices.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Teqpadi - Tech Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teqpadi - Repair, Swap, Buy",
    description:
      "Your trusted tech solutions provider in Nigeria. Expert repairs, device trade-ins, and competitive prices.",
    images: ["/og-image.jpg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.jpg", sizes: "any" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Teqpadi",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#49297c" },
    { media: "(prefers-color-scheme: dark)", color: "#1a0a2e" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen font-sans flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
