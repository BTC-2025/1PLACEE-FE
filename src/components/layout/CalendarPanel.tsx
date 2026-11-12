"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
  Trash2,
  CheckCircle2,
  RotateCcw,
  ChevronDown,
  Calendar as CalendarIcon,
  CheckSquare,
  MapPin,
  Users,
  Clock,
  AlignLeft,
  AlertCircle,
} from "lucide-react";
import { useQuickSidebarStore } from "@/stores/quickSidebarStore";

export type ScheduleType = "event" | "task";

export interface ScheduleItem {
  id: string;
  type: ScheduleType;
  title: string;
  day: number;
  month: number;
  year: number;
  time: string; // Timing (e.g. "10:00 AM" or "10:00 AM - 11:30 AM")
  // Event specific fields
  location?: string;
  guestName?: string;
  description?: string;
  // Task specific fields
  deadline?: string; // Deadline (e.g. "5:00 PM" or "Tomorrow")
  completed?: boolean;
}

interface HolidayItem {
  day: number;
  name: string;
}

// Indian Government Holidays across all states & central Gazetted list
const INDIAN_GOVT_HOLIDAYS: Record<number, HolidayItem[]> = {
  0: [
    { day: 14, name: "Pongal / Makar Sankranti" },
    { day: 15, name: "Thiruvalluvar Day / Magh Bihu" },
    { day: 16, name: "Uzhavar Thirunal" },
    { day: 26, name: "Republic Day (National Holiday)" },
  ],
  1: [
    { day: 15, name: "Maha Shivaratri" },
  ],
  2: [
    { day: 20, name: "Id-ul-Fitr (Ramzan)" },
    { day: 25, name: "Holi" },
  ],
  3: [
    { day: 3, name: "Good Friday" },
    { day: 14, name: "Tamil New Year / Dr. B.R. Ambedkar Jayanti" },
    { day: 21, name: "Mahavir Jayanti" },
  ],
  4: [
    { day: 1, name: "May Day / Workers' Day" },
    { day: 27, name: "Bakrid / Eid al-Adha" },
  ],
  5: [
    { day: 26, name: "Muharram" },
  ],
  6: [],
  7: [
    { day: 15, name: "Independence Day (National Holiday)" },
    { day: 26, name: "Milad-un-Nabi" },
  ],
  8: [
    { day: 4, name: "Krishna Jayanti / Janmashtami" },
    { day: 14, name: "Vinayakar Chathurthi / Ganesh Utsav" },
  ],
  9: [
    { day: 2, name: "Mahatma Gandhi Jayanti (National Holiday)" },
    { day: 19, name: "Ayutha Pooja / Saraswathi Pooja" },
    { day: 20, name: "Vijaya Dasami / Dussehra" },
  ],
  10: [
    { day: 8, name: "Diwali / Deepavali" },
    { day: 24, name: "Guru Nanak Jayanti" },
  ],
  11: [
    { day: 25, name: "Christmas Day" },
  ],
};

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTH_SHORT_NAMES = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export const CalendarPanel: React.FC = () => {
  const { activePanel, closePanel } = useQuickSidebarStore();

  // Actual Today's date reference
  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  // Viewing Date: Initialized to today's date
  const [currentDate, setCurrentDate] = useState(() => new Date(todayYear, todayMonth, 1));
  const [selectedDay, setSelectedDay] = useState<number>(todayDay);

  // Add Item Modal / Input Form state
  const [isAdding, setIsAdding] = useState(false);
  const [itemType, setItemType] = useState<ScheduleType>("event");
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("10:00 AM");
  // Event fields
  const [newLocation, setNewLocation] = useState("");
  const [newGuestName, setNewGuestName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  // Task fields
  const [newDeadline, setNewDeadline] = useState("06:00 PM");

  // Clock Picker Modal / Popover State
  const [clockPickerTarget, setClockPickerTarget] = useState<"time" | "deadline" | null>(null);
  const [clockHour, setClockHour] = useState<number>(10);
  const [clockMinute, setClockMinute] = useState<number>(0);
  const [clockPeriod, setClockPeriod] = useState<"AM" | "PM">("AM");
  const [clockMode, setClockMode] = useState<"hours" | "minutes">("hours");
  const TIME_OPTIONS = [
    "All Day",
    "06:00 AM",
    "06:30 AM",
    "07:00 AM",
    "07:30 AM",
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
    "08:30 PM",
    "09:00 PM",
    "09:30 PM",
    "10:00 PM",
    "11:00 PM",
  ];

  const DEADLINE_OPTIONS = [
    "End of Day (11:59 PM)",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
    "Tomorrow Morning (09:00 AM)",
    "Tomorrow EOD (06:00 PM)",
    "This Weekend",
    "Next Week",
  ];

  // Filter tab for display: All, Events, Tasks
  const [filterTab, setFilterTab] = useState<"all" | "event" | "task">("all");

  // Schedule Items list with persistent localStorage sync
  const [schedules, setSchedules] = useState<ScheduleItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("1place_calendar_schedules");
        if (saved) return JSON.parse(saved);
      } catch (err) {
        console.error("Failed to load schedules", err);
      }
    }
    return [
      {
        id: "default-1",
        type: "event",
        day: 12,
        month: 10, // November (0-indexed)
        year: 2026,
        time: "10:30 AM",
        title: "Product Launch Review",
        location: "Conference Hall A / Google Meet",
        guestName: "Arun Kumar, Priya Sharma",
        description: "Quarterly review of 1PLACE e-commerce platform & features.",
      },
      {
        id: "default-2",
        type: "task",
        day: 12,
        month: 10,
        year: 2026,
        time: "02:00 PM",
        deadline: "06:00 PM",
        title: "Complete UI testing & deployment",
        completed: false,
      },
    ];
  });

  // Sync to localStorage whenever schedules change
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("1place_calendar_schedules", JSON.stringify(schedules));
      } catch (err) {
        console.error("Failed to save schedules", err);
      }
    }
  }, [schedules]);

  if (activePanel !== "calendar") return null;

  const currentYear = currentDate.getFullYear();
  const currentMonthIdx = currentDate.getMonth();
  const currentMonthName = MONTH_NAMES[currentMonthIdx];
  const currentMonthShort = MONTH_SHORT_NAMES[currentMonthIdx];

  // Calculate days in the current month
  const totalDaysInMonth = new Date(currentYear, currentMonthIdx + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonthIdx, 1).getDay(); // 0 = Sunday

  // Indian Government Holidays map for current month
  const monthHolidays = INDIAN_GOVT_HOLIDAYS[currentMonthIdx] || [];
  const holidaysMap = new Map<number, HolidayItem[]>();
  monthHolidays.forEach((h) => {
    const list = holidaysMap.get(h.day) || [];
    list.push(h);
    holidaysMap.set(h.day, list);
  });

  // Selected day's holidays
  const selectedDayHolidays = holidaysMap.get(selectedDay) || [];

  // Month navigation handlers
  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setSelectedDay(1);
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setSelectedDay(1);
  };

  // Reset to Current Today Handler
  const handleResetToToday = () => {
    setCurrentDate(new Date(todayYear, todayMonth, 1));
    setSelectedDay(todayDay);
  };

  // Parse time string e.g. "12:55 AM" to state
  const openClockPicker = (target: "time" | "deadline", currentVal: string) => {
    setClockPickerTarget(target);
    setClockMode("hours");

    const match = currentVal.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (match) {
      setClockHour(parseInt(match[1], 10) || 12);
      setClockMinute(parseInt(match[2], 10) || 0);
      setClockPeriod((match[3]?.toUpperCase() as "AM" | "PM") || "AM");
    } else {
      setClockHour(10);
      setClockMinute(0);
      setClockPeriod("AM");
    }
  };

  const applyClockTime = () => {
    const formattedHour = clockHour.toString().padStart(2, "0");
    const formattedMinute = clockMinute.toString().padStart(2, "0");
    const formatted = `${formattedHour}:${formattedMinute} ${clockPeriod}`;

    if (clockPickerTarget === "time") {
      setNewTime(formatted);
    } else if (clockPickerTarget === "deadline") {
      setNewDeadline(formatted);
    }
    setClockPickerTarget(null);
  };
  const handleSelectMonth = (monthIdx: number) => {
    setCurrentDate(new Date(currentYear, monthIdx, 1));
    setSelectedDay(1);
  };

  const handleSelectYear = (year: number) => {
    setCurrentDate(new Date(year, currentMonthIdx, 1));
    setSelectedDay(1);
  };

  // Add schedule handler
  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: ScheduleItem = {
      id: Date.now().toString(),
      type: itemType,
      day: selectedDay,
      month: currentMonthIdx,
      year: currentYear,
      time: newTime || "All Day",
      title: newTitle.trim(),
      ...(itemType === "event"
        ? {
            location: newLocation.trim() || undefined,
            guestName: newGuestName.trim() || undefined,
            description: newDescription.trim() || undefined,
          }
        : {
            deadline: newDeadline.trim() || undefined,
            completed: false,
          }),
    };

    setSchedules((prev) => [...prev, newItem]);

    // Reset fields
    setNewTitle("");
    setNewLocation("");
    setNewGuestName("");
    setNewDescription("");
    setIsAdding(false);
  };

  const handleToggleTask = (id: string) => {
    setSchedules((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules((prev) => prev.filter((item) => item.id !== id));
  };

  // Filter schedules for the selected day
  const rawDaySchedules = schedules.filter(
    (s) =>
      s.day === selectedDay &&
      s.month === currentMonthIdx &&
      s.year === currentYear
  );

  const daySchedules = rawDaySchedules.filter((s) => {
    if (filterTab === "all") return true;
    return s.type === filterTab;
  });

  const eventCount = rawDaySchedules.filter((s) => s.type === "event").length;
  const taskCount = rawDaySchedules.filter((s) => s.type === "task").length;

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <aside
      aria-label="Calendar Panel"
      className="fixed right-[60px] sm:right-[62px] top-[60px] bottom-0 w-[350px] sm:w-[360px] bg-[#f8fbff] border-l border-[#b9d9f9] shadow-[-6px_0_24px_rgba(30,58,138,0.08)] z-50 flex flex-col select-none transition-transform duration-300 ease-in-out animate-in slide-in-from-right-4 overflow-y-auto no-scrollbar"
    >
      {/* Top Header matching exact screenshot */}
      <div className="h-[44px] px-4 flex items-center justify-between border-b border-[#e2eaf4] bg-white shrink-0">
        <h2 className="text-[15px] font-extrabold text-[#0f172a] tracking-wider uppercase">
          CALENDAR
        </h2>
        <div className="flex items-center gap-1.5">
          {/* Refresh / Reset to Today Button */}
          <button
            onClick={handleResetToToday}
            title={`Jump to Today (${todayDay} ${MONTH_SHORT_NAMES[todayMonth]} ${todayYear})`}
            aria-label="Jump to Today"
            className="h-8 px-2.5 rounded-lg bg-[#eff6ff] text-[#1d4ed8] hover:bg-[#dbeafe] flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer border border-[#bfdbfe] shadow-2xs hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2.4]" />
            <span>Today</span>
          </button>

          <button
            onClick={closePanel}
            title="Close Calendar"
            aria-label="Close"
            className="w-8 h-8 rounded-lg bg-[#f1f5f9] text-[#64748b] hover:text-[#0f172a] hover:bg-[#e2e8f0] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>

      <div className="p-3.5 flex flex-col gap-3">
        {/* Month & Year Selector Pill Card with Quick Dropdowns and Previous/Next buttons */}
        <div className="bg-white border border-[#cde2f8] rounded-2xl px-2.5 py-2 flex items-center justify-between shadow-[0_2px_8px_rgba(37,99,235,0.04)]">
          <button
            onClick={handlePrevMonth}
            title="Previous month"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#f1f5f9] text-[#64748b] hover:text-[#0f172a] hover:bg-[#e2e8f0] transition cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
          </button>

          {/* Direct Month & Year Dropdown Selectors */}
          <div className="flex items-center gap-1.5">
            {/* Month Dropdown */}
            <div className="relative flex items-center">
              <select
                aria-label="Select Month"
                value={currentMonthIdx}
                onChange={(e) => handleSelectMonth(Number(e.target.value))}
                className="appearance-none bg-[#f8fbff] hover:bg-[#eff6ff] text-[#0f172a] font-bold text-xs sm:text-[13px] pl-2.5 pr-6 py-1.5 rounded-lg border border-[#cde2f8] outline-none cursor-pointer transition shadow-2xs"
              >
                {MONTH_NAMES.map((name, idx) => (
                  <option key={name} value={idx}>
                    {name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-1.5 pointer-events-none" />
            </div>

            {/* Year Dropdown */}
            <div className="relative flex items-center">
              <select
                aria-label="Select Year"
                value={currentYear}
                onChange={(e) => handleSelectYear(Number(e.target.value))}
                className="appearance-none bg-[#f8fbff] hover:bg-[#eff6ff] text-[#0f172a] font-bold text-xs sm:text-[13px] pl-2.5 pr-6 py-1.5 rounded-lg border border-[#cde2f8] outline-none cursor-pointer transition shadow-2xs"
              >
                {Array.from({ length: 25 }, (_, i) => 2020 + i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-1.5 pointer-events-none" />
            </div>
          </div>

          <button
            onClick={handleNextMonth}
            title="Next month"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#f1f5f9] text-[#64748b] hover:text-[#0f172a] hover:bg-[#e2e8f0] transition cursor-pointer shrink-0"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>

        {/* Days Grid Box Card */}
        <div className="bg-white border border-[#cde2f8] rounded-2xl p-3.5 shadow-[0_2px_8px_rgba(37,99,235,0.04)]">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 text-center text-xs font-semibold text-[#64748b] mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="py-0.5">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 text-center text-sm font-medium gap-y-1">
            {/* Empty padding days before day 1 */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="py-1" />
            ))}

            {/* Month days */}
            {Array.from({ length: totalDaysInMonth }, (_, i) => i + 1).map((day) => {
              const isSelected = selectedDay === day;
              const isToday =
                day === todayDay &&
                currentMonthIdx === todayMonth &&
                currentYear === todayYear;

              const dayHolidays = holidaysMap.get(day);
              const isIndianHoliday = dayHolidays && dayHolidays.length > 0;

              // Check if user has saved any events/reminders for this date
              const hasEventsOrReminders = schedules.some(
                (s) =>
                  s.day === day &&
                  s.month === currentMonthIdx &&
                  s.year === currentYear
              );

              // 1. Today: ALWAYS highlighted with standard rich blue background + white text
              // 2. Selected (other than today): Light blue background with blue border & blue text
              // 3. Normal day: Clean slate text with subtle hover
              let dayButtonStyle = "text-[#334155] hover:bg-[#f1f5f9] font-medium";

              if (isToday) {
                dayButtonStyle =
                  "bg-[#2563eb] text-white font-extrabold shadow-md shadow-blue-500/30 scale-105";
              } else if (isSelected) {
                dayButtonStyle =
                  "bg-[#e0f2fe] text-[#0284c7] font-bold  shadow-xs";
              }

              return (
                <div key={day} className="py-0.5 flex flex-col items-center justify-center relative">
                  <button
                    onClick={() => setSelectedDay(day)}
                    title={
                      isToday
                        ? `Today: ${day} ${currentMonthName}`
                        : isIndianHoliday
                          ? dayHolidays.map((h) => h.name).join(", ")
                          : hasEventsOrReminders
                            ? `Event / Reminder on Day ${day}`
                            : `Day ${day}`
                    }
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all cursor-pointer relative ${dayButtonStyle}`}
                  >
                    {day}
                  </button>

                  {/* Indicator Dots below date */}
                  <div className="flex items-center justify-center gap-1 mt-0.5 absolute -bottom-1 pointer-events-none">
                    {/* GREEN DOT: Shown when an event or reminder is saved for this date */}
                    {hasEventsOrReminders && (
                      <span
                        title="Event / Reminder Saved"
                        className="w-1.5 h-1.5 rounded-full bg-[#16a34a] ring-1 ring-white shadow-xs"
                      />
                    )}

                    {/* RED DOT: Indian Government Holiday */}
                    {isIndianHoliday && (
                      <span
                        title={dayHolidays.map((h) => h.name).join(", ")}
                        className="w-1.5 h-1.5 rounded-full bg-[#dc2626] ring-1 ring-white shadow-xs"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Holidays Tooltip / Banner if any */}
        {selectedDayHolidays.length > 0 && (
          <div className="px-3.5 py-2 rounded-xl bg-red-50/90 border border-red-200/90 flex flex-col gap-1 shadow-2xs">
            {selectedDayHolidays.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-semibold text-red-900">
                <span className="w-2 h-2 rounded-full shrink-0 bg-[#dc2626]" />
                <span className="truncate flex-1">{h.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase bg-red-100 text-red-700 border border-red-200 shrink-0">
                  Govt Holiday
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Schedule Header Row */}
        <div className="flex items-center justify-between pt-1 px-1">
          <span className="text-[11px] font-bold text-[#64748b] tracking-wider uppercase">
            SCHEDULE FOR {selectedDay} {currentMonthShort} {currentYear}
          </span>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1 bg-[#eff6ff] hover:bg-[#dbeafe] text-[#1d4ed8] px-3 py-1 rounded-lg text-xs font-bold border border-[#bfdbfe] transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add</span>
          </button>
        </div>

        {/* Filter Pills: All, Events, Tasks */}
        <div className="grid grid-cols-3 gap-1 bg-white p-1 rounded-xl border border-blue-100/80 shadow-2xs">
          <button
            type="button"
            onClick={() => setFilterTab("all")}
            className={`py-1 text-[11px] font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
              filterTab === "all"
                ? "bg-[#2563eb] text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span>All</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-black/10">
              {rawDaySchedules.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("event")}
            className={`py-1 text-[11px] font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
              filterTab === "event"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <CalendarIcon className="w-3 h-3" />
            <span>Events</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-black/10">
              {eventCount}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("task")}
            className={`py-1 text-[11px] font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
              filterTab === "task"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <CheckSquare className="w-3 h-3" />
            <span>Tasks</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-black/10">
              {taskCount}
            </span>
          </button>
        </div>

        {/* Inline Add Event / Task Form */}
        {isAdding && (
          <form
            onSubmit={handleAddSchedule}
            className="p-3.5 bg-white border border-[#bfdbfe] rounded-2xl flex flex-col gap-2.5 shadow-sm animate-in fade-in duration-150"
          >
            {/* Type Switcher: Event vs Task */}
            <div className="grid grid-cols-2 gap-1 p-0.5 bg-gray-100 rounded-xl">
              <button
                type="button"
                onClick={() => setItemType("event")}
                className={`py-1 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  itemType === "event"
                    ? "bg-white text-purple-700 shadow-xs"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5 text-purple-600" />
                <span>Event</span>
              </button>
              <button
                type="button"
                onClick={() => setItemType("task")}
                className={`py-1 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  itemType === "task"
                    ? "bg-white text-emerald-700 shadow-xs"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>Task</span>
              </button>
            </div>

            {/* Title Input */}
            <div className="space-y-1">
              <input
                type="text"
                placeholder={itemType === "event" ? "Event title (e.g. Client Meet, Launch)..." : "Task title (e.g. Review PR, Submit Report)..."}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                autoFocus
                className="w-full text-xs font-semibold px-3 py-2 bg-[#f8fafc] border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white text-gray-800 placeholder:text-gray-400 transition"
              />
            </div>

            {/* Timing & Date Info */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span>Time / Start:</span>
                </span>
                <button
                  type="button"
                  onClick={() => openClockPicker("time", newTime)}
                  className="w-full text-xs font-bold px-2.5 py-1.5 bg-[#f8fafc] hover:bg-blue-50/60 border border-gray-200 hover:border-blue-400 rounded-lg flex items-center justify-between text-gray-800 transition cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{newTime || "Select Time"}</span>
                  </span>
                  <span className="text-[10px] text-blue-600 font-extrabold bg-blue-100 px-1.5 py-0.2 rounded">
                    Choose
                  </span>
                </button>
              </div>

              {itemType === "task" ? (
                /* Task specific: Deadline Selector */
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-emerald-600" />
                    <span>Deadline:</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => openClockPicker("deadline", newDeadline)}
                    className="w-full text-xs font-bold px-2.5 py-1.5 bg-[#f8fafc] hover:bg-emerald-50/60 border border-emerald-200 hover:border-emerald-400 rounded-lg flex items-center justify-between text-gray-800 transition cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{newDeadline || "Set Deadline"}</span>
                    </span>
                    <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-100 px-1.5 py-0.2 rounded shrink-0">
                      Choose
                    </span>
                  </button>
                </div>
              ) : (
                /* Event specific: Location */
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-purple-700 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-purple-600" />
                    <span>Location:</span>
                  </span>
                  <input
                    type="text"
                    placeholder="Room A / Meet link"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 bg-[#f8fafc] border border-gray-200 rounded-lg outline-none text-gray-800 focus:border-purple-500 focus:bg-white"
                  />
                </div>
              )}
            </div>

            {/* Event Specific: Guest Name & Description */}
            {itemType === "event" && (
              <>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                    <Users className="w-3 h-3 text-gray-400" />
                    <span>Guest Name(s):</span>
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. Arun, Priya, John Doe"
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 bg-[#f8fafc] border border-gray-200 rounded-lg outline-none text-gray-800 focus:border-blue-400 focus:bg-white"
                  />
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                    <AlignLeft className="w-3 h-3 text-gray-400" />
                    <span>Description / Agenda:</span>
                  </span>
                  <textarea
                    rows={2}
                    placeholder="Brief description or meeting agenda..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 bg-[#f8fafc] border border-gray-200 rounded-lg outline-none text-gray-800 focus:border-blue-400 focus:bg-white resize-none"
                  />
                </div>
              </>
            )}

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-2 pt-1 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`text-xs font-bold px-4 py-1.5 rounded-lg text-white transition cursor-pointer shadow-xs ${
                  itemType === "event"
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                Save {itemType === "event" ? "Event" : "Task"}
              </button>
            </div>
          </form>
        )}

        {/* Schedule List or Empty State Box */}
        {daySchedules.length > 0 ? (
          <div className="flex flex-col gap-2.5">
            {daySchedules.map((item) => {
              const isEvent = item.type === "event";

              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl border transition group shadow-2xs space-y-2 ${
                    isEvent
                      ? "border-purple-200/90 bg-white hover:bg-purple-50/30"
                      : "border-emerald-200/90 bg-white hover:bg-emerald-50/30"
                  }`}
                >
                  {/* Top row: Type badge, Title & Delete button */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      {/* Checkbox for Task, Icon for Event */}
                      {isEvent ? (
                        <div className="w-5 h-5 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                          <CalendarIcon className="w-3 h-3" />
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleToggleTask(item.id)}
                          className="shrink-0 mt-0.5 cursor-pointer text-gray-400 hover:text-emerald-600 transition"
                        >
                          {item.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                          ) : (
                            <div className="w-4 h-4 rounded border-2 border-gray-300 hover:border-emerald-500 transition" />
                          )}
                        </button>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-md ${
                              isEvent
                                ? "bg-purple-100 text-purple-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {isEvent ? "Event" : "Task"}
                          </span>
                          <p
                            className={`text-xs font-bold leading-tight ${
                              item.completed
                                ? "line-through text-gray-400"
                                : "text-gray-900"
                            }`}
                          >
                            {item.title}
                          </p>
                        </div>

                        {/* Timing line */}
                        <div className="flex items-center gap-2 mt-1 text-[11px] flex-wrap">
                          <span className="text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <strong className="text-gray-700">{item.time}</strong>
                          </span>

                          {/* Task deadline */}
                          {!isEvent && item.deadline && (
                            <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-bold text-[10px] flex items-center gap-1">
                              <AlertCircle className="w-2.5 h-2.5" />
                              <span>Due: {item.deadline}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteSchedule(item.id)}
                      title="Delete item"
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition cursor-pointer p-1 rounded-md hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Event Details: Location, Guest Name, Description */}
                  {isEvent && (item.location || item.guestName || item.description) && (
                    <div className="pt-1.5 border-t border-gray-100 space-y-1 text-[11px]">
                      {item.location && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPin className="w-3 h-3 text-purple-600 shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </div>
                      )}

                      {item.guestName && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <Users className="w-3 h-3 text-blue-600 shrink-0" />
                          <span className="truncate">Guests: <strong>{item.guestName}</strong></span>
                        </div>
                      )}

                      {item.description && (
                        <div className="flex items-start gap-1 text-gray-500 pt-0.5">
                          <AlignLeft className="w-3 h-3 text-gray-400 shrink-0 mt-0.5" />
                          <p className="text-[10px] leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="border border-dashed border-[#c9dff7] rounded-2xl py-8 px-4 text-center bg-white/60">
            <p className="text-xs text-[#8ca3ba] font-medium leading-relaxed">
              {filterTab === "all"
                ? "No events or tasks scheduled for this day."
                : filterTab === "event"
                ? "No events scheduled for this day."
                : "No tasks scheduled for this day."}
            </p>
          </div>
        )}
      </div>

      {/* ================================================================= */}
      {/* SIMPLE CLOCK TIME PICKER (Single View: Hour, Minute, AM/PM)       */}
      {/* ================================================================= */}
      {clockPickerTarget && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-150">
          <div className="bg-white rounded-t-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto no-scrollbar animate-in slide-in-from-bottom duration-200">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900 leading-tight">
                    {clockPickerTarget === "time" ? "Select Start Time" : "Select Deadline Time"}
                  </h3>
                  <span className="text-[11px] text-gray-500">
                    Choose Hour, Minute & AM/PM
                  </span>
                </div>
              </div>
              <button
                onClick={() => setClockPickerTarget(null)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Live Chosen Time Display */}
            <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-1.5">
                <span className="text-3xl font-black text-blue-700 font-mono">
                  {clockHour.toString().padStart(2, "0")}
                </span>
                <span className="text-3xl font-black text-gray-400 font-mono animate-pulse">:</span>
                <span className="text-3xl font-black text-blue-700 font-mono">
                  {clockMinute.toString().padStart(2, "0")}
                </span>
                <span className="text-base font-black text-blue-600 ml-1">
                  {clockPeriod}
                </span>
              </div>

              {/* AM / PM Toggle */}
              <div className="flex items-center bg-white p-1 rounded-xl border border-gray-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setClockPeriod("AM")}
                  className={`px-3 py-1.5 text-xs font-black rounded-lg transition cursor-pointer ${
                    clockPeriod === "AM"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  AM
                </button>
                <button
                  type="button"
                  onClick={() => setClockPeriod("PM")}
                  className={`px-3 py-1.5 text-xs font-black rounded-lg transition cursor-pointer ${
                    clockPeriod === "PM"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  PM
                </button>
              </div>
            </div>

            {/* Simple Direct Selectors: Hour (1-12) & Minute (0-59) in single view */}
            <div className="grid grid-cols-2 gap-3">
              {/* Hours Column */}
              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase tracking-wider text-gray-500 block">
                  Hour (1 - 12):
                </label>
                <div className="grid grid-cols-3 gap-1.5 max-h-48 overflow-y-auto no-scrollbar p-1 bg-gray-50/70 border border-gray-200 rounded-xl">
                  {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setClockHour(h)}
                      className={`h-9 rounded-lg text-xs font-black transition cursor-pointer flex items-center justify-center border ${
                        clockHour === h
                          ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                          : "bg-white hover:bg-blue-50 text-gray-800 border-gray-200"
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              {/* Minutes Column */}
              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase tracking-wider text-gray-500 block">
                  Minute (00 - 59):
                </label>
                <div className="grid grid-cols-3 gap-1.5 max-h-48 overflow-y-auto no-scrollbar p-1 bg-gray-50/70 border border-gray-200 rounded-xl">
                  {/* Common intervals on top */}
                  {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setClockMinute(m)}
                      className={`h-9 rounded-lg text-xs font-black transition cursor-pointer flex items-center justify-center border ${
                        clockMinute === m
                          ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                          : "bg-white hover:bg-blue-50 text-gray-800 border-gray-200"
                      }`}
                    >
                      :{m.toString().padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick 1-minute fine tuner slider/stepper */}
            <div className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs">
              <span className="font-bold text-gray-600 text-[11px]">Exact Minute Adjustment:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setClockMinute((prev) => (prev > 0 ? prev - 1 : 59))}
                  className="w-7 h-7 rounded-lg bg-white border border-gray-200 font-black text-gray-700 hover:bg-gray-100 flex items-center justify-center cursor-pointer shadow-2xs"
                >
                  -
                </button>
                <span className="font-black text-sm text-blue-700 font-mono w-8 text-center">
                  :{clockMinute.toString().padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => setClockMinute((prev) => (prev < 59 ? prev + 1 : 0))}
                  className="w-7 h-7 rounded-lg bg-white border border-gray-200 font-black text-gray-700 hover:bg-gray-100 flex items-center justify-center cursor-pointer shadow-2xs"
                >
                  +
                </button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setClockPickerTarget(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-bold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyClockTime}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition cursor-pointer shadow-xs"
              >
                Apply {clockHour.toString().padStart(2, "0")}:{clockMinute.toString().padStart(2, "0")} {clockPeriod}
              </button>
            </div>
          </div>
        </div>
      )}
    </aside >
  );
};
