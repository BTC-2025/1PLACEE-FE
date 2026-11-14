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
  Check,
  CreditCard,
  Wallet,
  Tag,
  Star,
  Heart,
  ChevronRight,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";

interface RecommendedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewsCount: number;
  image: string;
  colors: string[];
  express?: boolean;
}

const RECOMMENDED_PRODUCTS: RecommendedProduct[] = [
  {
    id: "rec-shoes-blue",
    name: "Adidas Grand Court Alpha Shoes",
    price: 3499,
    originalPrice: 5999,
    discount: 42,
    rating: 5.0,
    reviewsCount: 1,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    colors: ["#2563eb", "#eab308", "#ffffff"],
    express: true,
  },
  {
    id: "rec-shoes-black",
    name: "Adidas Grand Court Alpha 00S Black...",
    price: 3299,
    originalPrice: 5999,
    discount: 45,
    rating: 5.0,
    reviewsCount: 1,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80",
    colors: ["#111827", "#ffffff", "#3b82f6"],
    express: true,
  },
  {
    id: "rec-shoes-green",
    name: "Adidas Grand Court Alpha 00S Green...",
    price: 3299,
    originalPrice: 5999,
    discount: 45,
    rating: 5.0,
    reviewsCount: 1,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600&q=80",
    colors: ["#15803d", "#ef4444", "#3b82f6"],
    express: true,
  },
  {
    id: "rec-shoes-grey",
    name: "Adidas Grand Court Alpha 00S Shoes",
    price: 3899,
    originalPrice: 5999,
    discount: 35,
    rating: 5.0,
    reviewsCount: 3,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
    colors: ["#6b7280", "#ffffff"],
    express: true,
  },
  {
    id: "rec-shoes-court24",
    name: "Adidas Court 24 Classic Tennis",
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    rating: 5.0,
    reviewsCount: 3,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80",
    colors: ["#ffffff", "#166534"],
    express: true,
  },
];

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeFromCart, clearCart, addToCart } = useCartStore();
  const { addToWishlist, isInWishlist } = useWishlistStore();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [useWallet, setUseWallet] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const walletBalance = 500; // ₹500 Available Wallet Balance

  React.useEffect(() => {
    setMounted(true);
    // If cart is empty (e.g. user had cleared it previously), auto-add the default Adidas item from screenshot
    const currentItems = useCartStore.getState().items;
    if (currentItems.length === 0) {
      addToCart({
        id: "adidas-grand-court-alpha",
        title: "Adidas - Grand Court Alpha Shoes",
        name: "Adidas - Grand Court Alpha Shoes",
        description: "Classic court styling with cloudfoam comfort and premium leather upper",
        price: 2200,
        originalPrice: 3999,
        discount: 45,
        rating: 4.8,
        reviewsCount: 384,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
        category: "shoes",
        inStock: true,
      }, 1);
      setSelectedIds(["adidas-grand-court-alpha"]);
    } else {
      setSelectedIds(currentItems.map((i) => i.product.id));
    }
  }, []);

  React.useEffect(() => {
    // Keep selected IDs in sync when items change
    if (items.length > 0 && selectedIds.length === 0) {
      setSelectedIds(items.map((i) => i.product.id));
    }
  }, [items.length]);

  // Selected items calculation
  const selectedItems = items.filter((item) => selectedIds.includes(item.product.id));
  const selectedCount = selectedItems.reduce((acc, item) => acc + item.quantity, 0);

  const itemsOriginalPrice = selectedItems.reduce(
    (acc, item) => acc + (item.product.originalPrice || item.product.price) * item.quantity,
    0
  );
  const subtotal = selectedItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const savings = Math.max(0, itemsOriginalPrice - subtotal);
  const deliveryFee = subtotal > 499 || subtotal === 0 ? 0 : 49;
  const walletDeduction = useWallet ? Math.min(walletBalance, subtotal - appliedDiscount) : 0;
  const finalTotal = Math.max(0, subtotal - appliedDiscount + deliveryFee - walletDeduction);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((i) => i.product.id));
    }
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "SAVE10" || code === "INDIA10") {
      const disc = Math.round(subtotal * 0.1);
      setAppliedDiscount(disc);
      setIsCouponApplied(true);
    } else if (code === "FLAT100" || code === "EXTRA100") {
      setAppliedDiscount(100);
      setIsCouponApplied(true);
    } else if (code === "FIRSTORDER") {
      setAppliedDiscount(150);
      setIsCouponApplied(true);
    } else {
      alert("Invalid coupon code. Try 'SAVE10', 'FLAT100', or 'FIRSTORDER'");
    }
  };

  if (!mounted) {
    return (
      <div className="w-full bg-[#f8fafc] min-h-[85vh] py-10 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isOrderPlaced) {
    return (
      <div className="w-full min-h-[75vh] flex flex-col items-center justify-center p-6 text-center bg-[#f8fafc]">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-sm animate-in zoom-in-95">
          <Check className="w-10 h-10 stroke-[3]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 max-w-md mb-6 text-sm">
          Thank you for choosing 1PLACE. Your items are being packed and will be delivered by{" "}
          <strong className="text-gray-900">Saturday, Nov 14</strong>.
        </p>
        <Link
          href="/"
          onClick={() => clearCart()}
          className="px-8 py-3.5 rounded-full bg-[#1559ac] hover:bg-[#11498e] text-white font-black text-sm shadow-md transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f8fafc] min-h-[90vh] py-6 sm:py-8 select-none">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 space-y-6">
        {/* Main Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
            My Cart
          </h1>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Cart</span>
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl p-10 sm:p-16 border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-4 max-w-xl mx-auto my-8">
            <div className="w-20 h-20 rounded-full bg-blue-50 text-[#1559ac] flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 stroke-[1.8]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Your Cart is empty
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md">
              Looks like you haven&apos;t added anything to your cart yet. Explore our recommended items below!
            </p>
            <Link
              href="/"
              className="px-6 py-2.5 rounded-full bg-[#1559ac] hover:bg-[#11498e] text-white font-bold text-sm shadow-sm transition"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          /* 2-Column Layout (Matching Image 1 & 2) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (8 cols): Express Cart Item Card + Safe Payment Banner */}
            <div className="lg:col-span-8 space-y-5">
              {/* Cart Items List */}
              <div className="space-y-4">
                {items.map((item) => {
                  const isSelected = selectedIds.includes(item.product.id);
                  const price = item.product.price;
                  const originalPrice = item.product.originalPrice || Math.round(price * 1.5);
                  const discountPercent =
                    item.product.discount ||
                    Math.round(((originalPrice - price) / originalPrice) * 100);

                  return (
                    <div
                      key={item.product.id}
                      className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden transition hover:shadow-md"
                    >
                      {/* Express Header Banner (Matching Image 2 Yellow Express Bar) */}
                      <div className="bg-[#fee000] px-4 py-1.5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="italic font-black text-xs text-gray-900 tracking-wider">
                            ⚡ express
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-gray-800">
                          Guaranteed Delivery
                        </span>
                      </div>

                      {/* Main Item Content Row */}
                      <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-start justify-between">
                        {/* Checkbox + Image + Details */}
                        <div className="flex items-start gap-3.5 min-w-0">
                          {/* Selection Checkbox */}
                          <button
                            onClick={() => toggleSelect(item.product.id)}
                            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-1 cursor-pointer transition ${
                              isSelected
                                ? "bg-[#4338ca] text-white border border-[#4338ca]"
                                : "border-2 border-gray-300 hover:border-gray-400 bg-white"
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </button>

                          {/* Product Thumbnail with Stepper below */}
                          <div className="flex flex-col items-center gap-2 shrink-0">
                            <Link
                              href={`/products/${item.product.id}`}
                              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-1.5"
                            >
                              <img
                                src={item.product.image || item.product.imageUrl}
                                alt={item.product.name || item.product.title}
                                className="w-full h-full object-contain hover:scale-105 transition duration-200"
                              />
                            </Link>

                            {/* Quantity Stepper (Matching Image 2 Trash + Qty Stepper) */}
                            <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden shadow-2xs">
                              <button
                                onClick={() => {
                                  if (item.quantity === 1) {
                                    removeFromCart(item.product.id);
                                  } else {
                                    updateQuantity(item.product.id, item.quantity - 1);
                                  }
                                }}
                                className="w-7 h-7 flex items-center justify-center text-red-500 hover:bg-red-50 transition cursor-pointer"
                                title="Decrease or remove"
                              >
                                {item.quantity === 1 ? (
                                  <Trash2 className="w-3.5 h-3.5" />
                                ) : (
                                  <Minus className="w-3 h-3" />
                                )}
                              </button>
                              <span className="w-7 text-center text-xs font-black text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition cursor-pointer font-bold"
                                title="Increase"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="min-w-0 space-y-1.5 flex-1">
                            <Link
                              href={`/products/${item.product.id}`}
                              className="text-sm sm:text-base font-black text-gray-900 hover:text-blue-600 line-clamp-2 block transition-colors leading-snug"
                            >
                              {item.product.name || item.product.title}
                            </Link>

                            {/* Variant / Size Pill (Matching Image: Size: 43 1/3 · Color: Blue >) */}
                            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-gray-100 border border-gray-200 text-[11px] font-bold text-gray-700 cursor-pointer hover:bg-gray-200 transition">
                              <span>Size: 43 1/3 · Color: Blue</span>
                              <ChevronRight className="w-3 h-3 text-gray-500" />
                            </div>

                            {/* Delivery Date Promise */}
                            <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium pt-0.5">
                              <span>Get it</span>
                              <span className="font-extrabold text-gray-900 bg-yellow-100 px-1.5 py-0.5 rounded">Tomorrow</span>
                            </div>
                            <div className="flex items-center gap-1 text-[11px] text-gray-500">
                              <Clock className="w-3 h-3 text-emerald-600" />
                              <span>Order in 3 hrs 41 mins</span>
                            </div>

                            {/* Extra Discount Coupon Pills (Matching Screenshot: Extra 15% off, Extra 10% off) */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {["Extra 15% off", "Extra 10% off"].map(
                                (pill, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-dashed border-emerald-300 rounded px-2 py-0.5"
                                  >
                                    {pill}
                                  </span>
                                )
                              )}
                            </div>

                            {/* Stock Indicator */}
                            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700 pt-0.5">
                              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                              <span>Only 3 left in stock - order soon</span>
                            </div>
                          </div>
                        </div>

                        {/* Price Details & Delete Icon */}
                        <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                          {/* Trash Delete Button */}
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            title="Remove item"
                            className="w-8 h-8 rounded-full border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 flex items-center justify-center transition cursor-pointer order-2 sm:order-1"
                          >
                            <Trash2 className="w-4 h-4 stroke-[2]" />
                          </button>

                          {/* Price Stack in Indian Rupees ₹ */}
                          <div className="text-right order-1 sm:order-2 space-y-0.5">
                            <div className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                              ₹{(price * item.quantity).toLocaleString("en-IN")}
                            </div>
                            <div className="flex items-center justify-end gap-1 text-xs">
                              <span className="font-black text-emerald-600">
                                {discountPercent}% OFF
                              </span>
                              <span className="text-gray-400 line-through">
                                ₹{(originalPrice * item.quantity).toLocaleString("en-IN")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Safe & Secure Payment Transaction Section (Matching Image 1) */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-emerald-600">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-gray-900">
                      Safe & Secure Payment Transaction
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">Pay the way you prefer</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                  {/* Card Option: Cards / UPI */}
                  <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/60 hover:bg-white hover:border-blue-400 transition cursor-pointer space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xs text-blue-800 tracking-wider">VISA</span>
                      <span className="w-3.5 h-3.5 rounded-full bg-red-500 inline-block -mr-1" />
                      <span className="w-3.5 h-3.5 rounded-full bg-amber-500 inline-block" />
                      <span className="text-[11px] font-black text-blue-600 ml-1">UPI / RuPay</span>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-snug">
                      Enjoy secure and convenient card & UPI payments with Visa, Mastercard, RuPay & more
                    </p>
                  </div>

                  {/* Card Option: Instant UPI & Net Banking */}
                  <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/60 hover:bg-white hover:border-blue-400 transition cursor-pointer space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-gray-900">
                      <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>Instant UPI / NetBanking</span>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-snug">
                      Pay instantly with Google Pay, PhonePe, Paytm or all Indian Banks NetBanking
                    </p>
                  </div>

                  {/* Card Option: Cash on Delivery */}
                  <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/60 hover:bg-white hover:border-blue-400 transition cursor-pointer space-y-1.5 md:col-span-2">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-gray-900">
                      <span className="text-base">💵</span>
                      <span>Cash on Delivery (COD)</span>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-snug">
                      Enjoy the convenience of <strong>Cash on Delivery</strong> and pay when your order arrives at your doorstep
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (4 cols): Order Summary, Coupons, Wallet, Payment Offers */}
            <div className="lg:col-span-4 space-y-4">
              {/* 1. Order Summary Card (Matching Image 1 & 2) */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="text-base font-black text-gray-900">
                    Order Summary
                  </h3>
                  <span className="text-xs font-bold text-gray-500">
                    {selectedCount} {selectedCount === 1 ? "item" : "items"}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Subtotal:</span>
                    <div className="flex items-center gap-2">
                      {savings > 0 && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{itemsOriginalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                      <span className="font-extrabold text-gray-900">
                        ₹{subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Shipping Fee */}
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Shipping Fee:</span>
                    <div className="flex items-center gap-1.5">
                      {deliveryFee === 0 ? (
                        <>
                          <span className="text-xs text-gray-400 line-through">₹49.00</span>
                          <span className="font-black text-emerald-600">FREE</span>
                        </>
                      ) : (
                        <span className="font-bold text-gray-900">₹{deliveryFee}.00</span>
                      )}
                    </div>
                  </div>

                  {/* Coupon Applied */}
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between items-center text-emerald-600 font-bold">
                      <span>Coupon Discount:</span>
                      <span>-₹{appliedDiscount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  {/* Wallet Used */}
                  {useWallet && walletDeduction > 0 && (
                    <div className="flex justify-between items-center text-blue-600 font-bold">
                      <span>Wallet Balance Used:</span>
                      <span>-₹{walletDeduction.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  {/* Total Incl of GST */}
                  <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline">
                    <div>
                      <span className="text-base font-black text-gray-900 block leading-tight">
                        Total
                      </span>
                      <span className="text-[10px] text-gray-400 font-semibold">
                        (Incl. of GST & Taxes)
                      </span>
                    </div>
                    <span className="text-2xl font-black text-[#1559ac] tracking-tight">
                      ₹{finalTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Checkout Primary Button (Blue / Indigo as in Image 1 & 2) */}
                <button
                  onClick={() => setIsOrderPlaced(true)}
                  disabled={selectedCount === 0}
                  className={`w-full py-3.5 rounded-xl text-white font-black text-sm shadow-md transition active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer ${
                    selectedCount === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af]"
                  }`}
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              {/* 2. Got a Coupon? Card (Matching Image 2) */}
              <div className="bg-white rounded-2xl p-4 border border-gray-200/90 shadow-xs space-y-3">
                <span className="text-xs font-black text-gray-800 block">
                  Got a coupon?
                </span>

                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 text-xs px-3 py-2 rounded-xl border border-gray-200 uppercase font-extrabold outline-none focus:border-blue-500 bg-gray-50/70"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-black transition cursor-pointer"
                  >
                    APPLY
                  </button>
                </form>

                {/* Offers Highlight Badge */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-800 text-xs font-bold cursor-pointer hover:bg-emerald-100/70 transition">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Save extra ₹150 with Indian festive offers!</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-emerald-600" />
                </div>
              </div>

              {/* 3. Pay Using Your Wallet (Matching Image 1) */}
              <div className="bg-white rounded-2xl p-4 border border-gray-200/90 shadow-xs space-y-2.5">
                <span className="text-[11px] font-black uppercase text-gray-500 tracking-wider block">
                  PAY USING YOUR WALLET
                </span>

                <div
                  onClick={() => setUseWallet((prev) => !prev)}
                  className={`p-3 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                    useWallet
                      ? "bg-blue-50 border-blue-400"
                      : "bg-gray-50/70 border-gray-200 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold text-gray-900 block">
                        Pay Using Wallet Balance
                      </span>
                      <span className="text-[11px] text-gray-500">
                        Available Balance:{" "}
                        <strong className="text-emerald-600">₹{walletBalance}.00</strong>
                      </span>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={useWallet}
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* 4. Special Bank & Payment Offers (Matching Image 2 Noon / Indian Cards) */}
              <div className="bg-white rounded-2xl p-4 border border-gray-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-gray-800">
                    1PLACE Bank Partner Offers
                  </span>
                  <span className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">
                    View All
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-yellow-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-black text-gray-900 block">
                      HDFC & SBI Credit Cards
                    </span>
                    <p className="text-[10px] text-gray-600">
                      ✦ Get 5% unlimited instant cashback
                    </p>
                    <p className="text-[10px] text-gray-600">
                      ✦ ₹500 welcome bonus on approval
                    </p>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-black text-white text-[11px] font-bold cursor-pointer transition shrink-0">
                    Apply Now
                  </button>
                </div>

                {/* No-Cost EMI Options */}
                <div className="pt-1">
                  <span className="text-[11px] font-bold text-gray-500 block mb-1.5">
                    Easy Pay In Installments (EMI)
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-2 rounded-xl bg-gray-50 border border-gray-200 text-center">
                      <span className="text-[10px] text-gray-500 block">Pay in 3 months</span>
                      <span className="text-xs font-black text-gray-900">
                        ₹{Math.round(finalTotal / 3).toLocaleString("en-IN")}/mo
                      </span>
                    </div>
                    <div className="flex-1 p-2 rounded-xl bg-gray-50 border border-gray-200 text-center">
                      <span className="text-[10px] text-gray-500 block">Pay in 6 months</span>
                      <span className="text-xs font-black text-gray-900">
                        ₹{Math.round(finalTotal / 6).toLocaleString("en-IN")}/mo
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended for You Section (Matching Image 2 Slider with Shoes / Accessories) */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200/90 shadow-sm space-y-5 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                Recommended for you
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Based on items in your cart & browsing history
              </p>
            </div>
            <Link
              href="/categories"
              className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-0.5"
            >
              <span>See More</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Product Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
            {RECOMMENDED_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-3 hover:shadow-lg transition duration-200 relative"
              >
                {/* Wishlist Heart Icon */}
                <button
                  onClick={() =>
                    addToWishlist({
                      id: prod.id,
                      name: prod.name,
                      title: prod.name,
                      price: prod.price,
                      originalPrice: prod.originalPrice,
                      discount: prod.discount,
                      rating: prod.rating,
                      imageUrl: prod.image,
                      image: prod.image,
                      category: "shoes",
                      inStock: true,
                    })
                  }
                  className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-white/90 hover:bg-white shadow-xs border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 transition cursor-pointer"
                  title="Add to Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isInWishlist(prod.id) ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </button>

                {/* Product Image */}
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-2 mb-2 relative">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                  />
                  {/* Color Swatch Dots (Matching Image 2) */}
                  <div className="absolute bottom-2 right-2 flex flex-col gap-1 items-center">
                    {prod.colors.map((c, i) => (
                      <span
                        key={i}
                        style={{ backgroundColor: c }}
                        className="w-2.5 h-2.5 rounded-full border border-white shadow-2xs"
                      />
                    ))}
                    <span className="text-[9px] font-bold text-gray-500 leading-none">
                      {prod.colors.length}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {prod.name}
                    </h3>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 pt-1">
                      <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                      <span>{prod.rating.toFixed(1)}</span>
                      <span className="text-gray-400 font-normal">({prod.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Pricing in Indian Rupees ₹ */}
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm sm:text-base font-black text-gray-900">
                        ₹{prod.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[11px] text-gray-400 line-through">
                        ₹{prod.originalPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[10px] font-extrabold text-emerald-600">
                        {prod.discount}%
                      </span>
                    </div>

                    {/* Express Badge */}
                    {prod.express && (
                      <div className="flex items-center gap-1 mt-1.5">
                        <span className="text-[10px] font-black italic bg-[#fee000] text-gray-900 px-1.5 py-0.5 rounded tracking-wide">
                          express
                        </span>
                        <span className="text-[10px] font-bold text-gray-500">Tomorrow</span>
                      </div>
                    )}

                    {/* Add to Cart Quick Button */}
                    <button
                      onClick={() =>
                        addToCart({
                          id: prod.id,
                          name: prod.name,
                          title: prod.name,
                          price: prod.price,
                          originalPrice: prod.originalPrice,
                          discount: prod.discount,
                          rating: prod.rating,
                          imageUrl: prod.image,
                          image: prod.image,
                          category: "shoes",
                          inStock: true,
                        })
                      }
                      className="w-full mt-2 py-1.5 rounded-lg bg-gray-50 hover:bg-[#1559ac] text-gray-800 hover:text-white border border-gray-200 hover:border-transparent font-bold text-xs transition cursor-pointer"
                    >
                      + Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
