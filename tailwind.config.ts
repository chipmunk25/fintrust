import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        shd: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
        shadow2a: "0 0 2px rgba(0, 0, 0, 0.12)",
        shadow2b: "0 1px 2px rgba(0, 0, 0, 0.14)",
        xsmall: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        small:
          "0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px -1px rgba(16, 24, 40, 0.10)",
        medium:
          "0px 4px 6px -1px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.10)",
        large:
          "0px 10px 15px -3px rgba(16, 24, 40, 0.10), 0px 4px 6px -4px rgba(16, 24, 40, 0.10)",
        xlarge:
          "0px 20px 25px -5px rgba(16, 24, 40, 0.10), 0px 8px 10px -6px rgba(16, 24, 40, 0.10)",
        xxlarge: "0px 25px 50px -12px rgba(16, 24, 40, 0.25)",
      },
      width: {
        200: "50rem",
      },
      maxWidth: {
        116.25: "29.063rem ",
      },
      height: {
        "scroll-height": "calc(100vh - 50px)",
      },
      fontFamily: {
        Regular: ["RigRegular", "sans-serif"],
        Medium: ["RigMedium", "sans-serif"],
        Bold: ["RigBold", "sans-serif"],
      },
      screens: {
        xs: "576",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        destructive: {
          900: "#7F1D1D",
          800: "#7F1D1D",
          700: "#B91C1C",
          600: "#DC2626",
          500: "#EF4444",
          400: "#F87171",
          300: "#FCA5A5",
          200: "#FECACA",
          100: "#FEE2E2",
          50: "#FEF2F2",
        },
        danger: {
          900: "#7F1D1D",
          800: "#7F1D1D",
          700: "#B91C1C",
          600: "#DC2626",
          500: "#EF4444",
          400: "#F87171",
          300: "#FCA5A5",
          200: "#FECACA",
          100: "#FEE2E2",
          50: "#FEF2F2",
        },
        info: {
          900: "#055565",
          500: "#0CB8DA",
          300: "#5DDBF5",
          200: "#90E7F8",
          100: "#B4EFFA",
        },
        warning: {
          900: "#78350F",
          800: "#92400E",
          700: "#B45309",
          600: "#D97706",
          500: "#F59E0B",
          400: "#FBBF24",
          300: "#FCD34D",
          200: "#FDE68A",
          100: "##FEF3C7",
          50: "#FFFBEB",
        },
        success: {
          900: "#14532D",
          800: "#166534",
          700: "#15803D",
          600: "#16A34A",
          500: "#22C55E",
          400: "#4ADE80",
          300: "#86EFAC",
          200: "#BBF7D0",
          100: "#DCFCE7",
          50: "#F0FDF4",
        },
        neutral: {
          900: "#111827",
          800: "#1F2937",
          700: "#374151",
          600: "#4B5563",
          500: "#6B7280",
          400: "#9CA3AF",
          300: "#D1D5DB",
          200: "#E5E7EB",
          100: "#F3F4F6",
          50: "#F9FAFB",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          900: "#04141C",
          800: "#01121B",
          700: "#021722",
          600: "#031B28",
          500: "#04202F",
          400: "#12415A",
          300: "#22516A",
          200: "#5B8FAB",
          100: "#85BEDC",
          50: "#B6E1F8",
        },

        secondary: {
          900: "#617C00",
          700: "#B4E503",
          500: "#CBFF10",
          300: "#DEFF6A",
          200: "#EEFFB4",
          100: "#F9FFE3",
        },
        black: "#0D0D0C",
        white: "#FFFFFF",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          900: "#00534C",
          500: "#2CD5C7",
          300: "#37FAEA",
          200: "#8AFFF5",
          100: "#C8FFFB",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
