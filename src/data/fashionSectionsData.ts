export interface FashionSectionItem {
  id: string;
  name: string;
  image: string;
}

export interface FashionSection {
  id: string;
  title: string;
  items: FashionSectionItem[];
}

export const FASHION_SECTIONS: FashionSection[] = [
  {
    id: "men",
    title: "Men",
    items: [
      { id: "men-accessories", name: "Accessories", image: "/categories/app-items/men-accessories.png" },
      { id: "men-ethnic-wear", name: "Ethnic Wear", image: "/categories/app-items/men-ethnic-wear.png" },
      { id: "men-bags-wallets", name: "Bags, Belts & Wallets", image: "/categories/app-items/men-bags-wallets.png" },
      { id: "men-western-wear", name: "Western Wear", image: "/categories/app-items/men-western-wear.png" },
      { id: "men-inner-wear", name: "Inner Wear", image: "/categories/app-items/men-inner-wear.png" },
      { id: "men-eyewear", name: "Eyewear", image: "/categories/app-items/men-eyewear.png" },
      { id: "men-night-loungewear", name: "Night & Loungewear", image: "/categories/app-items/men-night-loungewear.png" },
      { id: "men-fashion-jewellery", name: "Fashion Jewellery", image: "/categories/app-items/men-fashion-jewellery.png" },
      { id: "men-watch-accessories", name: "Watch Accessories", image: "/categories/app-items/men-watch-accessories.png" },
      { id: "men-watches", name: "Watches", image: "/categories/app-items/men-watches.png" },
      { id: "men-silver-jewellery", name: "Silver Jewellery", image: "/categories/app-items/men-silver-jewellery.png" },
      { id: "men-night-lounge-wear2", name: "Night & Lounge Wear", image: "/categories/app-items/men-night-lounge-wear2.png" },
      { id: "men-gemstones-coins", name: "Gemstones Coins & Bars", image: "/categories/app-items/men-gemstones-coins.png" },
      { id: "men-timewear", name: "Timewear", image: "/categories/app-items/men-timewear.png" },
      { id: "men-footwear", name: "Footwear", image: "/categories/app-items/men-footwear.png" },
      { id: "men-clothing-accessories", name: "Clothing Accessories", image: "/categories/app-items/men-clothing-accessories.png" },
    ],
  },
  {
    id: "women",
    title: "Women",
    items: [
      { id: "women-accessories", name: "Accessories", image: "/categories/app-items/women-accessories.png" },
      { id: "women-ethnic-wear", name: "Ethnic Wear", image: "/categories/app-items/women-ethnic-wear.png" },
      { id: "women-bags-wallets", name: "Bags, Belts & Wallets", image: "/categories/app-items/women-bags-wallets.png" },
      { id: "women-western-wear", name: "Western Wear", image: "/categories/app-items/women-western-wear.png" },
      { id: "women-eyewear", name: "Eyewear", image: "/categories/app-items/women-eyewear.png" },
      { id: "women-night-loungewear", name: "Night & Loungewear", image: "/categories/app-items/women-night-loungewear.png" },
      { id: "women-fashion-jewellery", name: "Fashion Jewellery", image: "/categories/app-items/women-fashion-jewellery.png" },
      { id: "women-fusion-wear", name: "Fusion Wear", image: "/categories/app-items/women-fusion-wear.png" },
      { id: "women-watch-accessories", name: "Watch Accessories", image: "/categories/app-items/women-watch-accessories.png" },
      { id: "women-watches", name: "Watches", image: "/categories/app-items/women-watches.png" },
      { id: "women-silver-jewellery", name: "Silver Jewellery", image: "/categories/app-items/women-silver-jewellery.png" },
      { id: "women-night-lounge-wear2", name: "Night & Lounge Wear", image: "/categories/app-items/women-night-lounge-wear2.png" },
      { id: "women-gemstones-coins", name: "Gemstones Coins & Bars", image: "/categories/app-items/women-gemstones-coins.png" },
      { id: "women-timewear", name: "Timewear", image: "/categories/app-items/women-timewear.png" },
      { id: "women-lingerie-innerwear", name: "Lingerie & Innerwear", image: "/categories/app-items/women-lingerie-innerwear.png" },
      { id: "women-precious-articles", name: "Precious Articles", image: "/categories/app-items/women-precious-articles.png" },
      { id: "women-footwear", name: "Footwear", image: "/categories/app-items/women-footwear.png" },
      { id: "women-clothing-accessories", name: "Clothing Accessories", image: "/categories/app-items/women-clothing-accessories.png" },
      { id: "women-handloom-handicraft", name: "Handloom & Handicraft", image: "/categories/app-items/women-handloom-handicraft.png" },
      { id: "women-personal-care", name: "Personal Care", image: "/categories/app-items/women-personal-care.png" },
    ],
  },
  {
    id: "boys",
    title: "Boys",
    items: [
      { id: "boys-accessories", name: "Accessories", image: "/categories/app-items/boys-accessories.png" },
      { id: "boys-ethnic-wear", name: "Ethnic Wear", image: "/categories/app-items/boys-ethnic-wear.png" },
      { id: "boys-bags-wallets", name: "Bags, Belts & Wallets", image: "/categories/app-items/boys-bags-wallets.png" },
      { id: "boys-western-wear", name: "Western Wear", image: "/categories/app-items/boys-western-wear.png" },
      { id: "boys-inner-nightwear", name: "Inner & Nightwear", image: "/categories/app-items/boys-inner-nightwear.png" },
      { id: "boys-inner-wear", name: "Inner Wear", image: "/categories/app-items/boys-inner-wear.png" },
      { id: "boys-eyewear", name: "Eyewear", image: "/categories/app-items/boys-eyewear.png" },
      { id: "boys-night-loungewear", name: "Night & Loungewear", image: "/categories/app-items/boys-night-loungewear.png" },
      { id: "boys-watch-accessories", name: "Watch Accessories", image: "/categories/app-items/boys-watch-accessories.png" },
      { id: "boys-watches", name: "Watches", image: "/categories/app-items/boys-watches.png" },
      { id: "boys-footwear", name: "Footwear", image: "/categories/app-items/boys-footwear.png" },
      { id: "boys-clothing-accessories", name: "Clothing Accessories", image: "/categories/app-items/boys-clothing-accessories.png" },
    ],
  },
  {
    id: "girls",
    title: "Girls",
    items: [
      { id: "girls-accessories", name: "Accessories", image: "/categories/app-items/girls-accessories.png" },
      { id: "girls-ethnic-wear", name: "Ethnic Wear", image: "/categories/app-items/girls-ethnic-wear.png" },
      { id: "girls-bags-wallets", name: "Bags, Belts & Wallets", image: "/categories/app-items/girls-bags-wallets.png" },
      { id: "girls-western-wear", name: "Western Wear", image: "/categories/app-items/girls-western-wear.png" },
      { id: "girls-inner-nightwear", name: "Inner & Nightwear", image: "/categories/app-items/girls-inner-nightwear.png" },
      { id: "girls-inner-wear", name: "Inner Wear", image: "/categories/app-items/girls-inner-wear.png" },
      { id: "girls-eyewear", name: "Eyewear", image: "/categories/app-items/girls-eyewear.png" },
      { id: "girls-night-loungewear", name: "Night & Loungewear", image: "/categories/app-items/girls-night-loungewear.png" },
      { id: "girls-watches", name: "Watches", image: "/categories/app-items/girls-watches.png" },
      { id: "girls-footwear", name: "Footwear", image: "/categories/app-items/girls-footwear.png" },
      { id: "girls-clothing-accessories", name: "Clothing Accessories", image: "/categories/app-items/girls-clothing-accessories.png" },
    ],
  },
  {
    id: "infants",
    title: "Infants",
    items: [
      { id: "infants-western-wear", name: "Western Wear", image: "/categories/app-items/infants-western-wear.png" },
      { id: "infants-night-loungewear", name: "Night & Loungewear", image: "/categories/app-items/infants-night-loungewear.png" },
      { id: "infants-footwear", name: "Footwear", image: "/categories/app-items/infants-footwear.png" },
      { id: "infants-clothing-accessories", name: "Clothing Accessories", image: "/categories/app-items/infants-clothing-accessories.png" },
    ],
  },
  {
    id: "crafts-of-india",
    title: "Crafts of India",
    items: [
      { id: "crafts-footwear", name: "Footwear", image: "/categories/app-items/crafts-footwear.png" },
      { id: "crafts-women", name: "Women", image: "/categories/app-items/crafts-women.png" },
    ],
  },
];

