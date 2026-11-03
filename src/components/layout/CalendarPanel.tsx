"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { useQuickSidebarStore } from "@/stores/quickSidebarStore";

interface ScheduleItem {
  id: string;
  day: number;
  month: number;
  year: number;
  time: string;
  title: string;
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
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("10:00 AM");

  // Schedule Items list
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);

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

  // Add schedule handler
  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setSchedules((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        day: selectedDay,
        month: currentMonthIdx,
        year: currentYear,
        time: newTime || "All Day",
        title: newTitle.trim(),
      },
    ]);

    setNewTitle("");
    setIsAdding(false);
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules((prev) => prev.filter((item) => item.id !== id));
  };

  // Filter schedules for the selected day
  const daySchedules = schedules.filter(
    (s) =>
      s.day === selectedDay &&
      s.month === currentMonthIdx &&
      s.year === currentYear
  );

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div
      aria-label="Calendar Panel"
      className="fixed right-[60px] sm:right-[62px] top-[60px] bottom-0 w-[300px] sm:w-[315px] bg-[#f8fbff] border-l border-[#b9d9f9] shadow-[-6px_0_24px_rgba(30,58,138,0.08)] z-50 flex flex-col select-none transition-transform duration-300 ease-in-out animate-in slide-in-from-right-4 overflow-y-auto no-scrollbar"
    >
      {/* Top Header matching exact screenshot */}
      <div className="h-[52px] px-4 flex items-center justify-between border-b border-[#e2eaf4] bg-white shrink-0">
        <h2 className="text-[15px] font-extrabold text-[#0f172a] tracking-wider uppercase">
          CALENDAR
        </h2>
        <button
          onClick={closePanel}
          title="Close Calendar"
          aria-label="Close"
          className="w-8 h-8 rounded-lg bg-[#f1f5f9] text-[#64748b] hover:text-[#0f172a] hover:bg-[#e2e8f0] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>

      <div className="p-3.5 flex flex-col gap-3">
        {/* Month Selector Pill Card */}
        <div className="bg-white border border-[#cde2f8] rounded-2xl px-3 py-2.5 flex items-center justify-between shadow-[0_2px_8px_rgba(37,99,235,0.04)]">
          <button
            onClick={handlePrevMonth}
            title="Previous month"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#f1f5f9] text-[#64748b] hover:text-[#0f172a] hover:bg-[#e2e8f0] transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
          </button>

          <span className="text-[15px] font-bold text-[#0f172a]">
            {currentMonthName} {currentYear}
          </span>

          <button
            onClick={handleNextMonth}
            title="Next month"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#f1f5f9] text-[#64748b] hover:text-[#0f172a] hover:bg-[#e2e8f0] transition cursor-pointer"
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
              const dayHolidays = holidaysMap.get(day);
              const isIndianHoliday = dayHolidays && dayHolidays.length > 0;

              return (
                <div key={day} className="py-0.5 flex flex-col items-center justify-center relative">
                  <button
                    onClick={() => setSelectedDay(day)}
                    title={
                      isIndianHoliday
                        ? dayHolidays.map((h) => h.name).join(", ")
                        : `Day ${day}`
                    }
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all cursor-pointer relative ${
                      isSelected
                        ? "bg-[#1d4ed8] text-white font-bold shadow-md shadow-blue-500/25"
                        : "text-[#334155] hover:bg-[#f1f5f9] font-medium"
                    }`}
                  >
                    {day}
                  </button>

                  {/* ONLY Indian Government Holiday shows a RED dot */}
                  {isIndianHoliday && (
                    <div className="flex items-center justify-center mt-0.5 absolute -bottom-1 pointer-events-none">
                      <span
                        title={dayHolidays.map((h) => h.name).join(", ")}
                        className="w-1.5 h-1.5 rounded-full bg-[#dc2626] ring-1 ring-white shadow-xs"
                      />
                    </div>
                  )}
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

        {/* Inline Add Task Form */}
        {isAdding && (
          <form onSubmit={handleAddSchedule} className="p-3 bg-white border border-[#bfdbfe] rounded-2xl flex flex-col gap-2 shadow-xs">
            <input
              type="text"
              placeholder="Event or reminder title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
              className="w-full text-xs px-3 py-2 bg-[#f8fafc] border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:bg-white text-gray-800 placeholder:text-gray-400 transition"
            />
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                placeholder="10:00 AM"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-24 text-[11px] px-2.5 py-1.5 bg-[#f8fafc] border border-gray-200 rounded-md outline-none text-gray-700"
              />
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="text-[11px] text-gray-500 hover:text-gray-700 px-2.5 py-1 rounded-md hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-[11px] bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold px-3 py-1 rounded-md transition cursor-pointer shadow-xs"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Schedule List or Empty State Box */}
        {daySchedules.length > 0 ? (
          <div className="flex flex-col gap-2">
            {daySchedules.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between p-3 rounded-xl border border-blue-100 bg-white hover:bg-blue-50/40 transition group shadow-2xs"
              >
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1d4ed8] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-800 leading-tight">
                      {item.title}
                    </p>
                    <span className="text-[10px] text-blue-600 font-medium">
                      {item.time}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteSchedule(item.id)}
                  title="Delete event"
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition cursor-pointer p-0.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-[#c9dff7] rounded-2xl py-8 px-4 text-center bg-white/60">
            <p className="text-xs text-[#8ca3ba] font-medium leading-relaxed">
              No events, notes, or reminders for this day.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

