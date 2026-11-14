export interface HolidayItem {
  day: number;
  name: string;
}

// Indian Government Holidays across all states & central Gazetted list
export const INDIAN_GOVT_HOLIDAYS: Record<number, HolidayItem[]> = {
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

export const MONTH_NAMES = [
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

export const MONTH_SHORT_NAMES = [
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


