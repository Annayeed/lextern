import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#060D18",
          900: "#0F1B2D",
          800: "#162236",
          700: "#1D2E45",
          600: "#263A56",
          500: "#334E6E",
        },
        amber: {
          gold: "#D4A853",
          light: "#F5E6C3",
          dark: "#A07C2E",
        },
        slate: {
          warm: "#64748B",
        },
        cream: "#FAFAF8",
        "cream-dark": "#F1F0ED",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        "card-hover": "0 4px 12px 0 rgb(0 0 0 / 0.10), 0 2px 4px -1px rgb(0 0 0 / 0.06)",
        sidebar: "1px 0 0 0 rgb(0 0 0 / 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
