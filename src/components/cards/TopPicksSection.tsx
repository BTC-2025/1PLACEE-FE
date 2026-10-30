"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from "lucide-react";
import { TOP_PICKS_PRODUCTS } from "@/data/topPicksData";

export const TopPicksSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full space-y-2.5 select-none my-4">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
        Top Picks
      </h2>

      {/* Main Container with 2 parts: Left Brand Card + Right Carousel with Navigation */}
      <div className="w-full flex flex-col lg:flex-row gap-3 sm:gap-4 items-stretch">
        
        {/* 1. Left Feature Banner: Fissman Cookware Showcase */}
        <Link
          href="/categories"
          className="lg:w-[260px] xl:w-[290px] shrink-0 rounded-2xl overflow-hidden group shadow-xs hover:shadow-md transition-all duration-300 border border-gray-100 bg-[#f8f5f0] flex items-center justify-center cursor-pointer min-h-[260px] lg:min-h-full"
        >
          <img
            src="/banners/fissman-poster.png"
            alt="Fissman Cookware"
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        </Link>

        {/* 2. Right Products Carousel with Soft Lilac Background & Left/Right Arrows */}
        <div className="flex-1 rounded-2xl bg-[#eeecfb] p-3 sm:p-4.5 relative flex items-center min-w-0 border border-[#e2e0f8]">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            aria-label="Previous Top Picks"
            className="absolute left-1.5 top-1/2 -translate-y-1/2 w-8 h-14 sm:w-9 sm:h-16 bg-white/95 hover:bg-white text-gray-700 rounded-lg flex items-center justify-center shadow-md z-20 border border-gray-200/80 transition cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Product Items Scroll Track */}
          <div
            ref={scrollRef}
            className="w-full flex items-stretch gap-3 overflow-x-auto no-scrollbar scroll-smooth px-6 sm:px-8 py-1"
          >
            {TOP_PICKS_PRODUCTS.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                className="w-[175px] sm:w-[195px] shrink-0 bg-white rounded-xl p-3 flex flex-col justify-between group shadow-xs hover:shadow-md transition-all duration-200 relative border border-gray-100 cursor-pointer"
              >
                {/* 1. Top Right Corner Wishlist Heart Icon */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  aria-label="Add to wishlist"
                  className="absolute top-2.5 right-2.5 text-gray-400 hover:text-red-500 transition cursor-pointer z-10 p-1"
                >
                  <Heart className="w-4 h-4 stroke-[1.8]" />
                </button>

                {/* Product Image (Prism clean with no inner heart) */}
                <div className="w-full h-28 sm:h-32 flex items-center justify-center my-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-xs"
                  />
                </div>

                {/* Details */}
                <div className="space-y-1.5 mt-1 relative">
                  <h3 className="text-xs text-gray-800 font-medium leading-snug line-clamp-2 min-h-[32px]">
                    {product.name}
                  </h3>

                  {/* Main Price */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm sm:text-base font-black text-gray-950">
                      {product.price}
                    </span>
                  </div>

                  {/* Original Price & Discount */}
                  <div className="flex items-baseline gap-1.5 text-[10px] sm:text-[11px] leading-none">
                    <span className="text-gray-400 line-through">
                      {product.originalPrice}
                    </span>
                    <span className="font-bold text-[#14833c]">
                      {product.discount}
                    </span>
                  </div>

                  {/* Bottom Row: Green Saved Pill on Left + Cart Icon Button on Bottom Right */}
                  <div className="pt-1 flex items-center justify-between">
                    <span className="inline-block bg-[#e5f9db] text-[#1e6924] text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-sm">
                      {product.savedText}
                    </span>

                    {/* 2. Bottom Right Side Cart Icon Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      aria-label="Add to cart"
                      className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#1559ac] text-gray-700 hover:text-white flex items-center justify-center transition cursor-pointer shadow-xs shrink-0"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 stroke-[2.2]" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            aria-label="Next Top Picks"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-14 sm:w-9 sm:h-16 bg-white/95 hover:bg-white text-gray-700 rounded-lg flex items-center justify-center shadow-md z-20 border border-gray-200/80 transition cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>
      </div>
    </div>
  );
};
