"use client";

import React from "react";
import { X, Plus, Split, Trash2, Percent } from "lucide-react";
import { ComparePerson } from "./calculatorData";

export interface CalculatorModalsPart1Props {
  activeModal: string | null;
  setActiveModal: React.Dispatch<React.SetStateAction<any>>;
  gstOriginalPrice: string;
  setGstOriginalPrice: React.Dispatch<React.SetStateAction<string>>;
  gstRate: number;
  setGstRate: React.Dispatch<React.SetStateAction<number>>;
  gstType: "add" | "remove";
  setGstType: React.Dispatch<React.SetStateAction<"add" | "remove">>;
  handleApplyGST: () => void;
  discountOriginalPrice: string;
  setDiscountOriginalPrice: React.Dispatch<React.SetStateAction<string>>;
  discountPercent: number;
  setDiscountPercent: React.Dispatch<React.SetStateAction<number>>;
  discountAmount: number;
  setDiscountAmount: React.Dispatch<React.SetStateAction<number>>;
  discountMode: "percent" | "flat";
  setDiscountMode: React.Dispatch<React.SetStateAction<"percent" | "flat">>;
  handleApplyDiscount: () => void;
  currencyAmount: number;
  setCurrencyAmount: React.Dispatch<React.SetStateAction<number>>;
  currencyFrom: string;
  setCurrencyFrom: React.Dispatch<React.SetStateAction<string>>;
  currencyTo: string;
  setCurrencyTo: React.Dispatch<React.SetStateAction<string>>;
  CURRENCY_RATES: Record<string, { rate: number; name: string; symbol: string }>;
  compareTab: "product" | "split";
  setCompareTab: React.Dispatch<React.SetStateAction<"product" | "split">>;
  compareItems: ComparePerson[];
  setCompareItems: React.Dispatch<React.SetStateAction<ComparePerson[]>>;
  compareTotalBill: string;
  setCompareTotalBill: React.Dispatch<React.SetStateAction<string>>;
  formatINR: (val: number) => string;
  runningTotal: number;
  currentInput: string;
  setCurrentInput: React.Dispatch<React.SetStateAction<string>>;
  setRunningTotal: React.Dispatch<React.SetStateAction<number>>;
  setTapeSteps: React.Dispatch<React.SetStateAction<any[]>>;
}

export const CalculatorModalsPart1: React.FC<CalculatorModalsPart1Props> = ({
  activeModal,
  setActiveModal,
  gstOriginalPrice,
  setGstOriginalPrice,
  gstRate,
  setGstRate,
  gstType,
  setGstType,
  handleApplyGST,
  discountOriginalPrice,
  setDiscountOriginalPrice,
  discountPercent,
  setDiscountPercent,
  discountAmount,
  setDiscountAmount,
  discountMode,
  setDiscountMode,
  handleApplyDiscount,
  currencyAmount,
  setCurrencyAmount,
  currencyFrom,
  setCurrencyFrom,
  currencyTo,
  setCurrencyTo,
  CURRENCY_RATES,
  compareTab,
  setCompareTab,
  compareItems,
  setCompareItems,
  compareTotalBill,
  setCompareTotalBill,
  formatINR,
  runningTotal,
  currentInput,
  setCurrentInput,
  setRunningTotal,
  setTapeSteps,
}) => {
  return (
    <>
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
                      String(runningTotal > 0 ? runningTotal : parseFloat(currentInput) || 0)
                    )
                  }
                  className="text-[10px] text-emerald-600 font-bold hover:underline cursor-pointer"
                >
                  Use Calc Amount ({formatINR(runningTotal || parseFloat(currentInput) || 0)})
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
                  placeholder={String(runningTotal || parseFloat(currentInput) || 0)}
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-xl text-sm font-black text-gray-900 outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] bg-white"
                />
              </div>
            </div>

            {/* Real-time GST Calculation Card */}
            {(() => {
              const calcVal = runningTotal > 0 ? runningTotal : parseFloat(currentInput) || 0;
              const parsedVal = parseFloat(gstOriginalPrice);
              const current =
                !isNaN(parsedVal) && parsedVal >= 0
                  ? parsedVal
                  : calcVal;

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
                      String(runningTotal > 0 ? runningTotal : parseFloat(currentInput) || 0)
                    )
                  }
                  className="text-[10px] text-amber-600 font-bold hover:underline cursor-pointer"
                >
                  Use Calc Amount ({formatINR(runningTotal || parseFloat(currentInput) || 0)})
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
                  placeholder={String(runningTotal || parseFloat(currentInput) || 0)}
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-xl text-sm font-black text-gray-900 outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] bg-white"
                />
              </div>
            </div>

            {/* Price Preview & Real-time Calculation */}
            {(() => {
              const calcVal = runningTotal > 0 ? runningTotal : parseFloat(currentInput) || 0;
              const parsedVal = parseFloat(discountOriginalPrice);
              const current =
                !isNaN(parsedVal) && parsedVal >= 0
                  ? parsedVal
                  : calcVal;

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
      {/* MODAL 4: COMPARE & MULTI-PERSON SPLIT (Add Person / Items, Amounts) */}
      {/* ================================================================= */}
      {activeModal === "compare" && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto no-scrollbar animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-gray-900 leading-none">
                  {compareTab === "product" ? "Product & Price Compare" : "Bill & Expense Split"}
                </h3>
                <span className="text-[11px] text-gray-500">
                  {compareTab === "product"
                    ? "Compare prices of 2 or more products & see best value"
                    : "Split bills among friends & calculate who pays whom"}
                </span>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Clear Mode Switcher Tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-gray-100 rounded-xl">
              <button
                type="button"
                onClick={() => setCompareTab("product")}
                className={`py-2 text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${compareTab === "product"
                  ? "bg-white text-blue-600 shadow-xs ring-1 ring-black/5"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                <span className="text-sm">🏷️</span>
                <span>Product Compare</span>
              </button>
              <button
                type="button"
                onClick={() => setCompareTab("split")}
                className={`py-2 text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${compareTab === "split"
                  ? "bg-white text-emerald-600 shadow-xs ring-1 ring-black/5"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                <span className="text-sm">👥</span>
                <span>Expense Split</span>
              </button>
            </div>

            {compareTab === "product" ? (
              /* ========================================================= */
              /* PRODUCT / PRICE COMPARISON TAB                            */
              /* ========================================================= */
              (() => {
                const pricedItems = compareItems.filter((item) => item.value > 0);
                const values = pricedItems.map((item) => item.value);
                const minPrice = values.length ? Math.min(...values) : 0;
                const maxPrice = values.length ? Math.max(...values) : 0;
                const priceDiff = maxPrice - minPrice;
                const avgPrice = values.length
                  ? values.reduce((a, b) => a + b, 0) / values.length
                  : 0;
                const cheapestItem = pricedItems.find((item) => item.value === minPrice);
                const priciestItem = pricedItems.find((item) => item.value === maxPrice);
                const savingsPercent =
                  maxPrice > 0 ? (((maxPrice - minPrice) / maxPrice) * 100).toFixed(1) : "0";

                return (
                  <div className="space-y-3">
                    {/* Comparison Summary Card */}
                    {values.length >= 2 ? (
                      <div className="bg-gradient-to-br from-blue-50 via-indigo-50/50 to-emerald-50/60 p-3.5 rounded-2xl border border-blue-200/80 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-black text-blue-900 uppercase tracking-wide">
                            Price Comparison Summary
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                            Save up to {savingsPercent}% ({formatINR(priceDiff)})
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="bg-white/90 p-2 rounded-xl border border-emerald-200">
                            <span className="text-[10px] font-bold text-emerald-600 block">
                              🏆 Lowest / Best:
                            </span>
                            <span className="text-xs font-black text-emerald-800 truncate block">
                              {cheapestItem?.name || `Product ${compareItems.findIndex((x) => x.id === cheapestItem?.id) + 1}`}
                            </span>
                            <span className="text-sm font-black text-emerald-700">
                              {formatINR(minPrice)}
                            </span>
                          </div>

                          <div className="bg-white/90 p-2 rounded-xl border border-rose-200">
                            <span className="text-[10px] font-bold text-rose-600 block">
                              Highest Price:
                            </span>
                            <span className="text-xs font-black text-rose-800 truncate block">
                              {priciestItem?.name || `Product ${compareItems.findIndex((x) => x.id === priciestItem?.id) + 1}`}
                            </span>
                            <span className="text-sm font-black text-rose-700">
                              {formatINR(maxPrice)}
                            </span>
                          </div>

                          <div className="bg-white/90 p-2 rounded-xl border border-blue-200">
                            <span className="text-[10px] font-bold text-blue-600 block">
                              Difference:
                            </span>
                            <span className="text-xs font-bold text-gray-500 block">
                              Max vs Min
                            </span>
                            <span className="text-sm font-black text-blue-700">
                              {formatINR(priceDiff)}
                            </span>
                          </div>
                        </div>

                        <div className="text-[11px] text-gray-600 flex justify-between items-center px-1">
                          <span>
                            Average Price ({pricedItems.length} products):{" "}
                            <strong className="text-gray-900 font-extrabold">{formatINR(avgPrice)}</strong>
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-blue-50/60 border border-dashed border-blue-200 p-3 rounded-2xl text-xs text-blue-800">
                        💡 Enter prices for <strong>Product 1</strong> and <strong>Product 2</strong> below to see lowest price, difference, and savings.
                      </div>
                    )}

                    {/* Product Items List */}
                    <div className="space-y-2.5">
                      {compareItems.map((item, index) => {
                        const isCheapest = pricedItems.length >= 2 && item.value === minPrice && item.value > 0;
                        const isHighest = pricedItems.length >= 2 && item.value === maxPrice && item.value > 0 && maxPrice !== minPrice;
                        const diffFromCheapest = item.value > 0 && minPrice > 0 ? item.value - minPrice : 0;

                        return (
                          <div
                            key={item.id}
                            className={`p-3 bg-white border rounded-2xl shadow-xs space-y-2 transition ${isCheapest
                              ? "border-emerald-300 ring-1 ring-emerald-200 bg-emerald-50/20"
                              : "border-gray-200"
                              }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              {/* Left: Number badge + Product name input */}
                              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                <span
                                  className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center shrink-0 ${isCheapest
                                    ? "bg-emerald-600 text-white"
                                    : "bg-blue-100 text-blue-700"
                                    }`}
                                >
                                  {index + 1}
                                </span>
                                <input
                                  type="text"
                                  value={item.name}
                                  placeholder={`Product ${index + 1}`}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setCompareItems((prev) =>
                                      prev.map((p) => (p.id === item.id ? { ...p, name: val } : p))
                                    );
                                  }}
                                  className="text-xs font-bold text-gray-900 flex-1 outline-none border-b border-transparent focus:border-blue-400 bg-transparent min-w-[80px]"
                                />
                                {isCheapest && (
                                  <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md shrink-0">
                                    ★ Lowest
                                  </span>
                                )}
                                {isHighest && (
                                  <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded-md shrink-0">
                                    Highest
                                  </span>
                                )}
                              </div>

                              {/* Right: Price input with ₹ inside the box */}
                              <div className="flex items-center gap-1">
                                <div className="relative flex items-center">
                                  <span className="absolute left-2 text-xs font-bold text-gray-400 pointer-events-none">₹</span>
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
                                    className="w-24 text-right text-xs font-black text-gray-900 outline-none border border-gray-200 focus:border-blue-400 rounded-lg pl-5 pr-2 py-1.5 bg-gray-50/50"
                                  />
                                </div>
                                {compareItems.length > 2 && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setCompareItems((prev) => prev.filter((p) => p.id !== item.id))
                                    }
                                    title="Remove item"
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
                                placeholder="Specifications / notes (optional)"
                                value={item.description}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setCompareItems((prev) =>
                                    prev.map((p) => (p.id === item.id ? { ...p, description: val } : p))
                                  );
                                }}
                                className="flex-1 outline-none text-gray-600 text-[11px] placeholder:text-gray-300 border-b border-dashed border-gray-200 pb-0.5 focus:border-blue-300"
                              />
                              {diffFromCheapest > 0 ? (
                                <span className="font-bold text-rose-600 shrink-0 text-[10px]">
                                  + {formatINR(diffFromCheapest)} more
                                </span>
                              ) : isCheapest ? (
                                <span className="font-bold text-emerald-600 shrink-0 text-[10px]">
                                  Base (Cheapest)
                                </span>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Add Product Button */}
                    <button
                      type="button"
                      onClick={() => {
                        const nextNum = compareItems.length + 1;
                        setCompareItems((prev) => [
                          ...prev,
                          {
                            id: `item-${Date.now()}`,
                            name: "",
                            value: 0,
                            description: "",
                          },
                        ]);
                      }}
                      className="w-full py-2.5 rounded-xl border border-dashed border-blue-300 text-blue-600 hover:bg-blue-50/80 text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Another Product</span>
                    </button>
                  </div>
                );
              })()
            ) : (
              /* ========================================================= */
              /* BILL & EXPENSE SPLIT TAB                                  */
              /* ========================================================= */
              <>
                {/* Total Bill / Group Expense Input */}
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
                            className={`text-sm font-black ${remainingToPay > 0 ? "text-amber-600" : "text-emerald-700"
                              }`}
                          >
                            {remainingToPay > 0 ? formatINR(remainingToPay) : "Fully Settled"}
                          </span>
                        </div>
                      </div>

                      {/* Smart Who-Pays-Whom Settlement Plan */}
                      {(() => {
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
                                const payAmount = Math.min(
                                  Math.abs(d.balance),
                                  c ? c.balance : Math.abs(d.balance)
                                );
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
                            <div className="relative flex items-center">
                              <span className="absolute left-2 text-xs font-bold text-gray-400 pointer-events-none">₹</span>
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
                                className="w-24 text-right text-xs font-black text-gray-900 outline-none border border-gray-200 focus:border-blue-400 rounded-lg pl-5 pr-2 py-1.5 bg-gray-50/50"
                              />
                            </div>
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
                        name: "",
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
              </>
            )}

            {/* Bottom Actions: Reset to standard empty values and Use in Calc */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => {
                  setCompareItems([
                    {
                      id: "p1",
                      name: "",
                      value: 0,
                      description: "",
                    },
                    {
                      id: "p2",
                      name: "",
                      value: 0,
                      description: "",
                    },
                  ]);
                }}
                className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-bold transition cursor-pointer"
              >
                Reset to Empty
              </button>
              <button
                onClick={() => {
                  const values = compareItems.map((p) => p.value).filter((v) => v > 0);
                  const maxVal = values.length ? Math.max(...values) : 0;
                  const minVal = values.length ? Math.min(...values) : 0;
                  const diffVal = maxVal - minVal;

                  setTapeSteps((prev) => [
                    ...prev,
                    {
                      id: `cmp-${Date.now()}`,
                      label:
                        compareTab === "product"
                          ? `Price Diff (Max - Min)`
                          : `Split Compare Diff`,
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
    </>
  );
};
