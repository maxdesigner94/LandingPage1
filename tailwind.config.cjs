/** @type {import('tailwindcss').Config} */
module.exports = {
  // Configurazione dei percorsi per lo scanning dei file (purge/content)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Cerca in tutti i file React dentro la cartella src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
