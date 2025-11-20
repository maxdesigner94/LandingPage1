/** @type {import('tailwindcss').Config} */
export default {
  // Dice a Tailwind quali file analizzare per estrarre le classi CSS (purge/content)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
