import type { Metadata } from "next";
import "./globals.css";
import { AmazonNavbar } from "@/components/layout/AmazonNavbar";
import { AmazonFooter } from "@/components/layout/AmazonFooter";
import { CartDrawer } from "@/features/cart/CartDrawer";

export const metadata: Metadata = {
  title: "Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - 1PLACE.in",
  description: "1PLACE.in: Online Shopping India - Buy mobiles, laptops, cameras, books, watches, apparel, shoes and e-Gift Cards. Free Shipping & Cash on Delivery Available.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
