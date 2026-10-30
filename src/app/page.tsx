"use client";

import React from "react";
import { HeroBannerWithRoundCategories } from "@/components/cards/HeroBannerWithRoundCategories";
import { ModernDealsGridSection } from "@/components/cards/ModernDealsGridSection";
import { TopPicksSection } from "@/components/cards/TopPicksSection";
import { PreOwnedMobilesSection } from "@/components/cards/PreOwnedMobilesSection";
import { WatchesSection } from "@/components/cards/WatchesSection";
import { CookwareSection } from "@/components/cards/CookwareSection";
import { PromotionalBannerCarousel } from "@/components/cards/PromotionalBannerCarousel";
import { SkincareSection } from "@/components/cards/SkincareSection";
import { OutdoorRecreationSection } from "@/components/cards/OutdoorRecreationSection";
import { OutdoorPromoBannerCarousel } from "@/components/cards/OutdoorPromoBannerCarousel";
import { PerfumesSection } from "@/components/cards/PerfumesSection";
import { FeedingSection } from "@/components/cards/FeedingSection";
import { BabyGearTravelSection } from "@/components/cards/BabyGearTravelSection";
import { LifestylePromoBannerCarousel } from "@/components/cards/LifestylePromoBannerCarousel";
import { EyewearSection } from "@/components/cards/EyewearSection";
import { MobilePhonesSection } from "@/components/cards/MobilePhonesSection";
import { CategoryRowSections } from "@/components/cards/CategoryRowSections";

export default function Home() {
  return (
    <div className="w-full relative pb-8 select-none">
      {/* 1. Full-Screen Edge-to-Edge Hero Banner & Round Subcategories (No container box) */}
      <HeroBannerWithRoundCategories />

      {/* 2. Main Page Grid Sections wrapped in standard responsive container */}
      <div className="w-full px-2 sm:px-3.5 max-w-[1500px] mx-auto space-y-4 mt-2">
        {/* Modern 3-Column Deals Grid (Matches user reference image) */}
        <ModernDealsGridSection />

        {/* Top Picks Section based on 2nd image: Left Fissman Poster + Right Slide Carousel with Indian Rupee Prices */}
        <TopPicksSection />

        {/* Pre-Owned Mobiles Section based on 2nd image: Left Showcase Poster + Right Slide Carousel with Indian Rupee Prices */}
        <PreOwnedMobilesSection />

        {/* Watches Section based on 2nd image: Left Luxury Watches Poster + Right Slide Carousel with Indian Rupee Prices */}
        <WatchesSection />

        {/* Cookware Section based on 2nd image: Left Granite Cookware Poster + Right Slide Carousel with Indian Rupee Prices */}
        <CookwareSection />

        {/* Promotional Wide Banner Carousel (Chillax Baby Monitors, Elevate Cooking, Casio Timeless Collection) */}
        <PromotionalBannerCarousel />

        {/* Skin Care Section based on reference image: Left Pink Glow Poster + Right 8-Product Slider */}
        <SkincareSection />

        {/* Outdoor Recreation Section based on reference image: Left Bicycles Showcase Poster + Right 8-Product Slider */}
        <OutdoorRecreationSection />

        {/* Outdoor & Gaming Promotional Carousel (PlayStation, iPads, Outdoor Camping, Samsung Mobiles) */}
        <OutdoorPromoBannerCarousel />

        {/* Perfumes Section based on reference image: Left Showcase Poster + Right 8-Product Slider */}
        <PerfumesSection />

        {/* Feeding Section based on reference image: Left Showcase Poster + Right 8-Product Slider */}
        <FeedingSection />

        {/* Baby Gear & Travel Section based on reference image: Left Showcase Poster + Right 8-Product Slider */}
        <BabyGearTravelSection />

        {/* Lifestyle, Sunscreen & Baby Transit Promo Carousel (Sunscreen, Perfumes Him & Her, Baby Transit Lifestyle) */}
        <LifestylePromoBannerCarousel />

        {/* Eyewear & Sun Glasses Section based on reference image: Left Luxury Eyewear Poster + Right 8-Product Slider */}
        <EyewearSection />

        {/* Mobile Phones Section based on reference image: Left Flagship Mobiles Poster + Right 8-Product Slider */}
        <MobilePhonesSection />

        {/* Categories Sections One Below Another (Men's fashion -> Women's fashion -> Beauty -> Health & Nutrition -> Grocery) */}
        <CategoryRowSections />
      </div>
    </div>
  );
}


