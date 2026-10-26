"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { HISTORY_RECOMMENDED_PRODUCTS } from "@/data/dealsForYouData";

export const CustomerHistoryCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const offset = dir === "left" ? -600 : 600;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white p-4 border border-[#e7e7e7] shadow-xs relative group/history my-4">
      {/* Title */}
      <div className="flex items-baseline justify-between mb-3 border-b border-gray-100 pb-2">
        <h2 className="text-lg font-bold text-[#0F1111]">
          Customers who viewed items in your browsing history also viewed
        </h2>
        <span className="text-xs text-gray-500">Page 1 of 4</span>
      </div>

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-18 bg-white/95 hover:bg-white border border-[#cdcdcd] shadow-md flex items-center justify-center rounded-r cursor-pointer text-gray-800"
      >
        <ChevronLeft className="w-6 h-6 stroke-[2]" />
      </button>

      {/* Items Scroll Track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-2"
      >
        {HISTORY_RECOMMENDED_PRODUCTS.map((prod) => (
          <Link
            key={prod.id}
            href={
              prod.title.toLowerCase().includes("trimmer")
                ? "/products/philips-grooming-trimmer"
                : prod.title.toLowerCase().includes("sesa") || prod.title.toLowerCase().includes("shampoo") || prod.title.toLowerCase().includes("oil")
                ? "/products/sesa-ayurvedic-hair-oil"
                : prod.title.toLowerCase().includes("galaxy") || prod.title.toLowerCase().includes("phone")
                ? "/products/oneplus-ce6-lite"
                : prod.title.toLowerCase().includes("audio") || prod.title.toLowerCase().includes("earbuds")
                ? "/products/sony-wh1000xm5-headphones"
                : "/products/kotty-mens-jeans"
            }
            className="w-[180px] sm:w-[210px] shrink-0 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              {/* Product Image Frame */}
              <div className="w-full h-44 bg-[#fbfbfb] flex items-center justify-center p-2 rounded overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>

              {/* Title */}
              <h3 className="text-xs font-semibold text-[#007185] line-clamp-2 mt-2 leading-tight group-hover:underline">
                {prod.title}
              </h3>

              {/* Rating stars */}
              <div className="flex items-center gap-1 mt-1 text-xs">
                <div className="flex items-center text-amber-500">
                  <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                  <span className="font-bold text-gray-800 ml-0.5">{prod.rating}</span>
                </div>
                <span className="text-gray-400 text-[11px]">({prod.reviews.toLocaleString()})</span>
              </div>
            </div>

            {/* Price & Prime badge */}
            <div className="mt-2">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-[#b12704]">
                  ₹{prod.price.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ₹{prod.originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-[11px] font-bold text-[#b12704]">
                  ({prod.discount})
                </span>
              </div>
              <p className="text-[11px] text-gray-600 mt-0.5">
                Get it by <span className="font-bold text-gray-800">Tomorrow, 2 PM</span>
              </p>
              <span className="text-[11px] font-black text-[#007185] block mt-0.5">
                ✓ 1PLACE Prime
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-18 bg-white/95 hover:bg-white border border-[#cdcdcd] shadow-md flex items-center justify-center rounded-l cursor-pointer text-gray-800"
      >
        <ChevronRight className="w-6 h-6 stroke-[2]" />
      </button>

      {/* Your Browsing History Miniature bottom strip */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-[#0F1111]">
            Your browsing history <span className="text-xs font-normal text-[#007185] hover:underline cursor-pointer ml-2">View or edit your browsing history</span>
          </h3>
        </div>
        <div className="flex gap-4 items-center overflow-x-auto py-2">
          {HISTORY_RECOMMENDED_PRODUCTS.map((prod) => (
            <div key={`thumb-${prod.id}`} className="w-16 h-16 bg-gray-50 border border-gray-200 rounded p-1 shrink-0 flex items-center justify-center cursor-pointer hover:border-gray-400">
              <img src={prod.image} alt="Thumbnail" className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
