export interface WatchProduct {
  id: string;
  name: string;
  rating?: string;
  reviews?: string;
  price: string;
  originalPrice: string;
  discount: string;
  savedText: string;
  image: string;
  href: string;
}

export const WATCHES_PRODUCTS: WatchProduct[] = [
  {
    id: "casio-analog-diver",
    name: "Casio Analog Diver Watch for Men, 46.3mm Stainless...",
    rating: "4.6",
    reviews: "16",
    price: "₹277",
    originalPrice: "₹349",
    discount: "20.63% OFF",
    savedText: "You saved ₹ 72",
    image: "/banners/watch-casio-diver.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "citizen-tsuyosa",
    name: "Citizen TSUYOSA 37mm Automatic Watch for Men,...",
    rating: "4.7",
    reviews: "12",
    price: "₹1,249",
    originalPrice: "₹1,799",
    discount: "30.57% OFF",
    savedText: "You saved ₹ 550",
    image: "/banners/watch-citizen-tsuyosa.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "movado-museum-classic",
    name: "Movado Museum Classic Watch Black Dial Black PV...",
    rating: "4.4",
    reviews: "10",
    price: "₹3,599",
    originalPrice: "₹4,999",
    discount: "28.01% OFF",
    savedText: "You saved ₹ 1400",
    image: "/banners/watch-movado-museum.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "police-neist-chronograph",
    name: "Police Neist Chronograph Watch for Men - 45mm...",
    rating: "4.4",
    reviews: "11",
    price: "₹749",
    originalPrice: "₹1,149",
    discount: "34.81% OFF",
    savedText: "You saved ₹ 400",
    image: "/banners/watch-police-neist.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "fossil-everett-automatic",
    name: "Fossil Everett Automatic Three-Hand 42 mm Rose...",
    rating: "4.3",
    reviews: "10",
    price: "₹719",
    originalPrice: "₹1,099",
    discount: "34.58% OFF",
    savedText: "You saved ₹ 380",
    image: "/banners/watch-fossil-everett.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "seiko-chronograph-black",
    name: "Seiko Neo Classic Chronograph Quartz Black Dial Watch...",
    rating: "4.8",
    reviews: "34",
    price: "₹1,890",
    originalPrice: "₹2,699",
    discount: "29.97% OFF",
    savedText: "You saved ₹ 809",
    image: "/banners/watch-seiko-chrono.jpg",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "timex-expedition-scout",
    name: "Timex Expedition Scout 40mm Brown Leather Strap...",
    rating: "4.5",
    reviews: "58",
    price: "₹450",
    originalPrice: "₹650",
    discount: "30.76% OFF",
    savedText: "You saved ₹ 200",
    image: "/banners/watch-timex-expedition.jpg",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "tissot-prx-powermatic",
    name: "Tissot PRX Powermatic 80 Steel Blue Dial Luxury Watch...",
    rating: "4.9",
    reviews: "42",
    price: "₹4,200",
    originalPrice: "₹5,800",
    discount: "27.58% OFF",
    savedText: "You saved ₹ 1600",
    image: "/banners/watch-tissot-prx.jpg",
    href: "/products/kotty-mens-jeans",
  },
];
