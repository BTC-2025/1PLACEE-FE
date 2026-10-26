"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, ChevronRight as RightIcon } from "lucide-react";

export interface FestivalItem {
  id: string;
  image: string;
  discount: string;
  tag?: string;
  title?: string;
}

export interface OrangeQuadCardProps {
  categoryTitle: string;
  items: FestivalItem[];
  href?: string;
}

export const OrangeFestivalCard: React.FC<OrangeQuadCardProps> = ({
  categoryTitle,
  items,
  href = "#",
}) => {
  return (
    <div className="bg-[#ff9900] p-3 rounded-2xl flex flex-col justify-between w-full border border-[#f08804] shadow-xs select-none min-h-[410px]">
      {/* Orange Card Header with Right Arrow */}
      <Link href={href} className="flex items-center justify-between group mb-2.5 px-0.5">
        <h3 className="font-extrabold text-[16px] text-[#0F1111] leading-tight group-hover:underline line-clamp-1">
          {categoryTitle}
        </h3>
        <ChevronRight className="w-5 h-5 text-[#0F1111] stroke-[2.5] group-hover:translate-x-0.5 transition-transform shrink-0 ml-1" />
      </Link>

      {/* 2x2 White Tiles Grid with tight Amazon spacing */}
      <div className="grid grid-cols-2 gap-2.5 flex-1">
        {items.slice(0, 4).map((item) => {
          // Dynamic destination based on item title, category title or id
          const targetSlug = (() => {
            const text = `${categoryTitle} ${item.tag || ""} ${item.title || ""}`.toLowerCase();
            if (text.includes("audio") || text.includes("headphone") || text.includes("earbud") || text.includes("boat") || text.includes("sony")) {
              return "sony-wh1000xm5-headphones";
            }
            if (text.includes("smartphone") || text.includes("phone") || text.includes("samsung") || text.includes("galaxy") || text.includes("mobile")) {
              return "oneplus-ce6-lite";
            }
            if (text.includes("laptop") || text.includes("electronics") || text.includes("dell") || text.includes("gaming")) {
              return "hp-victus-gaming-laptop";
            }
            if (text.includes("trimmer") || text.includes("shaver") || text.includes("grooming")) {
              return "philips-grooming-trimmer";
            }
            if (text.includes("beauty") || text.includes("shampoo") || text.includes("oil") || text.includes("hair") || text.includes("sesa")) {
              return "sesa-ayurvedic-hair-oil";
            }
            if (text.includes("chair") || text.includes("work from home") || text.includes("furniture")) {
              return "green-soul-ergonomic-chair";
            }
            if (text.includes("dry fruits") || text.includes("nuts") || text.includes("almond")) {
              return "happilo-premium-almonds";
            }
            if (text.includes("shoe") || text.includes("watch") || text.includes("smartwatch")) {
              return "noise-smartwatch-ultra";
            }
            // Default clothing & accessories
            return "kotty-mens-jeans";
          })();

          return (
            <Link
              key={item.id}
              href={`/products/${targetSlug}`}
              className="bg-white rounded-xl p-2.5 flex flex-col justify-between hover:shadow-md transition cursor-pointer"
            >
              {/* Item Image with high quality fit */}
              <div className="w-full h-28 flex items-center justify-center overflow-hidden p-1">
                <img
                  src={item.image}
                  alt={item.title || "Deal product"}
                  className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>

              {/* Red Discount Badge & Subtitle */}
              <div className="mt-1">
                <span className="bg-[#cc0c39] text-white font-extrabold text-[11px] px-1.5 py-0.5 rounded-xs inline-block">
                  {item.discount}
                </span>
                <p className="text-[11px] text-[#565959] font-medium truncate mt-0.5 leading-tight">
                  {item.tag || "Great Indian Festival"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export const DealsForYouCarousel: React.FC<{ cards: OrangeQuadCardProps[] }> = ({ cards }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const offset = dir === "left" ? -650 : 650;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white p-3.5 border border-[#e7e7e7] shadow-xs relative group/deals rounded-sm">
      {/* Section Header */}
      <div className="mb-2.5 px-1">
        <h2 className="text-xl font-bold text-[#0F1111]">Deals for you</h2>
      </div>

      {/* Left Arrow Button */}
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-11 h-24 bg-white/95 hover:bg-white border border-[#cdcdcd] shadow-lg flex items-center justify-center rounded-r cursor-pointer text-[#111]"
      >
        <ChevronLeft className="w-7 h-7 stroke-[2.5]" />
      </button>

      {/* Cards Scroll Row - Compact tight gap-3 */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-none scroll-smooth pb-1"
      >
        {cards.map((card, idx) => (
          <div key={idx} className="w-[285px] sm:w-[310px] shrink-0">
            <OrangeFestivalCard {...card} />
          </div>
        ))}
      </div>

      {/* Right Arrow Button */}
      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-11 h-24 bg-white/95 hover:bg-white border border-[#cdcdcd] shadow-lg flex items-center justify-center rounded-l cursor-pointer text-[#111]"
      >
        <RightIcon className="w-7 h-7 stroke-[2.5]" />
      </button>
    </div>
  );
};
