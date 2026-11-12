"use client";

import React, { useState } from "react";
import { X, Check, Star } from "lucide-react";
import { useQuickSidebarStore } from "@/stores/quickSidebarStore";

export const BetaPanel: React.FC = () => {
  const { activePanel, closePanel } = useQuickSidebarStore();
  const [activeTab, setActiveTab] = useState<"favorites" | "recent">("favorites");
  const [activeBaseTab, setActiveBaseTab] = useState<"base" | "public" | "business">("base");
  const [isEditing, setIsEditing] = useState(false);

  // User-customizable favorites apps list (matches user's screenshot)
  const [favoriteAppIds, setFavoriteAppIds] = useState<string[]>([
    "cliks",
    "b2auth",
    "cliksbusiness",
    "bit-tool",
  ]);

  // Track recent opened items (defaulting to 3 items)
  const [recentApps, setRecentApps] = useState<string[]>(["cliks", "bnxmail", "bit-tool"]);

  // All available apps definitions
  const APPS = {
    cliks: {
      id: "cliks",
      name: "Cliks",
      shortName: "Cliks",
      icon: "/beta-icons/icon-cliks.png",
      type: "public" as const,
    },
    bnxmail: {
      id: "bnxmail",
      name: "BNXmail",
      shortName: "BNXmail",
      icon: "/beta-icons/icon-bnxmail.png",
      type: "public" as const,
    },
    "bit-tool": {
      id: "bit-tool",
      name: "Bit-Tool",
      shortName: "Bit-Tool",
      icon: "/beta-icons/icon-bit-tool.png",
      type: "public" as const,
    },
    b2auth: {
      id: "b2auth",
      name: "B2Auth",
      shortName: "B2Auth",
      icon: "/beta-icons/icon-b2auth.png",
      type: "public" as const,
    },
    cliksbusiness: {
      id: "cliksbusiness",
      name: "CliksBusiness",
      shortName: "CliksBusin...",
      icon: "/beta-icons/icon-cliks-business.png",
      type: "business" as const,
    },
  };

  // Base Section Apps filtered by Active Tab:
  // - BASE (Default): all 5 icons
  // - PUBLIC: 4 icons (without CliksBusiness: Cliks, BNXmail, Bit-Tool, B2Auth)
  // - BUSINESS: 1 icon only (CliksBusiness)
  const baseAppsToDisplay = Object.values(APPS).filter((app) => {
    if (activeBaseTab === "public") return app.type === "public";
    if (activeBaseTab === "business") return app.type === "business";
    return true; // "base" shows all 5
  });

  const handleOpenApp = (appId: string) => {
    if (isEditing) return; // Do not trigger launch in edit mode
    setRecentApps((prev) => {
      const filtered = prev.filter((id) => id !== appId);
      return [appId, ...filtered].slice(0, 3); // Keep latest 3
    });
  };

  // Remove app from favorites (red X badge)
  const handleRemoveFavorite = (appId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteAppIds((prev) => prev.filter((id) => id !== appId));
  };

  // Toggle favorite in Base Section (Star button)
  const handleToggleFavorite = (appId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteAppIds((prev) =>
      prev.includes(appId) ? prev.filter((id) => id !== appId) : [...prev, appId]
    );
  };

  if (activePanel !== "beta") return null;

  return (
    <aside
      aria-label="Beta Applications Panel"
      className="fixed right-[60px] sm:right-[62px] top-[60px] bottom-0 w-[350px] sm:w-[360px] bg-white border-l border-[#d0e5fb] shadow-[-6px_0_20px_rgba(0,0,0,0.06)] z-[60] flex flex-col select-none overflow-y-auto no-scrollbar animate-in slide-in-from-right duration-200"
    >
      {/* Top Header Row: BETA Logo (blue) + EDIT / DONE Button + Close Button */}
      <div className="h-[44px] px-5 flex items-center justify-between border-b border-[#e6edf6] bg-white shrink-0 relative z-20">
        <div className="flex items-center">
          <img
            src="/beta-icons/beta-logo.png"
            alt="BETA"
            className="h-7 w-auto object-contain"
          />
        </div>

        <div className="flex items-center gap-2 relative z-30">
          {/* EDIT / DONE Pill Button matching exact screenshot */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsEditing((prev) => !prev);
            }}
            title={isEditing ? "Done Editing" : "Edit Favorites"}
            className={`px-3.5 py-1 rounded-full border text-xs font-bold tracking-wider transition cursor-pointer flex items-center gap-1.5 relative z-40 select-none ${isEditing
              ? "border-emerald-500 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              : "border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400 bg-white"
              }`}
          >
            {isEditing ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5] text-emerald-600" />
                <span>Done</span>
              </>
            ) : (
              <span>EDIT</span>
            )}
          </button>

          {/* Close button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              closePanel();
            }}
            title="Close Panel"
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-[#f1f5f9] text-[#64748b] hover:text-[#0f172a] hover:bg-[#e2e8f0] flex items-center justify-center transition cursor-pointer relative z-40 select-none"
          >
            <X className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col gap-5">
        {/* Card 1: FAVORITES / RECENT TABS BOX */}
        <div className="bg-white border border-[#dce7f5] rounded-3xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(37,99,235,0.03)]">
          {/* Tabs row: FAVORITES | RECENT */}
          <div className="flex items-center justify-around border-b border-gray-100 pb-3 mb-5 text-xs sm:text-[13px] font-bold text-gray-400">
            <button
              type="button"
              onClick={() => setActiveTab("favorites")}
              className={`relative pb-2 font-extrabold uppercase tracking-wider transition cursor-pointer ${activeTab === "favorites"
                ? "text-[#1d4ed8]"
                : "text-gray-400 hover:text-gray-600"
                }`}
            >
              FAVORITES
              {activeTab === "favorites" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1d4ed8] rounded-full" />
              )}
            </button>

            <span className="text-gray-300 text-xs font-light">|</span>

            <button
              type="button"
              onClick={() => setActiveTab("recent")}
              className={`relative pb-2 font-extrabold uppercase tracking-wider transition cursor-pointer ${activeTab === "recent"
                ? "text-[#1d4ed8]"
                : "text-gray-400 hover:text-gray-600"
                }`}
            >
              RECENT
              {activeTab === "recent" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1d4ed8] rounded-full" />
              )}
            </button>
          </div>

          {/* Favorites Apps Grid or Edit Cards Grid matching user screenshot */}
          <div className="grid grid-cols-4 gap-2.5 text-center min-h-[110px] items-start">
            {activeTab === "favorites" ? (
              /* FAVORITES: Cliks, B2Auth, CliksBusiness, Bit-Tool etc. */
              favoriteAppIds.map((appId) => {
                const app = APPS[appId as keyof typeof APPS];
                if (!app) return null;
                return (
                  <div
                    key={app.id}
                    onClick={() => handleOpenApp(app.id)}
                    className="flex flex-col items-center group relative cursor-pointer"
                  >
                    {/* Rounded Card Frame matching Screenshot */}
                    <div
                      className={`relative w-full aspect-square max-w-[70px] rounded-2xl flex items-center justify-center p-2 transition-all ${isEditing
                        ? "bg-white border border-gray-200 shadow-2xs hover:border-red-300"
                        : "hover:scale-105"
                        }`}
                    >
                      {/* Red 'X' badge on top right in edit mode to delete/remove favorite */}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={(e) => handleRemoveFavorite(app.id, e)}
                          title="Remove from favorites"
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#ef4444] text-white flex items-center justify-center shadow-xs hover:bg-[#dc2626] transition z-10 cursor-pointer"
                        >
                          <X className="w-3 h-3 stroke-[3]" />
                        </button>
                      )}

                      <img
                        src={app.icon}
                        alt={app.name}
                        className="w-10 h-10 object-contain drop-shadow-xs"
                      />
                    </div>

                    <span className="text-[11px] font-bold text-[#1e293b] mt-1.5 truncate w-full">
                      {app.name}
                    </span>
                  </div>
                );
              })
            ) : (
              /* RECENT: 3 recent items based on what user opens */
              recentApps.map((appId) => {
                const app = APPS[appId as keyof typeof APPS];
                if (!app) return null;
                return (
                  <div
                    key={app.id}
                    onClick={() => handleOpenApp(app.id)}
                    className="flex flex-col items-center group cursor-pointer animate-in fade-in duration-200"
                  >
                    <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-110 mb-1">
                      <img
                        src={app.icon}
                        alt={app.name}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-[#1e293b]">
                      {app.name}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Section 2: BASE Header with PUBLIC | BUSINESS Sub-filters */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            {/* BASE Title with active underline (clicking BASE resets to show all 5) */}
            <button
              type="button"
              onClick={() => setActiveBaseTab("base")}
              className="relative pb-1 text-left cursor-pointer group"
            >
              <h3
                className={`text-base font-black tracking-wider uppercase transition ${activeBaseTab === "base"
                  ? "text-[#0f172a]"
                  : "text-gray-500 hover:text-[#0f172a]"
                  }`}
              >
                BASE
              </h3>
              {activeBaseTab === "base" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1d4ed8] rounded-full" />
              )}
            </button>

            {/* PUBLIC | BUSINESS links */}
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
              <button
                type="button"
                onClick={() => setActiveBaseTab("public")}
                className={`transition cursor-pointer uppercase font-extrabold ${activeBaseTab === "public"
                  ? "text-[#1d4ed8] underline underline-offset-4"
                  : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                PUBLIC
              </button>
              <span className="text-gray-300 font-light">|</span>
              <button
                type="button"
                onClick={() => setActiveBaseTab("business")}
                className={`transition cursor-pointer uppercase font-extrabold ${activeBaseTab === "business"
                  ? "text-[#1d4ed8] underline underline-offset-4"
                  : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                BUSINESS
              </button>
            </div>
          </div>

          {/* BASE Grid of Rounded White Card Apps */}
          <div className="grid grid-cols-4 gap-2.5 min-h-[70px]">
            {baseAppsToDisplay.map((app) => {
              const isFavorited = favoriteAppIds.includes(app.id);
              return (
                <div
                  key={app.id}
                  onClick={() => handleOpenApp(app.id)}
                  className="relative bg-white border border-[#dce7f5] hover:border-[#1d4ed8] rounded-2xl p-2 flex flex-col items-center text-center transition group cursor-pointer shadow-2xs hover:shadow-xs animate-in fade-in duration-150"
                >
                  {/* Star Badge on top-right in Edit mode matching screenshot */}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={(e) => handleToggleFavorite(app.id, e)}
                      title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border border-gray-200 shadow-xs flex items-center justify-center transition hover:scale-110 z-10 cursor-pointer"
                    >
                      <Star
                        className={`w-3 h-3 ${isFavorited
                          ? "fill-[#f59e0b] text-[#f59e0b]"
                          : "text-gray-400 fill-transparent"
                          }`}
                      />
                    </button>
                  )}

                  <div className="w-10 h-10 flex items-center justify-center mb-1 group-hover:scale-105 transition">
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-[#1e293b] truncate w-full">
                    {app.shortName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: BETA LABS RELEASE / COMING SOON CARD */}
        <div className="relative mt-2">
          {/* Blue 'B' Logo Floating in Top Center Circle */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border border-[#dce7f5] shadow-xs flex items-center justify-center z-10 p-1.5">
            <img
              src="/beta-icons/beta-labs-b-logo.png"
              alt="Beta Labs B Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="border border-[#dce7f5] rounded-3xl p-5 pt-7 text-center bg-white shadow-2xs">
            {/* Beta Labs Badge */}
            <div className="inline-block px-3 py-0.5 rounded-full bg-[#ede9fe] text-[#7c3aed] text-[10px] font-extrabold uppercase tracking-wider mb-2">
              BETA LABS RELEASE
            </div>

            {/* COMING SOON Heading */}
            <h4 className="text-sm font-black text-[#8b5cf6] tracking-wider uppercase mb-1">
              COMING SOON
            </h4>

            {/* Subtext */}
            <p className="text-[11px] font-medium text-gray-500">
              Building the next generation of Beta applications.
            </p>
          </div>
        </div>

        {/* Section 4: Bottom Footer Text */}
        <div className="pt-3 pb-2 text-center border-t border-gray-100 mt-auto">
          <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            BETA ECOSYSTEM • FUTURE READY
          </span>
        </div>
      </div>
    </aside>
  );
};
