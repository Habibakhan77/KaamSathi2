import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EEF8F2",
          100: "#D6EFE0",
          200: "#AEE0C2",
          300: "#76C99B",
          400: "#3DAB72",
          500: "#168B48",
          600: "#0A5C2E", // Primary Logo Green
          700: "#064A25", // Darker depth
          800: "#04351B",
          900: "#022211",
        },
        nearblack: "#151515",
        accent: {
          amber: "#F5A524",
          amberHover: "#E0931B",
        },
        // Semantic token variables mapped to CSS variables
        surface: {
          DEFAULT: "var(--surface)",
          elevated: "var(--surface-elevated)",
          subtle: "var(--surface-subtle)",
        },
        themeText: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          onPrimary: "var(--text-on-primary)",
        },
        themeBorder: {
          DEFAULT: "var(--border-subtle)",
          strong: "var(--border-strong)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        heading: ["var(--font-jakarta)", "Plus Jakarta Sans", "sans-serif"],
        urdu: ["var(--font-urdu)", "Noto Nastaliq Urdu", "serif"],
        pashto: ["var(--font-pashto)", "Noto Naskh Arabic", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 2px 8px -2px rgba(10, 92, 46, 0.06), 0 4px 16px -4px rgba(15, 23, 42, 0.08)",
        cardHover: "0 8px 24px -4px rgba(10, 92, 46, 0.12), 0 12px 32px -4px rgba(15, 23, 42, 0.12)",
        elevated: "0 16px 40px -8px rgba(10, 92, 46, 0.16)",
      },
    },
  },
  plugins: [],
};
export default config;
