"use client";

import React from "react";
import { Star, ThumbsUp, CheckCircle, Camera } from "lucide-react";

const IPHONE_REVIEWS = [
  {
    author: "Arun K. Sundaram",
    rating: 5,
    date: "Reviewed in India on 12 November 2026",
    verified: true,
    size: "Variant: 256GB | Desert Titanium",
    title: "Exceptional battery life and lightning fast A18 Pro!",
    content:
      "Upgraded from an older device and the difference is massive. The Desert Titanium finish looks subtle and super premium in hand. Camera low-light performance with the new 48MP sensor is by far the best on any smartphone. Delivered safely within 24 hours.",
  },
  {
    author: "Pooja Venkatesh",
    rating: 5,
    date: "Reviewed in India on 28 October 2026",
    verified: true,
    size: "Variant: 256GB | Desert Titanium",
    title: "120Hz display is buttery smooth, Apple Intelligence is helpful",
    content:
      "Display brightness under direct sunlight is incredible. Siri with on-device Apple Intelligence handles emails and summarizes messages effortlessly. Battery comfortably lasts 1.5 days on heavy usage.",
  },
  {
    author: "Vikram Malhotra",
    rating: 4,
    date: "Reviewed in India on 15 October 2026",
    verified: true,
    size: "Variant: 512GB | Black Titanium",
    title: "Solid build quality, great video stabilization",
    content:
      "4K 120fps Dolby Vision video recording is unmatched for content creation. Only minor complaint is charging speed tops around 30W, but battery efficiency makes up for it completely.",
  },
];

const REVIEW_IMAGES = [
  "/banners/noon-iphone-main.png",
  "/banners/iphone-noon-1.jpg",
  "/banners/iphone-noon-2.jpg",
  "/banners/iphone-noon-3.jpg",
];

export const CustomerReviewsSection: React.FC = () => {
  return (
    <div className="w-full bg-white border border-[#e7e7e7] rounded-2xl p-6 sm:p-8 space-y-6 text-gray-900 shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Rating Breakdown Column */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Customer Reviews</h3>

          <div className="flex items-center gap-3">
            <div className="flex items-center text-amber-500">
              <Star className="w-5 h-5 fill-amber-400 stroke-amber-400" />
              <Star className="w-5 h-5 fill-amber-400 stroke-amber-400" />
              <Star className="w-5 h-5 fill-amber-400 stroke-amber-400" />
              <Star className="w-5 h-5 fill-amber-400 stroke-amber-400" />
              <Star className="w-5 h-5 fill-amber-400 stroke-amber-400" />
            </div>
            <span className="text-xl font-extrabold text-gray-900">4.9 out of 5</span>
          </div>
          <p className="text-xs text-gray-500">3,492 global ratings</p>

          {/* Star Bar breakdown */}
          <div className="space-y-2 pt-2 text-xs text-blue-600">
            {[
              { stars: "5 star", pct: 86 },
              { stars: "4 star", pct: 10 },
              { stars: "3 star", pct: 2 },
              { stars: "2 star", pct: 1 },
              { stars: "1 star", pct: 1 },
            ].map((row) => (
              <div key={row.stars} className="flex items-center gap-3">
                <span className="w-10 hover:underline cursor-pointer shrink-0 text-slate-700 font-medium">
                  {row.stars}
                </span>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-slate-500">{row.pct}%</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-sm font-bold text-gray-900 mb-1">Review this product</h4>
            <p className="text-xs text-gray-500 mb-3">Share your thoughts with other customers</p>
            <button className="w-full py-2 rounded-xl border border-gray-300 font-bold text-xs text-gray-800 hover:bg-gray-50 transition cursor-pointer">
              Write a product review
            </button>
          </div>
        </div>

        {/* Right Reviews List Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Reviews with Photos Header */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Camera className="w-4 h-4 text-slate-600" />
              <span>Reviews with customer images</span>
            </h4>
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {REVIEW_IMAGES.map((img, i) => (
                <div
                  key={i}
                  className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shrink-0 bg-slate-50 flex items-center justify-center p-1.5"
                >
                  <img src={img} alt="Customer upload" className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6 pt-2 border-t border-gray-100">
            <h4 className="text-sm font-bold text-gray-900">Top verified reviews from India</h4>

            {IPHONE_REVIEWS.map((rev, idx) => (
              <div key={idx} className="space-y-2 border-b border-gray-100 pb-5 last:border-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-[#1559ac] flex items-center justify-center font-bold text-xs">
                    {rev.author.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-gray-900">{rev.author}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? "fill-amber-400 stroke-amber-400"
                            : "text-gray-300 stroke-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <h5 className="text-xs font-bold text-gray-900 leading-snug">{rev.title}</h5>
                </div>

                <div className="text-[11px] text-gray-400 flex items-center gap-2">
                  <span>{rev.date}</span>
                  <span>·</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                    <CheckCircle className="w-3 h-3 text-emerald-600" /> Verified Purchase
                  </span>
                </div>

                <p className="text-[11px] font-semibold text-slate-500">{rev.size}</p>

                <p className="text-xs text-gray-700 leading-relaxed">{rev.content}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
                  <button className="flex items-center gap-1 border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-50 text-xs font-medium cursor-pointer">
                    <ThumbsUp className="w-3.5 h-3.5 text-gray-400" />
                    <span>Helpful</span>
                  </button>
                  <span className="text-gray-400 hover:text-gray-600 cursor-pointer">Report</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
