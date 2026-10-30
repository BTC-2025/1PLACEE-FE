export interface RoundSubCategory {
  id: string;
  name: string;
  image: string;
  href: string;
}

export interface HeroBannerSlide {
  id: string;
  image: string;
  alt: string;
  href: string;
}

export const HERO_BANNER_SLIDES: HeroBannerSlide[] = [
  {
    id: "iphone-duo",
    image: "/banners/hero-iphone-duo.png",
    alt: "Apple iPhone Duo - A new way to iPhone",
    href: "/products/oneplus-ce6-lite",
  },
  {
    id: "star-babies",
    image: "/banners/hero-star-babies.png",
    alt: "Star Babies - Caring for the Little moments - Up to 70% Off",
    href: "/categories",
  },
  {
    id: "clearance-sale",
    image: "/banners/hero-clearance-sale.png",
    alt: "The Ultimate Clearance Sale - Up to 60% Off",
    href: "/categories",
  },
  {
    id: "fragrances",
    image: "/banners/hero-fragrances.png",
    alt: "Fragrances that defines you - Up to 40% Off",
    href: "/categories",
  },
  {
    id: "outdoor-camping",
    image: "/banners/hero-outdoor-camping.png",
    alt: "Outdoor & Camping - Explore More, Be Outside - Save up to 30% Off",
    href: "/categories",
  },
];

export const ROUND_SUB_CATEGORIES: RoundSubCategory[] = [
  {
    id: "bogo",
    name: "Buy 1 Get 1 Offers",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=240&auto=format&fit=crop&q=80",
    href: "/categories",
  },
  {
    id: "outdoor",
    name: "Outdoor & Camping",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=240&auto=format&fit=crop&q=80",
    href: "/categories",
  },
  {
    id: "watches",
    name: "Watch Fest",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=240&auto=format&fit=crop&q=80",
    href: "/categories",
  },
  {
    id: "beauty",
    name: "Beauty Week",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=240&auto=format&fit=crop&q=80",
    href: "/categories",
  },
  {
    id: "preowned",
    name: "Pre Owned",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=240&auto=format&fit=crop&q=80",
    href: "/categories",
  },
  {
    id: "clearance",
    name: "Clearance Sale",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=240&auto=format&fit=crop&q=80",
    href: "/categories",
  },
  {
    id: "apple",
    name: "Apple Fest",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=240&auto=format&fit=crop&q=80",
    href: "/categories",
  },
  {
    id: "techverse",
    name: "Techverse",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=240&auto=format&fit=crop&q=80",
    href: "/categories",
  },
  {
    id: "fragrance",
    name: "Fragrance Fiesta",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=240&auto=format&fit=crop&q=80",
    href: "/categories",
  },
  {
    id: "mobiles-tablets",
    name: "Mobiles & Tablets",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=240&auto=format&fit=crop&q=80",
    href: "/categories",
  },
  {
    id: "baby",
    name: "Baby & Mothercare",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=240&auto=format&fit=crop&q=80",
    href: "/categories",
  },
  {
    id: "kitchen",
    name: "Kitchen & Dining",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=240&auto=format&fit=crop&q=80",
    href: "/categories",
  },
];
