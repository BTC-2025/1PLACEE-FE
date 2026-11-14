"use client";

import React from "react";
import { X, RotateCcw, Check, Copy, Trash2, HeartPulse, Edit2, History as HistoryIcon } from "lucide-react";
import { CalculationHistoryItem, CONVERTER_CONFIG } from "./calculatorData";

export interface CalculatorModalsPart2Props {
  activeModal: string | null;
  setActiveModal: React.Dispatch<React.SetStateAction<any>>;
  selectedConverterId: string;
  converterInput: number;
  setConverterInput: React.Dispatch<React.SetStateAction<number>>;
  converterFromUnit: string;
  setConverterFromUnit: React.Dispatch<React.SetStateAction<string>>;
  converterToUnit: string;
  setConverterToUnit: React.Dispatch<React.SetStateAction<string>>;
  bmiGender: "male" | "female";
  setBmiGender: React.Dispatch<React.SetStateAction<"male" | "female">>;
  bmiAge: string;
  setBmiAge: React.Dispatch<React.SetStateAction<string>>;
  bmiHeightUnit: "cm" | "ft";
  setBmiHeightUnit: React.Dispatch<React.SetStateAction<"cm" | "ft">>;
  bmiWeightUnit: "kg" | "lbs";
  setBmiWeightUnit: React.Dispatch<React.SetStateAction<"kg" | "lbs">>;
  bmiHeightCm: string;
  setBmiHeightCm: React.Dispatch<React.SetStateAction<string>>;
  bmiHeightFeet: string;
  setBmiHeightFeet: React.Dispatch<React.SetStateAction<string>>;
  bmiHeightInches: string;
  setBmiHeightInches: React.Dispatch<React.SetStateAction<string>>;
  bmiWeightKg: string;
  setBmiWeightKg: React.Dispatch<React.SetStateAction<string>>;
  bmiWeightLbs: string;
  setBmiWeightLbs: React.Dispatch<React.SetStateAction<string>>;
  historyList: CalculationHistoryItem[];
  handleRestoreHistory: (item: CalculationHistoryItem) => void;
  expandedHistoryIds: Record<string, boolean>;
  setExpandedHistoryIds: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  editingHistoryId: string | null;
  setEditingHistoryId: React.Dispatch<React.SetStateAction<string | null>>;
  editingHistoryTitle: string;
  setEditingHistoryTitle: React.Dispatch<React.SetStateAction<string>>;
  handleSaveEditHistory: (id: string) => void;
  handleCopyHistoryItem: (item: CalculationHistoryItem) => void;
  handleDeleteHistory: (id: string) => void;
  handleClearAllHistory: () => void;
  copiedHistoryId: string | null;
  formatINR: (val: number) => string;
  runningTotal: number;
  handleCopyBreakdown: () => void;
  copyFeedback: boolean;
  setCurrentInput: React.Dispatch<React.SetStateAction<string>>;
  tapeSteps: any[];
}

export const CalculatorModalsPart2: React.FC<CalculatorModalsPart2Props> = ({
  activeModal,
  setActiveModal,
  selectedConverterId,
  converterInput,
  setConverterInput,
  converterFromUnit,
  setConverterFromUnit,
  converterToUnit,
  setConverterToUnit,
  bmiGender,
  setBmiGender,
  bmiAge,
  setBmiAge,
  bmiHeightUnit,
  setBmiHeightUnit,
  bmiWeightUnit,
  setBmiWeightUnit,
  bmiHeightCm,
  setBmiHeightCm,
  bmiHeightFeet,
  setBmiHeightFeet,
  bmiHeightInches,
  setBmiHeightInches,
  bmiWeightKg,
  setBmiWeightKg,
  bmiWeightLbs,
  setBmiWeightLbs,
  historyList,
  handleRestoreHistory,
  expandedHistoryIds,
  setExpandedHistoryIds,
  editingHistoryId,
  setEditingHistoryId,
  editingHistoryTitle,
  setEditingHistoryTitle,
  handleSaveEditHistory,
  handleCopyHistoryItem,
  handleDeleteHistory,
  handleClearAllHistory,
  copiedHistoryId,
  formatINR,
  runningTotal,
  handleCopyBreakdown,
  copyFeedback,
  setCurrentInput,
  tapeSteps,
}) => {
  return (
    <>
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
      {/* MODAL 5.8: BMI HEALTH CALCULATOR */}
      {/* ================================================================= */}
      {activeModal === "bmi" && (() => {
        // Calculate Height in meters & Weight in kg
        let heightM = 1.7;
        let weightKg = 68;

        if (bmiHeightUnit === "cm") {
          const cm = parseFloat(bmiHeightCm) || 0;
          heightM = cm > 0 ? cm / 100 : 0;
        } else {
          const ft = parseFloat(bmiHeightFeet) || 0;
          const inch = parseFloat(bmiHeightInches) || 0;
          const totalInches = ft * 12 + inch;
          heightM = totalInches * 0.0254;
        }

        if (bmiWeightUnit === "kg") {
          weightKg = parseFloat(bmiWeightKg) || 0;
        } else {
          const lbs = parseFloat(bmiWeightLbs) || 0;
          weightKg = lbs * 0.45359237;
        }

        const bmiValue = heightM > 0 ? Number((weightKg / (heightM * heightM)).toFixed(1)) : 0;

        // Healthy weight range for this height (BMI 18.5 - 24.9)
        const healthyMinKg = heightM > 0 ? (18.5 * heightM * heightM).toFixed(1) : "0";
        const healthyMaxKg = heightM > 0 ? (24.9 * heightM * heightM).toFixed(1) : "0";

        // Category determination
        let category = "Normal";
        let categoryColor = "text-emerald-700 bg-emerald-100 border-emerald-300";
        let recommendation = "Maintain healthy diet and regular physical activity.";

        if (bmiValue < 18.5) {
          category = "Underweight";
          categoryColor = "text-sky-700 bg-sky-100 border-sky-300";
          recommendation = "Consider nutrient-dense foods & consult a physician.";
        } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
          category = "Normal (Healthy)";
          categoryColor = "text-emerald-700 bg-emerald-100 border-emerald-300";
          recommendation = "Great job! Keep up balanced nutrition & daily workouts.";
        } else if (bmiValue >= 25 && bmiValue <= 29.9) {
          category = "Overweight";
          categoryColor = "text-amber-700 bg-amber-100 border-amber-300";
          recommendation = "Incorporate regular cardio exercise & mindful portion control.";
        } else if (bmiValue >= 30) {
          category = "Obese";
          categoryColor = "text-rose-700 bg-rose-100 border-rose-300";
          recommendation = "Consult a healthcare provider for personalized guidance.";
        }

        return (
          <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end">
            <div className="bg-white rounded-t-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto no-scrollbar animate-in slide-in-from-bottom duration-200">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-gray-900 leading-none">
                      BMI Calculator
                    </h3>
                    <span className="text-[11px] text-gray-500">
                      Body Mass Index, Healthy Range & Health Status
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Gender & Age Selection */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600">Gender:</label>
                  <div className="grid grid-cols-2 gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200">
                    <button
                      type="button"
                      onClick={() => setBmiGender("male")}
                      className={`py-1 text-xs font-bold rounded-lg transition cursor-pointer ${bmiGender === "male"
                        ? "bg-blue-600 text-white shadow-2xs"
                        : "text-gray-600 hover:bg-gray-200/60"
                        }`}
                    >
                      ♂ Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setBmiGender("female")}
                      className={`py-1 text-xs font-bold rounded-lg transition cursor-pointer ${bmiGender === "female"
                        ? "bg-pink-600 text-white shadow-2xs"
                        : "text-gray-600 hover:bg-gray-200/60"
                        }`}
                    >
                      ♀ Female
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600">Age (years):</label>
                  <input
                    type="number"
                    value={bmiAge}
                    onChange={(e) => setBmiAge(e.target.value)}
                    placeholder="25"
                    className="w-full text-xs font-bold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 focus:bg-white text-gray-900"
                  />
                </div>
              </div>

              {/* Height & Weight Inputs with inline unit toggle (cm vs ft, kg vs lbs) */}
              <div className="grid grid-cols-2 gap-2">
                {/* Height */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-gray-600">Height:</label>
                    {/* Inline unit toggle */}
                    <div className="flex items-center bg-gray-100 p-0.5 rounded-md border border-gray-200 text-[10px] font-black">
                      <button
                        type="button"
                        onClick={() => setBmiHeightUnit("cm")}
                        className={`px-1.5 py-0.5 rounded transition cursor-pointer ${bmiHeightUnit === "cm"
                          ? "bg-white text-emerald-700 shadow-2xs"
                          : "text-gray-500 hover:text-gray-800"
                          }`}
                      >
                        cm
                      </button>
                      <button
                        type="button"
                        onClick={() => setBmiHeightUnit("ft")}
                        className={`px-1.5 py-0.5 rounded transition cursor-pointer ${bmiHeightUnit === "ft"
                          ? "bg-white text-emerald-700 shadow-2xs"
                          : "text-gray-500 hover:text-gray-800"
                          }`}
                      >
                        ft/in
                      </button>
                    </div>
                  </div>

                  {bmiHeightUnit === "cm" ? (
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        value={bmiHeightCm}
                        onChange={(e) => setBmiHeightCm(e.target.value)}
                        placeholder="170"
                        className="w-full text-xs font-bold pl-3 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 focus:bg-white text-gray-900"
                      />
                      <span className="absolute right-2.5 text-[11px] font-bold text-gray-400 pointer-events-none">
                        cm
                      </span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-1">
                      <div className="relative flex items-center">
                        <input
                          type="number"
                          value={bmiHeightFeet}
                          onChange={(e) => setBmiHeightFeet(e.target.value)}
                          placeholder="5"
                          className="w-full text-xs font-bold pl-2 pr-6 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 focus:bg-white text-gray-900"
                        />
                        <span className="absolute right-2 text-[10px] font-bold text-gray-400 pointer-events-none">
                          ft
                        </span>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          type="number"
                          value={bmiHeightInches}
                          onChange={(e) => setBmiHeightInches(e.target.value)}
                          placeholder="7"
                          className="w-full text-xs font-bold pl-2 pr-6 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 focus:bg-white text-gray-900"
                        />
                        <span className="absolute right-2 text-[10px] font-bold text-gray-400 pointer-events-none">
                          in
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Weight */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-gray-600">Weight:</label>
                    {/* Inline unit toggle */}
                    <div className="flex items-center bg-gray-100 p-0.5 rounded-md border border-gray-200 text-[10px] font-black">
                      <button
                        type="button"
                        onClick={() => setBmiWeightUnit("kg")}
                        className={`px-1.5 py-0.5 rounded transition cursor-pointer ${bmiWeightUnit === "kg"
                          ? "bg-white text-emerald-700 shadow-2xs"
                          : "text-gray-500 hover:text-gray-800"
                          }`}
                      >
                        kg
                      </button>
                      <button
                        type="button"
                        onClick={() => setBmiWeightUnit("lbs")}
                        className={`px-1.5 py-0.5 rounded transition cursor-pointer ${bmiWeightUnit === "lbs"
                          ? "bg-white text-emerald-700 shadow-2xs"
                          : "text-gray-500 hover:text-gray-800"
                          }`}
                      >
                        lbs
                      </button>
                    </div>
                  </div>

                  <div className="relative flex items-center">
                    {bmiWeightUnit === "kg" ? (
                      <input
                        type="number"
                        value={bmiWeightKg}
                        onChange={(e) => setBmiWeightKg(e.target.value)}
                        placeholder="68"
                        className="w-full text-xs font-bold pl-3 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 focus:bg-white text-gray-900"
                      />
                    ) : (
                      <input
                        type="number"
                        value={bmiWeightLbs}
                        onChange={(e) => setBmiWeightLbs(e.target.value)}
                        placeholder="150"
                        className="w-full text-xs font-bold pl-3 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 focus:bg-white text-gray-900"
                      />
                    )}
                    <span className="absolute right-2.5 text-[11px] font-bold text-gray-400 pointer-events-none">
                      {bmiWeightUnit}
                    </span>
                  </div>
                </div>
              </div>

              {/* BMI Result Showcase Card */}
              <div className="p-4 bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-blue-50/60 rounded-2xl border border-emerald-200/90 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-widest block">
                      Your Body Mass Index (BMI)
                    </span>
                    <span className="text-3xl font-black text-gray-900">
                      {bmiValue > 0 ? bmiValue : "--"}
                    </span>
                    <span className="text-xs text-gray-500 font-bold ml-1.5">
                      kg/m²
                    </span>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-xs font-black px-3 py-1 rounded-full border shadow-2xs inline-block ${categoryColor}`}
                    >
                      {category}
                    </span>
                    <span className="text-[10px] text-gray-500 font-bold block mt-1">
                      Target: 18.5 - 24.9
                    </span>
                  </div>
                </div>

                {/* Multi-color Spectrum Progress Bar */}
                <div className="space-y-1">
                  <div className="relative h-3 w-full bg-gray-200 rounded-full overflow-hidden flex shadow-inner">
                    <div title="Underweight (< 18.5)" className="h-full bg-sky-400 w-[28%]" />
                    <div title="Normal (18.5 - 24.9)" className="h-full bg-emerald-500 w-[22%]" />
                    <div title="Overweight (25 - 29.9)" className="h-full bg-amber-400 w-[17%]" />
                    <div title="Obese (>= 30)" className="h-full bg-rose-500 flex-1" />
                  </div>

                  {/* Range Labels */}
                  <div className="flex justify-between text-[9px] font-bold text-gray-400 px-0.5">
                    <span>10 (Under)</span>
                    <span className="text-emerald-700">18.5 (Normal)</span>
                    <span className="text-amber-700">25 (Over)</span>
                    <span className="text-rose-700">30+ (Obese)</span>
                  </div>
                </div>

                {/* Additional Health Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-200/60 text-xs">
                  <div className="bg-white/80 p-2 rounded-xl border border-emerald-100">
                    <span className="text-[10px] font-bold text-gray-500 block">
                      Healthy Weight Range:
                    </span>
                    <span className="text-xs font-black text-emerald-800">
                      {healthyMinKg} kg - {healthyMaxKg} kg
                    </span>
                  </div>
                  <div className="bg-white/80 p-2 rounded-xl border border-emerald-100">
                    <span className="text-[10px] font-bold text-gray-500 block">
                      Ponderal Index:
                    </span>
                    <span className="text-xs font-black text-gray-800">
                      {heightM > 0 ? (weightKg / (heightM * heightM * heightM)).toFixed(1) : "--"} kg/m³
                    </span>
                  </div>
                </div>

                {/* Recommendation Note */}
                <div className="text-[11px] text-gray-600 bg-white/70 p-2 rounded-xl border border-emerald-100">
                  💡 <strong>Advice:</strong> {recommendation}
                </div>
              </div>

              {/* Action: Use in Calculator */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setBmiHeightCm("170");
                    setBmiWeightKg("68");
                    setBmiHeightFeet("5");
                    setBmiHeightInches("7");
                    setBmiWeightLbs("150");
                  }}
                  className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-bold transition cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentInput(String(bmiValue));
                    setActiveModal(null);
                  }}
                  className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer shadow-xs"
                >
                  Use BMI ({bmiValue}) in Calc
                </button>
              </div>
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
              <HistoryIcon className="w-4 h-4 text-blue-600" />
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

                    {/* Footer Actions: Copy, Restore to Calc & Delete */}
                    <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                      <button
                        onClick={() => handleCopyHistoryItem(hist)}
                        title="Copy this calculation"
                        className="px-2.5 py-1.5 rounded-lg text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedHistoryId === hist.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                            <span className="text-emerald-600 font-black">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
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
    </>
  );
};
