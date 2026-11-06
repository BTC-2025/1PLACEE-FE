"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Keyboard as KeyboardIcon, Search } from "lucide-react";
import { useQuickSidebarStore } from "@/stores/quickSidebarStore";

export const VirtualKeyboardModal: React.FC = () => {
  const { activePanel, closePanel } = useQuickSidebarStore();
  const [capsLock, setCapsLock] = useState(false);
  const [shift, setShift] = useState(false);
  const lastTargetRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  // Track the most recently focused input/textarea so typing always goes to it
  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA") &&
        !target.closest('[data-virtual-keyboard="true"]')
      ) {
        lastTargetRef.current = target as HTMLInputElement | HTMLTextAreaElement;
      }
    };

    document.addEventListener("focusin", handleFocusIn);
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, []);

  if (activePanel !== "shortcuts") return null;

  // Helper to obtain the active input/textarea:
  // 1. Check if an input/textarea currently has focus
  // 2. Otherwise use the last targeted input
  // 3. If neither, fallback to the main search bar or open search button
  const getTargetInput = (): HTMLInputElement | HTMLTextAreaElement | null => {
    const active = document.activeElement as HTMLElement | null;
    if (
      active &&
      (active.tagName === "INPUT" || active.tagName === "TEXTAREA") &&
      !active.closest('[data-virtual-keyboard="true"]')
    ) {
      lastTargetRef.current = active as HTMLInputElement | HTMLTextAreaElement;
      return lastTargetRef.current;
    }

    if (lastTargetRef.current && document.body.contains(lastTargetRef.current)) {
      return lastTargetRef.current;
    }

    // Try finding main search input
    const searchInput = document.getElementById("main-search-input") as HTMLInputElement | null;
    if (searchInput) {
      lastTargetRef.current = searchInput;
      return searchInput;
    }

    // If search is not open, trigger search button
    const openSearchBtn = document.querySelector('button[aria-label="Open Search"]') as HTMLButtonElement | null;
    if (openSearchBtn) {
      openSearchBtn.click();
      setTimeout(() => {
        const openedInput = document.getElementById("main-search-input") as HTMLInputElement | null;
        if (openedInput) {
          lastTargetRef.current = openedInput;
          openedInput.focus();
        }
      }, 50);
    }

    return null;
  };

  // Helper to set React input value and dispatch standard input & change events
  const updateInputValue = (
    el: HTMLInputElement | HTMLTextAreaElement,
    nextVal: string,
    cursorPos: number
  ) => {
    // React 16+ value tracker override so onChange fires properly
    const proto =
      el instanceof HTMLInputElement
        ? HTMLInputElement.prototype
        : HTMLTextAreaElement.prototype;
    const valueSetter = Object.getOwnPropertyDescriptor(proto, "value")?.set;

    if (valueSetter) {
      valueSetter.call(el, nextVal);
    } else {
      el.value = nextVal;
    }

    el.setSelectionRange(cursorPos, cursorPos);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    el.focus();
  };

  const handleKeyClick = (keyVal: string) => {
    const el = getTargetInput();
    if (!el) return;

    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    const current = el.value;
    const next = current.slice(0, start) + keyVal + current.slice(end);
    updateInputValue(el, next, start + keyVal.length);
  };

  const handleBackspace = () => {
    const el = getTargetInput();
    if (!el) return;

    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    const current = el.value;

    if (start === end && start > 0) {
      const next = current.slice(0, start - 1) + current.slice(end);
      updateInputValue(el, next, start - 1);
    } else if (start !== end) {
      const next = current.slice(0, start) + current.slice(end);
      updateInputValue(el, next, start);
    }
  };

  const handleEnter = () => {
    const el = getTargetInput();
    if (!el) return;

    if (el.tagName === "TEXTAREA") {
      handleKeyClick("\n");
    } else {
      // If it's a form input (like search bar), submit its form!
      const form = el.form || el.closest("form");
      if (form) {
        form.requestSubmit
          ? form.requestSubmit()
          : form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      }
    }
  };

  const isUpper = (capsLock && !shift) || (!capsLock && shift);

  // Prevent keyboard clicks from stealing focus or triggering blur on target input
  const preventFocusLoss = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const keyBaseStyle =
    "h-10 sm:h-11 rounded-xl bg-white border border-gray-200 shadow-2xs hover:bg-gray-50 active:bg-gray-100 flex items-center justify-center font-bold text-gray-800 text-[13.5px] transition-all cursor-pointer select-none active:scale-95";

  return (
    <div
      data-virtual-keyboard="true"
      className="fixed inset-x-0 bottom-0 z-[70] pointer-events-none flex flex-col items-center justify-end p-2 sm:p-4 pb-3"
    >
      {/* Keyboard Container Modal positioned at bottom with floating elevation */}
      <div
        onMouseDown={preventFocusLoss}
        className="relative pointer-events-auto w-full max-w-[780px] bg-white rounded-3xl p-4 sm:p-5 shadow-[0_12px_45px_rgba(0,0,0,0.22)] border border-gray-200 flex flex-col gap-2.5 animate-in slide-in-from-bottom duration-200 select-none mr-0 sm:mr-[62px]"
      >
        {/* Header: Virtual Keyboard with Blue icon and X Close button */}
        <div className="flex items-center justify-between pb-1 border-b border-gray-100/90">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center text-white shadow-xs">
              <KeyboardIcon className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-[15px] sm:text-[16px] font-extrabold text-[#111827] tracking-tight leading-none">
                Virtual Keyboard
              </h3>
              <span className="text-[11px] text-gray-400 font-medium">
                Type directly into Search or any input
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick button to focus search bar */}


            <button
              type="button"
              onClick={closePanel}
              title="Close Keyboard"
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2.4]" />
            </button>
          </div>
        </div>

        {/* Row 1: Esc, Number keys with symbols, Backspace */}
        {/* Row 1: Esc, Tilde/Backtick (~ `), Number keys with symbols, Backspace */}
        <div className="flex items-center gap-1 sm:gap-1.5 w-full">
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={closePanel}
            className={`${keyBaseStyle} px-2.5 sm:px-3 text-xs`}
          >
            Esc
          </button>

          {/* Tilde / Backtick Key */}
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => handleKeyClick(shift ? "~" : "`")}
            className={`${keyBaseStyle} flex-1 flex-col py-0.5 min-w-0`}
          >
            <span className="text-[11px] text-blue-600 font-bold leading-none mb-0.5">
              ~
            </span>
            <span className="text-[13px] font-semibold text-gray-700 leading-none">
              `
            </span>
          </button>

          {[
            { num: "1", sym: "!" },
            { num: "2", sym: "@" },
            { num: "3", sym: "#" },
            { num: "4", sym: "$" },
            { num: "5", sym: "%" },
            { num: "6", sym: "^" },
            { num: "7", sym: "&" },
            { num: "8", sym: "*" },
            { num: "9", sym: "(" },
            { num: "0", sym: ")" },
            { num: "-", sym: "_" },
            { num: "=", sym: "+" },
          ].map((item) => (
            <button
              key={item.num}
              type="button"
              onMouseDown={preventFocusLoss}
              onClick={() => handleKeyClick(shift ? item.sym : item.num)}
              className={`${keyBaseStyle} flex-1 flex-col py-0.5 min-w-0`}
            >
              <span className="text-[10px] text-blue-600 font-bold leading-none mb-0.5">
                {item.sym}
              </span>
              <span className="text-[13px] font-semibold text-gray-700 leading-none">
                {item.num}
              </span>
            </button>
          ))}

          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={handleBackspace}
            className={`${keyBaseStyle} px-2.5 sm:px-3 text-xs sm:text-[13px] font-semibold`}
          >
            Backspace
          </button>
        </div>

        {/* Row 2: Tab, Q W E R T Y U I O P [ ] */}
        <div className="flex items-center gap-1 sm:gap-1.5 w-full">
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => handleKeyClick(" ")}
            className={`${keyBaseStyle} px-3 sm:px-4 text-xs font-semibold`}
          >
            Tab
          </button>

          {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((letter) => (
            <button
              key={letter}
              type="button"
              onMouseDown={preventFocusLoss}
              onClick={() =>
                handleKeyClick(isUpper ? letter.toUpperCase() : letter.toLowerCase())
              }
              className={`${keyBaseStyle} flex-1 min-w-0`}
            >
              {isUpper ? letter.toUpperCase() : letter.toLowerCase()}
            </button>
          ))}

          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => handleKeyClick(shift ? "{" : "[")}
            className={`${keyBaseStyle} flex-1 flex-col min-w-0 py-0.5`}
          >
            <span className="text-[10px] text-blue-600 font-bold leading-none mb-0.5">
              {"{"}
            </span>
            <span className="text-[13px] font-semibold text-gray-700 leading-none">
              {"["}
            </span>
          </button>

          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => handleKeyClick(shift ? "}" : "]")}
            className={`${keyBaseStyle} flex-1 flex-col min-w-0 py-0.5`}
          >
            <span className="text-[10px] text-blue-600 font-bold leading-none mb-0.5">
              {"}"}
            </span>
            <span className="text-[13px] font-semibold text-gray-700 leading-none">
              {"]"}
            </span>
          </button>

          {/* Pipe / Backslash Key (| \) */}
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => handleKeyClick(shift ? "|" : "\\")}
            className={`${keyBaseStyle} flex-1 flex-col min-w-0 py-0.5`}
          >
            <span className="text-[10px] text-blue-600 font-bold leading-none mb-0.5">
              |
            </span>
            <span className="text-[13px] font-semibold text-gray-700 leading-none">
              \
            </span>
          </button>
        </div>

        {/* Row 3: Caps Lock, A S D F G H J K L : ' Enter */}
        <div className="flex items-center gap-1 sm:gap-1.5 w-full">
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => setCapsLock(!capsLock)}
            className={`${keyBaseStyle} px-2.5 sm:px-3 text-xs font-semibold ${capsLock ? "bg-blue-50 border-blue-400 text-blue-600" : ""
              }`}
          >
            Caps Lock
          </button>

          {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((letter) => (
            <button
              key={letter}
              type="button"
              onMouseDown={preventFocusLoss}
              onClick={() =>
                handleKeyClick(isUpper ? letter.toUpperCase() : letter.toLowerCase())
              }
              className={`${keyBaseStyle} flex-1 min-w-0`}
            >
              {isUpper ? letter.toUpperCase() : letter.toLowerCase()}
            </button>
          ))}

          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => handleKeyClick(shift ? ":" : ";")}
            className={`${keyBaseStyle} flex-1 flex-col min-w-0 py-0.5`}
          >
            <span className="text-[10px] text-blue-600 font-bold leading-none mb-0.5">
              :
            </span>
            <span className="text-[13px] font-semibold text-gray-700 leading-none">
              ;
            </span>
          </button>

          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => handleKeyClick(shift ? '"' : "'")}
            className={`${keyBaseStyle} flex-1 flex-col min-w-0 py-0.5`}
          >
            <span className="text-[10px] text-blue-600 font-bold leading-none mb-0.5">
              &quot;
            </span>
            <span className="text-[13px] font-semibold text-gray-700 leading-none">
              &apos;
            </span>
          </button>

          {/* Blue Enter button matching screenshot */}
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={handleEnter}
            className="h-10 sm:h-11 px-4 sm:px-5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-bold text-[13.5px] shadow-sm transition active:scale-95 cursor-pointer"
          >
            Enter
          </button>
        </div>

        {/* Row 4: Shift, Z X C V B N M < > ? Shift */}
        <div className="flex items-center gap-1 sm:gap-1.5 w-full">
          {/* Left Shift Button */}
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => setShift(!shift)}
            className={`h-10 sm:h-11 px-3 sm:px-3.5 rounded-xl border border-blue-300 font-bold text-xs sm:text-[13px] flex items-center justify-center gap-1 transition active:scale-95 cursor-pointer ${shift
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-[#dbeafe] hover:bg-[#bfdbfe] text-[#2563eb]"
              }`}
          >
            ↑ Shift
          </button>

          {["Z", "X", "C", "V", "B", "N", "M"].map((letter) => (
            <button
              key={letter}
              type="button"
              onMouseDown={preventFocusLoss}
              onClick={() =>
                handleKeyClick(isUpper ? letter.toUpperCase() : letter.toLowerCase())
              }
              className={`${keyBaseStyle} flex-1 min-w-0`}
            >
              {isUpper ? letter.toUpperCase() : letter.toLowerCase()}
            </button>
          ))}

          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => handleKeyClick(shift ? "<" : ",")}
            className={`${keyBaseStyle} flex-1 flex-col min-w-0 py-0.5`}
          >
            <span className="text-[10px] text-blue-600 font-bold leading-none mb-0.5">
              &lt;
            </span>
            <span className="text-[13px] font-semibold text-gray-700 leading-none">
              ,
            </span>
          </button>

          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => handleKeyClick(shift ? ">" : ".")}
            className={`${keyBaseStyle} flex-1 flex-col min-w-0 py-0.5`}
          >
            <span className="text-[10px] text-blue-600 font-bold leading-none mb-0.5">
              &gt;
            </span>
            <span className="text-[13px] font-semibold text-gray-700 leading-none">
              .
            </span>
          </button>

          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => handleKeyClick(shift ? "?" : "/")}
            className={`${keyBaseStyle} flex-1 flex-col min-w-0 py-0.5`}
          >
            <span className="text-[10px] text-blue-600 font-bold leading-none mb-0.5">
              ?
            </span>
            <span className="text-[13px] font-semibold text-gray-700 leading-none">
              /
            </span>
          </button>

          {/* Right Shift Button */}
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => setShift(!shift)}
            className={`h-10 sm:h-11 px-3 sm:px-3.5 rounded-xl border border-blue-300 font-bold text-xs sm:text-[13px] flex items-center justify-center gap-1 transition active:scale-95 cursor-pointer ${shift
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-[#dbeafe] hover:bg-[#bfdbfe] text-[#2563eb]"
              }`}
          >
            ↑ Shift
          </button>
        </div>

        {/* Row 5: Ctrl, Alt, Space, Alt, Ctrl, Left, Down, Up, Right */}
        <div className="flex items-center gap-1 sm:gap-1.5 w-full">
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            className={`${keyBaseStyle} px-2.5 sm:px-3 text-xs`}
          >
            Ctrl
          </button>
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            className={`${keyBaseStyle} px-2.5 sm:px-3 text-xs`}
          >
            Alt
          </button>

          {/* Spacebar */}
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => handleKeyClick(" ")}
            className={`${keyBaseStyle} flex-1 text-xs font-semibold text-gray-600`}
          >
            Space
          </button>

          <button
            type="button"
            onMouseDown={preventFocusLoss}
            className={`${keyBaseStyle} px-2.5 sm:px-3 text-xs`}
          >
            Alt
          </button>
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            className={`${keyBaseStyle} px-2.5 sm:px-3 text-xs`}
          >
            Ctrl
          </button>

          {/* Arrow keys */}
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            className={`${keyBaseStyle} w-9 sm:w-11 min-w-0`}
            title="Left"
          >
            ◀
          </button>
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            className={`${keyBaseStyle} w-9 sm:w-11 min-w-0`}
            title="Down"
          >
            ▼
          </button>
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            className={`${keyBaseStyle} w-9 sm:w-11 min-w-0`}
            title="Up"
          >
            ▲
          </button>
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            className={`${keyBaseStyle} w-9 sm:w-11 min-w-0`}
            title="Right"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};
