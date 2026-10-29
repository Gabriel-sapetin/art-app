import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy /api calls to a local dev function emulator.
      // In production on Vercel, /api routes are handled natively by Vercel Functions.
      // Locally, we just let the fetch fail gracefully — comments will show
      // "Could not load comments" in dev unless you run `vercel dev`.
    }
  }
})
