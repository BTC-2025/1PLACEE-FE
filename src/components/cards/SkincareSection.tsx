"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, Star, ShoppingCart } from "lucide-react";
import { SKINCARE_PRODUCTS } from "@/data/skincareData";

export const SkincareSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      aria-label="Skin Care Collection"
      className="w-full rounded-3xl bg-gradient-to-r from-[#eef2ff] via-[#f5f3ff] to-[#ede9fe] border border-[#e0e7ff] p-4 sm:p-6 my-5 shadow-xs relative select-none"
    >
      {/* Top Left Discount Pill matching Image 1: "Up to 28% off" */}
      <div className="flex items-center justify-between mb-2">
        <div className="inline-flex items-center px-4 py-1.5 rounded-xl bg-[#2563eb] text-white text-xs sm:text-sm font-black shadow-sm">
          Up to 28% off
        </div>
      </div>

      {/* Center Heading matching Image 1: Title + 3 bullet features with green icons */}
      <div className="text-center space-y-1.5 -mt-6 sm:-mt-8 mb-5">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Skin Care
        </h2>
        <div className="flex items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-bold text-gray-600 flex-wrap">
          <span className="text-gray-300">---</span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-black">
              ✓
            </span>
            Top Brands
          </span>
          <span className="text-gray-300">---</span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-black">
              ✓
            </span>
            Best Deals
          </span>
          <span className="text-gray-300">---</span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-black">
              ✓
            </span>
            Max Savings
          </span>
          <span className="text-gray-300">---</span>
        </div>
      </div>

      {/* Product Row Scroll Track with Arrows */}
      <div className="relative group">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll("left")}
          aria-label="Previous Skincare Products"
          className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-white hover:bg-gray-50 text-gray-700 rounded-full flex items-center justify-center shadow-md z-20 border border-gray-200 transition cursor-pointer hover:scale-105"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.3]" />
        </button>

        {/* Product Items Horizontal Grid / Scroll */}
        <div
          ref={scrollRef}
          className="w-full flex items-stretch gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1"
        >
          {SKINCARE_PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href="/categories"
              className="w-[170px] sm:w-[185px] shrink-0 bg-white rounded-2xl p-3 flex flex-col justify-between group/card shadow-xs hover:shadow-md transition-all duration-300 relative border border-gray-100 cursor-pointer"
            >
              {/* Product Image Area */}
              <div className="w-full h-[110px] sm:h-[120px] flex items-center justify-center p-1.5 mb-2 bg-transparent">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="max-w-full max-h-full object-contain group-hover/card:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Title */}
              <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug mb-2 min-h-[32px]">
                {product.name}
              </h3>

              {/* Price & Savings Row */}
              <div className="space-y-1 pt-1 border-t border-gray-50">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[9px] font-black shrink-0">
                    ₹
                  </span>
                  <span className="text-sm sm:text-base font-black text-gray-900 tracking-tight">
                    {product.price}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <span>↓ {product.discount}</span>
                  {product.savedAmount && (
                    <span className="text-gray-400 font-normal text-[10px]">
                      ({product.savedAmount.replace("You saved ", "")})
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll("right")}
          aria-label="Next Skincare Products"
          className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-white hover:bg-gray-50 text-gray-700 rounded-full flex items-center justify-center shadow-md z-20 border border-gray-200 transition cursor-pointer hover:scale-105"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.3]" />
        </button>
      </div>

      {/* Bottom Center "View All" Button matching Image 1 */}
      <div className="flex justify-center mt-5">
        <Link
          href="/categories"
          className="px-8 py-2 rounded-xl bg-white hover:bg-gray-50 text-blue-600 font-bold text-xs sm:text-sm border border-blue-200 hover:border-blue-300 shadow-2xs hover:shadow-xs transition"
        >
          View All
        </Link>
      </div>
    </section>
  );
};
