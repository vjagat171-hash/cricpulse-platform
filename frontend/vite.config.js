import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/cricpulse-platform/",   // 👈 repo-name add karo
  plugins: [react()],
})
