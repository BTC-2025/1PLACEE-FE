"use client";

import React from "react";
import Link from "next/link";
import { INTERACTIVE_CATEGORY_ROWS } from "@/data/interactiveCategoryData";

export const CategoryRowSections: React.FC = () => {
  return (
    <div className="w-full flex flex-col space-y-4 sm:space-y-6 my-4 select-none">
      {INTERACTIVE_CATEGORY_ROWS.map((row) => (
        <section
          key={row.id}
          className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300"
        >
          {/* Real Header: Category Title + Real Interactive VIEW ALL Button */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#1a2b49] tracking-tight">
              {row.title}
            </h2>
            <Link
              href={row.viewAllHref}
              className="text-[11px] sm:text-xs font-bold text-[#1559ac] border border-[#1559ac] hover:bg-[#1559ac] hover:text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded transition duration-200 cursor-pointer tracking-wider uppercase inline-flex items-center justify-center shadow-2xs"
            >
              VIEW ALL
            </Link>
          </div>

          {/* 7 Interactive Product Tiles Grid (Responsive from 4 cols on mobile to 7 cols on desktop) */}
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3.5 lg:gap-4 items-start">
            {row.items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group flex flex-col items-center cursor-pointer text-center"
              >
                {/* Rounded Product Card Image with smooth hover scale */}
                <div className="w-full aspect-[132/154] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100/80 shadow-2xs group-hover:shadow-md group-hover:border-[#1559ac]/30 transition-all duration-300 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Real Text Label Below Card */}
                <span className="mt-2 text-[11px] sm:text-xs lg:text-[13px] font-semibold text-[#1a2b49] group-hover:text-[#1559ac] transition-colors duration-200 line-clamp-2 leading-tight px-1">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
