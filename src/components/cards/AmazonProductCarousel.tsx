"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselProduct {
  id: string;
  title: string;
  image: string;
  dealBadge?: string;
  price?: number;
  originalPrice?: number;
  discount?: string;
  href?: string;
}

interface AmazonProductCarouselProps {
  title: string;
  seeAllLink?: string;
  products: CarouselProduct[];
}

export const AmazonProductCarousel: React.FC<AmazonProductCarouselProps> = ({
  title,
  seeAllLink = "#",
  products,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -600 : 600;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white p-4 my-4 border border-[#e7e7e7] shadow-xs relative group/carousel">
      {/* Title & Link */}
      <div className="flex items-baseline gap-4 mb-3">
        <h2 className="text-xl font-bold text-[#0F1111]">{title}</h2>
        <Link
          href={seeAllLink}
          className="text-[13px] text-[#007185] hover:text-[#c7511f] hover:underline font-medium"
        >
          See all deals
        </Link>
      </div>

      {/* Left Scroll Arrow */}
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-20 bg-white/90 hover:bg-white border border-[#cdcdcd] shadow-md flex items-center justify-center rounded-r text-[#111] opacity-0 group-hover/carousel:opacity-100 transition-opacity cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-2"
      >
        {products.map((item) => (
          <div
            key={item.id}
            className="w-[190px] sm:w-[220px] shrink-0 flex flex-col group cursor-pointer"
          >
            {/* Image frame */}
            <div className="w-full h-44 sm:h-48 bg-[#f7f7f7] flex items-center justify-center p-2 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                loading="lazy"
              />
            </div>

            {/* Deal Badge & Discount */}
            <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
              {item.dealBadge && (
                <span className="bg-[#cc0c39] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-xs">
                  {item.dealBadge}
                </span>
              )}
              {item.discount && (
                <span className="text-[#cc0c39] text-xs font-bold">{item.discount}</span>
              )}
            </div>

            {/* Price */}
            {item.price && (
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xs align-super">₹</span>
                <span className="text-base font-bold text-[#0F1111]">
                  {item.price.toLocaleString("en-IN")}
                </span>
                {item.originalPrice && (
                  <span className="text-xs text-[#565959] line-through ml-1">
                    ₹{item.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
            )}

            {/* Title */}
            <p className="text-[13px] text-[#0F1111] line-clamp-1 mt-1 group-hover:text-[#007185]">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Right Scroll Arrow */}
      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-20 bg-white/90 hover:bg-white border border-[#cdcdcd] shadow-md flex items-center justify-center rounded-l text-[#111] opacity-0 group-hover/carousel:opacity-100 transition-opacity cursor-pointer"
      >
        <ChevronRight className="w-6 h-6 stroke-[2.5]" />
      </button>
    </div>
  );
};
