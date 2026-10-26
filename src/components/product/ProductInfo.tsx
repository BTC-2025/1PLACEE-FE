"use client";

import React, { useState } from "react";
import { Star, ChevronRight, ShieldCheck, RotateCcw, Truck, Award, Lock, Sparkles } from "lucide-react";

interface ProductInfoProps {
  onColorChange: (color: string) => void;
  selectedColor: string;
}

const COLOR_OPTIONS = [
  {
    name: "Light Blue",
    price: "₹401.00",
    image: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Black Wash",
    price: "₹469.00",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Dark Indigo",
    price: "₹499.00",
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=150&q=80",
  },
];

const SIZE_OPTIONS = ["28", "30", "32", "34", "36", "38"];

export const ProductInfo: React.FC<ProductInfoProps> = ({ onColorChange, selectedColor }) => {
  const [selectedSize, setSelectedSize] = useState("32");

  return (
    <div className="flex flex-col space-y-3.5 text-[#0F1111]">
      {/* Brand Header */}
      <div>
        <a href="#store" className="text-xs font-bold text-[#007185] hover:text-[#c7511f] hover:underline">
          Visit the KOTTY Store
        </a>
        <h1 className="text-xl sm:text-2xl font-bold leading-snug mt-1 text-[#0F1111]">
          KOTTY Mens Regular Fit|Classic Design with Stylish Look |Day Comfort|Mide Rise Strachable Jeans
        </h1>
      </div>

      {/* Ratings & Best Seller Row */}
      <div className="space-y-1.5 pb-2 border-b border-[#e7e7e7]">
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center text-[#de7921]">
            <span className="font-extrabold mr-1 text-[#0f1111]">3.6</span>
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <Star className="w-3.5 h-3.5 text-gray-300" />
            </div>
          </div>
          <span className="text-[#007185] hover:underline cursor-pointer">(3,175 ratings)</span>
          <span className="text-gray-300">|</span>
          <span className="text-[#007185] hover:underline cursor-pointer">Search this page</span>
        </div>

        {/* Best Seller Pill */}
        <div className="flex items-center gap-2 pt-0.5">
          <span className="bg-[#e67a00] text-white font-extrabold text-[11px] px-2 py-0.5 rounded-xs">
            #1 Best Seller
          </span>
          <span className="text-xs text-[#007185] hover:underline cursor-pointer">
            in Men's Jeans & Chinos
          </span>
        </div>

        <p className="text-xs text-gray-600 font-medium">
          <strong className="text-gray-900 font-bold">6K+ bought</strong> in past month
        </p>
      </div>

      {/* Great Indian Festival Deal Section */}
      <div className="space-y-1 pb-3 border-b border-[#e7e7e7]">
        <span className="bg-[#cc0c39] text-white font-extrabold text-xs px-2.5 py-1 rounded-xs inline-block">
          Great Indian Festival
        </span>

        <div className="flex items-baseline gap-2 pt-1.5">
          <span className="text-2xl sm:text-3xl font-normal text-[#cc0c39]">-80%</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#0F1111]">₹401</span>
          <button className="text-[11px] text-[#007185] hover:underline">Price history</button>
        </div>

        <div className="text-xs text-[#565959]">
          M.R.P.: <span className="line-through">₹1,999</span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <span className="bg-[#131921] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-xs">
            ✓ Fulfilled
          </span>
          <span className="text-xs text-gray-700">Inclusive of all taxes</span>
        </div>
      </div>

      {/* Offers Strip Card */}
      <div className="bg-white border border-[#e7e7e7] rounded-xl p-3 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-1.5">
            <span className="text-base">🏷️</span>
            <span>Offers</span>
          </div>
          <button className="text-[#007185] hover:underline text-[11px] font-normal">
            See all offers & discounts &gt;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="bg-[#f7fafa] border border-[#d5d9d9] rounded-lg p-2.5">
            <p className="font-bold text-gray-900">Buy for ₹401 + cashback</p>
            <p className="text-[11px] text-gray-600 mt-0.5">Amazon Pay UPI • ₹25 cashback</p>
          </div>
          <div className="bg-[#f7fafa] border border-[#d5d9d9] rounded-lg p-2.5">
            <p className="font-bold text-gray-900">1 cashback offer available</p>
            <p className="text-[11px] text-[#007185] hover:underline mt-0.5 cursor-pointer">See details</p>
          </div>
        </div>
      </div>

      {/* Diamonds / Reward Points Strip */}
      <div className="bg-[#faf5ff] border border-[#e9d5ff] rounded-xl p-2.5 flex items-center justify-between text-xs cursor-pointer hover:bg-[#f3e8ff] transition">
        <div className="flex items-center gap-2">
          <span className="text-base">💎</span>
          <div>
            <span className="font-bold text-purple-900">Get 40 Diamonds worth ₹4 on this item</span>
            <p className="text-[10px] text-purple-700">On all UPI & Card payments</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-purple-800" />
      </div>

      {/* Feature Icons Strip (Return, Free delivery, Top brand, etc.) */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 py-3 border-y border-[#e7e7e7] text-center text-[10px] text-gray-700">
        <div className="flex flex-col items-center">
          <RotateCcw className="w-5 h-5 text-[#007185] mb-1" />
          <span>10 days Return & Exchange</span>
        </div>
        <div className="flex flex-col items-center">
          <Truck className="w-5 h-5 text-[#007185] mb-1" />
          <span>Free Delivery</span>
        </div>
        <div className="flex flex-col items-center">
          <Award className="w-5 h-5 text-[#007185] mb-1" />
          <span>Top Brand</span>
        </div>
        <div className="flex flex-col items-center">
          <ShieldCheck className="w-5 h-5 text-[#007185] mb-1" />
          <span>1PLACE Delivered</span>
        </div>
        <div className="hidden sm:flex flex-col items-center">
          <Lock className="w-5 h-5 text-[#007185] mb-1" />
          <span>Secure Transaction</span>
        </div>
      </div>

      {/* Color Swatch Options */}
      <div>
        <p className="text-xs font-bold text-gray-900 mb-1.5">
          Color: <span className="font-semibold text-gray-700">{selectedColor}</span>
        </p>
        <div className="flex gap-2.5">
          {COLOR_OPTIONS.map((c) => (
            <button
              key={c.name}
              onClick={() => onColorChange(c.name)}
              className={`p-1.5 rounded-lg border flex flex-col items-center w-20 transition cursor-pointer ${
                selectedColor === c.name
                  ? "border-[#e77600] ring-2 ring-[#e77600]/30 bg-amber-50/40"
                  : "border-[#d5d9d9] hover:border-gray-500 bg-white"
              }`}
            >
              <div className="w-12 h-14 overflow-hidden flex items-center justify-center">
                <img src={c.image} alt={c.name} className="max-h-full max-w-full object-contain" />
              </div>
              <span className="text-[10px] font-bold text-gray-900 mt-1">{c.price}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Size Selector */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-bold text-gray-900">
            Size: <span className="font-semibold">{selectedSize}</span>
          </span>
          <button className="text-[#007185] hover:underline font-semibold">Size Chart</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((sz) => (
            <button
              key={sz}
              onClick={() => setSelectedSize(sz)}
              className={`w-10 h-9 rounded-md text-xs font-bold border transition cursor-pointer ${
                selectedSize === sz
                  ? "border-[#e77600] bg-[#fff8e7] text-gray-900 ring-1 ring-[#e77600]"
                  : "border-[#d5d9d9] bg-white text-gray-800 hover:border-gray-500"
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
