"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORY_CAROUSEL_SLIDES } from "@/data/categoryCarouselData";

export const CategoryPromoBannerCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isHoveredRef = useRef(false);

  // Auto-slide every 5 seconds (pauses when hovering)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHoveredRef.current) {
        setCurrentIndex((prev) => (prev + 1) % CATEGORY_CAROUSEL_SLIDES.length);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? CATEGORY_CAROUSEL_SLIDES.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CATEGORY_CAROUSEL_SLIDES.length);
  };

  return (
    <div
      className="w-full relative my-3 sm:my-4 select-none group"
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      {/* Category Slider Container */}
      <div className="w-full relative rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300 bg-white border border-gray-100 aspect-[1024/242] sm:aspect-[1024/238]">
        {/* Slides Track */}
        <div
          className="w-full h-full flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {CATEGORY_CAROUSEL_SLIDES.map((slide, idx) => (
            <Link
              key={slide.id}
              href={slide.viewAllHref}
              className="w-full h-full shrink-0 relative block cursor-pointer"
            >
              <img
                src={slide.image}
                alt={slide.categoryTitle}
                className="w-full h-full object-cover sm:object-fill"
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </Link>
          ))}
        </div>

        {/* Navigation Arrow: Previous */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous Category Slide"
          className="absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 cursor-pointer hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700 stroke-[2.5]" />
        </button>

        {/* Navigation Arrow: Next */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next Category Slide"
          className="absolute right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 cursor-pointer hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-5 h-5 text-gray-700 stroke-[2.5]" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/20 backdrop-blur-xs px-2.5 py-1 rounded-full">
          {CATEGORY_CAROUSEL_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx
                  ? "w-5 h-1.5 bg-[#1559ac]"
                  : "w-1.5 h-1.5 bg-white/80 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
