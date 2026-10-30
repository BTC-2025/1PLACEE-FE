export interface BabyGearProduct {
  id: string;
  name: string;
  rating?: string;
  reviews?: string;
  price: string;
  originalPrice: string;
  discount: string;
  savedAmount?: string;
  image: string;
  href: string;
}

export const BABYGEAR_PRODUCTS: BabyGearProduct[] = [
  {
    id: "neobreez-stroller",
    name: "Neobreez Vomx1 Ultra Lightweight Stroller Olive...",
    price: "₹369",
    originalPrice: "₹649",
    discount: "43.14% OFF",
    savedAmount: "You saved ₹280",
    image: "/banners/babygear-neobreez-stroller.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "littleangel-walker",
    name: "Little Angel 5-in-1 Learning Baby Walker with Ride-On,...",
    price: "₹269.85",
    originalPrice: "₹337.31",
    discount: "20% OFF",
    savedAmount: "You saved ₹67.46",
    image: "/banners/babygear-littleangel-walker.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "ingenuity-stroller",
    name: "Summer by Ingenuity, 3Dlite Plus Convenience Stroller,...",
    rating: "4.2",
    reviews: "8",
    price: "₹659",
    originalPrice: "₹1,011",
    discount: "34.82% OFF",
    savedAmount: "You saved ₹352",
    image: "/banners/babygear-ingenuity-stroller.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "diaper-backpack",
    name: "Little Story Diaper Backpack With Changing Pad And...",
    price: "₹139",
    originalPrice: "₹189",
    discount: "26.46% OFF",
    savedAmount: "You saved ₹50",
    image: "/banners/babygear-diaper-backpack.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "baby-carrier",
    name: "Neobreez Zavii Convertible Baby Carrier Toddler Black...",
    price: "₹149",
    originalPrice: "₹249",
    discount: "40.16% OFF",
    savedAmount: "You saved ₹100",
    image: "/banners/babygear-baby-carrier.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "baby-carseat",
    name: "All-in-One Convertible Car Seat with Side Impact Protection",
    rating: "4.8",
    reviews: "89",
    price: "₹899",
    originalPrice: "₹1,299",
    discount: "30.79% OFF",
    savedAmount: "You saved ₹400",
    image: "/banners/babygear-baby-carseat.jpg",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "travel-crib",
    name: "Ultra-Compact Lightweight Foldable Baby Travel Crib & Playard",
    rating: "4.6",
    reviews: "45",
    price: "₹499",
    originalPrice: "₹749",
    discount: "33.38% OFF",
    savedAmount: "You saved ₹250",
    image: "/banners/babygear-travel-crib.jpg",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "high-chair",
    name: "Modern Multi-Stage Adjustable Baby High Chair with Tray",
    rating: "4.7",
    reviews: "62",
    price: "₹389",
    originalPrice: "₹599",
    discount: "35.06% OFF",
    savedAmount: "You saved ₹210",
    image: "/banners/babygear-high-chair.jpg",
    href: "/products/kotty-mens-jeans",
  },
];
