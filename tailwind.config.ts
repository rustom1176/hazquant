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
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        ink: "#0f1f17",
        muted: "#52665c",
        surface: "#f7fbf9",
        line: "#ddeae3",
        gold: "#c9a227",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        panel: "0 24px 60px -28px rgba(6, 78, 59, 0.22)",
        glow: "0 0 0 1px rgba(16,185,129,0.12), 0 20px 50px -20px rgba(16,185,129,0.35)",
        soft: "0 8px 30px -12px rgba(15,31,23,0.12)",
      },
      backgroundImage: {
        "grid-soft":
          "linear-gradient(to right, rgba(6,95,70,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,95,70,0.055) 1px, transparent 1px)",
        "hero-radial":
          "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(16,185,129,0.18), transparent 65%), radial-gradient(ellipse 60% 45% at 85% 10%, rgba(6,78,59,0.10), transparent 55%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up .7s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
