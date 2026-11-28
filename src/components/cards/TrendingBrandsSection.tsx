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
              className="shrink-0 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center bg-[#fde047]"
            >
              <img
                src={brand.image}
                alt={brand.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover scale-110"
              />
            </Link>
          ))}

          {/* Apple Brand Circle with Apple Icon */}
          <Link
            href="/categories"
            style={{ background: "radial-gradient(circle, #fef9c3 0%, #fde047 55%, #f59e0b 100%)" }}
            className="shrink-0 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center"
            aria-label="Apple"
          >
            <svg viewBox="0 0 24 24" className="w-12 h-12 sm:w-16 sm:h-16 fill-black">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.64-.78 1.08-1.86.96-2.94-.93.04-2.06.62-2.72 1.4-.58.68-1.1 1.78-.96 2.84 1.04.08 2.08-.52 2.72-1.3z" />
            </svg>
          </Link>

          {/* Lenovo Brand Circle with Red Lenovo Badge */}
          <Link
            href="/categories"
            style={{ background: "radial-gradient(circle, #fef9c3 0%, #fde047 55%, #f59e0b 100%)" }}
            className="shrink-0 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center"
            aria-label="Lenovo"
          >
            <span
              style={{ backgroundColor: "#e2231a", color: "#ffffff" }}
              className="px-3.5 py-1.5 font-black text-sm sm:text-lg tracking-tight rounded-xs shadow-2xs"
            >
              Lenovo
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

