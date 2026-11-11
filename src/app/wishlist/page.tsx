"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  Trash2,
  ShoppingCart,
  Star,
  ShoppingBag,
  ArrowRight,
  Check,
} from "lucide-react";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useCartStore } from "@/stores/cartStore";

export default function WishlistPage() {
  const [mounted, setMounted] = React.useState(false);
  const { items, removeFromWishlist, clearWishlist, totalWishlistItems } =
    useWishlistStore();
  const { addToCart } = useCartStore();
  const [addedItemIds, setAddedItemIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full bg-[#f8fafc] min-h-[85vh] py-6 select-none flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleMoveToCart = (product: (typeof items)[0]) => {
    addToCart(product, 1);
    setAddedItemIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      removeFromWishlist(product.id);
      setAddedItemIds((prev) => prev.filter((id) => id !== product.id));
    }, 600);
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-[85vh] py-6 select-none">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 space-y-6">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
              My Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
              {totalWishlistItems()} {totalWishlistItems() === 1 ? "item" : "items"} saved for later
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Wishlist</span>
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty Wishlist State */
          <div className="bg-white rounded-3xl p-10 sm:p-16 border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto my-8">
            <div className="w-24 h-24 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
              <Heart className="w-12 h-12 stroke-[1.8] fill-rose-100" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Your Wishlist is empty
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md">
              Explore more and shortlist items you love by clicking the heart icon on any product.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/"
                className="px-6 py-2.5 rounded-full bg-[#1559ac] hover:bg-[#11498e] text-white font-bold text-sm shadow-sm transition"
              >
                Discover Products
              </Link>
              <Link
                href="/cart"
                className="px-6 py-2.5 rounded-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-bold text-sm shadow-2xs transition"
              >
                Go to Cart
              </Link>
            </div>
          </div>
        ) : (
          /* Wishlist Items Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {items.map((product) => {
              const isAdded = addedItemIds.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl p-4 border border-gray-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative"
                >
                  {/* Remove cross button */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    title="Remove from wishlist"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center shadow-xs transition z-10 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 stroke-[2]" />
                  </button>

                  {/* Thumbnail */}
                  <Link
                    href={`/products/${product.id}`}
                    className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-2 mb-3"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Info */}
                  <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating Badge */}
                      {product.rating && (
                        <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md w-fit mb-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                          <span>{product.rating}</span>
                          <span className="text-gray-400 font-normal">
                            ({product.reviewsCount?.toLocaleString() || "1k+"})
                          </span>
                        </div>
                      )}

                      <Link
                        href={`/products/${product.id}`}
                        className="text-xs sm:text-sm font-bold text-gray-900 hover:text-[#1559ac] line-clamp-2 transition-colors leading-snug"
                      >
                        {product.name}
                      </Link>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-lg font-black text-gray-900">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                        {product.discount && (
                          <span className="text-xs font-bold text-emerald-600">
                            {product.discount}% OFF
                          </span>
                        )}
                      </div>

                      {/* Move to Cart Action Button */}
                      <button
                        onClick={() => handleMoveToCart(product)}
                        disabled={isAdded}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-xs cursor-pointer ${
                          isAdded
                            ? "bg-emerald-600 text-white"
                            : "bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>Moved to Cart!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            <span>Move to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

