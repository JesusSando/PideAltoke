// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'   // o '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',   // para renderizar componentes
    globals: true           // permite usar describe/it/expect sin importar
  }
})
