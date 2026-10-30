export interface CookwareProduct {
  id: string;
  name: string;
  rating?: string;
  reviews?: string;
  price: string;
  originalPrice: string;
  discount: string;
  isExpressDelivery?: boolean;
  image: string;
  href: string;
}

export const COOKWARE_PRODUCTS: CookwareProduct[] = [
  {
    id: "oms-10piece",
    name: "OMS 10-Piece Premium Stainless Steel Cookware S...",
    rating: "4.3",
    reviews: "12",
    price: "₹375",
    originalPrice: "₹689",
    discount: "45.57% OFF",
    isExpressDelivery: true,
    image: "/banners/cookware-oms-10piece.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "oms-9piece-black",
    name: "OMS 9-Piece Granitec Non-Stick Cookware Set with 4...",
    rating: "4.3",
    reviews: "12",
    price: "₹319",
    originalPrice: "₹614",
    discount: "48.05% OFF",
    image: "/banners/cookware-oms-9piece-black.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "oms-9piece-brown",
    name: "OMS 9-Piece Granitec Non-Stick Cookware Set with...",
    rating: "4.4",
    reviews: "12",
    price: "₹399",
    originalPrice: "₹689",
    discount: "42.09% OFF",
    isExpressDelivery: true,
    image: "/banners/cookware-oms-9piece-brown.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "oms-1045-6piece",
    name: "OMS 1045 6-Piece Stainless Steel Cookware Set with 3...",
    rating: "4.3",
    reviews: "14",
    price: "₹249",
    originalPrice: "₹499",
    discount: "50.10% OFF",
    isExpressDelivery: true,
    image: "/banners/cookware-oms-1045-6piece.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "ozo-1144-9piece",
    name: "OZO 1144 9-Piece Stainless Steel Cookware Set, Durabl...",
    rating: "4.3",
    reviews: "11",
    price: "₹299",
    originalPrice: "₹689",
    discount: "56.60% OFF",
    isExpressDelivery: true,
    image: "/banners/cookware-ozo-1144-9piece.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "cookware-dutch-oven",
    name: "MasterClass Cast Iron Enameled Dutch Oven Pot 5L...",
    rating: "4.6",
    reviews: "28",
    price: "₹420",
    originalPrice: "₹799",
    discount: "47.43% OFF",
    isExpressDelivery: true,
    image: "/banners/cookware-dutch-oven.jpg",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "cookware-saute-pan",
    name: "Granite Stone Pro Deep Saute Pan with Lid 28cm...",
    rating: "4.5",
    reviews: "35",
    price: "₹210",
    originalPrice: "₹399",
    discount: "47.36% OFF",
    image: "/banners/cookware-saute-pan.jpg",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "cookware-copper-pan",
    name: "Tri-Ply Copper Stainless Steel Skillet Frying Pan...",
    rating: "4.7",
    reviews: "42",
    price: "₹340",
    originalPrice: "₹599",
    discount: "43.23% OFF",
    isExpressDelivery: true,
    image: "/banners/cookware-copper-pan.jpg",
    href: "/products/kotty-mens-jeans",
  },
];
