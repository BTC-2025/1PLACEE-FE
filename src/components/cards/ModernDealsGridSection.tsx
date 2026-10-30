"use client";

import React from "react";
import Link from "next/link";
import { DEALS_YOU_MIGHT_LIKE, LOWEST_IN_THE_MARKET } from "@/data/dealsYouMightLikeData";

export const ModernDealsGridSection: React.FC = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 select-none">
      {/* ================= 1. CARD 1: DEALS YOU MIGHT LIKE (4 cols) ================= */}
      <div className="lg:col-span-4 bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-100 flex flex-col justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-3 sm:mb-4">
          Deals You Might Like
        </h2>

        {/* 2x2 Brand Deals Grid matching user reference image */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 flex-1">
          {DEALS_YOU_MIGHT_LIKE.map((deal) => (
            <Link
              key={deal.id}
              href={deal.href}
              className="rounded-xl overflow-hidden group cursor-pointer hover:shadow-md transition-all duration-200 border border-gray-100/80 relative flex items-center justify-center bg-white"
            >
              <img
                src={deal.productImage}
                alt={deal.brandName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* ================= 2. CARD 2: LOWEST IN THE MARKET (4 cols) ================= */}
      <div className="lg:col-span-4 bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-100 flex flex-col justify-between">
        <h2 className="text-lg sm:text-xl font-serif italic font-bold text-gray-900 tracking-tight mb-3 sm:mb-4">
          Lowest In The Market
        </h2>

        {/* 2x2 Tech Deals Grid with crisp Indian Rupee (₹) price overlays */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 flex-1">
          {LOWEST_IN_THE_MARKET.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="rounded-xl overflow-hidden group cursor-pointer hover:shadow-md transition-all duration-200 border border-gray-100/80 relative flex items-center justify-center bg-white"
            >
              {/* Product Card Image */}
              <img
                src={item.image}
                alt={item.model}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Solid clean Indian Rupee (₹) Price Badge - fully covers and removes the old price underneath */}
              <div 
                className={`absolute right-1 sm:right-2 bottom-1 sm:bottom-1.5 min-w-[70px] sm:min-w-[85px] px-1.5 sm:px-2 py-1 rounded-md flex flex-col items-start leading-tight z-20 shadow-xs border border-black/5 ${
                  item.bgColor
                }`}
              >
                {item.originalPrice && (
                  <span className="text-[10px] sm:text-[11px] text-gray-500 font-semibold line-through decoration-gray-500">
                    {item.originalPrice}
                  </span>
                )}
                <span className="text-xs sm:text-base font-black text-gray-950 tracking-tight leading-none">
                  {item.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ================= 3. RIGHT COLUMN: 2 FEATURED BANNERS (4 cols) ================= */}
      <div className="lg:col-span-4 flex flex-col gap-2.5 sm:gap-3 justify-between">
        {/* Banner 1: Teknum Baby Favorites UP TO 50% OFF */}
        <Link
          href="/categories"
          className="relative rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 group border border-gray-100 flex-1 flex items-center justify-center bg-[#fdfcf9] cursor-pointer"
        >
          <img
            src="/banners/banner-teknum.jpg"
            alt="Teknum Your Favorites, Now UP TO 50% off"
            className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
          />
        </Link>

        {/* Banner 2: COOKWARE UP TO 30% OFF */}
        <Link
          href="/categories"
          className="relative rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 group border border-gray-100 flex-1 flex items-center justify-center bg-[#fdfcf9] cursor-pointer"
        >
          <img
            src="/banners/banner-cookware.jpg"
            alt="COOKWARE Up To 30%/OFF"
            className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
          />
        </Link>
      </div>
    </div>
  );
};
