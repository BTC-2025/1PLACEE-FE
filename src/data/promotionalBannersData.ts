export interface PromotionalBannerSlide {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  href: string;
}

export const PROMOTIONAL_CAROUSEL_BANNERS: PromotionalBannerSlide[] = [
  {
    id: "banner-chillax-baby",
    title: "Chillax Baby Monitors",
    subtitle: "Peace of Mind, Anytime, Anywhere | Up to 30% OFF",
    image: "/banners/banner-chillax-baby.png",
    href: "/categories",
  },
  {
    id: "banner-elevate-cooking",
    title: "Elevate Your Cooking Experience",
    subtitle: "Beautiful Cookware, Drinkware & Tabletop for everyday moments",
    image: "/banners/banner-elevate-cooking.png",
    href: "/categories",
  },
  {
    id: "banner-casio-timeless",
    title: "Explore CASIO Timeless Collection",
    subtitle: "Up to 50% OFF | Instant Discounts & Cashback",
    image: "/banners/banner-casio-timeless.png",
    href: "/categories",
  },
];
