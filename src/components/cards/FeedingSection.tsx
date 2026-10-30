"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, Star, ShoppingCart } from "lucide-react";
import { FEEDING_PRODUCTS } from "@/data/feedingData";

export const FeedingSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full space-y-2.5 select-none my-4">
      {/* Header with Title on Left and 'View All >' on Right */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Feeding
        </h2>
        <Link
          href="/categories"
          className="text-sm font-bold text-gray-800 hover:text-[#1559ac] flex items-center gap-0.5 transition"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Main Container with 2 parts: Left Feature Poster + Right Slide Carousel with Navigation */}
      <div className="w-full flex flex-col lg:flex-row gap-3 sm:gap-4 items-stretch">
        
        {/* 1. Left Feature Banner: Baby Feeding Essentials Showcase */}
        <Link
          href="/categories"
          className="lg:w-[230px] xl:w-[250px] shrink-0 rounded-2xl overflow-hidden group shadow-xs hover:shadow-md transition-all duration-300 border border-emerald-100 bg-[#edf7ed] flex items-center justify-center cursor-pointer min-h-[220px] lg:min-h-full"
        >
          <img
            src="/banners/feeding-poster.png"
            alt="Baby Feeding Showcase"
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        </Link>

        {/* 2. Right Products Carousel with Soft Lilac Background & Left/Right Arrows */}
        <div className="flex-1 rounded-2xl bg-[#eeecfb] p-2.5 sm:p-3 relative flex items-center min-w-0 border border-[#e2e0f8]">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            aria-label="Previous Feeding"
            className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-12 sm:w-8 sm:h-14 bg-white/95 hover:bg-white text-gray-700 rounded-lg flex items-center justify-center shadow-md z-20 border border-gray-200/80 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </button>

          {/* Product Items Scroll Track */}
          <div
            ref={scrollRef}
            className="w-full flex items-stretch gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth px-5 sm:px-7 py-0.5"
          >
            {FEEDING_PRODUCTS.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                className="w-[165px] sm:w-[178px] shrink-0 bg-white rounded-xl p-2.5 flex flex-col justify-between group shadow-xs hover:shadow-md transition-all duration-200 relative border border-gray-100 cursor-pointer overflow-hidden"
              >
                {/* Ribbon Tag (e.g. Best Seller, Exclusive Price) */}
                {product.badge && (
                  <div className="absolute top-0 left-0 z-10">
                    <span className={`text-[8.5px] font-bold text-white px-2 py-0.5 rounded-br-md uppercase tracking-wider shadow-2xs ${
                      product.badge === "Exclusive Price" ? "bg-red-700" : "bg-red-600"
                    }`}>
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Top Right Heart Wishlist Icon */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  aria-label="Add to wishlist"
                  className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-400 hover:text-red-500 transition shadow-2xs"
                >
                  <Heart className="w-3.5 h-3.5" />
                </button>

                {/* Product Image Area - Compact Height */}
                <div className="w-full h-[95px] sm:h-[105px] flex items-center justify-center p-1 mb-1.5 bg-transparent">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Rating Badge (if available) */}
                {product.rating ? (
                  <div className="flex items-center gap-1 text-[10.5px] font-semibold text-gray-700 mb-0.5">
                    <span className="flex items-center text-amber-500">
                      <Star className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400 mr-0.5" />
                      {product.rating}
                    </span>
                    {product.reviews && (
                      <span className="text-gray-400 font-normal">({product.reviews})</span>
                    )}
                  </div>
                ) : (
                  <div className="h-[15px]" />
                )}

                {/* Product Title */}
                <h3 className="text-[11.5px] font-semibold text-gray-800 line-clamp-2 min-h-[28px] group-hover:text-[#1559ac] transition-colors leading-snug">
                  {product.name}
                </h3>

                {/* Price and Discount Info */}
                <div className="mt-1.5 space-y-0.5">
                  <div className="flex items-baseline gap-1 flex-wrap">
                    <span className="text-sm sm:text-base font-black text-gray-900 tracking-tight">
                      {product.price}
                    </span>
                    <span className="text-[10px] text-gray-400 line-through">
                      {product.originalPrice}
                    </span>
                    <span className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded">
                      {product.discount}
                    </span>
                  </div>

                  {/* Savings Pill */}
                  <div className="pt-0.5">
                    {product.savedAmount && (
                      <div className="inline-block bg-[#eefae6] text-[#2e7d32] text-[9.5px] font-bold px-1.5 py-0.2 rounded">
                        {product.savedAmount}
                      </div>
                    )}
                  </div>
                </div>

                {/* Circular Add to Cart Button on bottom right (subtle gray circle) */}
                <div className="flex justify-end mt-1.5 pt-1 border-t border-gray-50">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    aria-label="Add to cart"
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-100 hover:bg-[#1559ac] text-gray-700 hover:text-white flex items-center justify-center transition cursor-pointer shadow-2xs hover:scale-105"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 stroke-[2.2]" />
                  </button>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            aria-label="Next Feeding"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-12 sm:w-8 sm:h-14 bg-white/95 hover:bg-white text-gray-700 rounded-lg flex items-center justify-center shadow-md z-20 border border-gray-200/80 transition cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </button>
        </div>
      </div>
    </div>
  );
};
