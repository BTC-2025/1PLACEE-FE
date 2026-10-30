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
    <footer className="w-full text-gray-800 select-none mt-10 font-sans">
      {/* Back to top button with Soft Blue theme */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#1559ac] hover:bg-[#0d4285] text-white py-3 text-center font-bold text-xs transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        aria-label="Back to top"
      >
        <ChevronUp className="w-4 h-4 stroke-[2.5]" />
        <span>Back to top</span>
      </button>

      {/* Main Footer Container with #e9f4ff background */}
      <div className="bg-[#e9f4ff] py-12 px-4 sm:px-8 lg:px-14 border-t border-[#cde2f8]">
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
                    className="h-12 sm:h-14 w-auto object-contain drop-shadow-xs"
                  />
                </Link>
              </div>
              <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed max-w-sm">
                India & Beyond! Established with a mission to bring everything under one place.
                1PLACE has proudly established itself as a premier and rapidly growing online shopping platform across India.
              </p>
            </div>

            {/* Newsletter Subscription Bar */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-800 block">
                Connect with us & stay updated
              </label>
              <form onSubmit={handleSubscribe} className="relative flex items-center max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  required
                  className="w-full bg-white text-gray-800 placeholder-gray-400 text-xs px-4 py-2.5 rounded-l-md outline-none border border-[#b8dcfa] focus:border-[#1559ac] transition shadow-2xs"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="bg-[#1559ac] hover:bg-[#0d4285] text-white px-4 py-2.5 rounded-r-md flex items-center justify-center font-bold transition duration-200 cursor-pointer shrink-0 shadow-sm"
                >
                  <Send className="w-4 h-4 fill-white" />
                </button>
              </form>
              {subscribed && (
                <p className="text-emerald-600 text-xs font-medium animate-in fade-in">
                  ✓ Thank you for subscribing to 1PLACE!
                </p>
              )}
            </div>

            {/* Social Media Links */}
            <div className="space-y-2 pt-1">
              <p className="text-xs font-semibold text-gray-800">Keep in Touch</p>
              <div className="flex items-center gap-2">
                {/* Facebook */}
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-white hover:bg-[#1559ac] text-[#1559ac] hover:text-white border border-[#b8dcfa] flex items-center justify-center transition duration-200 shadow-2xs text-xs font-bold"
                >
                  f
                </a>
                {/* Twitter / X */}
                <a
                  href="#"
                  aria-label="Twitter X"
                  className="w-8 h-8 rounded-full bg-white hover:bg-[#1559ac] text-[#1559ac] hover:text-white border border-[#b8dcfa] flex items-center justify-center transition duration-200 shadow-2xs text-xs font-bold"
                >
                  𝕏
                </a>
                {/* LinkedIn */}
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full bg-white hover:bg-[#1559ac] text-[#1559ac] hover:text-white border border-[#b8dcfa] flex items-center justify-center transition duration-200 shadow-2xs text-xs font-bold"
                >
                  in
                </a>
                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-white hover:bg-[#1559ac] text-[#1559ac] hover:text-white border border-[#b8dcfa] flex items-center justify-center transition duration-200 shadow-2xs text-xs font-bold"
                >
                  📷
                </a>
                {/* YouTube */}
                <a
                  href="#"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-white hover:bg-[#1559ac] text-[#1559ac] hover:text-white border border-[#b8dcfa] flex items-center justify-center transition duration-200 shadow-2xs text-xs font-bold"
                >
                  ▶
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Online Shopping (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-bold text-sm text-[#1559ac] tracking-wide border-b border-[#cde2f8] pb-2">
              Online Shopping
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><Link href="/categories" className="hover:text-[#1559ac] transition">Beauty Week</Link></li>
              <li><Link href="/categories" className="hover:text-[#1559ac] transition">Pre Owned Mobiles</Link></li>
              <li><Link href="/categories" className="hover:text-[#1559ac] transition">Clearance Sale</Link></li>
              <li><Link href="/categories" className="hover:text-[#1559ac] transition">Super Fest</Link></li>
              <li><Link href="/categories" className="hover:text-[#1559ac] transition">Techverse</Link></li>
              <li><Link href="/categories" className="hover:text-[#1559ac] transition">Fragrance Fiesta</Link></li>
              <li><Link href="/categories" className="hover:text-[#1559ac] transition">Mobiles & Tablets</Link></li>
              <li><Link href="/categories" className="hover:text-[#1559ac] transition">Pre Owned Laptops</Link></li>
              <li><Link href="/categories" className="hover:text-[#1559ac] transition">Gaming & Accessories</Link></li>
              <li><Link href="/categories" className="hover:text-[#1559ac] transition">Laptops & Computers</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Policies (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-bold text-sm text-[#1559ac] tracking-wide border-b border-[#cde2f8] pb-2">
              Customer Policies
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><Link href="#" className="hover:text-[#1559ac] transition">About 1PLACE</Link></li>
              <li><Link href="#" className="hover:text-[#1559ac] transition">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-[#1559ac] transition">Terms and Conditions</Link></li>
              <li><Link href="#" className="hover:text-[#1559ac] transition">FAQs</Link></li>
              <li><Link href="#" className="hover:text-[#1559ac] transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-[#1559ac] transition">Return and Replacement Policy</Link></li>
              <li><Link href="#" className="hover:text-[#1559ac] transition">100% Purchase Protection</Link></li>
              <li><Link href="#" className="hover:text-[#1559ac] transition">Shipping & Delivery</Link></li>
            </ul>

            <div className="pt-4">
              <h3 className="font-bold text-sm text-[#1559ac] tracking-wide border-b border-[#cde2f8] pb-2 mb-2">
                Useful Links
              </h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li><Link href="#" className="hover:text-[#1559ac] transition">Sell With Us</Link></li>
                <li><Link href="#" className="hover:text-[#1559ac] transition">Blogs & News</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 4: Customer Support & App Downloads (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-bold text-sm text-[#1559ac] tracking-wide border-b border-[#cde2f8] pb-2">
              Customer Support
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We prioritize resolving all customer complaints and issues promptly.
              Our support team is available <strong className="text-gray-800">Monday – Saturday, 9am – 6pm</strong>.
            </p>

            <div className="space-y-2.5 pt-1 text-xs">
              <p className="font-semibold text-gray-800">We&apos;re always here to help you</p>
              <p className="text-gray-500 text-[11px]">Reach out to us through any of these support channels</p>

              {/* Contact rows */}
              <div className="space-y-2 pt-1 text-gray-700">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 hover:text-[#1559ac] transition"
                >
                  <Phone className="w-4 h-4 text-[#1559ac] shrink-0" />
                  <span><strong>Call Support:</strong> +91 98765 43210</span>
                </a>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#1559ac] transition"
                >
                  <MessageSquare className="w-4 h-4 text-[#1559ac] shrink-0" />
                  <span><strong>WhatsApp Support:</strong> +91 98765 43210</span>
                </a>

                <a
                  href="mailto:support@1place.in"
                  className="flex items-center gap-2 hover:text-[#1559ac] transition"
                >
                  <Mail className="w-4 h-4 text-[#1559ac] shrink-0" />
                  <span><strong>Customer Service Email:</strong> support@1place.in</span>
                </a>

                <a
                  href="mailto:b2b@1place.in"
                  className="flex items-center gap-2 hover:text-[#1559ac] transition"
                >
                  <Briefcase className="w-4 h-4 text-[#1559ac] shrink-0" />
                  <span><strong>B2B Sales Inquiry:</strong> b2b@1place.in</span>
                </a>
              </div>
            </div>

            {/* App Store / Google Play Badges */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-gray-800 mb-2">Get App</p>
              <div className="flex flex-wrap items-center gap-2.5">
                {/* App Store button */}
                <div className="bg-black hover:bg-black/80 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer border border-gray-800 transition shadow-sm">
                  <span className="text-xl"></span>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-[9px] uppercase tracking-wider text-gray-300">Download on the</span>
                    <span className="text-xs font-bold">App Store</span>
                  </div>
                </div>

                {/* Google Play button */}
                <div className="bg-black hover:bg-black/80 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer border border-gray-800 transition shadow-sm">
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
      <div className="bg-[#d7ebfc] py-4 px-4 sm:px-8 lg:px-14 border-t border-[#cde2f8]">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-700">
          <p>© Copyright 2026 1PLACE.in. All rights reserved.</p>

          {/* Payment Method Badges */}
          <div className="flex items-center gap-2">
            <span className="bg-white text-[#1a1f71] font-bold text-[10px] px-2 py-0.5 rounded shadow-xs border border-gray-200">
              VISA
            </span>
            <span className="bg-white text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded shadow-xs border border-gray-200">
              UPI
            </span>
            <span className="bg-white text-blue-600 font-bold text-[10px] px-2 py-0.5 rounded shadow-xs border border-gray-200">
              RuPay
            </span>
            <span className="bg-white text-orange-600 font-bold text-[10px] px-2 py-0.5 rounded shadow-xs border border-gray-200">
              Mastercard
            </span>
            <span className="bg-white text-emerald-600 font-bold text-[10px] px-1.5 py-0.5 rounded shadow-xs border border-gray-200">
              NetBanking
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
