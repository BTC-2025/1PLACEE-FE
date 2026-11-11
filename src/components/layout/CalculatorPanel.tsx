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
  Calculator as CalcIcon,
  FlaskConical,
  LineChart,
  Code,
  Calendar,
  Edit2,
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
    null
  >(null);

  const [copyFeedback, setCopyFeedback] = useState(false);

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

  // Compare & Multi-Person Split State (defaults to 2 persons with clean standard empty values)
  const [compareTotalBill, setCompareTotalBill] = useState<string>("");
  const [compareItems, setCompareItems] = useState<ComparePerson[]>([
    { id: "p1", name: "Person 1", value: 0, description: "" },
    { id: "p2", name: "Person 2", value: 0, description: "" },
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

  // Converter definitions with units and conversion formulas to base units
  const CONVERTER_CONFIG: Record<
    string,
    {
      title: string;
      units: { id: string; label: string; toBase: (v: number) => number; fromBase: (v: number) => number }[];
    }
  > = {
    length: {
      title: "Length Converter",
      units: [
        { id: "m", label: "Meters (m)", toBase: (v) => v, fromBase: (v) => v },
        { id: "cm", label: "Centimeters (cm)", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
        { id: "mm", label: "Millimeters (mm)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
        { id: "km", label: "Kilometers (km)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
        { id: "inch", label: "Inches (in)", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
        { id: "ft", label: "Feet (ft)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
        { id: "yd", label: "Yards (yd)", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
        { id: "mile", label: "Miles (mi)", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      ],
    },
    volume: {
      title: "Volume Converter",
      units: [
        { id: "mL", label: "Milliliters", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
        { id: "cm3", label: "Cubic centimeters", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
        { id: "L", label: "Liters", toBase: (v) => v, fromBase: (v) => v },
        { id: "m3", label: "Cubic meters", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
        { id: "tsp_us", label: "Teaspoons (US)", toBase: (v) => v * 0.00492892, fromBase: (v) => v / 0.00492892 },
        { id: "tbsp_us", label: "Tablespoons (US)", toBase: (v) => v * 0.0147868, fromBase: (v) => v / 0.0147868 },
        { id: "floz_us", label: "Fluid ounces (US)", toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
        { id: "cup_us", label: "Cups (US)", toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
        { id: "pt_us", label: "Pints (US)", toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
        { id: "qt_us", label: "Quarts (US)", toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
        { id: "gal_us", label: "Gallons (US)", toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
        { id: "in3", label: "Cubic inches", toBase: (v) => v * 0.0163871, fromBase: (v) => v / 0.0163871 },
        { id: "ft3", label: "Cubic feet", toBase: (v) => v * 28.3168, fromBase: (v) => v / 28.3168 },
        { id: "yd3", label: "Cubic yards", toBase: (v) => v * 764.555, fromBase: (v) => v / 764.555 },
        { id: "tsp_uk", label: "Teaspoons (UK)", toBase: (v) => v * 0.00591939, fromBase: (v) => v / 0.00591939 },
        { id: "tbsp_uk", label: "Tablespoons (UK)", toBase: (v) => v * 0.0177582, fromBase: (v) => v / 0.0177582 },
        { id: "floz_uk", label: "Fluid ounces (UK)", toBase: (v) => v * 0.0284131, fromBase: (v) => v / 0.0284131 },
        { id: "pt_uk", label: "Pints (UK)", toBase: (v) => v * 0.568261, fromBase: (v) => v / 0.568261 },
        { id: "qt_uk", label: "Quarts (UK)", toBase: (v) => v * 1.13652, fromBase: (v) => v / 1.13652 },
        { id: "gal_uk", label: "Gallons (UK)", toBase: (v) => v * 4.54609, fromBase: (v) => v / 4.54609 },
      ],
    },
    weight: {
      title: "Weight and Mass Converter",
      units: [
        { id: "kg", label: "Kilograms (kg)", toBase: (v) => v, fromBase: (v) => v },
        { id: "g", label: "Grams (g)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
        { id: "mg", label: "Milligrams (mg)", toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
        { id: "lb", label: "Pounds (lb)", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
        { id: "oz", label: "Ounces (oz)", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
        { id: "ton", label: "Metric Tonnes (t)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      ],
    },
    temperature: {
      title: "Temperature Converter",
      units: [
        { id: "C", label: "Celsius (°C)", toBase: (v) => v, fromBase: (v) => v },
        { id: "F", label: "Fahrenheit (°F)", toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => v * (9 / 5) + 32 },
        { id: "K", label: "Kelvin (K)", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
      ],
    },
    energy: {
      title: "Energy Converter",
      units: [
        { id: "J", label: "Joules (J)", toBase: (v) => v, fromBase: (v) => v },
        { id: "kJ", label: "Kilojoules (kJ)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
        { id: "cal", label: "Calories (cal)", toBase: (v) => v * 4.184, fromBase: (v) => v / 4.184 },
        { id: "kcal", label: "Kilocalories (kcal)", toBase: (v) => v * 4184, fromBase: (v) => v / 4184 },
        { id: "wh", label: "Watt-hours (Wh)", toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
        { id: "kwh", label: "Kilowatt-hours (kWh)", toBase: (v) => v * 3600000, fromBase: (v) => v / 3600000 },
      ],
    },
    area: {
      title: "Area Converter",
      units: [
        { id: "sqm", label: "Square Meters (m²)", toBase: (v) => v, fromBase: (v) => v },
        { id: "sqft", label: "Square Feet (sq ft)", toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
        { id: "sqkm", label: "Square Kilometers (km²)", toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
        { id: "acre", label: "Acres (ac)", toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
        { id: "hectare", label: "Hectares (ha)", toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
      ],
    },
    speed: {
      title: "Speed Converter",
      units: [
        { id: "kmh", label: "Kilometers/hour (km/h)", toBase: (v) => v, fromBase: (v) => v },
        { id: "ms", label: "Meters/second (m/s)", toBase: (v) => v * 3.6, fromBase: (v) => v / 3.6 },
        { id: "mph", label: "Miles/hour (mph)", toBase: (v) => v * 1.60934, fromBase: (v) => v / 1.60934 },
        { id: "knot", label: "Knots (kn)", toBase: (v) => v * 1.852, fromBase: (v) => v / 1.852 },
      ],
    },
    time: {
      title: "Time Converter",
      units: [
        { id: "sec", label: "Seconds (s)", toBase: (v) => v, fromBase: (v) => v },
        { id: "min", label: "Minutes (min)", toBase: (v) => v * 60, fromBase: (v) => v / 60 },
        { id: "hr", label: "Hours (hr)", toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
        { id: "day", label: "Days (d)", toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
        { id: "wk", label: "Weeks (wk)", toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
        { id: "yr", label: "Years (yr)", toBase: (v) => v * 31536000, fromBase: (v) => v / 31536000 },
      ],
    },
    power: {
      title: "Power Converter",
      units: [
        { id: "w", label: "Watts (W)", toBase: (v) => v, fromBase: (v) => v },
        { id: "kw", label: "Kilowatts (kW)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
        { id: "hp", label: "Horsepower (hp)", toBase: (v) => v * 745.7, fromBase: (v) => v / 745.7 },
        { id: "mw", label: "Megawatts (MW)", toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      ],
    },
    data: {
      title: "Data Converter",
      units: [
        { id: "b", label: "Bytes (B)", toBase: (v) => v, fromBase: (v) => v },
        { id: "kb", label: "Kilobytes (KB)", toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
        { id: "mb", label: "Megabytes (MB)", toBase: (v) => v * 1048576, fromBase: (v) => v / 1048576 },
        { id: "gb", label: "Gigabytes (GB)", toBase: (v) => v * 1073741824, fromBase: (v) => v / 1073741824 },
        { id: "tb", label: "Terabytes (TB)", toBase: (v) => v * 1099511627776, fromBase: (v) => v / 1099511627776 },
      ],
    },
    pressure: {
      title: "Pressure Converter",
      units: [
        { id: "pa", label: "Pascals (Pa)", toBase: (v) => v, fromBase: (v) => v },
        { id: "kpa", label: "Kilopascals (kPa)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
        { id: "bar", label: "Bar", toBase: (v) => v * 100000, fromBase: (v) => v / 100000 },
        { id: "psi", label: "Pounds/sq inch (psi)", toBase: (v) => v * 6894.76, fromBase: (v) => v / 6894.76 },
        { id: "atm", label: "Standard Atmospheres (atm)", toBase: (v) => v * 101325, fromBase: (v) => v / 101325 },
      ],
    },
    angle: {
      title: "Angle Converter",
      units: [
        { id: "deg", label: "Degrees (°)", toBase: (v) => v, fromBase: (v) => v },
        { id: "rad", label: "Radians (rad)", toBase: (v) => v * (180 / Math.PI), fromBase: (v) => v * (Math.PI / 180) },
        { id: "grad", label: "Gradians (grad)", toBase: (v) => v * 0.9, fromBase: (v) => v / 0.9 },
      ],
    },
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

  // Direct Input / Paste handler
  const handleInputChange = (val: string) => {
    // Only allow numbers and basic math chars (., +, -, *, /)
    const sanitized = val.replace(/[^0-9.+\-*/x]/gi, "");
    if (sanitized === "") {
      setCurrentInput("0");
    } else {
      setCurrentInput(sanitized);
    }
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
    if (currentInput.length <= 1 || currentInput === "0") {
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

    const inputNum = parseFloat(currentInput);

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
    const inputNum = parseFloat(currentInput);

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

  // Scientific Function Handler
  const handleScientificOp = (opName: string) => {
    const val = parseFloat(currentInput);
    if (isNaN(val) && opName !== "rand" && opName !== "pi" && opName !== "e") return;

    let res = val;
    let label = `${opName}(${val})`;

    // Convert input angle based on DEG, RAD, GRAD mode
    const toRadians = (angle: number) => {
      if (sciAngleMode === "RAD") return angle;
      if (sciAngleMode === "GRAD") return (angle * Math.PI) / 200;
      return (angle * Math.PI) / 180; // DEG
    };
    const fromRadians = (rad: number) => {
      if (sciAngleMode === "RAD") return rad;
      if (sciAngleMode === "GRAD") return (rad * 200) / Math.PI;
      return (rad * 180) / Math.PI; // DEG
    };

    switch (opName) {
      // Trigonometry & Hyperbolic
      case "sin":
        res = sciHyp ? Math.sinh(val) : Math.sin(toRadians(val));
        break;
      case "cos":
        res = sciHyp ? Math.cosh(val) : Math.cos(toRadians(val));
        break;
      case "tan":
        res = sciHyp ? Math.tanh(val) : Math.tan(toRadians(val));
        break;
      case "asin":
        res = sciHyp ? Math.asinh(val) : fromRadians(Math.asin(val));
        label = `asin(${val})`;
        break;
      case "acos":
        res = sciHyp ? Math.acosh(val) : fromRadians(Math.acos(val));
        label = `acos(${val})`;
        break;
      case "atan":
        res = sciHyp ? Math.atanh(val) : fromRadians(Math.atan(val));
        label = `atan(${val})`;
        break;
      case "sec": {
        const c = sciHyp ? Math.cosh(val) : Math.cos(toRadians(val));
        res = c !== 0 ? 1 / c : 0;
        break;
      }
      case "csc": {
        const s = sciHyp ? Math.sinh(val) : Math.sin(toRadians(val));
        res = s !== 0 ? 1 / s : 0;
        break;
      }
      case "cot": {
        const t = sciHyp ? Math.tanh(val) : Math.tan(toRadians(val));
        res = t !== 0 ? 1 / t : 0;
        break;
      }

      // Powers & Roots
      case "sqr":
      case "x^2":
        res = val * val;
        label = `sqr(${val})`;
        break;
      case "cube":
      case "x^3":
        res = val * val * val;
        label = `cube(${val})`;
        break;
      case "sqrt":
      case "2sqrt":
        res = Math.sqrt(val);
        label = `√(${val})`;
        break;
      case "cbrt":
      case "3sqrt":
        res = Math.cbrt(val);
        label = `∛(${val})`;
        break;
      case "10^x":
        res = Math.pow(10, val);
        label = `10^(${val})`;
        break;
      case "2^x":
        res = Math.pow(2, val);
        label = `2^(${val})`;
        break;
      case "e^x":
        res = Math.exp(val);
        label = `e^(${val})`;
        break;

      // Logarithms
      case "log":
        res = Math.log10(val);
        break;
      case "ln":
        res = Math.log(val);
        break;

      // Basics & Inverses
      case "1/x":
        res = val !== 0 ? 1 / val : 0;
        label = `1/(${val})`;
        break;
      case "|x|":
        res = Math.abs(val);
        label = `abs(${val})`;
        break;
      case "floor":
      case "⌊x⌋":
        res = Math.floor(val);
        label = `floor(${val})`;
        break;
      case "ceil":
      case "⌈x⌉":
        res = Math.ceil(val);
        label = `ceil(${val})`;
        break;
      case "rand":
        res = Math.random();
        label = `rand()`;
        break;
      case "dms":
      case "->dms": {
        // Decimal degrees to Degrees, Minutes, Seconds
        const d = Math.floor(val);
        const m = Math.floor((val - d) * 60);
        const s = ((val - d) * 60 - m) * 60;
        res = d + m / 100 + s / 10000;
        label = `dms(${val})`;
        break;
      }
      case "deg":
      case "->deg": {
        // DMS to Degrees
        const d = Math.floor(val);
        const m = Math.floor((val - d) * 100);
        const s = ((val - d) * 100 - m) * 100;
        res = d + m / 60 + s / 3600;
        label = `deg(${val})`;
        break;
      }
      case "fact":
      case "n!": {
        let f = 1;
        const n = Math.min(100, Math.max(0, Math.floor(val)));
        for (let i = 2; i <= n; i++) f *= i;
        res = f;
        label = `fact(${n})`;
        break;
      }
      case "negate":
      case "+/-":
        res = -val;
        label = `negate(${val})`;
        break;
      case "pi":
        res = Math.PI;
        label = `π`;
        break;
      case "e":
        res = Math.E;
        label = `e`;
        break;
      default:
        break;
    }

    let formattedRes = Number(res.toFixed(8));
    if (sciFeMode) {
      formattedRes = res;
    }
    const displayStr = sciFeMode ? res.toExponential(4) : String(formattedRes);
    setCurrentInput(displayStr);
    setTapeSteps((prev) => [
      ...prev,
      {
        id: `sci-${Date.now()}`,
        label,
        operand: val || 0,
        subtotal: res,
      },
    ]);
    setRunningTotal(res);
    setIsCalculated(false);
  };

  // Bitwise / Programmer Operations Handler (AND, OR, XOR, NOT, Lsh, Rsh, Mod)
  const handleBitwiseOp = (op: string) => {
    const val = parseInt(currentInput, programmerBase === "HEX" ? 16 : programmerBase === "OCT" ? 8 : programmerBase === "BIN" ? 2 : 10) || 0;

    if (op === "NOT") {
      const mask =
        programmerWordSize === "BYTE"
          ? 0xff
          : programmerWordSize === "WORD"
            ? 0xffff
            : programmerWordSize === "DWORD"
              ? 0xffffffff
              : ~0;
      const res = (~val) & mask;
      const formatted =
        programmerBase === "HEX"
          ? res.toString(16).toUpperCase()
          : programmerBase === "OCT"
            ? res.toString(8)
            : programmerBase === "BIN"
              ? res.toString(2)
              : String(res);
      setCurrentInput(formatted);
      setRunningTotal(res);
      setTapeSteps((prev) => [
        ...prev,
        {
          id: `prog-${Date.now()}`,
          label: `NOT(${val})`,
          operand: val,
          subtotal: res,
        },
      ]);
      return;
    }

    // Two-operand bitwise operation (AND, OR, XOR, Lsh, Rsh, Mod)
    setPendingOperator(op);
    setRunningTotal(val);
    setExpressionFormula(`${currentInput} ${op} `);
    setIsOperatorJustPressed(true);
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
    const parsedOriginal = parseFloat(gstOriginalPrice);
    const current =
      !isNaN(parsedOriginal) && parsedOriginal > 0
        ? parsedOriginal
        : runningTotal > 0
          ? runningTotal
          : parseFloat(currentInput) || 100;

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
    const parsedOriginal = parseFloat(discountOriginalPrice);
    const current =
      !isNaN(parsedOriginal) && parsedOriginal > 0
        ? parsedOriginal
        : runningTotal > 0
          ? runningTotal
          : parseFloat(currentInput) || 100;

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

  // Share Individual History Item
  const handleShareHistoryItem = (item: CalculationHistoryItem) => {
    const horizontalFormula = item.steps
      .map((s, idx) => (idx === 0 ? `${s.operand}` : `${s.operator || "+"} ${s.operand}`))
      .join(" ");

    const text = `📊 *1PLACE Calc History*\nTitle: ${item.title}\nTime: ${item.timestamp}\nFormula: ${horizontalFormula}\n*Result: ${formatINR(item.finalResult)}*`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
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
      <div className="px-4 py-2 border-b border-gray-200/60 bg-white shrink-0">
        <div className="flex items-center justify-between">
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

        {/* Live Expression & Numbers Count List (Horizontal line-by-line without truncate) */}
        {expressionFormula && (
          <div className="mt-1.5 pt-1.5 border-t border-dashed border-gray-200 space-y-1">
            {/* Optional Note / Purpose Input for Calculation (Saves to History) */}
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={calcNote}
                onChange={(e) => setCalcNote(e.target.value)}
                placeholder="Add note for this calculation (e.g. Grocery, Tax, Bill)..."
                className="w-full text-[11px] font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-0.5 outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>

            {/* Horizontal scrollable full formula line (No truncate) */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-lg whitespace-nowrap">
                {expressionFormula}
              </span>
              {pendingOperator && (
                <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg uppercase tracking-wider shrink-0 whitespace-nowrap">
                  {pendingOperator}
                </span>
              )}
            </div>

            {/* Horizontal badges line for number counts (No truncate, wrap or smooth horizontal scroll) */}
            {getNumbersCountList(expressionFormula).length > 0 && (
              <div>
                <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block mb-0.5">
                  OCCURRENCE COUNT:
                </span>
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                  {getNumbersCountList(expressionFormula).map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[10px] font-bold bg-gray-50 border border-gray-200 text-gray-700 px-2 py-0.5 rounded-md whitespace-nowrap shrink-0 shadow-2xs"
                    >
                      <span className="text-blue-600 font-extrabold">{item.word}</span>
                      <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black inline-flex items-center justify-center">
                        {item.num}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Single Horizontal Running Formula & Tape List */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-2 flex flex-col justify-end bg-white">
        {/* Main Display: Current Running Equation / Horizontal Sequence */}
        <div className="space-y-1">
          {/* Horizontal Equation Chain: e.g. 8 + 8 + 8 ... */}
          <div className="overflow-x-auto no-scrollbar py-0.5">
            {expressionFormula ? (
              <div className="flex items-baseline justify-end gap-1.5 flex-wrap">
                <span className="text-base font-mono font-bold text-gray-400">
                  {expressionFormula}
                </span>
                {isCalculated && (
                  <span className="text-base font-black text-emerald-600 ml-1">
                    =
                  </span>
                )}
              </div>
            ) : null}
          </div>

          {/* Current Active Input & Operator (Editable / Pastable Input) */}
          <div className="pt-2 border-t border-dashed border-gray-200 flex items-center justify-between gap-2">
            <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider shrink-0">
              {isCalculated
                ? "RESULT"
                : isOperatorJustPressed && pendingOperator
                ? `OPERATOR: ${pendingOperator}`
                : pendingOperator
                ? `NEXT: ${pendingOperator}`
                : "CURRENT"}
            </span>
            <div className="flex items-center gap-1.5 flex-1 justify-end">
              {isOperatorJustPressed && pendingOperator ? (
                /* When operator is pressed: Show only the operator sign clearly */
                <span className="text-4xl font-black text-emerald-600 select-none">
                  {pendingOperator}
                </span>
              ) : (
                /* When entering number or showing result */
                <div className="flex items-center gap-1.5 w-full justify-end">
                  {pendingOperator && !isCalculated && (
                    <span className="text-xl font-black text-emerald-600 shrink-0 select-none">
                      {pendingOperator}
                    </span>
                  )}
                  <input
                    type="text"
                    value={currentInput}
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
                    className={`text-3xl sm:text-4xl font-black tracking-tight text-right w-full bg-transparent outline-none border-none cursor-text ${
                      isCalculated ? "text-emerald-600" : "text-gray-900"
                    }`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Top Quick Feature Pill Buttons (GST with Discount Dropdown, SCI, CUR with All Currencies Dropdown, Compare) */}
      <div className="relative px-3 py-2.5 bg-gray-50 border-t border-gray-200/80 grid grid-cols-4 gap-1.5 shrink-0 z-30">
        {/* Pill 1: GST with Right Corner Down Arrow for Discount Dropdown */}
        <div className="relative">
          <div className="h-8 rounded-full bg-[#e8fbf3] hover:bg-[#d0f5e5] border border-[#a7f3d0] text-[#059669] text-xs font-bold flex items-center justify-between px-1.5 transition shadow-2xs">
            <button
              onClick={() => {
                setGstDropdownOpen(false);
                setCurDropdownOpen(false);
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

        {/* Pill 2: Standard/Scientific Mode Pill (Default STD with Down Arrow) */}
        <div className="relative">
          <div className="h-8 rounded-full bg-[#fef7ee] hover:bg-[#fdeed9] border border-[#fed7aa] text-[#d97706] text-xs font-black flex items-center justify-between px-2 transition shadow-2xs">
            <button
              onClick={() => {
                setGstDropdownOpen(false);
                setCurDropdownOpen(false);
                setSciDropdownOpen((prev) => !prev);
              }}
              title="Change Calculator Mode"
              className="flex-1 flex items-center justify-center gap-1 cursor-pointer hover:opacity-85 py-1"
            >
              <CalcIcon className="w-3.5 h-3.5 text-[#d97706]" />
              <span className="text-[11px] font-black uppercase">
                {activeCalcMode === "standard"
                  ? "STD"
                  : activeCalcMode === "scientific"
                    ? "SCI"
                    : activeCalcMode === "programmer"
                      ? "PROG"
                      : "DATE"}
              </span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setGstDropdownOpen(false);
                setCurDropdownOpen(false);
                setSciDropdownOpen((prev) => !prev);
              }}
              title="Choose Calculator or Converter Type"
              className="w-4 h-6 flex items-center justify-center hover:bg-amber-200/60 rounded-full cursor-pointer ml-0.5 transition"
            >
              <ChevronDown className={`w-3 h-3 transition-transform ${sciDropdownOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Mode Dropdown Menu (Image 1 & 2 items) */}
          {sciDropdownOpen && (
            <div className="absolute left-[-40px] top-10 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl py-2 z-50 max-h-80 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-top-1 duration-150">
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

        {/* Pill 3: CUR Button with Dropdown (All Country Currencies) */}
        <div className="relative">
          <button
            onClick={() => {
              setGstDropdownOpen(false);
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

        {/* Pill 4: Compare Button (Person 1 & Person 2 Standard Empty Comparison) */}
        <button
          onClick={() => {
            setGstDropdownOpen(false);
            setCurDropdownOpen(false);
            setActiveModal("compare");
          }}
          title="Compare Person 1 and Person 2"
          className="h-8 rounded-full bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
        >
          <ArrowRightLeft className="w-3 h-3 text-gray-600" />
          <span className="text-[11px] font-black">Compare</span>
        </button>
      </div>

      {/* 5. Keypad Grid: Adaptive Based on Active Mode (Standard, Scientific, etc.) */}
      {activeCalcMode === "scientific" ? (
        <div className="p-2.5 bg-[#fdfbfb] border-t border-gray-200/80 space-y-2 shrink-0">
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
                onClick={() => setSciFeMode((prev) => !prev)}
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
                className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg border transition cursor-pointer ${sciTrigOpen ? "bg-purple-100 border-purple-300 text-purple-900" : "bg-white hover:bg-gray-100 border-gray-200 text-gray-800"
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
                    className={`h-9 rounded-xl font-bold text-xs border transition cursor-pointer ${sci2nd ? "bg-purple-600 text-white border-purple-600" : "bg-gray-50 text-gray-800 border-gray-200"
                      }`}
                  >
                    2<sup>nd</sup>
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp(sci2nd ? "asin" : "sin");
                      setSciTrigOpen(false);
                    }}
                    className="h-9 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    {sci2nd ? "sin⁻¹" : "sin"}
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp(sci2nd ? "acos" : "cos");
                      setSciTrigOpen(false);
                    }}
                    className="h-9 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    {sci2nd ? "cos⁻¹" : "cos"}
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp(sci2nd ? "atan" : "tan");
                      setSciTrigOpen(false);
                    }}
                    className="h-9 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    {sci2nd ? "tan⁻¹" : "tan"}
                  </button>

                  <button
                    onClick={() => setSciHyp((prev) => !prev)}
                    className={`h-9 rounded-xl font-bold text-xs border transition cursor-pointer ${sciHyp ? "bg-purple-600 text-white border-purple-600" : "bg-gray-50 text-gray-800 border-gray-200"
                      }`}
                  >
                    hyp
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp("sec");
                      setSciTrigOpen(false);
                    }}
                    className="h-9 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    sec
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp("csc");
                      setSciTrigOpen(false);
                    }}
                    className="h-9 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    csc
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp("cot");
                      setSciTrigOpen(false);
                    }}
                    className="h-9 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
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
                className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg border transition cursor-pointer ${sciFuncOpen ? "bg-purple-100 border-purple-300 text-purple-900" : "bg-white hover:bg-gray-100 border-gray-200 text-gray-800"
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
                    className="h-9 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    |x|
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp("⌊x⌋");
                      setSciFuncOpen(false);
                    }}
                    className="h-9 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    ⌊x⌋
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp("⌈x⌉");
                      setSciFuncOpen(false);
                    }}
                    className="h-9 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    ⌈x⌉
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp("rand");
                      setSciFuncOpen(false);
                    }}
                    className="h-9 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    rand
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp("->dms");
                      setSciFuncOpen(false);
                    }}
                    className="h-9 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
                  >
                    →dms
                  </button>
                  <button
                    onClick={() => {
                      handleScientificOp("->deg");
                      setSciFuncOpen(false);
                    }}
                    className="h-9 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-800 font-bold text-xs border border-gray-200 cursor-pointer"
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
              className={`h-9 rounded-xl font-bold border transition cursor-pointer active:scale-95 ${sci2nd ? "bg-purple-600 text-white border-purple-600" : "bg-white hover:bg-gray-100 text-gray-800 border-gray-200"
                }`}
            >
              2<sup>nd</sup>
            </button>
            <button
              onClick={() => handleScientificOp("pi")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              π
            </button>
            <button
              onClick={() => handleScientificOp("e")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              e
            </button>
            <button
              onClick={handleClearAll}
              title="Clear All"
              className="h-9 rounded-xl bg-white hover:bg-red-50 border border-gray-200 text-red-600 font-bold cursor-pointer active:scale-95"
            >
              C
            </button>
            <button
              onClick={handleBackspace}
              title="Backspace"
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold cursor-pointer active:scale-95"
            >
              ⌫
            </button>

            {/* Row 2: x^2 (or x^3), 1/x, |x|, exp, mod */}
            <button
              onClick={() => handleScientificOp(sci2nd ? "x^3" : "x^2")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              {sci2nd ? (
                <>x<sup>3</sup></>
              ) : (
                <>x<sup>2</sup></>
              )}
            </button>
            <button
              onClick={() => handleScientificOp("1/x")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              1/x
            </button>
            <button
              onClick={() => handleScientificOp("|x|")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              |x|
            </button>
            <button
              onClick={() => handleOperator("exp")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              exp
            </button>
            <button
              onClick={() => handleOperator("MOD")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              mod
            </button>

            {/* Row 3: 2sqrt(x) (or 3sqrt), (, ), n!, / */}
            <button
              onClick={() => handleScientificOp(sci2nd ? "cbrt" : "sqrt")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              {sci2nd ? "∛x" : "²√x"}
            </button>
            <button
              onClick={() => handleDigit("(")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              (
            </button>
            <button
              onClick={() => handleDigit(")")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              )
            </button>
            <button
              onClick={() => handleScientificOp("n!")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              n!
            </button>
            <button
              onClick={() => handleOperator("/")}
              className="h-9 rounded-xl bg-[#ecfdf5] hover:bg-[#d1fae5] text-[#059669] font-black text-base cursor-pointer active:scale-95"
            >
              ÷
            </button>

            {/* Row 4: x^y, 7, 8, 9, x */}
            <button
              onClick={() => handleOperator("x^y")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              x<sup>y</sup>
            </button>
            <button
              onClick={() => handleDigit("7")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-sm cursor-pointer active:scale-95"
            >
              7
            </button>
            <button
              onClick={() => handleDigit("8")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-sm cursor-pointer active:scale-95"
            >
              8
            </button>
            <button
              onClick={() => handleDigit("9")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-sm cursor-pointer active:scale-95"
            >
              9
            </button>
            <button
              onClick={() => handleOperator("x")}
              className="h-9 rounded-xl bg-[#ecfdf5] hover:bg-[#d1fae5] text-[#059669] font-black text-base cursor-pointer active:scale-95"
            >
              ×
            </button>

            {/* Row 5: 10^x (or 2^x), 4, 5, 6, - */}
            <button
              onClick={() => handleScientificOp(sci2nd ? "2^x" : "10^x")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              {sci2nd ? <>2<sup>x</sup></> : <>10<sup>x</sup></>}
            </button>
            <button
              onClick={() => handleDigit("4")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-sm cursor-pointer active:scale-95"
            >
              4
            </button>
            <button
              onClick={() => handleDigit("5")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-sm cursor-pointer active:scale-95"
            >
              5
            </button>
            <button
              onClick={() => handleDigit("6")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-sm cursor-pointer active:scale-95"
            >
              6
            </button>
            <button
              onClick={() => handleOperator("-")}
              className="h-9 rounded-xl bg-[#ecfdf5] hover:bg-[#d1fae5] text-[#059669] font-black text-lg cursor-pointer active:scale-95"
            >
              —
            </button>

            {/* Row 6: log, 1, 2, 3, + */}
            <button
              onClick={() => handleScientificOp("log")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              log
            </button>
            <button
              onClick={() => handleDigit("1")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-sm cursor-pointer active:scale-95"
            >
              1
            </button>
            <button
              onClick={() => handleDigit("2")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-sm cursor-pointer active:scale-95"
            >
              2
            </button>
            <button
              onClick={() => handleDigit("3")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-sm cursor-pointer active:scale-95"
            >
              3
            </button>
            <button
              onClick={() => handleOperator("+")}
              className="h-9 rounded-xl bg-[#ecfdf5] hover:bg-[#d1fae5] text-[#059669] font-black text-lg cursor-pointer active:scale-95"
            >
              +
            </button>

            {/* Row 7: ln (or e^x), +/-, 0, ., = */}
            <button
              onClick={() => handleScientificOp(sci2nd ? "e^x" : "ln")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              {sci2nd ? <>e<sup>x</sup></> : "ln"}
            </button>
            <button
              onClick={() => handleScientificOp("+/-")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold cursor-pointer active:scale-95"
            >
              ⁺/₋
            </button>
            <button
              onClick={() => handleDigit("0")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-sm cursor-pointer active:scale-95"
            >
              0
            </button>
            <button
              onClick={() => handleDigit(".")}
              className="h-9 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-black text-lg cursor-pointer active:scale-95"
            >
              .
            </button>
            <button
              onClick={handleEquals}
              className="h-9 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-black text-xl flex items-center justify-center shadow-md cursor-pointer active:scale-95"
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

            {/* Original Price / Amount to Calculate (Manual Enter or Use Running Total) */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 flex justify-between">
                <span>Original Price (₹):</span>
                <button
                  type="button"
                  onClick={() =>
                    setGstOriginalPrice(
                      String(runningTotal > 0 ? runningTotal : parseFloat(currentInput) || 100)
                    )
                  }
                  className="text-[10px] text-emerald-600 font-bold hover:underline cursor-pointer"
                >
                  Use Calc Amount ({formatINR(runningTotal || parseFloat(currentInput) || 100)})
                </button>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-sm font-bold text-gray-400 pointer-events-none">₹</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={gstOriginalPrice}
                  onChange={(e) => {
                    const val = e.target.value;
                    // Allow empty string, numbers and single decimal point so user can backspace freely
                    if (val === "" || /^\d*\.?\d*$/.test(val)) {
                      setGstOriginalPrice(val);
                    }
                  }}
                  placeholder={String(runningTotal || parseFloat(currentInput) || 100)}
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-xl text-sm font-black text-gray-900 outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] bg-white"
                />
              </div>
            </div>

            {/* Real-time GST Calculation Card */}
            {(() => {
              const parsedVal = parseFloat(gstOriginalPrice);
              const current =
                !isNaN(parsedVal) && parsedVal >= 0
                  ? parsedVal
                  : runningTotal > 0
                    ? runningTotal
                    : parseFloat(currentInput) || 100;

              let gstVal = 0;
              let netVal = current;
              let grossVal = current;

              if (gstType === "add") {
                // Exclusive GST: Net + GST = Gross
                gstVal = (current * gstRate) / 100;
                netVal = current;
                grossVal = current + gstVal;
              } else {
                // Inclusive GST: Gross - GST = Net
                netVal = current / (1 + gstRate / 100);
                gstVal = current - netVal;
                grossVal = current;
              }

              return (
                <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center font-bold text-gray-600">
                    <span>{gstType === "add" ? "Net Price (Pre-tax):" : "Total Gross (Incl. Tax):"}</span>
                    <span className="font-mono text-gray-900 font-extrabold">{formatINR(current)}</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-emerald-700">
                    <span>GST Amount ({gstRate}%):</span>
                    <span className="font-mono font-black">{gstType === "add" ? "+ " : "- "} {formatINR(gstVal)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1.5 border-t border-dashed border-emerald-300 text-sm font-black text-gray-900">
                    <span>{gstType === "add" ? "Total Price (Incl. GST):" : "Net Price (Excl. GST):"}</span>
                    <span className="text-emerald-700 font-mono text-base">{formatINR(gstType === "add" ? grossVal : netVal)}</span>
                  </div>
                </div>
              );
            })()}

            {/* GST Slab Selector */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-gray-700">Choose GST Rate (%):</span>
              <div className="grid grid-cols-5 gap-1.5">
                {[0, 5, 12, 18, 28].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setGstRate(rate)}
                    className={`py-2 rounded-xl font-black text-xs border transition cursor-pointer ${gstRate === rate
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
                className={`py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${discountMode === "percent"
                  ? "bg-[#d97706] text-white border-[#d97706]"
                  : "bg-white text-gray-700 border-gray-200"
                  }`}
              >
                Percentage (%)
              </button>
              <button
                onClick={() => setDiscountMode("flat")}
                className={`py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${discountMode === "flat"
                  ? "bg-[#d97706] text-white border-[#d97706]"
                  : "bg-white text-gray-700 border-gray-200"
                  }`}
              >
                Flat Amount (₹)
              </button>
            </div>

            {/* Original Price / Amount Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 flex justify-between">
                <span>Original Price (₹):</span>
                <button
                  type="button"
                  onClick={() =>
                    setDiscountOriginalPrice(
                      String(runningTotal > 0 ? runningTotal : parseFloat(currentInput) || 100)
                    )
                  }
                  className="text-[10px] text-amber-600 font-bold hover:underline cursor-pointer"
                >
                  Use Calc Amount ({formatINR(runningTotal || parseFloat(currentInput) || 100)})
                </button>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-sm font-bold text-gray-400 pointer-events-none">₹</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={discountOriginalPrice}
                  onChange={(e) => {
                    const val = e.target.value;
                    // Allow empty string, numbers and single decimal point so user can backspace freely
                    if (val === "" || /^\d*\.?\d*$/.test(val)) {
                      setDiscountOriginalPrice(val);
                    }
                  }}
                  placeholder={String(runningTotal || parseFloat(currentInput) || 100)}
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-xl text-sm font-black text-gray-900 outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] bg-white"
                />
              </div>
            </div>

            {/* Price Preview & Real-time Calculation */}
            {(() => {
              const parsedVal = parseFloat(discountOriginalPrice);
              const current =
                !isNaN(parsedVal) && parsedVal >= 0
                  ? parsedVal
                  : runningTotal > 0
                    ? runningTotal
                    : parseFloat(currentInput) || 100;

              let discVal = 0;
              if (discountMode === "percent") {
                discVal = (current * discountPercent) / 100;
              } else {
                discVal = discountAmount;
              }
              const finalVal = Math.max(0, current - discVal);

              return (
                <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200 space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                    <span>Original Price:</span>
                    <span className="font-mono text-gray-900 font-extrabold">{formatINR(current)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-amber-700">
                    <span>Discount Savings:</span>
                    <span className="font-mono font-black">- {formatINR(discVal)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1.5 border-t border-dashed border-amber-300 text-sm font-black text-gray-900">
                    <span>Final Price:</span>
                    <span className="text-[#d97706] font-mono text-base">{formatINR(finalVal)}</span>
                  </div>
                </div>
              );
            })()}

            {discountMode === "percent" ? (
              <div className="space-y-3">
                {/* Manual Number Enter Input */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 flex justify-between">
                    <span>Discount Percentage:</span>
                    <span className="text-[#d97706] font-black">{discountPercent}%</span>
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={discountPercent}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setDiscountPercent(Math.min(100, Math.max(0, val)));
                      }}
                      placeholder="Enter %"
                      className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-xl text-sm font-black text-gray-900 outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] bg-white"
                    />
                    <span className="absolute right-3 text-sm font-bold text-gray-400 pointer-events-none">%</span>
                  </div>
                </div>

                {/* Slider bar */}
                <div className="space-y-1">
                  <input
                    type="range"
                    min="1"
                    max="90"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    className="w-full accent-[#d97706] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-semibold px-0.5">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>90%</span>
                  </div>
                </div>

                {/* Quick Preset Buttons */}
                <div className="flex items-center gap-1.5 pt-1">
                  {[5, 10, 15, 20, 25, 50].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setDiscountPercent(preset)}
                      className={`flex-1 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${discountPercent === preset
                        ? "bg-amber-100 border-amber-400 text-amber-800"
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                      {preset}%
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-700">Enter Discount Amount:</span>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-sm font-bold text-gray-400 pointer-events-none">₹</span>
                  <input
                    type="number"
                    value={discountAmount || ""}
                    onChange={(e) => setDiscountAmount(Number(e.target.value))}
                    placeholder="100"
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-xl text-sm font-black text-gray-800 outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706]"
                  />
                </div>
                {/* Quick Preset Buttons */}
                <div className="flex items-center gap-1.5 pt-1">
                  {[50, 100, 200, 500, 1000].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setDiscountAmount(preset)}
                      className={`flex-1 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${discountAmount === preset
                        ? "bg-amber-100 border-amber-400 text-amber-800"
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                      ₹{preset}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleApplyDiscount}
              className="w-full py-2.5 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-sm shadow-sm transition cursor-pointer"
            >
              Apply Discount
            </button>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL 3: CURRENCY CONVERTER (All Country Currencies) */}
      {/* ================================================================= */}
      {activeModal === "currency" && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto no-scrollbar animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-gray-900">
                  Global Currency Converter
                </h3>
                <span className="text-[11px] text-gray-500">
                  Convert base currency to all countries live
                </span>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-gray-600">From Currency:</span>
                <select
                  value={currencyFrom}
                  onChange={(e) => setCurrencyFrom(e.target.value)}
                  className="w-full p-2 border rounded-xl font-bold text-gray-800 text-xs bg-gray-50"
                >
                  {Object.entries(CURRENCY_RATES).map(([code, info]) => (
                    <option key={code} value={code}>
                      {code} - {info.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-gray-600">Enter Amount:</span>
                <input
                  type="number"
                  value={currencyAmount}
                  onChange={(e) => setCurrencyAmount(Number(e.target.value))}
                  className="w-full p-2 border rounded-xl font-black text-gray-900 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block">
                All Country Currencies
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs max-h-56 overflow-y-auto no-scrollbar pr-1">
                {Object.entries(CURRENCY_RATES).map(([curr, info]) => {
                  // Calculate conversion relative to currencyFrom
                  const fromRate = CURRENCY_RATES[currencyFrom]?.rate || 1;
                  const targetRate = info.rate;
                  // amountInINR = currencyAmount / fromRate
                  // converted = amountInINR * targetRate
                  const converted = ((currencyAmount / fromRate) * targetRate).toFixed(2);

                  return (
                    <div
                      key={curr}
                      onClick={() => setCurrencyTo(curr)}
                      className={`p-2.5 rounded-xl border flex flex-col cursor-pointer transition ${currencyTo === curr
                        ? "bg-blue-50 border-blue-400 shadow-2xs"
                        : "bg-gray-50 hover:bg-gray-100/80 border-gray-200"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-black text-blue-700">{curr}</span>
                        <span className="text-[10px] text-gray-400 truncate max-w-[65px]">
                          {info.symbol}
                        </span>
                      </div>
                      <span className="text-sm font-black text-gray-900 mt-1">
                        {info.symbol} {converted}
                      </span>
                      <span className="text-[10px] text-gray-400 truncate mt-0.5">
                        {info.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => {
                const fromRate = CURRENCY_RATES[currencyFrom]?.rate || 1;
                const toRate = CURRENCY_RATES[currencyTo]?.rate || 1;
                const converted = Number(((currencyAmount / fromRate) * toRate).toFixed(2));
                setTapeSteps((prev) => [
                  ...prev,
                  {
                    id: `curr-${Date.now()}`,
                    label: `Converted to ${currencyTo}`,
                    operand: converted,
                    subtotal: converted,
                  },
                ]);
                setRunningTotal(converted);
                setCurrentInput(String(converted));
                setActiveModal(null);
              }}
              className="w-full py-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs shadow-md transition cursor-pointer"
            >
              Use Converted Value in Calculator
            </button>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL 4: COMPARE & MULTI-PERSON SPLIT (Add Person, Amounts, Split) */}
      {/* ================================================================= */}
      {activeModal === "compare" && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto no-scrollbar animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-gray-900 leading-none">
                  Compare & Expense Split
                </h3>
                <span className="text-[11px] text-gray-500">
                  Compare amounts, difference, split share & descriptions
                </span>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Total Bill / Group Expense Input (e.g. ₹2000 total bill to be split) */}
            <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-900">Total Group Bill / Expense (₹):</span>
                <button
                  type="button"
                  onClick={() =>
                    setCompareTotalBill(
                      String(runningTotal > 0 ? runningTotal : parseFloat(currentInput) || 0)
                    )
                  }
                  className="text-[10px] text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  Use Calc ({formatINR(runningTotal || parseFloat(currentInput) || 0)})
                </button>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-sm font-bold text-gray-400 pointer-events-none">₹</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={compareTotalBill}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^\d*\.?\d*$/.test(val)) {
                      setCompareTotalBill(val);
                    }
                  }}
                  placeholder="Enter total bill (e.g. 2000)"
                  className="w-full pl-7 pr-3 py-2 border border-blue-200 rounded-xl text-sm font-black text-gray-900 outline-none focus:border-blue-500 bg-white"
                />
              </div>
            </div>

            {/* Total, Difference & Average Summary */}
            {(() => {
              const enteredBill = parseFloat(compareTotalBill);
              const totalSumOfPaid = compareItems.reduce((acc, p) => acc + p.value, 0);
              const effectiveTotal = !isNaN(enteredBill) && enteredBill > 0 ? enteredBill : totalSumOfPaid;
              const perPersonShare = compareItems.length ? effectiveTotal / compareItems.length : 0;
              const totalPaidSoFar = totalSumOfPaid;
              const remainingToPay = Math.max(0, effectiveTotal - totalPaidSoFar);

              return (
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2 bg-[#f0fdf4] border border-[#bbf7d0] p-3 rounded-2xl text-xs">
                    <div>
                      <span className="text-gray-500 font-bold block text-[10px]">Total Bill:</span>
                      <span className="text-sm font-black text-gray-900">
                        {formatINR(effectiveTotal)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 font-bold block text-[10px]">
                        Per Person Share ({compareItems.length}):
                      </span>
                      <span className="text-sm font-black text-[#059669]">
                        {formatINR(perPersonShare)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 font-bold block text-[10px]">
                        {remainingToPay > 0 ? "Remaining Bill:" : "Paid Status:"}
                      </span>
                      <span
                        className={`text-sm font-black ${
                          remainingToPay > 0 ? "text-amber-600" : "text-emerald-700"
                        }`}
                      >
                        {remainingToPay > 0 ? formatINR(remainingToPay) : "Fully Settled"}
                      </span>
                    </div>
                  </div>

                  {/* Smart Who-Pays-Whom Settlement Plan */}
                  {(() => {
                    // Calculate balances: positive means overpaid (gets back), negative means underpaid (owes)
                    const balances = compareItems.map((p) => ({
                      name: p.name || "Person",
                      balance: p.value - perPersonShare,
                    }));

                    const debtors = balances.filter((b) => b.balance < -0.01);
                    const creditors = balances.filter((b) => b.balance > 0.01);

                    if (creditors.length === 0 || debtors.length === 0) return null;

                    return (
                      <div className="p-3 bg-purple-50/80 border border-purple-200 rounded-2xl space-y-1 text-xs">
                        <span className="text-[11px] font-black text-purple-900 flex items-center gap-1">
                          <span>🤝 Settlement Plan (Who Pays Whom):</span>
                        </span>
                        <div className="space-y-1 pt-1">
                          {debtors.map((d, dIdx) => {
                            const c = creditors[dIdx % creditors.length];
                            const payAmount = Math.min(Math.abs(d.balance), c ? c.balance : Math.abs(d.balance));
                            return (
                              <div
                                key={dIdx}
                                className="flex justify-between items-center text-xs font-bold text-gray-800 bg-white/80 p-2 rounded-xl border border-purple-100"
                              >
                                <span className="text-red-600">{d.name}</span>
                                <span className="text-gray-400 font-mono text-[11px]">pays</span>
                                <span className="text-purple-700 font-black">{formatINR(payAmount)}</span>
                                <span className="text-gray-400 font-mono text-[11px]">to</span>
                                <span className="text-emerald-700">{c ? c.name : "Overpaid Person"}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              );
            })()}

            {/* Persons Inputs List */}
            <div className="space-y-2.5">
              {compareItems.map((item, index) => {
                const enteredBill = parseFloat(compareTotalBill);
                const totalSumOfPaid = compareItems.reduce((acc, p) => acc + p.value, 0);
                const effectiveTotal = !isNaN(enteredBill) && enteredBill > 0 ? enteredBill : totalSumOfPaid;
                const perPersonShare = compareItems.length ? effectiveTotal / compareItems.length : 0;
                const diffFromShare = item.value - perPersonShare;
                const percentage =
                  effectiveTotal > 0
                    ? ((item.value / effectiveTotal) * 100).toFixed(1)
                    : "0";

                return (
                  <div
                    key={item.id}
                    className="p-3 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <input
                          type="text"
                          value={item.name}
                          placeholder={`Person ${index + 1}`}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCompareItems((prev) =>
                              prev.map((p) => (p.id === item.id ? { ...p, name: val } : p))
                            );
                          }}
                          className="text-xs font-bold text-gray-900 flex-1 outline-none border-b border-transparent focus:border-blue-400 bg-transparent min-w-[80px]"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-gray-400">Paid: ₹</span>
                        <input
                          type="number"
                          value={item.value === 0 ? "" : item.value}
                          placeholder="0"
                          onChange={(e) => {
                            const val = e.target.value === "" ? 0 : Number(e.target.value);
                            setCompareItems((prev) =>
                              prev.map((p) => (p.id === item.id ? { ...p, value: val } : p))
                            );
                          }}
                          className="w-24 text-right text-xs font-black text-gray-900 outline-none border border-gray-200 focus:border-blue-400 rounded-lg px-2 py-1 bg-gray-50/50"
                        />
                        {compareItems.length > 2 && (
                          <button
                            type="button"
                            onClick={() =>
                              setCompareItems((prev) => prev.filter((p) => p.id !== item.id))
                            }
                            title="Remove person"
                            className="p-1 text-gray-300 hover:text-red-500 rounded transition cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-gray-500 gap-2">
                      <input
                        type="text"
                        placeholder="Enter description (e.g. Dinner, Drinks, Cab)"
                        value={item.description}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCompareItems((prev) =>
                            prev.map((p) => (p.id === item.id ? { ...p, description: val } : p))
                          );
                        }}
                        className="flex-1 outline-none text-gray-600 text-[11px] placeholder:text-gray-300 border-b border-dashed border-gray-200 pb-0.5 focus:border-blue-300"
                      />
                      <span className="font-extrabold text-blue-600 shrink-0">Paid {percentage}%</span>
                    </div>

                    {/* Accurate Per-Person Split Status */}
                    <div className="text-[11px] font-bold text-gray-600 flex justify-between items-center pt-1 border-t border-gray-100">
                      <span>
                        Should Pay:{" "}
                        <span className="text-gray-900 font-extrabold">
                          {formatINR(perPersonShare)}
                        </span>
                      </span>
                      <span>
                        {diffFromShare > 0.01 ? (
                          <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                            Gets back {formatINR(diffFromShare)}
                          </span>
                        ) : diffFromShare < -0.01 ? (
                          <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                            Needs to pay {formatINR(Math.abs(diffFromShare))}
                          </span>
                        ) : (
                          <span className="text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                            Settled (₹0.00)
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
              type="button"
              onClick={() => {
                const nextNum = compareItems.length + 1;
                setCompareItems((prev) => [
                  ...prev,
                  {
                    id: `p-${Date.now()}`,
                    name: `Person ${nextNum}`,
                    value: 0,
                    description: "",
                  },
                ]);
              }}
              className="w-full py-2.5 rounded-xl border border-dashed border-blue-300 text-blue-600 hover:bg-blue-50/80 text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Person</span>
            </button>

            {/* Bottom Actions: Reset to standard empty values and Use in Calc */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => {
                  setCompareItems([
                    { id: "p1", name: "Person 1", value: 0, description: "" },
                    { id: "p2", name: "Person 2", value: 0, description: "" },
                  ]);
                }}
                className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-bold transition cursor-pointer"
              >
                Reset to Empty
              </button>
              <button
                onClick={() => {
                  const maxVal = Math.max(...compareItems.map((p) => p.value));
                  const minVal = Math.min(...compareItems.map((p) => p.value));
                  const diffVal = maxVal - minVal;

                  setTapeSteps((prev) => [
                    ...prev,
                    {
                      id: `cmp-${Date.now()}`,
                      label: `Compare Diff (Max - Min)`,
                      operand: diffVal,
                      subtotal: diffVal,
                    },
                  ]);
                  setRunningTotal(diffVal);
                  setCurrentInput(String(diffVal));
                  setActiveModal(null);
                }}
                className="flex-1 py-2 rounded-xl bg-[#2563eb] text-white hover:bg-blue-700 text-xs font-bold transition cursor-pointer"
              >
                Use Diff in Calc
              </button>
            </div>
          </div>
        </div>
      )}



      {/* ================================================================= */}
      {/* MODAL 5.5: ACTIVE UNIT CONVERTER DETAIL (Length, Weight, etc.) */}
      {/* ================================================================= */}
      {activeModal === "converter-detail" && (() => {
        const config = CONVERTER_CONFIG[selectedConverterId] || CONVERTER_CONFIG.length;
        const fromUnitObj = config.units.find((u) => u.id === converterFromUnit) || config.units[0];
        const toUnitObj = config.units.find((u) => u.id === converterToUnit) || config.units[1];

        // Convert input -> base -> target unit
        const baseVal = fromUnitObj.toBase(converterInput);
        const convertedResult = Number(toUnitObj.fromBase(baseVal).toFixed(4));

        return (
          <div className="absolute inset-0 z-50 bg-white flex flex-col animate-in fade-in duration-150">
            {/* Header */}
            <div className="h-[52px] px-5 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer"
                  title="Close to Calculator"
                >
                  ←
                </button>
                <h3 className="text-base font-black text-gray-900">
                  {config.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4">
              {/* Top Card: Live Conversion Value */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/60 border border-blue-200/80 shadow-xs space-y-2">
                <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider block">
                  CONVERTED VALUE
                </span>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-3xl font-black text-gray-900">
                    {convertedResult}
                  </span>
                  <span className="text-sm font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-md">
                    {toUnitObj.id}
                  </span>
                </div>
                <div className="text-[11px] text-gray-500 font-medium">
                  {converterInput} {fromUnitObj.label} = {convertedResult} {toUnitObj.label}
                </div>
              </div>

              {/* Input Value */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Enter Value:</label>
                <input
                  type="number"
                  value={converterInput}
                  onChange={(e) => setConverterInput(Number(e.target.value))}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-black text-gray-900 text-sm outline-none focus:bg-white focus:border-blue-400"
                />
              </div>

              {/* Unit Selectors (From & To) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500">From Unit:</label>
                  <select
                    value={converterFromUnit}
                    onChange={(e) => setConverterFromUnit(e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-blue-400"
                  >
                    {config.units.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500">To Unit:</label>
                  <select
                    value={converterToUnit}
                    onChange={(e) => setConverterToUnit(e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-blue-400"
                  >
                    {config.units.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Only Selected Two Units Conversion Card (Replaced messy all-units table) */}
              <div className="p-4 bg-gray-50/90 rounded-2xl border border-gray-200 space-y-2">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">
                  Chosen Conversion Result:
                </span>
                <div className="flex items-center justify-between p-3 bg-white border border-blue-200 rounded-xl shadow-xs">
                  <div>
                    <span className="text-xs font-bold text-gray-500 block">From:</span>
                    <span className="text-base font-black text-gray-800">
                      {converterInput} {fromUnitObj.label}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-blue-600 block">To:</span>
                    <span className="text-lg font-black text-blue-600">
                      {convertedResult} {toUnitObj.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Use Value in Calculator */}
              <button
                onClick={() => {
                  setCurrentInput(String(convertedResult));
                  setActiveModal(null);
                }}
                className="w-full py-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs shadow-md transition cursor-pointer"
              >
                Use {convertedResult} in Calculator
              </button>
            </div>
          </div>
        );
      })()}

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
              historyList.map((hist) => {
                const isExpanded = !!expandedHistoryIds[hist.id];

                // Build compact horizontal expression string: e.g. "8 + 8 + 8 + 8 + 5 + 2..."
                const horizontalFormula = hist.steps
                  .map((s, idx) => (idx === 0 ? `${s.operand}` : `${s.operator || "+"} ${s.operand}`))
                  .join(" ");

                return (
                  <div
                    key={hist.id}
                    className="p-3.5 rounded-2xl border border-gray-200 bg-white shadow-xs space-y-2.5 transition"
                  >
                    {/* Header: Result Title with In-place Edit & Exact Date / Time */}
                    <div className="flex items-center justify-between gap-2">
                      {editingHistoryId === hist.id ? (
                        <div className="flex items-center gap-1.5 flex-1">
                          <input
                            type="text"
                            autoFocus
                            value={editingHistoryTitle}
                            onChange={(e) => setEditingHistoryTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSaveEditHistory(hist.id);
                              else if (e.key === "Escape") setEditingHistoryId(null);
                            }}
                            placeholder="Enter calculation name..."
                            className="text-xs font-black text-gray-900 border border-blue-400 rounded-lg px-2 py-0.5 outline-none w-full bg-white"
                          />
                          <button
                            onClick={() => handleSaveEditHistory(hist.id)}
                            className="p-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer text-[10px] font-bold"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingHistoryId(null)}
                            className="p-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer text-[10px] font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 flex-1 min-w-0">
                          <span className="text-xs font-black text-gray-900 truncate">
                            {hist.title}
                          </span>
                          <span className="text-xs font-black text-emerald-600 shrink-0">
                            ({formatINR(hist.finalResult)})
                          </span>
                          <button
                            onClick={() => {
                              setEditingHistoryId(hist.id);
                              setEditingHistoryTitle(hist.title);
                              // Strip out any trailing (₹...) from title if it was present
                              const cleanName = hist.title.replace(/\s*\([^)]*₹[^)]*\)\s*$/, "").trim();
                              setEditingHistoryTitle(cleanName);
                            }}
                            title="Edit Name"
                            className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition cursor-pointer"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      <span className="text-[10px] text-gray-400 font-semibold shrink-0">
                        {hist.timestamp}
                      </span>
                    </div>

                    {/* Compact 2-Line Horizontal Preview (Values & Arithmetic Operations) */}
                    {!isExpanded && (
                      <div className="bg-gray-50/80 p-2.5 rounded-xl border border-gray-100 space-y-1">
                        <div className="text-xs font-mono font-bold text-gray-700 line-clamp-2 break-all leading-relaxed">
                          {horizontalFormula}
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-dashed border-gray-200 text-[11px]">
                          <span className="font-extrabold text-gray-400">Total Steps: {hist.steps.length}</span>
                          <button
                            onClick={() =>
                              setExpandedHistoryIds((prev) => ({
                                ...prev,
                                [hist.id]: true,
                              }))
                            }
                            className="text-blue-600 hover:text-blue-700 font-bold hover:underline cursor-pointer"
                          >
                            Expand Full Details ▼
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Expanded Full Step-by-Step Breakdown (Matching the uploaded image) */}
                    {isExpanded && (
                      <div className="space-y-1.5 animate-in fade-in duration-150">
                        <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100 max-h-60 overflow-y-auto no-scrollbar space-y-1">
                          {hist.steps.map((s, sIdx) => (
                            <div
                              key={s.id}
                              className={`flex justify-between items-center text-xs pb-1 border-b border-gray-100 ${sIdx === hist.steps.length - 1 ? "border-b-0 font-black text-gray-900" : "text-gray-700"
                                }`}
                            >
                              <span className="font-medium">
                                {s.operator ? `${s.operator} ${s.operand}` : s.operand}
                              </span>
                              <span className="font-bold text-gray-900">
                                {formatINR(s.subtotal)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={() =>
                              setExpandedHistoryIds((prev) => ({
                                ...prev,
                                [hist.id]: false,
                              }))
                            }
                            className="text-[11px] text-gray-500 hover:text-gray-700 font-bold hover:underline cursor-pointer"
                          >
                            Collapse Details ▲
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Footer Actions: Share, Restore to Calc & Delete */}
                    <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                      <button
                        onClick={() => handleShareHistoryItem(hist)}
                        title="Share this calculation"
                        className="px-2.5 py-1.5 rounded-lg text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleRestoreHistory(hist)}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Restore to Calc</span>
                        </button>
                        <button
                          onClick={() => handleDeleteHistory(hist.id)}
                          title="Delete History Item"
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
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
