import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import svgr from '@svgr/rollup'
import tailwindcss from '@tailwindcss/vite'


const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr({icon: true,  dimensions: false})],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
