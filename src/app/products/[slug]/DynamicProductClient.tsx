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
import { KottyBrandAplus } from "@/components/product/KottyBrandAplus";
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

            {/* ========================================================================= */}
            {/* SCREENSHOT 2: VARIANTS SELECTOR (Color, Internal Memory, Version, Model)  */}
            {/* ========================================================================= */}
            <div className="space-y-3 pt-2 border-t border-gray-200">
              {/* Color Selector */}
              <div>
                <span className="text-xs font-bold text-gray-700 block mb-1.5">
                  COLOR: <strong className="text-gray-950">{selectedColor}</strong>
                </span>
                
                {/* Visual Swatches Grid matching Screenshot 2 pixel-perfect */}
                <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xs bg-white p-1 mb-2">
                  <img
                    src="/banners/noon-color-swatches.png"
                    alt="iPhone Colors: Desert Titanium, Black Titanium, Natural Titanium, White Titanium"
                    className="w-full h-auto object-contain cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    { name: "Desert Titanium", img: "/banners/mobiles-iphone16-promax-titanium.png", price: "₹3799", discount: "25% OFF", inStock: true },
                    { name: "Black Titanium", img: "/banners/mobiles-iphone18-pro-burgundy.png", price: "₹3899", discount: "Out of Stock", inStock: false },
                    { name: "Natural Titanium", img: "/banners/mobiles-iphone18-pro-glacier.png", price: "₹3899", discount: "Out of Stock", inStock: false },
                    { name: "White Titanium", img: "/banners/mobiles-iphone18-promax-burgundy.png", price: "₹3899", discount: "Out of Stock", inStock: false },
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

              {/* Internal Memory Selector */}
              <div>
                <span className="text-xs font-bold text-gray-700 block mb-1.5">
                  INTERNAL MEMORY: <strong className="text-gray-950">{selectedStorage}</strong>
                </span>
                <div className="flex gap-2">
                  {["1 TB", "256 GB", "512 GB"].map((mem) => {
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

              {/* Version Selector */}
              <div>
                <div className="flex items-center gap-1 text-xs font-bold text-gray-700 mb-1.5">
                  <span>VERSION</span>
                  <Info className="w-3 h-3 text-gray-400" />
                  <strong className="text-gray-950 ml-1">{selectedVersion}</strong>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["International Version", "Middle East Version", "Physical Dual SIM Version", "USA Version"].map(
                    (ver) => {
                      const active = selectedVersion === ver;
                      const disabled = ver.includes("Dual SIM") || ver.includes("USA");
                      return (
                        <button
                          key={ver}
                          disabled={disabled}
                          onClick={() => setSelectedVersion(ver)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                            active
                              ? "border-blue-600 bg-blue-50/40 text-blue-700 ring-1 ring-blue-600 cursor-pointer"
                              : disabled
                              ? "border-gray-200 bg-gray-50 text-gray-400 border-dashed cursor-not-allowed"
                              : "border-gray-200 bg-white text-gray-800 hover:border-gray-300 cursor-pointer"
                          }`}
                        >
                          {ver}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Model Name Selector */}
              <div>
                <span className="text-xs font-bold text-gray-700 block mb-1.5">
                  MODEL NAME: <strong className="text-gray-950">{selectedModel}</strong>
                </span>
                <div className="flex gap-2">
                  {["iPhone 16 Pro Max", "iPhone 16 Pro"].map((mod) => {
                    const active = selectedModel === mod;
                    return (
                      <button
                        key={mod}
                        onClick={() => setSelectedModel(mod)}
                        className={`px-4 py-2 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                          active
                            ? "border-blue-600 bg-blue-50/40 text-blue-700 ring-1 ring-blue-600"
                            : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        {mod}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Newer Model Available Callout (Image 2 bottom) */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/80 flex items-center justify-between cursor-pointer hover:shadow-xs transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white p-1 border border-purple-100 flex items-center justify-center">
                    <img src="/banners/mobiles-iphone18-pro-glacier.png" alt="iPhone 17" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-100 px-1.5 py-0.2 rounded">
                      Newer model available
                    </span>
                    <h4 className="text-xs font-bold text-gray-900 leading-tight">
                      iPhone 17 Pro Max 256 GB (eSIM only) Silver 5G With FaceTime - International Version
                    </h4>
                    <span className="text-xs font-black text-gray-950">₹5099</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
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

            {/* 11.11 Deals Banner (Image 2 Top Right) */}
            <div className="rounded-2xl overflow-hidden shadow-xs cursor-pointer hover:shadow-md transition">
              <img src="/banners/iphone-sale-banner.jpg" alt="11.11 Deals Sale" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCREENSHOT 3: GET ADDITIONAL PROTECTION + BUYING GUIDE + BUNDLE           */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-xs space-y-6">
          {/* 1. Extended Warranty Protection Plans */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-gray-900">
                  GET ADDITIONAL PROTECTION
                </h3>
                <span className="text-[9px] font-bold text-white bg-red-600 px-1.5 py-0.2 rounded uppercase">
                  NEW
                </span>
              </div>
              <span className="text-xs text-gray-500 font-semibold cursor-pointer hover:underline">
                Quick claim support
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Plan 1: 1 Year */}
              <div className="p-4 rounded-2xl border border-gray-200 hover:border-blue-400 bg-white transition space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                      🛡️
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase">1 YEAR</span>
                      <h4 className="text-xs font-black text-gray-900">Extended Warranty Plan &gt;</h4>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedWarranty(selectedWarranty === "1year" ? null : "1year")}
                    className={`px-4 py-1 rounded-xl text-xs font-black transition cursor-pointer ${
                      selectedWarranty === "1year"
                        ? "bg-blue-600 text-white"
                        : "border border-blue-600 text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {selectedWarranty === "1year" ? "SELECTED" : "SELECT"}
                  </button>
                </div>
                <div className="text-[11px] text-gray-600 space-y-1 pt-1">
                  <p>✓ Active after brand warranty</p>
                  <p>✓ Covers electrical &amp; mechanical failures</p>
                  <p>∞ Get unlimited claims</p>
                </div>
                <span className="text-sm font-black text-gray-900 block pt-1">₹227.00</span>
              </div>

              {/* Plan 2: 2 Years */}
              <div className="p-4 rounded-2xl border border-gray-200 hover:border-blue-400 bg-white transition space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      🛡️
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase">2 YEARS</span>
                      <h4 className="text-xs font-black text-gray-900">Extended Warranty Plan &gt;</h4>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedWarranty(selectedWarranty === "2year" ? null : "2year")}
                    className={`px-4 py-1 rounded-xl text-xs font-black transition cursor-pointer ${
                      selectedWarranty === "2year"
                        ? "bg-blue-600 text-white"
                        : "border border-blue-600 text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {selectedWarranty === "2year" ? "SELECTED" : "SELECT"}
                  </button>
                </div>
                <div className="text-[11px] text-gray-600 space-y-1 pt-1">
                  <p>✓ Active after brand warranty</p>
                  <p>✓ Covers electrical &amp; mechanical failures</p>
                  <p>∞ Get unlimited claims</p>
                </div>
                <span className="text-sm font-black text-gray-900 block pt-1">₹374.00</span>
              </div>
            </div>
          </div>

          {/* 2. iPhone Buying Guide Wide Banner (Image 3 Middle) */}
          <div className="rounded-3xl overflow-hidden border border-gray-200/80 shadow-xs cursor-pointer hover:shadow-md transition">
            <img
              src="/banners/iphone-buying-guide.jpg"
              alt="iPhone buying guide - Helpful tips on how to choose the right one"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* 3. Frequently Bought Together Bundle Row (Image 3 Bottom) */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-black text-gray-700 uppercase tracking-wider">
              FREQUENTLY BOUGHT TOGETHER
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Bundle Item 1: Phone */}
              <div className="p-3 rounded-2xl border border-gray-200 bg-white space-y-2 relative">
                <input
                  type="checkbox"
                  checked={bundleItems.phone}
                  onChange={(e) => setBundleItems({ ...bundleItems, phone: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
                <div className="w-full h-24 flex items-center justify-center p-1">
                  <img src="/banners/mobiles-iphone16-promax-titanium.png" alt="iPhone 16 Pro Max" className="max-h-full max-w-full object-contain" />
                </div>
                <span className="text-xs font-black text-gray-900 block">₹3,799.00</span>
                <span className="text-[11px] text-gray-600 line-clamp-2 leading-tight">
                  Apple iPhone 16 Pro Max 256GB Desert...
                </span>
                <span className="text-[9px] font-black uppercase bg-[#fee000] text-gray-900 px-1 py-0.2 rounded inline-block">
                  express
                </span>
              </div>

              {/* Bundle Item 2: Apple 20W Adapter */}
              <div className="p-3 rounded-2xl border border-gray-200 bg-white space-y-2 relative">
                <input
                  type="checkbox"
                  checked={bundleItems.adapter}
                  onChange={(e) => setBundleItems({ ...bundleItems, adapter: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
                <div className="w-full h-24 flex items-center justify-center p-1">
                  <img src="/banners/watch-movado-museum.png" alt="20W Adapter" className="max-h-full max-w-full object-contain" />
                </div>
                <span className="text-xs font-black text-gray-900 block">₹58.00</span>
                <span className="text-[11px] text-gray-600 line-clamp-2 leading-tight">
                  Apple 20W USB-C 3-Pin Power Adapter...
                </span>
                <span className="text-[9px] font-black uppercase bg-[#fee000] text-gray-900 px-1 py-0.2 rounded inline-block">
                  express
                </span>
              </div>

              {/* Bundle Item 3: Screen Protector */}
              <div className="p-3 rounded-2xl border border-gray-200 bg-white space-y-2 relative">
                <input
                  type="checkbox"
                  checked={bundleItems.protector}
                  onChange={(e) => setBundleItems({ ...bundleItems, protector: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
                <div className="w-full h-24 flex items-center justify-center p-1">
                  <img src="/banners/mobiles-iphone18-pro-glacier.png" alt="Screen Protector" className="max-h-full max-w-full object-contain" />
                </div>
                <span className="text-xs font-black text-gray-900 block">₹17.50</span>
                <span className="text-[11px] text-gray-600 line-clamp-2 leading-tight">
                  ACLIX Screen Protector for iPhone...
                </span>
                <span className="text-[9px] font-black uppercase bg-[#fee000] text-gray-900 px-1 py-0.2 rounded inline-block">
                  supermall
                </span>
              </div>

              {/* Bundle Item 4: Magnetic Case */}
              <div className="p-3 rounded-2xl border border-gray-200 bg-white space-y-2 relative">
                <input
                  type="checkbox"
                  checked={bundleItems.case}
                  onChange={(e) => setBundleItems({ ...bundleItems, case: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
                <div className="w-full h-24 flex items-center justify-center p-1">
                  <img src="/banners/mobiles-iphone17-promax-orange.png" alt="Magnetic Case" className="max-h-full max-w-full object-contain" />
                </div>
                <span className="text-xs font-black text-gray-900 block">₹34.90</span>
                <span className="text-[11px] text-gray-600 line-clamp-2 leading-tight">
                  ACLIX Matte Magnetic Case for iPhone 16 Pr...
                </span>
                <span className="text-[9px] font-black uppercase bg-[#fee000] text-gray-900 px-1 py-0.2 rounded inline-block">
                  supermall
                </span>
              </div>
            </div>

            {/* Buy Bundle Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-3 rounded-2xl border-2 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white font-black text-xs uppercase tracking-wider transition cursor-pointer"
            >
              BUY {bundleCount} TOGETHER FOR ₹{bundleTotal.toLocaleString("en-IN")}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCREENSHOT 4: PRODUCT OVERVIEW (AI Summary + Description + Highlights)   */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200/90 shadow-xs space-y-6">
          <h2 className="text-lg sm:text-xl font-black text-gray-900">
            Product Overview
          </h2>

          {/* AI Summarised Card (Image 4 Top Purple Container) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-50/80 via-indigo-50/40 to-blue-50/60 border border-purple-200/80 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-purple-900">
                Summarised by 1PLACE AI
              </span>
            </div>
            <ul className="space-y-2 text-xs text-gray-800">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">✦</span>
                <span><strong>4676mAh Battery:</strong> Large power reservoir supports extended daily usage without needing frequent wall charging.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">✦</span>
                <span><strong>5G Dual SIM:</strong> Connect to high-speed networks using one physical Nano card and eSIM.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">✦</span>
                <span><strong>120Hz OLED Display:</strong> High refresh rate panel ensures fluid motion across all visual content.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">✦</span>
                <span><strong>48MP Triple Camera:</strong> Capture detailed images using the versatile three-lens rear sensor array system.</span>
              </li>
            </ul>
          </div>

          {/* Description Section (Image 4 Middle) */}
          <div className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <h3 className="text-sm font-bold text-gray-900">Description</h3>
            <p>
              Apple Intelligence protects your privacy at every step. With on-device processing and Private Cloud Compute, no one but you can access your data — not even Apple. The new Passwords app makes it even easier to access account passwords, passkeys, Wi-Fi passwords, two-factor authentication codes and more. It stores them securely and syncs across your devices with end-to-end encryption. You can also control which contacts to share with an app, rather than giving it access to all your contacts. And you can choose to share more contacts over time.
            </p>
            <button className="text-xs text-blue-600 hover:underline font-bold">— Hide details</button>
          </div>

          {/* Highlights Section (Image 4 Bottom) */}
          <div className="space-y-2.5 text-xs text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
            <h3 className="text-sm font-bold text-gray-900">Highlights</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-gray-400">•</span>
                <span>Personalise your Home Screen. Tint your icons with any colour. Rearrange and resize apps and widgets. You can even lock or hide apps to protect sensitive information — it&apos;s your call.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400">•</span>
                <span>Choose your controls. Swap out your Lock Screen controls for ones you love to use more often. Or you can assign a control to the Action button.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400">•</span>
                <span>In the redesigned Photos app, your Collections are automatically organised by topic, like People &amp; Pets.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400">•</span>
                <span>Personalise every style even more with the new control pad, which makes it easy to adjust tone and colour simultaneously. You can also use the slider to adjust the intensity of the specific colours, instead of applying a one-size-fits-all approach.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400">•</span>
                <span>Our improved image pipeline also enables more creative styles, which allow you to customise the different moods of a photo through colour.</span>
              </li>
            </ul>
            <button className="text-xs text-blue-600 hover:underline font-bold">— Hide details</button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCREENSHOT 5: DETAILED 2-COLUMN SPECIFICATIONS TABLE                      */}
        {/* ========================================================================= */}
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
          <RelatedProductsCarousel title="Similar Flagship Smartphones" />
        </div>

        {/* Reviews */}
        <div>
          <CustomerReviewsSection />
        </div>

      </div>
    </div>
  );
}
