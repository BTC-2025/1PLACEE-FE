"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MAXIMIZE_SAVINGS_ITEMS } from "@/data/maximizeSavingsData";

export const MaximizeSavingsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      aria-label="Maximize Your Savings"
      className="w-full my-4 select-none relative"
    >
      {/* Header: Stylized "MAXIMIZE YOUR SAVINGS" matching Screenshot 2 */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="inline-block relative">
          <div className="bg-[#4a148c] text-white text-xs sm:text-sm font-black uppercase px-3 py-1 tracking-wider shadow-sm border-b-2 border-black/30">
            MAXIMIZE YOUR SAVINGS
          </div>
        </div>

        <Link
          href="/categories"
          className="text-xs sm:text-sm font-bold text-gray-700 hover:text-blue-600 flex items-center transition"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4 ml-0.5" />
        </Link>
      </div>

      {/* Outer Slider Wrapper with Nav Arrows */}
      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          aria-label="Previous Savings Deals"
          className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-white hover:bg-gray-50 text-gray-700 rounded-full flex items-center justify-center shadow-lg z-20 border border-gray-200 transition cursor-pointer hover:scale-105"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.4]" />
        </button>

        {/* Scroll Track */}
        <div
          ref={scrollRef}
          className="w-full flex items-stretch gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1"
        >
          {MAXIMIZE_SAVINGS_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="w-[230px] sm:w-[255px] md:w-[270px] shrink-0 rounded-2xl bg-gradient-to-b from-gray-50/70 to-white hover:from-white hover:to-white p-2.5 sm:p-3 border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group/card cursor-pointer"
            >
              {/* Card Image Stage */}
              <div className="w-full aspect-[240/150] rounded-xl overflow-hidden flex items-center justify-center bg-transparent mb-2">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain group-hover/card:scale-[1.03] transition-transform duration-300"
                />
              </div>

              {/* Title & Subtitle Info */}
              <div className="text-center space-y-0.5 pt-1 border-t border-gray-100">
                <h3 className="text-sm sm:text-base font-black text-gray-900 leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  {item.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          aria-label="Next Savings Deals"
          className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-white hover:bg-gray-50 text-gray-700 rounded-full flex items-center justify-center shadow-lg z-20 border border-gray-200 transition cursor-pointer hover:scale-105"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.4]" />
        </button>
      </div>
    </section>
  );
};

