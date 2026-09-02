import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f4f5f7",
        surface: "#ffffff",
        hairline: "#e5e7eb",
        ink: "#0c1116",
        "ink-muted": "#5b6573",
        brand: {
          DEFAULT: "#0b5cff",
          hover: "#0a4ed6",
          tint: "#e7efff",
        },
        sev: {
          info: "#3b82f6",
          advisory: "#0ea5e9",
          caution: "#f59e0b",
          warning: "#f97316",
          critical: "#dc2626",
        },
        success: "#10b981",
        offline: "#9ca3af",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        display: ["40px", { lineHeight: "48px", fontWeight: "600" }],
        h1: ["28px", { lineHeight: "36px", fontWeight: "600" }],
        h2: ["20px", { lineHeight: "28px", fontWeight: "600" }],
        body: ["14px", { lineHeight: "22px", fontWeight: "400" }],
        small: ["13px", { lineHeight: "20px", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "16px", fontWeight: "500" }],
      },
      borderRadius: {
        card: "10px",
        pill: "999px",
        button: "8px",
      },
      spacing: {
        rail: "56px",
        topbar: "52px",
      },
      maxWidth: {
        content: "1200px",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
