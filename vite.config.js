import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Forward API calls to the Express backend during development.
    proxy: {
      '/api': {
        target: process.env.PORT ? `http://localhost:${process.env.PORT}` : 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
