export interface TopPickProduct {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  discount: string;
  savedText: string;
  image: string;
  href: string;
}

export const TOP_PICKS_PRODUCTS: TopPickProduct[] = [
  {
    id: "fissman-stockpot",
    name: "Fissman Stockpot Seagreen Series Cast Iron 8L Black...",
    price: "₹249",
    originalPrice: "₹420",
    discount: "40.71% OFF",
    savedText: "You saved ₹ 171",
    image: "/banners/fissman-stockpot.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "fissman-pan",
    name: "Fissman Frying Pan Space Stone Aluminum 26cm -...",
    price: "₹115",
    originalPrice: "₹220",
    discount: "47.73% OFF",
    savedText: "You saved ₹ 105",
    image: "/banners/fissman-pan.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "fissman-flask",
    name: "Fissman Vacuum Flask 1000ml Insulated Travel...",
    price: "₹60",
    originalPrice: "₹121",
    discount: "50.41% OFF",
    savedText: "You saved ₹ 61",
    image: "/banners/fissman-flask.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "fissman-kettle",
    name: "Fissman Whistling Kettle Anita 2.5L Stainless Steel -...",
    price: "₹150",
    originalPrice: "₹221",
    discount: "32.13% OFF",
    savedText: "You saved ₹ 71",
    image: "/banners/fissman-kettle.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "fissman-knives",
    name: "Fissman Knife Set YASUMOTO X30Cr13...",
    price: "₹210",
    originalPrice: "₹415",
    discount: "49.40% OFF",
    savedText: "You saved ₹ 205",
    image: "/banners/fissman-knives.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "fissman-casserole",
    name: "Fissman Deep Casserole Pot Diamond Non-Stick 4.5L...",
    price: "₹185",
    originalPrice: "₹340",
    discount: "45.58% OFF",
    savedText: "You saved ₹ 155",
    image: "/banners/fissman-casserole.jpg",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "fissman-grill-pan",
    name: "Fissman Square Grill Pan Induction Safe 28cm...",
    price: "₹130",
    originalPrice: "₹245",
    discount: "46.93% OFF",
    savedText: "You saved ₹ 115",
    image: "/banners/fissman-grill.jpg",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "fissman-tea-pot",
    name: "Fissman Borosilicate Glass Teapot Infuser 800ml...",
    price: "₹85",
    originalPrice: "₹160",
    discount: "46.87% OFF",
    savedText: "You saved ₹ 75",
    image: "/banners/fissman-teapot.jpg",
    href: "/products/kotty-mens-jeans",
  },
];
