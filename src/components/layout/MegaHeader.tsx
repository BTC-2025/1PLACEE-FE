"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  ShoppingCart, 
  MapPin, 
  Menu, 
  User, 
  ChevronDown, 
  Sparkles,
  Zap,
  Globe
} from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

const CATEGORIES = [
  "All Categories",
  "Smart Electronics",
  "Fashion & Apparel",
  "Home & Living",
  "Beauty & Care",
  "Books & Media",
  "AI Gadgets",
  "Groceries & Gourmet"
];

export const MegaHeader: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const totalItems = useCartStore((state) => state.totalItems());
  const toggleCart = useCartStore((state) => state.toggleCart);

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* Top tier brand banner */}
      <div className="bg-brand-dark text-white px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 text-xs md:text-sm">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1 group">
            <div className="bg-gradient-to-r from-brand-orange to-brand-yellow text-brand-dark font-black text-xl px-2.5 py-0.5 rounded tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
              1PLACE
            </div>
            <span className="hidden lg:inline-block text-[11px] font-semibold tracking-wide text-brand-yellow uppercase">
              Universal Store
            </span>
          </Link>

          {/* Delivery Location Selector */}
          <button className="hidden md:flex items-center gap-1.5 p-1.5 rounded hover:outline hover:outline-1 hover:outline-white/80 transition text-left">
            <MapPin className="w-4 h-4 text-brand-yellow shrink-0 animate-bounce" />
            <div className="leading-tight">
              <span className="text-[10px] text-gray-300 block">Deliver to</span>
              <span className="font-bold text-xs truncate max-w-[120px] block text-white">Select Location</span>
            </div>
          </button>
        </div>

        {/* Global Search Bar (Amazon style) */}
        <div className="flex-1 max-w-3xl mx-1 md:mx-4">
          <div className="flex w-full h-10 rounded-md overflow-hidden bg-white shadow-inner focus-within:ring-2 focus-within:ring-brand-orange">
            {/* Category Dropdown */}
            <div className="relative bg-gray-100 hover:bg-gray-200 border-r border-gray-300 flex items-center px-2 cursor-pointer transition">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-xs text-gray-800 font-medium cursor-pointer outline-none pr-4 py-1"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder="Search 1PLACE (e.g., iPhone 16 Pro, Sony WH-1000XM5, Sneaker drops...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />

            {/* Search Button */}
            <button
              aria-label="Search"
              className="bg-brand-yellow hover:bg-brand-orange text-brand-dark px-5 flex items-center justify-center transition-colors font-bold"
            >
              <Search className="w-5 h-5 text-brand-dark" />
            </button>
          </div>
        </div>

        {/* Right Action Icons: Language, Account, Orders, Cart */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {/* Language selector */}
          <button className="hidden sm:flex items-center gap-1 p-1.5 rounded hover:outline hover:outline-1 hover:outline-white/70 transition">
            <Globe className="w-4 h-4 text-gray-300" />
            <span className="font-bold text-xs uppercase">EN</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          {/* User Account */}
          <button className="flex items-center gap-1.5 p-1.5 rounded hover:outline hover:outline-1 hover:outline-white/70 transition text-left">
            <User className="w-5 h-5 text-gray-300 md:hidden" />
            <div className="hidden md:block leading-tight">
              <span className="text-[10px] text-gray-300 block">Hello, Sign In</span>
              <span className="font-bold text-xs block text-white flex items-center gap-0.5">
                Account & Lists <ChevronDown className="w-3 h-3 text-gray-400" />
              </span>
            </div>
          </button>

          {/* Orders */}
          <button className="hidden lg:block p-1.5 rounded hover:outline hover:outline-1 hover:outline-white/70 transition text-left leading-tight">
            <span className="text-[10px] text-gray-300 block">Returns</span>
            <span className="font-bold text-xs block text-white">& Orders</span>
          </button>

          {/* Universal Cart Button */}
          <button
            onClick={() => toggleCart()}
            className="flex items-center gap-1.5 bg-brand-lightNavy/80 hover:bg-brand-lightNavy px-3 py-1.5 rounded-lg border border-white/20 hover:border-brand-yellow transition relative"
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-white" />
              <span className="absolute -top-2 -right-2.5 bg-brand-orange text-brand-dark font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                {totalItems}
              </span>
            </div>
            <span className="hidden sm:inline font-bold text-sm text-brand-yellow">Cart</span>
          </button>
        </div>
      </div>

      {/* Sub-bar / Quick Category Navigation */}
      <div className="bg-brand-lightNavy text-white px-3 sm:px-6 py-1.5 flex items-center justify-between text-xs font-medium overflow-x-auto gap-4 scrollbar-none">
        <div className="flex items-center gap-4 shrink-0">
          <button className="flex items-center gap-1.5 font-bold hover:text-brand-yellow transition">
            <Menu className="w-4 h-4" /> All Departments
          </button>
          <span className="hover:text-brand-yellow cursor-pointer flex items-center gap-1 text-brand-yellow font-semibold">
            <Zap className="w-3.5 h-3.5 fill-brand-yellow" /> Lightning Deals
          </span>
          <span className="hover:text-brand-yellow cursor-pointer">Best Sellers</span>
          <span className="hover:text-brand-yellow cursor-pointer">New Releases</span>
          <span className="hover:text-brand-yellow cursor-pointer hidden md:inline">Universal Prime</span>
          <span className="hover:text-brand-yellow cursor-pointer hidden md:inline">Gift Ideas</span>
          <span className="hover:text-brand-yellow cursor-pointer hidden lg:inline">Customer Service</span>
        </div>
        <div className="shrink-0 flex items-center gap-1 text-brand-orange font-bold text-[11px]">
          <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
          <span>Universal 1-Hour Delivery Active</span>
        </div>
      </div>
    </header>
  );
};
