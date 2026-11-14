"use client";

import React from "react";
import dynamic from "next/dynamic";
import { HeroBannerWithRoundCategories } from "@/components/cards/HeroBannerWithRoundCategories";
import { ModernDealsGridSection } from "@/components/cards/ModernDealsGridSection";

// Dynamically import lower sections so initial page load renders instantly (<500ms)
const TopPicksSection = dynamic(
  () => import("@/components/cards/TopPicksSection").then((m) => m.TopPicksSection),
  { ssr: true }
);

const PreOwnedMobilesSection = dynamic(
  () => import("@/components/cards/PreOwnedMobilesSection").then((m) => m.PreOwnedMobilesSection),
  { ssr: true }
);

const WatchesSection = dynamic(
  () => import("@/components/cards/WatchesSection").then((m) => m.WatchesSection),
  { ssr: true }
);

const MaximizeSavingsSection = dynamic(
  () => import("@/components/cards/MaximizeSavingsSection").then((m) => m.MaximizeSavingsSection),
  { ssr: true }
);

const PromotionalBannerCarousel = dynamic(
  () => import("@/components/cards/PromotionalBannerCarousel").then((m) => m.PromotionalBannerCarousel),
  { ssr: true }
);

const SkincareSection = dynamic(
  () => import("@/components/cards/SkincareSection").then((m) => m.SkincareSection),
  { ssr: true }
);

const OutdoorRecreationSection = dynamic(
  () => import("@/components/cards/OutdoorRecreationSection").then((m) => m.OutdoorRecreationSection),
  { ssr: true }
);

const OutdoorPromoBannerCarousel = dynamic(
  () => import("@/components/cards/OutdoorPromoBannerCarousel").then((m) => m.OutdoorPromoBannerCarousel),
  { ssr: true }
);

const PerfumesSection = dynamic(
  () => import("@/components/cards/PerfumesSection").then((m) => m.PerfumesSection),
  { ssr: true }
);

const LifestylePromoBannerCarousel = dynamic(
  () => import("@/components/cards/LifestylePromoBannerCarousel").then((m) => m.LifestylePromoBannerCarousel),
  { ssr: true }
);

const EyewearSection = dynamic(
  () => import("@/components/cards/EyewearSection").then((m) => m.EyewearSection),
  { ssr: true }
);

const TrendingBrandsSection = dynamic(
  () => import("@/components/cards/TrendingBrandsSection").then((m) => m.TrendingBrandsSection),
  { ssr: true }
);

const MobilePhonesSection = dynamic(
  () => import("@/components/cards/MobilePhonesSection").then((m) => m.MobilePhonesSection),
  { ssr: true }
);

const CategoryRowSections = dynamic(
  () => import("@/components/cards/CategoryRowSections").then((m) => m.CategoryRowSections),
  { ssr: true }
);

export default function Home() {
  return (
    <div className="w-full relative pb-8 select-none">
      {/* 1. Full-Screen Edge-to-Edge Hero Banner & Round Subcategories - Renders instantly */}
      <HeroBannerWithRoundCategories />

      {/* 2. Main Page Grid Sections wrapped in standard responsive container */}
      <div className="w-full px-2 sm:px-3.5 max-w-[1500px] mx-auto space-y-4 mt-2">
        {/* Modern 3-Column Deals Grid */}
        <ModernDealsGridSection />

        {/* Top Picks Section */}
        <TopPicksSection />

        {/* Pre-Owned Mobiles Section */}
        <PreOwnedMobilesSection />

        {/* Watches Section */}
        <WatchesSection />

        {/* Maximize Your Savings Scroll Carousel Section */}
        <MaximizeSavingsSection />

        {/* Promotional Wide Banner Carousel */}
        <PromotionalBannerCarousel />

        {/* Skin Care Section */}
        <SkincareSection />

        {/* Outdoor Recreation Section */}
        <OutdoorRecreationSection />

        {/* Outdoor & Gaming Promotional Carousel */}
        <OutdoorPromoBannerCarousel />

        {/* Perfumes Section */}
        <PerfumesSection />

        {/* Lifestyle, Sunscreen & Baby Transit Promo Carousel */}
        <LifestylePromoBannerCarousel />

        {/* Eyewear & Sun Glasses Section */}
        <EyewearSection />

        {/* Trending Brands Circular Slider (OnePlus, Samsung, Oppo, Nothing, Pixel, etc.) */}
        <TrendingBrandsSection />

        {/* Mobile Phones Section */}
        <MobilePhonesSection />

        {/* Categories Sections One Below Another */}
        <CategoryRowSections />
      </div>
    </div>
  );
}
