import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { CartProvider } from "@/contexts/CartContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import EmailCapture from "@/components/EmailCapture";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aostrengthteam.store";

const PURCHASE_LOCKED_BUILD = process.env.NEXT_PUBLIC_PURCHASE_LOCKED === "true";

const OG_IMAGE = PURCHASE_LOCKED_BUILD
  ? "/images/hero/hero-bg.webp"
  : "/images/products/signature-tee-1.webp";
const OG_IMAGE_ALT = PURCHASE_LOCKED_BUILD
  ? "Alpha Omega Strength Team — First drop May 25"
  : "Alpha Omega Signature Tee";

const OG_DESCRIPTION = PURCHASE_LOCKED_BUILD
  ? "Faith-grounded performance apparel for the disciplined. First drop opens May 25."
  : "Performance apparel for the disciplined. From Alpha to Omega.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Alpha Omega Strength Team",
    template: "%s | Alpha Omega Strength Team",
  },
  description: OG_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Alpha Omega Strength Team",
    title: "Alpha Omega Strength Team",
    description: OG_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_IMAGE_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpha Omega Strength Team",
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Alpha Omega Strength Team",
  url: SITE_URL,
  logo: `${SITE_URL}${OG_IMAGE}`,
  description: "Performance apparel for the disciplined. From Alpha to Omega.",
  sameAs: ["https://www.instagram.com/alphaomegastrengthteam/"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@aostrengthteam.store",
    areaServed: "US",
    availableLanguage: ["English"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen flex flex-col bg-black text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q4G9V6ZWCK"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q4G9V6ZWCK');
          `}
        </Script>
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1 pt-[92px]">{children}</main>
          <Footer />
          <CartDrawer />
          <EmailCapture />
        </CartProvider>
      </body>
    </html>
  );
}
