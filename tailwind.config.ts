import type { Config } from "tailwindcss";

// Tailwind 3.4, same major as exantara-saas. Brand colors live in CSS variables
// under `.hcl-root` (see docs/01-Design-System.md), not in this theme.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
