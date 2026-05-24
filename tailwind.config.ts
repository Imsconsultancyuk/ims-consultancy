import type { Config } from "tailwindcss";

/**
 * Tailwind 4 reads design tokens primarily from `@theme` in app/globals.css.
 * This config file is kept for backwards-compat aliases used in existing
 * component classes. Source of truth = globals.css.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#786478", // brand mauve (matches @theme --color-brand-mauve)
        secondary: "#282429", // ink-800
        accent: "#B4A0B4", // brand-light
        light: "#FAFAF7", // paper
      },
    },
  },
  plugins: [],
};
export default config;
