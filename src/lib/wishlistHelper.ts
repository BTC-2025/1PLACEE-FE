import { Product } from "@/types";

interface CardProductLike {
  id: string;
  name: string;
  price: string | number;
  originalPrice?: string | number;
  image: string;
  rating?: string | number;
  reviewsCount?: string | number;
  reviews?: string | number;
  category?: string;
}

function parsePrice(val: string | number | undefined): number {
  if (typeof val === "number") return val;
  if (!val) return 0;
  const num = Number(String(val).replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) ? num : 0;
}

/** Converts a home-card product item into a store-compatible Product for wishlist. */
export function toWishlistProduct(item: CardProductLike): Product {
  const price = parsePrice(item.price);
  const originalPrice = item.originalPrice ? parsePrice(item.originalPrice) : undefined;
  const discount =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : undefined;

  return {
    id: item.id,
    title: item.name,
    name: item.name,
    description: item.name,
    price,
    originalPrice,
    discount,
    rating: Number(item.rating) || 4.5,
    reviewsCount: Number(item.reviewsCount ?? item.reviews) || 0,
    imageUrl: item.image,
    image: item.image,
    category: item.category ?? "general",
    inStock: true,
  };
}
