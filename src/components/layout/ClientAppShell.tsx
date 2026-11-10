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

const CalculatorPanel = dynamic(
  () => import("@/components/layout/CalculatorPanel").then((mod) => mod.CalculatorPanel),
  { ssr: false }
);

const BetaPanel = dynamic(
  () => import("@/components/layout/BetaPanel").then((mod) => mod.BetaPanel),
  { ssr: false }
);

const ContactsPanel = dynamic(
  () => import("@/components/layout/ContactsPanel").then((mod) => mod.ContactsPanel),
  { ssr: false }
);

const NotesPanel = dynamic(
  () => import("@/components/layout/NotesPanel").then((mod) => mod.NotesPanel),
  { ssr: false }
);

const CustomizeBarPanel = dynamic(
  () => import("@/components/layout/CustomizeBarPanel").then((mod) => mod.CustomizeBarPanel),
  { ssr: false }
);

const VirtualKeyboardModal = dynamic(
  () => import("@/components/layout/VirtualKeyboardModal").then((mod) => mod.VirtualKeyboardModal),
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
      <BetaPanel />
      <CalendarPanel />
      <CalculatorPanel />
      <ContactsPanel />
      <NotesPanel />
      <CustomizeBarPanel />
      <VirtualKeyboardModal />
      <QuickSideRail />
      <CartDrawer />
    </>
  );
};

