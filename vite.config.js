import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  // server: {
  //   host: '192.168.195.142', // Permette l'accesso da altri dispositivi
  //   port: 5174, // Puoi cambiare la porta se necessario
  // },
})
