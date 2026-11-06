"use client";

import React, { useState } from "react";
import {
  X,
  Palette,
  ArrowUp,
  ArrowDown,
  Star,
  Pin,
  PinOff,
  RotateCcw,
  Sparkles,
  Calendar,
  Calculator,
  Users,
  ClipboardPenLine,
  Keyboard,
  Cloud,
  Check,
} from "lucide-react";
import { useQuickSidebarStore } from "@/stores/quickSidebarStore";
import {
  useRailCustomizationStore,
  RailWidgetId,
} from "@/stores/railCustomizationStore";

interface WidgetMeta {
  id: RailWidgetId;
  label: string;
  category: string;
  icon: React.ReactNode;
  tagColor: string;
}

const WIDGETS_METADATA: Record<RailWidgetId, WidgetMeta> = {
  calendar: {
    id: "calendar",
    label: "Calendar & Schedule",
    category: "Productivity",
    icon: <Calendar className="w-5 h-5 text-[#f59e0b] stroke-[2.2]" />,
    tagColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  calculator: {
    id: "calculator",
    label: "Calculator & Budget",
    category: "Utility",
    icon: <Calculator className="w-5 h-5 text-[#10b981] stroke-[2.2]" />,
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  users: {
    id: "users",
    label: "Contacts & Sellers",
    category: "People",
    icon: <Users className="w-5 h-5 text-[#2563eb] stroke-[2.2]" />,
    tagColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  notes: {
    id: "notes",
    label: "Global Notes",
    category: "Workspace",
    icon: <ClipboardPenLine className="w-5 h-5 text-[#ca8a04] stroke-[2.2]" />,
    tagColor: "bg-yellow-50 text-yellow-800 border-yellow-200",
  },
  shortcuts: {
    id: "shortcuts",
    label: "Virtual Keyboard",
    category: "Accessibility",
    icon: <Keyboard className="w-5 h-5 text-[#6366f1] stroke-[2.2]" />,
    tagColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
  weather: {
    id: "weather",
    label: "Local Weather",
    category: "Information",
    icon: <Cloud className="w-5 h-5 text-[#00bcd4] stroke-[2.2]" />,
    tagColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
};

// Rail theme background color palette
const BG_THEMES = [
  { name: "Crisp White", value: "#ffffff", border: "border-gray-200" },
  { name: "Pure Snow", value: "#f8fafc", border: "border-slate-300" },
  { name: "Soft Sky", value: "#f0f7ff", border: "border-blue-200" },
  { name: "Mint Foam", value: "#f0fdf4", border: "border-emerald-200" },
  { name: "Warm Cream", value: "#fffbeb", border: "border-amber-200" },
  { name: "Pale Lavender", value: "#faf5ff", border: "border-purple-200" },
  { name: "Rose Silk", value: "#fff1f2", border: "border-rose-200" },
  { name: "Dark Slate", value: "#1e293b", border: "border-slate-700" },
  { name: "Midnight", value: "#0f172a", border: "border-slate-800" },
];

export const CustomizeBarPanel: React.FC = () => {
  const { activePanel, closePanel } = useQuickSidebarStore();
  const {
    backgroundColor,
    setBackgroundColor,
    widgetOrder,
    moveWidget,
    favoriteWidgets,
    toggleFavorite,
    pinnedWidgets,
    togglePinned,
    resetDefaults,
  } = useRailCustomizationStore();

  const [activeTab, setActiveTab] = useState<"order" | "colors" | "favorites">("order");

  if (activePanel !== "customize") return null;

  return (
    <aside
      aria-label="Customize Bar Panel"
      className="fixed right-[60px] sm:right-[62px] top-[60px] bottom-0 w-[350px] sm:w-[360px] bg-white border-l border-[#d0e5fb] shadow-[-6px_0_20px_rgba(0,0,0,0.06)] z-[60] flex flex-col select-none overflow-hidden animate-in slide-in-from-right duration-200"
    >
      {/* 1. Header Bar: Customize Bar title + Reset + Close */}
      <div className="h-[54px] px-5 flex items-center justify-between border-b border-gray-100 shrink-0 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1559ac] flex items-center justify-center font-bold">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-[16px] font-black text-[#111827] tracking-tight leading-none">
              Customize Bar
            </h2>
            <span className="text-[10.5px] text-gray-400 font-medium">
              Theme & Widget Preferences
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={resetDefaults}
            title="Reset to Defaults"
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={closePanel}
            title="Close Panel"
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* 2. Top Navigation Tabs */}
      <div className="flex items-center justify-around border-b border-gray-100 px-3 bg-gray-50/70 text-xs font-bold shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab("order")}
          className={`py-2.5 px-3 border-b-2 transition cursor-pointer ${activeTab === "order"
              ? "border-[#1559ac] text-[#1559ac]"
              : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
        >
          Position & Order
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("colors")}
          className={`py-2.5 px-3 border-b-2 transition cursor-pointer ${activeTab === "colors"
              ? "border-[#1559ac] text-[#1559ac]"
              : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
        >
          Rail Color
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("favorites")}
          className={`py-2.5 px-3 border-b-2 transition cursor-pointer ${activeTab === "favorites"
              ? "border-[#1559ac] text-[#1559ac]"
              : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
        >
          Favorites ⭐
        </button>
      </div>

      {/* 3. Tab Contents */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
        {/* TAB 1: Position & Order */}
        {activeTab === "order" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">
                Reorder Rail Icons (Top to Bottom)
              </span>
              <span className="text-[11px] text-gray-400">
                Use ▲ ▼ arrows
              </span>
            </div>

            <div className="space-y-2">
              {widgetOrder.map((id, index) => {
                const meta = WIDGETS_METADATA[id];
                const isFirst = index === 0;
                const isLast = index === widgetOrder.length - 1;
                const isFav = favoriteWidgets.includes(id);
                const isPinned = pinnedWidgets.includes(id);

                return (
                  <div
                    key={id}
                    className="flex items-center justify-between bg-white rounded-2xl p-2.5 sm:p-3 border border-gray-200/80 shadow-xs hover:border-[#93c5fd] transition"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Number position badge */}
                      <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-600 font-extrabold text-xs flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>

                      {/* Icon */}
                      <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                        {meta.icon}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-[13.5px] font-bold text-gray-900 truncate">
                            {meta.label}
                          </h4>
                          {isFav && (
                            <Star className="w-3 h-3 fill-amber-400 text-amber-500 shrink-0" />
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400">
                          {isPinned ? "Visible on Rail" : "Hidden (Unpinned)"}
                        </span>
                      </div>
                    </div>

                    {/* Move Up and Down Action Buttons */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        disabled={isFirst}
                        onClick={() => moveWidget(index, index - 1)}
                        title="Move Up"
                        className="w-7 h-7 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-gray-600 transition"
                      >
                        <ArrowUp className="w-3.5 h-3.5 stroke-[2.4]" />
                      </button>

                      <button
                        type="button"
                        disabled={isLast}
                        onClick={() => moveWidget(index, index + 1)}
                        title="Move Down"
                        className="w-7 h-7 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-gray-600 transition"
                      >
                        <ArrowDown className="w-3.5 h-3.5 stroke-[2.4]" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: QuickSideRail Background Colors */}
        {activeTab === "colors" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-[14px] font-black text-gray-900 tracking-tight">
                Rail Background Theme
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Choose a stylish color palette for your right-hand Quick Side Rail.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {BG_THEMES.map((theme) => {
                const isSelected = backgroundColor === theme.value;
                const isDark =
                  theme.value === "#1e293b" || theme.value === "#0f172a";

                return (
                  <button
                    key={theme.name}
                    type="button"
                    onClick={() => setBackgroundColor(theme.value)}
                    style={{ backgroundColor: theme.value }}
                    className={`h-20 rounded-2xl border-2 transition-all p-2 flex flex-col justify-between text-left cursor-pointer ${theme.border
                      } ${isSelected
                        ? "ring-2 ring-blue-500 scale-[1.03] shadow-md"
                        : "hover:scale-[1.02] shadow-2xs"
                      }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-[11px] font-extrabold ${isDark ? "text-white" : "text-gray-800"
                          }`}
                      >
                        {theme.name}
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                      <div className="w-3 h-3 rounded-full bg-blue-400" />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Custom Color Picker:
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer border border-gray-200 p-0.5"
                />
                <span className="text-xs font-mono font-bold text-gray-700 uppercase">
                  {backgroundColor}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Favorites & Pin Management */}
        {activeTab === "favorites" && (
          <div className="space-y-3">
            <div>
              <h3 className="text-[14px] font-black text-gray-900 tracking-tight">
                Favorites & Priority Widgets
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Mark your most used widgets with a star ⭐ to prioritize them.
              </p>
            </div>

            <div className="space-y-2">
              {widgetOrder.map((id) => {
                const meta = WIDGETS_METADATA[id];
                const isFav = favoriteWidgets.includes(id);
                const isPinned = pinnedWidgets.includes(id);

                return (
                  <div
                    key={id}
                    className="flex items-center justify-between bg-white rounded-2xl p-3 border border-gray-200/80 shadow-xs hover:border-gray-300 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                        {meta.icon}
                      </div>
                      <div>
                        <h4 className="text-[13.5px] font-bold text-gray-900 leading-tight">
                          {meta.label}
                        </h4>
                        <span className="text-[11px] text-gray-400">
                          {meta.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Star Favorite Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleFavorite(id)}
                        title={isFav ? "Remove Favorite" : "Mark as Favorite"}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer ${isFav
                            ? "bg-amber-50 text-amber-500 hover:bg-amber-100"
                            : "text-gray-300 hover:text-amber-500 hover:bg-gray-100"
                          }`}
                      >
                        <Star
                          className={`w-4 h-4 ${isFav ? "fill-current" : ""}`}
                        />
                      </button>

                      {/* Pin / Unpin Toggle */}
                      <button
                        type="button"
                        onClick={() => togglePinned(id)}
                        title={isPinned ? "Unpin from Rail" : "Pin to Rail"}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer ${isPinned
                            ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                          }`}
                      >
                        {isPinned ? (
                          <Pin className="w-4 h-4 fill-current" />
                        ) : (
                          <PinOff className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 4. Bottom Done / Save button */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50 shrink-0">
        <button
          type="button"
          onClick={closePanel}
          className="w-full h-11 bg-[#1559ac] hover:bg-[#11498e] text-white font-bold text-[14px] rounded-xl shadow-sm transition active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Done Customizing</span>
        </button>
      </div>
    </aside>
  );
};

