"use client";

import React, { useState } from "react";
import {
  Calendar,
  Calculator,
  Users,
  ClipboardPenLine,
  Keyboard,
  Cloud,
  Plus,
  Pen,
  SlidersHorizontal,
  X,
  CheckSquare,
} from "lucide-react";
import { useQuickSidebarStore } from "@/stores/quickSidebarStore";

export const QuickSideRail: React.FC = () => {
  const { isSidebarOpen, closeSidebar, activePanel, togglePanel } = useQuickSidebarStore();

  return (
    <aside
      aria-label="Quick Tools Sidebar"
      className={`fixed right-0 top-[60px] bottom-0 w-[60px] sm:w-[62px] bg-white border-l border-[#d0e5fb] shadow-[-4px_0_15px_rgba(0,0,0,0.08)] z-50 flex flex-col items-center select-none transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
    >
      {/* Top section aligned with Subnav row (height 44px) - B logo with centered horizontal separator line below */}
      <div className="h-[44px] w-full flex flex-col items-center justify-between pt-1.5 bg-white shrink-0">
        <div className="w-10 h-10 rounded-xl border border-[#cbe1f7] bg-[#f8fbff] flex items-center justify-center p-1.5 shadow-2xs hover:scale-105 transition-transform cursor-pointer">
          <img
            src="/side-b-logo.png"
            alt="Brand B Logo"
            className="w-full h-full object-contain"
          />
        </div>
        {/* Subtle reduced width horizontal line slightly down below B logo */}
        <div className="w-10 h-[1px] bg-gray-200/90 mb-[-9px]" />
      </div>

      {/* Main Apps / Quick Tools Vertical List */}
      <div className="flex-1 flex flex-col items-center gap-3 w-full overflow-y-auto no-scrollbar py-3">

        {/* 1. Calendar (Warm Orange on Pale Yellow) */}
        <button
          onClick={() => togglePanel("calendar")}
          title="Calendar & Schedules"
          aria-label="Calendar"
          className={`w-10 h-10 rounded-full mt-1 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs ${activePanel === "calendar"
            ? "bg-[#fff6e6] border-2 border-[#f59e0b]"
            : "bg-[#fff6e6] hover:bg-[#ffeed0] border-2 border-transparent"
            }`}
        >
          <Calendar className="w-5 h-5 text-[#f59e0b] stroke-[2.2]" />
        </button>

        {/* 2. Calculator / Accounts (Vibrant Emerald on Soft Green) */}
        <button
          onClick={() => togglePanel("calculator")}
          title="Calculator & Budget"
          aria-label="Calculator"
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs ${activePanel === "calculator"
            ? "bg-[#eafaf1] border-2 border-[#10b981]"
            : "bg-[#eafaf1] hover:bg-[#d8f5e5] border-2 border-transparent"
            }`}
        >
          <Calculator className="w-5 h-5 text-[#10b981] stroke-[2.2]" />
        </button>

        {/* 3. Team / Contacts (Royal Blue on Light Blue) */}
        <button
          onClick={() => togglePanel("users")}
          title="Contacts & Sellers"
          aria-label="Users"
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs ${activePanel === "users"
            ? "bg-[#edf5ff] border-2 border-[#2563eb]"
            : "bg-[#edf5ff] hover:bg-[#dbeafe] border-2 border-transparent"
            }`}
        >
          <Users className="w-5 h-5 text-[#2563eb] stroke-[2.2]" />
        </button>

        {/* 4. Notes / Tasks (Amber on Cream) */}
        <button
          onClick={() => togglePanel("notes")}
          title="Quick Notes & Reminders"
          aria-label="Notes"
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs ${activePanel === "notes"
            ? "bg-[#fffbe6] border-2 border-[#eab308]"
            : "bg-[#fffbe6] hover:bg-[#fef9c3] border-2 border-transparent"
            }`}
        >
          <ClipboardPenLine className="w-5 h-5 text-[#ca8a04] stroke-[2.2]" />
        </button>

        {/* 5. Shortcuts / Keyboard (Violet on Lavender) */}
        <button
          onClick={() => togglePanel("shortcuts")}
          title="Keyboard Shortcuts"
          aria-label="Shortcuts"
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs ${activePanel === "shortcuts"
            ? "bg-[#f1edff] border-2 border-[#6366f1]"
            : "bg-[#f1edff] hover:bg-[#e0e7ff] border-2 border-transparent"
            }`}
        >
          <Keyboard className="w-5 h-5 text-[#6366f1] stroke-[2.2]" />
        </button>

        {/* 6. Cloud / Sync (Cyan on Soft Aqua) */}
        <button
          onClick={() => togglePanel("cloud")}
          title="Cloud Backup & Storage"
          aria-label="Cloud Sync"
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs ${activePanel === "cloud"
            ? "bg-[#e8faff] border-2 border-[#06b6d4]"
            : "bg-[#e8faff] hover:bg-[#cffafe] border-2 border-transparent"
            }`}
        >
          <Cloud className="w-5 h-5 text-[#0891b2] stroke-[2.2]" />
        </button>

        {/* 7. Add More / Dashed Plus Button */}
        <button
          title="Add Custom Widget / App"
          aria-label="Add widget"
          className="w-10 h-10 rounded-full border-2 border-dashed border-[#b3c7db] hover:border-[#1559ac] text-[#78909c] hover:text-[#1559ac] flex items-center justify-center transition-all duration-200 cursor-pointer hover:bg-[#f0f7ff] hover:scale-105"
        >
          <Plus className="w-5 h-5 stroke-[2.2]" />
        </button>
      </div>

      {/* Bottom section divider */}
      <div className="w-8 h-[1px] bg-gray-200 my-2.5" />

      {/* Bottom utility icons */}
      <div className="flex flex-col items-center gap-2.5 pb-2">
        {/* Edit / Pencil button */}
        <button
          title="Customize Bar"
          aria-label="Customize"
          className="w-10 h-10 rounded-full border border-gray-200 hover:border-[#1559ac] text-gray-500 hover:text-[#1559ac] bg-white hover:bg-gray-50 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs hover:scale-105"
        >
          <Pen className="w-4 h-4 stroke-[2]" />
        </button>

        {/* Filter / Sliders settings button */}
        <button
          title="Filter Preferences"
          aria-label="Filter Preferences"
          className="w-10 h-10 rounded-full border border-gray-200 hover:border-[#1559ac] text-gray-500 hover:text-[#1559ac] bg-white hover:bg-gray-50 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs hover:scale-105"
        >
          <SlidersHorizontal className="w-4 h-4 stroke-[2]" />
        </button>

        {/* Close Button */}
        <button
          onClick={closeSidebar}
          title="Close Sidebar"
          aria-label="Close Sidebar"
          className="w-8 h-8 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer mt-1"
        >
          <X className="w-4 h-4 stroke-[2]" />
        </button>
      </div>
    </aside>
  );
};

