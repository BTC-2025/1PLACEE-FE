"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface SimilarItem {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
  rating: number;
  reviewsCount: number;
}

const SIMILAR_PRODUCTS: SimilarItem[] = [
  {
    id: "sp-1",
    title: "Ben Martin Men's Relaxed Fit Light Blue Jeans",
    price: 499,
    originalPrice: 2499,
    discount: "80% off",
    image: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=300&q=80",
    rating: 3.8,
    reviewsCount: 1420,
  },
  {
    id: "sp-2",
    title: "Symbol Premium Men's Casual Chinos Trousers",
    price: 649,
    originalPrice: 1999,
    discount: "68% off",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=300&q=80",
    rating: 4.1,
    reviewsCount: 890,
  },
  {
    id: "sp-3",
    title: "Levi's Men's 511 Slim Fit Stretchable Jeans",
    price: 1299,
    originalPrice: 2999,
    discount: "57% off",
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=300&q=80",
    rating: 4.3,
    reviewsCount: 3200,
  },
  {
    id: "sp-4",
    title: "Flying Machine Men's Solid Cotton Trousers",
    price: 599,
    originalPrice: 1799,
    discount: "67% off",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80",
    rating: 3.9,
    reviewsCount: 654,
  },
  {
    id: "sp-5",
    title: "U.S. Polo Assn. Men's Straight Fit Denim Jeans",
    price: 899,
    originalPrice: 2599,
    discount: "65% off",
    image: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=300&q=80",
    rating: 4.2,
    reviewsCount: 2150,
  },
  {
    id: "sp-6",
    title: "Wrangler Men's Regular Fit Casual Trousers",
    price: 749,
    originalPrice: 2199,
    discount: "66% off",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=300&q=80",
    rating: 4.0,
    reviewsCount: 980,
  },
];

export const RelatedProductsCarousel: React.FC<{ title: string }> = ({ title }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const offset = dir === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white border border-[#e7e7e7] rounded-2xl p-4 sm:p-6 relative group shadow-xs">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <span className="text-xs text-[#007185] hover:underline cursor-pointer">Page 1 of 4</span>
      </div>

      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-20 bg-white/95 hover:bg-white border border-gray-300 shadow-md flex items-center justify-center rounded-r cursor-pointer text-gray-800"
      >
        <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-2 px-1"
      >
        {SIMILAR_PRODUCTS.map((prod) => (
          <div
            key={prod.id}
            className="w-48 shrink-0 bg-white border border-gray-200 rounded-xl p-3 flex flex-col justify-between hover:shadow-md transition cursor-pointer"
          >
            <div>
              <div className="w-full h-44 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-2 mb-2">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <h4 className="text-xs font-semibold text-gray-900 line-clamp-2 hover:text-[#007185] leading-snug">
                {prod.title}
              </h4>

              <div className="flex items-center gap-1 mt-1 text-[11px]">
                <div className="flex items-center text-amber-500">
                  <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                  <span className="ml-0.5 font-bold text-gray-800">{prod.rating}</span>
                </div>
                <span className="text-gray-400">({prod.reviewsCount})</span>
              </div>
            </div>

            <div className="mt-2 pt-1 border-t border-gray-100">
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-black text-gray-950">₹{prod.price}</span>
                <span className="text-[11px] text-gray-400 line-through">₹{prod.originalPrice}</span>
              </div>
              <span className="bg-[#cc0c39] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-xs mt-1 inline-block">
                {prod.discount}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-20 bg-white/95 hover:bg-white border border-gray-300 shadow-md flex items-center justify-center rounded-l cursor-pointer text-gray-800"
      >
        <ChevronRight className="w-6 h-6 stroke-[2.5]" />
      </button>
    </div>
  );
};
