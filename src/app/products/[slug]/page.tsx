"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Star, ShieldCheck, RotateCcw, Truck, Award, Lock, Sparkles, Share2, Heart, CheckCircle, MapPin } from "lucide-react";
import { ALL_PRODUCTS } from "@/data/allProductsData";
import { useCartStore } from "@/stores/cartStore";
import { KottyBrandAplus } from "@/components/product/KottyBrandAplus";
import { RelatedProductsCarousel } from "@/components/product/RelatedProductsCarousel";
import { CustomerReviewsSection } from "@/components/product/CustomerReviewsSection";

export default function DynamicProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const product = ALL_PRODUCTS[slug] || ALL_PRODUCTS["kotty-mens-jeans"];

  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      imageUrl: product.imageUrl,
      rating: product.rating,
      ratingCount: product.ratingCount,
      category: product.category,
      isPrimeEligible: product.isPrimeEligible,
      deliveryDate: product.deliveryDate,
      tag: product.tag,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="w-full bg-white pb-14 text-[#0F1111]">
      {/* Category sub-strip bar */}
      <div className="w-full bg-gray-100 border-b border-gray-200 py-2 px-4 text-xs">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Link href="/" className="hover:text-[#007185] hover:underline">1PLACE</Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="font-semibold text-gray-800">{product.department}</span>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="font-bold text-[#1559ac]">{product.category}</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            ✓ 1PLACE Verified Seller
          </span>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-3 sm:px-6 pt-4 space-y-8">
        
        {/* Main 3-Column Product Flow (Gallery, Details, BuyBox) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* 1. Left Image Gallery (5 cols) */}
          <div className="lg:col-span-5 flex gap-3">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2 shrink-0">
              {product.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onMouseEnter={() => setSelectedImg(idx)}
                  onClick={() => setSelectedImg(idx)}
                  className={`w-12 h-14 rounded-md border p-1 bg-white flex items-center justify-center transition cursor-pointer ${
                    selectedImg === idx
                      ? "border-[#e77600] ring-2 ring-[#e77600]/30 shadow-xs"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="max-h-full max-w-full object-contain" />
                </button>
              ))}
            </div>

            {/* Main Stage */}
            <div className="flex-1 relative flex flex-col items-center">
              <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
                <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-xs hover:scale-105 transition">
                  <Share2 className="w-4 h-4 text-gray-600" />
                </button>
                <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-xs hover:scale-105 transition">
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              <div className="w-full h-[450px] sm:h-[520px] bg-white rounded-xl overflow-hidden flex items-center justify-center p-3 border border-gray-100">
                <img
                  src={product.galleryImages[selectedImg] || product.imageUrl}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Rufus AI Pill Prompt */}
              <div className="w-full mt-3 p-3 bg-[#f0f8ff] border border-[#cbe4fa] rounded-xl flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#007185]">
                  <Sparkles className="w-4 h-4 text-[#ff9900]" />
                  <span>Ask 1PLACE AI (Rufus)</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button className="bg-white border border-[#b2d5f8] px-3 py-1 rounded-full text-xs hover:bg-gray-50">
                    Is warranty covered in India?
                  </button>
                  <button className="bg-white border border-[#b2d5f8] px-3 py-1 rounded-full text-xs hover:bg-gray-50">
                    What is inside the box?
                  </button>
                  <button className="bg-[#1559ac] text-white px-3 py-1 rounded-full font-bold text-xs hover:bg-[#0f4484]">
                    Ask anything
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Center Column: Specs & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="text-xs font-bold text-[#007185] hover:underline cursor-pointer">
                Brand: {product.brand}
              </span>
              <h1 className="text-lg sm:text-2xl font-bold leading-snug mt-1 text-gray-900">
                {product.title}
              </h1>
            </div>

            {/* Ratings & Deal Badge */}
            <div className="space-y-1.5 pb-2 border-b border-gray-200">
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center text-amber-500">
                  <span className="font-extrabold mr-1 text-gray-900">{product.rating}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                </div>
                <span className="text-[#007185] hover:underline cursor-pointer">
                  ({product.ratingCount.toLocaleString()} ratings)
                </span>
              </div>
              {product.tag && (
                <span className="bg-[#cc0c39] text-white font-extrabold text-[11px] px-2 py-0.5 rounded-xs inline-block">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Price Box */}
            <div className="space-y-1 pb-3 border-b border-gray-200">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#cc0c39]">
                  -{product.discount}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-gray-950">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                M.R.P.: <span className="line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex items-center gap-2 pt-1 text-xs">
                <span className="bg-[#131921] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-xs">
                  ✓ Fulfilled
                </span>
                <span className="text-gray-600">Inclusive of all taxes</span>
              </div>
            </div>

            {/* Bullet Points */}
            <div className="space-y-2 text-xs">
              <h3 className="font-bold text-gray-900">About this item</h3>
              <ul className="list-disc pl-4 space-y-1 text-gray-700 leading-relaxed">
                {product.bulletPoints.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>

            {/* Specs Table */}
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 text-xs space-y-1.5">
              <h4 className="font-bold text-gray-900 mb-1">Key Specifications</h4>
              {product.specs.map((sp, i) => (
                <div key={i} className="flex justify-between border-b border-gray-200/60 pb-1">
                  <span className="text-gray-500 font-medium">{sp.label}</span>
                  <span className="text-gray-900 font-bold">{sp.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Right Column: BuyBox (3 cols) */}
          <div className="lg:col-span-3 lg:sticky lg:top-4 bg-white border border-[#d5d9d9] rounded-2xl p-4 shadow-sm space-y-3">
            <div>
              <div className="text-2xl font-black text-gray-950">
                ₹{product.price.toLocaleString("en-IN")}.00
              </div>
              <span className="text-xs text-emerald-700 font-bold block mt-1">
                {product.inStock ? "In stock" : "Out of stock"}
              </span>
            </div>

            <div className="text-xs text-gray-700 space-y-1">
              <p>
                <strong className="font-bold">FREE delivery</strong>{" "}
                <strong className="text-gray-900">{product.deliveryDate}</strong>.
              </p>
              <div className="flex items-center gap-1 text-[#007185] pt-0.5 cursor-pointer hover:underline text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-gray-600" />
                <span>Deliver to VINOTHK... - Ranipettai 632404</span>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-2 pt-1 text-xs">
              <span className="font-semibold text-gray-700">Quantity:</span>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="bg-gray-100 border border-gray-300 rounded px-2.5 py-1 font-bold text-xs"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-950 font-bold text-xs py-2.5 rounded-full shadow-xs active:scale-98 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {added ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <span>Add to cart</span>
                )}
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full bg-[#ffa41c] hover:bg-[#fa8900] text-gray-950 font-bold text-xs py-2.5 rounded-full shadow-xs active:scale-98 transition cursor-pointer"
              >
                Buy Now
              </button>
            </div>

            <div className="text-[11px] text-gray-500 pt-2 border-t border-gray-200 space-y-1">
              <div className="flex justify-between">
                <span>Ships from</span>
                <span className="text-gray-900 font-semibold">1PLACE</span>
              </div>
              <div className="flex justify-between">
                <span>Payment</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                  <Lock className="w-3 h-3" /> Secure transaction
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Brand A+ Lifestyle Lookbook if jeans/fashion, or standard A+ */}
        {product.slug === "kotty-mens-jeans" || product.department === "Men's Fashion" ? (
          <div className="pt-6 border-t border-gray-200">
            <KottyBrandAplus />
          </div>
        ) : (
          <div className="pt-6 border-t border-gray-200 bg-gray-50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-[#1559ac] text-white text-xs font-bold px-2.5 py-1 rounded">
                Official {product.brand} Brand Page
              </span>
              <span className="text-xs text-gray-500">• 100% Authentic Guaranteed</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Why Buy {product.title} on 1PLACE?
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              {product.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3 rounded-xl border border-gray-200">
                <span className="text-base font-bold text-emerald-700">✓ Genuine Warranty</span>
                <p className="text-xs text-gray-500 mt-0.5">Backed by official brand manufacturer support across India.</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200">
                <span className="text-base font-bold text-emerald-700">✓ Superfast Dispatch</span>
                <p className="text-xs text-gray-500 mt-0.5">Dispatched directly from 1PLACE fulfillment centers.</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200">
                <span className="text-base font-bold text-emerald-700">✓ 10-Day Easy Returns</span>
                <p className="text-xs text-gray-500 mt-0.5">Hassle-free doorstep pickup if not satisfied.</p>
              </div>
            </div>
          </div>
        )}

        {/* Similar Products */}
        <div>
          <RelatedProductsCarousel title={`More recommendations in ${product.category}`} />
        </div>

        {/* Reviews */}
        <div>
          <CustomerReviewsSection />
        </div>

      </div>
    </div>
  );
}
