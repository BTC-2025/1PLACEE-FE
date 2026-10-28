"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Clock, Plus, Check, ChevronRight, Sparkles, Filter } from "lucide-react";
import {
  BLINKIT_CATEGORIES,
  CATEGORY_PRODUCTS_DATABASE,
  CategoryGroup,
  CategoryProduct
} from "@/data/blinkitCategoryData";
import { CATEGORY_SEO_ARTICLES } from "@/data/blinkitSeoData";
import { useCartStore } from "@/stores/cartStore";

export default function CategoryMasterPage() {
  const [selectedMainCat, setSelectedMainCat] = useState<string>("instant-food");
  const [selectedSubCat, setSelectedSubCat] = useState<string>("instant-noodles");
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const addToCart = useCartStore((state) => state.addToCart);

  // Active Category & Subcategory Resolution
  const activeMainGroup: CategoryGroup =
    BLINKIT_CATEGORIES.find((c) => c.id === selectedMainCat) || BLINKIT_CATEGORIES[0];

  const activeSubcategories = activeMainGroup.subcategories;

  // Products for currently selected subcategory, fallback to noodles if empty
  const currentProducts: CategoryProduct[] =
    CATEGORY_PRODUCTS_DATABASE[selectedSubCat] ||
    CATEGORY_PRODUCTS_DATABASE["instant-noodles"] ||
    [];

  // SEO details write-up for bottom of the page
  const seoDetails =
    CATEGORY_SEO_ARTICLES[selectedSubCat] ||
    CATEGORY_SEO_ARTICLES["instant-noodles"];

  const handleMainCategoryChange = (catId: string) => {
    setSelectedMainCat(catId);
    const targetGroup = BLINKIT_CATEGORIES.find((c) => c.id === catId);
    if (targetGroup && targetGroup.subcategories.length > 0) {
      setSelectedSubCat(targetGroup.subcategories[0].id);
    }
  };

  const handleAddProduct = (product: CategoryProduct) => {
    addToCart({
      id: product.id,
      title: `${product.name} (${product.weight})`,
      price: product.price,
      originalPrice: product.originalPrice,
      imageUrl: product.image,
      rating: 4.8,
      ratingCount: 1420,
      category: activeMainGroup.name,
      inStock: true,
      isPrimeEligible: true,
      deliveryDate: product.deliveryTime,
    });

    setAddedItemIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen text-[#0F1111] pb-16">
      
      {/* 1. TOP HEADER BAR: Main Category Dropdown Selector matching Image 2 top strip */}
      <div className="sticky top-[64px] z-40 bg-white border-b border-gray-200 shadow-xs px-3 sm:px-6 py-2.5">
        <div className="max-w-[1540px] mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Breadcrumb + Main Category Dropdown Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link href="/" className="text-xs text-gray-500 hover:text-[#1559ac] hover:underline font-medium">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-500">Categories</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            
            {/* Top Main Category Selector Dropdown with Icon */}
            <div className="relative inline-block">
              <select
                value={selectedMainCat}
                onChange={(e) => handleMainCategoryChange(e.target.value)}
                className="appearance-none bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold text-xs sm:text-sm pl-3.5 pr-8 py-1.5 rounded-full cursor-pointer hover:bg-emerald-100 transition focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
              >
                {BLINKIT_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-emerald-800 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Blinkit Quick Delivery ETA Badge */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Instant 8 Mins Delivery in Ranipettai</span>
            </div>
            <span className="hidden md:inline-block text-xs font-semibold text-gray-500">
              {currentProducts.length} items available
            </span>
          </div>

        </div>
      </div>

      {/* 2. AUTHENTIC BLINKIT 2-COLUMN LAYOUT (Image 2 Model) */}
      <div className="max-w-[1540px] mx-auto px-2 sm:px-4 pt-3 flex flex-col md:flex-row gap-3 items-start">
        
        {/* LEFT COLUMN: Subcategories Slim Vertical List with Thumbnails & Dedicated Scrollbar */}
        <aside className="w-full md:w-[92px] lg:w-[104px] shrink-0 bg-white rounded-xl border border-gray-200 py-2 shadow-xs md:sticky md:top-[122px] max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-thin flex md:flex-col gap-1.5 overflow-x-auto">
          {activeSubcategories.map((sub) => {
            const isActive = selectedSubCat === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubCat(sub.id)}
                className={`flex flex-col items-center justify-center p-1.5 text-center transition cursor-pointer relative shrink-0 w-20 md:w-full rounded-lg ${
                  isActive
                    ? "bg-emerald-50 text-emerald-900 font-bold border-l-4 border-emerald-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {/* Subcategory circular/square thumbnail matching Blinkit left sidebar */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gray-50 border flex items-center justify-center overflow-hidden mb-1 transition ${
                    isActive
                      ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs"
                      : "border-gray-200"
                  }`}
                >
                  {sub.image ? (
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl">{activeMainGroup.icon}</span>
                  )}
                </div>
                <span className="text-[10px] sm:text-[11px] leading-tight line-clamp-2 px-0.5">
                  {sub.name}
                </span>
              </button>
            );
          })}
        </aside>

        {/* RIGHT COLUMN: Products Grid & Bottom SEO Details (Image 2 Model) */}
        <main className="flex-1 w-full bg-white rounded-xl border border-gray-200 p-3 sm:p-5 shadow-xs space-y-8">
          
          {/* Header Strip with Subcategory Title and Sort Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-200 gap-2">
            <div>
              <h1 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                {activeSubcategories.find((s) => s.id === selectedSubCat)?.name || "All Products"}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Delivered fresh & directly packed within 8-10 minutes from 1PLACE Darkstore
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">Sort by:</span>
              <select className="text-xs font-bold border border-gray-300 rounded-lg px-2.5 py-1.5 bg-gray-50 cursor-pointer">
                <option>Relevance</option>
                <option>Price (Low to High)</option>
                <option>Price (High to Low)</option>
                <option>Discount</option>
              </select>
            </div>
          </div>

          {/* Product Cards Grid: Exactly matching second screenshot Blinkit card style with 5-column responsive layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-3.5">
            {currentProducts.map((item) => {
              const isAdded = addedItemIds[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-gray-200 hover:border-emerald-500 p-2.5 flex flex-col justify-between hover:shadow-md transition group relative"
                >
                  {/* Discount Badge on top left corner */}
                  {item.discountBadge && (
                    <div className="absolute top-2 left-2 z-10 bg-[#1559ac] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-xs">
                      {item.discountBadge}
                    </div>
                  )}

                  {/* Delivery ETA Pill */}
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-100 w-fit px-1.5 py-0.5 rounded mb-2">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    <span>{item.deliveryTime}</span>
                  </div>

                  {/* Product Packaging Image */}
                  <div className="w-full h-28 sm:h-32 flex items-center justify-center p-1 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  {/* Product Title & Weight */}
                  <div className="pt-2 flex-1 flex flex-col">
                    <h3 className="text-xs font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-[#1559ac] transition">
                      {item.name}
                    </h3>
                    <span className="text-[11px] text-gray-500 font-medium mt-1">
                      {item.weight}
                    </span>
                  </div>

                  {/* Price & Green ADD Button */}
                  <div className="pt-3 mt-auto flex items-center justify-between border-t border-gray-100">
                    <div>
                      <div className="text-xs sm:text-sm font-black text-gray-950">
                        ₹{item.price}
                      </div>
                      {item.originalPrice > item.price && (
                        <div className="text-[10px] text-gray-400 line-through">
                          ₹{item.originalPrice}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddProduct(item)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-xs active:scale-95 ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-400"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>ADDED</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>ADD</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ============================================================== */}
          {/* 3. BELOW PRODUCT DETAILS: EXTENSIVE SEO CONTENT WRITE-UP        */}
          {/*    (Matching the second screenshot's complete article & table) */}
          {/* ============================================================== */}
          <div className="pt-8 border-t border-gray-200 space-y-6 text-gray-800">
            
            {/* Header Title & Intro */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h2 className="text-base sm:text-lg font-bold text-gray-950">
                  {seoDetails.title}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {seoDetails.intro}
              </p>
            </div>

            {/* Types of Items Section */}
            <div className="space-y-3">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 border-l-4 border-[#1559ac] pl-2.5">
                Types of {activeSubcategories.find((s) => s.id === selectedSubCat)?.name || "Items"} Available
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                {seoDetails.typesOfItems.map((item, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <strong className="font-bold text-gray-900 block mb-1">
                      {idx + 1}. {item.title}
                    </strong>
                    <span className="text-gray-600 text-xs leading-normal">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutritional Values Table (matching exact table in screenshot 2) */}
            {seoDetails.nutritionalTable && (
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 border-l-4 border-emerald-600 pl-2.5">
                  {seoDetails.nutritionalTitle || "Nutritional Breakdown"}
                </h3>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase font-bold border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-2">Nutritional Component</th>
                        <th className="px-4 py-2">Amount per Standard Serving</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {seoDetails.nutritionalTable.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50/80">
                          <td className="px-4 py-2 font-medium text-gray-800">{row.nutrient}</td>
                          <td className="px-4 py-2 font-bold text-emerald-800">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Benefits Section */}
            <div className="space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 border-l-4 border-amber-500 pl-2.5">
                {seoDetails.benefitsTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {seoDetails.benefits.map((b, i) => (
                  <div key={i} className="bg-emerald-50/50 border border-emerald-200 rounded-lg p-2.5">
                    <span className="font-bold text-emerald-900 block">✓ {b.title}</span>
                    <p className="text-gray-600 text-[11px] mt-0.5">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Frequently Asked Questions */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm sm:text-base font-bold text-gray-900">
                Frequently Asked Questions (FAQ)
              </h3>
              <div className="space-y-2">
                {seoDetails.faqs.map((faq, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg p-3 text-xs">
                    <strong className="font-bold text-gray-900 block mb-1">
                      Q: {faq.question}
                    </strong>
                    <p className="text-gray-600 leading-normal">
                      A: {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </main>

      </div>
    </div>
  );
}
