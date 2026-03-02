import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Breadcrumbs from "./components/Breadcrumbs";
import FloatingCart from "./components/FloatingCart";
import { ShopProvider } from "./context/ShopContext";
import { Providers } from './providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Эквилибриум - Канцелярские товары",
  description: "Официальный интернет-магазин канцелярских товаров Эквилибриум",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-[#f6f1eb]`}>
        <Providers>
          <ShopProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <Breadcrumbs />
              <main className="flex-grow pt-2">
                {children}
              </main>
              <Footer />
              <FloatingCart />
            </div>
          </ShopProvider>
        </Providers>
      </body>
    </html>
  );
}
