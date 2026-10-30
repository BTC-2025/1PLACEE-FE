export interface LifestyleBannerSlide {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  href: string;
}

export const LIFESTYLE_CAROUSEL_BANNERS: LifestyleBannerSlide[] = [
  {
    id: "banner-sunscreen-radiant",
    title: "Sunscreen - Stay Sun Safe, Stay Radiant",
    subtitle: "Up to 40% Off | 5% Instant Discount + 5% Flat Cashback",
    image: "/banners/banner-sunscreen-radiant.png",
    href: "/categories",
  },
  {
    id: "banner-perfumes-luxury",
    title: "Perfume Him & Her - Luxury in Every Note",
    subtitle: "Up to 50% Off | 5% Instant Discount + 5% Flat Cashback",
    image: "/banners/banner-perfumes-luxury.png",
    href: "/categories",
  },
  {
    id: "banner-baby-lifestyle-transit",
    title: "Elegance in Transit - Adventure Made Easy",
    subtitle: "Effortless Switching, Compact Foldable Lightweight Car Seat, Comfort Guaranteed",
    image: "/banners/banner-baby-lifestyle-transit.png",
    href: "/categories",
  },
];
