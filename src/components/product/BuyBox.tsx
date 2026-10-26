"use client";

import React, { useState } from "react";
import { MapPin, Lock, ChevronDown, CheckCircle } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export const BuyBox: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({
      id: "kotty-mens-jeans-light",
      title: "KOTTY Mens Regular Fit | Classic Design with Stylish Look | Day Comfort Jeans",
      price: 401,
      originalPrice: 1999,
      imageUrl: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=400&q=80",
      rating: 3.6,
      ratingCount: 3175,
      category: "Men's Jeans",
      inStock: true,
      isPrimeEligible: true,
      deliveryDate: "Thursday, 29 October",
      tag: "Great Indian Festival",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white border border-[#d5d9d9] rounded-2xl p-4 shadow-sm space-y-3 text-[#0F1111]">
      {/* Price Header */}
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-semibold">₹</span>
          <span className="text-2xl font-black">401</span>
          <span className="text-xs font-semibold">00</span>
          <button className="text-[11px] text-[#007185] hover:underline ml-2">Price history</button>
        </div>
        <span className="bg-[#131921] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-xs inline-block mt-1">
          ✓ Fulfilled
        </span>
      </div>

      {/* Delivery Schedule Details */}
      <div className="text-xs space-y-1">
        <p className="text-gray-700">
          <strong className="text-gray-900 font-bold">FREE delivery</strong>{" "}
          <strong className="text-gray-900 font-bold">Thursday, 29 October</strong>. Limited Period Festive Offer.{" "}
          <span className="text-[#007185] hover:underline cursor-pointer">Details</span>
        </p>

        <p className="text-emerald-700 font-bold">
          🎉 Arrives 10 days before Diwali
        </p>

        <div className="flex items-start gap-1 text-[#007185] pt-1 cursor-pointer hover:underline">
          <MapPin className="w-3.5 h-3.5 text-gray-700 shrink-0 mt-0.5" />
          <span className="text-[11px] text-gray-700">
            Deliver to VINOTHK... - Ranipettai 632404
          </span>
        </div>
      </div>

      {/* Stock Status */}
      <div>
        <span className="text-lg font-bold text-[#007600] block">In stock</span>
        <div className="bg-[#e6f4ea] text-[#007600] text-[11px] font-semibold px-2 py-1 rounded-md mt-1 border border-[#c3e6cb]">
          Up to ₹60 cash back. ₹20 per unit on buying 2+
        </div>
      </div>

      {/* Quantity Dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-gray-700">Quantity:</span>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="bg-[#f0f2f2] border border-[#d5d9d9] rounded-md px-2.5 py-1 text-xs font-bold cursor-pointer hover:bg-[#e3e6e6] focus:outline-none"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* CTAs: Add to Cart & Buy Now */}
      <div className="space-y-2 pt-1">
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#0F1111] font-bold text-xs py-2.5 px-4 rounded-full shadow-xs active:scale-98 transition flex items-center justify-center gap-1.5 cursor-pointer"
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
          className="w-full bg-[#ffa41c] hover:bg-[#fa8900] text-[#0F1111] font-bold text-xs py-2.5 px-4 rounded-full shadow-xs active:scale-98 transition cursor-pointer"
        >
          Buy Now
        </button>
      </div>

      {/* Seller & Dispatch Info */}
      <div className="text-[11px] space-y-1 pt-2 border-t border-[#e7e7e7] text-gray-600">
        <div className="flex justify-between">
          <span>Ships from</span>
          <span className="text-gray-900 font-semibold">1PLACE</span>
        </div>
        <div className="flex justify-between">
          <span>Sold by</span>
          <span className="text-[#007185] hover:underline cursor-pointer font-semibold">
            Cocoblu Retail
          </span>
        </div>
        <div className="flex justify-between">
          <span>Gift options</span>
          <span className="text-[#007185] hover:underline cursor-pointer">Available at checkout</span>
        </div>
        <div className="flex justify-between">
          <span>Payment</span>
          <span className="text-gray-900 font-semibold flex items-center gap-1">
            <Lock className="w-3 h-3 text-emerald-600" /> Secure transaction
          </span>
        </div>
      </div>

      {/* Add to Wishlist Dropdown */}
      <div className="pt-1">
        <button className="w-full bg-[#f0f2f2] hover:bg-[#e3e6e6] border border-[#d5d9d9] text-xs font-semibold py-1.5 px-3 rounded-lg flex items-center justify-between text-gray-800 cursor-pointer">
          <span>Add to Wish List</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Amazon Business Card Box */}
      <div className="bg-[#f7fafa] border border-[#d5d9d9] rounded-xl p-3 text-xs space-y-1.5">
        <p className="font-extrabold text-[#002f36] tracking-tight">
          1PLACE <span className="text-blue-900">business</span>
        </p>
        <p className="text-[11px] text-gray-600">
          Save up to 6% on this product with business-only pricing.
        </p>
        <button className="w-full bg-white hover:bg-gray-50 border border-[#d5d9d9] text-[11px] font-bold py-1 px-2 rounded-md transition cursor-pointer">
          Switch to Business
        </button>
      </div>
    </div>
  );
};
