"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Send,
  Phone,
  MessageSquare,
  Mail,
  Briefcase,
  ChevronUp,
} from "lucide-react";

export const AmazonFooter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full text-white select-none mt-10 font-sans">
      {/* Back to top button with Royal Blue theme */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#124b91] hover:bg-[#0f3f7a] text-white py-3 text-center font-bold text-xs transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-inner"
        aria-label="Back to top"
      >
        <ChevronUp className="w-4 h-4 stroke-[2.5]" />
        <span>Back to top</span>
      </button>

      {/* Main Footer Container with Royal Blue (#1559ac) matching Navbar & Image 3 */}
      <div className="bg-[#1559ac] py-12 px-4 sm:px-8 lg:px-14 border-t border-[#124b91]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Brand Info, About & Newsletter (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              {/* 1PLACE Logo & Intro */}
              <div className="flex items-center gap-2">
                <Link href="/" className="inline-block">
                  <img
                    src="/logo.png?v=2"
                    alt="1PLACE"
                    className="h-10 sm:h-11 w-auto object-contain drop-shadow"
                  />
                </Link>
              </div>
              <p className="text-white/85 text-xs sm:text-[13px] leading-relaxed max-w-sm">
                India & Beyond! Established with a mission to bring everything under one place. 
                1PLACE has proudly established itself as a premier and rapidly growing online shopping platform across India.
              </p>
            </div>

            {/* Newsletter Subscription Bar */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/95 block">
                Connect with us & stay updated
              </label>
              <form onSubmit={handleSubscribe} className="relative flex items-center max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  required
                  className="w-full bg-white text-gray-800 placeholder-gray-400 text-xs px-4 py-2.5 rounded-l-md outline-none border border-transparent focus:border-amber-400 transition"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="bg-[#febb10] hover:bg-[#f5b300] text-gray-900 px-4 py-2.5 rounded-r-md flex items-center justify-center font-bold transition duration-200 cursor-pointer shrink-0 shadow-sm"
                >
                  <Send className="w-4 h-4 fill-gray-900" />
                </button>
              </form>
              {subscribed && (
                <p className="text-emerald-300 text-xs font-medium animate-in fade-in">
                  ✓ Thank you for subscribing to 1PLACE!
                </p>
              )}
            </div>

            {/* Social Media Links */}
            <div className="space-y-2 pt-1">
              <p className="text-xs font-semibold text-white/90">Keep in Touch</p>
              <div className="flex items-center gap-2">
                {/* Facebook */}
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#1559ac] flex items-center justify-center transition duration-200 shadow-xs text-xs font-bold"
                >
                  f
                </a>
                {/* Twitter / X */}
                <a
                  href="#"
                  aria-label="Twitter X"
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#1559ac] flex items-center justify-center transition duration-200 shadow-xs text-xs font-bold"
                >
                  𝕏
                </a>
                {/* LinkedIn */}
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#1559ac] flex items-center justify-center transition duration-200 shadow-xs text-xs font-bold"
                >
                  in
                </a>
                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#1559ac] flex items-center justify-center transition duration-200 shadow-xs text-xs font-bold"
                >
                  📷
                </a>
                {/* YouTube */}
                <a
                  href="#"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#1559ac] flex items-center justify-center transition duration-200 shadow-xs text-xs font-bold"
                >
                  ▶
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Online Shopping (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-bold text-sm text-white tracking-wide border-b border-white/15 pb-2">
              Online Shopping
            </h3>
            <ul className="space-y-2 text-xs text-white/80">
              <li><Link href="/categories" className="hover:text-white transition">Beauty Week</Link></li>
              <li><Link href="/categories" className="hover:text-white transition">Pre Owned Mobiles</Link></li>
              <li><Link href="/categories" className="hover:text-white transition">Clearance Sale</Link></li>
              <li><Link href="/categories" className="hover:text-white transition">Super Fest</Link></li>
              <li><Link href="/categories" className="hover:text-white transition">Techverse</Link></li>
              <li><Link href="/categories" className="hover:text-white transition">Fragrance Fiesta</Link></li>
              <li><Link href="/categories" className="hover:text-white transition">Mobiles & Tablets</Link></li>
              <li><Link href="/categories" className="hover:text-white transition">Pre Owned Laptops</Link></li>
              <li><Link href="/categories" className="hover:text-white transition">Gaming & Accessories</Link></li>
              <li><Link href="/categories" className="hover:text-white transition">Laptops & Computers</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Policies (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-bold text-sm text-white tracking-wide border-b border-white/15 pb-2">
              Customer Policies
            </h3>
            <ul className="space-y-2 text-xs text-white/80">
              <li><Link href="#" className="hover:text-white transition">About 1PLACE</Link></li>
              <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white transition">Terms and Conditions</Link></li>
              <li><Link href="#" className="hover:text-white transition">FAQs</Link></li>
              <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Return and Replacement Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">100% Purchase Protection</Link></li>
              <li><Link href="#" className="hover:text-white transition">Shipping & Delivery</Link></li>
            </ul>

            <div className="pt-4">
              <h3 className="font-bold text-sm text-white tracking-wide border-b border-white/15 pb-2 mb-2">
                Useful Links
              </h3>
              <ul className="space-y-2 text-xs text-white/80">
                <li><Link href="#" className="hover:text-white transition">Sell With Us</Link></li>
                <li><Link href="#" className="hover:text-white transition">Blogs & News</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 4: Customer Support & App Downloads (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-bold text-sm text-white tracking-wide border-b border-white/15 pb-2">
              Customer Support
            </h3>
            <p className="text-xs text-white/85 leading-relaxed">
              We prioritize resolving all customer complaints and issues promptly.
              Our support team is available <strong className="text-white">Monday – Saturday, 9am – 6pm</strong>.
            </p>

            <div className="space-y-2.5 pt-1 text-xs">
              <p className="font-semibold text-white/95">We&apos;re always here to help you</p>
              <p className="text-white/75 text-[11px]">Reach out to us through any of these support channels</p>

              {/* Contact rows */}
              <div className="space-y-2 pt-1 text-white/90">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <Phone className="w-4 h-4 text-[#febb10] shrink-0" />
                  <span><strong>Call Support:</strong> +91 98765 43210</span>
                </a>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <MessageSquare className="w-4 h-4 text-[#febb10] shrink-0" />
                  <span><strong>WhatsApp Support:</strong> +91 98765 43210</span>
                </a>

                <a
                  href="mailto:support@1place.in"
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <Mail className="w-4 h-4 text-[#febb10] shrink-0" />
                  <span><strong>Customer Service Email:</strong> support@1place.in</span>
                </a>

                <a
                  href="mailto:b2b@1place.in"
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <Briefcase className="w-4 h-4 text-[#febb10] shrink-0" />
                  <span><strong>B2B Sales Inquiry:</strong> b2b@1place.in</span>
                </a>
              </div>
            </div>

            {/* App Store / Google Play Badges */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-white/95 mb-2">Get App</p>
              <div className="flex flex-wrap items-center gap-2.5">
                {/* App Store button */}
                <div className="bg-black hover:bg-black/80 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer border border-white/20 transition shadow-sm">
                  <span className="text-xl"></span>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-[9px] uppercase tracking-wider text-gray-300">Download on the</span>
                    <span className="text-xs font-bold">App Store</span>
                  </div>
                </div>

                {/* Google Play button */}
                <div className="bg-black hover:bg-black/80 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer border border-white/20 transition shadow-sm">
                  <span className="text-base text-emerald-400">▶</span>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-[9px] uppercase tracking-wider text-gray-300">GET IT ON</span>
                    <span className="text-xs font-bold">Google Play</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Sub-Footer: Copyright and Payment Cards */}
      <div className="bg-[#0f3f7a] py-4 px-4 sm:px-8 lg:px-14 border-t border-[#124b91]/60">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/80">
          <p>© Copyright 2026 1PLACE.in. All rights reserved.</p>

          {/* Payment Method Badges */}
          <div className="flex items-center gap-2">
            <span className="bg-white text-[#1a1f71] font-bold text-[10px] px-2 py-0.5 rounded shadow-xs">
              VISA
            </span>
            <span className="bg-white text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded shadow-xs">
              UPI
            </span>
            <span className="bg-white text-blue-600 font-bold text-[10px] px-2 py-0.5 rounded shadow-xs">
              RuPay
            </span>
            <span className="bg-white text-orange-600 font-bold text-[10px] px-2 py-0.5 rounded shadow-xs">
              Mastercard
            </span>
            <span className="bg-white text-emerald-600 font-bold text-[10px] px-1.5 py-0.5 rounded shadow-xs">
              NetBanking
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
