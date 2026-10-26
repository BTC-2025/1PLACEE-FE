import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0F1111",
          navy: "#131921",
          lightNavy: "#232F3E",
          yellow: "#FEBD69",
          orange: "#FF9900",
          blue: "#007185",
          red: "#B12704"
        }
      }
    },
  },
  plugins: [],
};
export default config;
