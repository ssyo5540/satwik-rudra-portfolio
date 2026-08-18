import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { site } from "@/lib/content";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

/**
 * Type pairing — open-licence stand-ins for the reference's commercial faces:
 *   Archivo    → display grotesque (TR 3 A)
 *   Geist Sans → interface/body     (PP Neue Montreal)
 */
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  keywords: [
    "Satwik Rudra",
    "Full Stack Developer",
    "React Developer",
    "React Native Developer",
    "Dallas",
    "Node.js",
    "TypeScript",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#d5cfbe",
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
      className={`no-js ${archivo.variable} ${GeistSans.variable}`}
      suppressHydrationWarning
    >
      {/* suppressHydrationWarning: browser extensions (Grammarly et al.) inject
          attributes onto <body> before React hydrates, which otherwise logs a
          mismatch that has nothing to do with our markup. */}
      <body className="bg-sand text-ink antialiased" suppressHydrationWarning>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
