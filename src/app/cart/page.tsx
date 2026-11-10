"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle,
} from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } =
    useCartStore();
  const { addToWishlist } = useWishlistStore();
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const subtotal = totalPrice();
  const deliveryCharge = subtotal > 499 || subtotal === 0 ? 0 : 40;
  const finalTotal = Math.max(0, subtotal - appliedDiscount + deliveryCharge);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "SAVE10") {
      setAppliedDiscount(Math.round(subtotal * 0.1));
    } else if (couponCode.trim().toUpperCase() === "FLAT100") {
      setAppliedDiscount(100);
    } else {
      alert("Invalid coupon code. Try 'SAVE10' or 'FLAT100'");
    }
  };

  const handleMoveToWishlist = (item: (typeof items)[0]) => {
    addToWishlist(item.product);
    removeFromCart(item.product.id);
  };

  if (isOrderPlaced) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
          <CheckCircle className="w-10 h-10 stroke-[2.5]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 max-w-md mb-6 text-sm">
          Thank you for shopping with 1PLACE. Your items will be dispatched and delivered within 1-2 business days.
        </p>
        <Link
          href="/"
          onClick={() => clearCart()}
          className="px-6 py-3 rounded-full bg-[#1559ac] hover:bg-[#11498e] text-white font-bold text-sm shadow-md transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f8fafc] min-h-[85vh] py-6 select-none">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 space-y-6">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
              {totalItems()} {totalItems() === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Empty Cart</span>
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl p-10 sm:p-16 border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto my-8">
            <div className="w-24 h-24 rounded-full bg-blue-50 text-[#1559ac] flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 stroke-[1.8]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Your 1PLACE Cart is empty
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md">
              Looks like you haven&apos;t added anything to your cart yet. Explore our bestsellers, deals, and fresh arrivals.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/"
                className="px-6 py-2.5 rounded-full bg-[#1559ac] hover:bg-[#11498e] text-white font-bold text-sm shadow-sm transition"
              >
                Start Shopping
              </Link>
              <Link
                href="/wishlist"
                className="px-6 py-2.5 rounded-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-bold text-sm shadow-2xs transition"
              >
                View Wishlist
              </Link>
            </div>
          </div>
        ) : (
          /* Cart Grid: Left Items List + Right Order Summary */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Items Column (8 cols) */}
            <div className="lg:col-span-8 space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
                >
                  {/* Thumbnail & Product Details */}
                  <div className="flex items-center gap-4 min-w-0">
                    <Link
                      href={`/products/${item.product.id}`}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100 flex items-center justify-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover hover:scale-105 transition duration-200"
                      />
                    </Link>

                    <div className="min-w-0 space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block">
                        {item.product.category || "General"}
                      </span>
                      <Link
                        href={`/products/${item.product.id}`}
                        className="text-sm sm:text-base font-bold text-gray-900 hover:text-[#1559ac] line-clamp-2 block transition-colors leading-snug"
                      >
                        {item.product.name}
                      </Link>
                      <div className="flex items-center gap-2">
                        <span className="text-base sm:text-lg font-black text-gray-900">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                        {item.product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{(item.product.originalPrice * item.quantity).toLocaleString("en-IN")}
                          </span>
                        )}
                        {item.product.discount && (
                          <span className="text-xs font-bold text-emerald-600">
                            {item.product.discount}% OFF
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Counter & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    {/* Stepper */}
                    <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50/80 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition cursor-pointer"
                        title="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-black text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition cursor-pointer"
                        title="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Move to Wishlist */}
                    <button
                      onClick={() => handleMoveToWishlist(item)}
                      title="Move to Wishlist"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                    >
                      Save for later
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      title="Remove item"
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 stroke-[2]" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Delivery Assurance Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white p-3 rounded-xl border border-gray-200/80 flex items-center gap-2.5 text-xs font-bold text-gray-700">
                  <Truck className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>Free delivery on orders over ₹499</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-gray-200/80 flex items-center gap-2.5 text-xs font-bold text-gray-700">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>100% Genuine Certified Products</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-gray-200/80 flex items-center gap-2.5 text-xs font-bold text-gray-700">
                  <RotateCcw className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Easy 7-day hassle-free returns</span>
                </div>
              </div>
            </div>

            {/* Right Summary Column (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Order Summary Card */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-sm space-y-4">
                <h3 className="text-lg font-black text-gray-900 border-b border-gray-100 pb-3">
                  Order Summary
                </h3>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (SAVE10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 outline-none uppercase font-bold focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {/* Pricing Breakdown */}
                <div className="space-y-2 text-xs sm:text-sm pt-1">
                  <div className="flex justify-between text-gray-600">
                    <span>Items Subtotal ({totalItems()} items):</span>
                    <span className="font-bold text-gray-900">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Discount Coupon Applied:</span>
                      <span>-₹{appliedDiscount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charges:</span>
                    <span>
                      {deliveryCharge === 0 ? (
                        <span className="text-emerald-600 font-bold">FREE</span>
                      ) : (
                        `₹${deliveryCharge}`
                      )}
                    </span>
                  </div>

                  <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline">
                    <span className="text-base font-black text-gray-900">Total Payable:</span>
                    <span className="text-xl sm:text-2xl font-black text-[#1559ac]">
                      ₹{finalTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => setIsOrderPlaced(true)}
                  className="w-full py-3.5 rounded-xl bg-[#ff9900] hover:bg-[#f78f00] active:bg-[#e68400] text-gray-900 font-extrabold text-sm shadow-sm transition active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Proceed to Buy</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

