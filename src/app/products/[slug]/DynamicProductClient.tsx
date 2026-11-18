"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Star,
  Share2,
  Heart,
  CheckCircle,
  MapPin,
  Lock,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Trash2,
  Tag,
  Zap,
  ShoppingBag,
  ExternalLink,
  Info,
} from "lucide-react";
import { ALL_PRODUCTS, UniversalProduct } from "@/data/allProductsData";
import { useCartStore } from "@/stores/cartStore";
import { RelatedProductsCarousel } from "@/components/product/RelatedProductsCarousel";
import { CustomerReviewsSection } from "@/components/product/CustomerReviewsSection";

export function DynamicProductClient({ slug }: { slug: string }) {
  const product: UniversalProduct =
    ALL_PRODUCTS[slug] || ALL_PRODUCTS["apple-iphone-18-pro"] || ALL_PRODUCTS["kotty-mens-jeans"];

  const isIphonePage = slug.includes("iphone") || slug.includes("apple") || product.brand === "Apple";

  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  // Variant States matching uploaded screenshots
  const [selectedColor, setSelectedColor] = useState("Desert Titanium");
  const [selectedStorage, setSelectedStorage] = useState("256 GB");
  const [selectedVersion, setSelectedVersion] = useState("Middle East Version");
  const [selectedModel, setSelectedModel] = useState("iPhone 16 Pro Max");
  const [selectedWarranty, setSelectedWarranty] = useState<string | null>(null);

  // Frequently Bought Together Bundle Checkboxes
  const [bundleItems, setBundleItems] = useState({
    phone: true,
    adapter: true,
    protector: true,
    case: true,
  });

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      imageUrl: product.galleryImages[selectedImg] || product.imageUrl,
      rating: product.rating,
      ratingCount: product.ratingCount,
      category: product.category,
      inStock: product.inStock,
      isPrimeEligible: product.isPrimeEligible,
      deliveryDate: product.deliveryDate,
      tag: product.tag,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const bundleTotal =
    (bundleItems.phone ? 3799 : 0) +
    (bundleItems.adapter ? 58 : 0) +
    (bundleItems.protector ? 17.5 : 0) +
    (bundleItems.case ? 34.9 : 0);

  const bundleCount = Object.values(bundleItems).filter(Boolean).length;

  return (
    <div className="w-full bg-[#f8fafc] pb-16 text-[#0F1111] select-none">
      {/* 1. Breadcrumb Bar matching Image 1: Home > Electronics & Mobiles > Mobiles & Accessories > Mobile Phones > Smartphones */}
      <div className="w-full bg-white border-b border-gray-200/80 py-2.5 px-4 text-xs">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          <nav className="flex items-center gap-1.5 text-gray-500 overflow-x-auto no-scrollbar whitespace-nowrap">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <Link href="/categories" className="hover:text-blue-600 transition">Electronics & Mobiles</Link>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <Link href="/categories" className="hover:text-blue-600 transition">Mobiles & Accessories</Link>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <Link href="/categories" className="hover:text-blue-600 transition">Mobile Phones</Link>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="font-bold text-gray-900">Smartphones</span>
          </nav>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0 hidden sm:inline-block">
            ✓ 1PLACE Official Authenticated
          </span>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-3 sm:px-6 pt-4 space-y-8">
        
        {/* ========================================================================= */}
        {/* SCREENSHOT 1 & 2: MAIN 3-COLUMN PRODUCT HERO (Gallery + Info + BuyBox)   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Vertical Thumbnails + Main Stage Image (5 cols) */}
          <div className="lg:col-span-5 flex gap-3">
            {/* Thumbnails (Image 1 left column) */}
            <div className="flex flex-col gap-2 shrink-0">
              {product.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onMouseEnter={() => setSelectedImg(idx)}
                  onClick={() => setSelectedImg(idx)}
                  className={`w-12 h-14 rounded-lg border p-1 bg-white flex items-center justify-center transition cursor-pointer overflow-hidden ${
                    selectedImg === idx
                      ? "border-blue-600 ring-2 ring-blue-500/30 shadow-xs"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="max-h-full max-w-full object-contain" />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 relative flex flex-col items-center bg-white rounded-3xl p-4 border border-gray-200/80 shadow-xs">
              <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                <button
                  title="Share product"
                  className="w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center shadow-2xs hover:scale-105 transition cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  title="Add to wishlist"
                  className="w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center shadow-2xs hover:scale-105 transition cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              {/* 11.11 Deal Badge at Top Left (Image 1) */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                <span className="bg-[#cc0c39] text-white font-extrabold text-[11px] px-2.5 py-1 rounded-md shadow-2xs">
                  11.11 Deal 🔥
                </span>
                <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                  <ShoppingBag className="w-3 h-3" /> In Your Cart
                </span>
              </div>

              <div className="w-full h-[400px] sm:h-[480px] flex items-center justify-center p-2">
                <img
                  src={
                    selectedImg === 0 && isIphonePage
                      ? "/banners/noon-iphone-main.png"
                      : product.galleryImages[selectedImg] || product.imageUrl
                  }
                  alt={product.title}
                  className="max-h-full max-w-full object-contain hover:scale-[1.02] transition-transform duration-300 drop-shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Center Column: Product Specs, Ratings, Pricing, Variants & Deals (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <Link href="/categories" className="text-xs font-bold text-blue-600 hover:underline">
                Apple &gt;
              </Link>
              <h1 className="text-lg sm:text-xl font-black text-gray-900 leading-snug mt-1">
                {product.title}
              </h1>
            </div>

            {/* Ratings Bar & Best Seller Pill (Image 1) */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 font-extrabold px-2 py-0.5 rounded-md border border-emerald-200">
                <span>{product.rating}</span>
                <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
              </div>
              <span className="text-blue-600 hover:underline cursor-pointer font-bold">
                {product.ratingCount.toLocaleString()} Ratings
              </span>
            </div>

            {/* Price Box with AED / Indian styling */}
            <div className="space-y-1 pb-2 border-b border-gray-200">
              <div className="flex items-baseline gap-2.5 flex-wrap">
                <span className="text-2xl sm:text-3xl font-black text-gray-950">
                  ₹{product.price.toLocaleString("en-IN")}.00
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}.00
                </span>
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {product.discount}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50/70 p-2 rounded-xl border border-emerald-200/60">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                <span>Best Seller #10 in Smartphones</span>
                <ChevronRight className="w-3.5 h-3.5 ml-auto text-emerald-600" />
              </div>
            </div>

            {/* Delivery Information (Image 1) */}
            <div className="bg-white rounded-2xl p-3 border border-gray-200/90 shadow-2xs space-y-1">
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block">
                DELIVERY INFORMATION
              </span>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-extrabold text-gray-900">
                  <span className="italic bg-[#fee000] text-gray-900 px-1.5 py-0.2 rounded text-[11px]">
                    ⚡ express
                  </span>
                  <span>Get it <strong className="text-emerald-700">Tomorrow</strong></span>
                </div>
                <span className="text-[11px] text-gray-500 font-medium">Order in 8h 54m</span>
              </div>
            </div>

            {/* Coupons Strip (Image 1) */}
            <div className="bg-white rounded-2xl p-3 border border-gray-200/90 shadow-2xs space-y-2">
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block">
                COUPONS
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/50 flex items-center justify-between">
                  <div className="text-[10px]">
                    <span className="font-extrabold text-emerald-800 block">Extra 10% Off</span>
                    <span className="text-gray-500 underline cursor-pointer">Learn more</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-300 text-emerald-800">
                    FAB10
                  </span>
                </div>
                <div className="p-2 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/50 flex items-center justify-between">
                  <div className="text-[10px]">
                    <span className="font-extrabold text-emerald-800 block">Extra 15% Off</span>
                    <span className="text-gray-500 underline cursor-pointer">Learn more</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-300 text-emerald-800">
                    RAK15
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Discount (Image 1) */}
            <div className="bg-white rounded-2xl p-3 border border-gray-200/90 shadow-2xs space-y-2">
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block">
                PAYMENT DISCOUNT
              </span>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 rounded-xl bg-emerald-50/50 border border-emerald-200">
                  <span className="font-bold text-gray-900 block">Earn ₹189.95 cashback</span>
                  <span className="text-emerald-700 underline cursor-pointer font-semibold">Apply now</span>
                </div>
                <div className="p-2 rounded-xl bg-amber-50/50 border border-amber-200">
                  <span className="font-bold text-gray-900 block">Earn ₹189.95 with Noon Card</span>
                  <span className="text-amber-800 underline cursor-pointer font-semibold">Apply now</span>
                </div>
              </div>
            </div>

            {/* COLOR & STORAGE SELECTION */}
            <div className="space-y-3 pt-2 border-t border-gray-200">
              {/* Color Selector */}
              <div>
                <span className="text-xs font-bold text-gray-700 block mb-1.5">
                  COLOR: <strong className="text-gray-950">{selectedColor}</strong>
                </span>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    { name: "Desert Titanium", img: "/banners/noon-thumb-1.png", price: "₹84,690", discount: "25% OFF", inStock: true },
                    { name: "Black Titanium", img: "/banners/noon-thumb-2.png", price: "₹84,690", discount: "Out of Stock", inStock: false },
                    { name: "Natural Titanium", img: "/banners/noon-thumb-3.png", price: "₹84,690", discount: "Out of Stock", inStock: false },
                    { name: "White Titanium", img: "/banners/noon-thumb-4.png", price: "₹84,690", discount: "Out of Stock", inStock: false },
                  ].map((col) => (
                    <button
                      key={col.name}
                      onClick={() => col.inStock && setSelectedColor(col.name)}
                      className={`p-1.5 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-between ${
                        selectedColor === col.name
                          ? "border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/30"
                          : col.inStock
                          ? "border-gray-200 hover:border-gray-300 bg-white"
                          : "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <span className="text-[10px] font-bold text-gray-800 truncate w-full block">
                        {col.name}
                      </span>
                      <span className={`text-[9px] font-black block mt-0.5 ${col.inStock ? "text-emerald-700" : "text-gray-400"}`}>
                        {col.inStock ? col.price : "OUT OF STOCK"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal Memory / Storage Selector */}
              <div>
                <span className="text-xs font-bold text-gray-700 block mb-1.5">
                  INTERNAL MEMORY: <strong className="text-gray-950">{selectedStorage}</strong>
                </span>
                <div className="flex gap-2">
                  {["128 GB", "256 GB", "512 GB", "1 TB"].map((mem) => {
                    const active = selectedStorage === mem;
                    return (
                      <button
                        key={mem}
                        onClick={() => setSelectedStorage(mem)}
                        className={`px-4 py-2 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                          active
                            ? "border-blue-600 bg-blue-50/40 text-blue-700 ring-1 ring-blue-600"
                            : "border-gray-200 bg-white text-gray-800 hover:border-gray-300"
                        }`}
                      >
                        {mem}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Seller & BuyBox (3 cols - Image 1 Right Box) */}
          <div className="lg:col-span-3 lg:sticky lg:top-4 space-y-4">
            {/* Seller Reputation Box */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    🏪
                  </div>
                  <div>
                    <span className="text-xs font-black text-gray-900 block leading-tight">
                      Sold by Whimsy &gt;
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                      <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                      <span>5.0</span>
                      <span className="text-gray-400 font-normal">| 99% Positive</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item as shown bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-gray-600">
                  <span>Item as shown</span>
                  <span className="text-emerald-600">100%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-emerald-500 rounded-full" />
                </div>
              </div>

              <button className="text-xs font-bold text-blue-600 hover:underline flex items-center justify-between w-full pt-1">
                <span>More offers from other sellers</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {/* Trust Badges */}
              <div className="text-[11px] text-gray-600 space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>1 year manufacturer warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>Free delivery on Lockers &amp; Pickup Points</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>Easy and Hassle Free Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>Secure Payments</span>
                </div>
              </div>

              {/* Stepper + Quantity & Add to Cart Action Button */}
              <div className="pt-2 flex items-center gap-2">
                <div className="flex items-center border border-gray-300 rounded-xl bg-white overflow-hidden shadow-2xs h-11 px-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                  <span className="w-8 text-center text-xs font-black text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-7 h-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition cursor-pointer font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-11 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-black text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {added ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-white" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <span>Add to Cart</span>
                  )}
                </button>
              </div>
            </div>

            {/* Sponsored Motorola Callout Box (Image 1 Bottom Right) */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-3.5 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-gray-900">Smarter technology for all</span>
                <span className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">
                  Shop Motorola &gt;
                </span>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <div className="w-12 h-12 bg-gray-50 rounded-xl p-1 flex items-center justify-center border border-gray-100">
                  <img src="/banners/mobiles-pixel-8-pro.jpg" alt="Motorola Edge" className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gray-800 line-clamp-1">
                    Motorola Edge 70 Dual SIM 5G 12 RAM 512GB Gadget Grey
                  </span>
                  <span className="text-xs font-black text-gray-900 block">₹1,404.00</span>
                  <span className="text-[9px] font-black uppercase bg-[#fee000] text-gray-900 px-1 py-0.2 rounded">
                    supermall
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GET ADDITIONAL PROTECTION Section (Warranty Cards) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black tracking-wide text-gray-900 uppercase">
                GET ADDITIONAL PROTECTION
              </h3>
              <span className="bg-[#e11d48] text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-2xs">
                NEW
              </span>
            </div>
            <span className="text-xs text-gray-500 font-semibold cursor-pointer hover:text-gray-700">
              Quick claim support
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1 Year Extended Warranty Plan */}
            <div
              onClick={() => setSelectedWarranty(selectedWarranty === "1yr" ? null : "1yr")}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                selectedWarranty === "1yr"
                  ? "border-blue-600 bg-blue-50/30 ring-1 ring-blue-600 shadow-xs"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-blue-600 uppercase block tracking-wider">
                      1 YEAR
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-gray-900 flex items-center gap-1">
                      Extended Warranty Plan &gt;
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-[11px] text-gray-600 pl-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Active after brand warranty</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Covers electrical &amp; mechanical failures</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-500 font-bold">∞</span >
                    <span>Get unlimited claims</span>
                  </div>
                </div>

                <div className="text-sm font-black text-gray-950 pt-1">
                  ₹227.00
                </div>
              </div>

              <button
                type="button"
                className={`px-4 py-1.5 text-xs font-black rounded-xl border transition-all cursor-pointer ${
                  selectedWarranty === "1yr"
                    ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                    : "border-blue-600 text-blue-600 hover:bg-blue-50 bg-white"
                }`}
              >
                {selectedWarranty === "1yr" ? "SELECTED" : "SELECT"}
              </button>
            </div>

            {/* 2 Years Extended Warranty Plan */}
            <div
              onClick={() => setSelectedWarranty(selectedWarranty === "2yr" ? null : "2yr")}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                selectedWarranty === "2yr"
                  ? "border-blue-600 bg-blue-50/30 ring-1 ring-blue-600 shadow-xs"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-blue-600 uppercase block tracking-wider">
                      2 YEARS
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-gray-900 flex items-center gap-1">
                      Extended Warranty Plan &gt;
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-[11px] text-gray-600 pl-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Active after brand warranty</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Covers electrical &amp; mechanical failures</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-500 font-bold">∞</span >
                    <span>Get unlimited claims</span>
                  </div>
                </div>

                <div className="text-sm font-black text-gray-950 pt-1">
                  ₹374.00
                </div>
              </div>

              <button
                type="button"
                className={`px-4 py-1.5 text-xs font-black rounded-xl border transition-all cursor-pointer ${
                  selectedWarranty === "2yr"
                    ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                    : "border-blue-600 text-blue-600 hover:bg-blue-50 bg-white"
                }`}
              >
                {selectedWarranty === "2yr" ? "SELECTED" : "SELECT"}
              </button>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200/90 shadow-xs space-y-4">
          <h2 className="text-lg sm:text-xl font-black text-gray-900">
            Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs">
            {product.specs.map((item, idx) => (
              <div key={idx} className="flex flex-col py-1 border-b border-gray-100">
                <span className="text-gray-400 font-medium text-[11px]">{item.label}</span>
                <span className="font-extrabold text-gray-900 text-xs mt-0.5">{item.value}</span>
              </div>
            ))}
          </div>

          <button className="text-xs text-blue-600 hover:underline font-bold pt-2">— Hide details</button>
        </div>

        {/* Related Products Carousel */}
        <div>
          <RelatedProductsCarousel
            category={product.category}
            title={`Similar ${product.category} Recommendations`}
          />
        </div>

        {/* Reviews */}
        <div>
          <CustomerReviewsSection
            category={product.category}
            productImage={product.imageUrl}
            productImages={product.galleryImages}
          />
        </div>

      </div>
    </div>
  );
}
