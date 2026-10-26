"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const FASHION_CATEGORIES = [
  { label: "Women", hasDropdown: true },
  { label: "Men", hasDropdown: true, isActive: true },
  { label: "Kids", hasDropdown: true },
  { label: "Bags & Luggage", hasDropdown: true },
  { label: "Sportswear", hasDropdown: true },
  { label: "Sales & Deals", hasDropdown: true },
];

export const FashionSubHeader: React.FC = () => {
  return (
    <div className="w-full bg-white border-b border-[#ddd] shadow-2xs">
      <div className="max-w-[1500px] mx-auto px-4 py-2.5 flex items-center justify-between text-xs">
        {/* Amazon Fashion Title */}
        <Link href="/products/kotty-mens-jeans" className="font-extrabold text-[17px] text-[#0F1111] tracking-tight hover:text-[#007185]">
          1PLACE <span className="font-medium text-[#565959]">Fashion</span>
        </Link>

        {/* Categories: Women, Men, Kids, Bags & Luggage, Sportswear, Sales & Deals */}
        <div className="hidden sm:flex items-center gap-6">
          {FASHION_CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className={`flex items-center gap-1 cursor-pointer py-1 px-1.5 transition ${
                cat.isActive
                  ? "text-[#1559ac] font-bold border-b-2 border-[#1559ac]"
                  : "text-[#333] hover:text-[#007185] font-medium"
              }`}
            >
              <span>{cat.label}</span>
              {cat.hasDropdown && <ChevronDown className="w-3 h-3 text-[#555]" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
