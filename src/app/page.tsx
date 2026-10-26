"use client";

import React from "react";
import { HeroFestivalGrid } from "@/components/cards/HeroFestivalGrid";
import { 
  DealsForYouCarousel, 
  OrangeFestivalCard 
} from "@/components/cards/DealsForYouCarousel";
import { CustomerHistoryCarousel } from "@/components/cards/CustomerHistoryCarousel";
import { 
  DEALS_FOR_YOU_ROW,
  ORANGE_GRID_ROW_2,
  ORANGE_GRID_ROW_3,
  ORANGE_GRID_ROW_4,
  ORANGE_GRID_ROW_5,
  ORANGE_GRID_ROW_6
} from "@/data/dealsForYouData";

export default function Home() {
  return (
    <div className="w-full relative pb-8 px-2 sm:px-3.5 max-w-[1500px] mx-auto space-y-3.5">
      {/* 1. Subnav Below: Hero Festival Grid (Himalaya banner, Deals, 3D printers, Dove, 4 mins delivery, Dell mini strip) */}
      <HeroFestivalGrid />

      {/* 2. Deals for you Horizontal Carousel */}
      <DealsForYouCarousel cards={DEALS_FOR_YOU_ROW} />

      {/* 3. Orange Card Matrix Row 2: 4 cards with tight Amazon gap-3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {ORANGE_GRID_ROW_2.map((card, idx) => (
          <OrangeFestivalCard key={idx} {...card} />
        ))}
      </div>

      {/* 4. Orange Card Matrix Row 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {ORANGE_GRID_ROW_3.map((card, idx) => (
          <OrangeFestivalCard key={idx} {...card} />
        ))}
      </div>

      {/* 5. Orange Card Matrix Row 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {ORANGE_GRID_ROW_4.map((card, idx) => (
          <OrangeFestivalCard key={idx} {...card} />
        ))}
      </div>

      {/* 6. Orange Card Matrix Row 5 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {ORANGE_GRID_ROW_5.map((card, idx) => (
          <OrangeFestivalCard key={idx} {...card} />
        ))}
      </div>

      {/* 7. Orange Card Matrix Row 6 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {ORANGE_GRID_ROW_6.map((card, idx) => (
          <OrangeFestivalCard key={idx} {...card} />
        ))}
      </div>

      {/* 8. Bottom Carousel: Customers who viewed items in your browsing history also viewed */}
      <CustomerHistoryCarousel />
    </div>
  );
}
