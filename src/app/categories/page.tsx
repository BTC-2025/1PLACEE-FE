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
  ShoppingCart,
  Shirt,
  Tv,
  Home,
  Wrench,
  Armchair,
  Flower2,
  BookOpen,
  Baby,
  ArrowLeft,
  Heart,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react";
import {
  BLINKIT_CATEGORIES,
  CATEGORY_PRODUCTS_DATABASE,
  CategoryGroup,
  CategorySubItem,
  CategoryProduct,
} from "@/data/blinkitCategoryData";
import { CATEGORY_SEO_ARTICLES } from "@/data/blinkitSeoData";
import { GROCERY_SECTIONS } from "@/data/grocerySectionsData";
import { FASHION_SECTIONS } from "@/data/fashionSectionsData";
import { useCartStore } from "@/stores/cartStore";

// Lucide icon helper mapping for left vertical rail matching Image 1 exactly
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "groceries": <ShoppingCart className="w-5 h-5 stroke-[2.2]" />,
  "fashion": <Shirt className="w-5 h-5 stroke-[2.2]" />,
  "electronics": <Tv className="w-5 h-5 stroke-[2.2]" />,
  "home-lifestyle": <Home className="w-5 h-5 stroke-[2.2]" />,
  "industrial-professional": <Wrench className="w-5 h-5 stroke-[2.2]" />,
  "furniture": <Armchair className="w-5 h-5 stroke-[2.2]" />,
  "beauty-personal-care": <Flower2 className="w-5 h-5 stroke-[2.2]" />,
  "stationery-books": <BookOpen className="w-5 h-5 stroke-[2.2]" />,
  "baby-kids": <Baby className="w-5 h-5 stroke-[2.2]" />,
};

// Subcategories specific to Fresh Fruits matching image 1
const FRUITS_SUBRAIL = [
  { id: "fresh-fruits", name: "Fresh Fruits", image: "/products/fruits/fruit-fresh.png" },
  { id: "premium-fruits", name: "Premium Fruits", image: "/products/fruits/fruit-premium.png" },
  { id: "papaya", name: "Papaya", image: "/products/fruits/fruit-papaya.png" },
  { id: "citrus-fruits", name: "Citrus Fruits", image: "/products/fruits/fruit-citrus.png" },
  { id: "apples", name: "Apples", image: "/products/fruits/fruit-apples.png" },
  { id: "others", name: "Others", image: "/products/fruits/fruit-others.png" },
];

export default function CategoryMasterPage() {
  // Left Sidebar active category - defaults to 'groceries' from Image 1
  const [activeCatId, setActiveCatId] = useState<string>("groceries");
  // If user clicks on a subcategory to view its products directly
  const [selectedSubCatId, setSelectedSubCatId] = useState<string | null>(null);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [selectedFruitSub, setSelectedFruitSub] = useState("fresh-fruits");

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
      CATEGORY_PRODUCTS_DATABASE["fresh-fruits"] ||
      CATEGORY_PRODUCTS_DATABASE["chips-crisps"] ||
      []
    : [];

  const seoDetails =
    CATEGORY_SEO_ARTICLES[selectedSubCatId || "fresh-fruits"] ||
    CATEGORY_SEO_ARTICLES["fresh-vegetables"] || {
      title: "Fresh & Quality Products at 1PLACE",
      intro: "Browse authentic top brands with lightning delivery directly to your door.",
      typesOfItems: [
        { title: "Wide Variety", desc: "Choose from high quality verified items." },
        { title: "Fast Delivery", desc: "Delivered straight from our nearest darkstore." },
      ],
    };

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
    <div className="w-full bg-[#f8fbff] min-h-screen text-[#0F1111] pb-16">
      
      {/* MAIN 2-COLUMN VIEW (LEFT ICON RAIL + RIGHT CONTENT) */}
      <div className="max-w-[1580px] mx-auto px-2 sm:px-4 lg:px-6 pt-4 flex flex-col md:flex-row gap-4 items-start">
        
        {/* ============================================================== */}
        {/* LEFT SIDEBAR: DYNAMIC SINGLE RAIL                             */}
        {/* State 1: When on Category list -> Shows Groceries, Fashion... (Image 2) */}
        {/* State 2: When Fresh Fruits clicked -> Directly transforms to   */}
        {/*          Fresh Fruits, Premium Fruits, Papaya... (Image 1)     */}
        {/* ============================================================== */}
        <aside className="w-full md:w-[98px] lg:w-[108px] shrink-0 bg-white rounded-2xl border border-[#e2eaf4] shadow-xs md:sticky md:top-[74px] max-h-[calc(100vh-90px)] overflow-y-auto no-scrollbar flex md:flex-col overflow-x-auto p-1.5 gap-2">
          {selectedSubCatId ? (
            /* Fruit Subcategory Rail (Replaces main categories in place, exactly matching Image 1!) */
            FRUITS_SUBRAIL.map((sub) => {
              const isSelected = selectedFruitSub === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedFruitSub(sub.id)}
                  className={`relative flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all cursor-pointer group shrink-0 md:shrink md:w-full ${
                    isSelected
                      ? "bg-[#eaf4fe] text-[#0284c7] font-bold"
                      : "text-[#334155] hover:text-[#0284c7] hover:bg-slate-50 font-medium"
                  }`}
                >
                  {/* Active Indicator Bar on Left */}
                  {isSelected && (
                    <span className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#0284c7] rounded-r-md" />
                  )}

                  {/* Clean High-Resolution Fruit Icon */}
                  <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-105 mb-1.5">
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="max-w-[46px] max-h-[46px] object-contain drop-shadow-xs"
                    />
                  </div>

                  {/* Fruit Label */}
                  <span
                    className={`text-[12px] leading-tight text-center px-0.5 ${
                      isSelected ? "text-[#0284c7] font-bold" : "text-[#1e293b]"
                    }`}
                  >
                    {sub.name}
                  </span>
                </button>
              );
            })
          ) : (
            /* Main Categories Rail (Groceries, Fashion, Electronics... Image 2) */
            BLINKIT_CATEGORIES.map((cat) => {
              const isActive = activeCatId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`relative flex flex-col items-center justify-center p-2.5 rounded-xl transition-all cursor-pointer group shrink-0 md:shrink md:w-full ${
                    isActive
                      ? "bg-[#eaf4fe] text-[#0284c7] font-bold"
                      : "text-[#64748b] hover:text-[#0f172a] hover:bg-slate-50 font-medium"
                  }`}
                >
                  {/* Active Indicator Bar on Left */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#0284c7] rounded-r-md" />
                  )}

                  {/* Category Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isActive
                        ? "text-[#0284c7]"
                        : "text-[#64748b] group-hover:text-[#0f172a]"
                    }`}
                  >
                    {CATEGORY_ICONS[cat.id] || <span className="text-xl">{cat.icon}</span>}
                  </div>

                  {/* Category Label */}
                  <span className="text-[11px] leading-tight text-center mt-1 px-0.5 line-clamp-2">
                    {cat.name}
                  </span>
                </button>
              );
            })
          )}
        </aside>

        {/* ============================================================== */}
        {/* RIGHT SIDE: SUBCATEGORIES GRID / PRODUCTS (MATCHING IMAGE 1)    */}
        {/* ============================================================== */}
        <main className="flex-1 w-full bg-white rounded-2xl border border-[#e2eaf4] p-4 sm:p-6 shadow-xs min-h-[550px]">
          
          {/* If NO subcategory is selected, show SUBCATEGORIES matching Image 1 layout */}
          {!selectedSubCatId ? (
            <div className="space-y-6">
              
              {/* Subcategories Sections */}
              {activeCategory.id === "groceries" ? (
                <div className="space-y-8">
                  {GROCERY_SECTIONS.map((section) => (
                    <div key={section.id} className="space-y-3">
                      <h2 className="text-xl sm:text-2xl font-black text-[#2d3748] tracking-tight">
                        {section.title}
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {section.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleSelectSubcategory(item.id)}
                            className="group flex flex-col items-center text-center cursor-pointer transition"
                          >
                            {/* Rounded Square Card with crisp border */}
                            <div className="w-full aspect-square max-w-[155px] bg-white border border-[#e2e8f0] group-hover:border-[#0284c7] rounded-3xl p-3.5 flex items-center justify-center transition-all duration-200 shadow-xs group-hover:shadow-sm">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-contain group-hover:scale-105 transition duration-300 drop-shadow-xs"
                                />
                              ) : (
                                <span className="text-4xl">{activeCategory.icon}</span>
                              )}
                            </div>

                            {/* Card below name */}
                            <span className="mt-2 text-xs sm:text-[13px] font-medium text-[#2d3748] group-hover:text-[#0284c7] transition line-clamp-2">
                              {item.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : activeCategory.id === "fashion" ? (
                /* Fashion category sections matching uploaded images */
                <div className="space-y-8">
                  {FASHION_SECTIONS.map((section) => (
                    <div key={section.id} className="space-y-3">
                      <h2 className="text-xl sm:text-2xl font-black text-[#2d3748] tracking-tight">
                        {section.title}
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {section.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleSelectSubcategory(item.id)}
                            className="group flex flex-col items-center text-center cursor-pointer transition"
                          >
                            {/* Rounded Square Card with crisp border */}
                            <div className="w-full aspect-square max-w-[155px] bg-white border border-[#e2e8f0] group-hover:border-[#0284c7] rounded-3xl p-3.5 flex items-center justify-center transition-all duration-200 shadow-xs group-hover:shadow-sm">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-contain group-hover:scale-105 transition duration-300 drop-shadow-xs"
                                />
                              ) : (
                                <span className="text-4xl">{activeCategory.icon}</span>
                              )}
                            </div>

                            {/* Card below name */}
                            <span className="mt-2 text-xs sm:text-[13px] font-medium text-[#2d3748] group-hover:text-[#0284c7] transition line-clamp-2">
                              {item.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Other Categories standard grouped view */
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-bold text-[#2d3748] tracking-tight">
                    {activeCategory.name} Collections
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {activeCategory.subcategories.map((sub: CategorySubItem) => (
                      <button
                        key={sub.id}
                        onClick={() => handleSelectSubcategory(sub.id)}
                        className="group flex flex-col items-center text-center cursor-pointer transition"
                      >
                        <div className="w-full aspect-square max-w-[155px] bg-white border border-gray-200 group-hover:border-[#0284c7] rounded-3xl p-3 flex items-center justify-center shadow-xs group-hover:shadow-md transition-all duration-200 overflow-hidden">
                          {sub.image ? (
                            <img
                              src={sub.image}
                              alt={sub.name}
                              className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                            />
                          ) : (
                            <span className="text-4xl">{activeCategory.icon}</span>
                          )}
                        </div>
                        <span className="mt-2 text-xs sm:text-[13px] font-medium text-[#2d3748] group-hover:text-[#0284c7] transition line-clamp-2">
                          {sub.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            
            /* ============================================================== */
            /* SUBCATEGORY DETAIL VIEW: EXACT MATCH TO USER'S UPLOADED SCREENSHOT */
            /* ============================================================== */
            <div className="space-y-4">
              
              {/* Top Navigation Row: Back Arrow + Category Title */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedSubCatId(null)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-[#0f172a] transition cursor-pointer"
                  title="Back to Categories"
                >
                  <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
                </button>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
                  {FRUITS_SUBRAIL.find(f => f.id === selectedFruitSub)?.name || activeSubcategory?.name || "Fresh Fruits"}
                </h1>
              </div>

              {/* Main Content: Filter Pills Bar + Grid of Products (Right side content occupies full width smoothly) */}
              <div className="space-y-4 pt-1">
                
                {/* Filter Pills Bar (Sort by, Brands, Price, Discount, All Filters with red dot) */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold text-[#334155]">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:border-gray-400 transition cursor-pointer shrink-0">
                    <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
                    <span>Sort by</span>
                  </button>

                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:border-gray-400 transition cursor-pointer shrink-0">
                    <span>Brands</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:border-gray-400 transition cursor-pointer shrink-0">
                    <span>Price</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:border-gray-400 transition cursor-pointer shrink-0">
                    <span>Discount</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#0284c7] bg-white text-[#0284c7] font-bold hover:bg-blue-50 transition cursor-pointer shrink-0 ml-auto sm:ml-0">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>All Filters</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  </button>
                </div>

                {/* Products Grid matching exact image (5 cards per row, top-right heart icon, veg green square dot, Add button) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
                    {currentProducts.map((item) => {
                      const isAdded = addedItemIds[item.id];
                      return (
                        <div
                          key={item.id}
                          className="bg-white rounded-2xl border border-gray-200 hover:border-[#0284c7]/40 p-2.5 flex flex-col justify-between transition-all hover:shadow-md group relative"
                        >
                          {/* Heart wishlist button at top-left */}
                          <button
                            title="Add to Wishlist"
                            className="absolute top-2.5 left-2.5 z-10 w-6 h-6 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 transition cursor-pointer"
                          >
                            <Heart className="w-4 h-4 fill-transparent stroke-[2]" />
                          </button>

                          {/* Product Image Box */}
                          <div className="w-full aspect-square rounded-xl bg-white flex items-center justify-center p-1 overflow-hidden relative mb-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* Weight + Veg Symbol + Add Button Row */}
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span className="text-[11px] font-semibold text-gray-500">
                              {item.weight}
                            </span>

                            <div className="flex items-center gap-1.5">
                              {/* Green Veg Indicator Icon */}
                              <div className="w-3.5 h-3.5 border border-emerald-600 p-[1.5px] rounded-[2px] flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                              </div>

                              {/* Add Button */}
                              <button
                                onClick={() => handleAddProduct(item)}
                                className={`px-3 py-0.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                                  isAdded
                                    ? "bg-emerald-600 text-white"
                                    : "border border-[#0284c7] text-[#0284c7] hover:bg-[#0284c7] hover:text-white"
                                }`}
                              >
                                {isAdded ? "Added" : "Add"}
                              </button>
                            </div>
                          </div>

                          {/* Price Row: Bold Black Price + Strikethrough Original Price */}
                          <div className="flex items-baseline gap-1.5 mt-0.5">
                            <span className="text-base sm:text-lg font-black text-[#0f172a]">
                              ₹{item.price.toLocaleString("en-IN")}
                            </span>
                            {item.originalPrice > item.price && (
                              <span className="text-xs text-gray-400 line-through">
                                ₹{item.originalPrice.toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>

                          {/* Product Title */}
                          <h3 className="text-xs text-gray-700 font-medium line-clamp-2 leading-tight mt-1">
                            {item.name}
                          </h3>

                          {/* Optional delivery tag if applicable */}
                          {item.deliveryTime && (
                            <span className="text-[10px] text-gray-400 mt-1 block">
                              + {item.deliveryTime}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                </div>

            </div>
          )}

        </main>

      </div>

    </div>
  );
}
