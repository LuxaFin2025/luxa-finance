// tailwind.config.ts
import { type Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // ✅ Dark mode Class-based support
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'], // ✅ Modern Font Integration
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [],
}

export default config;
