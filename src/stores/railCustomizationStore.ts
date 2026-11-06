import { create } from "zustand";
import { persist } from "zustand/middleware";

export type RailWidgetId =
  | "calendar"
  | "calculator"
  | "users"
  | "notes"
  | "shortcuts"
  | "weather";

export interface RailCustomizationState {
  // Theme Background Color for QuickSideRail
  backgroundColor: string;
  // Order of the 6 widgets
  widgetOrder: RailWidgetId[];
  // Favorite widgets marked with a star
  favoriteWidgets: RailWidgetId[];
  // Pinned widgets visible on the rail
  pinnedWidgets: RailWidgetId[];

  // Actions
  setBackgroundColor: (color: string) => void;
  setWidgetOrder: (order: RailWidgetId[]) => void;
  moveWidget: (fromIndex: number, toIndex: number) => void;
  toggleFavorite: (id: RailWidgetId) => void;
  togglePinned: (id: RailWidgetId) => void;
  resetDefaults: () => void;
}

const DEFAULT_ORDER: RailWidgetId[] = [
  "calendar",
  "calculator",
  "users",
  "notes",
  "shortcuts",
  "weather",
];

export const useRailCustomizationStore = create<RailCustomizationState>()(
  persist(
    (set) => ({
      backgroundColor: "#ffffff",
      widgetOrder: DEFAULT_ORDER,
      favoriteWidgets: ["calendar", "users"],
      pinnedWidgets: DEFAULT_ORDER,

      setBackgroundColor: (color) => set({ backgroundColor: color }),

      setWidgetOrder: (order) => set({ widgetOrder: order }),

      moveWidget: (fromIndex, toIndex) =>
        set((state) => {
          const next = [...state.widgetOrder];
          const [moved] = next.splice(fromIndex, 1);
          next.splice(toIndex, 0, moved);
          return { widgetOrder: next };
        }),

      toggleFavorite: (id) =>
        set((state) => {
          const exists = state.favoriteWidgets.includes(id);
          return {
            favoriteWidgets: exists
              ? state.favoriteWidgets.filter((item) => item !== id)
              : [...state.favoriteWidgets, id],
          };
        }),

      togglePinned: (id) =>
        set((state) => {
          const exists = state.pinnedWidgets.includes(id);
          return {
            pinnedWidgets: exists
              ? state.pinnedWidgets.filter((item) => item !== id)
              : [...state.pinnedWidgets, id],
          };
        }),

      resetDefaults: () =>
        set({
          backgroundColor: "#ffffff",
          widgetOrder: DEFAULT_ORDER,
          favoriteWidgets: ["calendar", "users"],
          pinnedWidgets: DEFAULT_ORDER,
        }),
    }),
    {
      name: "1place-rail-customization-storage",
    }
  )
);

