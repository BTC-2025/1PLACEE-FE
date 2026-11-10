import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

interface WishlistStore {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  totalWishlistItems: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [
        {
          id: "wish-default-1",
          title: "OnePlus Nord CE4 Lite 5G (Super Silver, 8GB RAM, 128GB Storage)",
          name: "OnePlus Nord CE4 Lite 5G (Super Silver, 8GB RAM, 128GB Storage)",
          description: "5500 mAh battery, 80W SUPERVOOC charging, 120Hz AMOLED display",
          price: 19999,
          originalPrice: 20999,
          discount: 5,
          rating: 4.3,
          reviewsCount: 3824,
          imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
          image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
          category: "electronics",
          inStock: true,
        },
        {
          id: "wish-default-2",
          title: "Kotty Men's Relaxed Fit Light Blue Cotton Blend Denim Jeans",
          name: "Kotty Men's Relaxed Fit Light Blue Cotton Blend Denim Jeans",
          description: "Premium breathable denim fabric, 5-pocket styling",
          price: 799,
          originalPrice: 1999,
          discount: 60,
          rating: 4.2,
          reviewsCount: 1420,
          imageUrl: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=600&q=80",
          image: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=600&q=80",
          category: "fashion",
          inStock: true,
        },
      ],

      addToWishlist: (product: Product) => {
        set((state) => {
          if (state.items.some((i) => i.id === product.id)) return state;
          return { items: [...state.items, product] };
        });
      },

      removeFromWishlist: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      toggleWishlist: (product: Product) => {
        const exists = get().items.some((i) => i.id === product.id);
        if (exists) {
          get().removeFromWishlist(product.id);
        } else {
          get().addToWishlist(product);
        }
      },

      isInWishlist: (productId: string) => {
        return get().items.some((item) => item.id === productId);
      },

      clearWishlist: () => set({ items: [] }),

      totalWishlistItems: () => get().items.length,
    }),
    {
      name: "1place-wishlist-storage",
    }
  )
);
