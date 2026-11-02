"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Clock,
  Plus,
  Check,
  Sparkles,
  ArrowRight,
  Grid,
  Apple,
  UtensilsCrossed,
  Milk,
  Cookie,
  Coffee,
  Sparkle,
  ShoppingBag,
  PackageCheck,
  Wheat,
  Search,
} from "lucide-react";
import {
  BLINKIT_CATEGORIES,
  CATEGORY_PRODUCTS_DATABASE,
  CategoryGroup,
  CategorySubItem,
  CategoryProduct,
} from "@/data/blinkitCategoryData";
import { CATEGORY_SEO_ARTICLES } from "@/data/blinkitSeoData";
import { useCartStore } from "@/stores/cartStore";

// Lucide icon helper mapping for sleek category sidebar
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "vegetables-fruits": <Apple className="w-5 h-5 text-emerald-600" />,
  "dairy-breakfast": <Milk className="w-5 h-5 text-blue-600" />,
  "munchies": <Cookie className="w-5 h-5 text-amber-600" />,
  "cold-drinks-juices": <Coffee className="w-5 h-5 text-orange-600" />,
  "instant-food": <UtensilsCrossed className="w-5 h-5 text-rose-600" />,
  "bakery-biscuits": <Cookie className="w-5 h-5 text-yellow-700" />,
  "tea-coffee": <Coffee className="w-5 h-5 text-stone-700" />,
  "atta-rice-dal": <Wheat className="w-5 h-5 text-amber-700" />,
  "cleaning-essentials": <Sparkle className="w-5 h-5 text-cyan-600" />,
  "personal-care": <ShoppingBag className="w-5 h-5 text-purple-600" />,
};

export default function CategoryMasterPage() {
  // Left Sidebar active category
  const [activeCatId, setActiveCatId] = useState<string>("vegetables-fruits");
  // If user clicks on a subcategory to view its products directly
  const [selectedSubCatId, setSelectedSubCatId] = useState<string | null>(null);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const addToCart = useCartStore((state) => state.addToCart);

  // Active Category Group
  const activeCategory: CategoryGroup =
    BLINKIT_CATEGORIES.find((c) => c.id === activeCatId) || BLINKIT_CATEGORIES[0];

  // If a subcategory is explicitly chosen, find it; otherwise show all subcategories of current category
  const activeSubcategory = selectedSubCatId
    ? activeCategory.subcategories.find((s) => s.id === selectedSubCatId)
    : null;

  // Products to display when in product view
  const currentProducts: CategoryProduct[] = selectedSubCatId
    ? CATEGORY_PRODUCTS_DATABASE[selectedSubCatId] ||
      CATEGORY_PRODUCTS_DATABASE["instant-noodles"] ||
      []
    : [];

  const seoDetails =
    CATEGORY_SEO_ARTICLES[selectedSubCatId || "instant-noodles"] ||
    CATEGORY_SEO_ARTICLES["instant-noodles"];

  const handleSelectCategory = (catId: string) => {
    setActiveCatId(catId);
    setSelectedSubCatId(null); // Return to subcategories grid view when switching main category
  };

  const handleSelectSubcategory = (subId: string) => {
    setSelectedSubCatId(subId);
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
      category: activeCategory.name,
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
    <div className="w-full bg-[#f4f7fb] min-h-screen text-[#0F1111] pb-16">
      
      {/* TOP BREADCRUMB / STATUS BAR */}
      <div className="bg-white border-b border-gray-200 sticky top-[64px] z-30 px-3 sm:px-6 py-2.5 shadow-xs">
        <div className="max-w-[1540px] mx-auto flex items-center justify-between flex-wrap gap-2">
          
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#1559ac] font-medium transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <button
              onClick={() => setSelectedSubCatId(null)}
              className={`font-semibold hover:text-[#1559ac] transition cursor-pointer ${
                selectedSubCatId ? "text-gray-500" : "text-[#1559ac]"
              }`}
            >
              All Categories
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-bold text-gray-900">{activeCategory.name}</span>
            {activeSubcategory && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {activeSubcategory.name}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant 8 Mins Delivery</span>
            </div>
            <span className="text-xs text-gray-500 font-medium hidden sm:inline">
              100% Genuine & Fresh
            </span>
          </div>

        </div>
      </div>

      {/* MAIN 2-COLUMN AMAZON / BLINKIT SPLIT CONTAINER */}
      <div className="max-w-[1540px] mx-auto px-2 sm:px-4 lg:px-6 pt-3 flex flex-col md:flex-row gap-3 items-start">
        
        {/* ============================================================== */}
        {/* LEFT SIDEBAR: ALL CATEGORIES (Exact Match to Image 2 Left Rail)*/}
        {/* ============================================================== */}
        <aside className="w-full md:w-[220px] lg:w-[240px] shrink-0 bg-white rounded-xl border border-gray-200 shadow-xs md:sticky md:top-[124px] max-h-[calc(100vh-140px)] overflow-y-auto flex md:flex-col overflow-x-auto p-1.5 gap-1">
          <div className="hidden md:flex items-center justify-between px-3 py-2 border-b border-gray-100 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Categories
            </span>
            <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
              {BLINKIT_CATEGORIES.length}
            </span>
          </div>

          {BLINKIT_CATEGORIES.map((cat) => {
            const isActive = activeCatId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition cursor-pointer shrink-0 md:shrink md:w-full group relative ${
                  isActive
                    ? "bg-[#e9f4ff] text-[#1559ac] font-bold border-l-4 border-[#1559ac] shadow-xs"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-950 font-medium"
                }`}
              >
                {/* Icon thumbnail */}
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-lg transition ${
                    isActive
                      ? "bg-white shadow-xs border border-blue-200"
                      : "bg-gray-100 group-hover:bg-white border border-transparent"
                  }`}
                >
                  {CATEGORY_ICONS[cat.id] || <span>{cat.icon}</span>}
                </div>

                <div className="flex-1 min-w-0 pr-1">
                  <div className="text-xs sm:text-[13px] leading-tight truncate">
                    {cat.name}
                  </div>
                  <div className="text-[10px] text-gray-400 font-normal mt-0.5">
                    {cat.subcategories.length} sub-items
                  </div>
                </div>

                {/* Active arrow indicator */}
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition ${
                    isActive ? "text-[#1559ac] translate-x-0.5" : "text-gray-300 opacity-0 group-hover:opacity-100"
                  }`}
                />
              </button>
            );
          })}
        </aside>

        {/* ============================================================== */}
        {/* RIGHT SIDE: SUBCATEGORIES GRID / PRODUCTS (Matching Image 2)   */}
        {/* ============================================================== */}
        <main className="flex-1 w-full bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-xs min-h-[500px]">
          
          {/* If NO subcategory is selected, show ALL SUBCATEGORIES AS RICH CARDS (Exact match to Image 2!) */}
          {!selectedSubCatId ? (
            <div className="space-y-6">
              
              {/* Category Title Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{activeCategory.icon}</span>
                    <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                      {activeCategory.name}
                    </h1>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Select a sub-category below to explore fresh products, brands and deals
                  </p>
                </div>
                
                <span className="text-xs font-bold bg-blue-50 text-[#1559ac] border border-blue-200 px-3 py-1.5 rounded-full">
                  {activeCategory.subcategories.length} Sub-Categories
                </span>
              </div>

              {/* Subcategories Grid (Image 2 style: rounded white card, crisp clean product photo, clear bold title) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4">
                {activeCategory.subcategories.map((sub: CategorySubItem) => (
                  <button
                    key={sub.id}
                    onClick={() => handleSelectSubcategory(sub.id)}
                    className="group bg-white border border-gray-200 hover:border-[#1559ac] rounded-xl p-3 flex flex-col items-center text-center transition hover:shadow-lg cursor-pointer relative overflow-hidden"
                  >
                    {/* Top subtle highlight */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#1559ac] transition" />

                    {/* Subcategory Image Container */}
                    <div className="w-full aspect-square max-w-[140px] bg-gray-50 rounded-xl overflow-hidden mb-3 p-2 flex items-center justify-center border border-gray-100 group-hover:border-blue-100 transition">
                      {sub.image ? (
                        <img
                          src={sub.image}
                          alt={sub.name}
                          className="w-full h-full object-cover rounded-lg group-hover:scale-108 transition duration-300"
                        />
                      ) : (
                        <span className="text-4xl">{activeCategory.icon}</span>
                      )}
                    </div>

                    {/* Subcategory Name */}
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#1559ac] transition line-clamp-2 leading-snug">
                      {sub.name}
                    </h3>

                    {/* Explore Link Pill */}
                    <div className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-gray-400 group-hover:text-[#1559ac] transition">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                    </div>
                  </button>
                ))}
              </div>

              {/* All Other Category Highlights Carousel / Group Preview (Image 2 also shows grouped sections like Biscuits, Drinks below) */}
              <div className="pt-6 border-t border-gray-200 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">
                    Popular in Other Categories
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {BLINKIT_CATEGORIES.filter((c) => c.id !== activeCatId)
                    .slice(0, 6)
                    .map((otherCat) => (
                      <button
                        key={otherCat.id}
                        onClick={() => handleSelectCategory(otherCat.id)}
                        className="p-3 bg-gray-50 hover:bg-[#e9f4ff] border border-gray-200 hover:border-blue-300 rounded-xl flex flex-col items-center text-center transition cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-xl shadow-xs mb-2 group-hover:scale-110 transition">
                          {CATEGORY_ICONS[otherCat.id] || otherCat.icon}
                        </div>
                        <span className="text-xs font-bold text-gray-800 group-hover:text-[#1559ac] line-clamp-1">
                          {otherCat.name}
                        </span>
                        <span className="text-[10px] text-gray-400 mt-0.5">
                          {otherCat.subcategories.length} sub-items
                        </span>
                      </button>
                    ))}
                </div>
              </div>

            </div>
          ) : (
            
            /* ============================================================== */
            /* SUBCATEGORY DETAIL VIEW: Shows Products Grid + SEO Write-Up    */
            /* ============================================================== */
            <div className="space-y-6">
              
              {/* Back to all subcategories bar + subcategory title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-200 gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedSubCatId(null)}
                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition cursor-pointer text-xs font-bold flex items-center gap-1 shrink-0"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    <span>Back to {activeCategory.name}</span>
                  </button>

                  <div>
                    <h1 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                      {activeSubcategory?.name || "Products"}
                    </h1>
                    <p className="text-xs text-gray-500">
                      Delivered in 8-10 mins directly from 1PLACE Darkstore
                    </p>
                  </div>
                </div>

                {/* Subcategory Pills Carousel for quick switching within the category */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full sm:max-w-md">
                  {activeCategory.subcategories.map((sub) => {
                    const isCur = selectedSubCatId === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setSelectedSubCatId(sub.id)}
                        className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap transition cursor-pointer font-bold ${
                          isCur
                            ? "bg-[#1559ac] text-white shadow-xs"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        {sub.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Product Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
                {currentProducts.map((item) => {
                  const isAdded = addedItemIds[item.id];
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl border border-gray-200 hover:border-emerald-500 p-2.5 flex flex-col justify-between hover:shadow-md transition group relative"
                    >
                      {item.discountBadge && (
                        <div className="absolute top-2 left-2 z-10 bg-[#1559ac] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-xs">
                          {item.discountBadge}
                        </div>
                      )}

                      <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-100 w-fit px-1.5 py-0.5 rounded mb-2">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        <span>{item.deliveryTime}</span>
                      </div>

                      <div className="w-full h-28 sm:h-32 flex items-center justify-center p-1 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                        />
                      </div>

                      <div className="pt-2 flex-1 flex flex-col">
                        <h3 className="text-xs font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-[#1559ac] transition">
                          {item.name}
                        </h3>
                        <span className="text-[11px] text-gray-500 font-medium mt-1">
                          {item.weight}
                        </span>
                      </div>

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

              {/* SEO Content Write-up */}
              <div className="pt-8 border-t border-gray-200 space-y-5 text-gray-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h2 className="text-base sm:text-lg font-bold text-gray-950">
                    {seoDetails.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {seoDetails.intro}
                </p>

                <div className="space-y-3">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 border-l-4 border-[#1559ac] pl-2.5">
                    Types of Items Available
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
              </div>

            </div>
          )}

        </main>

      </div>
    </div>
  );
}
