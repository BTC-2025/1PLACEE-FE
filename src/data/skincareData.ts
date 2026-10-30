export interface SkincareProduct {
  id: string;
  name: string;
  rating?: string;
  reviews?: string;
  price: string;
  originalPrice: string;
  discount: string;
  savedAmount?: string;
  isExpressDelivery?: boolean;
  image: string;
  href: string;
}

export const SKINCARE_PRODUCTS: SkincareProduct[] = [
  {
    id: "acm-gel",
    name: "ACM Gel Nettoyant Cleansing Gel 200ml Gentl...",
    rating: "4.5",
    reviews: "6",
    price: "₹54",
    originalPrice: "₹67.50",
    discount: "20% OFF",
    savedAmount: "You saved ₹13.50",
    image: "/banners/skincare-acm-gel.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "anua-heartleaf",
    name: "Anua Heartleaf Pore Control Cleansing Oil Mild 200ml",
    rating: "4.5",
    reviews: "9",
    price: "₹65",
    originalPrice: "₹89",
    discount: "26.97% OFF",
    savedAmount: "You saved ₹24",
    image: "/banners/skincare-anua-heartleaf.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "medicube-pdrn",
    name: "Medicube PDRN Pink Peptide Serum 1.01 Fl.Oz (30ml)...",
    rating: "4.4",
    reviews: "25",
    price: "₹42",
    originalPrice: "₹58.80",
    discount: "28.57% OFF",
    savedAmount: "You saved ₹16.80",
    image: "/banners/skincare-medicube-pdrn.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "anua-azelaic",
    name: "Anua Azelaic Acid 10 Hyaluron Serum 30ml -...",
    rating: "4.4",
    reviews: "23",
    price: "₹49",
    originalPrice: "₹85",
    discount: "42.35% OFF",
    isExpressDelivery: true,
    image: "/banners/skincare-anua-azelaic.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "sol-de-janeiro",
    name: "Sol de Janeiro Jet Set Brazilian Bum Bum Cream -...",
    rating: "4.3",
    reviews: "50",
    price: "₹139",
    originalPrice: "₹189",
    discount: "26.46% OFF",
    savedAmount: "You saved ₹50",
    image: "/banners/skincare-sol-de-janeiro.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "cetaphil-cleanser",
    name: "Cetaphil Gentle Skin Cleanser for Sensitive Skin (250ml)",
    rating: "4.7",
    reviews: "185",
    price: "₹385",
    originalPrice: "₹450",
    discount: "14% OFF",
    isExpressDelivery: true,
    image: "/banners/skincare-cetaphil-cleanser.jpg",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "vitamin-c-serum",
    name: "Minimalist 10% Vitamin C Face Serum for Glowing Skin (30ml)",
    rating: "4.6",
    reviews: "94",
    price: "₹664",
    originalPrice: "₹699",
    discount: "5% OFF",
    savedAmount: "You saved ₹35",
    image: "/banners/skincare-vitamin-c-serum.jpg",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "glow-moisturizer",
    name: "Hydrating Hyaluronic Acid Glow Moisturizer Cream (50g)",
    rating: "4.5",
    reviews: "42",
    price: "₹499",
    originalPrice: "₹799",
    discount: "37% OFF",
    isExpressDelivery: true,
    image: "/banners/skincare-glow-moisturizer.jpg",
    href: "/products/kotty-mens-jeans",
  },
];
