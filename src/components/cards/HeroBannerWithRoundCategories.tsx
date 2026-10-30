"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_BANNER_SLIDES, ROUND_SUB_CATEGORIES } from "@/data/heroBannerData";

export const HeroBannerWithRoundCategories: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const roundScrollRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  // Auto slide banner carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_BANNER_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 1-second (1000ms) ultra-smooth easeInOut animated scroll for round items
  const smoothScrollTo = (element: HTMLDivElement, targetOffset: number, duration = 1000) => {
    const start = element.scrollLeft;
    const change = targetOffset;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeProgress =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      element.scrollLeft = start + change * easeProgress;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const scrollRound = (direction: "left" | "right") => {
    if (roundScrollRef.current) {
      const offset = direction === "left" ? -350 : 350;
      smoothScrollTo(roundScrollRef.current, offset, 1000);
    }
  };

  // Automatic slide for round subcategories every 3.5 seconds (pauses on mouse hover)
  useEffect(() => {
    const autoScrollTimer = setInterval(() => {
      if (!isHoveredRef.current && roundScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = roundScrollRef.current;
        // If reached end, smoothly loop back to start
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          smoothScrollTo(roundScrollRef.current, -scrollLeft, 1000);
        } else {
          smoothScrollTo(roundScrollRef.current, 280, 1000);
        }
      }
    }, 3500);

    return () => clearInterval(autoScrollTimer);
  }, []);

  const slide = HERO_BANNER_SLIDES[currentSlide];

  return (
    <div className="w-full space-y-3 select-none">
      {/* ================= 1. FULL SCREEN WIDTH BANNER CAROUSEL ================= */}
      {/* Edge-to-edge full width graphic slide carousel - 100% full image visible with zero cropping */}
      <div className="relative w-full overflow-hidden shadow-xs border-b border-gray-200/80 bg-white">
        <Link href={slide.href} className="block w-full cursor-pointer relative group">
          <div className="w-full relative flex items-center justify-center">
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-auto block object-contain transition-all duration-300"
            />
          </div>
        </Link>

        {/* Carousel Left Arrow Button */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_BANNER_SLIDES.length) % HERO_BANNER_SLIDES.length)}
          aria-label="Previous Slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition z-20 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* Carousel Right Arrow Button */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_BANNER_SLIDES.length)}
          aria-label="Next Slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition z-20 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* Carousel Dot Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {HERO_BANNER_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${currentSlide === idx ? "w-6 bg-gray-900" : "w-2 bg-gray-400/60"
                }`}
            />
          ))}
        </div>
      </div>

      {/* ================= 2. FULL WIDTH ROUND SUB-CATEGORIES (NO CARD CONTAINER) ================= */}
      {/* Outer container border & background box removed - runs edge-to-edge with automatic slide */}
      <div
        className="w-full relative px-2 sm:px-6 py-3 flex items-center"
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
      >
        {/* Left Scroll Arrow */}
        <button
          onClick={() => scrollRound("left")}
          aria-label="Scroll subcategories left"
          className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 flex items-center justify-center shadow-md shrink-0 transition z-10 mr-1 sm:mr-2 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
        </button>

        {/* Scrollable Round Items Track (No scrollbar, smooth edge-to-edge flow) */}
        <div
          ref={roundScrollRef}
          className="flex-1 flex items-start gap-6 sm:gap-9 md:gap-11 overflow-x-auto whitespace-nowrap no-scrollbar px-2 py-1"
        >
          {ROUND_SUB_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="flex flex-col items-center text-center group cursor-pointer shrink-0 w-[88px] sm:w-[98px]"
            >
              {/* Circular Avatar Container: Filled #73A5CA circle disk */}
              <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full bg-[#C0BFE3] p-2.5 shadow-sm border border-[#5d94bc] flex items-center justify-center group-hover:scale-105 group-hover:shadow-md transition-all duration-300 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain drop-shadow-xs"
                />
              </div>

              {/* Sub Category Name */}
              <span className="text-[11px] sm:text-xs font-semibold text-gray-800 group-hover:text-[#1559ac] mt-2 line-clamp-2 leading-tight text-center transition-colors max-w-[92px]">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Right Scroll Arrow */}
        <button
          onClick={() => scrollRound("right")}
          aria-label="Scroll subcategories right"
          className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 flex items-center justify-center shadow-md shrink-0 transition z-10 ml-1 sm:ml-2 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>
    </div>
  );
};
