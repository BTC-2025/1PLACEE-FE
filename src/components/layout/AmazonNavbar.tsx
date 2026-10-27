"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  ChevronDown,
  Heart,
  ShoppingBag,
  User,
  X,
  Headset,
  Settings
} from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

// Subnav links strictly matching user prompt & sketch
const SUB_NAV_LINKS = [
  { label: "Bestsellers", href: "#" },
  { label: "Today Deals", href: "#" },
  { label: "Coupons", href: "#" },
  { label: "New Release", href: "#" },
  { label: "Buy Again", href: "#" },
];

export const AmazonNavbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Home" | "Categorys" | "Bookings">("Home");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());
  const toggleCart = useCartStore((state) => state.toggleCart);

  return (
    <>
      <header className="sticky top-0 z-50 w-full select-none text-white text-xs font-sans shadow-md">
        {/* Tier 1: Top Navbar with Royal Blue (#1559ac) background from image 3 and pill container layout from image 2 */}
        <div className="bg-[#1559ac] px-3 sm:px-6 py-2 flex items-center justify-between h-[64px] border-b border-[#124b91] relative">
          {/* Left Group: 1PLACE Logo Capsule + Location Pill */}
          <div className="flex items-center gap-2.5 shrink-0 z-10">
            {/* 1PLACEE Logo Pill Container - Exactly matching user pencil sketch & prompt */}
            <Link
              href="/"
              className="bg-white px-3.5 py-1.5 rounded-full flex items-center shadow-xs hover:shadow-md transition group select-none"
            >
              <svg
                className="h-8 w-auto overflow-visible"
                viewBox="0 0 162 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 1. Bold Solid '1' in Red-Orange (#ff4500) matching drawing */}
                <path
                  d="M6 19 L15 7 L23 7 L23 34 L15 34 L15 15 L9 21 Z"
                  fill="#ff4500"
                />

                {/* 2. Seamless Solid Underline Border in Orange (#ff4500) attached to 1 */}
                <rect
                  x="6"
                  y="34"
                  width="152"
                  height="6"
                  rx="1"
                  fill="#ff4500"
                />

                {/* 3. 'PLACEE' Word in Solid Royal Blue (#1559ac) with NO GAPS between letters */}
                {/* P */}
                <g transform="translate(25, 13)">
                  <rect x="0" y="0" width="5.5" height="21" fill="#1559ac" />
                  <path d="M5.5 0 H14.5 C18 0 20 2.5 20 6 C20 9.5 18 12 14.5 12 H5.5 Z M5.5 4.5 V7.5 H13 C14.5 7.5 15.5 7 15.5 6 C15.5 5 14.5 4.5 13 4.5 Z" fill="#1559ac" />
                </g>

                {/* L */}
                <g transform="translate(48, 13)">
                  <rect x="0" y="0" width="5.5" height="21" fill="#1559ac" />
                  <rect x="5.5" y="16.5" width="13" height="4.5" fill="#1559ac" />
                </g>

                {/* A */}
                <g transform="translate(69, 13)">
                  <path d="M0 21 L8 0 H14 L22 21 H16.5 L15 16 H7 L5.5 21 Z M8.2 12 H13.8 L11 4 Z" fill="#1559ac" />
                </g>

                {/* C */}
                <g transform="translate(93, 13)">
                  <path d="M19 4.5 C17.5 1.5 14 0 10.5 0 C4.5 0 0 4.5 0 10.5 C0 16.5 4.5 21 10.5 21 C14 21 17.5 19.5 19 16.5 L14.5 14 C13.5 15.5 12 16.5 10.5 16.5 C7 16.5 5 14 5 10.5 C5 7 7 4.5 10.5 4.5 C12 4.5 13.5 5.5 14.5 7 Z" fill="#1559ac" />
                </g>

                {/* First E (with shorter middle arm) */}
                <g transform="translate(114, 13)">
                  <rect x="0" y="0" width="5.5" height="21" fill="#1559ac" />
                  <rect x="5.5" y="0" width="14" height="4.5" fill="#1559ac" />
                  <rect x="5.5" y="8.2" width="9.5" height="4.5" fill="#1559ac" />
                  <rect x="5.5" y="16.5" width="14" height="4.5" fill="#1559ac" />
                </g>

                {/* Second E (with shorter middle arm) */}
                <g transform="translate(136, 13)">
                  <rect x="0" y="0" width="5.5" height="21" fill="#1559ac" />
                  <rect x="5.5" y="0" width="14" height="4.5" fill="#1559ac" />
                  <rect x="5.5" y="8.2" width="9.5" height="4.5" fill="#1559ac" />
                  <rect x="5.5" y="16.5" width="14" height="4.5" fill="#1559ac" />
                </g>
              </svg>
            </Link>

            {/* Location Pill */}
            <button className="bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 transition border border-white/20">
              <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
              <span className="font-bold text-xs truncate max-w-[130px]">Chennai, TN</span>
              <ChevronDown className="w-3 h-3 text-white/80" />
            </button>
          </div>

          {/* Center Group: Eclipse Container with Three Buttons: Home, Categorys, Bookings - FIXED STATIC CENTER */}
          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 bg-[#0d4285] p-1 rounded-full border border-white/20 shadow-inner z-10 pointer-events-auto">
            <Link
              href="/"
              onClick={() => setActiveTab("Home")}
              className={`px-4 py-1.5 rounded-full font-bold text-xs transition duration-200 cursor-pointer ${activeTab === "Home"
                ? "bg-white text-[#1559ac] shadow-sm"
                : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
            >
              Home
            </Link>
            <Link
              href="/products/kotty-mens-jeans"
              onClick={() => setActiveTab("Categorys")}
              className={`px-4 py-1.5 rounded-full font-bold text-xs transition duration-200 cursor-pointer ${activeTab === "Categorys"
                ? "bg-white text-[#1559ac] shadow-sm"
                : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
            >
              Categorys
            </Link>
            <button
              onClick={() => setActiveTab("Bookings")}
              className={`px-4 py-1.5 rounded-full font-bold text-xs transition duration-200 cursor-pointer ${activeTab === "Bookings"
                ? "bg-white text-[#1559ac] shadow-sm"
                : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
            >
              Bookings
            </button>
          </div>

          {/* Right Group: Search Box + Wishlist + Cart + Profile with Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 z-20">
            {/* Search Box: Expands leftwards without pushing center container */}
            <div className="relative flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center bg-white rounded-full px-3 py-1 shadow-lg w-52 sm:w-64 border border-gray-300 animate-in fade-in zoom-in-95 duration-200">
                  <Search className="w-4 h-4 text-gray-500 mr-1.5 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search 1PLACE..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full text-xs text-gray-900 outline-none placeholder:text-gray-400 bg-transparent"
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="text-gray-400 hover:text-gray-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Open Search"
                  className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 text-gray-900 flex items-center justify-center shadow-xs transition hover:scale-105 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-gray-800 stroke-[2.5]" />
                </button>
              )}
            </div>

            {/* Wishlist Icon Button */}
            <button
              aria-label="Wishlist"
              className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 text-gray-900 flex items-center justify-center shadow-xs transition hover:scale-105 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-gray-800 stroke-[2.2] fill-transparent hover:fill-red-500 hover:text-red-500 transition-colors" />
            </button>

            {/* Cart Icon Button with Counter Badge */}
            <button
              onClick={() => toggleCart()}
              aria-label="Cart"
              className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 text-gray-900 flex items-center justify-center shadow-xs transition hover:scale-105 cursor-pointer relative"
            >
              <ShoppingBag className="w-4 h-4 text-gray-800 stroke-[2.2]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff9900] text-black font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {totalItems}
                </span>
              )}
            </button>

            {/* End Profile Capsule with Drop Arrow */}
            <button className="bg-white text-gray-900 pl-2 pr-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs hover:shadow-md transition hover:bg-gray-50 cursor-pointer">
              <div className="w-6 h-6 rounded-full bg-[#1559ac] text-white flex items-center justify-center font-bold text-xs">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-xs text-gray-900 max-w-[100px] truncate">
                Vinothkumar
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Tier 2: Subnav Ribbon - Exactly matching user pencil sketch & prompt */}
        <div className="bg-[#0f4484] px-3 sm:px-6 py-1 flex items-center justify-between text-xs overflow-x-auto whitespace-nowrap scrollbar-none h-[42px] border-t border-white/10">
          {/* Left Group: Light Curve Category Button with Down Arrow + Links */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Light Curve Category Button with Down Arrow (Pill from user sketch) */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition border border-white/25 shadow-xs cursor-pointer select-none"
            >
              <span>For you</span>
              <ChevronDown className="w-3.5 h-3.5 text-white/90 stroke-[2.5]" />
            </button>

            {/* Subnav links: Bestsellers, Today Deals, Coupons, New Release, Buy Again */}
            <div className="flex items-center gap-2 sm:gap-3">
              {SUB_NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:bg-white/10 px-2.5 py-1 rounded-md text-white/90 hover:text-white font-medium text-xs transition select-none"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Group: Help & Support with Word + Settings with Word */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Help & Support Customer Care Headset Button with Word */}
            <button
              aria-label="Help & Support"
              className="flex items-center gap-1.5 text-white/90 hover:text-white hover:bg-white/10 px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer select-none"
            >
              <Headset className="w-4 h-4 text-white stroke-[2.2]" />
              <span>Help&Support</span>
            </button>

            {/* Settings Button with Word */}
            <button
              aria-label="Settings"
              className="flex items-center gap-1.5 text-white/90 hover:text-white hover:bg-white/10 px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer select-none"
            >
              <Settings className="w-4 h-4 text-white stroke-[2]" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-in Hamburger Sidebar Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
          />
          <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 text-gray-900 overflow-y-auto">
            {/* User Greeting */}
            <div className="bg-[#1559ac] text-white p-4 flex items-center gap-3">
              <User className="w-7 h-7 bg-white/20 p-1 rounded-full" />
              <span className="font-bold text-base">Hello, Vinothkumar</span>
            </div>

            <div className="p-4 space-y-4 text-xs font-semibold">
              {/* 1. TRENDING */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                  Trending
                </h4>
                <div className="space-y-2 text-gray-700">
                  <p className="hover:bg-gray-100 p-1.5 rounded cursor-pointer">Bestsellers</p>
                  <p className="hover:bg-gray-100 p-1.5 rounded cursor-pointer">New Releases</p>
                  <p className="hover:bg-gray-100 p-1.5 rounded cursor-pointer">Movers and Shakers</p>
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* 2. YOUR VIEWS (5 Category Names) */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                  Your Views
                </h4>
                <div className="space-y-2 text-gray-700">
                  <p className="hover:bg-gray-100 p-1.5 rounded cursor-pointer">Recently Viewed Products</p>
                  <Link
                    href="/products/kotty-mens-jeans"
                    onClick={() => setIsSidebarOpen(false)}
                    className="hover:bg-blue-50 text-[#1559ac] font-bold p-1.5 rounded cursor-pointer block"
                  >
                    Men&apos;s Apparel, Chinos & Jeans →
                  </Link>
                  <p className="hover:bg-gray-100 p-1.5 rounded cursor-pointer">Wireless Headphones & Audio</p>
                  <p className="hover:bg-gray-100 p-1.5 rounded cursor-pointer">Laptops & Smart Electronics</p>
                  <p className="hover:bg-gray-100 p-1.5 rounded cursor-pointer">Haircare & Herbal Products</p>
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* 3. SHOP BY DEPARTMENT (7 Departments) */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                  Shop by Department
                </h4>
                <div className="space-y-2 text-gray-700">
                  <p className="hover:bg-gray-100 p-1.5 rounded cursor-pointer">Fresh & Grocery</p>
                  <p className="hover:bg-gray-100 p-1.5 rounded cursor-pointer">Mobiles & Computers</p>
                  <p className="hover:bg-gray-100 p-1.5 rounded cursor-pointer">TV, Appliances, Electronics</p>
                  <Link
                    href="/products/kotty-mens-jeans"
                    onClick={() => setIsSidebarOpen(false)}
                    className="hover:bg-blue-50 text-[#1559ac] font-bold p-1.5 rounded cursor-pointer block"
                  >
                    Men&apos;s Fashion & Trousers →
                  </Link>
                  <p className="hover:bg-gray-100 p-1.5 rounded cursor-pointer">Women&apos;s Fashion</p>
                  <p className="hover:bg-gray-100 p-1.5 rounded cursor-pointer">Home, Kitchen, Pets</p>
                  <p className="hover:bg-gray-100 p-1.5 rounded cursor-pointer">Beauty, Health & Personal Care</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-3 -right-10 text-white hover:text-[#febd69]"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
