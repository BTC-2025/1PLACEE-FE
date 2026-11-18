"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export interface SimilarItem {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
  rating: number;
  reviewsCount: number;
  specs: string;
  href?: string;
}

// 1. Watches
const SIMILAR_WATCHES: SimilarItem[] = [
  {
    id: "casio-analog-diver",
    title: "Casio Analog Diver Watch for Men 46.3mm 200M Water Resistant",
    price: 277,
    originalPrice: 349,
    discount: "20% off",
    image: "/banners/watch-casio-diver.png",
    rating: 4.6,
    reviewsCount: 1650,
    specs: "200M Water Resistant · Japanese Quartz · Stainless Steel",
    href: "/products/casio-analog-diver",
  },
  {
    id: "citizen-tsuyosa",
    title: "Citizen TSUYOSA 37mm Automatic Watch for Men Stainless Steel",
    price: 1249,
    originalPrice: 1799,
    discount: "30% off",
    image: "/banners/watch-citizen-tsuyosa.png",
    rating: 4.7,
    reviewsCount: 1840,
    specs: "Calibre 8210 Automatic · Sapphire Crystal · 40h Reserve",
    href: "/products/citizen-tsuyosa",
  },
  {
    id: "movado-museum-classic",
    title: "Movado Museum Classic Watch Black Dial Black PVD Steel",
    price: 3599,
    originalPrice: 4999,
    discount: "28% off",
    image: "/banners/watch-movado-museum.png",
    rating: 4.4,
    reviewsCount: 920,
    specs: "Swiss Quartz · Signature Museum Dot · Calfskin Leather",
    href: "/products/movado-museum-classic",
  },
  {
    id: "police-neist-chronograph",
    title: "Police Neist Chronograph Watch for Men 45mm Gunmetal",
    price: 749,
    originalPrice: 1149,
    discount: "35% off",
    image: "/banners/watch-police-neist.png",
    rating: 4.4,
    reviewsCount: 710,
    specs: "Multi-Subdial Stopwatch · Tachymeter · 50M Splashproof",
    href: "/products/police-neist-chronograph",
  },
  {
    id: "fossil-everett-automatic",
    title: "Fossil Everett Automatic 42mm Rose Gold Stainless Skeleton",
    price: 719,
    originalPrice: 1099,
    discount: "35% off",
    image: "/banners/watch-fossil-everett.png",
    rating: 4.3,
    reviewsCount: 650,
    specs: "Open Skeleton Dial · Automatic Mechanical · Rose Gold PVD",
    href: "/products/fossil-everett-automatic",
  },
  {
    id: "seiko-chronograph-black",
    title: "Seiko Neo Classic Chronograph Quartz 100M Water Resistant",
    price: 1890,
    originalPrice: 2699,
    discount: "30% off",
    image: "/banners/watch-seiko-chrono.jpg",
    rating: 4.8,
    reviewsCount: 1420,
    specs: "Calibre 8T63 Quartz · Hardlex Crystal · 100M Rating",
    href: "/products/seiko-chronograph-black",
  },
  {
    id: "tissot-prx-powermatic",
    title: "Tissot PRX Powermatic 80 Steel Blue Dial Swiss Luxury Watch",
    price: 4200,
    originalPrice: 5800,
    discount: "28% off",
    image: "/banners/watch-tissot-prx.jpg",
    rating: 4.9,
    reviewsCount: 2900,
    specs: "Swiss Made · 80-Hour Reserve · Anti-Magnetic Nivachron",
    href: "/products/tissot-prx-powermatic",
  },
];

// 2. Cookware & Kitchenware
const SIMILAR_COOKWARE: SimilarItem[] = [
  {
    id: "fissman-stockpot",
    title: "Fissman Stockpot Seagreen Series Cast Iron 8L Induction Safe",
    price: 249,
    originalPrice: 420,
    discount: "41% off",
    image: "/banners/fissman-stockpot.png",
    rating: 4.8,
    reviewsCount: 1420,
    specs: "8 Litres · Heavy Cast Iron · Heat Retaining Mineral Lid",
    href: "/products/fissman-stockpot",
  },
  {
    id: "fissman-pan",
    title: "Fissman Frying Pan Space Stone Aluminum 26cm Non-Stick",
    price: 115,
    originalPrice: 220,
    discount: "48% off",
    image: "/banners/fissman-pan.png",
    rating: 4.7,
    reviewsCount: 980,
    specs: "26cm Diameter · 4-Layer Marble Stone · Stay-Cool Handle",
    href: "/products/fissman-pan",
  },
  {
    id: "oms-10piece",
    title: "OMS 10-Piece Premium Stainless Steel Cookware Set with Glass Lids",
    price: 375,
    originalPrice: 689,
    discount: "46% off",
    image: "/banners/cookware-oms-10piece.png",
    rating: 4.7,
    reviewsCount: 1650,
    specs: "10 Pieces · 18/10 Surgical Stainless Steel · 3-Ply Base",
    href: "/products/oms-10piece",
  },
  {
    id: "fissman-kettle",
    title: "Fissman Whistling Kettle Anita 2.5L Stainless Steel Rapid Boil",
    price: 150,
    originalPrice: 221,
    discount: "32% off",
    image: "/banners/fissman-kettle.png",
    rating: 4.5,
    reviewsCount: 430,
    specs: "2.5 Litres · Acoustic Whistle · Induction Multi-Ply Capsule",
    href: "/products/fissman-kettle",
  },
  {
    id: "oms-9piece-black",
    title: "OMS 9-Piece Granitec Non-Stick Cookware Set with 4 Casseroles",
    price: 319,
    originalPrice: 614,
    discount: "48% off",
    image: "/banners/cookware-oms-9piece-black.png",
    rating: 4.6,
    reviewsCount: 1120,
    specs: "9 Pieces · German Granitec Stone · Oil-Free Cooking",
    href: "/products/oms-9piece-black",
  },
];

// 3. Skincare
const SIMILAR_SKINCARE: SimilarItem[] = [
  {
    id: "acm-gel",
    title: "ACM Gel Nettoyant Cleansing Gel 200ml Gentle Purifying Face Wash",
    price: 54,
    originalPrice: 67.5,
    discount: "20% off",
    image: "/banners/skincare-acm-gel.png",
    rating: 4.7,
    reviewsCount: 1250,
    specs: "200 ml · Physiological pH · Zinc & Copper PCA",
    href: "/products/acm-gel",
  },
  {
    id: "anua-heartleaf",
    title: "Anua Heartleaf Pore Control Cleansing Oil Mild 200ml Korean Skincare",
    price: 65,
    originalPrice: 89,
    discount: "27% off",
    image: "/banners/skincare-anua-heartleaf.png",
    rating: 4.8,
    reviewsCount: 3410,
    specs: "200 ml · 10,000ppm Heartleaf · Blackhead Pore Melting",
    href: "/products/anua-heartleaf",
  },
  {
    id: "medicube-pdrn",
    title: "Medicube PDRN Pink Peptide Serum 1.01 Fl.Oz (30ml) Anti-Aging Firming",
    price: 42,
    originalPrice: 58.8,
    discount: "29% off",
    image: "/banners/skincare-medicube-pdrn.png",
    rating: 4.6,
    reviewsCount: 890,
    specs: "30 ml · Salmon DNA PDRN · 5 Multi-Peptide Complex",
    href: "/products/medicube-pdrn",
  },
  {
    id: "anua-azelaic",
    title: "Anua Niacinamide 10% + TXA 4% Dark Spot Correcting Serum 30ml",
    price: 58,
    originalPrice: 79,
    discount: "26% off",
    image: "/banners/skincare-anua-azelaic.png",
    rating: 4.8,
    reviewsCount: 1980,
    specs: "30 ml · 10% Niacinamide · 4% Tranexamic Acid",
    href: "/products/anua-azelaic",
  },
  {
    id: "sol-de-janeiro",
    title: "Sol de Janeiro Brazilian Bum Bum Body Moisture Cream 240ml",
    price: 89,
    originalPrice: 119,
    discount: "25% off",
    image: "/banners/skincare-sol-de-janeiro.png",
    rating: 4.9,
    reviewsCount: 5420,
    specs: "240 ml · Guaraná Caffeine Extract · Cupuaçu Butter",
    href: "/products/sol-de-janeiro",
  },
];

// 4. Perfumes
const SIMILAR_PERFUMES: SimilarItem[] = [
  {
    id: "versace-eros",
    title: "Versace Eros Najim Parfum 200 ml for Men - Caramel Spices & Cedar",
    price: 487,
    originalPrice: 648,
    discount: "25% off",
    image: "/banners/perfumes-versace-eros.png",
    rating: 4.8,
    reviewsCount: 3890,
    specs: "200 ml · Pure Parfum · 12+ Hours Longevity",
    href: "/products/versace-eros",
  },
  {
    id: "french-avenue",
    title: "French Avenue Aether Extrait de Parfum 100 ml Unisex Niche",
    price: 107,
    originalPrice: 179,
    discount: "40% off",
    image: "/banners/perfumes-french-avenue.png",
    rating: 4.5,
    reviewsCount: 780,
    specs: "100 ml · Extrait de Parfum · Lavender & Ambergris",
    href: "/products/french-avenue",
  },
  {
    id: "armani-acqua",
    title: "Armani Acqua di Gio Elixir Parfum 50 ml for Men Marine & Woody",
    price: 397,
    originalPrice: 528,
    discount: "25% off",
    image: "/banners/perfumes-armani-acqua.png",
    rating: 4.9,
    reviewsCount: 4210,
    specs: "50 ml · Marine Accord & Incense · Made in France",
    href: "/products/armani-acqua",
  },
];

// 5. Eyewear
const SIMILAR_EYEWEAR: SimilarItem[] = [
  {
    id: "tommy-women",
    title: "TOMMY HILFIGER Women Sunglasses Polarized Gradient UV400",
    price: 774,
    originalPrice: 1580,
    discount: "51% off",
    image: "/banners/eyewear-tommy-women.png",
    rating: 4.6,
    reviewsCount: 1140,
    specs: "UV400 Polarized · Italian Acetate Frame · Case Included",
    href: "/products/tommy-women",
  },
  {
    id: "prada-sps06y",
    title: "PRADA Linea Rossa Men Sunglasses Gradient Grey Polarized Sport",
    price: 897,
    originalPrice: 1830,
    discount: "51% off",
    image: "/banners/eyewear-prada-sps06y.png",
    rating: 4.7,
    reviewsCount: 1520,
    specs: "Linea Rossa Sport · TR90 Lightweight · Hydrophobic",
    href: "/products/prada-sps06y",
  },
  {
    id: "lacoste-l6071s",
    title: "LACOSTE Unisex Sunglasses Gradient Brown Square Frame",
    price: 676,
    originalPrice: 1380,
    discount: "51% off",
    image: "/banners/eyewear-lacoste-l6071s.png",
    rating: 4.5,
    reviewsCount: 890,
    specs: "Classic Square · Embossed Crocodile · 100% UV Protection",
    href: "/products/lacoste-l6071s",
  },
];

// 6. Bicycles & Outdoor
const SIMILAR_OUTDOOR: SimilarItem[] = [
  {
    id: "vaux-joggers",
    title: "Vaux Joggers 26 Inch Fat Tire Mountain Bike with 21-Speed Shimano",
    price: 1056,
    originalPrice: 1569,
    discount: "33% off",
    image: "/banners/outdoor-vaux-joggers.png",
    rating: 4.6,
    reviewsCount: 780,
    specs: "26 x 4.0 Fat Tire · 21-Speed Shimano · Dual Disc Brakes",
    href: "/products/vaux-joggers",
  },
  {
    id: "vaux-max16",
    title: "Vaux Max 16 Kids Bicycle Sturdy Steel Frame with Training Wheels",
    price: 268,
    originalPrice: 397,
    discount: "32% off",
    image: "/banners/outdoor-vaux-max16.png",
    rating: 4.4,
    reviewsCount: 520,
    specs: "16-Inch Wheels · Dual Calipers · Full Chain Guard",
    href: "/products/vaux-max16",
  },
  {
    id: "vaux-royal16",
    title: "Vaux Royal 16 Inch Kids Bike with Basket, Bell & Training Wheels",
    price: 317,
    originalPrice: 469,
    discount: "32% off",
    image: "/banners/outdoor-vaux-royal16.png",
    rating: 4.3,
    reviewsCount: 410,
    specs: "Front Wicker Basket · Cushioned Saddle · Quick Release Post",
    href: "/products/vaux-royal16",
  },
  {
    id: "mogoo-florida",
    title: "Mogoo Florida 26 Inch Alloy City Cruiser Bicycle with Rear Rack",
    price: 389,
    originalPrice: 580,
    discount: "33% off",
    image: "/banners/outdoor-mogoo-florida.png",
    rating: 4.5,
    reviewsCount: 490,
    specs: "6061 Alloy Frame · Rear Cargo Rack · Upright Comfort Bars",
    href: "/products/mogoo-florida",
  },
];

// 7. Baby Gear & Products
const SIMILAR_BABY: SimilarItem[] = [
  {
    id: "neobreez-stroller",
    title: "Neobreez Vomx1 Ultra Lightweight Stroller 1-Second Auto-Fold",
    price: 369,
    originalPrice: 649,
    discount: "43% off",
    image: "/banners/babygear-neobreez-stroller.png",
    rating: 4.7,
    reviewsCount: 650,
    specs: "Cabin Approved 6.2kg · 1-Hand Auto-Fold · UV50+ Canopy",
    href: "/products/neobreez-stroller",
  },
  {
    id: "ingenuity",
    title: "Ingenuity Baby Base 2-in-1 Booster Seat with Cleanable Feeding Tray",
    price: 189,
    originalPrice: 289,
    discount: "35% off",
    image: "/banners/deal-ingenuity.png",
    rating: 4.8,
    reviewsCount: 1780,
    specs: "Dishwasher Safe Tray · Safety Harness · Removable Foam",
    href: "/products/ingenuity",
  },
];

// 8. Smartphones (Default Flagships)
const SIMILAR_FLAGSHIPS: SimilarItem[] = [
  {
    id: "iphone-18-pro-max",
    title: "Apple iPhone 18 Pro Max 512GB Desert Titanium 5G",
    price: 89999,
    originalPrice: 104999,
    discount: "14% off",
    image: "/banners/noon-thumb-1.png",
    rating: 4.9,
    reviewsCount: 4210,
    specs: "6.9-inch OLED · A18 Pro · 48MP Triple",
    href: "/products/apple-iphone-18-pro",
  },
  {
    id: "galaxy-s25-ultra",
    title: "Samsung Galaxy S25 Ultra 5G AI Smartphone (512GB Titanium Grey)",
    price: 84999,
    originalPrice: 99999,
    discount: "15% off",
    image: "/banners/mobiles-pixel-8-pro.jpg",
    rating: 4.8,
    reviewsCount: 3120,
    specs: "200MP Quad · Snapdragon 8 Elite · S-Pen",
    href: "/products/samsung-galaxy-s24",
  },
  {
    id: "iphone-18-pro-glacier",
    title: "Apple iPhone 18 Pro 256GB Glacier Silver - 6.3-Inch Super Retina",
    price: 76999,
    originalPrice: 89999,
    discount: "14% off",
    image: "/banners/mobiles-iphone18-pro-glacier.png",
    rating: 4.9,
    reviewsCount: 2840,
    specs: "6.3-inch OLED · 120Hz ProMotion · Titanium",
    href: "/products/apple-iphone-18-pro",
  },
  {
    id: "pixel-9-pro-xl",
    title: "Google Pixel 9 Pro XL 5G AI Smartphone (256GB Porcelain)",
    price: 72999,
    originalPrice: 84999,
    discount: "14% off",
    image: "/banners/mobiles-iphone17-promax-orange.png",
    rating: 4.7,
    reviewsCount: 1980,
    specs: "Tensor G4 · 50MP Pro Camera · 7 Years OS Updates",
    href: "/products/samsung-galaxy-s24",
  },
];

export const RelatedProductsCarousel: React.FC<{
  title?: string;
  category?: string;
}> = ({ title, category = "mobiles" }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const catLower = (category || "").toLowerCase();
  const isWatch = catLower.includes("watch");
  const isCookware = catLower.includes("cookware") || catLower.includes("kitchen");
  const isSkincare = catLower.includes("skincare") || catLower.includes("skin");
  const isPerfume = catLower.includes("perfume") || catLower.includes("fragrance");
  const isEyewear = catLower.includes("eyewear") || catLower.includes("sunglass");
  const isOutdoor = catLower.includes("bicycle") || catLower.includes("outdoor");
  const isBaby = catLower.includes("baby");

  const items = isWatch
    ? SIMILAR_WATCHES
    : isCookware
    ? SIMILAR_COOKWARE
    : isSkincare
    ? SIMILAR_SKINCARE
    : isPerfume
    ? SIMILAR_PERFUMES
    : isEyewear
    ? SIMILAR_EYEWEAR
    : isOutdoor
    ? SIMILAR_OUTDOOR
    : isBaby
    ? SIMILAR_BABY
    : SIMILAR_FLAGSHIPS;

  const displayTitle =
    title ||
    (isWatch
      ? "Similar Luxury & Sports Watches"
      : isCookware
      ? "Similar Premium Cookware & Kitchenware"
      : isSkincare
      ? "Similar Skincare & Dermatological Recommendations"
      : isPerfume
      ? "Similar Luxury Fragrances"
      : isEyewear
      ? "Similar Designer Sunglasses"
      : isOutdoor
      ? "Similar Outdoor & Commuter Bicycles"
      : isBaby
      ? "Similar Baby Gear & Strollers"
      : "Similar Flagship Smartphones");

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const offset = dir === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4 select-none">
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          {displayTitle}
        </h3>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll("left")}
            aria-label="Previous"
            className="w-8 h-8 rounded-full border border-slate-200 hover:border-slate-300 bg-white flex items-center justify-center text-slate-600 hover:text-slate-900 cursor-pointer shadow-xs transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Next"
            className="w-8 h-8 rounded-full border border-slate-200 hover:border-slate-300 bg-white flex items-center justify-center text-slate-600 hover:text-slate-900 cursor-pointer shadow-xs transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-2"
      >
        {items.map((prod) => (
          <Link
            key={prod.id}
            href={prod.href || `/products/${prod.id}`}
            className="w-[200px] sm:w-[220px] shrink-0 bg-white rounded-xl p-3 border border-slate-200/80 hover:border-[#1559ac] hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-full h-36 bg-slate-50/70 rounded-lg p-2 mb-2 flex items-center justify-center overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="flex items-center gap-1.5 mb-1">
                <span className="flex items-center bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded text-[10px] font-bold border border-emerald-200">
                  {prod.rating} <Star className="w-2.5 h-2.5 fill-emerald-600 stroke-none ml-0.5" />
                </span>
                <span className="text-[10px] text-gray-400">({prod.reviewsCount})</span>
              </div>

              <h4 className="text-xs font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                {prod.title}
              </h4>
              <p className="text-[10px] text-slate-500 line-clamp-1 mt-1 font-medium">{prod.specs}</p>
            </div>

            <div className="mt-3 pt-2 border-t border-gray-100">
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-black text-gray-950">₹{prod.price.toLocaleString("en-IN")}</span>
                <span className="text-[10px] text-gray-400 line-through">₹{prod.originalPrice.toLocaleString("en-IN")}</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600">{prod.discount}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
