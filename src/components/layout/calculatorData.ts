import React from "react";
import {
  Layers,
  Scale,
  Thermometer,
  Zap,
  Compass,
  Activity,
  Clock,
  HardDrive,
  Gauge,
} from "lucide-react";

export interface TapeStep {
  id: string;
  label: string;
  operator?: string;
  operand: number;
  subtotal: number;
  note?: string;
}

export interface CalculationHistoryItem {
  id: string;
  title: string;
  timestamp: string;
  steps: TapeStep[];
  finalResult: number;
}

export interface ComparePerson {
  id: string;
  name: string;
  value: number;
  description: string;
}

export const CONVERTER_CATEGORIES = [
  { id: "volume", label: "Volume (L, mL, Gallon, Fl Oz)", icon: React.createElement(Layers, { className: "w-4 h-4" }) },
  { id: "length", label: "Length (m, cm, km, ft, inch, mile)", icon: React.createElement(Scale, { className: "w-4 h-4" }) },
  { id: "weight", label: "Weight and mass (kg, g, mg, lb, oz)", icon: React.createElement(Scale, { className: "w-4 h-4" }) },
  { id: "temperature", label: "Temperature (°C, °F, K)", icon: React.createElement(Thermometer, { className: "w-4 h-4" }) },
  { id: "energy", label: "Energy (Joules, kcal, Wh)", icon: React.createElement(Zap, { className: "w-4 h-4" }) },
  { id: "area", label: "Area (sq ft, sq m, acre, hectare)", icon: React.createElement(Compass, { className: "w-4 h-4" }) },
  { id: "speed", label: "Speed (km/h, m/s, mph, knot)", icon: React.createElement(Activity, { className: "w-4 h-4" }) },
  { id: "time", label: "Time (sec, min, hr, day, week)", icon: React.createElement(Clock, { className: "w-4 h-4" }) },
  { id: "power", label: "Power (Watt, kW, Horsepower)", icon: React.createElement(Zap, { className: "w-4 h-4" }) },
  { id: "data", label: "Data (B, KB, MB, GB, TB)", icon: React.createElement(HardDrive, { className: "w-4 h-4" }) },
  { id: "pressure", label: "Pressure (Pa, bar, psi, atm)", icon: React.createElement(Gauge, { className: "w-4 h-4" }) },
  { id: "angle", label: "Angle (degree, radian, gradian)", icon: React.createElement(Compass, { className: "w-4 h-4" }) },
];

export const CONVERTER_CONFIG: Record<
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
      { id: "cal", label: "Thermal Calories", toBase: (v) => v * 4.184, fromBase: (v) => v / 4.184 },
      { id: "kcal", label: "Food Calories (kcal)", toBase: (v) => v * 4184, fromBase: (v) => v / 4184 },
      { id: "Wh", label: "Watt-hours (Wh)", toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      { id: "kWh", label: "Kilowatt-hours (kWh)", toBase: (v) => v * 3600000, fromBase: (v) => v / 3600000 },
      { id: "eV", label: "Electron-volts (eV)", toBase: (v) => v * 1.60218e-19, fromBase: (v) => v / 1.60218e-19 },
      { id: "btu", label: "British Thermal Units (BTU)", toBase: (v) => v * 1055.06, fromBase: (v) => v / 1055.06 },
    ],
  },
  area: {
    title: "Area Converter",
    units: [
      { id: "sq_m", label: "Square meters (m²)", toBase: (v) => v, fromBase: (v) => v },
      { id: "sq_cm", label: "Square centimeters (cm²)", toBase: (v) => v / 10000, fromBase: (v) => v * 10000 },
      { id: "sq_mm", label: "Square millimeters (mm²)", toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
      { id: "sq_km", label: "Square kilometers (km²)", toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      { id: "sq_ft", label: "Square feet (ft²)", toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
      { id: "sq_in", label: "Square inches (in²)", toBase: (v) => v * 0.00064516, fromBase: (v) => v / 0.00064516 },
      { id: "sq_yd", label: "Square yards (yd²)", toBase: (v) => v * 0.836127, fromBase: (v) => v / 0.836127 },
      { id: "acre", label: "Acres (ac)", toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
      { id: "hectare", label: "Hectares (ha)", toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
    ],
  },
  speed: {
    title: "Speed Converter",
    units: [
      { id: "mps", label: "Meters per second (m/s)", toBase: (v) => v, fromBase: (v) => v },
      { id: "kph", label: "Kilometers per hour (km/h)", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      { id: "mph", label: "Miles per hour (mph)", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      { id: "knot", label: "Knots (kn)", toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
      { id: "fps", label: "Feet per second (ft/s)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    ],
  },
  time: {
    title: "Time Converter",
    units: [
      { id: "s", label: "Seconds (s)", toBase: (v) => v, fromBase: (v) => v },
      { id: "ms", label: "Milliseconds (ms)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: "min", label: "Minutes (min)", toBase: (v) => v * 60, fromBase: (v) => v / 60 },
      { id: "hr", label: "Hours (h)", toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      { id: "day", label: "Days (d)", toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
      { id: "week", label: "Weeks (wk)", toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
      { id: "year", label: "Years (yr)", toBase: (v) => v * 31536000, fromBase: (v) => v / 31536000 },
    ],
  },
  power: {
    title: "Power Converter",
    units: [
      { id: "W", label: "Watts (W)", toBase: (v) => v, fromBase: (v) => v },
      { id: "kW", label: "Kilowatts (kW)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: "hp", label: "Mechanical Horsepower (hp)", toBase: (v) => v * 745.699872, fromBase: (v) => v / 745.699872 },
      { id: "ftlb_s", label: "Foot-pounds/minute", toBase: (v) => v * 0.0225969658, fromBase: (v) => v / 0.0225969658 },
      { id: "btu_min", label: "BTU per minute", toBase: (v) => v * 17.584264, fromBase: (v) => v / 17.584264 },
    ],
  },
  data: {
    title: "Data Converter",
    units: [
      { id: "B", label: "Bytes (B)", toBase: (v) => v, fromBase: (v) => v },
      { id: "KB", label: "Kilobytes (KB)", toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
      { id: "MB", label: "Megabytes (MB)", toBase: (v) => v * 1048576, fromBase: (v) => v / 1048576 },
      { id: "GB", label: "Gigabytes (GB)", toBase: (v) => v * 1073741824, fromBase: (v) => v / 1073741824 },
      { id: "TB", label: "Terabytes (TB)", toBase: (v) => v * 1099511627776, fromBase: (v) => v / 1099511627776 },
      { id: "bit", label: "Bits (b)", toBase: (v) => v / 8, fromBase: (v) => v * 8 },
      { id: "Kbit", label: "Kilobits (Kb)", toBase: (v) => (v * 1024) / 8, fromBase: (v) => (v * 8) / 1024 },
      { id: "Mbit", label: "Megabits (Mb)", toBase: (v) => (v * 1048576) / 8, fromBase: (v) => (v * 8) / 1048576 },
      { id: "Gbit", label: "Gigabits (Gb)", toBase: (v) => (v * 1073741824) / 8, fromBase: (v) => (v * 8) / 1073741824 },
    ],
  },
  pressure: {
    title: "Pressure Converter",
    units: [
      { id: "Pa", label: "Pascals (Pa)", toBase: (v) => v, fromBase: (v) => v },
      { id: "kPa", label: "Kilopascals (kPa)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: "bar", label: "Bar", toBase: (v) => v * 100000, fromBase: (v) => v / 100000 },
      { id: "psi", label: "Pounds per sq inch (psi)", toBase: (v) => v * 6894.76, fromBase: (v) => v / 6894.76 },
      { id: "atm", label: "Standard Atmospheres (atm)", toBase: (v) => v * 101325, fromBase: (v) => v / 101325 },
      { id: "torr", label: "Torr / mm Hg", toBase: (v) => v * 133.322, fromBase: (v) => v / 133.322 },
    ],
  },
  angle: {
    title: "Angle Converter",
    units: [
      { id: "deg", label: "Degrees (°)", toBase: (v) => v, fromBase: (v) => v },
      { id: "rad", label: "Radians (rad)", toBase: (v) => (v * 180) / Math.PI, fromBase: (v) => (v * Math.PI) / 180 },
      { id: "grad", label: "Gradians (grad)", toBase: (v) => v * 0.9, fromBase: (v) => v / 0.9 },
    ],
  },
};
