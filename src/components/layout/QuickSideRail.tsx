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
  Check,
  Pin,
  PinOff,
  Star,
} from "lucide-react";
import { useQuickSidebarStore } from "@/stores/quickSidebarStore";
import {
  useRailCustomizationStore,
  RailWidgetId,
} from "@/stores/railCustomizationStore";

interface WidgetConfig {
  id: RailWidgetId;
  label: string;
  icon: React.ReactNode;
  activeBg: string;
  activeBorder: string;
  defaultBg: string;
  editBorder: string;
  editActiveBg: string;
  iconColor: string;
}

const WIDGET_LOOKUP: Record<RailWidgetId, WidgetConfig> = {
  calendar: {
    id: "calendar",
    label: "Calendar",
    icon: <Calendar className="w-5 h-5 text-[#f59e0b] stroke-[2.2]" />,
    activeBg: "bg-[#fff6e6]",
    activeBorder: "border-[#f59e0b]",
    defaultBg: "bg-[#fff6e6] hover:bg-[#ffeed0]",
    editBorder: "border-[#f59e0b]",
    editActiveBg: "bg-[#fff6e6]",
    iconColor: "text-[#f59e0b]",
  },
  calculator: {
    id: "calculator",
    label: "Calculator",
    icon: <Calculator className="w-5 h-5 text-[#10b981] stroke-[2.2]" />,
    activeBg: "bg-[#eafaf1]",
    activeBorder: "border-[#10b981]",
    defaultBg: "bg-[#eafaf1] hover:bg-[#d8f5e5]",
    editBorder: "border-[#10b981]",
    editActiveBg: "bg-[#eafaf1]",
    iconColor: "text-[#10b981]",
  },
  users: {
    id: "users",
    label: "Contacts",
    icon: <Users className="w-5 h-5 text-[#2563eb] stroke-[2.2]" />,
    activeBg: "bg-[#edf5ff]",
    activeBorder: "border-[#2563eb]",
    defaultBg: "bg-[#edf5ff] hover:bg-[#dbeafe]",
    editBorder: "border-[#2563eb]",
    editActiveBg: "bg-[#edf5ff]",
    iconColor: "text-[#2563eb]",
  },
  notes: {
    id: "notes",
    label: "Notes",
    icon: <ClipboardPenLine className="w-5 h-5 text-[#ca8a04] stroke-[2.2]" />,
    activeBg: "bg-[#fffbe6]",
    activeBorder: "border-[#eab308]",
    defaultBg: "bg-[#fffbe6] hover:bg-[#fef9c3]",
    editBorder: "border-[#eab308]",
    editActiveBg: "bg-[#fffbe6]",
    iconColor: "text-[#ca8a04]",
  },
  shortcuts: {
    id: "shortcuts",
    label: "Keyboard",
    icon: <Keyboard className="w-5 h-5 text-[#6366f1] stroke-[2.2]" />,
    activeBg: "bg-[#f1edff]",
    activeBorder: "border-[#6366f1]",
    defaultBg: "bg-[#f1edff] hover:bg-[#e0e7ff]",
    editBorder: "border-[#6366f1]",
    editActiveBg: "bg-[#f1edff]",
    iconColor: "text-[#6366f1]",
  },
};

export const QuickSideRail: React.FC = () => {
  const { isSidebarOpen, closeSidebar, activePanel, togglePanel } =
    useQuickSidebarStore();

  const {
    backgroundColor,
    widgetOrder,
    favoriteWidgets,
    pinnedWidgets,
    togglePinned,
  } = useRailCustomizationStore();

  // Edit Pins Mode (quick toggle on the rail via + icon)
  const [isEditPinsMode, setIsEditPinsMode] = useState(false);
  const [stagedPins, setStagedPins] = useState<RailWidgetId[]>([]);
  const [hoveredWidget, setHoveredWidget] = useState<
    RailWidgetId | "edit" | "save" | null
  >(null);

  // Start edit pins
  const handleStartEditPins = () => {
    setStagedPins([...pinnedWidgets]);
    setIsEditPinsMode(true);
  };

  const handleToggleWidgetPin = (id: RailWidgetId) => {
    setStagedPins((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSavePins = () => {
    useRailCustomizationStore.setState({ pinnedWidgets: stagedPins });
    setIsEditPinsMode(false);
  };

  // Determine if rail is dark theme for text/borders
  const isDarkRail =
    backgroundColor === "#1e293b" || backgroundColor === "#0f172a";

  return (
    <aside
      aria-label="Quick Tools Sidebar"
      style={{ backgroundColor: backgroundColor || "#ffffff" }}
      className={`fixed right-0 top-[60px] bottom-0 w-[60px] sm:w-[62px] border-l ${
        isDarkRail ? "border-slate-800" : "border-[#d0e5fb]"
      } shadow-[-4px_0_15px_rgba(0,0,0,0.08)] z-50 flex flex-col items-center select-none transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
      }`}
    >
      {/* Top Section */}
      {!isEditPinsMode ? (
        <div className="h-[44px] w-full flex flex-col items-center justify-between pt-1.5 shrink-0">
          <button
            onClick={() => togglePanel("beta")}
            title="Beta Ecosystem Applications"
            aria-label="Beta Applications"
            className={`w-10 h-10 rounded-xl border flex items-center justify-center p-1.5 shadow-2xs hover:scale-105 transition-all cursor-pointer ${
              activePanel === "beta"
                ? "border-[#1d4ed8] bg-[#eff6ff] ring-2 ring-[#93c5fd]"
                : isDarkRail
                ? "border-slate-700 bg-slate-800/80"
                : "border-[#cbe1f7] bg-[#f8fbff]"
            }`}
          >
            <img
              src="/side-b-logo.png"
              alt="Brand B Logo"
              className="w-full h-full object-contain"
            />
          </button>
          <div
            className={`w-10 h-[1px] mb-[-9px] ${
              isDarkRail ? "bg-slate-700" : "bg-gray-200/90"
            }`}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col items-center pt-3 pb-1 shrink-0">
          <div className="flex flex-col items-center leading-none text-center">
            <span
              className={`text-[11px] font-black tracking-wider ${
                isDarkRail ? "text-slate-200" : "text-[#1e293b]"
              }`}
            >
              EDIT
            </span>
            <span
              className={`text-[11px] font-black tracking-wider mt-0.5 ${
                isDarkRail ? "text-slate-200" : "text-[#1e293b]"
              }`}
            >
              PINS
            </span>
          </div>
          <div
            className={`w-8 h-[1.5px] mt-2.5 ${
              isDarkRail ? "bg-slate-700" : "bg-gray-200"
            }`}
          />
        </div>
      )}

      {/* Main Apps / Quick Tools Vertical List: Follows custom widgetOrder */}
      <div className="flex-1 flex flex-col items-center gap-3 w-full overflow-y-auto no-scrollbar py-3">
        {/* NORMAL MODE: Render only PINNED widgets in custom widgetOrder */}
        {!isEditPinsMode && (
          <>
            {widgetOrder
              .filter((id) => pinnedWidgets.includes(id))
              .map((id) => {
                const w = WIDGET_LOOKUP[id];
                if (!w) return null;
                const isActive = activePanel === w.id;
                const isFav = favoriteWidgets.includes(w.id);

                return (
                  <div key={w.id} className="relative flex flex-col items-center">
                    <button
                      onClick={() => togglePanel(w.id)}
                      title={w.label}
                      aria-label={w.label}
                      className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs ${
                        isActive
                          ? `${w.activeBg} border-2 ${w.activeBorder}`
                          : `${w.defaultBg} border-2 border-transparent`
                      }`}
                    >
                      {w.icon}

                      {/* Small Star Indicator for Favorites */}
                      {isFav && (
                        <span
                          title="Favorite Widget"
                          className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-amber-400 text-white flex items-center justify-center shadow-xs ring-1 ring-white"
                        >
                          <Star className="w-2 h-2 fill-current stroke-[2]" />
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}

            {/* Dashed Plus (+) Button with 'Edit' Tooltip */}
            <div className="relative flex flex-col items-center">
              <button
                type="button"
                onClick={handleStartEditPins}
                onMouseEnter={() => setHoveredWidget("edit")}
                onMouseLeave={() => setHoveredWidget(null)}
                title="Edit Pins"
                aria-label="Edit Pins"
                className={`w-10 h-10 rounded-full border-2 border-dashed flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 ${
                  isDarkRail
                    ? "border-slate-600 text-slate-300 hover:border-blue-400 hover:text-blue-400 hover:bg-slate-800"
                    : "border-[#52525b] hover:border-[#1559ac] text-[#52525b] hover:text-[#1559ac] hover:bg-[#f0f7ff]"
                }`}
              >
                <Plus className="w-5 h-5 stroke-[2.2]" />
              </button>

              {/* Tooltip 'Edit' */}
              <div
                className={`absolute top-11.5 z-50 pointer-events-none transition-all duration-150 ${
                  hoveredWidget === "edit"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-1"
                }`}
              >
                <div className="relative bg-[#181d27] text-white text-[12px] font-bold px-3 py-1 rounded-xl shadow-lg flex items-center justify-center whitespace-nowrap">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#181d27] rotate-45" />
                  Edit
                </div>
              </div>
            </div>
          </>
        )}

        {/* EDIT PINS MODE: Show all 6 items with solid ring (if pinned) or dashed ring (if unpinned) */}
        {isEditPinsMode && (
          <>
            {widgetOrder.map((id) => {
              const w = WIDGET_LOOKUP[id];
              if (!w) return null;
              const isPinned = stagedPins.includes(w.id);

              return (
                <div
                  key={w.id}
                  className="relative flex flex-col items-center"
                  onMouseEnter={() => setHoveredWidget(w.id)}
                  onMouseLeave={() => setHoveredWidget(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleToggleWidgetPin(w.id)}
                    aria-label={`Toggle pin ${w.label}`}
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer ${
                      isPinned
                        ? `${w.editActiveBg} border-2 ${w.editBorder} shadow-2xs hover:scale-105`
                        : "bg-transparent border-2 border-dashed border-[#cbd5e1] text-[#94a3b8] hover:border-gray-400 opacity-60 hover:opacity-100"
                    }`}
                  >
                    {isPinned ? (
                      w.icon
                    ) : (
                      <div className="text-gray-400 grayscale opacity-75">
                        {w.icon}
                      </div>
                    )}

                    {/* Small Badge on Top-Right Corner */}
                    <span
                      title={isPinned ? "Click to Unpin" : "Click to Pin"}
                      className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center shadow-xs transition-transform duration-150 ${
                        isPinned
                          ? "bg-red-500 text-white ring-1 ring-white"
                          : "bg-blue-500 text-white ring-1 ring-white"
                      }`}
                    >
                      {isPinned ? (
                        <PinOff className="w-2.5 h-2.5 stroke-[2.8]" />
                      ) : (
                        <Pin className="w-2.5 h-2.5 fill-current stroke-[2]" />
                      )}
                    </span>
                  </button>

                  {/* Dark Tooltip */}
                  {hoveredWidget === w.id && (
                    <div className="absolute right-12 top-1/2 -translate-y-1/2 z-[80] pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
                      <div className="relative bg-[#181d27] text-white text-[12px] font-bold px-2.5 py-1 rounded-xl shadow-xl flex items-center justify-center">
                        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#181d27] rotate-45" />
                        {isPinned ? `Unpin ${w.label}` : `Pin ${w.label}`}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Green Circular Save Button */}
            <div className="relative flex flex-col items-center mt-1">
              <button
                type="button"
                onClick={handleSavePins}
                onMouseEnter={() => setHoveredWidget("save")}
                onMouseLeave={() => setHoveredWidget(null)}
                title="Save Pin Configuration"
                aria-label="Save Pins"
                className="w-10 h-10 rounded-full bg-[#10b981] hover:bg-[#059669] active:bg-[#047857] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Check className="w-5 h-5 stroke-[3]" />
              </button>

              <div
                className={`absolute top-11.5 z-50 pointer-events-none transition-all duration-150 ${
                  hoveredWidget === "save"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-1"
                }`}
              >
                <div className="relative bg-[#181d27] text-white text-[12px] font-bold px-3 py-1 rounded-xl shadow-lg flex items-center justify-center whitespace-nowrap">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#181d27] rotate-45" />
                  Save
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Section Divider */}
      <div
        className={`w-8 h-[1px] my-2.5 ${
          isDarkRail ? "bg-slate-700" : "bg-gray-200"
        }`}
      />

      {/* Bottom Utility Icons */}
      <div className="flex flex-col items-center gap-2.5 pb-2">
        {/* Customize Bar Pencil Button: Toggles the CustomizeBarPanel */}
        <button
          onClick={() => togglePanel("customize")}
          title="Customize Bar (Colors, Order, Favorites)"
          aria-label="Customize"
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs hover:scale-105 ${
            activePanel === "customize"
              ? "border-[#1559ac] bg-blue-50 text-[#1559ac] ring-2 ring-blue-300"
              : isDarkRail
              ? "border-slate-700 text-slate-300 bg-slate-800/80 hover:bg-slate-700"
              : "border-gray-200 hover:border-[#1559ac] text-gray-500 hover:text-[#1559ac] bg-white hover:bg-gray-50"
          }`}
        >
          <Pen className="w-4 h-4 stroke-[2]" />
        </button>

        {/* Filter / Sliders Settings Button */}
        <button
          title="Filter Preferences"
          aria-label="Filter Preferences"
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs hover:scale-105 ${
            isDarkRail
              ? "border-slate-700 text-slate-300 bg-slate-800/80 hover:bg-slate-700"
              : "border-gray-200 hover:border-[#1559ac] text-gray-500 hover:text-[#1559ac] bg-white hover:bg-gray-50"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4 stroke-[2]" />
        </button>

        {/* Close Button */}
        <button
          onClick={closeSidebar}
          title="Close Sidebar"
          aria-label="Close Sidebar"
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer mt-1 ${
            isDarkRail
              ? "text-slate-400 hover:text-white hover:bg-slate-800"
              : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          }`}
        >
          <X className="w-4 h-4 stroke-[2]" />
        </button>
      </div>
    </aside>
  );
};
