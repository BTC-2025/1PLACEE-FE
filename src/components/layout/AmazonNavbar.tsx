"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  User,
  X,
  Bell,
  Headset,
  Settings
} from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

// Subnav categories & links from second image with scroll navigation
const SUB_NAV_LINKS = [
  { label: "Bestsellers", href: "#" },
  { label: "Today Deals", href: "#" },
  { label: "Coupons", href: "#" },
  { label: "New Release", href: "#" },
  { label: "Buy Again", href: "#" },
  { label: "Electronics", href: "/categories" },
  { label: "Mobiles & Accessories", href: "/categories" },
  { label: "Home & Kitchen", href: "/categories" },
  { label: "Grocery", href: "/categories" },
  { label: "Men's Fashion", href: "/categories" },
  { label: "Women's Fashion", href: "/categories" },
  { label: "Kids & Baby", href: "/categories" },
  { label: "Toys", href: "/categories" },
  { label: "Car & Motorbike", href: "/categories" },
  { label: "Sports & Outdoors", href: "/categories" },
  { label: "Books", href: "/categories" },
  { label: "Beauty & Personal Care", href: "/categories" },
  { label: "Computers & Laptops", href: "/categories" },
  { label: "Home Improvement", href: "/categories" },
  { label: "Pet Supplies", href: "/categories" },
];

export const AmazonNavbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Home" | "Categorys" | "Bookings">("Home");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());
  const toggleCart = useCartStore((state) => state.toggleCart);
  const subnavScrollRef = useRef<HTMLDivElement>(null);

  const scrollSubnav = (direction: "left" | "right") => {
    if (subnavScrollRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      subnavScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full select-none text-white text-xs font-sans shadow-md">
        {/* Tier 1: Top Navbar with Royal Blue (#1559ac) background from image 3 and pill container layout from image 2 */}
        <div className="bg-[#1559ac] px-3 sm:px-6 py-2 flex items-center justify-between h-[64px] border-b border-[#124b91] relative">
          {/* Left Group: 1PLACEE Logo + Location with Name */}
          <div className="flex items-center gap-3 shrink-0 z-10">
            {/* 1PLACEE Logo from Image 3 */}
            <Link
              href="/"
              className="flex items-center hover:opacity-95 transition select-none py-0.5"
            >
              <img
                src="/logo.png?v=2"
                alt="1Placee"
                className="h-11 sm:h-12 w-auto object-contain drop-shadow-md"
              />
            </Link>

            {/* Location with Icon and Name + Drop Arrow (No outer border) */}
            <button
              aria-label="Location"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-white/95 hover:text-white hover:bg-white/15 transition-all duration-200 cursor-pointer select-none"
            >
              <MapPin className="w-4 h-4 text-white stroke-[2.2] shrink-0" />
              <div className="flex flex-col text-left leading-tight">
                <span className="font-bold text-xs text-white truncate max-w-[110px]">Chennai, TN</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-white/80 shrink-0 ml-0.5" />
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
              href="/categories"
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

          {/* Right Group: Search Box + Bell Notification + Wishlist + Orders + Cart + Profile (Icons only, no words, no bg, hover very light blue round) */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 z-20">
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
                  title="Search"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/95 hover:text-white hover:bg-white/15 transition-all duration-200 cursor-pointer"
                >
                  <Search className="w-5 h-5 stroke-[2]" />
                </button>
              )}
            </div>

            {/* Notification Bell Icon */}
            <button
              aria-label="Notifications"
              title="Notifications"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/95 hover:text-white hover:bg-white/15 transition-all duration-200 cursor-pointer relative"
            >
              <Bell className="w-5 h-5 stroke-[2]" />
              {/* Subtle active notification dot */}
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#ff9900] ring-2 ring-[#1559ac]" />
            </button>

            {/* Wishlist Icon */}
            <button
              aria-label="Wishlist"
              title="Wishlist"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/95 hover:text-white hover:bg-white/15 transition-all duration-200 cursor-pointer group"
            >
              <Heart className="w-5 h-5 stroke-[2] fill-transparent group-hover:fill-red-400 group-hover:text-red-400 transition-colors" />
            </button>


            {/* Cart Icon Button with Counter Badge - Shopping trolley icon matching image 2 */}
            <button
              onClick={() => toggleCart()}
              aria-label="Cart"
              title="Cart"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/95 hover:text-white hover:bg-white/15 transition-all duration-200 cursor-pointer relative"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 2h3.2l2.4 11.5a1.8 1.8 0 0 0 1.8 1.5h10.4a1.8 1.8 0 0 0 1.8-1.4l1.6-7.6H5" />
                <line x1="9.5" y1="7" x2="9.5" y2="12" strokeWidth="2" />
                <line x1="13" y1="7" x2="13" y2="12" strokeWidth="2" />
                <line x1="16.5" y1="7" x2="16.5" y2="12" strokeWidth="2" />
                <circle cx="8.5" cy="19.5" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="17.5" cy="19.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute 1 top-1 -right-0.5 bg-[#ff9900] text-black font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Profile with Icon + Name + Dropdown (No outer border) */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                aria-label="Profile"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-white/95 hover:text-white hover:bg-white/15 transition-all duration-200 cursor-pointer select-none"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-xs">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col text-left leading-tight hidden sm:flex">
                  <span className="font-bold text-xs text-white truncate max-w-[90px]">Vinothkumar</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-white/80 transition-transform duration-200 ${isProfileMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 border border-gray-100 z-50 text-gray-800 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/70">
                    <p className="text-[11px] text-gray-500 font-medium">Signed in as</p>
                    <p className="text-xs font-bold text-gray-900 truncate">vinothkumar@1place.in</p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="#"
                      className="flex items-center px-4 py-2 text-xs font-semibold hover:bg-blue-50 hover:text-[#1559ac] transition"
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center px-4 py-2 text-xs font-semibold hover:bg-blue-50 hover:text-[#1559ac] transition"
                    >
                      Your Orders
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center px-4 py-2 text-xs font-semibold hover:bg-blue-50 hover:text-[#1559ac] transition"
                    >
                      Wishlist & Saved
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center px-4 py-2 text-xs font-semibold hover:bg-blue-50 hover:text-[#1559ac] transition"
                    >
                      Account Settings
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 pt-1">
                    <button
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tier 2: Subnav Ribbon - 'For you' removed, visible bottom scrollbar + Left & Right Arrows */}
        <div className="bg-[#0f4484] px-2 sm:px-4 py-1 flex items-center justify-between text-xs h-[44px] border-t border-white/10 relative select-none">
          {/* Middle Scrollable Container with Left & Right Arrow Buttons */}
          <div className="flex-1 flex items-center min-w-0 mr-2 sm:mr-3 relative overflow-hidden">
            {/* Scroll Left Arrow Button */}
            <button
              onClick={() => scrollSubnav("left")}
              aria-label="Scroll left"
              className="w-6 h-6 rounded-full bg-[#0d3b73] hover:bg-white/25 text-white flex items-center justify-center shrink-0 shadow transition cursor-pointer z-10 mr-1.5"
            >
              <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            {/* Scrollable Links Track without bottom scrollbar, hover bottom line show */}
            <div
              ref={subnavScrollRef}
              className="flex items-center gap-1 sm:gap-2 overflow-x-auto whitespace-nowrap no-scrollbar scroll-smooth h-full py-0"
            >
              {SUB_NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative flex items-center h-[42px] px-2.5 text-white font-medium text-xs transition-colors shrink-0 select-none group"
                >
                  <span className="text-white/90 group-hover:text-white transition-colors">{link.label}</span>
                  {/* Clean bottom line indicator on hover, exactly matching the reference image */}
                  <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-white rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
                </a>
              ))}
            </div>

            {/* Scroll Right Arrow Button */}
            <button
              onClick={() => scrollSubnav("right")}
              aria-label="Scroll right"
              className="w-6 h-6 rounded-full bg-[#0d3b73] hover:bg-white/25 text-white flex items-center justify-center shrink-0 shadow transition cursor-pointer z-10 ml-1.5"
            >
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Right Fixed Group: Help & Support + Settings (Preserved) */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0 pl-1 z-10">
            {/* Help & Support Customer Care Headset Button with Word */}
            <button
              aria-label="Help & Support"
              className="flex items-center gap-1.5 text-white/90 hover:text-white hover:bg-white/10 px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer select-none"
            >
              <Headset className="w-4 h-4 text-white stroke-[2.2]" />
              <span className="hidden sm:inline">Help&Support</span>
            </button>

            {/* Settings Button with Word */}
            <button
              aria-label="Settings"
              className="flex items-center gap-1.5 text-white/90 hover:text-white hover:bg-white/10 px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer select-none"
            >
              <Settings className="w-4 h-4 text-white stroke-[2]" />
              <span className="hidden sm:inline">Settings</span>
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
                  <Link
                    href="/categories"
                    onClick={() => setIsSidebarOpen(false)}
                    className="hover:bg-emerald-50 text-emerald-800 font-bold p-1.5 rounded cursor-pointer block"
                  >
                    Fresh & Grocery (Blinkit 8-Mins) →
                  </Link>
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
