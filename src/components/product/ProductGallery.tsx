"use client";

import React, { useState } from "react";
import { Share2, Heart, Sparkles } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, title }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <div className="flex gap-4">
      {/* Vertical Thumbnails List */}
      <div className="flex flex-col gap-2 shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onMouseEnter={() => setSelectedIdx(idx)}
            onClick={() => setSelectedIdx(idx)}
            className={`w-12 h-14 rounded-md border p-0.5 overflow-hidden transition bg-white flex items-center justify-center cursor-pointer ${
              selectedIdx === idx
                ? "border-[#e77600] ring-2 ring-[#e77600]/30 shadow-xs"
                : "border-[#d5d9d9] hover:border-gray-500"
            }`}
          >
            <img
              src={img}
              alt={`${title} thumbnail ${idx + 1}`}
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=300&q=80";
              }}
            />
          </button>
        ))}
      </div>

      {/* Main Large Display Image */}
      <div className="flex-1 relative flex flex-col items-center">
        {/* Floating Share & Wishlist Buttons */}
        <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
          <button
            aria-label="Share product"
            className="w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-[#d5d9d9] flex items-center justify-center shadow-xs cursor-pointer hover:scale-105 transition"
          >
            <Share2 className="w-4 h-4 text-gray-700" />
          </button>
          <button
            aria-label="Add to wishlist"
            className="w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-[#d5d9d9] flex items-center justify-center shadow-xs cursor-pointer hover:scale-105 transition"
          >
            <Heart className="w-4 h-4 text-gray-700 hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Large Image Container */}
        <div className="w-full h-[520px] lg:h-[580px] bg-white rounded-xl overflow-hidden flex items-center justify-center p-4">
          <img
            src={images[selectedIdx] || images[0]}
            alt={title}
            className="max-h-full max-w-full object-contain cursor-zoom-in hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80";
            }}
          />
        </div>

        {/* Ask Rufus / AI Assistant Pill Prompt (from screenshot 1) */}
        <div className="w-full mt-3 p-3 bg-[#f0f8ff] border border-[#cbe4fa] rounded-xl flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#007185]">
            <Sparkles className="w-4 h-4 text-[#ff9900]" />
            <span>Ask 1PLACE AI (Rufus)</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <button className="bg-white hover:bg-gray-50 border border-[#b2d5f8] text-[#0f1111] px-3 py-1.5 rounded-full cursor-pointer transition">
              Are they machine washable?
            </button>
            <button className="bg-white hover:bg-gray-50 border border-[#b2d5f8] text-[#0f1111] px-3 py-1.5 rounded-full cursor-pointer transition">
              Do they have a slim fit?
            </button>
            <button className="bg-white hover:bg-gray-50 border border-[#b2d5f8] text-[#0f1111] px-3 py-1.5 rounded-full cursor-pointer transition">
              What is the inseam length?
            </button>
            <button className="bg-[#1559ac] text-white hover:bg-[#0f4484] px-3 py-1.5 rounded-full font-bold cursor-pointer transition">
              Ask something else
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
