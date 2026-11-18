"use client";

import React from "react";
import { Star, ThumbsUp, CheckCircle, Camera } from "lucide-react";

interface ReviewItem {
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  size: string;
  title: string;
  content: string;
}

// 1. Watches Reviews
const WATCH_REVIEWS: ReviewItem[] = [
  {
    author: "Karthik Ragunathan",
    rating: 5,
    date: "Reviewed in India on 10 November 2026",
    verified: true,
    size: "Dial: 46.3mm | Stainless Silver",
    title: "Unmatched rugged durability, 200M water resistance tested!",
    content:
      "Wore this during weekend scuba diving and heavy swimming. Zero moisture intrusion, anti-reverse bezel clicks with reassuring precision, and the luminous hands glow vividly in pitch darkness. Best value dive watch in the market.",
  },
  {
    author: "Dr. Sandeep Verma",
    rating: 5,
    date: "Reviewed in India on 24 October 2026",
    verified: true,
    size: "Dial: 40mm | Sapphire Glass",
    title: "Stunning craftsmanship and high-accuracy movement",
    content:
      "The integrated solid-link bracelet feels like a timepiece worth five times the price. Sapphire crystal has survived several accidental knocks against door frames without a single hairline scratch.",
  },
  {
    author: "Meera Krishnan",
    rating: 4,
    date: "Reviewed in India on 02 October 2026",
    verified: true,
    size: "Dial: 38mm | Rose Gold Edition",
    title: "Elegant daily wear, looks great with formals",
    content:
      "Gifted to my husband on our anniversary. The weight and wrist presence are perfect. Crown adjustment is smooth and keeps accurate time over the month.",
  },
];

// 2. Cookware Reviews
const COOKWARE_REVIEWS: ReviewItem[] = [
  {
    author: "Shanthi Ramesh",
    rating: 5,
    date: "Reviewed in India on 14 November 2026",
    verified: true,
    size: "Variant: 8L Cast Iron | Seagreen Series",
    title: "Heavy-duty cast iron, food cooks evenly without burning!",
    content:
      "The Seagreen enamel finish looks gorgeous in my modular kitchen. Retains slow cooking heat wonderfully for biryani and mutton stew. Very easy to clean with just warm water and sponge.",
  },
  {
    author: "Chef Anand Vardhan",
    rating: 5,
    date: "Reviewed in India on 05 November 2026",
    verified: true,
    size: "Variant: 26cm Frying Pan | 4-Layer Marble",
    title: "Truly non-stick, requires virtually zero cooking oil",
    content:
      "Dosas and omelets slide right off the surface effortlessly. The induction base heats rapidly and evenly across the entire surface without cold spots. Highly recommended.",
  },
  {
    author: "Deepika Pillai",
    rating: 4,
    date: "Reviewed in India on 19 October 2026",
    verified: true,
    size: "Variant: 10-Piece Stainless Steel Set",
    title: "Solid 18/10 surgical grade steel, great value set",
    content:
      "Replaced all our old pots with this set. Heavy capsule bottom prevents milk and gravies from sticking. The tempered glass lids with steam vents fit snugly.",
  },
];

// 3. Perfume Reviews
const PERFUME_REVIEWS: ReviewItem[] = [
  {
    author: "Zayan Farhan",
    rating: 5,
    date: "Reviewed in India on 11 November 2026",
    verified: true,
    size: "Size: 200ml | Pure Parfum",
    title: "Incredible projection and compliments all day long!",
    content:
      "100% genuine luxury import! The opening of candied apple and mint dries down into intoxicating tonka bean and cedarwood. Lasts easily over 14 hours on clothes. Packaging was tamper-proof.",
  },
  {
    author: "Naveen Rajan",
    rating: 5,
    date: "Reviewed in India on 29 October 2026",
    verified: true,
    size: "Size: 100ml | Extrait de Parfum",
    title: "Unique niche fragrance, high oil concentration",
    content:
      "Sophisticated woody lavender with ambergris drydown. Not synthetic at all. Just 2 to 3 sprays fills the room gently without being overpowering.",
  },
];

// 4. Eyewear Reviews
const EYEWEAR_REVIEWS: ReviewItem[] = [
  {
    author: "Rohit Chandra",
    rating: 5,
    date: "Reviewed in India on 12 November 2026",
    verified: true,
    size: "Style: Polarized UV400 | Black Gradient",
    title: "Cuts road glare completely while driving!",
    content:
      "The UV400 polarized lenses provide razor-sharp contrast under scorching afternoon sun. The TR90 frame is feather-light on the nose bridge with zero pressure points.",
  },
  {
    author: "Ananya Deshmukh",
    rating: 5,
    date: "Reviewed in India on 22 October 2026",
    verified: true,
    size: "Style: Cat-Eye Acetate | Tortoise Shell",
    title: "High fashion look and sturdy hinges",
    content:
      "The acetate finish feels so premium and sturdy. Comes with an authentic leather case and micro-fiber cloth. Excellent value during the festive discount.",
  },
];

// 5. Skincare Reviews
const SKINCARE_REVIEWS: ReviewItem[] = [
  {
    author: "Dr. Kavitha Sundaram (Dermatologist)",
    rating: 5,
    date: "Reviewed in India on 12 November 2026",
    verified: true,
    size: "Skin Type: Sensitive & Acne-Prone",
    title: "Remarkable soothing effect, clears active blemishes within 7 days!",
    content:
      "As a practicing dermatologist, I tested the sebum-regulating complex on persistent flare-ups. Within one week, inflammation visibly calmed and skin barrier hydration increased substantially without clogging pores. Non-comedogenic and fragrance-safe.",
  },
  {
    author: "Pooja Ananthakrishnan",
    rating: 5,
    date: "Reviewed in India on 28 October 2026",
    verified: true,
    size: "Skin Type: Combination Skin",
    title: "100% authentic dermatological formula, glowing texture!",
    content:
      "The lightweight gel-cream absorbs instantly with zero greasiness under sunscreen and makeup. After 3 weeks of daily use, my stubborn dark spots and acne scars have significantly faded. Pure French formulation quality.",
  },
  {
    author: "Sneha Mukherjee",
    rating: 5,
    date: "Reviewed in India on 15 October 2026",
    verified: true,
    size: "Skin Type: Oily / Enlarged Pores",
    title: "Pore minimizing and gentle on reactive skin",
    content:
      "Gentle everyday cleanser and serum combination. Leaves skin feeling velvety soft and balanced rather than stripped dry. Authentic packaging with tamper seal intact.",
  },
];

// 6. Outdoor & Sports Reviews
const OUTDOOR_REVIEWS: ReviewItem[] = [
  {
    author: "Rajesh Kannan",
    rating: 5,
    date: "Reviewed in India on 11 November 2026",
    verified: true,
    size: "Frame: 18 Inch Alloy | 21-Speed Shimano",
    title: "Ultra-smooth gear shifting, tackles steep uphill trails with ease!",
    content:
      "Daily 25km commuter and weekend trail rider. The Shimano derailleur shifts seamlessly under load, and dual mechanical disc brakes deliver sharp stopping power even during rain. Lightweight aircraft-grade aluminum alloy frame.",
  },
  {
    author: "Siddharth Menon",
    rating: 5,
    date: "Reviewed in India on 26 October 2026",
    verified: true,
    size: "Wheels: 700c Double-Wall | Matte Anthracite",
    title: "Fast aerodynamic geometry and sturdy suspension fork",
    content:
      "Delivered 85% pre-assembled. Completed assembly in 20 minutes with the included toolkit. Front lockout suspension absorbs city potholes effortlessly. Exceptional ride quality.",
  },
];

// 7. Baby Gear Reviews
const BABY_REVIEWS: ReviewItem[] = [
  {
    author: "Divya & Ashwin Nambiar",
    rating: 5,
    date: "Reviewed in India on 09 November 2026",
    verified: true,
    size: "Safety Standard: EN 1888 Certified | One-Hand Fold",
    title: "Effortless one-hand maneuverability, super plush cushioned bassinet!",
    content:
      "Fits easily into our sedan car boot with the quick one-hand fold mechanism. Suspension on all four wheels ensures our 6-month-old sleeps peacefully even on uneven pavements. Generous UV50+ canopy cover protects against harsh sun.",
  },
];

// 8. Smartphone Reviews (Default)
const SMARTPHONE_REVIEWS: ReviewItem[] = [
  {
    author: "Arun K. Sundaram",
    rating: 5,
    date: "Reviewed in India on 12 November 2026",
    verified: true,
    size: "Variant: 256GB | Desert Titanium",
    title: "Exceptional battery life and lightning fast A18 Pro!",
    content:
      "Upgraded from an older device and the difference is massive. The Desert Titanium finish looks subtle and super premium in hand. Camera low-light performance with the new 48MP sensor is by far the best on any smartphone. Delivered safely within 24 hours.",
  },
  {
    author: "Pooja Venkatesh",
    rating: 5,
    date: "Reviewed in India on 28 October 2026",
    verified: true,
    size: "Variant: 256GB | Desert Titanium",
    title: "120Hz display is buttery smooth, Apple Intelligence is helpful",
    content:
      "Display brightness under direct sunlight is incredible. Siri with on-device Apple Intelligence handles emails and summarizes messages effortlessly. Battery comfortably lasts 1.5 days on heavy usage.",
  },
  {
    author: "Vikram Malhotra",
    rating: 4,
    date: "Reviewed in India on 15 October 2026",
    verified: true,
    size: "Variant: 512GB | Black Titanium",
    title: "Solid build quality, great video stabilization",
    content:
      "4K 120fps Dolby Vision video recording is unmatched for content creation. Only minor complaint is charging speed tops around 30W, but battery efficiency makes up for it completely.",
  },
];

export const CustomerReviewsSection: React.FC<{
  category?: string;
  productImage?: string;
  productImages?: string[];
}> = ({ category = "mobiles", productImage, productImages }) => {
  const catLower = (category || "").toLowerCase();
  const isWatch = catLower.includes("watch");
  const isCookware = catLower.includes("cookware") || catLower.includes("kitchen");
  const isSkincare = catLower.includes("skincare") || catLower.includes("skin");
  const isPerfume = catLower.includes("perfume") || catLower.includes("fragrance");
  const isEyewear = catLower.includes("eyewear") || catLower.includes("sunglass");
  const isOutdoor = catLower.includes("bicycle") || catLower.includes("outdoor");
  const isBaby = catLower.includes("baby");

  const reviews = isWatch
    ? WATCH_REVIEWS
    : isCookware
    ? COOKWARE_REVIEWS
    : isSkincare
    ? SKINCARE_REVIEWS
    : isPerfume
    ? PERFUME_REVIEWS
    : isEyewear
    ? EYEWEAR_REVIEWS
    : isOutdoor
    ? OUTDOOR_REVIEWS
    : isBaby
    ? BABY_REVIEWS
    : SMARTPHONE_REVIEWS;

  const reviewImages =
    productImages && productImages.length > 0
      ? productImages
      : productImage
      ? [productImage]
      : isWatch
      ? [
          "/banners/watch-casio-diver.png",
          "/banners/watch-citizen-tsuyosa.png",
          "/banners/watch-seiko-chrono.jpg",
          "/banners/watch-tissot-prx.jpg",
        ]
      : isCookware
      ? [
          "/banners/fissman-stockpot.png",
          "/banners/fissman-pan.png",
          "/banners/cookware-oms-10piece.png",
          "/banners/fissman-kettle.png",
        ]
      : isSkincare
      ? [
          "/banners/skincare-acm-gel.png",
          "/banners/skincare-anua-heartleaf.png",
          "/banners/skincare-medicube-pdrn.png",
          "/banners/skincare-sol-de-janeiro.png",
        ]
      : isPerfume
      ? [
          "/banners/perfumes-versace-eros.png",
          "/banners/perfumes-french-avenue.png",
          "/banners/perfumes-armani-acqua.png",
        ]
      : isEyewear
      ? [
          "/banners/eyewear-tommy-women.png",
          "/banners/eyewear-prada-sps06y.png",
          "/banners/eyewear-lacoste-l6071s.png",
        ]
      : isOutdoor
      ? [
          "/banners/outdoor-vaux-joggers.png",
          "/banners/outdoor-vaux-max16.png",
          "/banners/outdoor-vaux-royal16.png",
          "/banners/outdoor-mogoo-florida.png",
        ]
      : isBaby
      ? [
          "/banners/baby-neobreez-stroller.png",
          "/banners/deal-ingenuity.png",
        ]
      : [
          "/banners/noon-iphone-main.png",
          "/banners/iphone-noon-1.jpg",
          "/banners/iphone-noon-2.jpg",
          "/banners/iphone-noon-3.jpg",
        ];

  return (
    <div className="w-full bg-white border border-[#e7e7e7] rounded-2xl p-6 sm:p-8 space-y-6 text-gray-900 shadow-xs select-none">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Rating Breakdown Column */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">
            Customer Reviews (
            {isWatch
              ? "Watch Owners"
              : isCookware
              ? "Verified Chefs"
              : isSkincare
              ? "Skincare Enthusiasts"
              : isPerfume
              ? "Fragrance Connoisseurs"
              : isEyewear
              ? "Eyewear Stylists"
              : isOutdoor
              ? "Cyclists & Riders"
              : isBaby
              ? "Verified Parents"
              : "Verified Buyers"}
            )
          </h3>

          <div className="flex items-center gap-3">
            <div className="flex items-center text-amber-500">
              <Star className="w-5 h-5 fill-amber-400 stroke-amber-400" />
              <Star className="w-5 h-5 fill-amber-400 stroke-amber-400" />
              <Star className="w-5 h-5 fill-amber-400 stroke-amber-400" />
              <Star className="w-5 h-5 fill-amber-400 stroke-amber-400" />
              <Star className="w-5 h-5 fill-amber-400 stroke-amber-400" />
            </div>
            <span className="text-lg font-bold text-gray-900">4.8 out of 5</span>
          </div>

          <p className="text-xs text-gray-500">Based on 1,480+ global verified ratings</p>

          {/* Rating Progress Bars */}
          <div className="space-y-2 pt-2">
            {[
              { star: 5, pct: "78%" },
              { star: 4, pct: "16%" },
              { star: 3, pct: "4%" },
              { star: 2, pct: "1%" },
              { star: 1, pct: "1%" },
            ].map((bar) => (
              <div key={bar.star} className="flex items-center gap-3 text-xs">
                <span className="w-12 text-blue-600 font-semibold">{bar.star} star</span>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: bar.pct }}
                  />
                </div>
                <span className="w-8 text-right text-gray-500 font-medium">{bar.pct}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-sm font-bold text-gray-900">Review this product</h4>
            <p className="text-xs text-gray-500 mt-0.5">
              Share your thoughts with other customers
            </p>
            <button className="w-full mt-3 py-2 px-4 rounded-xl border border-gray-300 text-xs font-bold text-gray-800 hover:bg-gray-50 transition cursor-pointer shadow-xs">
              Write a product review
            </button>
          </div>
        </div>

        {/* Right Customer Photos & Detailed Reviews Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Photos Showcase */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-gray-500" />
                <span>Verified Customer Product Photos ({reviewImages.length})</span>
              </h4>
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              {reviewImages.slice(0, 4).map((img, idx) => (
                <div
                  key={idx}
                  className="w-full h-24 sm:h-28 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center p-2 group cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <img
                    src={img}
                    alt={`Customer photo ${idx + 1}`}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6 pt-2">
            {reviews.map((rev, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-5 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-[#1559ac] font-bold text-xs flex items-center justify-center">
                    {rev.author.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-gray-900">{rev.author}</span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-gray-900">{rev.title}</span>
                </div>

                <div className="text-[11px] text-gray-400 flex items-center gap-2 flex-wrap">
                  <span>{rev.date}</span>
                  {rev.verified && (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-600" /> Verified Purchase
                    </span>
                  )}
                  <span>·</span>
                  <span className="text-gray-500 font-medium">{rev.size}</span>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed pt-1">{rev.content}</p>

                <div className="pt-2 flex items-center gap-4 text-xs text-gray-500">
                  <button className="flex items-center gap-1 hover:text-gray-900 transition cursor-pointer">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful (18)</span>
                  </button>
                  <span className="text-gray-300">|</span>
                  <button className="hover:underline cursor-pointer">Report</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
