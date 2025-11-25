/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        // Aggiunge l'animazione shimmer da usare nel CSS
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        shimmer: {
          // La definizione del keyframe 'shimmer' è stata spostata in index.css
          // ma spesso può essere definita anche qui per completezza:
          // '0%': { transform: 'translateX(-100%)' },
          // '100%': { transform: 'translateX(300%)' },
        }
      }
    },
  },
  plugins: [],
}
