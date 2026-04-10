import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#0b0f19",
          primary: "#7db5ff",
          secondary: "#3ff8ff",
          muted: "#8a93a7",
          panel: "#121a2a"
        }
      },
      boxShadow: {
        card: "0 8px 30px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
