"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FashionSubHeader } from "@/components/product/FashionSubHeader";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { BuyBox } from "@/components/product/BuyBox";
import { KottyBrandAplus } from "@/components/product/KottyBrandAplus";
import { RelatedProductsCarousel } from "@/components/product/RelatedProductsCarousel";
import { CustomerReviewsSection } from "@/components/product/CustomerReviewsSection";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
];

export default function KottyJeansProductPage() {
  const [selectedColor, setSelectedColor] = useState("Light Blue");

  return (
    <div className="w-full bg-white pb-14">
      {/* 1. Amazon Fashion Sub-header Bar (Women, Men active, Kids, Bags, Sportswear, Sales) */}
      <FashionSubHeader />

      <div className="max-w-[1500px] mx-auto px-3 sm:px-6 pt-3 space-y-6">
        
        {/* Breadcrumb Navigation matching screenshot 1: Clothing & Accessories > Men > Jeans */}
        <nav className="flex items-center gap-1.5 text-xs text-[#565959]">
          <Link href="/" className="hover:text-[#007185] hover:underline">
            Clothing & Accessories
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link href="/products/kotty-mens-jeans" className="font-bold text-[#1559ac] hover:underline">
            Men
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-[#0F1111] font-semibold">Jeans, Chinos & Trousers</span>
        </nav>

        {/* ============================================================== */}
        {/* SCREENSHOT 1: TOP HERO SECTION (Gallery + Info + Sticky BuyBox) */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Vertical Thumbnails + Main Image + Rufus AI Prompts (5 cols) */}
          <div className="lg:col-span-5">
            <ProductGallery
              images={GALLERY_IMAGES}
              title="KOTTY Mens Regular Fit Jeans"
            />
          </div>

          {/* Center Column: Product Details, Ratings, Great Indian Festival deal, Swatches (4 cols) */}
          <div className="lg:col-span-4">
            <ProductInfo
              onColorChange={setSelectedColor}
              selectedColor={selectedColor}
            />
          </div>

          {/* Right Column: Price Box, Free Delivery, In Stock, Add to Cart, Buy Now (3 cols) */}
          <div className="lg:col-span-3 lg:sticky lg:top-4">
            <BuyBox />
          </div>
        </div>

        {/* ============================================================== */}
        {/* SCREENSHOT 2: A+ CONTENT, BRAND STORY & LIFESTYLE SHOWCASE */}
        {/* ============================================================== */}
        <div className="pt-6 border-t border-gray-200">
          <KottyBrandAplus />
        </div>

        {/* Sponsored / Similar Products Carousel */}
        <div>
          <RelatedProductsCarousel title="Products related to this item | Sponsored" />
        </div>

        {/* Customers Also Viewed Carousel */}
        <div>
          <RelatedProductsCarousel title="Customers who viewed this item also viewed" />
        </div>

        {/* Customer Reviews & Ratings breakdown */}
        <div>
          <CustomerReviewsSection />
        </div>

      </div>
    </div>
  );
}
