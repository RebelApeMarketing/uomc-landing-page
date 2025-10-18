/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: { 500: "#22c55e", 600: "#16a34a", 700: "#15803d" },
      },
      boxShadow: {
        ctabar: "0 -5px 12px rgba(0,0,0,0.05), 0 10px 24px rgba(0,0,0,0.08)",
      },
      maxWidth: { content: "1120px" },
    },
  },
  plugins: [],
};