"use client";

import React from "react";
import Link from "next/link";

export interface QuadSubItem {
  title: string;
  image: string;
  linkText?: string;
}

export interface QuadCardProps {
  title: string;
  items: QuadSubItem[];
  footerLinkText?: string;
  footerHref?: string;
}

export const AmazonQuadCard: React.FC<QuadCardProps> = ({
  title,
  items,
  footerLinkText = "See more",
  footerHref = "#",
}) => {
  return (
    <div className="bg-white p-4 rounded-none shadow-xs flex flex-col justify-between border border-[#e7e7e7] min-h-[420px] transition hover:shadow-md">
      <div>
        <h2 className="text-xl font-bold text-[#0F1111] mb-3 leading-snug line-clamp-2">
          {title}
        </h2>

        {/* 2x2 Image Grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
          {items.slice(0, 4).map((subItem, idx) => (
            <div key={idx} className="flex flex-col group cursor-pointer">
              <div className="w-full h-28 bg-[#f7f7f7] rounded-none overflow-hidden flex items-center justify-center p-1">
                <img
                  src={subItem.image}
                  alt={subItem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
              </div>
              <span className="text-[12px] text-[#0F1111] mt-1 line-clamp-1 leading-tight">
                {subItem.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div className="mt-4 pt-2">
        <Link
          href={footerHref}
          className="text-[13px] text-[#007185] hover:text-[#c7511f] hover:underline font-medium block"
        >
          {footerLinkText}
        </Link>
      </div>
    </div>
  );
};

export interface SingleCardProps {
  title: string;
  image: string;
  subtitle?: string;
  footerLinkText?: string;
  footerHref?: string;
}

export const AmazonSingleCard: React.FC<SingleCardProps> = ({
  title,
  image,
  subtitle,
  footerLinkText = "See all offers",
  footerHref = "#",
}) => {
  return (
    <div className="bg-white p-4 rounded-none shadow-xs flex flex-col justify-between border border-[#e7e7e7] min-h-[420px] transition hover:shadow-md">
      <div>
        <h2 className="text-xl font-bold text-[#0F1111] mb-3 leading-snug line-clamp-2">
          {title}
        </h2>
        <div className="w-full h-[270px] bg-[#f7f7f7] overflow-hidden flex items-center justify-center group cursor-pointer">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
            loading="lazy"
          />
        </div>
        {subtitle && (
          <p className="text-[13px] text-[#565959] mt-2 line-clamp-1">{subtitle}</p>
        )}
      </div>

      <div className="mt-4 pt-2">
        <Link
          href={footerHref}
          className="text-[13px] text-[#007185] hover:text-[#c7511f] hover:underline font-medium block"
        >
          {footerLinkText}
        </Link>
      </div>
    </div>
  );
};
