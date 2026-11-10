"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { TRENDING_BRANDS } from "@/data/trendingBrandsData";

export const TrendingBrandsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section
      aria-label="Trending Brands"
      className="w-full bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300 my-4 select-none relative"
    >
      {/* Title matching Reference Screenshot */}
      <h2 className="text-xl sm:text-2xl font-black text-[#374151] tracking-tight mb-4 sm:mb-5">
        Trending Brands
      </h2>

      {/* Brand Circles Carousel / Grid Row */}
      <div className="relative w-full flex items-center">
        <div
          ref={scrollRef}
          className="flex items-center gap-3 sm:gap-4 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth w-full py-1"
        >
          {TRENDING_BRANDS.map((brand) => (
            <Link
              key={brand.id}
              href={brand.href}
              className="shrink-0 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center bg-[#fef08a]"
            >
              <img
                src={brand.image}
                alt={brand.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
              />
            </Link>
          ))}

          {/* Additional Brands for scroll experience */}
          <Link
            href="/categories"
            className="shrink-0 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center bg-gradient-to-tr from-amber-300 to-yellow-400 p-4 text-center"
          >
            <span className="text-gray-900 font-black text-sm sm:text-base tracking-tight leading-tight">
              Lava <br />
              <span className="text-[11px] font-bold text-gray-700 uppercase">
                Build To Last
              </span>
            </span>
          </Link>

          <Link
            href="/categories"
            className="shrink-0 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center bg-gradient-to-tr from-amber-300 to-yellow-400 p-4 text-center"
          >
            <span className="text-gray-900 font-black text-sm sm:text-base tracking-tight">
              Apple
            </span>
          </Link>
        </div>

        {/* Floating Right Next Arrow Button matching screenshot */}
        <button
          type="button"
          onClick={scrollRight}
          aria-label="Scroll next brands"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-gray-700 shadow-lg border border-gray-200 flex items-center justify-center transition hover:scale-105 active:scale-95 cursor-pointer z-10"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </section>
  );
};

