import { defineConfig } from '@tanstack/react-start/config'
import tsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tailwindcss()
    ],
    build: {
      assetsDir: 'assets', // Assurez-vous que les assets sont placés dans un répertoire accessible
      outDir: 'dist/_build', // Spécifiez le répertoire de sortie si nécessaire
    },
  },
  server: {
    preset: 'netlify',
  },

})