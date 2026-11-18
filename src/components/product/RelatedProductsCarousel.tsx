"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

interface SimilarItem {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
  rating: number;
  reviewsCount: number;
  specs: string;
}

const SIMILAR_FLAGSHIPS: SimilarItem[] = [
  {
    id: "iphone-18-pro-max",
    title: "Apple iPhone 18 Pro Max 512GB Desert Titanium 5G",
    price: 89999,
    originalPrice: 104999,
    discount: "14% off",
    image: "/banners/noon-thumb-1.png",
    rating: 4.9,
    reviewsCount: 4210,
    specs: "6.9-inch OLED · A18 Pro · 48MP Triple",
  },
  {
    id: "galaxy-s25-ultra",
    title: "Samsung Galaxy S25 Ultra 5G AI Smartphone (512GB Titanium Grey)",
    price: 84999,
    originalPrice: 99999,
    discount: "15% off",
    image: "/banners/mobiles-pixel-8-pro.jpg",
    rating: 4.8,
    reviewsCount: 3120,
    specs: "200MP Quad · Snapdragon 8 Elite · S-Pen",
  },
  {
    id: "iphone-18-pro-glacier",
    title: "Apple iPhone 18 Pro 256GB Glacier Silver - 6.3-Inch Super Retina",
    price: 76999,
    originalPrice: 89999,
    discount: "14% off",
    image: "/banners/mobiles-iphone18-pro-glacier.png",
    rating: 4.9,
    reviewsCount: 2840,
    specs: "6.3-inch OLED · 120Hz ProMotion · Titanium",
  },
  {
    id: "pixel-9-pro-xl",
    title: "Google Pixel 9 Pro XL 5G AI Smartphone (256GB Porcelain)",
    price: 72999,
    originalPrice: 84999,
    discount: "14% off",
    image: "/banners/mobiles-iphone17-promax-orange.png",
    rating: 4.7,
    reviewsCount: 1950,
    specs: "Google Tensor G4 · Gemini AI · 50MP Triple",
  },
  {
    id: "iphone-18-burgundy",
    title: "Apple iPhone 18 Pro 512GB Deep Burgundy 5G Edition",
    price: 82999,
    originalPrice: 96999,
    discount: "14% off",
    image: "/banners/mobiles-iphone18-pro-burgundy.png",
    rating: 4.9,
    reviewsCount: 1680,
    specs: "Apple Intelligence · 4676mAh · 5G Dual SIM",
  },
  {
    id: "iphone-16-pro-max",
    title: "Apple iPhone 16 Pro Max 256GB Natural Titanium 5G",
    price: 71999,
    originalPrice: 84999,
    discount: "15% off",
    image: "/banners/mobiles-iphone16-promax-titanium.png",
    rating: 4.8,
    reviewsCount: 6540,
    specs: "6.9-inch OLED · A18 Pro · 48MP Triple",
  },
];

export const RelatedProductsCarousel: React.FC<{ title?: string }> = ({
  title = "Similar Flagship Smartphones",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full bg-white border border-[#e7e7e7] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-xs text-slate-500">Compare with other high-performance flagship devices</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Previous"
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Next"
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex items-stretch gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {SIMILAR_FLAGSHIPS.map((prod) => (
          <Link
            key={prod.id}
            href="/products/apple-iphone-18-pro"
            className="flex-shrink-0 w-[210px] sm:w-[230px] border border-gray-200 rounded-xl p-3 flex flex-col justify-between hover:border-blue-500 hover:shadow-md transition-all group cursor-pointer bg-white"
          >
            <div>
              <div className="w-full h-36 bg-slate-50 rounded-lg p-2 flex items-center justify-center overflow-hidden mb-2.5">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="flex items-center gap-1.5 mb-1">
                <span className="flex items-center bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded text-[10px] font-bold border border-emerald-200">
                  {prod.rating} <Star className="w-2.5 h-2.5 fill-emerald-600 stroke-none ml-0.5" />
                </span>
                <span className="text-[10px] text-gray-400">({prod.reviewsCount})</span>
              </div>

              <h4 className="text-xs font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                {prod.title}
              </h4>
              <p className="text-[10px] text-slate-500 line-clamp-1 mt-1 font-medium">{prod.specs}</p>
            </div>

            <div className="mt-3 pt-2 border-t border-gray-100">
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-black text-gray-950">₹{prod.price.toLocaleString("en-IN")}</span>
                <span className="text-[10px] text-gray-400 line-through">₹{prod.originalPrice.toLocaleString("en-IN")}</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600">{prod.discount}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
