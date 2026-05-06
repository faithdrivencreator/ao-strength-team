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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Alpha Omega Strength Team",
    template: "%s | Alpha Omega Strength Team",
  },
  description: "Performance apparel for the disciplined. From Alpha to Omega.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Alpha Omega Strength Team",
    title: "Alpha Omega Strength Team",
    description: "Performance apparel for the disciplined. From Alpha to Omega.",
    images: [{ url: "/images/products/signature-tee-1.png", width: 1200, height: 630, alt: "Alpha Omega Signature Tee" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpha Omega Strength Team",
    description: "Performance apparel for the disciplined. From Alpha to Omega.",
    images: ["/images/products/signature-tee-1.png"],
  },
  robots: { index: true, follow: true },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Alpha Omega Strength Team",
  url: SITE_URL,
  logo: `${SITE_URL}/images/products/signature-tee-1.png`,
  description: "Performance apparel for the disciplined. From Alpha to Omega.",
  sameAs: ["https://www.instagram.com/alphaomegastrengthteam/"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@alphaomegateam.com",
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
