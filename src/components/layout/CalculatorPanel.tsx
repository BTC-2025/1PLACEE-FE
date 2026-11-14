"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  History,
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
  Calculator as CalcIcon,
  FlaskConical,
  LineChart,
  Code,
  Calendar,
  Edit2,
  HeartPulse,
} from "lucide-react";
import { useQuickSidebarStore } from "@/stores/quickSidebarStore";

import { CalculatorHeaderDisplay } from "./CalculatorHeaderDisplay";
import { executeScientificOp, executeBitwiseOp } from "./calculatorSciOps";
import { CalculatorKeypads } from "./CalculatorKeypads";
import { CalculatorModalsPart1 } from "./CalculatorModalsPart1";
import { CalculatorModalsPart2 } from "./CalculatorModalsPart2";
import {
  TapeStep,
  CalculationHistoryItem,
  ComparePerson,
  CONVERTER_CATEGORIES,
  CONVERTER_CONFIG,
} from "./calculatorData";
export const CalculatorPanel: React.FC = () => {
  const { activePanel, closePanel } = useQuickSidebarStore();

  // Core Calculator State
  const [currentInput, setCurrentInput] = useState<string>("");
  const [baseValue, setBaseValue] = useState<number | null>(null);
  const [tapeSteps, setTapeSteps] = useState<TapeStep[]>([]);
  const [runningTotal, setRunningTotal] = useState<number>(0);
  const [pendingOperator, setPendingOperator] = useState<string | null>(null);
  const [expressionFormula, setExpressionFormula] = useState<string>("");
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [isOperatorJustPressed, setIsOperatorJustPressed] = useState<boolean>(false);

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
    "converters" |
    "converter-detail" |
    "history" |
    "gst" |
    "discount" |
    "currency" |
    "compare" |
    "share" |
    "bmi" |
    null
  >(null);

  const [copyFeedback, setCopyFeedback] = useState(false);
  const [copiedHistoryId, setCopiedHistoryId] = useState<string | null>(null);

  // BMI Calculator State (Direct Unit Selectors: Height cm / ft, Weight kg / lbs)
  const [bmiGender, setBmiGender] = useState<"male" | "female">("male");
  const [bmiAge, setBmiAge] = useState<string>("25");
  const [bmiHeightUnit, setBmiHeightUnit] = useState<"cm" | "ft">("cm");
  const [bmiWeightUnit, setBmiWeightUnit] = useState<"kg" | "lbs">("kg");
  const [bmiHeightCm, setBmiHeightCm] = useState<string>("170");
  const [bmiHeightFeet, setBmiHeightFeet] = useState<string>("5");
  const [bmiHeightInches, setBmiHeightInches] = useState<string>("7");
  const [bmiWeightKg, setBmiWeightKg] = useState<string>("68");
  const [bmiWeightLbs, setBmiWeightLbs] = useState<string>("150");
  // GST State
  const [gstOriginalPrice, setGstOriginalPrice] = useState<string>("");
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstType, setGstType] = useState<"add" | "remove">("add");

  // Discount State
  const [discountOriginalPrice, setDiscountOriginalPrice] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(10);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [discountMode, setDiscountMode] = useState<"percent" | "flat">("percent");

  // Calculation Note / Tag State (e.g., "Grocery", "Electricity Bill", etc.)
  const [calcNote, setCalcNote] = useState<string>("");

  // Editing History Item State
  const [editingHistoryId, setEditingHistoryId] = useState<string | null>(null);
  const [editingHistoryTitle, setEditingHistoryTitle] = useState<string>("");

  // Compare & Multi-Person Split State (defaults to 2 items with clean standard empty values)
  const [compareTotalBill, setCompareTotalBill] = useState<string>("");
  const [compareTab, setCompareTab] = useState<"product" | "split">("product");
  const [compareItems, setCompareItems] = useState<ComparePerson[]>([
    { id: "p1", name: "", value: 0, description: "" },
    { id: "p2", name: "", value: 0, description: "" },
  ]);

  // Expanded history item IDs
  const [expandedHistoryIds, setExpandedHistoryIds] = useState<Record<string, boolean>>({});

  // Helper to format real date & time (e.g. "11 Nov 2026, 12:45 PM")
  const formatDateTime = () => {
    const d = new Date();
    return d.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Dropdown states for Quick Action Pills
  const [gstDropdownOpen, setGstDropdownOpen] = useState(false);
  const [curDropdownOpen, setCurDropdownOpen] = useState(false);
  const [sciDropdownOpen, setSciDropdownOpen] = useState(false);
  const [activeCalcMode, setActiveCalcMode] = useState<"standard" | "scientific" | "programmer" | "date">("standard");

  // Date calculation state
  const [dateFrom, setDateFrom] = useState<string>("2026-11-11");
  const [dateTo, setDateTo] = useState<string>("2026-12-25");
  const [timeFrom, setTimeFrom] = useState<string>("09:00");
  const [timeTo, setTimeTo] = useState<string>("18:30");
  const [includeTimeInDiff, setIncludeTimeInDiff] = useState<boolean>(true);

  // Programmer Mode state
  const [programmerWordSize, setProgrammerWordSize] = useState<"QWORD" | "DWORD" | "WORD" | "BYTE">("QWORD");
  const [programmerBase, setProgrammerBase] = useState<"HEX" | "DEC" | "OCT" | "BIN">("DEC");

  // Scientific Mode state (Images 1-4)
  const [sciAngleMode, setSciAngleMode] = useState<"DEG" | "RAD" | "GRAD">("DEG");
  const [sciFeMode, setSciFeMode] = useState<boolean>(false);
  const [sci2nd, setSci2nd] = useState<boolean>(false);
  const [sciHyp, setSciHyp] = useState<boolean>(false);
  const [sciMemory, setSciMemory] = useState<number>(0);
  const [sciTrigOpen, setSciTrigOpen] = useState<boolean>(false);
  const [sciFuncOpen, setSciFuncOpen] = useState<boolean>(false);

  // Currency Converter State (Supports all popular country currencies)
  const [currencyFrom, setCurrencyFrom] = useState<string>("INR");
  const [currencyTo, setCurrencyTo] = useState<string>("USD");
  const [currencyAmount, setCurrencyAmount] = useState<number>(1000);
  const CURRENCY_RATES: Record<string, { rate: number; name: string; symbol: string }> = {
    INR: { rate: 1, name: "Indian Rupee", symbol: "₹" },
    USD: { rate: 0.0116, name: "US Dollar", symbol: "$" },
    EUR: { rate: 0.0108, name: "Euro", symbol: "€" },
    GBP: { rate: 0.0092, name: "British Pound", symbol: "£" },
    AED: { rate: 0.0426, name: "UAE Dirham", symbol: "AED" },
    SAR: { rate: 0.0435, name: "Saudi Riyal", symbol: "SAR" },
    SGD: { rate: 0.0157, name: "Singapore Dollar", symbol: "S$" },
    CAD: { rate: 0.0163, name: "Canadian Dollar", symbol: "CA$" },
    AUD: { rate: 0.0182, name: "Australian Dollar", symbol: "A$" },
    JPY: { rate: 1.78, name: "Japanese Yen", symbol: "¥" },
    CNY: { rate: 0.084, name: "Chinese Yuan", symbol: "¥" },
    MYR: { rate: 0.052, name: "Malaysian Ringgit", symbol: "RM" },
    THB: { rate: 0.40, name: "Thai Baht", symbol: "฿" },
    KWD: { rate: 0.00356, name: "Kuwaiti Dinar", symbol: "KD" },
    QAR: { rate: 0.0422, name: "Qatari Riyal", symbol: "QR" },
    BHD: { rate: 0.00437, name: "Bahraini Dinar", symbol: "BD" },
    OMR: { rate: 0.00446, name: "Omani Rial", symbol: "OMR" },
    NZD: { rate: 0.0201, name: "New Zealand Dollar", symbol: "NZ$" },
    CHF: { rate: 0.0105, name: "Swiss Franc", symbol: "CHF" },
    ZAR: { rate: 0.21, name: "South African Rand", symbol: "R" },
  };

  // Unit Converter State
  const [selectedConverterId, setSelectedConverterId] = useState<string>("length");
  const [converterInput, setConverterInput] = useState<number>(1);
  const [converterFromUnit, setConverterFromUnit] = useState<string>("m");
  const [converterToUnit, setConverterToUnit] = useState<string>("cm");

  // Save history to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("1place_calc_history", JSON.stringify(historyList));
      } catch (e) {
        console.error(e);
      }
    }
    // Close dropdowns when clicking outside
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".pill-dropdown-container")) {
        setGstDropdownOpen(false);
        setCurDropdownOpen(false);
        setSciDropdownOpen(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  if (activePanel !== "calculator") return null;

  // Format INR Currency with 2 decimal places: ₹16.00
  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(val);
  };

  // Recalculate Tape Steps & Running Total directly when user edits formula with cursor
  const handleFormulaChange = (newFormula: string) => {
    // Only allow numbers, math operators and spaces
    const clean = newFormula.replace(/[^0-9.+\-*/x\s]/gi, "");
    setExpressionFormula(clean);
    setIsCalculated(false);

    // Tokens parsing: e.g. "8 + 2 + 5 +"
    const tokens = clean.trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) {
      setTapeSteps([]);
      setRunningTotal(0);
      setPendingOperator(null);
      setBaseValue(null);
      return;
    }

    let running = 0;
    let pendingOp: string | null = null;
    const newSteps: TapeStep[] = [];

    tokens.forEach((token, idx) => {
      const isOp = ["+", "-", "x", "*", "/"].includes(token);
      if (isOp) {
        pendingOp = token === "*" ? "x" : token;
      } else {
        const num = parseFloat(token);
        if (!isNaN(num)) {
          if (idx === 0 || newSteps.length === 0) {
            running = num;
            newSteps.push({
              id: `step-0`,
              label: `${num}`,
              operand: num,
              subtotal: num,
            });
          } else {
            const op = pendingOp || "+";
            if (op === "+") running += num;
            else if (op === "-") running -= num;
            else if (op === "x" || op === "*") running *= num;
            else if (op === "/") running = num !== 0 ? running / num : running;

            newSteps.push({
              id: `step-${idx}`,
              label: `${op} ${num}`,
              operator: op,
              operand: num,
              subtotal: running,
            });
          }
        }
      }
    });

    setTapeSteps(newSteps);
    setRunningTotal(running);
    const lastToken = tokens[tokens.length - 1];
    if (["+", "-", "x", "*", "/"].includes(lastToken)) {
      setPendingOperator(lastToken === "*" ? "x" : lastToken);
    } else {
      setPendingOperator(null);
    }
  };
  const handleInputChange = (val: string) => {
    // Only allow numbers and basic math chars (., +, -, *, /)
    let sanitized = val.replace(/[^0-9.+\-*/x]/gi, "");
    // If user has a leading zero and types a digit (e.g. "05"), strip the leading zero -> "5"
    if (/^0[0-9]/.test(sanitized)) {
      sanitized = sanitized.replace(/^0+/, "");
    }

    // Check if user manually typed an operator expression like "5+" or "5 + 3 +"
    const opMatch = sanitized.match(/^(.*?)(\s*[+\-*/x]\s*)$/i);
    if (opMatch) {
      const exprBody = sanitized.trim();
      setExpressionFormula(exprBody + " ");
      const tokens = exprBody.split(/\s+/).filter(Boolean);
      let running = 0;
      let lastOp: string | null = null;
      tokens.forEach((t) => {
        if (["+", "-", "*", "x", "/"].includes(t)) {
          lastOp = t === "*" ? "x" : t;
        } else {
          const n = parseFloat(t);
          if (!isNaN(n)) {
            if (lastOp === "+") running += n;
            else if (lastOp === "-") running -= n;
            else if (lastOp === "*" || lastOp === "x") running *= n;
            else if (lastOp === "/") running = n !== 0 ? running / n : running;
            else running = n;
          }
        }
      });
      setRunningTotal(running);
      setPendingOperator(opMatch[2].trim() === "*" ? "x" : opMatch[2].trim());
      setIsOperatorJustPressed(true);
      return;
    }

    setCurrentInput(sanitized);
    setIsCalculated(false);
    setIsOperatorJustPressed(false);
  };

  // Paste handler
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (!pasted) return;

    // Clean pasted text
    const clean = pasted.replace(/[^0-9.+\-*/x]/gi, "");
    if (!clean) return;

    // If it's a direct number e.g. "3"
    if (!isNaN(Number(clean))) {
      setCurrentInput(clean);
      setIsCalculated(false);
      setIsOperatorJustPressed(false);
      return;
    }

    // If it's an arithmetic formula e.g. "8+8"
    try {
      const evalExpr = clean.replace(/x/gi, "*").replace(/[^0-9+\-*/.]/g, "");
      // eslint-disable-next-line no-new-func
      const result = Function(`'use strict'; return (${evalExpr})`)();
      if (!isNaN(result)) {
        setExpressionFormula(clean);
        setRunningTotal(Number(result));
        setCurrentInput(String(result));
        setIsCalculated(false);
      }
    } catch {
      setCurrentInput(clean);
    }
  };

  // Number Button Click
  const handleDigit = (digit: string) => {
    if (digit === "." && currentInput.includes(".")) return;

    // If result was just calculated and user presses a number, start fresh
    if (isCalculated) {
      setCurrentInput(digit === "." ? "0." : digit);
      setBaseValue(null);
      setTapeSteps([]);
      setRunningTotal(0);
      setPendingOperator(null);
      setExpressionFormula("");
      setIsCalculated(false);
      setIsOperatorJustPressed(false);
      return;
    }

    // If an operator was just pressed, replace current input with this new digit
    if (isOperatorJustPressed) {
      setCurrentInput(digit === "." ? "0." : digit);
      setIsOperatorJustPressed(false);
      return;
    }

    if (currentInput === "0" && digit !== ".") {
      setCurrentInput(digit);
    } else {
      setCurrentInput((prev) => prev + digit);
    }
  };

  // Backspace (Keypad button and Physical backspace)
  const handleBackspace = () => {
    if (isCalculated) {
      handleClearAll();
      return;
    }
    if (currentInput.length <= 1) {
      setCurrentInput("");
    } else {
      setCurrentInput((prev) => prev.slice(0, -1));
    }
  };

  // Clear / Reset All
  const handleClearAll = () => {
    setCurrentInput("");
    setBaseValue(null);
    setTapeSteps([]);
    setRunningTotal(0);
    setPendingOperator(null);
    setExpressionFormula("");
    setIsCalculated(false);
    setIsOperatorJustPressed(false);
  };

  // Helper to calculate list of number counts: e.g. [{ word: "three", num: "8" }, { word: "two", num: "7" }]
  const getNumbersCountList = (formula: string): { word: string; num: string }[] => {
    const matches = formula.match(/\d+(\.\d+)?/g);
    if (!matches || matches.length === 0) return [];

    const counts: Record<string, number> = {};
    matches.forEach((num) => {
      counts[num] = (counts[num] || 0) + 1;
    });

    const numberWords: Record<number, string> = {
      1: "one",
      2: "two",
      3: "three",
      4: "four",
      5: "five",
      6: "six",
      7: "seven",
      8: "eight",
      9: "nine",
      10: "ten",
    };

    return Object.entries(counts).map(([num, count]) => ({
      word: numberWords[count] || String(count),
      num,
    }));
  };

  // Operator Click (+, -, x, /)
  const handleOperator = (op: string) => {
    // If an operator was just pressed consecutively (e.g. user pressed + then changed to -)
    if (isOperatorJustPressed) {
      setPendingOperator(op);
      setExpressionFormula((prev) => {
        const parts = prev.trim().split(" ");
        if (parts.length > 0) {
          parts[parts.length - 1] = op;
          return parts.join(" ") + " ";
        }
        return `${currentInput} ${op} `;
      });
      return;
    }

    const inputNum = parseFloat(currentInput) || 0;

    // If continuing calculation immediately after pressing Equals (=)
    if (isCalculated) {
      setIsCalculated(false);
      setBaseValue(runningTotal);
      setPendingOperator(op);
      setExpressionFormula(`${runningTotal} ${op} `);
      setTapeSteps([
        {
          id: `step-${Date.now()}`,
          label: `${runningTotal}`,
          operand: runningTotal,
          subtotal: runningTotal,
        },
      ]);
      setIsOperatorJustPressed(true);
      return;
    }

    // First operator in brand new calculation: e.g. user typed 8, then pressed +
    if (baseValue === null && tapeSteps.length === 0) {
      setBaseValue(inputNum);
      setRunningTotal(inputNum);
      setPendingOperator(op);
      setExpressionFormula(`${inputNum} ${op} `);
      setTapeSteps([
        {
          id: `step-${Date.now()}`,
          label: `${inputNum}`,
          operand: inputNum,
          subtotal: inputNum,
        },
      ]);
      setIsOperatorJustPressed(true);
      return;
    }

    // Chaining previous operation: e.g. 8 + 8 + ...
    const currentOp = pendingOperator || op;
    let newTotal = runningTotal;

    if (currentOp === "+") newTotal += inputNum;
    else if (currentOp === "-") newTotal -= inputNum;
    else if (currentOp === "x" || currentOp === "*") newTotal *= inputNum;
    else if (currentOp === "/") newTotal = inputNum !== 0 ? newTotal / inputNum : newTotal;

    setRunningTotal(newTotal);
    setExpressionFormula((prev) => `${prev}${inputNum} ${op} `);
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

    setPendingOperator(op);
    setIsOperatorJustPressed(true);
  };

  // Equals (=)
  const handleEquals = () => {
    if (isCalculated) return; // Already at calculated result
    const inputNum = parseFloat(currentInput) || 0;

    if (baseValue === null && tapeSteps.length === 0) {
      // Single number entered
      setRunningTotal(inputNum);
      setIsCalculated(true);
      setExpressionFormula(""); // Clear formula when equal pressed
      setCurrentInput("0");
      return;
    }

    const op = pendingOperator || "+";
    let newTotal = runningTotal;

    if (pendingOperator) {
      if (op === "+") newTotal += inputNum;
      else if (op === "-") newTotal -= inputNum;
      else if (op === "x" || op === "*") newTotal *= inputNum;
      else if (op === "/") newTotal = inputNum !== 0 ? newTotal / inputNum : newTotal;
      else if (op === "AND") newTotal = (newTotal | 0) & (inputNum | 0);
      else if (op === "OR") newTotal = (newTotal | 0) | (inputNum | 0);
      else if (op === "XOR") newTotal = (newTotal | 0) ^ (inputNum | 0);
      else if (op === "Lsh") newTotal = (newTotal | 0) << (inputNum | 0);
      else if (op === "Rsh") newTotal = (newTotal | 0) >> (inputNum | 0);
      else if (op === "MOD" || op === "%") newTotal = (newTotal | 0) % (inputNum | 0);
      else if (op === "x^y" || op === "^") newTotal = Math.pow(newTotal, inputNum);
      else if (op === "exp") newTotal = newTotal * Math.pow(10, inputNum);

      const finalFormula = `${expressionFormula}${inputNum}`;

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

      // Save to History before clearing top display
      const historyTitle = calcNote.trim() || `Calc Result`;

      const newHistoryItem: CalculationHistoryItem = {
        id: `calc-${Date.now()}`,
        title: historyTitle,
        timestamp: formatDateTime(),
        steps: finalSteps,
        finalResult: newTotal,
      };
      setHistoryList((prev) => [newHistoryItem, ...prev]);

      // When equal is clicked: clear occurrence count and formula above,
      // reset current input to 0, only equal value in TAPE RUNNING TOTAL remains!
      setExpressionFormula("");
      setCurrentInput("0");
      setIsCalculated(true);
      setIsOperatorJustPressed(false);
      setPendingOperator(null);
      setCalcNote("");
    }
  };

    const handleScientificOp = (opName: string) => {
    executeScientificOp(opName, {
      currentInput,
      setCurrentInput,
      runningTotal,
      setRunningTotal,
      setTapeSteps,
      setExpressionFormula,
      sciAngleMode,
      sciHyp,
      sci2nd,
      setPendingOperator,
      setIsOperatorJustPressed,
      setIsCalculated,
      sciFeMode,
      programmerBase,
      programmerWordSize,
    });
  };

  const handleBitwiseOp = (op: string) => {
    executeBitwiseOp(op, {
      currentInput,
      setCurrentInput,
      runningTotal,
      setRunningTotal,
      setTapeSteps,
      setExpressionFormula,
      sciAngleMode,
      sciHyp,
      sci2nd,
      setPendingOperator,
      setIsOperatorJustPressed,
      setIsCalculated,
      sciFeMode,
      programmerBase,
      programmerWordSize,
    });
  };
  const handlePercentage = () => {
    const inputVal = parseFloat(currentInput);
    if (isNaN(inputVal) || inputVal === 0) return;

    if (pendingOperator && runningTotal > 0) {
      // E.g., 200 + 10% -> 10% of 200 = 20
      const percentVal = (runningTotal * inputVal) / 100;
      setCurrentInput(String(percentVal));
    } else {
      // Direct percentage conversion: 50 -> 0.5
      const percentVal = inputVal / 100;
      setCurrentInput(String(percentVal));
    }
  };

  // Apply GST
  const handleApplyGST = () => {
    const calcVal = runningTotal > 0 ? runningTotal : parseFloat(currentInput) || 0;
    const parsedOriginal = parseFloat(gstOriginalPrice);
    const current =
      !isNaN(parsedOriginal) && parsedOriginal >= 0
        ? parsedOriginal
        : calcVal;

    let gstVal = 0;
    let finalVal = current;

    if (gstType === "add") {
      // Exclusive GST: Price + GST
      gstVal = (current * gstRate) / 100;
      finalVal = current + gstVal;
    } else {
      // Inclusive GST: Base = Price / (1 + Rate/100), GST = Price - Base
      const base = current / (1 + gstRate / 100);
      gstVal = current - base;
      finalVal = base;
    }

    setTapeSteps((prev) => [
      ...prev,
      {
        id: `gst-${Date.now()}`,
        label: `${gstType === "add" ? "+" : "-"} GST (${gstRate}%) [Base: ₹${current}]`,
        operand: Number(gstVal.toFixed(2)),
        subtotal: Number(finalVal.toFixed(2)),
      },
    ]);
    setRunningTotal(Number(finalVal.toFixed(2)));
    setCurrentInput(String(Number(finalVal.toFixed(2))));
    setGstOriginalPrice("");
    setActiveModal(null);
  };

  // Apply Discount
  const handleApplyDiscount = () => {
    const calcVal = runningTotal > 0 ? runningTotal : parseFloat(currentInput) || 0;
    const parsedOriginal = parseFloat(discountOriginalPrice);
    const current =
      !isNaN(parsedOriginal) && parsedOriginal >= 0
        ? parsedOriginal
        : calcVal;

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
        label: `- Discount (${discountMode === "percent" ? `${discountPercent}%` : `₹${discountAmount}`}) [Base: ₹${current}]`,
        operand: Number(discVal.toFixed(2)),
        subtotal: Number(finalVal.toFixed(2)),
      },
    ]);
    setRunningTotal(Number(finalVal.toFixed(2)));
    setCurrentInput(String(Number(finalVal.toFixed(2))));
    setDiscountOriginalPrice("");
    setActiveModal(null);
  };

  // Copy Individual History Item
  const handleCopyHistoryItem = (item: CalculationHistoryItem) => {
    const horizontalFormula = item.steps
      .map((s, idx) => (idx === 0 ? `${s.operand}` : `${s.operator || "+"} ${s.operand}`))
      .join(" ");

    const text = `📊 *1PLACE Calc History*\nTitle: ${item.title}\nTime: ${item.timestamp}\nFormula: ${horizontalFormula}\n*Result: ${formatINR(item.finalResult)}*`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedHistoryId(item.id);
      setTimeout(() => setCopiedHistoryId(null), 2000);
    }
  };

  // Edit / Rename History Item Title
  const handleSaveEditHistory = (id: string) => {
    if (!editingHistoryTitle.trim()) return;
    setHistoryList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title: editingHistoryTitle.trim() } : item))
    );
    setEditingHistoryId(null);
    setEditingHistoryTitle("");
  };

  // Restore calculation from history
  const handleRestoreHistory = (item: CalculationHistoryItem) => {
    setTapeSteps(item.steps);
    setRunningTotal(item.finalResult);
    setBaseValue(item.steps[0]?.operand ?? 0);
    setCurrentInput(String(item.finalResult));

    // Reconstruct formula from steps e.g. "8 + 8 = 16"
    const reconstructed = item.steps
      .map((s, idx) => (idx === 0 ? `${s.operand}` : `${s.operator || "+"} ${s.operand}`))
      .join(" ");
    setExpressionFormula(reconstructed);
    setIsCalculated(true);
    setIsOperatorJustPressed(false);
    setPendingOperator(null);
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
      role="complementary"
      aria-label="Calculator"
      className="fixed right-[60px] sm:right-[62px] top-[60px] bottom-0 w-[350px] sm:w-[360px] bg-[#f8fafc] border-l border-[#d0e5fb] shadow-[-6px_0_24px_rgba(0,0,0,0.08)] z-[60] flex flex-col select-none overflow-hidden animate-in slide-in-from-right duration-200"
    >
      {/* 1, 2, 3, 4: Header, Display, Live Counts, Quick Action Pills */}
      <CalculatorHeaderDisplay
        closePanel={closePanel}
        setActiveModal={setActiveModal}
        copyFeedback={copyFeedback}
        setCurrentInput={setCurrentInput}
        tapeSteps={tapeSteps}
        handleCopyBreakdown={handleCopyBreakdown}
        handleClearAll={handleClearAll}
        calcNote={calcNote}
        setCalcNote={setCalcNote}
        expressionFormula={expressionFormula}
        handleFormulaChange={handleFormulaChange}
        getNumbersCountList={getNumbersCountList}
        currentInput={currentInput}
        handleInputChange={handleInputChange}
        handlePaste={handlePaste}
        gstDropdownOpen={gstDropdownOpen}
        setGstDropdownOpen={setGstDropdownOpen}
        curDropdownOpen={curDropdownOpen}
        setCurDropdownOpen={setCurDropdownOpen}
        currencyFrom={currencyFrom}
        setCurrencyFrom={setCurrencyFrom}
        CURRENCY_RATES={CURRENCY_RATES}
        setSciDropdownOpen={setSciDropdownOpen}
        isOperatorJustPressed={isOperatorJustPressed}
        pendingOperator={pendingOperator}
        handleEquals={handleEquals}
        isCalculated={isCalculated}
      />

      {/* 5. Keypad Grid: Adaptive Based on Active Mode (Extracted into CalculatorKeypads) */}
      <CalculatorKeypads
        activeCalcMode={activeCalcMode}
        setActiveCalcMode={setActiveCalcMode}
        sciAngleMode={sciAngleMode}
        setSciAngleMode={setSciAngleMode}
        sciFeMode={sciFeMode}
        setSciFeMode={setSciFeMode}
        currentInput={currentInput}
        setCurrentInput={setCurrentInput}
        sciMemory={sciMemory}
        setSciMemory={setSciMemory}
        sci2nd={sci2nd}
        setSci2nd={setSci2nd}
        sciTrigOpen={sciTrigOpen}
        setSciTrigOpen={setSciTrigOpen}
        sciHyp={sciHyp}
        setSciHyp={setSciHyp}
        sciFuncOpen={sciFuncOpen}
        setSciFuncOpen={setSciFuncOpen}
        handleScientificOp={handleScientificOp}
        handleClearAll={handleClearAll}
        handleBackspace={handleBackspace}
        handleOperator={handleOperator}
        handlePercentage={handlePercentage}
        handleDigit={handleDigit}
        handleEquals={handleEquals}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        timeFrom={timeFrom}
        setTimeFrom={setTimeFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        timeTo={timeTo}
        setTimeTo={setTimeTo}
        includeTimeInDiff={includeTimeInDiff}
        setIncludeTimeInDiff={setIncludeTimeInDiff}
        programmerWordSize={programmerWordSize}
        setProgrammerWordSize={setProgrammerWordSize}
        programmerBase={programmerBase}
        setProgrammerBase={setProgrammerBase}
        handleBitwiseOp={handleBitwiseOp}
      />

      {/* 6. Bottom Banner: TAPE RUNNING TOTAL & SCI Mode Dropdown Button */}
      <div className="bg-[#0f172a] px-4 py-3 flex items-center justify-between text-white shrink-0 relative">
        <div className="min-w-0 pr-2">
          <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest block leading-none mb-0.5">
            TAPE RUNNING TOTAL
          </span>
          <span className="text-xl sm:text-2xl font-black text-[#10b981] tracking-tight leading-none block">
            {formatINR(runningTotal)}
          </span>
        </div>

        {/* SCI / Standard Mode Switcher Button (Replaces Copy button in bottom bar) */}
        <div className="relative pill-dropdown-container shrink-0">
          <div className="h-9 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-black flex items-center justify-between px-2 transition shadow-sm">
            <button
              onClick={() => {
                setActiveCalcMode((prev) => (prev === "scientific" ? "standard" : "scientific"));
              }}
              title={`Switch Mode (Current: ${activeCalcMode.toUpperCase()})`}
              className="flex items-center gap-1.5 cursor-pointer py-1"
            >
              <CalcIcon className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-black uppercase tracking-wider">
                {activeCalcMode === "standard"
                  ? "STD"
                  : activeCalcMode === "scientific"
                    ? "SCI"
                    : activeCalcMode === "programmer"
                      ? "PROG"
                      : "DATE"}
              </span>
            </button>

            {/* Down Arrow for Calculator & Converter Menu */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setGstDropdownOpen(false);
                setCurDropdownOpen(false);
                setSciDropdownOpen((prev) => !prev);
              }}
              title="Open Calculator & Converter Menu"
              className="w-4 h-6 flex items-center justify-center hover:bg-amber-400/20 rounded-md cursor-pointer ml-1 transition"
            >
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${sciDropdownOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Mode Dropdown Menu (pops up above the bottom bar) */}
          {sciDropdownOpen && (
            <div className="absolute right-0 bottom-12 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl py-2 z-50 max-h-80 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-bottom-2 duration-150 text-gray-800">
              {/* SECTION 1: CALCULATOR */}
              <div className="px-3 py-1 text-[11px] font-black text-gray-500 uppercase tracking-wider">
                Calculator
              </div>

              {/* Standard */}
              <button
                onClick={() => {
                  setActiveCalcMode("standard");
                  setSciDropdownOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-xs font-bold flex items-center gap-3 hover:bg-gray-100 cursor-pointer transition ${activeCalcMode === "standard"
                  ? "bg-purple-50 text-purple-900 border-l-4 border-purple-600"
                  : "text-gray-700"
                  }`}
              >
                <CalcIcon className="w-4 h-4 text-purple-600" />
                <span>Standard</span>
              </button>

              {/* Scientific */}
              <button
                onClick={() => {
                  setActiveCalcMode("scientific");
                  setSciDropdownOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-xs font-bold flex items-center gap-3 hover:bg-gray-100 cursor-pointer transition ${activeCalcMode === "scientific"
                  ? "bg-purple-50 text-purple-900 border-l-4 border-purple-600"
                  : "text-gray-700"
                  }`}
              >
                <FlaskConical className="w-4 h-4 text-purple-600" />
                <span>Scientific</span>
              </button>

              {/* Programmer */}
              <button
                onClick={() => {
                  setActiveCalcMode("programmer");
                  setSciDropdownOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-xs font-bold flex items-center gap-3 hover:bg-gray-100 cursor-pointer transition ${activeCalcMode === "programmer"
                  ? "bg-purple-50 text-purple-900 border-l-4 border-purple-600"
                  : "text-gray-700"
                  }`}
              >
                <Code className="w-4 h-4 text-purple-600" />
                <span>Programmer</span>
              </button>

              {/* Date calculation */}
              <button
                onClick={() => {
                  setActiveCalcMode("date");
                  setSciDropdownOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-xs font-bold flex items-center gap-3 hover:bg-gray-100 cursor-pointer transition ${activeCalcMode === "date"
                  ? "bg-purple-50 text-purple-900 border-l-4 border-purple-600"
                  : "text-gray-700"
                  }`}
              >
                <Calendar className="w-4 h-4 text-purple-600" />
                <span>Date calculation</span>
              </button>

              {/* BMI Health Calculator */}
              <button
                onClick={() => {
                  setSciDropdownOpen(false);
                  setActiveModal("bmi");
                }}
                className="w-full px-3 py-2 text-left text-xs font-bold flex items-center gap-3 hover:bg-emerald-50 text-emerald-800 cursor-pointer transition border-t border-gray-100"
              >
                <HeartPulse className="w-4 h-4 text-emerald-600" />
                <div className="flex items-center justify-between flex-1">
                  <span>BMI Calculator</span>
                  <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded-full">
                    Health
                  </span>
                </div>
              </button>

              {/* SECTION 2: CONVERTER */}
              <div className="px-3 pt-2 pb-1 text-[11px] font-black text-gray-500 uppercase tracking-wider border-t border-gray-100 mt-1">
                Converter
              </div>

              {CONVERTER_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSciDropdownOpen(false);
                    setSelectedConverterId(cat.id);
                    const cfg = CONVERTER_CONFIG[cat.id];
                    if (cfg && cfg.units.length >= 2) {
                      setConverterFromUnit(cfg.units[0].id);
                      setConverterToUnit(cfg.units[1].id);
                      setConverterInput(1);
                    }
                    setActiveModal("converter-detail");
                  }}
                  className="w-full px-3 py-1.5 text-left text-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center gap-3 cursor-pointer transition"
                >
                  <span className="text-gray-600">{cat.icon}</span>
                  <span className="truncate">{cat.label.split("(")[0].trim()}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODALS PART 1: GST, Discount, Currency, Compare */}
      <CalculatorModalsPart1
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        gstOriginalPrice={gstOriginalPrice}
        setGstOriginalPrice={setGstOriginalPrice}
        gstRate={gstRate}
        setGstRate={setGstRate}
        gstType={gstType}
        setGstType={setGstType}
        handleApplyGST={handleApplyGST}
        discountOriginalPrice={discountOriginalPrice}
        setDiscountOriginalPrice={setDiscountOriginalPrice}
        discountPercent={discountPercent}
        setDiscountPercent={setDiscountPercent}
        discountAmount={discountAmount}
        setDiscountAmount={setDiscountAmount}
        discountMode={discountMode}
        setDiscountMode={setDiscountMode}
        handleApplyDiscount={handleApplyDiscount}
        currencyAmount={currencyAmount}
        setCurrencyAmount={setCurrencyAmount}
        currencyFrom={currencyFrom}
        setCurrencyFrom={setCurrencyFrom}
        currencyTo={currencyTo}
        setCurrencyTo={setCurrencyTo}
        CURRENCY_RATES={CURRENCY_RATES}
        compareTab={compareTab}
        setCompareTab={setCompareTab}
        compareItems={compareItems}
        setCompareItems={setCompareItems}
        compareTotalBill={compareTotalBill}
        setCompareTotalBill={setCompareTotalBill}
        formatINR={formatINR}
        runningTotal={runningTotal}
        currentInput={currentInput}
        setCurrentInput={setCurrentInput}
        setRunningTotal={setRunningTotal}
        setTapeSteps={setTapeSteps}
      />

      {/* MODALS PART 2: Converter Detail, BMI, History, Share */}
      <CalculatorModalsPart2
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        selectedConverterId={selectedConverterId}
        converterInput={converterInput}
        setConverterInput={setConverterInput}
        converterFromUnit={converterFromUnit}
        setConverterFromUnit={setConverterFromUnit}
        converterToUnit={converterToUnit}
        setConverterToUnit={setConverterToUnit}
        bmiGender={bmiGender}
        setBmiGender={setBmiGender}
        bmiAge={bmiAge}
        setBmiAge={setBmiAge}
        bmiHeightUnit={bmiHeightUnit}
        setBmiHeightUnit={setBmiHeightUnit}
        bmiWeightUnit={bmiWeightUnit}
        setBmiWeightUnit={setBmiWeightUnit}
        bmiHeightCm={bmiHeightCm}
        setBmiHeightCm={setBmiHeightCm}
        bmiHeightFeet={bmiHeightFeet}
        setBmiHeightFeet={setBmiHeightFeet}
        bmiHeightInches={bmiHeightInches}
        setBmiHeightInches={setBmiHeightInches}
        bmiWeightKg={bmiWeightKg}
        setBmiWeightKg={setBmiWeightKg}
        bmiWeightLbs={bmiWeightLbs}
        setBmiWeightLbs={setBmiWeightLbs}
        historyList={historyList}
        handleRestoreHistory={handleRestoreHistory}
        expandedHistoryIds={expandedHistoryIds}
        setExpandedHistoryIds={setExpandedHistoryIds}
        editingHistoryId={editingHistoryId}
        setEditingHistoryId={setEditingHistoryId}
        editingHistoryTitle={editingHistoryTitle}
        setEditingHistoryTitle={setEditingHistoryTitle}
        handleSaveEditHistory={handleSaveEditHistory}
        handleCopyHistoryItem={handleCopyHistoryItem}
        handleDeleteHistory={handleDeleteHistory}
        handleClearAllHistory={handleClearAllHistory}
        copiedHistoryId={copiedHistoryId}
        formatINR={formatINR}
        runningTotal={runningTotal}
        handleCopyBreakdown={handleCopyBreakdown}
        copyFeedback={copyFeedback}
      />
    </aside>
  );
};
