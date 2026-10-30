"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PROMOTIONAL_CAROUSEL_BANNERS } from "@/data/promotionalBannersData";

export const PromotionalBannerCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isHoveredRef = useRef(false);

  // Auto slide every 4.5 seconds (pauses on mouse hover)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHoveredRef.current) {
        setCurrentIndex((prev) => (prev + 1) % PROMOTIONAL_CAROUSEL_BANNERS.length);
      }
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? PROMOTIONAL_CAROUSEL_BANNERS.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PROMOTIONAL_CAROUSEL_BANNERS.length);
  };

  return (
    <div 
      className="w-full relative my-3 sm:my-4 select-none group"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      {/* Main Banner Container with rounded corners & shadow */}
      <div className="w-full relative rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300 bg-white border border-gray-100 aspect-[1024/190] sm:aspect-[1024/185]">
        
        {/* Slides Track */}
        <div 
          className="w-full h-full flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {PROMOTIONAL_CAROUSEL_BANNERS.map((banner, idx) => (
            <Link
              key={banner.id}
              href={banner.href}
              className="w-full h-full shrink-0 relative block cursor-pointer"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover sm:object-fill"
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </Link>
          ))}
        </div>

        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Banner"
          className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-12 sm:w-10 sm:h-16 bg-white/90 hover:bg-white text-gray-800 rounded-lg flex items-center justify-center shadow-md z-20 border border-gray-200/80 transition-all opacity-0 group-hover:opacity-100 hover:scale-105 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.3]" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next Banner"
          className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-12 sm:w-10 sm:h-16 bg-white/90 hover:bg-white text-gray-800 rounded-lg flex items-center justify-center shadow-md z-20 border border-gray-200/80 transition-all opacity-0 group-hover:opacity-100 hover:scale-105 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.3]" />
        </button>

        {/* Modern Pill / Dot Indicators at the bottom center (styled like Noon reference) */}
        <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-20 bg-black/25 backdrop-blur-xs px-2.5 py-1 rounded-full">
          {PROMOTIONAL_CAROUSEL_BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx 
                  ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-white shadow-xs" 
                  : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/60 hover:bg-white/90"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
