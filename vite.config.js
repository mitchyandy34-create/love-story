import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // increase chunk warning limit to account for large media assets
    chunkSizeWarningLimit: 2000,
  },
})