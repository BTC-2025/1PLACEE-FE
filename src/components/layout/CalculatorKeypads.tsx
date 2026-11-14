"use client";

import React from "react";
import { ChevronDown, RotateCcw, X } from "lucide-react";

export interface CalculatorKeypadsProps {
  activeCalcMode: "standard" | "scientific" | "date" | "programmer";
  setActiveCalcMode: React.Dispatch<React.SetStateAction<"standard" | "scientific" | "date" | "programmer">>;
  sciAngleMode: "DEG" | "RAD" | "GRAD";
  setSciAngleMode: React.Dispatch<React.SetStateAction<"DEG" | "RAD" | "GRAD">>;
  sciFeMode: boolean;
  setSciFeMode: React.Dispatch<React.SetStateAction<boolean>>;
  currentInput: string;
  setCurrentInput: React.Dispatch<React.SetStateAction<string>>;
  sciMemory: number;
  setSciMemory: React.Dispatch<React.SetStateAction<number>>;
  sci2nd: boolean;
  setSci2nd: React.Dispatch<React.SetStateAction<boolean>>;
  sciTrigOpen: boolean;
  setSciTrigOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sciHyp: boolean;
  setSciHyp: React.Dispatch<React.SetStateAction<boolean>>;
  sciFuncOpen: boolean;
  setSciFuncOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleScientificOp: (opName: string) => void;
  handleClearAll: () => void;
  handleBackspace: () => void;
  handleOperator: (op: string) => void;
  handlePercentage: () => void;
  handleDigit: (digit: string) => void;
  handleEquals: () => void;
  dateFrom: string;
  setDateFrom: React.Dispatch<React.SetStateAction<string>>;
  timeFrom: string;
  setTimeFrom: React.Dispatch<React.SetStateAction<string>>;
  dateTo: string;
  setDateTo: React.Dispatch<React.SetStateAction<string>>;
  timeTo: string;
  setTimeTo: React.Dispatch<React.SetStateAction<string>>;
  includeTimeInDiff: boolean;
  setIncludeTimeInDiff: React.Dispatch<React.SetStateAction<boolean>>;
  programmerWordSize: "QWORD" | "DWORD" | "WORD" | "BYTE";
  setProgrammerWordSize: React.Dispatch<React.SetStateAction<"QWORD" | "DWORD" | "WORD" | "BYTE">>;
  programmerBase: "HEX" | "DEC" | "OCT" | "BIN";
  setProgrammerBase: React.Dispatch<React.SetStateAction<"HEX" | "DEC" | "OCT" | "BIN">>;
  handleBitwiseOp: (op: string) => void;
}

export const CalculatorKeypads: React.FC<CalculatorKeypadsProps> = ({
  activeCalcMode,
  setActiveCalcMode,
  sciAngleMode,
  setSciAngleMode,
  sciFeMode,
  setSciFeMode,
  currentInput,
  setCurrentInput,
  sciMemory,
  setSciMemory,
  sci2nd,
  setSci2nd,
  sciTrigOpen,
  setSciTrigOpen,
  sciHyp,
  setSciHyp,
  sciFuncOpen,
  setSciFuncOpen,
  handleScientificOp,
  handleClearAll,
  handleBackspace,
  handleOperator,
  handlePercentage,
  handleDigit,
  handleEquals,
  dateFrom,
  setDateFrom,
  timeFrom,
  setTimeFrom,
  dateTo,
  setDateTo,
  timeTo,
  setTimeTo,
  includeTimeInDiff,
  setIncludeTimeInDiff,
  programmerWordSize,
  setProgrammerWordSize,
  programmerBase,
  setProgrammerBase,
  handleBitwiseOp,
}) => {
  return (
    <>
      {/* 5. Keypad Grid: Adaptive Based on Active Mode (Standard, Scientific, etc.) */}
      {activeCalcMode === "scientific" ? (
        <div className="p-2 bg-[#fdfbfb] border-t border-gray-200/80 space-y-1.5 shrink-0">
          {/* Top Bar 1: Mode Switches (DEG / RAD / GRAD, F-E) and Memory (MC, MR, M+, M-, MS, Mv) */}
          <div className="flex items-center justify-between text-xs font-bold text-gray-700 px-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setSciAngleMode((prev) => (prev === "DEG" ? "RAD" : prev === "RAD" ? "GRAD" : "DEG"))
                }
                title="Toggle Angle: DEG / RAD / GRAD"
                className="px-2 py-0.5 rounded-md hover:bg-gray-200/80 text-gray-800 font-black cursor-pointer transition text-[11px]"
              >
                {sciAngleMode}
              </button>
              <button
                onClick={() => {
                  const newFe = !sciFeMode;
                  setSciFeMode(newFe);
                  const val = parseFloat(currentInput);
                  if (!isNaN(val)) {
                    setCurrentInput(newFe ? val.toExponential(4) : String(parseFloat(val.toFixed(10))));
                  }
                }}
                title="Toggle Fixed to Exponential Notation"
                className={`px-2 py-0.5 rounded-md text-[11px] font-black cursor-pointer transition ${sciFeMode ? "bg-purple-100 text-purple-800" : "hover:bg-gray-200/80 text-gray-800"
                  }`}
              >
                F-E
              </button>
            </div>

            {/* Memory Buttons */}
            <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500">
              <button
                onClick={() => setSciMemory(0)}
                disabled={sciMemory === 0}
                className={`px-1.5 py-0.5 rounded ${sciMemory === 0 ? "opacity-35 cursor-not-allowed" : "hover:bg-gray-200 text-gray-800 cursor-pointer"}`}
              >
                MC
              </button>
              <button
                onClick={() => setCurrentInput(String(sciMemory))}
                disabled={sciMemory === 0}
                className={`px-1.5 py-0.5 rounded ${sciMemory === 0 ? "opacity-35 cursor-not-allowed" : "hover:bg-gray-200 text-gray-800 cursor-pointer"}`}
              >
                MR
              </button>
              <button
                onClick={() => setSciMemory((prev) => prev + (parseFloat(currentInput) || 0))}
                className="px-1.5 py-0.5 rounded hover:bg-gray-200 text-gray-800 cursor-pointer"
              >
                M+
              </button>
              <button
                onClick={() => setSciMemory((prev) => prev - (parseFloat(currentInput) || 0))}
                className="px-1.5 py-0.5 rounded hover:bg-gray-200 text-gray-800 cursor-pointer"
              >
                M-
              </button>
              <button
                onClick={() => setSciMemory(parseFloat(currentInput) || 0)}
                className="px-1.5 py-0.5 rounded hover:bg-gray-200 text-gray-800 cursor-pointer"
              >
                MS
              </button>
            </div>
          </div>

          {/* Top Bar 2: Dropdowns for Trigonometry & Function (Image 2 & 3) */}
          <div className="flex items-center gap-3 px-1 relative z-20">
            {/* Trigonometry Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setSciFuncOpen(false);
                  setSciTrigOpen((prev) => !prev);
                }}
                className={`flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 rounded-lg border transition cursor-pointer ${sciTrigOpen ? "bg-purple-100 border-purple-300 text-purple-900" : "bg-white hover:bg-gray-100 border-gray-200 text-gray-800"
                  }`}
              >
                <span className="text-[11px]">⊿ Trigonometry</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${sciTrigOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Trigonometry Flyout (Image 2) */}
              {sciTrigOpen && (
                <div className="absolute left-0 top-8 bg-white border border-gray-200 rounded-2xl shadow-2xl p-2 z-50 grid grid-cols-4 gap-1.5 w-64 animate-in fade-in duration-100">
                  <button
                    onClick={() => setSci2nd((prev) => !prev)}
                    className={`h-8 rounded-xl font-bold text-xs border transition cursor-pointer ${sci2nd ? "bg-purple-600 text-white border-purple-600" : "bg-gray-50 text-gray-800 border-gray-200"
                      }`}
                  >
                    2<sup>nd</sup>
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp(sci2nd ? "asin" : "sin");
                      setSciTrigOpen(false);
                    }}
                    className="h-8 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    {sci2nd ? "sin⁻¹" : "sin"}
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp(sci2nd ? "acos" : "cos");
                      setSciTrigOpen(false);
                    }}
                    className="h-8 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    {sci2nd ? "cos⁻¹" : "cos"}
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp(sci2nd ? "atan" : "tan");
                      setSciTrigOpen(false);
                    }}
                    className="h-8 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    {sci2nd ? "tan⁻¹" : "tan"}
                  </button>

                  <button
                    onClick={() => setSciHyp((prev) => !prev)}
                    className={`h-8 rounded-xl font-bold text-xs border transition cursor-pointer ${sciHyp ? "bg-purple-600 text-white border-purple-600" : "bg-gray-50 text-gray-800 border-gray-200"
                      }`}
                  >
                    hyp
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp("sec");
                      setSciTrigOpen(false);
                    }}
                    className="h-8 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    sec
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp("csc");
                      setSciTrigOpen(false);
                    }}
                    className="h-8 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    csc
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp("cot");
                      setSciTrigOpen(false);
                    }}
                    className="h-8 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    cot
                  </button>
                </div>
              )}
            </div>

            {/* Function Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setSciTrigOpen(false);
                  setSciFuncOpen((prev) => !prev);
                }}
                className={`flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 rounded-lg border transition cursor-pointer ${sciFuncOpen ? "bg-purple-100 border-purple-300 text-purple-900" : "bg-white hover:bg-gray-100 border-gray-200 text-gray-800"
                  }`}
              >
                <span className="italic font-serif text-[11px]">ƒ Function</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${sciFuncOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Function Flyout (Image 3) */}
              {sciFuncOpen && (
                <div className="absolute left-0 top-8 bg-white border border-gray-200 rounded-2xl shadow-2xl p-2 z-50 grid grid-cols-3 gap-1.5 w-56 animate-in fade-in duration-100">
                  <button
                    onClick={() => {
                      handleScientificOp("|x|");
                      setSciFuncOpen(false);
                    }}
                    className="h-8 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    |x|
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp("⌊x⌋");
                      setSciFuncOpen(false);
                    }}
                    className="h-8 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    ⌊x⌋
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp("⌈x⌉");
                      setSciFuncOpen(false);
                    }}
                    className="h-8 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    ⌈x⌉
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp("rand");
                      setSciFuncOpen(false);
                    }}
                    className="h-8 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    rand
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp("->dms");
                      setSciFuncOpen(false);
                    }}
                    className="h-8 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    →dms
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp("->deg");
                      setSciFuncOpen(false);
                    }}
                    className="h-8 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    →deg
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Full Scientific Keypad 5x7 Grid (Matching Windows Scientific Calculator Image 1) */}
          <div className="grid grid-cols-5 gap-1 text-xs">
            {/* Row 1: 2nd, pi, e, C, Backspace */}
            <button
              onClick={() => setSci2nd((prev) => !prev)}
              className={`h-8 rounded-xl font-bold border transition cursor-pointer active:scale-95 ${sci2nd ? "bg-purple-600 text-white border-purple-600" : "bg-white hover:bg-gray-100 text-gray-800 border-gray-200"
                }`}
            >
              2<sup>nd</sup>
            </button>
            <button
              onClick={() => handleScientificOp("pi")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              π
            </button>
            <button
              onClick={() => handleScientificOp("e")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              e
            </button>
            <button
              onClick={handleClearAll}
              title="Clear All"
              className="h-8 rounded-xl bg-white hover:bg-red-50 border border-gray-200 text-red-600 font-bold cursor-pointer active:scale-95"
            >
              C
            </button>
            <button
              onClick={handleBackspace}
              title="Backspace"
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold cursor-pointer active:scale-95"
            >
              ⌫
            </button>

            {/* Row 2: x^2 (or x^3), 1/x, |x|, exp, mod */}
            <button
              onClick={() => handleScientificOp(sci2nd ? "x^3" : "x^2")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              {sci2nd ? (
                <>x<sup>3</sup></>
              ) : (
                <>x<sup>2</sup></>
              )}
            </button>
            <button
              onClick={() => handleScientificOp("1/x")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              1/x
            </button>
            <button
              onClick={() => handleScientificOp("|x|")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              |x|
            </button>
            <button
              onClick={() => handleOperator("exp")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              exp
            </button>
            <button
              onClick={() => handleOperator("MOD")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              mod
            </button>

            {/* Row 3: 2sqrt(x) (or 3sqrt), (, ), n!, / */}
            <button
              onClick={() => handleScientificOp(sci2nd ? "cbrt" : "sqrt")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              {sci2nd ? "∛x" : "²√x"}
            </button>
            <button
              onClick={() => handleDigit("(")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              (
            </button>
            <button
              onClick={() => handleDigit(")")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              )
            </button>
            <button
              onClick={() => handleScientificOp("n!")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              n!
            </button>
            <button
              onClick={() => handleOperator("/")}
              className="h-8 rounded-xl bg-[#ecfdf5] hover:bg-[#d1fae5] text-[#059669] font-black text-base cursor-pointer active:scale-95"
            >
              ÷
            </button>

            {/* Row 4: x^y, 7, 8, 9, x */}
            <button
              onClick={() => handleOperator("x^y")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              x<sup>y</sup>
            </button>
            <button
              onClick={() => handleDigit("7")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-sm cursor-pointer active:scale-95"
            >
              7
            </button>
            <button
              onClick={() => handleDigit("8")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-sm cursor-pointer active:scale-95"
            >
              8
            </button>
            <button
              onClick={() => handleDigit("9")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-sm cursor-pointer active:scale-95"
            >
              9
            </button>
            <button
              onClick={() => handleOperator("x")}
              className="h-8 rounded-xl bg-[#ecfdf5] hover:bg-[#d1fae5] text-[#059669] font-black text-base cursor-pointer active:scale-95"
            >
              ×
            </button>

            {/* Row 5: 10^x (or 2^x), 4, 5, 6, - */}
            <button
              onClick={() => handleScientificOp(sci2nd ? "2^x" : "10^x")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              {sci2nd ? <>2<sup>x</sup></> : <>10<sup>x</sup></>}
            </button>
            <button
              onClick={() => handleDigit("4")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-sm cursor-pointer active:scale-95"
            >
              4
            </button>
            <button
              onClick={() => handleDigit("5")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-sm cursor-pointer active:scale-95"
            >
              5
            </button>
            <button
              onClick={() => handleDigit("6")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-sm cursor-pointer active:scale-95"
            >
              6
            </button>
            <button
              onClick={() => handleOperator("-")}
              className="h-8 rounded-xl bg-[#ecfdf5] hover:bg-[#d1fae5] text-[#059669] font-black text-xl flex items-center justify-center cursor-pointer active:scale-95"
            >
              -
            </button>

            {/* Row 6: log, 1, 2, 3, + */}
            <button
              onClick={() => handleScientificOp("log")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              log
            </button>
            <button
              onClick={() => handleDigit("1")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-sm cursor-pointer active:scale-95"
            >
              1
            </button>
            <button
              onClick={() => handleDigit("2")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-sm cursor-pointer active:scale-95"
            >
              2
            </button>
            <button
              onClick={() => handleDigit("3")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-sm cursor-pointer active:scale-95"
            >
              3
            </button>
            <button
              onClick={() => handleOperator("+")}
              className="h-8 rounded-xl bg-[#ecfdf5] hover:bg-[#d1fae5] text-[#059669] font-black text-lg cursor-pointer active:scale-95"
            >
              +
            </button>

            {/* Row 7: ln (or e^x), +/-, 0, ., = */}
            <button
              onClick={() => handleScientificOp(sci2nd ? "e^x" : "ln")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              {sci2nd ? <>e<sup>x</sup></> : "ln"}
            </button>
            <button
              onClick={() => handleScientificOp("+/-")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              ⁺/₋
            </button>
            <button
              onClick={() => handleDigit("0")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-sm cursor-pointer active:scale-95"
            >
              0
            </button>
            <button
              onClick={() => handleDigit(".")}
              className="h-8 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-lg cursor-pointer active:scale-95"
            >
              .
            </button>
            <button
              onClick={handleEquals}
              className="h-8 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-black text-xl flex items-center justify-center shadow-md cursor-pointer active:scale-95"
            >
              =
            </button>
          </div>
        </div>
      ) : activeCalcMode === "date" ? (
        <div className="p-3 bg-white border-t border-gray-200/80 space-y-2.5 shrink-0 max-h-[460px] overflow-y-auto no-scrollbar">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-purple-900 block">
              Calculate Difference Between Dates
            </span>
            <button
              onClick={() => setIncludeTimeInDiff((prev) => !prev)}
              className="text-[10px] font-bold text-purple-600 hover:text-purple-800 bg-purple-50 px-2 py-0.5 rounded-full cursor-pointer"
            >
              {includeTimeInDiff ? "✓ Include Time" : "+ Add Time"}
            </button>
          </div>

          <div className="space-y-2 bg-purple-50/40 p-2.5 rounded-xl border border-purple-100">
            <div>
              <label className="text-[10px] font-bold text-gray-500 block mb-0.5">From Date & Time:</label>
              <div className="grid grid-cols-5 gap-1.5">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="col-span-3 text-xs font-bold p-2 bg-white border border-gray-200 rounded-lg outline-none"
                />
                <input
                  type="time"
                  disabled={!includeTimeInDiff}
                  value={timeFrom}
                  onChange={(e) => setTimeFrom(e.target.value)}
                  className={`col-span-2 text-xs font-bold p-2 bg-white border border-gray-200 rounded-lg outline-none ${!includeTimeInDiff ? "opacity-40 cursor-not-allowed" : ""
                    }`}
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-500 block mb-0.5">To Date & Time:</label>
              <div className="grid grid-cols-5 gap-1.5">
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="col-span-3 text-xs font-bold p-2 bg-white border border-gray-200 rounded-lg outline-none"
                />
                <input
                  type="time"
                  disabled={!includeTimeInDiff}
                  value={timeTo}
                  onChange={(e) => setTimeTo(e.target.value)}
                  className={`col-span-2 text-xs font-bold p-2 bg-white border border-gray-200 rounded-lg outline-none ${!includeTimeInDiff ? "opacity-40 cursor-not-allowed" : ""
                    }`}
                />
              </div>
            </div>
          </div>

          {/* Date Difference Comprehensive Result (Years, Months, Weeks, Days, Hours, Mins) */}
          {(() => {
            const dt1 = new Date(`${dateFrom}T${includeTimeInDiff ? timeFrom : "00:00"}`);
            const dt2 = new Date(`${dateTo}T${includeTimeInDiff ? timeTo : "00:00"}`);

            const earliest = dt1 < dt2 ? dt1 : dt2;
            const latest = dt1 < dt2 ? dt2 : dt1;

            const diffMs = Math.abs(latest.getTime() - earliest.getTime());
            const totalMinutes = Math.floor(diffMs / (1000 * 60));
            const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
            const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            const totalWeeks = Math.floor(totalDays / 7);

            // Calculate precise Years, Months, Days breakdown
            let y1 = earliest.getFullYear();
            let m1 = earliest.getMonth();
            let d1 = earliest.getDate();

            let y2 = latest.getFullYear();
            let m2 = latest.getMonth();
            let d2 = latest.getDate();

            let years = y2 - y1;
            let months = m2 - m1;
            let days = d2 - d1;

            if (days < 0) {
              months -= 1;
              const prevMonthDays = new Date(y2, m2, 0).getDate();
              days += prevMonthDays;
            }
            if (months < 0) {
              years -= 1;
              months += 12;
            }

            const remHours = totalHours % 24;
            const remMinutes = totalMinutes % 60;

            return (
              <div className="space-y-2">
                {/* Highlight Primary Difference */}
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-500">Difference:</span>
                    <span className="text-sm font-black text-purple-700">
                      {totalDays.toLocaleString()} days
                    </span>
                  </div>
                  <div className="text-xs font-bold text-purple-900">
                    {years > 0 ? `${years} yr${years > 1 ? "s" : ""}, ` : ""}
                    {months > 0 ? `${months} mo, ` : ""}
                    {days} day{days !== 1 ? "s" : ""}
                    {includeTimeInDiff && (remHours > 0 || remMinutes > 0)
                      ? `, ${remHours} hr${remHours !== 1 ? "s" : ""}, ${remMinutes} min`
                      : ""}
                  </div>
                </div>

                {/* All Detailed Units Breakdown */}
                <div className="grid grid-cols-2 gap-1.5 text-[11px] font-semibold">
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 flex justify-between">
                    <span className="text-gray-500">Years:</span>
                    <span className="font-bold text-gray-900">{(totalDays / 365.25).toFixed(2)} yrs</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 flex justify-between">
                    <span className="text-gray-500">Months:</span>
                    <span className="font-bold text-gray-900">{(totalDays / 30.4375).toFixed(1)} mo</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 flex justify-between">
                    <span className="text-gray-500">Weeks:</span>
                    <span className="font-bold text-gray-900">{totalWeeks.toLocaleString()} wk, {totalDays % 7} d</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 flex justify-between">
                    <span className="text-gray-500">Hours:</span>
                    <span className="font-bold text-gray-900">{totalHours.toLocaleString()} hrs</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 flex justify-between col-span-2">
                    <span className="text-gray-500">Minutes:</span>
                    <span className="font-bold text-gray-900">{totalMinutes.toLocaleString()} mins</span>
                  </div>
                </div>
              </div>
            );
          })()}

          <button
            onClick={() => {
              const dt1 = new Date(`${dateFrom}T${includeTimeInDiff ? timeFrom : "00:00"}`);
              const dt2 = new Date(`${dateTo}T${includeTimeInDiff ? timeTo : "00:00"}`);
              const diffDays = Math.ceil(Math.abs(dt2.getTime() - dt1.getTime()) / (1000 * 60 * 60 * 24));
              setCurrentInput(String(diffDays));
              setActiveCalcMode("standard");
            }}
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold cursor-pointer transition shadow-xs"
          >
            Use Days in Standard Calc
          </button>
        </div>
      ) : activeCalcMode === "programmer" ? (
        <div className="p-3 bg-white border-t border-gray-200/80 space-y-2 shrink-0">
          {/* Programmer Base Switcher: HEX, DEC, OCT, BIN */}
          {(() => {
            const decVal = parseInt(currentInput, programmerBase === "HEX" ? 16 : programmerBase === "OCT" ? 8 : programmerBase === "BIN" ? 2 : 10) || 0;
            const hexStr = (decVal >>> 0).toString(16).toUpperCase();
            const decStr = String(decVal);
            const octStr = (decVal >>> 0).toString(8);
            const binStr = (decVal >>> 0).toString(2).padStart(8, "0");

            return (
              <div className="space-y-1 bg-gray-50/90 p-2 rounded-xl border border-gray-200 font-mono text-[11px]">
                <div
                  onClick={() => setProgrammerBase("HEX")}
                  className={`flex justify-between px-2 py-0.5 rounded cursor-pointer transition ${programmerBase === "HEX" ? "bg-purple-100 font-black text-purple-800" : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <span className="w-10 text-gray-500 font-bold">HEX</span>
                  <span className="truncate">{hexStr}</span>
                </div>
                <div
                  onClick={() => setProgrammerBase("DEC")}
                  className={`flex justify-between px-2 py-0.5 rounded cursor-pointer transition ${programmerBase === "DEC" ? "bg-purple-100 font-black text-purple-800" : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <span className="w-10 text-gray-500 font-bold">DEC</span>
                  <span className="truncate">{decStr}</span>
                </div>
                <div
                  onClick={() => setProgrammerBase("OCT")}
                  className={`flex justify-between px-2 py-0.5 rounded cursor-pointer transition ${programmerBase === "OCT" ? "bg-purple-100 font-black text-purple-800" : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <span className="w-10 text-gray-500 font-bold">OCT</span>
                  <span className="truncate">{octStr}</span>
                </div>
                <div
                  onClick={() => setProgrammerBase("BIN")}
                  className={`flex justify-between px-2 py-0.5 rounded cursor-pointer transition ${programmerBase === "BIN" ? "bg-purple-100 font-black text-purple-800" : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <span className="w-10 text-gray-500 font-bold">BIN</span>
                  <span className="truncate">{binStr}</span>
                </div>
              </div>
            );
          })()}

          {/* Programmer Bitwise Operators Row (AND, OR, NOT, XOR, Lsh, Rsh, MOD) */}
          <div className="grid grid-cols-6 gap-1 text-[11px] font-black">
            {["AND", "OR", "XOR", "NOT", "Lsh", "Rsh"].map((op) => (
              <button
                key={op}
                onClick={() => handleBitwiseOp(op)}
                className="h-8 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold transition cursor-pointer shadow-2xs active:scale-95"
              >
                {op}
              </button>
            ))}
          </div>

          {/* Hex digits A-F row (enabled in HEX mode) */}
          <div className="grid grid-cols-6 gap-1 text-[11px] font-black">
            {["A", "B", "C", "D", "E", "F"].map((digit) => {
              const isDisabled = programmerBase !== "HEX";
              return (
                <button
                  key={digit}
                  disabled={isDisabled}
                  onClick={() => handleDigit(digit)}
                  className={`h-8 rounded-lg font-bold transition shadow-2xs ${isDisabled
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 cursor-pointer active:scale-95"
                    }`}
                >
                  {digit}
                </button>
              );
            })}
          </div>

          {/* Programmer Keypad Grid */}
          <div className="grid grid-cols-4 gap-1.5">
            <button
              onClick={handleClearAll}
              title="Clear All"
              className="h-9 rounded-xl bg-[#fff1f2] hover:bg-[#ffe4e6] text-[#e11d48] font-bold text-xs flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleBackspace}
              title="Backspace"
              className="h-9 rounded-xl bg-[#f1f5f9] hover:bg-[#e2e8f0] text-gray-700 font-bold text-xs flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
            >
              ←
            </button>
            <button
              onClick={() => handleBitwiseOp("MOD")}
              className="h-9 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-black text-xs flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
            >
              MOD
            </button>
            <button
              onClick={() => handleOperator("/")}
              className="h-9 rounded-xl bg-[#ecfdf5] hover:bg-[#d1fae5] text-[#059669] font-black text-base flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
            >
              /
            </button>

            {/* 7, 8, 9, x */}
            {["7", "8", "9"].map((d) => {
              const isDisabled = programmerBase === "BIN" || (programmerBase === "OCT" && (d === "8" || d === "9"));
              return (
                <button
                  key={d}
                  disabled={isDisabled}
                  onClick={() => handleDigit(d)}
                  className={`h-9 rounded-xl font-black text-sm flex items-center justify-center transition shadow-2xs ${isDisabled
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 cursor-pointer active:scale-95"
                    }`}
                >
                  {d}
                </button>
              );
            })}
            <button
              onClick={() => handleOperator("x")}
              className="h-9 rounded-xl bg-[#ecfdf5] hover:bg-[#d1fae5] text-[#059669] font-black text-base flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
            >
              x
            </button>

            {/* 4, 5, 6, - */}
            {["4", "5", "6"].map((d) => {
              const isDisabled = programmerBase === "BIN";
              return (
                <button
                  key={d}
                  disabled={isDisabled}
                  onClick={() => handleDigit(d)}
                  className={`h-9 rounded-xl font-black text-sm flex items-center justify-center transition shadow-2xs ${isDisabled
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 cursor-pointer active:scale-95"
                    }`}
                >
                  {d}
                </button>
              );
            })}
            <button
              onClick={() => handleOperator("-")}
              className="h-9 rounded-xl bg-[#ecfdf5] hover:bg-[#d1fae5] text-[#059669] font-black text-lg flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
            >
              -
            </button>

            {/* 1, 2, 3, + */}
            {["1", "2", "3"].map((d) => {
              const isDisabled = programmerBase === "BIN" && (d === "2" || d === "3");
              return (
                <button
                  key={d}
                  disabled={isDisabled}
                  onClick={() => handleDigit(d)}
                  className={`h-9 rounded-xl font-black text-sm flex items-center justify-center transition shadow-2xs ${isDisabled
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 cursor-pointer active:scale-95"
                    }`}
                >
                  {d}
                </button>
              );
            })}
            <button
              onClick={() => handleOperator("+")}
              className="h-9 rounded-xl bg-[#ecfdf5] hover:bg-[#d1fae5] text-[#059669] font-black text-lg flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
            >
              +
            </button>

            {/* 0, =, WordSize */}
            <button
              onClick={() => handleDigit("0")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-black text-sm flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95 col-span-2"
            >
              0
            </button>
            <button
              onClick={() =>
                setProgrammerWordSize((prev) =>
                  prev === "QWORD" ? "DWORD" : prev === "DWORD" ? "WORD" : prev === "WORD" ? "BYTE" : "QWORD"
                )
              }
              title="Toggle Word Size: QWORD, DWORD, WORD, BYTE"
              className="h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[10px] flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
            >
              {programmerWordSize}
            </button>
            <button
              onClick={handleEquals}
              className="h-9 rounded-xl bg-[#10b981] hover:bg-[#059669] active:bg-[#047857] text-white font-black text-xl flex items-center justify-center shadow-md transition cursor-pointer active:scale-95"
            >
              =
            </button>
          </div>
        </div>
      ) : (
        /* Standard Keypad Grid (Default) */
        <div className="p-3 bg-white border-t border-gray-200/80 grid grid-cols-4 gap-2 shrink-0">
          {/* Row 1 */}
          <button
            onClick={handleClearAll}
            title="Clear All"
            className="h-11 rounded-2xl bg-[#fff1f2] hover:bg-[#ffe4e6] text-[#e11d48] font-bold text-sm flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleBackspace}
            title="Backspace"
            className="h-11 rounded-2xl bg-[#f1f5f9] hover:bg-[#e2e8f0] text-gray-700 font-bold text-sm flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
          >
            ←
          </button>

          <button
            onClick={() => handleOperator("/")}
            className="h-11 rounded-2xl bg-[#ecfdf5] hover:bg-[#d1fae5] text-[#059669] font-black text-lg flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
          >
            /
          </button>

          <button
            onClick={() => handleOperator("x")}
            className="h-11 rounded-2xl bg-[#ecfdf5] hover:bg-[#d1fae5] text-[#059669] font-black text-lg flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
          >
            x
          </button>

          {/* Row 2: 7, 8, 9, - */}
          <button
            onClick={() => handleDigit("7")}
            className="h-11 rounded-2xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-black text-base flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
          >
            7
          </button>
          <button
            onClick={() => handleDigit("8")}
            className="h-11 rounded-2xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-black text-base flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
          >
            8
          </button>
          <button
            onClick={() => handleDigit("9")}
            className="h-11 rounded-2xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-black text-base flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
          >
            9
          </button>
          <button
            onClick={() => handleOperator("-")}
            className="h-11 rounded-2xl bg-[#ecfdf5] hover:bg-[#d1fae5] text-[#059669] font-black text-xl flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
          >
            -
          </button>

          {/* Row 3: 4, 5, 6, + */}
          <button
            onClick={() => handleDigit("4")}
            className="h-11 rounded-2xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-black text-base flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
          >
            4
          </button>
          <button
            onClick={() => handleDigit("5")}
            className="h-11 rounded-2xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-black text-base flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
          >
            5
          </button>
          <button
            onClick={() => handleDigit("6")}
            className="h-11 rounded-2xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-black text-base flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
          >
            6
          </button>
          <button
            onClick={() => handleOperator("+")}
            className="h-11 rounded-2xl bg-[#ecfdf5] hover:bg-[#d1fae5] text-[#059669] font-black text-xl flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
          >
            +
          </button>

          {/* Row 4: 1, 2, 3 and tall = spanning 2 rows */}
          <button
            onClick={() => handleDigit("1")}
            className="h-11 rounded-2xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-black text-base flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
          >
            1
          </button>
          <button
            onClick={() => handleDigit("2")}
            className="h-11 rounded-2xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-black text-base flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
          >
            2
          </button>
          <button
            onClick={() => handleDigit("3")}
            className="h-11 rounded-2xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-black text-base flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
          >
            3
          </button>

          {/* Tall Green Equals Button spanning row 4 & 5 */}
          <button
            onClick={handleEquals}
            className="row-span-2 rounded-2xl bg-[#10b981] hover:bg-[#059669] active:bg-[#047857] text-white font-black text-2xl flex items-center justify-center shadow-md transition cursor-pointer active:scale-95"
          >
            =
          </button>

          {/* Row 5: % (Percentage calculation), 0, . */}
          <button
            onClick={handlePercentage}
            title="Percentage (%)"
            className="h-11 rounded-2xl bg-gray-50 hover:bg-emerald-50 border border-gray-200 text-gray-800 hover:text-emerald-700 font-black text-lg flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
          >
            %
          </button>

          <button
            onClick={() => handleDigit("0")}
            className="h-11 rounded-2xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-black text-base flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
          >
            0
          </button>

          <button
            onClick={() => handleDigit(".")}
            className="h-11 rounded-2xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-black text-xl flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
          >
            .
          </button>
        </div>
      )}
    </>
  );
};
