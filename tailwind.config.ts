import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefbf4",
          100: "#d6f5e3",
          200: "#b0eaca",
          500: "#239460",
          600: "#18764d",
          700: "#145e3f",
          800: "#134b34",
          900: "#103e2c",
        },
        ink: "#14211b",
        muted: "#5f7269",
        surface: "#f6fbf8",
        line: "#dbe8e1",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        panel: "0 24px 60px -28px rgba(16, 62, 44, 0.28)",
      },
      backgroundImage: {
        "grid-soft":
          "linear-gradient(to right, rgba(20,94,63,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,94,63,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
