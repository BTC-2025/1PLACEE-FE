"use client";

import React from "react";
import { useQuickSidebarStore } from "@/stores/quickSidebarStore";

export const PageContentWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isSidebarOpen = useQuickSidebarStore((state) => state.isSidebarOpen);
  const activePanel = useQuickSidebarStore((state) => state.activePanel);

  // Shrink page: 60px when rail open, or 60px + 350px/360px when calendar, beta or contacts panel is also open
  const shrinkPadding = !isSidebarOpen
    ? "pr-0"
    : activePanel === "calendar" || activePanel === "calculator" || activePanel === "beta" || activePanel === "users" || activePanel === "notes" || activePanel === "customize"
    ? "pr-[410px] sm:pr-[422px]"
    : "pr-[60px] sm:pr-[62px]";

  return (
    <div
      className={`flex-1 w-full flex flex-col transition-all duration-300 ease-in-out ${shrinkPadding}`}
    >
      <main className="flex-1 w-full mx-auto">{children}</main>
    </div>
  );
};


