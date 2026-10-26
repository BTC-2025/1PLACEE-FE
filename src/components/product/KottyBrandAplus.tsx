"use client";

import React from "react";
import { Star, ShieldCheck, Play } from "lucide-react";

export const KottyBrandAplus: React.FC = () => {
  return (
    <div className="w-full bg-white border border-[#e7e7e7] rounded-2xl p-4 sm:p-8 space-y-10 text-gray-900 shadow-xs">
      
      {/* 1. Header Hero Banner: KOTTY LIFESTYLE */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white min-h-[340px] flex flex-col justify-end p-6 sm:p-10">
        <img
          src="https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1200&q=80"
          alt="KOTTY Lifestyle Jeans"
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
        />
        <div className="relative z-10 max-w-xl">
          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-amber-300">
            Official Brand Story
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mt-2 text-white">
            KOTTY LIFESTYLE
          </h2>
          <p className="text-sm sm:text-base text-gray-200 mt-2 font-medium">
            Redefining daily denim comfort with mid-rise stretch fabric engineered for active modern living.
          </p>
        </div>
      </div>

      {/* 2. Grid Story: Craftsmanship & Innovation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-3">
          <h3 className="text-2xl font-black text-gray-900 tracking-tight">
            Crafted for Day-to-Night Flexibility
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Every stitch of KOTTY jeans is reinforced with double-needle tailoring and premium stretch elastane. Whether you are commuting, relaxing at home, or heading out for the weekend, get the crisp silhouette of classic denim with the breathable ease of sweatpants.
          </p>
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
              <span className="text-lg font-black text-[#1559ac]">98%</span>
              <p className="text-[11px] font-semibold text-gray-600">Pure Cotton</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
              <span className="text-lg font-black text-[#1559ac]">2%</span>
              <p className="text-[11px] font-semibold text-gray-600">Spandex Stretch</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
              <span className="text-lg font-black text-[#1559ac]">12.5 oz</span>
              <p className="text-[11px] font-semibold text-gray-600">Medium Weight</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <img
            src="https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=500&q=80"
            alt="Denim fabric closeup"
            className="rounded-xl w-full h-48 object-cover shadow-xs"
          />
          <img
            src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=500&q=80"
            alt="Sewing craftsmanship"
            className="rounded-xl w-full h-48 object-cover shadow-xs"
          />
        </div>
      </div>

      {/* 3. Product Features Showcase */}
      <div>
        <h3 className="text-xl font-black text-center text-gray-900 mb-6">
          KOTTY LIFESTYLE PRODUCTS
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gray-50 border border-gray-200">
            <img
              src="https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=300&q=80"
              alt="Light Blue Wash"
              className="w-full h-40 object-contain rounded-lg"
            />
            <p className="text-xs font-bold text-gray-900 mt-2">Light Blue Relaxed</p>
            <span className="text-[11px] text-gray-500">₹401</span>
          </div>

          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gray-50 border border-gray-200">
            <img
              src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=300&q=80"
              alt="Vintage Dark Wash"
              className="w-full h-40 object-contain rounded-lg"
            />
            <p className="text-xs font-bold text-gray-900 mt-2">Vintage Indigo</p>
            <span className="text-[11px] text-gray-500">₹469</span>
          </div>

          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gray-50 border border-gray-200">
            <img
              src="https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=300&q=80"
              alt="Black Denim"
              className="w-full h-40 object-contain rounded-lg"
            />
            <p className="text-xs font-bold text-gray-900 mt-2">Carbon Black</p>
            <span className="text-[11px] text-gray-500">₹499</span>
          </div>

          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gray-50 border border-gray-200">
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80"
              alt="Distressed Jeans"
              className="w-full h-40 object-contain rounded-lg"
            />
            <p className="text-xs font-bold text-gray-900 mt-2">Raw Vintage Wash</p>
            <span className="text-[11px] text-gray-500">₹549</span>
          </div>
        </div>
      </div>

      {/* 4. Product Video Spotlight Strip */}
      <div className="bg-[#111] text-white rounded-2xl p-5 flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-full md:w-1/2 h-56 bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=600&q=80"
            alt="Product video thumbnail"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute w-14 h-14 bg-white/90 group-hover:bg-white text-gray-900 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
            <Play className="w-6 h-6 fill-gray-900 ml-1" />
          </div>
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded">
            0:45
          </span>
        </div>

        <div className="w-full md:w-1/2 space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Fit & Stretch Preview
          </span>
          <h4 className="text-xl font-black text-white">
            See How KOTTY Jeans Fits in Motion
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            Watch our 360-degree real model fitting showcase demonstrating flexibility, pocket depth, and ankle drop across multiple shoe styles.
          </p>
        </div>
      </div>
    </div>
  );
};
