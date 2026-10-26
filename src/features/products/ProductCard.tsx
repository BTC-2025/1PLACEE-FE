"use client";

import React from "react";
import Image from "next/image";
import { Star, ShieldCheck, Zap, Plus } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/stores/cartStore";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  // Discount percentage calculation
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative p-3">
      {/* Badge / Deal Tag */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.tag && (
          <span className="bg-brand-red text-white font-extrabold text-[10px] uppercase px-2 py-0.5 rounded shadow-sm tracking-wider">
            {product.tag}
          </span>
        )}
        {discountPercent && (
          <span className="bg-brand-orange text-brand-dark font-black text-[10px] px-1.5 py-0.5 rounded shadow-sm">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Product Image Frame */}
      <div className="w-full h-48 sm:h-56 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-2 relative group-hover:scale-[1.02] transition-transform">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="max-h-full max-w-full object-contain mix-blend-multiply"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col mt-3">
        {/* Category */}
        <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mt-1 group-hover:text-brand-blue transition-colors">
          {product.title}
        </h3>

        {/* Ratings */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
            <span className="text-xs font-bold ml-1 text-gray-800">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-400">({product.ratingCount.toLocaleString()})</span>
        </div>

        {/* Price Section */}
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-lg sm:text-xl font-black text-gray-950">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Prime & Delivery info */}
        <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-600">
          {product.isPrimeEligible && (
            <span className="inline-flex items-center gap-0.5 font-black text-brand-blue text-[11px]">
              <Zap className="w-3 h-3 fill-brand-orange text-brand-orange" /> 1PLACE Prime
            </span>
          )}
          {product.deliveryDate && (
            <span className="text-[11px] text-gray-500 truncate">
              • {product.deliveryDate}
            </span>
          )}
        </div>

        {/* Add to Cart Action */}
        <button
          onClick={() => addToCart(product)}
          className="mt-3.5 w-full bg-brand-yellow hover:bg-brand-orange text-brand-dark font-bold text-xs sm:text-sm py-2 px-3 rounded-full flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
};
