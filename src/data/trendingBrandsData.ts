export interface TrendingBrand {
  id: string;
  name: string;
  image: string;
  href: string;
}

export const TRENDING_BRANDS: TrendingBrand[] = [
  {
    id: "oneplus",
    name: "OnePlus",
    image: "/trending-brands/brand-oneplus.png",
    href: "/products/oneplus-ce6-lite",
  },
  {
    id: "samsung",
    name: "Samsung",
    image: "/trending-brands/brand-samsung.png",
    href: "/products/samsung-galaxy-s24",
  },
  {
    id: "oppo",
    name: "OPPO",
    image: "/trending-brands/brand-oppo.png",
    href: "/categories",
  },
  {
    id: "nothing",
    name: "Nothing",
    image: "/trending-brands/brand-nothing.png",
    href: "/categories",
  },
  {
    id: "pixel",
    name: "Google Pixel",
    image: "/trending-brands/brand-pixel.png",
    href: "/categories",
  },
];

