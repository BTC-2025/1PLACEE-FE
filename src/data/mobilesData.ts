export interface MobileProduct {
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

export const MOBILES_PRODUCTS: MobileProduct[] = [
  {
    id: "iphone18-pro-burgundy",
    name: "Apple iPhone 18 Pro 512GB Burgundy - 6.3-Inch Super...",
    price: "₹6,922",
    originalPrice: "₹8,999",
    discount: "23.08% OFF",
    savedAmount: "You saved ₹2077",
    image: "/banners/mobiles-iphone18-pro-burgundy.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "iphone18-pro-glacier",
    name: "Apple iPhone 18 Pro 256GB Glacier - 6.3-Inch Super...",
    price: "₹5,999",
    originalPrice: "₹7,799",
    discount: "23.08% OFF",
    savedAmount: "You saved ₹1800",
    image: "/banners/mobiles-iphone18-pro-glacier.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "iphone18-promax-burgundy",
    name: "Apple iPhone 18 Pro Max 256GB Burgundy - 6.9-Inch...",
    price: "₹7,408",
    originalPrice: "₹9,630",
    discount: "23.07% OFF",
    savedAmount: "You saved ₹2222",
    image: "/banners/mobiles-iphone18-promax-burgundy.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "iphone16-promax-titanium",
    name: "Apple iPhone 16 Pro Max 256GB Desert Titanium 6.9...",
    rating: "4.3",
    reviews: "312",
    price: "₹4,829",
    originalPrice: "₹6,279",
    discount: "23.09% OFF",
    savedAmount: "You saved ₹1450",
    badge: "Best Seller",
    image: "/banners/mobiles-iphone16-promax-titanium.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "iphone17-promax-orange",
    name: "Apple iPhone 17 Pro Max 256GB Cosmic Orange 5G...",
    rating: "4.4",
    reviews: "75",
    price: "₹4,899",
    originalPrice: "₹6,369",
    discount: "23.08% OFF",
    savedAmount: "You saved ₹1470",
    badge: "Best Seller",
    image: "/banners/mobiles-iphone17-promax-orange.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra 5G AI Smartphone (512GB Titanium)",
    rating: "4.8",
    reviews: "186",
    price: "₹5,299",
    originalPrice: "₹6,899",
    discount: "23.19% OFF",
    savedAmount: "You saved ₹1600",
    image: "/banners/mobiles-s24-ultra.jpg",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "iphone15-pro",
    name: "Apple iPhone 15 Pro Natural Titanium (256GB A17 Pro)",
    rating: "4.7",
    reviews: "245",
    price: "₹4,199",
    originalPrice: "₹5,499",
    discount: "23.64% OFF",
    savedAmount: "You saved ₹1300",
    image: "/banners/mobiles-iphone15-pro.jpg",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "pixel-8-pro",
    name: "Google Pixel 8 Pro 5G with Tensor G3 & Pro Triple Camera",
    rating: "4.6",
    reviews: "98",
    price: "₹3,799",
    originalPrice: "₹4,999",
    discount: "24% OFF",
    savedAmount: "You saved ₹1200",
    image: "/banners/mobiles-pixel-8-pro.jpg",
    href: "/products/kotty-mens-jeans",
  },
];
