export interface OutdoorProduct {
  id: string;
  name: string;
  rating?: string;
  reviews?: string;
  price: string;
  originalPrice: string;
  discount: string;
  savedAmount?: string;
  isExpressDelivery?: boolean;
  image: string;
  href: string;
}

export const OUTDOOR_PRODUCTS: OutdoorProduct[] = [
  {
    id: "vaux-joggers",
    name: "Vaux Joggers 26 Inch Fat Tire Mountain Bike with 21-Spee...",
    rating: "4.5",
    reviews: "10",
    price: "₹1,056",
    originalPrice: "₹1,569",
    discount: "32.70% OFF",
    savedAmount: "You saved ₹513",
    image: "/banners/outdoor-vaux-joggers.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "vaux-max16",
    name: "Vaux Max 16 Kids Bicycle, Sturdy Steel Frame, Dual...",
    rating: "4.4",
    reviews: "18",
    price: "₹268",
    originalPrice: "₹397",
    discount: "32.49% OFF",
    savedAmount: "You saved ₹129",
    image: "/banners/outdoor-vaux-max16.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "vaux-royal16",
    name: "Vaux Royal 16 Inch Kids Bike with Training Wheels, Front...",
    rating: "4.3",
    reviews: "14",
    price: "₹317",
    originalPrice: "₹469",
    discount: "32.41% OFF",
    savedAmount: "You saved ₹152",
    image: "/banners/outdoor-vaux-royal16.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "vaux-starlette",
    name: "Vaux Starlette 12 Inch Girls Bike with Training Wheels,...",
    rating: "4.5",
    reviews: "22",
    price: "₹244",
    originalPrice: "₹361",
    discount: "32.41% OFF",
    savedAmount: "You saved ₹117",
    image: "/banners/outdoor-vaux-starlette.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "mogoo-florida",
    name: "Mogoo Florida 24 Inch Vintage Cruiser Bike with...",
    rating: "4.6",
    reviews: "35",
    price: "₹533",
    originalPrice: "₹791",
    discount: "32.62% OFF",
    savedAmount: "You saved ₹258",
    image: "/banners/outdoor-mogoo-florida.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "outdoor-road-bike",
    name: "Firefox Montra 700C Alloy Lightweight Speed Road Bicycle",
    rating: "4.7",
    reviews: "48",
    price: "₹1,450",
    originalPrice: "₹2,199",
    discount: "34% OFF",
    isExpressDelivery: true,
    image: "/banners/outdoor-road-bike.jpg",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "outdoor-fixie-bike",
    name: "Urban Track Single-Speed Lightweight Commuter Bicycle",
    rating: "4.4",
    reviews: "29",
    price: "₹899",
    originalPrice: "₹1,299",
    discount: "30.79% OFF",
    savedAmount: "You saved ₹400",
    image: "/banners/outdoor-fixie-bike.jpg",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "outdoor-hybrid-bike",
    name: "Cross-Trail Multi-Terrain All-Weather Hybrid Bicycle",
    rating: "4.6",
    reviews: "56",
    price: "₹1,199",
    originalPrice: "₹1,699",
    discount: "29.43% OFF",
    isExpressDelivery: true,
    image: "/banners/outdoor-hybrid-bike.jpg",
    href: "/products/kotty-mens-jeans",
  },
];
