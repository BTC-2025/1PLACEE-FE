export interface BrandDealItem {
  id: string;
  brandName: string;
  brandLogoText?: string;
  discount: string;
  productImage: string;
  bgColor: string;
  href: string;
}

export interface TechDealItem {
  id: string;
  brandLogo: string;
  model: string;
  storage: string;
  price: string;
  originalPrice?: string;
  image: string;
  bgColor: string;
  href: string;
}

export const DEALS_YOU_MIGHT_LIKE: BrandDealItem[] = [
  {
    id: "ingenuity",
    brandName: "ingenuity",
    discount: "up to 35% Off",
    productImage: "/banners/deal-ingenuity.png",
    bgColor: "from-[#f4f8f3] to-[#e6f1e5]",
    href: "/categories",
  },
  {
    id: "acm",
    brandName: "ACM",
    discount: "up to 45% Off",
    productImage: "/banners/deal-acm.png",
    bgColor: "from-[#fdf6fa] to-[#f6e4f0]",
    href: "/categories",
  },
  {
    id: "corelle",
    brandName: "Corelle",
    discount: "up to 20% Off",
    productImage: "/banners/deal-corelle.png",
    bgColor: "from-[#fdf8f2] to-[#f8ebe0]",
    href: "/categories",
  },
  {
    id: "seiko",
    brandName: "SEIKO",
    discount: "up to 35% Off",
    productImage: "/banners/deal-seiko.png",
    bgColor: "from-[#f5f6fb] to-[#e7eaf7]",
    href: "/categories",
  },
];

export const LOWEST_IN_THE_MARKET: TechDealItem[] = [
  {
    id: "s26-ultra",
    brandLogo: "SAMSUNG",
    model: "Galaxy S26 Ultra",
    storage: "256 GB",
    price: "₹3,649",
    originalPrice: "₹4,749",
    image: "/banners/lowest-s26-ultra.jpg",
    bgColor: "bg-[#e2f0d9]",
    href: "/products/samsung-galaxy-s24",
  },
  {
    id: "elitebook",
    brandLogo: "hp",
    model: "EliteBook 840 G5",
    storage: "256 GB",
    price: "₹779",
    originalPrice: "₹1,015",
    image: "/banners/lowest-elitebook.jpg",
    bgColor: "bg-[#e2e3f5]",
    href: "/products/hp-victus-gaming-laptop",
  },
  {
    id: "a56-5g",
    brandLogo: "SAMSUNG",
    model: "Galaxy A56 5G",
    storage: "256 GB",
    price: "₹1,443",
    originalPrice: "₹1,875",
    image: "/banners/lowest-a56.jpg",
    bgColor: "bg-[#daf2ea]",
    href: "/products/samsung-galaxy-s24",
  },
  {
    id: "iphone-17",
    brandLogo: "Apple",
    model: "iPhone 17 Pro Max",
    storage: "256 GB",
    price: "₹4,899",
    originalPrice: "₹6,369",
    image: "/banners/lowest-iphone17.jpg",
    bgColor: "bg-[#f5e4d7]",
    href: "/products/oneplus-ce6-lite",
  },
];
