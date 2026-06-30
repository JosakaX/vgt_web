import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: "var(--vgt-navy)",
          deep: "var(--vgt-navy-deep)",
          soft: "var(--vgt-navy-soft)",
        },
        silver: {
          DEFAULT: "var(--vgt-silver)",
          light: "var(--vgt-silver-light)",
        },
        graphite: "var(--vgt-graphite)",
        ink: "var(--vgt-ink)",
        accent: {
          DEFAULT: "var(--vgt-accent)",
          2: "var(--vgt-accent-2)",
        },
        "accent-solid": {
          DEFAULT: "var(--vgt-accent-solid)",
          hover: "var(--vgt-accent-solid-hover)",
        },
        success: "var(--vgt-success)",
        warning: "var(--vgt-warning)",
        danger: "var(--vgt-danger)",

        // Semantic surface tokens (theme-aware, defined in globals.css)
        background: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        border: "var(--border-color)",
        foreground: "var(--fg)",
        muted: "var(--fg-muted)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(14,21,37,0.04), 0 8px 24px rgba(14,21,37,0.06)",
        "card-hover": "0 2px 4px rgba(14,21,37,0.06), 0 16px 40px rgba(14,21,37,0.12)",
        nav: "0 1px 0 rgba(14,21,37,0.06), 0 8px 24px rgba(14,21,37,0.06)",
      },
      backgroundImage: {
        "hero-grad":
          "radial-gradient(120% 120% at 100% 0%, var(--vgt-accent-vivid) 0%, var(--vgt-navy-soft) 38%, var(--vgt-navy-deep) 100%)",
        "navy-grad":
          "linear-gradient(135deg, var(--vgt-navy-deep) 0%, var(--vgt-navy) 55%, var(--vgt-navy-soft) 100%)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
