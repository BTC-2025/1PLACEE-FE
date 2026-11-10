"use client";

import React from "react";
import Link from "next/link";
import { SPECIALTY_STORE_ITEMS } from "@/data/specialtyStoresData";

export const SpecialtyStoreGridSection: React.FC = () => {
  return (
    <section
      aria-label="Specialty Theme Stores"
      className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300 my-4 select-none"
    >
      {/* 7 Arched Store Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4 items-start">
        {SPECIALTY_STORE_ITEMS.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group flex flex-col items-center text-center cursor-pointer"
          >
            {/* Arched Top Image Tile matching Reference Screenshot */}
            <div className="w-full aspect-[146/196] rounded-t-full rounded-b-3xl overflow-hidden shadow-2xs group-hover:shadow-md group-hover:scale-[1.03] transition-all duration-300 bg-gray-50 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

