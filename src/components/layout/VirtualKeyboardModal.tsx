"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Keyboard as KeyboardIcon,
  Search,
  GripHorizontal,
  VolumeX,
  Volume1,
  Volume2,
  MicOff,
  SunMedium,
  Sun,
  Tv,
  Settings,
  Lock,
  Maximize2,
  Code
} from "lucide-react";
import { useQuickSidebarStore } from "@/stores/quickSidebarStore";

export const VirtualKeyboardModal: React.FC = () => {
  const { activePanel, closePanel } = useQuickSidebarStore();
  const [capsLock, setCapsLock] = useState(false);
  const [shift, setShift] = useState(false);
  const [ctrl, setCtrl] = useState(false);
  const [alt, setAlt] = useState(false);
  const [fnActive, setFnActive] = useState(false);
  const [fnLock, setFnLock] = useState(false);
  const lastTargetRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const handleFnClick = () => {
    setFnActive((prev) => !prev);
  };

  const handleEscClick = () => {
    // If Fn Lock is already on, clicking Esc immediately unlocks it!
    if (fnLock) {
      setFnLock(false);
      setFnActive(false);
      return;
    }
    // If Fn is active, pressing Esc toggles Fn Lock
    if (fnActive) {
      setFnLock(true);
      setFnActive(false);
      return;
    }
    closePanel();
  };

  // Determine if F1-F12 or Action Icons are currently showing
  // fnActive (single Fn press): standard F1-F12 keys
  // fnLock (Fn + Esc locked): Media / Hardware actions (Mute, Brightness, Volume, etc.)
  const isFnShowing = fnActive || fnLock;

  // Drag and Move Anywhere State
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number }>({
    mouseX: 0,
    mouseY: 0,
    startX: 0,
    startY: 0,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Initialize position at bottom center when keyboard opens
  useEffect(() => {
    if (activePanel === "shortcuts") {
      const modalWidth = Math.min(window.innerWidth - 32, 780);
      const modalHeight = 310;
      const initialX = Math.max(16, (window.innerWidth - modalWidth) / 2);
      const initialY = Math.max(16, window.innerHeight - modalHeight - 20);
      setPosition({ x: initialX, y: initialY });
    }
  }, [activePanel]);

  // Handle Drag Move & Mouse Up listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      const deltaX = e.clientX - dragStartRef.current.mouseX;
      const deltaY = e.clientY - dragStartRef.current.mouseY;

      const newX = dragStartRef.current.startX + deltaX;
      const newY = dragStartRef.current.startY + deltaY;

      // Keep within screen bounds
      const maxX = Math.max(0, window.innerWidth - (containerRef.current?.offsetWidth || 780));
      const maxY = Math.max(0, window.innerHeight - (containerRef.current?.offsetHeight || 300));

      const boundedX = Math.max(0, Math.min(newX, maxX));
      const boundedY = Math.max(0, Math.min(newY, maxY));

      setPosition({ x: boundedX, y: boundedY });
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleDragStart = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    isDraggingRef.current = true;
    document.body.style.userSelect = "none";
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: position?.x ?? 0,
      startY: position?.y ?? 0,
    };
  };

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

    // Handle Ctrl shortcuts if Ctrl is toggled on (e.g. Ctrl + A = Select All)
    if (ctrl) {
      const lower = keyVal.toLowerCase();
      if (lower === "a") {
        el.select();
        setCtrl(false);
        return;
      }
      if (lower === "c" && typeof navigator !== "undefined") {
        const selText = el.value.slice(el.selectionStart ?? 0, el.selectionEnd ?? el.value.length);
        if (selText) navigator.clipboard.writeText(selText);
        setCtrl(false);
        return;
      }
      if (lower === "x" && typeof navigator !== "undefined") {
        const start = el.selectionStart ?? 0;
        const end = el.selectionEnd ?? el.value.length;
        const selText = el.value.slice(start, end);
        if (selText) {
          navigator.clipboard.writeText(selText);
          const next = el.value.slice(0, start) + el.value.slice(end);
          updateInputValue(el, next, start);
        }
        setCtrl(false);
        return;
      }
      if (lower === "v" && typeof navigator !== "undefined") {
        navigator.clipboard.readText().then((text) => {
          if (text) {
            const start = el.selectionStart ?? el.value.length;
            const end = el.selectionEnd ?? el.value.length;
            const next = el.value.slice(0, start) + text + el.value.slice(end);
            updateInputValue(el, next, start + text.length);
          }
        }).catch(() => { });
        setCtrl(false);
        return;
      }
      setCtrl(false);
    }

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

  const handleDelete = () => {
    const el = getTargetInput();
    if (!el) return;

    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    const current = el.value;

    // Delete character ahead of cursor (forward delete) or selection
    if (start === end && start < current.length) {
      const next = current.slice(0, start) + current.slice(start + 1);
      updateInputValue(el, next, start);
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
    "h-10 sm:h-11 rounded-xl bg-white border border-gray-200 shadow-2xs hover:bg-[#e0f2fe] hover:border-[#7dd3fc] hover:text-[#0369a1] active:bg-[#bae6fd] flex items-center justify-center font-bold text-gray-800 text-[13.5px] transition-all cursor-pointer select-none active:scale-95";

  return (
    <div
      data-virtual-keyboard="true"
      ref={containerRef}
      style={{
        transform: position
          ? `translate3d(${position.x}px, ${position.y}px, 0)`
          : undefined,
      }}
      className={`fixed z-[70] w-full max-w-[780px] bg-white rounded-3xl p-4 sm:p-5 shadow-[0_12px_45px_rgba(0,0,0,0.22)] border border-gray-200 flex flex-col gap-2.5 animate-in fade-in duration-150 select-none ${!position ? "left-1/2 -translate-x-1/2 bottom-4" : "left-0 top-0"
        }`}
    >
      {/* Draggable Header: Grab icon + Virtual Keyboard title + X Close button */}
      <div
        onMouseDown={handleDragStart}
        className="flex items-center justify-between pb-1.5 border-b border-gray-100/90 cursor-grab active:cursor-grabbing hover:bg-gray-50/60 rounded-xl px-1 -mx-1 transition select-none"
        title="Click and drag anywhere to move keyboard"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center text-white shadow-xs shrink-0">
            <KeyboardIcon className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-[15px] sm:text-[16px] font-extrabold text-[#111827] tracking-tight leading-none">
                Virtual Keyboard
              </h3>

            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
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

      {/* Row 1: Esc (with Fn Lock indicator), Number keys / F1-F12 keys, Backspace */}
      <div className="flex items-center gap-1 sm:gap-1.5 w-full">
        {/* Esc Key with Fn Lock indicator: Text remains clean bold text in blue/gray */}
        <button
          type="button"
          onMouseDown={preventFocusLoss}
          onClick={handleEscClick}
          className={`${keyBaseStyle} px-2 sm:px-2.5 flex-col py-0.5 min-w-[42px] ${fnLock
              ? "bg-[#eff6ff] border-[#2563eb] text-[#2563eb] ring-2 ring-blue-300"
              : fnActive
                ? "ring-2 ring-blue-400 bg-blue-50 border-blue-300 text-blue-600"
                : "text-gray-800"
            }`}
          title={fnActive ? "Press Esc to Toggle Fn Lock" : "Close Keyboard / Escape"}
        >
          <span className={`text-xs font-bold leading-none ${fnLock ? "text-[#2563eb]" : ""}`}>Esc</span>
          <span
            className={`text-[9px] font-black leading-none mt-0.5 flex items-center gap-0.5 ${fnLock ? "text-[#2563eb]" : "text-gray-400"
              }`}
          >
            {fnLock ? "🔒 Fn" : "Fn Lock"}
          </span>
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

        {/* 12 Keys:
            - Single Fn Press (fnActive): Clean F1 to F12 keys only (standard F-key triggers e.g. F5 reload)
            - Fn Lock (fnLock): Media & Action Shortcuts (Mute, Volume, Brightness, Fullscreen, etc.) with icons!
            - Normal: 1 to = digits and symbols
        */}
        {[
          { num: "1", sym: "!", fKey: "F1", fnIcon: <VolumeX className="w-3.5 h-3.5 text-blue-600" />, action: () => { } },
          { num: "2", sym: "@", fKey: "F2", fnIcon: <Volume1 className="w-3.5 h-3.5 text-blue-600" />, action: () => { } },
          { num: "3", sym: "#", fKey: "F3", fnIcon: <Volume2 className="w-3.5 h-3.5 text-blue-600" />, action: () => { } },
          { num: "4", sym: "$", fKey: "F4", fnIcon: <MicOff className="w-3.5 h-3.5 text-blue-600" />, action: () => { } },
          { num: "5", sym: "%", fKey: "F5", fnIcon: <SunMedium className="w-3.5 h-3.5 text-blue-600" />, action: () => { } },
          { num: "6", sym: "^", fKey: "F6", fnIcon: <Sun className="w-3.5 h-3.5 text-blue-600" />, action: () => { } },
          { num: "7", sym: "&", fKey: "F7", fnIcon: <Tv className="w-3.5 h-3.5 text-blue-600" />, action: () => { } },
          {
            num: "8", sym: "*", fKey: "F8", fnIcon: <Search className="w-3.5 h-3.5 text-blue-600" />, action: () => {
              const el = getTargetInput();
              if (el) el.focus();
            }
          },
          { num: "9", sym: "(", fKey: "F9", fnIcon: <Settings className="w-3.5 h-3.5 text-blue-600" />, action: () => { } },
          { num: "0", sym: ")", fKey: "F10", fnIcon: <Lock className="w-3.5 h-3.5 text-blue-600" />, action: () => { } },
          {
            num: "-", sym: "_", fKey: "F11", fnIcon: <Maximize2 className="w-3.5 h-3.5 text-blue-600" />, action: () => {
              if (typeof document !== "undefined") {
                if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => { });
                else document.exitFullscreen().catch(() => { });
              }
            }
          },
          { num: "=", sym: "+", fKey: "F12", fnIcon: <Code className="w-3.5 h-3.5 text-blue-600" />, action: () => { } },
        ].map((item) => (
          <button
            key={item.num}
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => {
              if (fnLock) {
                // Fn Lock is ON: Trigger hardware / media action (Mute, Brightness, etc.) without feedback toast!
                item.action();
              } else if (fnActive) {
                // Single Fn press: Trigger standard F-key (e.g. F5 reloads page)
                if (item.fKey === "F5") {
                  if (typeof window !== "undefined") window.location.reload();
                }
                setFnActive(false);
              } else {
                handleKeyClick(shift ? item.sym : item.num);
              }
            }}
            className={`${keyBaseStyle} flex-1 flex-col py-0.5 min-w-0 ${isFnShowing ? "bg-blue-50/60 border-blue-200" : ""
              }`}
            title={fnLock ? `${item.fKey} (Media Action)` : fnActive ? item.fKey : `${item.sym} / ${item.num}`}
          >
            {fnLock ? (
              // When Fn Lock is active: Show F-Key + Action Icon
              <>
                <span className="text-[10px] text-blue-600 font-black leading-none mb-0.5">
                  {item.fKey}
                </span>
                <span className="flex items-center justify-center leading-none">
                  {item.fnIcon}
                </span>
              </>
            ) : fnActive ? (
              // When single Fn is pressed: Show only clean F1 to F12
              <span className="text-[12px] text-blue-600 font-black leading-none">
                {item.fKey}
              </span>
            ) : (
              // Normal state: Show numbers and symbols
              <>
                <span className="text-[10px] text-blue-600 font-bold leading-none mb-0.5">
                  {item.sym}
                </span>
                <span className="text-[13px] font-semibold text-gray-700 leading-none">
                  {item.num}
                </span>
              </>
            )}
          </button>
        ))}

        {/* Backspace Key */}
        <button
          type="button"
          onMouseDown={preventFocusLoss}
          onClick={handleBackspace}
          className={`${keyBaseStyle} px-2 sm:px-2.5 text-xs font-semibold`}
          title="Backspace (Delete backwards)"
        >
          ⌫
        </button>

        {/* Delete Key */}
        <button
          type="button"
          onMouseDown={preventFocusLoss}
          onClick={handleDelete}
          className={`${keyBaseStyle} px-2 sm:px-2.5 text-xs font-semibold`}
          title="Delete (Delete forwards)"
        >
          Del
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
          className={`h-10 sm:h-11 px-2.5 sm:px-3 text-xs font-semibold rounded-xl border flex items-center justify-center transition-all cursor-pointer select-none active:scale-95 ${capsLock
              ? "bg-[#2563eb] text-white border-[#2563eb] shadow-sm"
              : "bg-white border-gray-200 text-gray-800 shadow-2xs hover:bg-gray-50 active:bg-gray-100"
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

        {/* Enter key: default white/gray, hover/active styled, no static solid blue */}
        <button
          type="button"
          onMouseDown={preventFocusLoss}
          onClick={handleEnter}
          className={`${keyBaseStyle} px-4 sm:px-5 font-bold text-gray-800`}
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
          className={`h-10 sm:h-11 px-3 sm:px-3.5 rounded-xl border font-bold text-xs sm:text-[13px] flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer ${shift
              ? "bg-[#2563eb] text-white border-[#2563eb] shadow-sm"
              : "bg-white border-gray-200 text-gray-800 shadow-2xs hover:bg-gray-50 active:bg-gray-100"
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
          className={`h-10 sm:h-11 px-3 sm:px-3.5 rounded-xl border font-bold text-xs sm:text-[13px] flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer ${shift
              ? "bg-[#2563eb] text-white border-[#2563eb] shadow-sm"
              : "bg-white border-gray-200 text-gray-800 shadow-2xs hover:bg-gray-50 active:bg-gray-100"
            }`}
        >
          ↑ Shift
        </button>
      </div>

      {/* Row 5: Ctrl, Fn, Win, Alt, Space, Arrow keys (Right side Alt, Win, Menu, Ctrl removed) */}
      <div className="flex items-center gap-1 sm:gap-1.5 w-full">
        {/* Left Ctrl */}
        <button
          type="button"
          onMouseDown={preventFocusLoss}
          onClick={() => setCtrl(!ctrl)}
          className={`h-10 sm:h-11 px-3 sm:px-3.5 text-xs font-semibold rounded-xl border flex items-center justify-center transition-all cursor-pointer select-none active:scale-95 ${ctrl
              ? "bg-[#2563eb] text-white border-[#2563eb] shadow-sm"
              : "bg-white border-gray-200 text-gray-800 shadow-2xs hover:bg-[#e0f2fe] hover:border-[#7dd3fc] hover:text-[#0369a1] active:bg-[#bae6fd]"
            }`}
        >
          Ctrl
        </button>

        {/* Fn Key */}
        <button
          type="button"
          onMouseDown={preventFocusLoss}
          onClick={handleFnClick}
          className={`h-10 sm:h-11 px-2.5 sm:px-3 text-xs font-semibold rounded-xl border flex items-center justify-center transition-all cursor-pointer select-none active:scale-95 ${isFnShowing
              ? "bg-[#2563eb] text-white border-[#2563eb] shadow-sm ring-2 ring-blue-300"
              : "bg-white border-gray-200 text-gray-800 shadow-2xs hover:bg-[#e0f2fe] hover:border-[#7dd3fc] hover:text-[#0369a1] active:bg-[#bae6fd]"
            }`}
          title="Click Fn to transform numbers into F1-F12 keys. Press Fn then Esc to lock/unlock"
        >
          Fn {fnLock ? "🔒" : ""}
        </button>

        {/* Left Win Key */}
        <button
          type="button"
          onMouseDown={preventFocusLoss}
          className={`${keyBaseStyle} w-9 sm:w-10 min-w-0`}
          title="Windows Key"
        >
          <svg className="w-3.5 h-3.5 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.949-1.8" />
          </svg>
        </button>

        {/* Left Alt Key */}
        <button
          type="button"
          onMouseDown={preventFocusLoss}
          onClick={() => setAlt(!alt)}
          className={`h-10 sm:h-11 px-3 sm:px-3.5 text-xs font-semibold rounded-xl border flex items-center justify-center transition-all cursor-pointer select-none active:scale-95 ${alt
              ? "bg-[#2563eb] text-white border-[#2563eb] shadow-sm"
              : "bg-white border-gray-200 text-gray-800 shadow-2xs hover:bg-[#e0f2fe] hover:border-[#7dd3fc] hover:text-[#0369a1] active:bg-[#bae6fd]"
            }`}
        >
          Alt
        </button>

        {/* Spacebar - expansive comfortable width */}
        <button
          type="button"
          onMouseDown={preventFocusLoss}
          onClick={() => handleKeyClick(" ")}
          className={`${keyBaseStyle} flex-1 text-xs font-semibold text-gray-600`}
        >
          Space
        </button>

        {/* Arrow keys (Clean on the right side) */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => {
              const el = getTargetInput();
              if (el && el.selectionStart !== null && el.selectionStart > 0) {
                const pos = el.selectionStart - 1;
                el.setSelectionRange(pos, pos);
              }
            }}
            className={`${keyBaseStyle} w-8 sm:w-10 min-w-0 text-xs`}
            title="Left"
          >
            ◀
          </button>
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            className={`${keyBaseStyle} w-8 sm:w-10 min-w-0 text-xs`}
            title="Down"
          >
            ▼
          </button>
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            className={`${keyBaseStyle} w-8 sm:w-10 min-w-0 text-xs`}
            title="Up"
          >
            ▲
          </button>
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => {
              const el = getTargetInput();
              if (el && el.selectionStart !== null && el.selectionStart < el.value.length) {
                const pos = el.selectionStart + 1;
                el.setSelectionRange(pos, pos);
              }
            }}
            className={`${keyBaseStyle} w-8 sm:w-10 min-w-0 text-xs`}
            title="Right"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};
