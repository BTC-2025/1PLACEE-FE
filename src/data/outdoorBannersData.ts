export interface OutdoorBannerSlide {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  href: string;
}

export const OUTDOOR_CAROUSEL_BANNERS: OutdoorBannerSlide[] = [
  {
    id: "banner-playstation-consoles",
    title: "Pre-Owned Sony PlayStation Consoles",
    subtitle: "Up to 30% Off | 15-Day Replacement | Fully Tested",
    image: "/banners/banner-playstation-consoles.png",
    href: "/categories",
  },
  {
    id: "banner-preowned-ipads",
    title: "Pre-Owned iPads",
    subtitle: "Up to 50% Off | Fully Tested | 12 Months Warranty | 15 Days Easy Return",
    image: "/banners/banner-preowned-ipads.png",
    href: "/categories",
  },
  {
    id: "banner-outdoor-camping",
    title: "Outdoor & Camping - Get up for New Adventures",
    subtitle: "Shop the collection",
    image: "/banners/banner-outdoor-camping.png",
    href: "/categories",
  },
  {
    id: "banner-samsung-mobiles",
    title: "Pre-Owned Samsung Mobile Phones",
    subtitle: "Up to 40% Off | 12-Month Warranty | 15-Day Return | Fully Tested | COD Available",
    image: "/banners/banner-samsung-mobiles.png",
    href: "/categories",
  },
];
