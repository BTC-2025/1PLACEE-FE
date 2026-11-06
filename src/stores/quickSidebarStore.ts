import { create } from "zustand";

interface QuickSidebarStore {
  isSidebarOpen: boolean;
  activePanel: "beta" | "calendar" | "calculator" | "users" | "notes" | "shortcuts" | "cloud" | "weather" | "customize" | null;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  setActivePanel: (panel: "beta" | "calendar" | "calculator" | "users" | "notes" | "shortcuts" | "cloud" | "weather" | "customize" | null) => void;
  togglePanel: (panel: "beta" | "calendar" | "calculator" | "users" | "notes" | "shortcuts" | "cloud" | "weather" | "customize") => void;
  closePanel: () => void;
}

export const useQuickSidebarStore = create<QuickSidebarStore>((set) => ({
  isSidebarOpen: false,
  activePanel: null,
  toggleSidebar: () =>
    set((state) => {
      const nextOpen = !state.isSidebarOpen;
      return {
        isSidebarOpen: nextOpen,
        activePanel: nextOpen ? state.activePanel : null,
      };
    }),
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false, activePanel: null }),
  setActivePanel: (panel) => set({ activePanel: panel, isSidebarOpen: true }),
  togglePanel: (panel) =>
    set((state) => ({
      activePanel: state.activePanel === panel ? null : panel,
      isSidebarOpen: true,
    })),
  closePanel: () => set({ activePanel: null }),
}));
