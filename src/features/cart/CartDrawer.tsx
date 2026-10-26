"use client";

import React from "react";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export const CartDrawer: React.FC = () => {
  const { items, isCartOpen, toggleCart, updateQuantity, removeFromCart, totalPrice, totalItems } =
    useCartStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={toggleCart}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer content */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 bg-brand-dark text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-yellow" />
              <h2 className="text-base font-bold">Shopping Cart ({totalItems()})</h2>
            </div>
            <button
              onClick={toggleCart}
              className="text-gray-400 hover:text-white p-1 rounded-md transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-3 stroke-1" />
                <h3 className="font-bold text-gray-800 text-lg">Your 1PLACE Cart is empty</h3>
                <p className="text-sm mt-1 text-gray-400">Add exciting items to start shopping!</p>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div key={product.id} className="py-4 flex gap-3 items-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg p-1 border border-gray-100 flex items-center justify-center shrink-0">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-gray-900 truncate">{product.title}</h4>
                    <p className="text-sm font-bold text-brand-red mt-0.5">
                      ₹{(product.price * quantity).toLocaleString("en-IN")}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-gray-300 rounded-md bg-gray-50">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-2 py-0.5 text-xs font-bold text-gray-700 hover:bg-gray-200"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="px-2 py-0.5 text-xs font-bold text-gray-700 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-gray-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">Subtotal</span>
                <span className="text-xl font-black text-gray-950">
                  ₹{totalPrice().toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-[11px] text-green-700 font-semibold mb-3">
                ✓ Free Universal Prime Express Delivery Applied
              </p>
              <button className="w-full bg-brand-yellow hover:bg-brand-orange text-brand-dark font-extrabold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition">
                Proceed to 1-Click Checkout <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
