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
        gold: {
          50: "#fdf8ed",
          100: "#f9edcc",
          200: "#f3d994",
          300: "#edc35c",
          400: "#e8ae36",
          500: "#FEBE00",
          600: "#c4880e",
          700: "#a3650f",
          800: "#86561d",
          900: "#6e4318",
        },
        memorial: {
          bg: "#1a1a1a",
          surface: "#f5f0e8",
          text: "#484440",
          heading: "#99261E",
        },
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        "fade-out": {
          "0%": { opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-out": "fade-out 2s ease-out forwards",
        "fade-in-up": "fade-in-up 0.5s ease-out both",
        "fade-in-up-delayed": "fade-in-up 0.5s ease-out 0.15s both",
        "fade-in-up-delayed-2": "fade-in-up 0.5s ease-out 0.3s both",
        "fade-in-up-delayed-3": "fade-in-up 0.5s ease-out 0.45s both",
        "fade-in": "fade-in 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
