export interface SavingsCardItem {
  id: string;
  title: string;
  subtitle: string;
  code?: string;
  image: string;
  href: string;
}

export const MAXIMIZE_SAVINGS_ITEMS: SavingsCardItem[] = [
  {
    id: "free-beauty-box",
    title: "Free Beauty Box",
    subtitle: "Worth ₹1,700",
    image: "/banners/savings-beauty-box.png",
    href: "/categories",
  },
  {
    id: "buy-3-get-10-off",
    title: "Buy 3 Get 10% OFF",
    subtitle: "On mobile accs.",
    code: "B3GET10",
    image: "/banners/savings-mobile-accs.png",
    href: "/categories",
  },
  {
    id: "flat-111-off",
    title: "₹111 Off",
    subtitle: "On watches & eyewear",
    code: "111OFF",
    image: "/banners/savings-watches-eyewear.png",
    href: "/categories",
  },
  {
    id: "extra-25-off-baby",
    title: "Extra 25% Off",
    subtitle: "On Baby Products",
    code: "BABY25",
    image: "/banners/savings-baby-products.png",
    href: "/categories",
  },
  {
    id: "mega-gadgets-deal",
    title: "Up to 40% Off",
    subtitle: "On Audio & Wearables",
    code: "AUDIO40",
    image: "/banners/savings-mobile-accs.png",
    href: "/categories",
  },
  {
    id: "perfume-luxury-deal",
    title: "Extra 15% Off",
    subtitle: "On Luxury Fragrances",
    code: "SCENT15",
    image: "/banners/savings-beauty-box.png",
    href: "/categories",
  },
];

