import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Alpha Omega Strength Team",
  description: "Performance apparel for the disciplined. From Alpha to Omega.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen flex flex-col bg-black text-white antialiased">
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
