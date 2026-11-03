"use client";

import React from "react";
import dynamic from "next/dynamic";
import { AmazonNavbar } from "@/components/layout/AmazonNavbar";
import { AmazonFooter } from "@/components/layout/AmazonFooter";
import { PageContentWrapper } from "@/components/layout/PageContentWrapper";

// Dynamically load secondary floating drawers on the client side with ssr: false
// This prevents layout.js chunk timeout and speeds up initial page load from 9s to <1s
const CartDrawer = dynamic(
  () => import("@/features/cart/CartDrawer").then((mod) => mod.CartDrawer),
  { ssr: false }
);

const CalendarPanel = dynamic(
  () => import("@/components/layout/CalendarPanel").then((mod) => mod.CalendarPanel),
  { ssr: false }
);

const QuickSideRail = dynamic(
  () => import("@/components/layout/QuickSideRail").then((mod) => mod.QuickSideRail),
  { ssr: false }
);

export const ClientAppShell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <AmazonNavbar />
      <PageContentWrapper>
        {children}
        <AmazonFooter />
      </PageContentWrapper>
      <CalendarPanel />
      <QuickSideRail />
      <CartDrawer />
    </>
  );
};

