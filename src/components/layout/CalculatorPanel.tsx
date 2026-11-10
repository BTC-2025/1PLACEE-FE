"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  History,
  Share2,
  Trash2,
  Percent,
  Tag,
  Globe,
  ArrowRightLeft,
  Check,
  RotateCcw,
  Plus,
  Minus,
  Sparkles,
  Users,
  ChevronDown,
  ChevronRight,
  Flame,
  Scale,
  Compass,
  Layers,
  Thermometer,
  Zap,
  Activity,
  HardDrive,
  Gauge,
  Clock,
  Split,
  Copy,
} from "lucide-react";
import { useQuickSidebarStore } from "@/stores/quickSidebarStore";

interface TapeStep {
  id: string;
  label: string; // e.g. "BASE VALUE", "+ 8", "x 2", "GST 18%"
  operator?: string; // "+" | "-" | "x" | "/" | ""
  operand: number;
  subtotal: number;
  note?: string;
}

interface CalculationHistoryItem {
  id: string;
  title: string;
  timestamp: string;
  steps: TapeStep[];
  finalResult: number;
}

// Multi-person Compare Item
interface ComparePerson {
  id: string;
  name: string;
  value: number;
  description: string;
}

// Unit Converters List (from Image 2)
const CONVERTER_CATEGORIES = [
  { id: "currency", label: "Currency (INR, USD, EUR, GBP, AED, JPY)", icon: <Globe className="w-4 h-4" /> },
  { id: "volume", label: "Volume (L, mL, Gallon, Fl Oz)", icon: <Layers className="w-4 h-4" /> },
  { id: "length", label: "Length (m, cm, km, ft, inch, mile)", icon: <Scale className="w-4 h-4" /> },
  { id: "weight", label: "Weight and mass (kg, g, mg, lb, oz)", icon: <Scale className="w-4 h-4" /> },
  { id: "temperature", label: "Temperature (°C, °F, K)", icon: <Thermometer className="w-4 h-4" /> },
  { id: "energy", label: "Energy (Joules, kcal, Wh)", icon: <Zap className="w-4 h-4" /> },
  { id: "area", label: "Area (sq ft, sq m, acre, hectare)", icon: <Compass className="w-4 h-4" /> },
  { id: "speed", label: "Speed (km/h, m/s, mph, knot)", icon: <Activity className="w-4 h-4" /> },
  { id: "time", label: "Time (sec, min, hr, day, week)", icon: <Clock className="w-4 h-4" /> },
  { id: "power", label: "Power (Watt, kW, Horsepower)", icon: <Zap className="w-4 h-4" /> },
  { id: "data", label: "Data (B, KB, MB, GB, TB)", icon: <HardDrive className="w-4 h-4" /> },
  { id: "pressure", label: "Pressure (Pa, bar, psi, atm)", icon: <Gauge className="w-4 h-4" /> },
  { id: "angle", label: "Angle (degree, radian, gradian)", icon: <Compass className="w-4 h-4" /> },
];

export const CalculatorPanel: React.FC = () => {
  const { activePanel, closePanel } = useQuickSidebarStore();

  // Core Calculator State
  const [currentInput, setCurrentInput] = useState<string>("0");
  const [baseValue, setBaseValue] = useState<number | null>(8);
  const [tapeSteps, setTapeSteps] = useState<TapeStep[]>([
    { id: "step-1", label: "BASE VALUE", operand: 8, subtotal: 8 },
    { id: "step-2", label: "+ 8", operator: "+", operand: 8, subtotal: 16 },
  ]);
  const [runningTotal, setRunningTotal] = useState<number>(16);
  const [pendingOperator, setPendingOperator] = useState<string | null>(null);

  // History & Modal Overlays
  const [historyList, setHistoryList] = useState<CalculationHistoryItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("1place_calc_history");
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: "hist-1",
        title: "Retail Billing & Tax",
        timestamp: "Today, 11:20 AM",
        steps: [
          { id: "s1", label: "BASE VALUE", operand: 500, subtotal: 500 },
          { id: "s2", label: "+ 18% GST", operator: "+", operand: 90, subtotal: 590 },
        ],
        finalResult: 590,
      },
    ];
  });

  const [activeModal, setActiveModal] = useState<
    "history" | "gst" | "discount" | "currency" | "compare" | "converters" | "share" | null
  >(null);

  const [copyFeedback, setCopyFeedback] = useState(false);

  // GST State
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstType, setGstType] = useState<"add" | "remove">("add");

  // Discount State
  const [discountPercent, setDiscountPercent] = useState<number>(10);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [discountMode, setDiscountMode] = useState<"percent" | "flat">("percent");

  // Currency Converter State (INR Base)
  const [currencyFrom, setCurrencyFrom] = useState<string>("INR");
  const [currencyTo, setCurrencyTo] = useState<string>("USD");
  const [currencyAmount, setCurrencyAmount] = useState<number>(1000);
  const CURRENCY_RATES: Record<string, number> = {
    INR: 1,
    USD: 0.0116,
    EUR: 0.0108,
    GBP: 0.0092,
    AED: 0.0426,
    JPY: 1.78,
  };

  // Compare & Multi-Person Split State (up to 5+ persons)
  const [compareItems, setCompareItems] = useState<ComparePerson[]>([
    { id: "p1", name: "Person 1 (Rajesh)", value: 4500, description: "Flight & Travel" },
    { id: "p2", name: "Person 2 (Priya)", value: 3200, description: "Hotel Accommodation" },
    { id: "p3", name: "Person 3 (Karthik)", value: 1800, description: "Food & Meals" },
    { id: "p4", name: "Person 4 (Anitha)", value: 2400, description: "Sightseeing Tickets" },
    { id: "p5", name: "Person 5 (Vinoth)", value: 1100, description: "Local Cabs & Fuel" },
  ]);

  // Unit Converter State
  const [selectedConverterId, setSelectedConverterId] = useState<string>("temperature");
  const [converterInput, setConverterInput] = useState<number>(100);
  const [converterFromUnit, setConverterFromUnit] = useState<string>("C");
  const [converterToUnit, setConverterToUnit] = useState<string>("F");

  // Save history to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("1place_calc_history", JSON.stringify(historyList));
      } catch (e) {
        console.error(e);
      }
    }
  }, [historyList]);

  if (activePanel !== "calculator") return null;

  // Format INR Currency with 2 decimal places: ₹16.00
  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(val);
  };

  // Number Button Click
  const handleDigit = (digit: string) => {
    if (digit === "." && currentInput.includes(".")) return;
    if (currentInput === "0" && digit !== ".") {
      setCurrentInput(digit);
    } else {
      setCurrentInput((prev) => prev + digit);
    }
  };

  // Backspace
  const handleBackspace = () => {
    if (currentInput.length <= 1) {
      setCurrentInput("0");
    } else {
      setCurrentInput((prev) => prev.slice(0, -1));
    }
  };

  // Clear / Reset All
  const handleClearAll = () => {
    setCurrentInput("0");
    setBaseValue(null);
    setTapeSteps([]);
    setRunningTotal(0);
    setPendingOperator(null);
  };

  // Operator Click (+, -, x, /)
  const handleOperator = (op: string) => {
    const inputNum = parseFloat(currentInput);

    if (baseValue === null) {
      setBaseValue(inputNum);
      setRunningTotal(inputNum);
      setTapeSteps([
        {
          id: `step-${Date.now()}`,
          label: "BASE VALUE",
          operand: inputNum,
          subtotal: inputNum,
        },
      ]);
    } else {
      // Calculate previous operation
      const currentOp = pendingOperator || op;
      let newTotal = runningTotal;

      if (currentOp === "+") newTotal += inputNum;
      else if (currentOp === "-") newTotal -= inputNum;
      else if (currentOp === "x" || currentOp === "*") newTotal *= inputNum;
      else if (currentOp === "/") newTotal = inputNum !== 0 ? newTotal / inputNum : newTotal;

      setRunningTotal(newTotal);
      setTapeSteps((prev) => [
        ...prev,
        {
          id: `step-${Date.now()}`,
          label: `${currentOp} ${inputNum}`,
          operator: currentOp,
          operand: inputNum,
          subtotal: newTotal,
        },
      ]);
    }

    setPendingOperator(op);
    setCurrentInput("0");
  };

  // Equals (=)
  const handleEquals = () => {
    if (!pendingOperator && baseValue === null) return;
    const inputNum = parseFloat(currentInput);

    let newTotal = runningTotal;
    const op = pendingOperator || "+";

    if (inputNum !== 0 || currentInput !== "0") {
      if (op === "+") newTotal += inputNum;
      else if (op === "-") newTotal -= inputNum;
      else if (op === "x" || op === "*") newTotal *= inputNum;
      else if (op === "/") newTotal = inputNum !== 0 ? newTotal / inputNum : newTotal;

      const finalSteps: TapeStep[] = [
        ...tapeSteps,
        {
          id: `step-${Date.now()}`,
          label: `${op} ${inputNum}`,
          operator: op,
          operand: inputNum,
          subtotal: newTotal,
        },
      ];

      setRunningTotal(newTotal);
      setTapeSteps(finalSteps);

      // Save to History
      const newHistoryItem: CalculationHistoryItem = {
        id: `calc-${Date.now()}`,
        title: `Calc Result: ${formatINR(newTotal)}`,
        timestamp: "Just now",
        steps: finalSteps,
        finalResult: newTotal,
      };
      setHistoryList((prev) => [newHistoryItem, ...prev]);
    }

    setPendingOperator(null);
    setCurrentInput("0");
  };

  // Apply GST
  const handleApplyGST = () => {
    const current = runningTotal > 0 ? runningTotal : parseFloat(currentInput) || 100;
    const gstVal = (current * gstRate) / 100;
    const finalVal = gstType === "add" ? current + gstVal : current - gstVal;

    setTapeSteps((prev) => [
      ...prev,
      {
        id: `gst-${Date.now()}`,
        label: `${gstType === "add" ? "+" : "-"} GST (${gstRate}%)`,
        operand: gstVal,
        subtotal: finalVal,
      },
    ]);
    setRunningTotal(finalVal);
    setActiveModal(null);
  };

  // Apply Discount
  const handleApplyDiscount = () => {
    const current = runningTotal > 0 ? runningTotal : parseFloat(currentInput) || 100;
    let discVal = 0;
    if (discountMode === "percent") {
      discVal = (current * discountPercent) / 100;
    } else {
      discVal = discountAmount;
    }
    const finalVal = Math.max(0, current - discVal);

    setTapeSteps((prev) => [
      ...prev,
      {
        id: `disc-${Date.now()}`,
        label: `- Discount (${discountMode === "percent" ? `${discountPercent}%` : `₹${discountAmount}`})`,
        operand: discVal,
        subtotal: finalVal,
      },
    ]);
    setRunningTotal(finalVal);
    setActiveModal(null);
  };

  // Restore calculation from history
  const handleRestoreHistory = (item: CalculationHistoryItem) => {
    setTapeSteps(item.steps);
    setRunningTotal(item.finalResult);
    setBaseValue(item.steps[0]?.operand ?? 0);
    setCurrentInput("0");
    setActiveModal(null);
  };

  // Delete single history
  const handleDeleteHistory = (id: string) => {
    setHistoryList((prev) => prev.filter((h) => h.id !== id));
  };

  // Clear all history
  const handleClearAllHistory = () => {
    setHistoryList([]);
  };

  // Copy calculation tape breakdown
  const handleCopyBreakdown = () => {
    const summary = tapeSteps
      .map((s) => `${s.label} = ${formatINR(s.subtotal)}`)
      .join("\n");
    const fullText = `*1PLACE Beta Calc Summary*\n${summary}\n------------------\n*Final Total: ${formatINR(
      runningTotal
    )}*`;

    navigator.clipboard.writeText(fullText);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  // Multi-person compare calculations
  const totalCompareValue = compareItems.reduce((acc, p) => acc + p.value, 0);
  const avgCompareValue = compareItems.length ? totalCompareValue / compareItems.length : 0;

  return (
    <aside
      aria-label="Calculator Panel"
      className="fixed right-[60px] sm:right-[62px] top-[60px] bottom-0 w-[350px] sm:w-[360px] bg-[#f8fafc] border-l border-[#d0e5fb] shadow-[-6px_0_24px_rgba(0,0,0,0.08)] z-[60] flex flex-col select-none overflow-hidden animate-in slide-in-from-right duration-200"
    >
      {/* 1. Header Bar: Calculator Title + Close Button */}
      <div className="h-[52px] px-5 flex items-center justify-between border-b border-gray-100 bg-white shrink-0">
        <h2 className="text-[17px] font-black text-[#111827] tracking-tight">
          Calculator
        </h2>
        <button
          onClick={closePanel}
          title="Close Calculator"
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
        >
          <X className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>

      {/* 2. Sub-Header: # BETA CALC with Action Icons (History, Share, Delete/Reset) */}
      <div className="px-5 py-3 flex items-center justify-between border-b border-gray-200/60 bg-white shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[#10b981] font-black text-lg">#</span>
          <h3 className="text-[15px] font-black text-[#0f172a] tracking-wide">
            BETA CALC
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500">
          {/* History */}
          <button
            onClick={() => setActiveModal("history")}
            title="Calculation History & Restore"
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition cursor-pointer"
          >
            <History className="w-4 h-4 stroke-[2]" />
          </button>

          {/* Share Breakdown */}
          <button
            onClick={() => setActiveModal("share")}
            title="Share Calculation Breakdown"
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition cursor-pointer"
          >
            <Share2 className="w-4 h-4 stroke-[2]" />
          </button>

          {/* Delete / Clear Tape */}
          <button
            onClick={handleClearAll}
            title="Clear Current Calculation"
            className="w-8 h-8 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-500 flex items-center justify-center transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* 3. Tape Running List Area (Scrollable steps matching Image 1) */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-3 bg-white">
        {tapeSteps.map((step, idx) => (
          <div
            key={step.id}
            className={`flex items-baseline justify-between border-b border-gray-100 pb-2 ${idx === tapeSteps.length - 1 ? "border-b-0" : ""
              }`}
          >
            <div>
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">
                {step.label}
              </span>
              <span className="text-[15px] font-bold text-gray-800">
                {step.operator ? `${step.operator} ${step.operand}` : step.operand}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-gray-900 tracking-tight">
                {formatINR(step.subtotal)}
              </span>
            </div>
          </div>
        ))}

        {/* Current Active Input Indicator */}
        <div className="pt-2 border-t border-dashed border-gray-200">
          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
            CURRENT INPUT
          </span>
          <div className="text-right">
            <span className="text-3xl font-black text-gray-900 tracking-tight">
              {currentInput}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Top Quick Feature Pill Buttons (GST, Discount, INR, Compare) matching Image 1 */}
      <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-200/80 grid grid-cols-4 gap-1.5 shrink-0">
        {/* GST Pill */}
        <button
          onClick={() => setActiveModal("gst")}
          className="h-8 rounded-full bg-[#e8fbf3] hover:bg-[#d0f5e5] border border-[#a7f3d0] text-[#059669] text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
        >
          <span className="text-[11px]">%</span>
          <span>GST</span>
        </button>

        {/* Discount Pill */}
        <button
          onClick={() => setActiveModal("discount")}
          className="h-8 rounded-full bg-[#fef7ee] hover:bg-[#fdeed9] border border-[#fed7aa] text-[#d97706] text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
        >
          <Tag className="w-3 h-3" />
          <span>Discount</span>
        </button>

        {/* INR Currency Pill */}
        <button
          onClick={() => setActiveModal("currency")}
          className="h-8 rounded-full bg-[#eff4fe] hover:bg-[#dce7fe] border border-[#bfdbfe] text-[#2563eb] text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
        >
          <Globe className="w-3 h-3" />
          <span>INR</span>
        </button>

        {/* Compare Pill */}
        <button
          onClick={() => setActiveModal("compare")}
          className="h-8 rounded-full bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
        >
          <ArrowRightLeft className="w-3 h-3" />
          <span>Compare</span>
        </button>
      </div>

      {/* 5. Keypad Grid: 4x5 matching Image 1 exactly */}
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

        {/* Row 5: SCI (Open All Converters), 0, . */}
        <button
          onClick={() => setActiveModal("converters")}
          title="All Converters & Tools"
          className="h-11 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-extrabold text-xs flex items-center justify-center transition cursor-pointer shadow-2xs active:scale-95"
        >
          SCI
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

      {/* 6. Bottom Banner: TAPE RUNNING TOTAL in dark navbar matching Image 1 */}
      <div className="bg-[#0f172a] px-5 py-3 flex items-center justify-between text-white shrink-0">
        <div>
          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">
            TAPE RUNNING TOTAL
          </span>
          <span className="text-2xl font-black text-[#10b981] tracking-tight">
            {formatINR(runningTotal)}
          </span>
        </div>

        <button
          onClick={handleCopyBreakdown}
          title="Copy Total"
          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-200 flex items-center gap-1 transition"
        >
          {copyFeedback ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* ================================================================= */}
      {/* MODAL 1: GST CALCULATOR POPUP */}
      {/* ================================================================= */}
      {activeModal === "gst" && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl p-5 shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-gray-900">
                GST Calculator (India)
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Base Amount */}
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex justify-between items-center">
              <span className="text-xs text-gray-500 font-bold">Calculation Amount:</span>
              <span className="text-base font-black text-gray-900">
                {formatINR(runningTotal || parseFloat(currentInput) || 100)}
              </span>
            </div>

            {/* GST Slab Selector */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-gray-700">Choose GST Rate (%):</span>
              <div className="grid grid-cols-4 gap-2">
                {[5, 12, 18, 28].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setGstRate(rate)}
                    className={`py-2 rounded-xl font-black text-xs border transition ${gstRate === rate
                        ? "bg-[#10b981] text-white border-[#10b981]"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                      }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            {/* Add or Remove GST */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setGstType("add")}
                className={`py-2 rounded-xl text-xs font-bold border transition ${gstType === "add"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-200"
                  }`}
              >
                + Add GST
              </button>
              <button
                onClick={() => setGstType("remove")}
                className={`py-2 rounded-xl text-xs font-bold border transition ${gstType === "remove"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-200"
                  }`}
              >
                - Remove GST (Inclusive)
              </button>
            </div>

            <button
              onClick={handleApplyGST}
              className="w-full py-2.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white font-bold text-sm shadow-sm transition"
            >
              Apply to Running Total
            </button>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL 2: DISCOUNT CALCULATOR POPUP */}
      {/* ================================================================= */}
      {activeModal === "discount" && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl p-5 shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-gray-900">
                Discount Calculator
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mode: Percentage vs Flat */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setDiscountMode("percent")}
                className={`py-1.5 rounded-xl text-xs font-bold border transition ${discountMode === "percent"
                    ? "bg-[#d97706] text-white border-[#d97706]"
                    : "bg-white text-gray-700 border-gray-200"
                  }`}
              >
                Percentage (%)
              </button>
              <button
                onClick={() => setDiscountMode("flat")}
                className={`py-1.5 rounded-xl text-xs font-bold border transition ${discountMode === "flat"
                    ? "bg-[#d97706] text-white border-[#d97706]"
                    : "bg-white text-gray-700 border-gray-200"
                  }`}
              >
                Flat Amount (₹)
              </button>
            </div>

            {discountMode === "percent" ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-gray-700">
                  <span>Discount: {discountPercent}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="90"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-full accent-[#d97706]"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-700">Enter Discount Amount:</span>
                <input
                  type="number"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(Number(e.target.value))}
                  placeholder="₹ 100"
                  className="w-full px-3 py-2 border rounded-xl text-sm font-bold text-gray-800 outline-none"
                />
              </div>
            )}

            <button
              onClick={handleApplyDiscount}
              className="w-full py-2.5 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-sm shadow-sm transition"
            >
              Apply Discount
            </button>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL 3: CURRENCY CONVERTER */}
      {/* ================================================================= */}
      {activeModal === "currency" && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl p-5 shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-gray-900">
                INR Currency Converter
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-600">Amount (INR):</span>
              <input
                type="number"
                value={currencyAmount}
                onChange={(e) => setCurrencyAmount(Number(e.target.value))}
                className="w-full p-2.5 border rounded-xl font-bold text-gray-800 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.keys(CURRENCY_RATES).map((curr) => {
                const converted = (currencyAmount * CURRENCY_RATES[curr]).toFixed(2);
                return (
                  <div
                    key={curr}
                    className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 flex flex-col"
                  >
                    <span className="font-extrabold text-blue-600">{curr}</span>
                    <span className="text-sm font-black text-gray-900 mt-0.5">
                      {converted}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                setTapeSteps((prev) => [
                  ...prev,
                  {
                    id: `curr-${Date.now()}`,
                    label: `Converted to ${currencyTo}`,
                    operand: currencyAmount,
                    subtotal: currencyAmount,
                  },
                ]);
                setActiveModal(null);
              }}
              className="w-full py-2.5 rounded-xl bg-[#2563eb] text-white font-bold text-xs"
            >
              Use Value in Calculator
            </button>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL 4: MULTI-PERSON COMPARE & EXPENSE SPLIT (5+ Persons) */}
      {/* ================================================================= */}
      {activeModal === "compare" && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto no-scrollbar animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-gray-900 leading-none">
                  Compare & Split Expenses
                </h3>
                <span className="text-[11px] text-gray-500">
                  Compare 5+ people, difference & split share
                </span>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Total & Average Split Summary */}
            <div className="grid grid-cols-2 gap-2 bg-[#f0fdf4] border border-[#bbf7d0] p-3 rounded-2xl text-xs">
              <div>
                <span className="text-gray-500 font-bold block">Total Amount:</span>
                <span className="text-base font-black text-gray-900">
                  {formatINR(totalCompareValue)}
                </span>
              </div>
              <div>
                <span className="text-gray-500 font-bold block">Equal Split ({compareItems.length} people):</span>
                <span className="text-base font-black text-[#059669]">
                  {formatINR(avgCompareValue)}/person
                </span>
              </div>
            </div>

            {/* People List with Name, Description & Value */}
            <div className="space-y-2">
              {compareItems.map((item, index) => {
                const diffFromAvg = item.value - avgCompareValue;
                const percentage = totalCompareValue
                  ? ((item.value / totalCompareValue) * 100).toFixed(1)
                  : "0";

                return (
                  <div
                    key={item.id}
                    className="p-3 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCompareItems((prev) =>
                            prev.map((p) => (p.id === item.id ? { ...p, name: val } : p))
                          );
                        }}
                        className="text-xs font-bold text-gray-900 flex-1 outline-none border-b border-transparent focus:border-blue-400"
                      />
                      <input
                        type="number"
                        value={item.value}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setCompareItems((prev) =>
                            prev.map((p) => (p.id === item.id ? { ...p, value: val } : p))
                          );
                        }}
                        className="w-24 text-right text-xs font-black text-gray-900 outline-none border rounded px-1.5 py-0.5"
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-gray-500">
                      <input
                        type="text"
                        placeholder="Description (e.g. Travel, Dinner)"
                        value={item.description}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCompareItems((prev) =>
                            prev.map((p) => (p.id === item.id ? { ...p, description: val } : p))
                          );
                        }}
                        className="flex-1 outline-none text-gray-600 italic text-[11px]"
                      />
                      <span className="font-extrabold text-blue-600">{percentage}%</span>
                    </div>

                    <div className="text-[10px] font-bold text-gray-400 flex justify-between pt-1 border-t border-gray-100">
                      <span>
                        Status:{" "}
                        {diffFromAvg >= 0 ? (
                          <span className="text-emerald-600">
                            Gets back {formatINR(diffFromAvg)}
                          </span>
                        ) : (
                          <span className="text-red-500">
                            Owes {formatINR(Math.abs(diffFromAvg))}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Person Button */}
            <button
              onClick={() => {
                setCompareItems((prev) => [
                  ...prev,
                  {
                    id: `p-${Date.now()}`,
                    name: `Person ${prev.length + 1}`,
                    value: 1000,
                    description: "Misc Expense",
                  },
                ]);
              }}
              className="w-full py-2 rounded-xl border border-dashed border-gray-300 text-gray-600 hover:text-blue-600 hover:border-blue-300 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Another Person</span>
            </button>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL 5: ALL CONVERTERS LIST (Image 2 list) */}
      {/* ================================================================= */}
      {activeModal === "converters" && (
        <div className="absolute inset-0 z-50 bg-white flex flex-col animate-in fade-in duration-150">
          <div className="h-[52px] px-5 flex items-center justify-between border-b border-gray-100">
            <h3 className="text-base font-black text-gray-900">
              Converter Tools
            </h3>
            <button
              onClick={() => setActiveModal(null)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-1">
            <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider px-3 py-1 block">
              CONVERTER
            </span>
            {CONVERTER_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  if (cat.id === "currency") {
                    setActiveModal("currency");
                  } else {
                    alert(`${cat.label} active.`);
                  }
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-gray-100/80 transition text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gray-50 group-hover:bg-blue-50 text-gray-600 group-hover:text-blue-600 flex items-center justify-center transition">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-bold text-gray-800">
                    {cat.label}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL 6: CALCULATION HISTORY & RESTORE */}
      {/* ================================================================= */}
      {activeModal === "history" && (
        <div className="absolute inset-0 z-50 bg-white flex flex-col animate-in fade-in duration-150">
          <div className="h-[52px] px-5 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-black text-gray-900">
                Calculation History
              </h3>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleClearAllHistory}
                title="Clear All History"
                className="text-xs text-red-500 font-bold hover:bg-red-50 px-2 py-1 rounded"
              >
                Clear All
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
            {historyList.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-xs">
                No calculation history yet.
              </div>
            ) : (
              historyList.map((hist) => (
                <div
                  key={hist.id}
                  className="p-3.5 rounded-2xl border border-gray-200 bg-white shadow-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-gray-900">
                      {hist.title}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {hist.timestamp}
                    </span>
                  </div>

                  <div className="text-[11px] text-gray-600 space-y-0.5">
                    {hist.steps.map((s) => (
                      <div key={s.id} className="flex justify-between">
                        <span>{s.label}</span>
                        <span className="font-bold">{formatINR(s.subtotal)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => handleRestoreHistory(hist)}
                      className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-bold transition flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Restore to Calc</span>
                    </button>
                    <button
                      onClick={() => handleDeleteHistory(hist.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL 7: SHARE CALCULATION BREAKDOWN */}
      {/* ================================================================= */}
      {activeModal === "share" && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl p-5 shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-gray-900">
                Share Calculation Breakdown
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200 text-xs font-mono space-y-1 text-gray-700 whitespace-pre-wrap max-h-48 overflow-y-auto">
              <div>*1PLACE Beta Calc Breakdown*</div>
              <div className="text-gray-400">--------------------------</div>
              {tapeSteps.map((s) => (
                <div key={s.id} className="flex justify-between">
                  <span>{s.label}</span>
                  <span className="font-bold">{formatINR(s.subtotal)}</span>
                </div>
              ))}
              <div className="text-gray-400">--------------------------</div>
              <div className="font-bold text-gray-900 text-sm flex justify-between">
                <span>Total:</span>
                <span className="text-[#059669]">{formatINR(runningTotal)}</span>
              </div>
            </div>

            <button
              onClick={handleCopyBreakdown}
              className="w-full py-2.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
            >
              {copyFeedback ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Breakdown Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Formatted Share Message</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
