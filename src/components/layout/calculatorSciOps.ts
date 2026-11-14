"use client";

import React from "react";
import { TapeStep } from "./calculatorData";

export interface ScientificOpsContext {
  currentInput: string;
  setCurrentInput: React.Dispatch<React.SetStateAction<string>>;
  runningTotal: number;
  setRunningTotal: React.Dispatch<React.SetStateAction<number>>;
  setTapeSteps: React.Dispatch<React.SetStateAction<TapeStep[]>>;
  setExpressionFormula: React.Dispatch<React.SetStateAction<string>>;
  sciAngleMode: "DEG" | "RAD" | "GRAD";
  sciHyp: boolean;
  sci2nd: boolean;
  setPendingOperator: React.Dispatch<React.SetStateAction<string | null>>;
  setIsOperatorJustPressed: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCalculated: React.Dispatch<React.SetStateAction<boolean>>;
  sciFeMode: boolean;
  programmerBase: "HEX" | "DEC" | "OCT" | "BIN";
  programmerWordSize: "QWORD" | "DWORD" | "WORD" | "BYTE";
}

export function executeScientificOp(
  opName: string,
  ctx: ScientificOpsContext
) {
  const {
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
  } = ctx;

  // Scientific Function Handler
  
    // If input is empty, default to 0 (or 0 for trig, or special for constants)
    const val = parseFloat(currentInput) || 0;

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

    // Format precision cleanly avoiding floating point overflow
    let formattedRes = parseFloat(res.toFixed(10));
    const displayStr = sciFeMode ? res.toExponential(4) : String(formattedRes);
    setCurrentInput(displayStr);
    setRunningTotal(res);
    setExpressionFormula(label);
    setTapeSteps((prev) => [
      ...prev,
      {
        id: `sci-${Date.now()}`,
        label,
        operand: val || 0,
        subtotal: res,
      },
    ]);
    setIsCalculated(false);
}

export function executeBitwiseOp(
  op: string,
  ctx: ScientificOpsContext
) {
  const {
    currentInput,
    setCurrentInput,
    runningTotal,
    setRunningTotal,
    setTapeSteps,
    setExpressionFormula,
    setPendingOperator,
    setIsOperatorJustPressed,
    programmerBase,
    programmerWordSize,
  } = ctx;


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
