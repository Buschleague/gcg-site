import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: Set base to '/<repo>/' on GitHub Pages project sites.
// The workflow supplies VITE_BASE automatically for you.
const base = process.env.VITE_BASE ?? '/'

export default defineConfig({
  plugins: [react()],
  base,
})
