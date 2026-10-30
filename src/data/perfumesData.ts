export interface PerfumeProduct {
  id: string;
  name: string;
  rating?: string;
  reviews?: string;
  price: string;
  originalPrice: string;
  discount: string;
  savedAmount?: string;
  isGenuine?: boolean;
  image: string;
  href: string;
}

export const PERFUMES_PRODUCTS: PerfumeProduct[] = [
  {
    id: "versace-eros",
    name: "Versace Eros Najim Parfum 200 ml for Men - Caramel...",
    price: "₹487",
    originalPrice: "₹648",
    discount: "24.85% OFF",
    savedAmount: "You saved ₹161",
    isGenuine: true,
    image: "/banners/perfumes-versace-eros.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "french-avenue",
    name: "French Avenue Aether Extrait de Parfum 100 ml Unisex -...",
    rating: "4.3",
    reviews: "7",
    price: "₹107",
    originalPrice: "₹179",
    discount: "40.22% OFF",
    savedAmount: "You saved ₹72",
    isGenuine: true,
    image: "/banners/perfumes-french-avenue.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "armani-acqua",
    name: "Armani Acqua di Gio Elixir Parfum 50 ml for Men -...",
    price: "₹397",
    originalPrice: "₹528",
    discount: "24.81% OFF",
    savedAmount: "You saved ₹131",
    isGenuine: true,
    image: "/banners/perfumes-armani-acqua.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "amouage-purpose",
    name: "Amouage Purpose Eau de Parfum (EDP) 100 ml for...",
    price: "₹1,029",
    originalPrice: "₹1,799",
    discount: "42.80% OFF",
    savedAmount: "You saved ₹770",
    isGenuine: true,
    image: "/banners/perfumes-amouage-purpose.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "givenchy-linterdit",
    name: "Givenchy L'Interdit Rouge Eau de Parfum (EDP) 80 ml...",
    price: "₹378",
    originalPrice: "₹503",
    discount: "24.85% OFF",
    savedAmount: "You saved ₹125",
    isGenuine: true,
    image: "/banners/perfumes-givenchy-linterdit.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "dior-sauvage",
    name: "Dior Sauvage Eau de Parfum Vaporisateur Spray 100ml",
    rating: "4.8",
    reviews: "142",
    price: "₹899",
    originalPrice: "₹1,299",
    discount: "30.79% OFF",
    savedAmount: "You saved ₹400",
    isGenuine: true,
    image: "/banners/perfumes-dior-sauvage.jpg",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "chanel-coco",
    name: "Chanel Coco Mademoiselle Intense Eau de Parfum (100ml)",
    rating: "4.9",
    reviews: "98",
    price: "₹1,150",
    originalPrice: "₹1,550",
    discount: "25.80% OFF",
    savedAmount: "You saved ₹400",
    isGenuine: true,
    image: "/banners/perfumes-chanel-coco.jpg",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "tom-ford-ombre",
    name: "Tom Ford Ombré Leather Eau de Parfum Unisex Spray (50ml)",
    rating: "4.7",
    reviews: "64",
    price: "₹950",
    originalPrice: "₹1,350",
    discount: "29.63% OFF",
    savedAmount: "You saved ₹400",
    isGenuine: true,
    image: "/banners/perfumes-tom-ford.jpg",
    href: "/products/kotty-mens-jeans",
  },
];
