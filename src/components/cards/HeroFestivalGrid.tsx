"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, ChevronRight as RightIcon } from "lucide-react";

export const HeroFestivalGrid: React.FC = () => {
  const topCardsScrollRef = useRef<HTMLDivElement>(null);
  const bottomCardsScrollRef = useRef<HTMLDivElement>(null);

  const scrollTopCards = (dir: "left" | "right") => {
    if (topCardsScrollRef.current) {
      const offset = dir === "left" ? -350 : 350;
      topCardsScrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const scrollBottomCards = (dir: "left" | "right") => {
    if (bottomCardsScrollRef.current) {
      const offset = dir === "left" ? -300 : 300;
      bottomCardsScrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full pt-1 pb-2">
      {/* Container: Left Tall Card + Right Stacked Sliders (Top Cards & Bottom Cards) */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch">
        
        {/* ==================== LEFT TALL CARD ==================== */}
        {/* Matching second image: Tall height card spanning the entire height of right top + bottom rows */}
        <Link
          href="/products/kotty-mens-jeans"
          className="w-full lg:w-[285px] shrink-0 bg-gradient-to-b from-[#ff5e00] via-[#ff6a00] to-[#e64a00] rounded-2xl p-4 text-white flex flex-col justify-between border border-[#e65100] shadow-md select-none relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all"
        >
          {/* Subtle festival background pattern accent */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-400/10 rounded-full blur-xl -ml-8 -mb-8 pointer-events-none" />

          {/* Top Section of Left Card */}
          <div className="relative z-10">
            <h2 className="text-2xl font-black tracking-tight text-white drop-shadow-xs">
              Handpicked
            </h2>
            <p className="text-xs font-semibold text-orange-100 tracking-wide mt-0.5">
              deals for you • Chinos & Trousers
            </p>

            {/* Festival Badge */}
            <div className="mt-4 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1.5 justify-center mb-1">
                <span className="text-base">🪔</span>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-200">
                  Great Indian Festival
                </span>
                <span className="text-base">🪔</span>
              </div>
              <span className="text-[10px] font-bold text-orange-200 italic -mt-1">
                Reloaded
              </span>

              {/* Big 3 PM Picks Badge */}
              <div className="mt-3.5 bg-white text-[#cc0c39] border-2 border-red-600 rounded-2xl px-5 py-3 shadow-md w-full max-w-[230px] flex flex-col items-center group-hover:scale-105 transition-transform">
                <span className="text-3xl font-black tracking-tighter leading-none">
                  3 PM
                </span>
                <span className="text-2xl font-black tracking-tight leading-none uppercase mt-0.5">
                  Picks
                </span>
              </div>

              {/* Amazing Deals Subtitle */}
              <h3 className="text-xl font-black text-amber-200 mt-3 drop-shadow-xs">
                Amazing deals
              </h3>
            </div>
          </div>

          {/* Bottom Section of Left Card */}
          <div className="relative z-10 mt-6 space-y-2.5">
            {/* Prime Cashback Pill */}
            <div className="bg-[#007185] hover:bg-[#005f70] transition text-white text-center py-2 px-3 rounded-lg text-xs font-bold shadow-xs">
              Extra ₹250 cashback only for Prime*
            </div>

            {/* Bank offer strip */}
            <div className="bg-white rounded-xl p-2.5 text-center text-gray-900 border border-orange-200 shadow-xs">
              <span className="bg-[#cc0c39] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full inline-block">
                SHOP NOW
              </span>
              <p className="font-extrabold text-[11px] text-[#b12704] mt-1 leading-tight">
                Great Indian Festival | Reloaded
              </p>
              <div className="flex items-center justify-center gap-1 text-[9px] text-gray-700 font-bold mt-1">
                <span className="text-red-700">AXIS BANK</span>
                <span>|</span>
                <span className="text-orange-600">ICICI Bank</span>
                <span>|</span>
                <span className="text-emerald-700">10% Savings*</span>
              </div>
            </div>
          </div>
        </Link>

        {/* ==================== RIGHT SIDE STACKED SLIDERS ==================== */}
        {/* Right side takes all remaining width and has two horizontal sliding rows */}
        <div className="flex-1 flex flex-col justify-between gap-3 min-w-0">
          
          {/* ----- ROW 1: TOP COLORFUL CAROUSEL SLIDER ----- */}
          <div className="relative overflow-hidden group/topslider bg-white/40 rounded-2xl p-1">
            {/* Left Nav Button */}
            <button
              onClick={() => scrollTopCards("left")}
              aria-label="Scroll left"
              className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-9 h-20 bg-white/95 hover:bg-white border border-[#cdcdcd] shadow-md flex items-center justify-center rounded-r cursor-pointer text-[#111] transition hover:scale-105"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* Track of Top Cards */}
            <div
              ref={topCardsScrollRef}
              className="flex gap-3 overflow-x-auto scrollbar-none scroll-smooth pb-0.5"
            >
              {/* Top Card 1: Teal/Green (Starting ₹79 | Pizza & Food Deals) */}
              <Link
                href="/products/happilo-premium-almonds"
                className="w-[245px] sm:w-[260px] shrink-0 bg-gradient-to-b from-[#0f6c58] via-[#0d5948] to-[#094236] rounded-2xl p-3 text-white flex flex-col justify-between border border-[#14836b] shadow-xs select-none cursor-pointer hover:shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <div>
                  <h3 className="font-black text-lg leading-tight">Starting ₹79</h3>
                  <p className="text-[11px] text-emerald-100 font-semibold mt-0.5">
                    Pizza base, garlic bread & more
                  </p>
                  <span className="text-[9px] bg-white/20 text-emerald-200 px-1.5 py-0.5 rounded font-bold mt-1 inline-block">
                    ⚡ 4 mins Delivery
                  </span>

                  <div className="w-full h-36 bg-white rounded-xl overflow-hidden mt-2 p-1.5 flex items-center justify-center border border-white/20">
                    <img
                      src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=350&q=80"
                      alt="Fresh gourmet pizza"
                      className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
                    />
                  </div>
                </div>

                <div className="mt-2 bg-amber-50 rounded-xl p-1.5 text-center text-gray-900 border border-amber-200">
                  <span className="bg-[#cc0c39] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full inline-block">
                    Shop Now
                  </span>
                  <p className="font-extrabold text-[10px] text-[#b12704] mt-0.5">
                    Great Indian Festival | Reloaded
                  </p>
                </div>
              </Link>

              {/* Top Card 2: Cyan Blue (Get ₹100 back* | Dry fruits & snacks) */}
              <Link
                href="/products/happilo-premium-almonds"
                className="w-[245px] sm:w-[260px] shrink-0 bg-gradient-to-b from-[#009bd9] via-[#0086bc] to-[#006b96] rounded-2xl p-3 text-white flex flex-col justify-between border border-[#00a8ec] shadow-xs select-none cursor-pointer hover:shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <div>
                  <h3 className="font-black text-lg leading-tight">
                    Get ₹100 back* on every order
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] font-black mt-0.5 text-cyan-100">
                    <span className="bg-[#131921] px-1.5 py-0.5 rounded text-[9px] text-white font-bold">
                      1PLACE now
                    </span>
                    <span>⚡ 4 mins</span>
                  </div>

                  <div className="w-full h-36 bg-white/10 rounded-xl overflow-hidden mt-2 p-1 flex items-center justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=350&q=80"
                      alt="Dry fruits and snacks"
                      className="max-h-full max-w-full object-contain drop-shadow hover:scale-105 transition-transform"
                    />
                  </div>
                </div>

                <div className="mt-2 bg-amber-50 rounded-xl p-1.5 text-center text-gray-900 border border-amber-200">
                  <span className="bg-[#cc0c39] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full inline-block">
                    Shop Now
                  </span>
                  <p className="font-extrabold text-[10px] text-[#b12704] mt-0.5">
                    Great Indian Festival | Reloaded
                  </p>
                </div>
              </Link>

              {/* Top Card 3: Orange (From ₹26,999* | OnePlus CE6 Lite) */}
              <Link
                href="/products/oneplus-ce6-lite"
                className="w-[245px] sm:w-[260px] shrink-0 bg-gradient-to-b from-[#ff6a00] via-[#ff7700] to-[#e65100] rounded-2xl p-3 text-white flex flex-col justify-between border border-[#e65c00] shadow-xs select-none cursor-pointer hover:shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <div>
                  <h3 className="font-black text-lg leading-tight">From ₹26,999*</h3>
                  <p className="text-[11px] text-orange-100 font-semibold mt-0.5">
                    OnePlus CE6 Lite | 8 + 128 GB
                  </p>
                  <span className="text-[9px] bg-white/20 text-white px-1.5 py-0.5 rounded font-bold mt-1 inline-block">
                    1.03Mn + AnTuTu score
                  </span>

                  <div className="w-full h-36 bg-white rounded-xl overflow-hidden mt-2 p-1.5 flex items-center justify-center border border-white/20">
                    <img
                      src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=350&q=80"
                      alt="OnePlus Phone"
                      className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
                    />
                  </div>
                </div>

                <div className="mt-2 bg-amber-50 rounded-xl p-1.5 text-center text-gray-900 border border-amber-200">
                  <span className="bg-[#cc0c39] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full inline-block">
                    Shop Now
                  </span>
                  <p className="font-extrabold text-[10px] text-[#b12704] mt-0.5">
                    Great Indian Festival | Reloaded
                  </p>
                </div>
              </Link>

              {/* Top Card 4: Dark Orange / Amber (Up to 50% off* | HP Victus Gaming Laptop) */}
              <Link
                href="/products/hp-victus-gaming-laptop"
                className="w-[245px] sm:w-[260px] shrink-0 bg-gradient-to-b from-[#ff7a00] via-[#ff8800] to-[#e65c00] rounded-2xl p-3 text-white flex flex-col justify-between border border-[#f07000] shadow-xs select-none cursor-pointer hover:shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <div>
                  <h3 className="font-black text-lg leading-tight">Up to 50% off*</h3>
                  <p className="text-[11px] text-orange-100 font-semibold mt-0.5">
                    Premium gaming laptops
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-[10px] font-bold">
                    <span className="bg-white text-blue-900 px-1 py-0.2 rounded-full font-black">
                      hp
                    </span>
                    <span>VICTUS by HP</span>
                  </div>

                  <div className="w-full h-36 bg-white rounded-xl overflow-hidden mt-2 p-1.5 flex items-center justify-center border border-white/20">
                    <img
                      src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=350&q=80"
                      alt="HP Gaming Laptop"
                      className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
                    />
                  </div>
                </div>

                <div className="mt-2 bg-amber-50 rounded-xl p-1.5 text-center text-gray-900 border border-amber-200">
                  <span className="bg-[#cc0c39] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full inline-block">
                    Shop Now
                  </span>
                  <p className="font-extrabold text-[10px] text-[#b12704] mt-0.5">
                    Great Indian Festival | Reloaded
                  </p>
                </div>
              </Link>

              {/* Top Card 5: Magenta/Purple (All ₹34,999* | Audio & Gadgets) */}
              <Link
                href="/products/sony-wh1000xm5-headphones"
                className="w-[245px] sm:w-[260px] shrink-0 bg-gradient-to-b from-[#8f154e] via-[#6a0a38] to-[#450322] rounded-2xl p-3 text-white flex flex-col justify-between border border-[#a11b59] shadow-xs select-none cursor-pointer hover:shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <div>
                  <h3 className="font-black text-lg leading-tight">All ₹34,999*</h3>
                  <p className="text-[11px] text-pink-200 font-semibold mt-0.5">
                    Smart Audio & Tech picks
                  </p>
                  <div className="text-[9px] font-bold text-pink-300 mt-1 flex gap-2">
                    <span>SONY</span> • <span>BOSE</span> • <span>JBL</span>
                  </div>

                  <div className="w-full h-36 bg-white rounded-xl overflow-hidden mt-2 p-1.5 flex items-center justify-center border border-white/20">
                    <img
                      src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=350&q=80"
                      alt="Premium Audio Headphones"
                      className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
                    />
                  </div>
                </div>

                <div className="mt-2 bg-amber-50 rounded-xl p-1.5 text-center text-gray-900 border border-amber-200">
                  <span className="bg-[#cc0c39] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full inline-block">
                    Shop Now
                  </span>
                  <p className="font-extrabold text-[10px] text-[#b12704] mt-0.5">
                    Great Indian Festival | Reloaded
                  </p>
                </div>
              </Link>
            </div>

            {/* Right Nav Button */}
            <button
              onClick={() => scrollTopCards("right")}
              aria-label="Scroll right"
              className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-9 h-20 bg-white/95 hover:bg-white border border-[#cdcdcd] shadow-md flex items-center justify-center rounded-l cursor-pointer text-[#111] transition hover:scale-105"
            >
              <RightIcon className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

          {/* ----- ROW 2: BOTTOM SLIDER MINI CARDS STRIP ----- */}
          <div className="relative bg-white rounded-2xl p-2.5 border border-[#e3e6e6] shadow-xs group/bottomstrip">
            {/* Left Nav Button */}
            <button
              onClick={() => scrollBottomCards("left")}
              aria-label="Scroll left mini"
              className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-7 h-14 bg-white/95 hover:bg-white border border-gray-300 shadow flex items-center justify-center rounded-r cursor-pointer text-[#111]"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>

            {/* Bottom Slider Track */}
            <div
              ref={bottomCardsScrollRef}
              className="flex gap-2.5 overflow-x-auto scrollbar-none scroll-smooth items-center px-1"
            >
              {/* Tile 1: Dell 15 AI Powered */}
              <Link
                href="/products/hp-victus-gaming-laptop"
                className="w-44 shrink-0 bg-[#f9fafb] border border-gray-200 rounded-xl p-2 cursor-pointer hover:shadow-md transition block"
              >
                <p className="text-[11px] font-bold text-gray-900 truncate">Dell 15 AI Powered...</p>
                <span className="text-[9px] text-gray-400">Sponsored ⓘ</span>
                <div className="h-16 flex items-center justify-center mt-1">
                  <img
                    src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=250&q=80"
                    alt="Dell 15 Laptop"
                    className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
                  />
                </div>
              </Link>

              {/* Tile 2: Min 50% off Festival Box (Orange) */}
              <Link
                href="/products/happilo-premium-almonds"
                className="w-44 shrink-0 bg-[#ff6a00] text-white rounded-xl p-2 flex flex-col justify-between h-28 cursor-pointer hover:opacity-95 shadow-xs"
              >
                <p className="text-[11px] font-black">Min 50% off</p>
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-black">Great Indian Festival</span>
                  <span className="text-[10px] font-semibold text-amber-200">Reloaded</span>
                </div>
              </Link>

              {/* Tile 3: Keep shopping for Trimmer */}
              <Link
                href="/products/philips-grooming-trimmer"
                className="w-44 shrink-0 bg-[#f9fafb] border border-gray-200 rounded-xl p-2 cursor-pointer hover:shadow-md transition block"
              >
                <p className="text-[11px] font-bold text-gray-900 truncate">Keep shopping for</p>
                <div className="h-14 flex items-center justify-center my-0.5">
                  <img
                    src="https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=250&q=80"
                    alt="Men trimmer"
                    className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
                  />
                </div>
                <span className="bg-[#cc0c39] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-xs">
                  73% off
                </span>
              </Link>

              {/* Tile 4: Keep shopping for Galaxy S25 */}
              <Link
                href="/products/oneplus-ce6-lite"
                className="w-44 shrink-0 bg-[#f9fafb] border border-gray-200 rounded-xl p-2 cursor-pointer hover:shadow-md transition block"
              >
                <p className="text-[11px] font-bold text-gray-900 truncate">Keep shopping for</p>
                <div className="h-14 flex items-center justify-center my-0.5">
                  <img
                    src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=250&q=80"
                    alt="Galaxy Phone"
                    className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
                  />
                </div>
                <span className="bg-[#cc0c39] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-xs">
                  71% off
                </span>
              </Link>

              {/* Tile 5: Deals on festive picks (Green Box) */}
              <Link
                href="/products/sesa-ayurvedic-hair-oil"
                className="w-44 shrink-0 bg-[#0d8a57] text-white rounded-xl p-2 flex flex-col justify-between h-28 cursor-pointer hover:opacity-95 shadow-xs"
              >
                <p className="text-[11px] font-bold truncate">Deals on festive picks</p>
                <div className="w-full h-16 rounded overflow-hidden mt-1">
                  <img
                    src="https://images.unsplash.com/photo-1514517521153-1be72277b32f?auto=format&fit=crop&w=250&q=80"
                    alt="Festive diyas"
                    className="w-full h-full object-cover rounded hover:scale-105 transition-transform"
                  />
                </div>
              </Link>

              {/* Tile 6: Buy it again (Sesa Hair Oil) */}
              <Link
                href="/products/sesa-ayurvedic-hair-oil"
                className="w-44 shrink-0 bg-[#f9fafb] border border-gray-200 rounded-xl p-2 cursor-pointer hover:shadow-md transition block"
              >
                <p className="text-[11px] font-bold text-gray-900 truncate">Buy it again</p>
                <div className="h-14 flex items-center justify-center my-0.5">
                  <img
                    src="https://images.unsplash.com/photo-1608248597359-5f2122606822?auto=format&fit=crop&w=250&q=80"
                    alt="Sesa Hair Oil"
                    className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
                  />
                </div>
                <span className="bg-[#cc0c39] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-xs">
                  18% off
                </span>
              </Link>
            </div>

            {/* Right Nav Button */}
            <button
              onClick={() => scrollBottomCards("right")}
              aria-label="Scroll right mini"
              className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-7 h-14 bg-white/95 hover:bg-white border border-gray-300 shadow flex items-center justify-center rounded-l cursor-pointer text-[#111]"
            >
              <RightIcon className="w-5 h-5 text-gray-800" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

