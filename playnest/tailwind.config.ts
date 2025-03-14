import type { Config } from "tailwindcss";

const config = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}', 
    './layout/**/*.{js,jsx,ts,tsx}', 
    './loading/**/*.{js,jsx,ts,tsx}', 
    './not-found/**/*.{js,jsx,ts,tsx}', 
    './error/**/*.{js,jsx,ts,tsx}', 
    './global-error/**/*.{js,jsx,ts,tsx}', 
    './route/**/*.{js,ts}', 
    './template/**/*.{js,jsx,ts,tsx}', 
    './default/**/*.{js,jsx,ts,tsx}', 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;

export default config;
