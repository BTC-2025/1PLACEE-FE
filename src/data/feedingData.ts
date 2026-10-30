export interface FeedingProduct {
  id: string;
  name: string;
  rating?: string;
  reviews?: string;
  price: string;
  originalPrice: string;
  discount: string;
  savedAmount?: string;
  badge?: string;
  image: string;
  href: string;
}

export const FEEDING_PRODUCTS: FeedingProduct[] = [
  {
    id: "doopser-wireless",
    name: "Doopser - Wireless Hands Free Electric Wearable...",
    rating: "4.2",
    reviews: "8",
    price: "₹195",
    originalPrice: "₹321",
    discount: "39.25% OFF",
    savedAmount: "You saved ₹126",
    badge: "Best Seller",
    image: "/banners/feeding-doopser-wireless.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "doopser-wearable",
    name: "Doopser - Single Wearable spare Cup, Hands-Free,...",
    rating: "4.4",
    reviews: "10",
    price: "₹53",
    originalPrice: "₹86",
    discount: "38.37% OFF",
    savedAmount: "You saved ₹33",
    badge: "Best Seller",
    image: "/banners/feeding-doopser-wearable.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "starbabies-pads",
    name: "Star Babies Pack of 60 Disposable Breast Pads -...",
    price: "₹43",
    originalPrice: "₹145",
    discount: "70.34% OFF",
    savedAmount: "You saved ₹102",
    badge: "Exclusive Price",
    image: "/banners/feeding-starbabies-pads.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "feeding-paw-set",
    name: "Babies Basic Feeding Set, 3 Piece, Silicone Feeding Paw...",
    price: "₹80",
    originalPrice: "₹102",
    discount: "21.57% OFF",
    savedAmount: "You saved ₹22",
    image: "/banners/feeding-paw-set.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "silicone-plate",
    name: "Babies Basic Silicone Feeding Set with Silicone Suction...",
    price: "₹85",
    originalPrice: "₹109",
    discount: "22.02% OFF",
    savedAmount: "You saved ₹24",
    image: "/banners/feeding-silicone-plate.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "baby-bottle",
    name: "Anti-Colic Natural Glass Baby Feeding Bottles (Pack of 2, 240ml)",
    rating: "4.8",
    reviews: "95",
    price: "₹249",
    originalPrice: "₹399",
    discount: "37.59% OFF",
    savedAmount: "You saved ₹150",
    badge: "Best Seller",
    image: "/banners/feeding-baby-bottle.jpg",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "baby-bowl",
    name: "Organic Bamboo Suction Baby Feeding Bowl with Soft Spoon",
    rating: "4.6",
    reviews: "52",
    price: "₹135",
    originalPrice: "₹199",
    discount: "32.16% OFF",
    savedAmount: "You saved ₹64",
    image: "/banners/feeding-baby-bowl.jpg",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "baby-utensils",
    name: "Silicone Training Utensils Spoon & Fork Set for Toddlers",
    rating: "4.5",
    reviews: "34",
    price: "₹99",
    originalPrice: "₹150",
    discount: "34% OFF",
    savedAmount: "You saved ₹51",
    image: "/banners/feeding-baby-utensils.jpg",
    href: "/products/kotty-mens-jeans",
  },
];
