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
  Building2,
  FileText,
  BadgeCheck,
  Check,
} from "lucide-react";
import { ALL_PRODUCTS, UniversalProduct } from "@/data/allProductsData";
import { useCartStore } from "@/stores/cartStore";
import { RelatedProductsCarousel } from "@/components/product/RelatedProductsCarousel";
import { CustomerReviewsSection } from "@/components/product/CustomerReviewsSection";

export function DynamicProductClient({ slug }: { slug: string }) {
  const product: UniversalProduct =
    ALL_PRODUCTS[slug] ||
    ALL_PRODUCTS["apple-iphone-18-pro"] || {
      id: slug,
      slug,
      title: "Apple iPhone 18 Pro (256GB, Desert Titanium) - 5G Dual SIM",
      brand: "Apple",
      category: "Smartphones",
      department: "Electronics & Mobiles",
      price: 84690,
      originalPrice: 102500,
      discount: "17% off",
      rating: 4.9,
      ratingCount: 3492,
      imageUrl: "/banners/noon-iphone-main.png",
      galleryImages: [
        "/banners/noon-iphone-main.png",
        "/banners/iphone-noon-1.jpg",
        "/banners/iphone-noon-2.jpg",
      ],
      description: "Flagship high performance product with official manufacturer warranty.",
      bulletPoints: ["100% Genuine Authenticated", "Manufacturer Warranty Included", "Fast Express Delivery"],
      inStock: true,
      isPrimeEligible: true,
      deliveryDate: "Tomorrow",
      specs: [
        { label: "Brand", value: "Apple" },
        { label: "Category", value: "Smartphones" },
      ],
    };

  const isMobile =
    product.category.toLowerCase().includes("mobile") ||
    product.category.toLowerCase().includes("smartphone") ||
    product.brand.toLowerCase() === "apple" ||
    product.brand.toLowerCase() === "samsung" ||
    slug.includes("iphone") ||
    slug.includes("samsung") ||
    slug.includes("pixel");

  const isWatch =
    product.category.toLowerCase().includes("watch") ||
    product.department.toLowerCase().includes("watch") ||
    slug.includes("watch") ||
    slug.includes("casio") ||
    slug.includes("citizen") ||
    slug.includes("tissot") ||
    slug.includes("seiko") ||
    slug.includes("movado") ||
    slug.includes("police") ||
    slug.includes("fossil") ||
    slug.includes("timex");

  const isCookware =
    product.category.toLowerCase().includes("cookware") ||
    product.category.toLowerCase().includes("kitchen") ||
    product.department.toLowerCase().includes("kitchen") ||
    slug.includes("fissman") ||
    slug.includes("oms") ||
    slug.includes("pan") ||
    slug.includes("pot") ||
    slug.includes("corelle");

  const isPerfume =
    product.category.toLowerCase().includes("perfume") ||
    product.category.toLowerCase().includes("fragrance") ||
    product.department.toLowerCase().includes("fragrance") ||
    slug.includes("eros") ||
    slug.includes("parfum") ||
    slug.includes("armani") ||
    slug.includes("dior") ||
    slug.includes("amouage") ||
    slug.includes("french-avenue") ||
    slug.includes("versace") ||
    slug.includes("givenchy") ||
    slug.includes("chanel") ||
    slug.includes("tom-ford");

  const isEyewear =
    product.category.toLowerCase().includes("eyewear") ||
    product.category.toLowerCase().includes("sunglass") ||
    slug.includes("sunglass") ||
    slug.includes("prada") ||
    slug.includes("tommy") ||
    slug.includes("lacoste") ||
    slug.includes("rayban") ||
    slug.includes("wayfarer");

  const isSkincare =
    product.category.toLowerCase().includes("skincare") ||
    product.category.toLowerCase().includes("skin") ||
    slug.includes("acm") ||
    slug.includes("anua") ||
    slug.includes("medicube") ||
    slug.includes("sol-de-janeiro");

  const isOutdoor =
    product.category.toLowerCase().includes("outdoor") ||
    product.category.toLowerCase().includes("bicycle") ||
    slug.includes("vaux") ||
    slug.includes("mogoo");

  const isBaby =
    product.category.toLowerCase().includes("baby") ||
    slug.includes("neobreez") ||
    slug.includes("ingenuity");

  // Gallery
  const gallery =
    product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages
      : [product.imageUrl];

  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  // Variant States matching categories
  const [selectedColor, setSelectedColor] = useState(
    isWatch
      ? "Stainless Silver"
      : isCookware
      ? "Deep Granite Black"
      : isPerfume
      ? "Standard Flacon"
      : isEyewear
      ? "Matte Black Frame"
      : isSkincare
      ? "Standard Kit"
      : isOutdoor
      ? "Midnight Blue"
      : isBaby
      ? "Charcoal Grey"
      : "Desert Titanium"
  );

  const [selectedStorage, setSelectedStorage] = useState(
    isMobile
      ? "256 GB"
      : isCookware
      ? "4.5 L"
      : isWatch
      ? "42 mm"
      : isPerfume
      ? "100 ml"
      : isEyewear
      ? "Standard Fit"
      : isSkincare
      ? "Full Size Kit"
      : isOutdoor
      ? "18 Inch Alloy"
      : isBaby
      ? "Single Stroller"
      : "Standard"
  );

  const [selectedWarranty, setSelectedWarranty] = useState<string | null>(null);

  // Dynamic Options per Category
  const colorOptions = isMobile
    ? [
        { name: "Desert Titanium", img: gallery[0] || "/banners/noon-thumb-1.png", price: `₹${product.price.toLocaleString("en-IN")}`, inStock: true },
        { name: "Natural Titanium", img: gallery[1] || gallery[0], price: `₹${product.price.toLocaleString("en-IN")}`, inStock: true },
        { name: "White Titanium", img: gallery[2] || gallery[0], price: `₹${product.price.toLocaleString("en-IN")}`, inStock: false },
        { name: "Black Titanium", img: gallery[0], price: `₹${product.price.toLocaleString("en-IN")}`, inStock: false },
      ]
    : isWatch
    ? [
        { name: "Stainless Silver", img: gallery[0], price: `₹${product.price.toLocaleString("en-IN")}`, inStock: true },
        { name: "Rose Gold Edition", img: gallery[1] || gallery[0], price: `₹${product.price.toLocaleString("en-IN")}`, inStock: true },
        { name: "Matte Black", img: gallery[0], price: `₹${product.price.toLocaleString("en-IN")}`, inStock: false },
      ]
    : isCookware
    ? [
        { name: "Deep Granite Black", img: gallery[0], price: `₹${product.price.toLocaleString("en-IN")}`, inStock: true },
        { name: "Seagreen Series", img: gallery[1] || gallery[0], price: `₹${product.price.toLocaleString("en-IN")}`, inStock: true },
        { name: "Copper Bronze", img: gallery[0], price: `₹${product.price.toLocaleString("en-IN")}`, inStock: false },
      ]
    : isPerfume
    ? [
        { name: "Standard Flacon", img: gallery[0], price: `₹${product.price.toLocaleString("en-IN")}`, inStock: true },
        { name: "Limited Gift Edition", img: gallery[1] || gallery[0], price: `₹${product.price.toLocaleString("en-IN")}`, inStock: true },
      ]
    : isEyewear
    ? [
        { name: "Matte Black Frame", img: gallery[0], price: `₹${product.price.toLocaleString("en-IN")}`, inStock: true },
        { name: "Tortoise Shell", img: gallery[1] || gallery[0], price: `₹${product.price.toLocaleString("en-IN")}`, inStock: true },
      ]
    : isSkincare
    ? [
        { name: "Standard Kit", img: gallery[0], price: `₹${product.price.toLocaleString("en-IN")}`, inStock: true },
        { name: "Dermatology Duo Pack", img: gallery[1] || gallery[0], price: `₹${product.price.toLocaleString("en-IN")}`, inStock: true },
      ]
    : [
        { name: "Default Variant", img: gallery[0], price: `₹${product.price.toLocaleString("en-IN")}`, inStock: true },
      ];

  const sizeOrStorageLabel = isMobile
    ? "INTERNAL MEMORY"
    : isCookware
    ? "CAPACITY / SIZE"
    : isWatch
    ? "DIAL CASE SIZE"
    : isPerfume
    ? "BOTTLE VOLUME"
    : isEyewear
    ? "FRAME FIT"
    : isSkincare
    ? "PACK SIZE"
    : isOutdoor
    ? "FRAME SIZE"
    : isBaby
    ? "MODEL TYPE"
    : "VARIANT";

  const sizeOrStorageOptions = isMobile
    ? ["128 GB", "256 GB", "512 GB", "1 TB"]
    : isCookware
    ? ["2.5 L", "4.5 L", "8.0 L", "Family Set"]
    : isWatch
    ? ["38 mm", "40 mm", "42 mm", "45 mm"]
    : isPerfume
    ? ["50 ml", "100 ml", "200 ml"]
    : isEyewear
    ? ["Standard Fit", "Wide Fit"]
    : isSkincare
    ? ["Single Pack", "Full Size Kit", "Duo Pack"]
    : isOutdoor
    ? ["16 Inch Alloy", "18 Inch Alloy", "21-Speed"]
    : isBaby
    ? ["Single Stroller", "Travel System"]
    : ["Standard"];

  // Category Department label for breadcrumbs
  const departmentName = product.department || (
    isWatch ? "Watches & Timepieces" :
    isCookware ? "Home & Kitchen" :
    isPerfume ? "Beauty & Fragrance" :
    isEyewear ? "Eyewear & Sunglasses" :
    isSkincare ? "Beauty & Personal Care" :
    isOutdoor ? "Sports & Outdoor Recreation" :
    isBaby ? "Baby Products & Gear" :
    "Electronics & Mobiles"
  );

  const categoryName = product.category || (
    isWatch ? "Watches" :
    isCookware ? "Cookware" :
    isPerfume ? "Perfumes" :
    isEyewear ? "Sunglasses" :
    isSkincare ? "Skincare" :
    isOutdoor ? "Bicycles" :
    isBaby ? "Strollers" :
    "Smartphones"
  );

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      imageUrl: gallery[selectedImg] || product.imageUrl,
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

  return (
    <div className="w-full bg-[#f8fafc] pb-16 text-[#0F1111] select-none">
      {/* 1. Breadcrumb Bar matching current product */}
      <div className="w-full bg-white border-b border-gray-200/80 py-2.5 px-4 text-xs">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          <nav className="flex items-center gap-1.5 text-gray-500 overflow-x-auto no-scrollbar whitespace-nowrap">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <Link href="/categories" className="hover:text-blue-600 transition">{departmentName}</Link>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <Link href="/categories" className="hover:text-blue-600 transition">{categoryName}</Link>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="font-bold text-gray-900 truncate max-w-[280px] sm:max-w-md">{product.title}</span>
          </nav>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0 hidden sm:inline-block">
            ✓ 1PLACE Official Authenticated
          </span>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-3 sm:px-6 pt-4 space-y-8">
        
        {/* ========================================================================= */}
        {/* MAIN 3-COLUMN PRODUCT HERO (Gallery + Info + BuyBox)                     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Vertical Thumbnails + Main Stage Image (5 cols) */}
          <div className="lg:col-span-5 flex gap-3">
            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex flex-col gap-2 shrink-0 max-h-[460px] overflow-y-auto no-scrollbar">
                {gallery.map((img, idx) => (
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
            )}

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
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                </button>
              </div>

              {/* Deal Badge at Top Left */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                <span className="bg-[#cc0c39] text-white font-extrabold text-[11px] px-2.5 py-1 rounded-md shadow-2xs">
                  {product.discount || "Special Deal 🔥"}
                </span>
                <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                  <ShoppingBag className="w-3 h-3" /> In Stock
                </span>
              </div>

              <div className="w-full h-[380px] sm:h-[460px] flex items-center justify-center p-2">
                <img
                  src={gallery[selectedImg] || product.imageUrl}
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
                {product.brand} &gt;
              </Link>
              <h1 className="text-lg sm:text-xl font-black text-gray-900 leading-snug mt-1">
                {product.title}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Brand: <strong className="text-gray-800">{product.brand}</strong> | Category: <strong className="text-gray-800">{categoryName}</strong>
              </p>
            </div>

            {/* Ratings Bar */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 font-extrabold px-2 py-0.5 rounded-md border border-emerald-200">
                <span>{product.rating || 4.8}</span>
                <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
              </div>
              <span className="text-blue-600 hover:underline cursor-pointer font-bold">
                {(product.ratingCount || 1200).toLocaleString()} Ratings &amp; Reviews
              </span>
            </div>

            {/* Price Box */}
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
                <span>Verified Best Price in {categoryName}</span>
                <ChevronRight className="w-3.5 h-3.5 ml-auto text-emerald-600" />
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-2xl p-3 border border-gray-200/90 shadow-2xs space-y-1">
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block">
                DELIVERY INFORMATION
              </span>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-extrabold text-gray-900">
                  <span className="italic bg-[#fee000] text-gray-900 px-1.5 py-0.2 rounded text-[11px]">
                    ⚡ express
                  </span>
                  <span>Get it <strong className="text-emerald-700">{product.deliveryDate || "Tomorrow"}</strong></span>
                </div>
                <span className="text-[11px] text-gray-500 font-medium">Order soon for priority dispatch</span>
              </div>
            </div>

            {/* Coupons Strip */}
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
                    SAVE10
                  </span>
                </div>
                <div className="p-2 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/50 flex items-center justify-between">
                  <div className="text-[10px]">
                    <span className="font-extrabold text-emerald-800 block">Instant 15% Off</span>
                    <span className="text-gray-500 underline cursor-pointer">Learn more</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-300 text-emerald-800">
                    DEAL15
                  </span>
                </div>
              </div>
            </div>

            {/* COLOR & STORAGE SELECTION */}
            <div className="space-y-3 pt-2 border-t border-gray-200">
              {/* Color / Variant Selector */}
              <div>
                <span className="text-xs font-bold text-gray-700 block mb-1.5">
                  COLOR / FINISH: <strong className="text-gray-950">{selectedColor}</strong>
                </span>

                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((col) => (
                    <button
                      key={col.name}
                      onClick={() => col.inStock && setSelectedColor(col.name)}
                      className={`p-2 rounded-xl border text-center transition cursor-pointer flex items-center gap-2 ${
                        selectedColor === col.name
                          ? "border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/30 font-bold"
                          : col.inStock
                          ? "border-gray-200 hover:border-gray-300 bg-white"
                          : "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <img src={col.img} alt={col.name} className="w-6 h-6 object-contain" />
                      <span className="text-xs text-gray-800">{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size / Storage / Variant Selector */}
              <div>
                <span className="text-xs font-bold text-gray-700 block mb-1.5">
                  {sizeOrStorageLabel}: <strong className="text-gray-950">{selectedStorage}</strong>
                </span>
                <div className="flex flex-wrap gap-2">
                  {sizeOrStorageOptions.map((mem) => {
                    const active = selectedStorage === mem;
                    return (
                      <button
                        key={mem}
                        onClick={() => setSelectedStorage(mem)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
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

            {/* Bullet Points */}
            {product.bulletPoints && product.bulletPoints.length > 0 && (
              <div className="pt-2 border-t border-gray-100 space-y-1">
                <span className="text-xs font-bold text-gray-900 block">Highlights:</span>
                <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                  {product.bulletPoints.slice(0, 4).map((pt, idx) => (
                    <li key={idx} className="leading-snug">{pt}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Right Column: Sticky Seller & BuyBox (3 cols) */}
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
                      Sold by 1Placee Official &gt;
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                      <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                      <span>4.9</span>
                      <span className="text-gray-400 font-normal">| 100% Genuine</span>
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

              {/* Trust Badges */}
              <div className="text-[11px] text-gray-600 space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>Verified Genuine Manufacturer Warranty</span>
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
                  <span>100% Secure Checkout</span>
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

            {/* Privilege Protection */}
            <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-3.5 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                <BadgeCheck className="w-4 h-4 text-blue-700" />
                <span>1Placee Buyer Guarantee</span>
              </div>
              <p className="text-[11px] text-blue-700 leading-snug">
                Every order is backed by authentic origin certificate and official warranty coverage.
              </p>
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
                      {isWatch
                        ? "1 Year Watch Movement & Dial Protection >"
                        : isCookware
                        ? "1 Year Surface Coating & Handle Protection >"
                        : isPerfume
                        ? "1 Year Authenticity & Transit Guarantee >"
                        : isEyewear
                        ? "1 Year Lens & Frame Durability Plan >"
                        : isSkincare
                        ? "1 Year Dermatological Authenticity Guarantee >"
                        : isOutdoor
                        ? "1 Year Bicycle Frame & Drivetrain Plan >"
                        : isBaby
                        ? "1 Year Baby Gear Chassis Protection >"
                        : "1 Year Extended Warranty Plan >"}
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
                    <span>
                      {isWatch
                        ? "Covers glass crack, gear movement & water ingress"
                        : isCookware
                        ? "Covers non-stick coating peel & handle loosening"
                        : isEyewear
                        ? "Covers lens scratch replacement & frame misalignment"
                        : isOutdoor
                        ? "Covers gear transmission & braking assembly"
                        : "Covers damage, electrical & mechanical failures"}
                    </span>
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
                      {isWatch
                        ? "2 Years Comprehensive Watch Servicing Plan >"
                        : isCookware
                        ? "2 Years Cookware Total Replacement Guarantee >"
                        : isPerfume
                        ? "2 Years Fragrance Integrity Assurance >"
                        : isEyewear
                        ? "2 Years Complete Optical Shield Plan >"
                        : isSkincare
                        ? "2 Years Skin Safety & Certified Supply Plan >"
                        : isOutdoor
                        ? "2 Years Free Service & Component Exchange >"
                        : isBaby
                        ? "2 Years Full Stroller Maintenance Plan >"
                        : "2 Years Comprehensive Care Plan >"}
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
                    <span>Doorstep pickup &amp; genuine replacement guarantee</span>
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
            Specifications ({categoryName})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs">
            <div className="flex flex-col py-1 border-b border-gray-100">
              <span className="text-gray-400 font-medium text-[11px]">Brand</span>
              <span className="font-extrabold text-gray-900 text-xs mt-0.5">{product.brand}</span>
            </div>
            <div className="flex flex-col py-1 border-b border-gray-100">
              <span className="text-gray-400 font-medium text-[11px]">Category</span>
              <span className="font-extrabold text-gray-900 text-xs mt-0.5">{categoryName}</span>
            </div>
            {product.specs &&
              product.specs.map((item, idx) => (
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
            title={`Similar ${categoryName} Recommendations`}
          />
        </div>

        {/* Reviews */}
        <div>
          <CustomerReviewsSection
            category={product.category}
            productImage={product.imageUrl}
            productImages={gallery}
          />
        </div>

      </div>
    </div>
  );
}
