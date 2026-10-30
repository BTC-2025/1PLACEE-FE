export interface EyewearProduct {
  id: string;
  name: string;
  rating?: string;
  reviews?: string;
  price: string;
  originalPrice: string;
  discount: string;
  savedAmount?: string;
  image: string;
  href: string;
}

export const EYEWEAR_PRODUCTS: EyewearProduct[] = [
  {
    id: "tommy-women",
    name: "TOMMY HILFIGER Women Sunglasses TH1966S NUM0...",
    rating: "4.5",
    reviews: "35",
    price: "₹774",
    originalPrice: "₹1,580",
    discount: "51.01% OFF",
    savedAmount: "You saved ₹806",
    image: "/banners/eyewear-tommy-women.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "prada-sps06y",
    name: "PRADA Men Sunglasses SPS 06Y TFY06F Gradient Grey...",
    rating: "4.4",
    reviews: "36",
    price: "₹897",
    originalPrice: "₹1,830",
    discount: "50.98% OFF",
    savedAmount: "You saved ₹933",
    image: "/banners/eyewear-prada-sps06y.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "lacoste-l6071s",
    name: "LACOSTE Unisex Sunglasses L6071S 230 Gradient Brow...",
    rating: "4.4",
    reviews: "37",
    price: "₹676",
    originalPrice: "₹1,380",
    discount: "51.01% OFF",
    savedAmount: "You saved ₹704",
    image: "/banners/eyewear-lacoste-l6071s.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "prada-sps01z",
    name: "PRADA Men Sunglasses SPS01Z DG008F Mirrored...",
    rating: "4.3",
    reviews: "34",
    price: "₹1,103",
    originalPrice: "₹2,250",
    discount: "50.98% OFF",
    savedAmount: "You saved ₹1,147",
    image: "/banners/eyewear-prada-sps01z.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "tommy-unisex",
    name: "TOMMY HILFIGER, TH2184-S08670, Unisex Sunglasses,...",
    rating: "4.2",
    reviews: "37",
    price: "₹490",
    originalPrice: "₹1,000",
    discount: "51% OFF",
    savedAmount: "You saved ₹510",
    image: "/banners/eyewear-tommy-unisex.png",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "rayban-aviator",
    name: "Ray-Ban Classic Aviator Gradient Polarized Metal Sunglasses",
    rating: "4.8",
    reviews: "112",
    price: "₹1,249",
    originalPrice: "₹2,499",
    discount: "50% OFF",
    savedAmount: "You saved ₹1,250",
    image: "/banners/eyewear-rayban-aviator.jpg",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "wayfarer-classic",
    name: "Iconic Black Matte Wayfarer Sunglasses UV Protection",
    rating: "4.6",
    reviews: "68",
    price: "₹599",
    originalPrice: "₹1,199",
    discount: "50.04% OFF",
    savedAmount: "You saved ₹600",
    image: "/banners/eyewear-wayfarer-classic.jpg",
    href: "/products/kotty-mens-jeans",
  },
  {
    id: "luxury-polarized",
    name: "Designer Tortoise Shell Rimmed Polarized Lifestyle Sunglasses",
    rating: "4.7",
    reviews: "54",
    price: "₹849",
    originalPrice: "₹1,699",
    discount: "50.03% OFF",
    savedAmount: "You saved ₹850",
    image: "/banners/eyewear-luxury-polarized.jpg",
    href: "/products/kotty-mens-jeans",
  },
];
