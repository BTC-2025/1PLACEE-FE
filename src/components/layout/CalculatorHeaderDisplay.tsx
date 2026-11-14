"use client";

import React from "react";
import {
  History,
  Copy,
  Check,
  Trash2,
  X,
  ChevronDown,
  Tag,
  Percent,
  Globe,
  ArrowRightLeft,
} from "lucide-react";

export interface CalculatorHeaderDisplayProps {
  closePanel: () => void;
  setActiveModal: React.Dispatch<React.SetStateAction<any>>;
  copyFeedback: boolean;
  handleCopyBreakdown: () => void;
  handleClearAll: () => void;
  calcNote: string;
  setCalcNote: React.Dispatch<React.SetStateAction<string>>;
  expressionFormula: string;
  handleFormulaChange: (newFormula: string) => void;
  getNumbersCountList: (formula: string) => { word: string; num: string }[];
  currentInput: string;
  handleInputChange: (val: string) => void;
  handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  gstDropdownOpen: boolean;
  setGstDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  curDropdownOpen: boolean;
  setCurDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currencyFrom: string;
  setCurrencyFrom: React.Dispatch<React.SetStateAction<string>>;
  CURRENCY_RATES: Record<string, { rate: number; name: string; symbol: string }>;
  setSciDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOperatorJustPressed: boolean;
  pendingOperator: string | null;
  handleEquals: () => void;
  isCalculated: boolean;
}

export const CalculatorHeaderDisplay: React.FC<CalculatorHeaderDisplayProps> = ({
  closePanel,
  setActiveModal,
  copyFeedback,
  handleCopyBreakdown,
  handleClearAll,
  calcNote,
  setCalcNote,
  expressionFormula,
  handleFormulaChange,
  getNumbersCountList,
  currentInput,
  handleInputChange,
  handlePaste,
  gstDropdownOpen,
  setGstDropdownOpen,
  curDropdownOpen,
  setCurDropdownOpen,
  currencyFrom,
  setCurrencyFrom,
  CURRENCY_RATES,
  setSciDropdownOpen,
  isOperatorJustPressed,
  pendingOperator,
  handleEquals,
  isCalculated,
}) => {
  return (
    <>
      {/* 1. Header Bar: Calculator Title + Action Icons (History, Copy, Delete, Close) */}
      <div className="h-[44px] px-4 flex items-center justify-between border-b border-gray-100 bg-white shrink-0">
        <h2 className="text-[17px] font-black text-[#111827] tracking-tight">
          Calculator
        </h2>
        <div className="flex items-center gap-1 text-gray-500">
          {/* History */}
          <button
            onClick={() => setActiveModal("history")}
            title="Calculation History & Restore"
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition cursor-pointer"
          >
            <History className="w-4 h-4 stroke-[2]" />
          </button>

          {/* Copy Calculation Tape Breakdown */}
          <button
            onClick={handleCopyBreakdown}
            title={copyFeedback ? "Copied!" : "Copy Calculation Breakdown"}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition cursor-pointer relative"
          >
            {copyFeedback ? (
              <Check className="w-4 h-4 stroke-[2.5] text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4 stroke-[2]" />
            )}
          </button>

          {/* Delete / Clear Tape */}
          <button
            onClick={handleClearAll}
            title="Clear Current Calculation"
            className="w-8 h-8 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-500 flex items-center justify-center transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4 stroke-[2]" />
          </button>

          {/* Close Calculator */}
          <button
            onClick={closePanel}
            title="Close Calculator"
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition cursor-pointer ml-0.5"
          >
            <X className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* 2. Live Expression & Numbers Count List (Note, Formula & Occurrences) */}
      {expressionFormula && (
        <div className="px-3 py-2 border-b border-gray-200/60 bg-white shrink-0 space-y-1.5">
          {/* Optional Note / Purpose Input for Calculation (Saves to History) */}
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              value={calcNote}
              onChange={(e) => setCalcNote(e.target.value)}
              placeholder="Add note for this calculation (e.g. Grocery, Tax, Bill)..."
              className="w-full text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-emerald-500 focus:bg-white"
            />
          </div>

          {/* Editable horizontal scrollable formula line with cursor erase support */}
          <div className="flex items-center gap-1.5 py-0.5">
            <div className="flex items-center w-full bg-blue-50/80 border border-blue-200 rounded-xl px-2.5 py-1.5 shadow-2xs group focus-within:border-blue-500 focus-within:bg-white transition">
              <input
                type="text"
                value={expressionFormula}
                onChange={(e) => handleFormulaChange(e.target.value)}
                placeholder="Formula expression (e.g. 8 + 5 + 5 +)..."
                title="Click anywhere with cursor to edit or erase numbers/operators"
                className="w-full text-[13px] font-mono font-bold text-blue-800 bg-transparent outline-none cursor-text tracking-wide"
              />
              <span className="text-xs text-blue-500 font-bold shrink-0 ml-1 select-none pointer-events-none">
                ✎ Edit
              </span>
            </div>
          </div>

          {/* Horizontal badges line for number counts (No truncate, wrap or smooth horizontal scroll) */}
          {getNumbersCountList(expressionFormula).length > 0 && (
            <div className="pt-0.5">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block mb-1">
                OCCURRENCE COUNT:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                {getNumbersCountList(expressionFormula).map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-gray-50 border border-gray-200 text-gray-700 px-2.5 py-1 rounded-lg whitespace-nowrap shrink-0 shadow-2xs"
                  >
                    <span className="text-blue-600 font-extrabold">{item.word}</span>
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs font-black inline-flex items-center justify-center">
                      {item.num}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Calculator Display & Input Area (flex-1 to automatically fill available height and push bottom bar to the very bottom) */}
      <div className="flex-1 min-h-[44px] px-4 py-2 flex items-center justify-end bg-white border-b border-gray-100">
        {/* Main Display: Current Active Input / Number & Operator */}
        <div className="flex items-center gap-1.5 w-full justify-end">
          {isOperatorJustPressed && pendingOperator ? (
            /* When operator is pressed: Show only the operator sign clearly */
            <span className="text-3xl font-black text-emerald-600 select-none">
              {pendingOperator}
            </span>
          ) : (
            /* When entering number or showing result */
            <input
              type="text"
              value={currentInput}
              placeholder="0"
              onChange={(e) => handleInputChange(e.target.value)}
              onPaste={handlePaste}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  // Let native backspace work naturally inside the input field
                  e.stopPropagation();
                } else if (e.key === "Enter" || e.key === "=") {
                  e.preventDefault();
                  handleEquals();
                }
              }}
              className={`text-3xl sm:text-4xl font-black tracking-tight text-right w-full bg-transparent outline-none border-none cursor-text leading-none placeholder:text-gray-300 ${
                isCalculated ? "text-emerald-600" : "text-gray-900"
              }`}
            />
          )}
        </div>
      </div>

      {/* 4. Top Quick Feature Pill Buttons (GST with Discount Dropdown, CUR with All Currencies Dropdown, Compare) */}
      <div className="relative px-3 py-1.5 bg-gray-50 border-t border-gray-200/80 grid grid-cols-3 gap-2 shrink-0 z-30">
        {/* Pill 1: GST with Right Corner Down Arrow for Discount Dropdown */}
        <div className="relative pill-dropdown-container">
          <div className="h-8 rounded-full bg-[#e8fbf3] hover:bg-[#d0f5e5] border border-[#a7f3d0] text-[#059669] text-xs font-bold flex items-center justify-between px-2 transition shadow-2xs">
            <button
              onClick={() => {
                setGstDropdownOpen(false);
                setCurDropdownOpen(false);
                setSciDropdownOpen(false);
                setActiveModal("gst");
              }}
              title="GST Calculator"
              className="flex-1 flex items-center justify-center gap-0.5 cursor-pointer hover:opacity-80 py-1"
            >
              <span className="text-[10px]">%</span>
              <span className="text-[11px] font-black">GST</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurDropdownOpen(false);
                setSciDropdownOpen(false);
                setGstDropdownOpen((prev) => !prev);
              }}
              title="Open Discount & GST Options"
              className="w-4 h-6 flex items-center justify-center hover:bg-emerald-200/60 rounded-full cursor-pointer ml-0.5 transition"
            >
              <ChevronDown className={`w-3 h-3 transition-transform ${gstDropdownOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* GST Down Arrow Dropdown (Discount & GST Quick Menu) */}
          {gstDropdownOpen && (
            <div className="absolute left-0 top-10 w-36 bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <button
                onClick={() => {
                  setGstDropdownOpen(false);
                  setActiveModal("discount");
                }}
                className="w-full px-3 py-2 text-left text-xs font-bold text-amber-700 hover:bg-amber-50 flex items-center gap-2 cursor-pointer transition"
              >
                <Tag className="w-3.5 h-3.5 text-amber-600" />
                <span>Discount</span>
              </button>
              <button
                onClick={() => {
                  setGstDropdownOpen(false);
                  setActiveModal("gst");
                }}
                className="w-full px-3 py-2 text-left text-xs font-bold text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 cursor-pointer transition border-t border-gray-100"
              >
                <Percent className="w-3.5 h-3.5 text-emerald-600" />
                <span>GST Tax (18%)</span>
              </button>
            </div>
          )}
        </div>

        {/* Pill 2: CUR Button with Dropdown (All Country Currencies) */}
        <div className="relative pill-dropdown-container">
          <button
            onClick={() => {
              setGstDropdownOpen(false);
              setSciDropdownOpen(false);
              setCurDropdownOpen((prev) => !prev);
            }}
            title="Currencies of All Countries"
            className="w-full h-8 rounded-full bg-[#eff4fe] hover:bg-[#dce7fe] border border-[#bfdbfe] text-[#2563eb] text-xs font-bold flex items-center justify-center gap-1 px-1.5 transition cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
          >
            <Globe className="w-3 h-3 text-[#2563eb]" />
            <span className="text-[11px] font-black">{currencyFrom === "INR" ? "CUR" : currencyFrom}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${curDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* CUR Dropdown showing all country currencies */}
          {curDropdownOpen && (
            <div className="absolute left-0 top-10 w-44 bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-50 max-h-56 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-2.5 py-1 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100 flex items-center justify-between">
                <span>Select Currency</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurDropdownOpen(false);
                    setActiveModal("currency");
                  }}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Full Table
                </span>
              </div>
              {Object.entries(CURRENCY_RATES).map(([code, info]) => (
                <button
                  key={code}
                  onClick={() => {
                    setCurrencyFrom(code);
                    setCurDropdownOpen(false);
                    setActiveModal("currency");
                  }}
                  className={`w-full px-2.5 py-1.5 text-left text-xs flex items-center justify-between hover:bg-blue-50 cursor-pointer transition ${currencyFrom === code ? "bg-blue-50/80 font-black text-blue-700" : "text-gray-700 font-semibold"
                    }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-gray-400 font-mono text-[11px] w-6 text-center">{info.symbol}</span>
                    <span>{code}</span>
                  </span>
                  <span className="text-[10px] text-gray-400 truncate max-w-[70px]">{info.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pill 3: Compare Button */}
        <button
          onClick={() => {
            setGstDropdownOpen(false);
            setCurDropdownOpen(false);
            setSciDropdownOpen(false);
            setActiveModal("compare");
          }}
          title="Compare Products & Split Bills"
          className="h-8 rounded-full bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
        >
          <ArrowRightLeft className="w-3 h-3 text-gray-600" />
          <span className="text-[11px] font-black">Compare</span>
        </button>
      </div>

    </>
  );
};
