import type { Metadata } from "next";
import "./globals.css";
import { AmazonNavbar } from "@/components/layout/AmazonNavbar";
import { AmazonFooter } from "@/components/layout/AmazonFooter";
import { CartDrawer } from "@/features/cart/CartDrawer";

export const metadata: Metadata = {
  title: "1Placee Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More...",
  description: "1PLACE.in: Online Shopping India - Buy mobiles, laptops, cameras, books, watches, apparel, shoes and e-Gift Cards. Free Shipping & Cash on Delivery Available.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png?v=4", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png?v=4", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png?v=4", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=4",
    apple: "/favicon.png?v=4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico?v=4" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=4" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=4" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png?v=4" />
        <link rel="shortcut icon" href="/favicon.ico?v=4" />
        <link rel="apple-touch-icon" href="/favicon.png?v=4" />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-[#fafafa] text-[#0F1111]">

        <AmazonNavbar />
        <main className="flex-1 w-full mx-auto">
          {children}
        </main>
        <AmazonFooter />
        <CartDrawer />
      </body>
    </html>
  );
}
