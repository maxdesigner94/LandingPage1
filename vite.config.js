import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Definizione del percorso di configurazione per Vite
export default defineConfig({
  plugins: [react()],
  // Opzioni di build, spesso aiutano a risolvere i problemi di percorso con i servizi di hosting
  build: {
    outDir: 'dist', // Cartella di output standard per Netlify
    assetsDir: 'assets',
  }
})
