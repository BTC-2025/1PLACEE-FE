"use client";

import React from "react";
import Link from "next/link";
import { Globe } from "lucide-react";

export const AmazonFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full text-white text-xs select-none mt-8">
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#37475A] hover:bg-[#485769] text-white py-3.5 text-center font-bold text-xs transition block cursor-pointer"
      >
        Back to top
      </button>

      {/* Main Link Columns */}
      <div className="bg-[#232F3E] py-10 px-4 sm:px-12 border-b border-[#3a4553]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold text-sm text-white mb-3">Get to Know Us</h3>
            <ul className="space-y-2 text-[#DDD]">
              <li><Link href="#" className="hover:underline">About 1PLACE</Link></li>
              <li><Link href="#" className="hover:underline">Careers</Link></li>
              <li><Link href="#" className="hover:underline">Press Releases</Link></li>
              <li><Link href="#" className="hover:underline">1PLACE Science</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-bold text-sm text-white mb-3">Connect with Us</h3>
            <ul className="space-y-2 text-[#DDD]">
              <li><Link href="#" className="hover:underline">Facebook</Link></li>
              <li><Link href="#" className="hover:underline">Twitter / X</Link></li>
              <li><Link href="#" className="hover:underline">Instagram</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold text-sm text-white mb-3">Make Money with Us</h3>
            <ul className="space-y-2 text-[#DDD]">
              <li><Link href="#" className="hover:underline">Sell on 1PLACE</Link></li>
              <li><Link href="#" className="hover:underline">Sell under 1PLACE Accelerator</Link></li>
              <li><Link href="#" className="hover:underline">Protect and Build Your Brand</Link></li>
              <li><Link href="#" className="hover:underline">1PLACE Global Selling</Link></li>
              <li><Link href="#" className="hover:underline">Become an Affiliate</Link></li>
              <li><Link href="#" className="hover:underline">Fulfilment by 1PLACE</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-bold text-sm text-white mb-3">Let Us Help You</h3>
            <ul className="space-y-2 text-[#DDD]">
              <li><Link href="#" className="hover:underline">COVID-19 and 1PLACE</Link></li>
              <li><Link href="#" className="hover:underline">Your Account</Link></li>
              <li><Link href="#" className="hover:underline">Returns Centre</Link></li>
              <li><Link href="#" className="hover:underline">100% Purchase Protection</Link></li>
              <li><Link href="#" className="hover:underline">1PLACE App Download</Link></li>
              <li><Link href="#" className="hover:underline">Help</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Brand & Language Selector Bar */}
      <div className="bg-[#232F3E] py-6 px-4 border-b border-[#3a4553] flex flex-wrap items-center justify-center gap-6">
        <div className="flex items-baseline">
          <span className="text-white font-black text-xl tracking-tighter">1PLACE</span>
          <span className="text-[#f08804] text-xs font-bold -ml-0.5">.in</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="border border-gray-500 rounded px-3 py-1 flex items-center gap-1.5 text-xs text-gray-300 hover:border-white">
            <Globe className="w-3.5 h-3.5" /> English
          </button>
          <button className="border border-gray-500 rounded px-3 py-1 text-xs text-gray-300 hover:border-white">
            🇮🇳 India
          </button>
        </div>
      </div>

      {/* Deep Footer: Services & Copyright */}
      <div className="bg-[#131A22] py-8 px-4 text-[11px] text-[#999]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
          <div>
            <h4 className="font-bold text-white mb-0.5">AbeBooks</h4>
            <p className="text-gray-400">Books, art & collectibles</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-0.5">1PLACE Web Services</h4>
            <p className="text-gray-400">Scalable Cloud Computing</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-0.5">Audible</h4>
            <p className="text-gray-400">Download Audio Books</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-0.5">Prime Now</h4>
            <p className="text-gray-400">2-Hour Delivery on Everyday Items</p>
          </div>
        </div>

        <div className="text-center space-y-1">
          <div className="flex flex-wrap justify-center gap-4 text-white">
            <Link href="#" className="hover:underline">Conditions of Use & Sale</Link>
            <Link href="#" className="hover:underline">Privacy Notice</Link>
            <Link href="#" className="hover:underline">Interest-Based Ads</Link>
          </div>
          <p className="text-gray-400">
            © 1996–2026, 1PLACE.in, Inc. or its affiliates. Designed with Enterprise Scale.
          </p>
        </div>
      </div>
    </footer>
  );
};
