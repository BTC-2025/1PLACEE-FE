"use client";

import React from "react";
import { Star, ThumbsUp, CheckCircle, Camera } from "lucide-react";

const REVIEWS = [
  {
    author: "Rahul S.",
    rating: 4,
    date: "Reviewed in India on 12 October 2026",
    verified: true,
    size: "Size: 32 | Color: Light Blue",
    title: "Awesome baggy look, totally worth ₹401!",
    content:
      "The fabric is soft and has slight stretch which makes it super comfortable for daily college use. Length is perfect with sneakers. Quality feels like ₹1500+ branded jeans.",
  },
  {
    author: "Karthik Raja",
    rating: 5,
    date: "Reviewed in India on 28 September 2026",
    verified: true,
    size: "Size: 30 | Color: Light Blue",
    title: "Best fitting relaxed jeans under ₹500",
    content:
      "Was skeptical about the low price during Great Indian Festival, but this exceeded expectations! Washed twice already, no color fade or shrinkage.",
  },
  {
    author: "Amit Verma",
    rating: 4,
    date: "Reviewed in India on 15 September 2026",
    verified: true,
    size: "Size: 34 | Color: Black Wash",
    title: "Good stitching and durable pockets",
    content:
      "Deep front pockets can easily hold a large phone without slipping. Mid-rise waist stays in place without pinching.",
  },
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
              <Star className="w-5 h-5 text-gray-300" />
            </div>
            <span className="text-xl font-extrabold text-gray-900">3.6 out of 5</span>
          </div>
          <p className="text-xs text-gray-500">3,175 global ratings</p>

          {/* Star Bar breakdown */}
          <div className="space-y-2 text-xs">
            {[
              { star: "5 star", pct: 45 },
              { star: "4 star", pct: 28 },
              { star: "3 star", pct: 12 },
              { star: "2 star", pct: 6 },
              { star: "1 star", pct: 9 },
            ].map((bar) => (
              <div key={bar.star} className="flex items-center gap-2">
                <span className="w-12 text-[#007185] hover:underline cursor-pointer">{bar.star}</span>
                <div className="flex-1 bg-gray-200 h-4 rounded-full overflow-hidden">
                  <div className="bg-[#ffa41c] h-full rounded-full" style={{ width: `${bar.pct}%` }} />
                </div>
                <span className="w-8 text-right text-gray-600">{bar.pct}%</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-bold text-sm text-gray-900">Review this product</h4>
            <p className="text-xs text-gray-600 mt-1">Share your thoughts with other customers</p>
            <button className="mt-3 w-full bg-white hover:bg-gray-50 border border-gray-300 font-bold text-xs py-2 px-4 rounded-full shadow-2xs cursor-pointer transition">
              Write a product review
            </button>
          </div>
        </div>

        {/* Right Customer Photos & Written Reviews Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Photos Strip */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-gray-700" />
                <span>Reviews with images</span>
              </h4>
              <button className="text-xs text-[#007185] hover:underline">View all photos &gt;</button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {[
                "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=200&q=80",
                "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=200&q=80",
                "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=200&q=80",
                "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=200&q=80",
              ].map((img, i) => (
                <div key={i} className="h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:opacity-90">
                  <img src={img} alt={`Customer upload ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Top Reviews from India */}
          <div className="space-y-5">
            <h4 className="font-bold text-sm text-gray-900">Top reviews from India</h4>
            {REVIEWS.map((rev, idx) => (
              <div key={idx} className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center font-bold text-[10px] text-gray-700">
                    {rev.author[0]}
                  </div>
                  <span className="font-bold text-gray-900">{rev.author}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
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
                  <span className="font-bold text-gray-900">{rev.title}</span>
                </div>

                <p className="text-[11px] text-gray-500">{rev.date}</p>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="text-gray-600 font-semibold">{rev.size}</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-[#c45500] font-bold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-[#c45500]" /> Verified Purchase
                  </span>
                </div>

                <p className="text-gray-700 leading-relaxed pt-1">{rev.content}</p>

                <div className="pt-1 flex items-center gap-4 text-gray-500 text-[11px]">
                  <button className="flex items-center gap-1 border border-gray-300 rounded px-2.5 py-0.5 hover:bg-gray-50">
                    <ThumbsUp className="w-3 h-3" /> Helpful
                  </button>
                  <button className="hover:underline">Report</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
