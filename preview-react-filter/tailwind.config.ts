import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./components/**/*.{ts,tsx}",
    "./*.{ts,tsx,html}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
