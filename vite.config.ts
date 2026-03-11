// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // ⚡ Very important for deployments on Vercel
  // This ensures all assets load correctly, fixing the blank page issue
  base: './',

  // Optional: define server settings for local development
  server: {
    port: 5173,       // default Vite port
    open: true,       // automatically opens browser on npm run dev
  },

  // Optional: optimize dependencies for faster build
  optimizeDeps: {
    include: ['react', 'react-dom']
  },

  // Optional: build configuration
  build: {
    outDir: 'dist',   // output folder for production
    sourcemap: false, // you can enable true if you want source maps
  },

  // Optional: resolve paths for imports
  resolve: {
    alias: {
      '@': '/src',  // use @ as shortcut for src folder
    },
  },
})